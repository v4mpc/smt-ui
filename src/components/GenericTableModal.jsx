
import { useState } from "react";
import { Modal, Form,} from "antd";
import { DATE_FORMAT, fetchData } from "../utils.jsx";
import dayjs from "dayjs";

export default function GenericTableModal({
  title,
  selectedItem,
  listPath,
  formMode,
  open,
  handleModalClose,
  refetchData,
  children,
}) {
  const [form] = Form.useForm();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
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
      refetchData();
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

  const initialValues =
    formMode === "UPDATE"
      ? selectedItem.hasOwnProperty("date")
        ? {
            ...selectedItem,
            date: dayjs(selectedItem.date, DATE_FORMAT),
          }
        : selectedItem
      : {};

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
