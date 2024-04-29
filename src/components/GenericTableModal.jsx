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
  listPath,
  formMode,
  open,
  handleModalClose,
  children,
}) {

  const [form] = Form.useForm();
  const [isLoading, setIsLoading] = useState(false);

  const handleOk = async () => {
    try {
      const values = await form?.validateFields();
      setIsLoading(true);
      console.log(values);


      if (formMode === "UPDATE") {
        console.log("udpate");
      } else if (formMode === "CREATE") {
        console.log("create");
      }

      setTimeout(() => {
        form?.resetFields();
        handleModalClose();
        setIsLoading(false);
      }, 2000);
    } catch (error) {
      console.log("Failed:", error);
    }
  };
  const handleCancel = () => {
    console.log("Clicked cancel button");
    handleModalClose();
  };

  const handleSubmit = () => {
    console.log("submit");
  };

  const initialValues = formMode === "UPDATE" ? { ...selectedItem } : null;

  return (
    <Modal
      title={title}
      open={open}
      onOk={handleOk}
      confirmLoading={isLoading}
      onCancel={handleCancel}
      okText="Save"
    >
      <Form
        initialValues={initialValues}
        variant="outlined"
        layout="vertical"
        disabled={isLoading}
        onFinish={handleSubmit}
        form={form}
      >
        {children}
      </Form>
    </Modal>
  );
}
