import { useEffect, useState } from "react";
import { API_ROUTES, BASE_URL, fetchData, isEmpty } from "../utils.jsx";

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
  Select,
  DatePicker,
} from "antd";

const { RangePicker } = DatePicker;

export default function Reports() {
  const [selectedReport, setSelectedReport] = useState([]);
  const [reports, setReports] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const filteredReports = reports.filter((report) => report.active);

  async function getData() {
    setIsLoading(true);
    const resp = await fetch(`${BASE_URL}/${API_ROUTES.customReport}`);
    if (!resp.ok) {
      throw new Error("Network response was not ok");
    }
    const respData = await resp.json();
    const sortedItems = [...respData].sort(
      (a, b) => a.displayOrder - b.displayOrder,
    );
    setReports(sortedItems);
    setIsLoading(false);
  }

  useEffect(() => {
    getData();
  }, []);

  return (
    <Row gutter={16}>
      <Col span={6}>
        <Card title="Report filter">
          <Form variant="outlined" layout="vertical" disabled={isLoading}>
            <Form.Item
              label="Report name"
              rules={[
                {
                  required: "Select report",
                  message: "Select report",
                },
              ]}
              name="product"
            >
              <Select placeholder="Select Report" options={filteredReports.map(report=>({value:report.id,label:report.reportName}))}></Select>
            </Form.Item>

            <Form.Item
              label="Product"
              rules={[
                {
                  message: "Select product",
                },
              ]}
              name="product"
            >
              <Select placeholder="Select Product"></Select>
            </Form.Item>

            <Form.Item
              label="Date range"
              name="dateRange"
              rules={[
                {
                  required: true,
                  message: "Please date",
                },
              ]}
            >
              <RangePicker style={{ width: "100%" }} />
            </Form.Item>

            <Form.Item>
              <Button type="primary" htmlType="submit">
                Apply filter
              </Button>
            </Form.Item>
          </Form>
        </Card>
      </Col>
      <Col span={18}>
        <Card title="Selected Report">details</Card>
      </Col>
    </Row>
  );
}
