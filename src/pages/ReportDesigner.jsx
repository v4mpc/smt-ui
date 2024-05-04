import {
  Col,
  Card,
  Row,
  Menu,
  Form,
  Input,
  InputNumber,
  Checkbox,
  Empty,
  Button,
} from "antd";

import {useEffect, useState} from "react";
import {API_ROUTES, BASE_URL, fetchData, isEmpty} from "../utils.jsx";

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

const ReportDesigner = () => {
  const initialFormValues = {
    active: true,
    columnOption: "[]",
    filterOption: "[]",
  };

  const [selectedReport, setSelectedReport] = useState(initialFormValues);
  const [reports, setReports] = useState([]);
  const [showForm, setshowForm] = useState(false);
  const [selectedKeys, setSelectedKeys] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [form] = Form.useForm();



  const items = reports.map((p) => ({
    key: p.reportKey,
    label: <span>{`${p.active ? "✅" : "⛔️"} ${p.reportName}`}</span>,
  }));




  const handleshowForm = (value) => {
    setshowForm(value);
    setSelectedKeys([]);
    setSelectedReport(initialFormValues);



  };

  const handleSubmit=async (values)=>{
    console.log(values);
    let urlPath = `${API_ROUTES.customReport}`;
    let method = "POST";
    if (Object.hasOwn(selectedReport,"id")) {
      urlPath = `${API_ROUTES.customReport}/${selectedReport.id}`;
      method = "PUT";
    }

    await fetchData(values,urlPath,setIsLoading,setError,method,null,form,getData);


  }

  const handleSetSelectedReport = ({ key }) => {
    setSelectedKeys([key]);
    setshowForm(true)
    setSelectedReport(...reports.filter((r) => key === r.reportKey));
  };



  async function getData() {
    setIsLoading(true);
    const resp = await fetch(
        `${BASE_URL}/${API_ROUTES.customReport}`,
    );
    if (!resp.ok) {
      throw new Error("Network response was not ok");
    }
    const respData = await resp.json();
    setReports(respData);
    setIsLoading(false);
  }


  useEffect(() => {
      getData()
  }, []);

  return (
    <Row gutter={16}>
      <Col span={6}>
        <Card title="Report list" styles={{ body: { padding: "4px" } }}>
          <Menu
            onClick={handleSetSelectedReport}
            selectedKeys={selectedKeys}
            style={{
              borderWidth: "0px",
            }}
            mode="inline"
            items={items}
          />
        </Card>
      </Col>
      <Col span={18}>
        <Card
          title="Report details"

          extra={
            showForm ? (
              <Button type="primary" onClick={() => handleshowForm(false)}>
                Cancel
              </Button>
            ) : (
              <Button type="primary" onClick={() => handleshowForm(true)}>
                New Report
              </Button>
            )
          }
        >
          { showForm ? (
            <Form
              key={selectedReport.reportKey}
              variant="outlined"
              initialValues={selectedReport}
              layout="vertical"
              onFinish={handleSubmit}
              disabled={isLoading}
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
                onChange={(value) => console.log(value)}
              />

              <FormAceEditorItem
                label="Column options"
                name="columnOption"
                mode="json"
                style={{ height: "150px", width: "100%" }}
                rules={[
                  { required: true, message: "Column options is required" },
                ]}
                onChange={(value) => console.log(value)}
              />

              <FormAceEditorItem
                label="Filter options"
                name="filterOption"
                mode="json"
                style={{ height: "150px", width: "100%" }}
                rules={[
                  { required: true, message: "Filter options is required" },
                ]}
                onChange={(value) => console.log(value)}
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
          ) : (
            <Empty
              image={Empty.PRESENTED_IMAGE_SIMPLE}
              description="Select or Create new report"
            />
          )}
        </Card>
      </Col>
    </Row>
  );
};

export default ReportDesigner;
