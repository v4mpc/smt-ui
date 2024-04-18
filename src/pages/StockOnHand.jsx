import {
  Button,
  Col,
  Row,
  Table,
  InputNumber,
  Flex,
  Typography,
  DatePicker,
  Descriptions,
  Input,
  Space,
} from "antd";
import { PlusOutlined, MinusOutlined } from "@ant-design/icons";
import { useStockOnHand } from "../hooks/useStockOnHand.jsx";
import { useEffect, useState } from "react";
import AsyncModal from "../components/AsyncModal.jsx";
import qs from "qs";
import { BASE_URL, openNotification } from "../utils.jsx";

const getSohParams = (params) => ({
  _limit: params.pagination?.pageSize,
  _page: params.pagination?.current,
  ...params,
});

export default function StockOnHand() {
  // const [stockOnHand, setStockOnHand, isLoading, error] = useStockOnHand();
  const [data, setData] = useState();
  const [loading, setLoading] = useState(false);
  const [tableParams, setTableParams] = useState({
    pagination: {
      current: 1,
      pageSize: 10,
    },
  });

  async function fetchData() {
    setLoading(true);
    const resp = await fetch(
      `${BASE_URL}/products?${qs.stringify(getSohParams(tableParams))}`,
    );

    if (!resp.ok) {
      console.log(await resp.json());
      throw new Error("Network response was not ok");
    }
    const respData = await resp.json();
    setData(respData);
    setLoading(false);
    setTableParams({
      ...tableParams,
      pagination: {
        ...tableParams.pagination,
        total: 50,
      },
    });
  }

  const productColumns = [
    {
      title: "#",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Product",
      key: "product",
      render: (_, record) => record.productName,
    },

    {
      title: "Buy price",
      key: "product",
      render: (_, record) => record.buyPrice,
    },

    {
      title: "Sale Price",
      key: "product",
      render: (_, record) => record.salePrice,
    },

    {
      title: "Stock on hand",
      dataIndex: "stockOnHand",
      key: "stockOnHand",
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Button type="primary" onClick={() => handleProductAdjust(record)}>
          Adjust
        </Button>
      ),
    },
  ];

  function handleProductAdjust(record) {
    console.log(record);
  }

  const handleTableChange = (pagination, filters, sorter) => {
    setTableParams({
      pagination,
      filters,
      ...sorter,
    });

    // `dataSource` is useless since `pageSize` changed
    if (pagination.pageSize !== tableParams.pagination?.pageSize) {
      setData([]);
    }
  };

  useEffect(() => {
    fetchData();
  }, [JSON.stringify(tableParams)]);
  return (
    <Table
        onChange={handleTableChange}
      columns={productColumns}
      dataSource={data}
      bordered={true}
        pagination={tableParams.pagination}
      loading={loading}
      rowKey="id"
    />
  );
}
