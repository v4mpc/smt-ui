import {

    Form,
    Input,
    InputNumber,
    Checkbox,

    Button,
} from "antd";

import { useState} from "react";
import {API_ROUTES,fetchData} from "../utils.jsx";

import AceEditor from "react-ace";

import "ace-builds/src-noconflict/mode-json";
import "ace-builds/src-noconflict/mode-mysql";
import "ace-builds/src-noconflict/theme-monokai";
import "ace-builds/src-noconflict/ext-language_tools";

const AceEditorControl = ({ value, onChange, onBlur, ...rest }) => {
    return (
        <AceEditor
            style={{ width: "100%" }}
            theme="monokai"
            showPrintMargin={true}
            showGutter={true}
            onChange={onChange}
            onBlur={onBlur}
            value={value}
            {...rest}
        />
    );
};

const FormAceEditorItem = ({ label, name, rules, ...rest }) => {
    return (
        <Form.Item label={label} name={name} rules={rules}>
            <AceEditorControl {...rest} />
        </Form.Item>
    );
};

const DesignerForm = ({ isLoading,setIsLoading,initialValues,getData,handleShowCreateForm}) => {




    const [form] = Form.useForm();
    const [error, setError] = useState(null);

    // useEffect(() => {
    //     if (initialValues) {
    //         form.setFieldsValue(initialValues);
    //     }
    // }, [JSON.stringify(initialValues), form]);



    const handleSubmit=async (values)=>{

        let urlPath = `${API_ROUTES.customReport}`;
        let method = "POST";
        if (Object.hasOwn(initialValues,"id")) {
            urlPath = `${API_ROUTES.customReport}/${initialValues.id}`;
            method = "PUT";
        }

        await fetchData(values,urlPath,setIsLoading,setError,method,null,form,getData);

        handleShowCreateForm();



    }

    return (
        <Form
            variant="outlined"
            layout="vertical"
            onFinish={handleSubmit}
            disabled={isLoading}
            initialValues={initialValues}
            form={form}
        >
            <Form.Item
                label="Report name"
                name="reportName"
                style={{
                    display: "inline-block",
                    width: "calc(50% - 8px)",
                }}
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
                label="Report key"
                name="reportKey"
                style={{
                    display: "inline-block",
                    width: "calc(50% - 8px)",
                    margin: "0 8px",
                }}
                rules={[
                    {
                        required: true,
                        message: "Please input!",
                    },
                ]}
            >
                <Input />
            </Form.Item>

            <Form.Item label="Description" name="description">
                <Input.TextArea />
            </Form.Item>

            <Form.Item
                label="Display order"
                rules={[
                    {
                        required: true,
                        message: "Please input!",
                    },
                ]}
                name="displayOrder"
            >
                <InputNumber
                    style={{
                        width: "100%",
                    }}
                />
            </Form.Item>

            <Form.Item name="active" valuePropName="checked">
                <Checkbox>Active</Checkbox>
            </Form.Item>

            <FormAceEditorItem
                label="Query"
                name="query"
                style={{ height: "350px", width: "100%" }}
                mode="mysql"
                rules={[{ required: true, message: "Query is required" }]}

            />

            <FormAceEditorItem
                label="Column options"
                name="columnOption"
                mode="json"
                style={{ height: "150px", width: "100%" }}
                rules={[
                    { required: true, message: "Column options is required" },
                ]}

            />

            <FormAceEditorItem
                label="Filter options"
                name="filterOption"
                mode="json"
                style={{ height: "150px", width: "100%" }}
                rules={[
                    { required: true, message: "Filter options is required" },
                ]}

            />

            <Form.Item
                wrapperCol={{
                    span: 16,
                }}
            >
                <Button type="primary" htmlType="submit">
                    Save
                </Button>
            </Form.Item>
        </Form>
    );
};

export default DesignerForm;
