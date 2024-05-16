import {Button, Card, Flex, Form, Input, InputNumber} from "antd";
import {useState} from "react";

const General = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [form] = Form.useForm();



  const handleSubmit = () => {
    console.log("submit");
  };

  return (

      <Flex vertical={false}  style={{ width: "100%" }} justify="center">
        <Flex gap="middle" vertical={true} >
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
                  label="Username" name="username">
                <Input placeholder="username" />
              </Form.Item>


              <Form.Item
                  label="Password" name="password">
                <Input.Password placeholder="password" />

              </Form.Item>


              <Button type="primary" htmlType="submit">
                Update
              </Button>

            </Form>
          </Card>

          <Card
              title="Configure"
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
                      message: "Please fill this value",
                    },
                  ]}
                  label="Low stock cut off point" name="lowStockCutOffPoint">
                <InputNumber
                    style={{
                      width: "100%",
                    }}
                />
              </Form.Item>


              <Button type="primary" htmlType="submit">
                Update
              </Button>


            </Form>
          </Card>
        </Flex>
      </Flex>

  );
};

export default General;
