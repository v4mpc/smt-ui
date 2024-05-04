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

import { useState } from "react";
import { isEmpty } from "../utils.jsx";

import AceEditor from "react-ace";

import "ace-builds/src-noconflict/mode-json";
import "ace-builds/src-noconflict/mode-mysql";
import "ace-builds/src-noconflict/theme-monokai";
import "ace-builds/src-noconflict/ext-language_tools";

const reports = [
  {
    id: 1,
    reportName: "Ettore",
    reportKey: "TMP",
    description:
      "In hac habitasse platea dictumst. Morbi vestibulum, velit id pretium iaculis, diam erat fermentum justo, nec condimentum neque sapien placerat ante. Nulla justo. Aliquam quis turpis eget elit sodales scelerisque. Mauris sit amet eros.",
    displayOrder: 10,
    active: false,
    query: "select * from ettore p join sales s on s.id=p.sid;",
    columnOption: '[{name:"jelo","displayName":"helo"}]',
    filterOption: "[{}]",
  },
  {
    id: 2,
    reportName: "Donnamarie",
    reportKey: "SCG",
    description:
      "Integer ac leo. Pellentesque ultrices mattis odio. Donec vitae nisi.",
    displayOrder: 6,
    active: false,
    query: "select * from Donnamrie p join sales s on s.id=p.sid;",
    columnOption: '[{name:"jelo","displayName":"helo"}]',
    filterOption: "[{}]",
  },
  {
    id: 3,
    reportName: "Anna-diana",
    reportKey: "WTB",
    description:
      "Morbi a ipsum. Integer a nibh. In quis justo. Maecenas rhoncus aliquam lacus.",
    displayOrder: 5,
    active: false,
    query: "select * from anna-diana p join sales s on s.id=p.sid;",
    columnOption: '[{name:"jelo","displayName":"helo"}]',
    filterOption: "[{}]",
  },
  {
    id: 4,
    reportName: "Alessandro",
    reportKey: "SUK",
    description: "Nulla tempus.",
    displayOrder: 9,
    active: true,
    query: "select * from alessandro p join sales s on s.id=p.sid;",
    columnOption: '[{name:"jelo","displayName":"helo"}]',
    filterOption: "[{}]",
  },
  {
    id: 5,
    reportName: "Cyrill",
    reportKey: "YKG",
    description:
      "Integer ac leo. Pellentesque ultrices mattis odio. Donec vitae nisi. Nam ultrices, libero non mattis pulvinar, nulla pede ullamcorper augue, a suscipit nulla elit ac nulla. Sed vel enim sit amet nunc viverra dapibus.",
    displayOrder: 1,
    active: false,
    query: "select * from products p join sales s on s.id=p.sid;",
    columnOption: '[{name:"jelo","displayName":"helo"}]',
    filterOption: "[{}]",
  },
];

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
  const items = reports.map((p) => ({
    key: p.reportKey,
    label: <span>{`${p.active ? "✅" : "⛔️"} ${p.reportName}`}</span>,
  }));
  const [form] = Form.useForm();
  const [selectedReport, setSelectedReport] = useState(initialFormValues);
  const [showForm, setshowForm] = useState(false);
  const [selectedKeys, setSelectedKeys] = useState([]);

  const handleshowForm = (value) => {
    setshowForm(value);
    setSelectedKeys([]);
    setSelectedReport(initialFormValues);
  };

  const handleSubmit=(values)=>{
    console.log(values);
  }

  const handleSetSelectedReport = ({ key }) => {
    setSelectedKeys([key]);

    setSelectedReport(...reports.filter((r) => key === r.reportKey));
  };

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
          {!isEmpty(selectedReport) || showForm ? (
            <Form
              key={selectedReport.reportKey}
              variant="outlined"
              initialValues={selectedReport}
              layout="vertical"
              onFinish={handleSubmit}
              disabled={false}
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
