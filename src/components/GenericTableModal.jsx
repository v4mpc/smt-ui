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

export default function GenericTableModal({
  title,
  selectedItem,
  handleSetItem,
  children,
}) {
  const open = !!selectedItem;
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
        handleSetItem("");
        setConfirmLoading(false);
      }, 2000);
    } catch (error) {
      console.log("Failed:", error);
    }
  };
  const handleCancel = () => {
    console.log("Clicked cancel button");
    // setOpen(false);
    handleSetItem("");
  };

  const handleSubmit = () => {
    console.log("submit");
  };

  const validateAmount = (rule, value, callback) => {
    if (value === 0) {
      callback("Adjustment quantity can not be zero");
    } else if (value < 0 && value * -1 > selectedItem.stockOnHand) {
      callback("Negative adjustment should not exceed stock on hand");
    } else {
      callback();
    }
  };

  return (
    <Modal
      title={title}
      open={open}
      onOk={handleOk}
      confirmLoading={confirmLoading}
      onCancel={handleCancel}
      okText="Save"
    >
      <Form
        initialValues={{ ...selectedItem }}
        variant="outlined"
        layout="vertical"
        disabled={isLoading}
        onFinish={handleSubmit}
        form={form}
      >
        { children }
      </Form>
    </Modal>
  );
}
