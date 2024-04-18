import {
  Button,
  Cascader,
  DatePicker,
  Form,
  Input,
  InputNumber,
  Mentions,
  Select,
  TreeSelect,
} from "antd";
import { useState } from "react";
import { BASE_URL, fetchData, openNotification } from "../utils.jsx";

const { RangePicker } = DatePicker;
const formItemLayout = {
  labelCol: {
    xs: {
      span: 24,
    },
    sm: {
      span: 6,
    },
  },
  wrapperCol: {
    xs: {
      span: 24,
    },
    sm: {
      span: 14,
    },
  },
};

export default function Expense() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [form] = Form.useForm();


  const handleSubmit = (e) => {
    let formData = { ...e, date: e.date.format("YYYY-MM-DD") };
    console.log(formData);
    fetchData(formData, "expenses", setIsLoading, setError, "POST",null,form);

  };

  return (
    <Form
      {...formItemLayout}
      variant="outlined"
      style={{
        maxWidth: 600,
      }}
      disabled={isLoading}
      onFinish={handleSubmit}
      form={form}
    >
      <Form.Item
        label="Date"
        name="date"
        rules={[
          {
            required: true,
            message: "Please input!",
          },
        ]}
      >
        <DatePicker />
      </Form.Item>
      <Form.Item
        label="Name"
        name="name"
        rules={[
          {
            required: true,
            message: "Please input!",
          },
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="Amount(TZS)"
        name="amount"
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

      <Form.Item label="Description" name="description">
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
    </Form>
  );
}
