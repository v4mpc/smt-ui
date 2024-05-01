import GenericTable from "../components/GenericTable.jsx";
import { Checkbox, Form, Input, InputNumber, Tag, Flex, Select } from "antd";
import ThousandSeparator from "../components/ThousandSeparator.jsx";
import { API_ROUTES } from "../utils.jsx";

const productColumns = [
  {
    title: "#",
    dataIndex: "id",
    key: "id",
    width: "5%",
  },
  {
    title: "Name",
    key: "name",
    dataIndex: "name",
    render: (_, record) => (
      <Flex gap="small" wrap="wrap">
        <span>{record.name}</span>
        {record.active ? (
          <Tag color="success">Active</Tag>
        ) : (
          <Tag color="error">Inactive</Tag>
        )}
      </Flex>
    ),
  },

  {
    title: "Unit",
    key: "Unit",
    dataIndex: "unit",
    render: (_, record) => record.unitOfMeasure?.code,
  },

  {
    title: "Buy price(TZS)",
    key: "buyprice",
    render: (_, record) => <ThousandSeparator value={record.buyPrice} />,
  },

  {
    title: "Sale Price(TZS)",
    key: "saleprice",
    render: (_, record) => <ThousandSeparator value={record.salePrice} />,
  },
  {
    title: "Action",
    key: "action",
  },
];

export default function Product() {
  return (
    <GenericTable itemColumns={productColumns} listPath={API_ROUTES.products}>
      <>
        <Form.Item
          label="Name"
          name="name"
          rules={[
            {
              required: true,
              message: "Please input!",
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item label="Buy price" name="buyPrice">
          <InputNumber
            style={{
              width: "100%",
            }}
          />
        </Form.Item>

        <Form.Item label="Sale price" name="salePrice">
          <InputNumber
            style={{
              width: "100%",
            }}
          />
        </Form.Item>

        <Form.Item label="Select">
          <Select>
            <Select.Option value="demo">Demo</Select.Option>
          </Select>
        </Form.Item>

        <Form.Item name="active" valuePropName="checked">
          <Checkbox>Active</Checkbox>
        </Form.Item>

        <Form.Item label="Description" name="description">
          <Input.TextArea />
        </Form.Item>
      </>
    </GenericTable>
  );
}
