import React, { useState } from "react";
import { Button, Modal } from "antd";
import { BASE_URL, openNotification } from "../utils.jsx";
import { useSearchParams, useNavigate } from "react-router-dom";

const AsyncModal = ({ postData }) => {
  const [open, setOpen] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [error, setError] = useState("");
  const urlPath = "products";
  const navigate = useNavigate();

  const showModal = () => {
    setOpen(true);
  };
  const handleOk = () => {
    saveSales();
  };
  const handleCancel = () => {
    console.log("Clicked cancel button");
    setOpen(false);
  };

  async function saveSales() {
    try {
      setConfirmLoading(true);
      setError("");
      const resp = await fetch(`${BASE_URL}/${urlPath}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(postData),
      });
      if (!resp.ok) {
        throw new Error("Network response was not ok");
      }
      // openNotification(
      //   "sales-notification",
      //   "success",
      //   "Success",
      //   "Sales was success",
      // );
      navigate("/stock-on-hand");
    } catch (e) {
      console.error(e);
      openNotification("sales-notification", "error", "Error", e.message);
      setError(e.message);
    } finally {
      setConfirmLoading(false);
      setOpen(false);
    }
  }

  return (
    <>
      <Button type="primary" size="large" onClick={showModal}>
        Buy...
      </Button>
      <Modal
        title="Confirm purchase"
        open={open}
        onOk={handleOk}
        confirmLoading={confirmLoading}
        onCancel={handleCancel}
      >
        <p>{modalText}</p>
      </Modal>
    </>
  );
};
export default AsyncModal;
