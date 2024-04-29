import { useLocation } from "react-router-dom";
import { useState } from "react";
import {Button, Modal, Form, InputNumber, Input, Space} from "antd";

const formItemLayout = {
  labelCol: {
    span: 4,
  },
  wrapperCol: {
    span: 14,
  },
};

export default function StockAdjustmentModal({
  selectedProduct,
  handleSetProduct,
}) {
  const open = !!selectedProduct;
  console.log(selectedProduct);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [form] = Form.useForm();
  const [isLoading, setIsLoading] = useState(false);

  const handleOk = () => {
    setConfirmLoading(true);
    setTimeout(() => {
      handleSetProduct("");
      setConfirmLoading(false);
    }, 2000);
  };
  const handleCancel = () => {
    console.log("Clicked cancel button");
    // setOpen(false);
    handleSetProduct("");
  };

  const handleSubmit = () => {
    console.log("submit");
  };

  return (
    <Modal
      title="Adjust Stock"
      open={open}
      onOk={handleOk}
      confirmLoading={confirmLoading}
      onCancel={handleCancel}
    >
      <Form
        initialValues={{
          name: selectedProduct.productName,
          stockOnHand:selectedProduct.stockOnHand,

        }}
        variant="outlined"
        layout="vertical"
        disabled={isLoading}
        onFinish={handleSubmit}
        form={form}
      >
        <Space direction="vertical"
               size="small"  >
          <Form.Item label="Product" name="name">
            <Input disabled={true} />
          </Form.Item>

          <Form.Item
              label="Stock on hand(@)"
              name="stockOnHand"
              help="Stock on hand as of now (2024-04-29,01:39)"
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
              help="Negative(-) value decreases stock e.g -80, Postive value increases stock e.g 80."
              rules={[
                {
                  required: true,
                  message: "Please input!",
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
                  message: "Please input!",
                },
              ]}
              label="Adjustment Reason"
              name="reason"
          >
            <Input.TextArea />
          </Form.Item>
          <Form.Item
              wrapperCol={{
                offset: 6,
                span: 16,
              }}
          >
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        </Space>

      </Form>
    </Modal>
  );
}
