import { LockOutlined, UserOutlined } from "@ant-design/icons";
import {Button, Card, Flex, Form, Input} from "antd";

const Login = () => {
  const onFinish = (values) => {
    console.log("Received values of form: ", values);
  };
  return (


      <Flex vertical={false} style={{ width: "100%",height:"100vh",backgroundColor:"#f5f5f5" }} justify="center" align="center" >


        <Card style={{ width: "20%" }}>
          <Form

              name="normal_login"
              className="login-form"
              initialValues={{
                remember: true,
              }}
              onFinish={onFinish}
          >
            <Form.Item
                name="username"
                rules={[
                  {
                    required: true,
                    message: "Please input your Username!",
                  },
                ]}
            >
              <Input
                  prefix={<UserOutlined className="site-form-item-icon" />}
                  placeholder="Username"
              />
            </Form.Item>
            <Form.Item
                name="password"
                rules={[
                  {
                    required: true,
                    message: "Please input your Password!",
                  },
                ]}
            >
              <Input
                  prefix={<LockOutlined className="site-form-item-icon" />}
                  type="password"
                  placeholder="Password"
              />
            </Form.Item>

            <Form.Item>
              <Button type="primary" htmlType="submit" className="login-form-button">
                Log in
              </Button>

            </Form.Item>
          </Form>
        </Card>





    </Flex>
  );
};
export default Login;
