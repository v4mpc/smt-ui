import {
  Col,
  Card,
  Row,
  Menu,
  Form,
  Input,
  InputNumber,
  Checkbox,
  Empty, Button,
} from "antd";

const items = [
  {
    key: "sub1",
    label: "1. Sales Report",
  },

  {
    key: "sub2",
    label: "2. Expenses Report",
  },

  {
    key: "sub3",
    label: "3. Low Stock Report",
  },

  {
    key: "sub4",
    label: "4. Stock Status Report",
  },
];

const ReportDesigner = () => {
  const selectedReport = true;
  return (
    <Row gutter={16}>
      <Col span={6}>
        <Card title="Report list" styles={{ body: { padding: "4px" } }}>
          <Menu
            onClick={() => console.log("menu clicked")}
            defaultSelectedKeys={["1"]}
            defaultOpenKeys={["sub1"]}
            style={{
              borderWidth: "0px",
            }}
            mode="inline"
            items={items}
          />
        </Card>
      </Col>
      <Col span={18}>
        <Card title="Report details">
          {selectedReport ? (
            <Form
              key="formKey"
              variant="outlined"
              layout="vertical"
              disabled={false}
            >
              <Form.Item
                label="Report name"
                name="name"
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
                name="key"
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

              <Form.Item
                label="Query"
                rules={[
                  {
                    required: true,
                    message: "Please input!",
                  },
                ]}
                name="query"
              >
                <Input.TextArea autoSize={{ minRows: 10 }} />
              </Form.Item>

              <Form.Item
                label="Column options"
                rules={[
                  {
                    required: true,
                    message: "Please input!",
                  },
                ]}
                name="columnOptions"
              >
                <Input.TextArea autoSize={{ minRows: 5 }} />
              </Form.Item>

              <Form.Item label="Filter options" name="filterOptions">
                <Input.TextArea autoSize={{ minRows: 5 }} />
              </Form.Item>


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
            <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
          )}
        </Card>
      </Col>
    </Row>
  );
};

export default ReportDesigner;
