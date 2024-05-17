import {Button, Card, Form, Input} from "antd";
import {useEffect, useState} from "react";
import {API_ROUTES, BASE_URL, openNotification} from "../utils.jsx";

const Profile = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [form] = Form.useForm();
    const [error, setError] = useState(null);
    const [initialValues, setInitialValues] = useState({});


    async function getProfile() {
        setIsLoading(true);
        const resp = await fetch(`${BASE_URL}/${API_ROUTES.users}`);
        if (!resp.ok) {
            throw new Error("Network response was not ok");
        }
        const respData = await resp.json();
        setInitialValues({username: respData.username});
        setIsLoading(false);
    }


    useEffect(() => {
        getProfile();
    }, []);


    async function postData(values) {
        let initData = {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
        };
        initData.body = JSON.stringify(values);
        const resp = await fetch(`${BASE_URL}/${API_ROUTES.users}`, initData);
        try {
            if (!resp.ok) {

                throw new Error("Network response was not ok");
            }
            openNotification("profile-success", "success", "Success", "Update Success");


        } catch (e) {
            console.error(e);
            openNotification(e.message, "error", "Error", e.message);
            setInitialValues(e.message);
        } finally {
            setIsLoading(false);
        }
    }


    const handleSubmit = async (values) => {
        await postData(values);
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
                initialValues={initialValues}
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
                    <Input placeholder="username" autoComplete="off"/>
                </Form.Item>

                <Form.Item label="Password" name="password">
                    <Input.Password placeholder="password" autoComplete="off"/>
                </Form.Item>

                <Button type="primary" htmlType="submit">
                    Update
                </Button>
            </Form>
        </Card>
    );
};

export default Profile;
