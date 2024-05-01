import { useLocation } from "react-router-dom";
import { useState } from "react";
import { Button, Modal, Form, InputNumber, Input, Space } from "antd";
import { InfoCircleOutlined } from "@ant-design/icons";

const formItemLayout = {
  // wrapperCol: {
  //   offset: 8,
  //   span: 16,
  // },
};

export default function StockAdjustmentModal({
  selectedProduct,
  handleSetProduct,
}) {
  const open = !!selectedProduct;
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [form] = Form.useForm();
  const [isLoading, setIsLoading] = useState(false);

  const handleOk = async () => {
    try {
      const values = await form?.validateFields();
      setIsLoading(true);
      console.log(values);
      setConfirmLoading(true);
      setTimeout(() => {
        form?.resetFields();
        handleSetProduct("");
        setConfirmLoading(false);
      }, 2000);
    } catch (error) {
      console.log("Failed:", error);
    }
  };
  const handleCancel = () => {
    console.log("Clicked cancel button");
    // setOpen(false);
    handleSetProduct("");
  };

  const handleSubmit = () => {
    console.log("submit");
  };

  const validateAmount = (rule, value, callback) => {
    if (value === 0) {
      callback("Adjustment quantity can not be zero");
    } else if (value < 0 && value * -1 > selectedProduct.stockOnHand) {
      callback("Negative adjustment should not exceed stock on hand");
    } else {
      callback();
    }
  };

  return (
    <Modal
      title="Adjust Stock"
      open={open}
      onOk={handleOk}
      confirmLoading={confirmLoading}
      onCancel={handleCancel}
      okText="Adjust"
    >
      <Form
        initialValues={{
          name: selectedProduct.productName,
          stockOnHand: selectedProduct.stockOnHand,
        }}
        variant="outlined"
        layout="vertical"
        disabled={isLoading}
        onFinish={handleSubmit}
        form={form}
      >
        <Form.Item label="Product" name="name">
          <Input disabled={true} />
        </Form.Item>

        <Form.Item
          label="Stock on hand(@)"
          tooltip={{
            title: "Stock on hand as of now (2024-04-29,00:00)",
            icon: <InfoCircleOutlined />,
          }}
          name="stockOnHand"
        >
          <InputNumber
            style={{
              width: "100%",
            }}
            disabled={true}
          />
        </Form.Item>

        <Form.Item
          label="Quantity to adjust(@)"
          name="amount"
          tooltip={{
            title:
              "Negative(-) value decreases stock e.g -80, Positive value increases stock e.g 80.",
            icon: <InfoCircleOutlined />,
          }}
          rules={[
            {
              required: true,
              message: "Please input a number",
            },

            {
              validator: validateAmount,
            },
          ]}
        >
          <InputNumber
            style={{
              width: "100%",
            }}
          />
        </Form.Item>

        <Form.Item
          rules={[
            {
              required: true,
              message: "Provide reason!",
            },
          ]}
          label="Adjustment Reason"
          name="reason"
        >
          <Input.TextArea />
        </Form.Item>
      </Form>
    </Modal>
  );
}
