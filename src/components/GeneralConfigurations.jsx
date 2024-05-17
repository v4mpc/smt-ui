import { Button, Card, Form, InputNumber } from "antd";
import { useState } from "react";

const GeneralConfiguration = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [form] = Form.useForm();

    const handleSubmit = () => {
        console.log("submit");
    };

    return (
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
    );
};

export default GeneralConfiguration;
