import React, { useState } from "react";
import { Button, Modal } from "antd";
import {
  API_ROUTES,
  BASE_URL,
  DATE_FORMAT,
  openNotification,
  toSalePayload,
} from "../utils.jsx";
import { useNavigate } from "react-router-dom";
import dayjs from "dayjs";

const AsyncModal = ({ postData, isSale }) => {
  const [open, setOpen] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const showModal = () => {
    console.log(postData);
    if (postData.length === 0) {
      openNotification(
        "sales-notification",
        "warning",
        "Warning",
        `Select at least 1 item to ${isSale ? "Sell" : "Buy"}`,
      );
      return;
    }
    setOpen(true);
  };
  const handleOk = () => {
    if (postData.length === 0) {
      openNotification(
        "sales-notification",
        "warning",
        "Warning",
        `Select at least 1 item to ${isSale ? "Sell" : "Buy"}`,
      );
      return;
    }
    saveSales();
  };
  const handleCancel = () => {
    console.log("Clicked cancel button");
    setOpen(false);
  };

  async function saveSales() {
    try {
      Date.prototype.toISOString = function () {
        return dayjs(this).format(DATE_FORMAT);
      };
      setConfirmLoading(true);
      setError("");
      const resp = await fetch(`${BASE_URL}/${API_ROUTES.bulkSale}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(toSalePayload(postData, isSale)),
      });
      if (!resp.ok) {
        throw new Error("Network response was not ok");
      }
      navigate("/tx-success", { state: { isSale: isSale } });
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
        {`${isSale ? "Sell..." : "Buy..."}`}
      </Button>
      <Modal
        title="Confirm action"
        open={open}
        onOk={handleOk}
        okText="Yes"
        cancelText="No"
        confirmLoading={confirmLoading}
        onCancel={handleCancel}
      >
        <p>{`Are you sure you want to ${isSale ? "Sell" : "Buy"} these items?`}</p>
      </Modal>
    </>
  );
};
export default AsyncModal;
