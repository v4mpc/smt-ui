import GenericTable from "../components/GenericTable.jsx";
import { Checkbox, Form, Input, InputNumber, Tag, Flex, Select } from "antd";
import ThousandSeparator from "../components/ThousandSeparator.jsx";
import { API_ROUTES, fetchData } from "../utils.jsx";
import { useEffect, useState } from "react";

import FilterDropdown from "../components/FilterDropdown.jsx";
import {SearchOutlined} from "@ant-design/icons";

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

    filterIcon: (filtered) => (
        <SearchOutlined
            style={{
              color: filtered ? "#1677ff" : undefined,
            }}
        />
    ),
    filterDropdown:({setSelectedKeys, selectedKeys, confirm, clearFilters, close,})=><FilterDropdown clearFilters={clearFilters} setSelectedKeys={setSelectedKeys} selectedKeys={selectedKeys} close={close} confirm={confirm}/>


  },

  {
    title: "Unit",
    key: "unit",
    dataIndex: "unit",
    render: (_, record) => record.unitOfMeasure?.code,
  },

  {
    title: "Buy price(TZS)",
    key: "buyprice",
    dataIndex: "buyprice",
    render: (_, record) => <ThousandSeparator value={record.buyPrice} />,
  },

  {
    title: "Sale Price(TZS)",
    key: "saleprice",
    dataIndex: "saleprice",
    render: (_, record) => <ThousandSeparator value={record.salePrice} />,
  },
  {
    title: "Action",
    key: "action",
    dataIndex: "action",
    fixed: 'right',
  },
];

export default function Product() {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchData(
      data,
      API_ROUTES.unitsAll,
      setIsLoading,
      setError,
      "GET",
      setData,
    );
  }, []);

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

        <Form.Item label="Buy price"
                   rules={[
                     {
                       required: true,
                       message: "Please input!",
                     },
                   ]}
                   name="buyPrice">
          <InputNumber
            style={{
              width: "100%",
            }}
          />
        </Form.Item>

        <Form.Item label="Sale price"
                   rules={[
                     {
                       required: true,
                       message: "Please input!",
                     },
                   ]}
                   name="salePrice">
          <InputNumber
            style={{
              width: "100%",
            }}
          />
        </Form.Item>

        <Form.Item label="Unit"
                   rules={[
                     {
                       required: true,
                       message: "Please input!",
                     },
                   ]}

                   name="unitOfMeasure">
          <Select placeholder="Select unit" loading={isLoading} options={data.map(unit=>({value:unit.id,label:unit.code}))}></Select>
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
