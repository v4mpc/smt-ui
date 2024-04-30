import { useLocation } from "react-router-dom";
import { useState } from "react";
import { Button, Modal, Form, InputNumber, Input, Space } from "antd";
import { InfoCircleOutlined } from "@ant-design/icons";
import { useFetch } from "../hooks/useFetch.jsx";
import { fetchData } from "../utils.jsx";

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
  const [error, setError] = useState(null);
  console.log(formMode);

  const handleOk = async () => {
    try {
      const values = await form?.validateFields();
      let urlPath = `${listPath}`;
      let method = "POST";

      if (formMode === "UPDATE") {
        urlPath = `${listPath}/${selectedItem.id}`;
        method = "PUT";
      }
      await fetchData(
        values,
        urlPath,
        setIsLoading,
        setError,
        method,
        null,
        form,
        handleModalClose,
      );
    } catch (error) {
      console.log("Failed:", error);
    }
  };
  const handleCancel = () => {
    console.log("Clicked cancel button");
    handleModalClose();
    form?.resetFields();
  };

  const handleSubmit = () => {
    console.log("submit");
  };

  const initialValues = formMode === "UPDATE" ? { ...selectedItem } : {};

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
        key={formMode}
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
