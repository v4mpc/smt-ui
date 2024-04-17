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
  // const [formData, setFormData] = useState({
  //   date: null,
  //   name: null,
  //   amount: null,
  //   description: null,
  // });

  const handleFormInput = (formEvent, inputName = null) => {
    // let inputValue = null;
    // if (inputName === "date") {
    //   inputValue = formEvent.format("YYYY-MM-DD");
    // } else if (inputName === "amount") {
    //   inputValue = formEvent;
    // } else {
    //   inputName = formEvent.target.id;
    //   inputValue = formEvent.target.value;
    // }

    // setFormData((curr) => ({ ...curr, [inputName]: inputValue }));
  };

  const handleSubmit = (e) => {
    let formData={...e,date:e.date.format("YYYY-MM-DD")}
    console.log(formData);
  };

  return (
    <Form
      {...formItemLayout}
      variant="outlined"
      style={{
        maxWidth: 600,
      }}
      onFinish={handleSubmit}
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
        <DatePicker  />
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
        <Input  />
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
