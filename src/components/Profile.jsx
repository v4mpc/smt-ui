import { Button, Card, Flex, Form, Input, InputNumber } from "antd";
import { useState } from "react";

const Profile = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [form] = Form.useForm();

  const handleSubmit = () => {
    console.log("submit");
  };

  return (
    <Card
      title="Profile"
      bordered={false}
      style={{
        width: 800,
      }}
    >
      <Form
        variant="outlined"
        layout="vertical"
        disabled={isLoading}
        onFinish={handleSubmit}
        form={form}
      >
        <Form.Item
          rules={[
            {
              required: true,
              message: "Please name",
            },
          ]}
          label="Username"
          name="username"
        >
          <Input placeholder="username" />
        </Form.Item>

        <Form.Item label="Password" name="password">
          <Input.Password placeholder="password" />
        </Form.Item>

        <Button type="primary" htmlType="submit">
          Update
        </Button>
      </Form>
    </Card>
  );
};

export default Profile;
