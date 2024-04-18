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
import { useState } from "react";
import AsyncModal from "../components/AsyncModal.jsx";

const { Text, Link } = Typography;

export default function Sell() {
  const [stockOnHand, setStockOnHand, isLoading, error] = useStockOnHand();
  const [searchText, setSearchText] = useState("");
  const productColumns = [
    {
      title: "#",
      dataIndex: "id",
      key: "id",
      width:"10%"
    },
    {
      title: "Product",
      key: "product",

      filterMode: "menu",
      onFilter: (value, record) => record.productName.startsWith(value),
      render: (_, record) => (
        <Flex vertical>
          <Text strong>{record.productName}</Text>
          <Flex gap="middle" vertical={false}>
            <div>Buy : {record.buyPrice}</div>
            <div>Sale : {record.salePrice}</div>
          </Flex>
        </Flex>
      ),
    },

    {
      title: "Stock on hand",
      dataIndex: "stockOnHand",
      key: "stockOnHand",
      width:"10%",
    },
    {
      title: "Action",
      key: "action",
      width:"10%",
      render: (_, record) => (
        <Button
          type="primary"
          onClick={() => handleProductAdd(record)}
          icon={<PlusOutlined />}
        ></Button>
      ),
    },
  ];
  const saleColumns = [
    ...productColumns.filter((pc) => pc.title !== "Action"),
    {
      title: "Quantity",
      key: "quantity",
      render: (_, record) => (
        <InputNumber
          min={0}
          onChange={(e) => handleInputQuantityChanged(record, e)}
          max={record.stockOnHand}
          defaultValue={record.saleQuantity}
        />
      ),
    },

    {
      title: "Date",
      key: "saleDate",
      render: (_, record) => (
        <DatePicker
          value={record.saleDate}
          onChange={(e) => handleInputDateChanged(record, e)}
        />
      ),
    },

    {
      title: "Action",
      key: "action",
      width:"10%",
      render: (_, record) => (
        <Button
          type="primary"
          danger
          onClick={() => handleProductRemove(record)}
          icon={<MinusOutlined />}
        ></Button>
      ),
    },
  ];
  const filteredDataSource = stockOnHand.filter((item) =>
    searchText === ""
      ? item
      : item.productName
          .toString()
          .toLowerCase()
          .includes(searchText.toLowerCase()),
  );

  const notSales = filteredDataSource.filter((p) => p.saleQuantity <= 0);
  const sales = stockOnHand.filter((p) => p.saleQuantity > 0);
  const totalSales = sales.reduce((acc, curr) => {
    return acc + curr.saleQuantity * curr.salePrice;
  }, 0);

  function handleProductAdd(product) {
    setStockOnHand((products) =>
      products.map((p) =>
        product.id === p.id ? { ...p, saleQuantity: 1 } : p,
      ),
    );
  }

  function handleProductRemove(product) {
    setStockOnHand((products) =>
      products.map((p) =>
        product.id === p.id ? { ...p, saleQuantity: 0 } : p,
      ),
    );
  }

  function handleInputQuantityChanged(product, inputValue) {
    if (inputValue == null) return;
    setStockOnHand((products) =>
      products.map((p) =>
        product.id === p.id ? { ...p, saleQuantity: inputValue } : p,
      ),
    );
  }

  function handleInputDateChanged(product, dateValue) {
    if (dateValue == null) return;
    setStockOnHand((products) =>
      products.map((p) =>
        product.id === p.id ? { ...p, saleDate: dateValue } : p,
      ),
    );
  }

  function handleFilterProducts(typedValue) {
    setSearchText(typedValue);
  }

  return (
    <>
      <Row gutter={16}>
        <Col span={10}>
          <Space direction="vertical">
            <Input
              placeholder="Search Product..."
              onChange={(e) => handleFilterProducts(e.target.value)}
            />
            <Table
              columns={productColumns}
              dataSource={notSales}
              bordered={true}
              loading={isLoading}
              scroll={{ y: '80vh' }}
              rowKey="id"
            />
          </Space>
        </Col>
        <Col span={12}>
          <Table
            columns={saleColumns}
            dataSource={sales}
            bordered={true}
            rowKey="id"
            scroll={{ y: '80vh' }}
            summary={() => (
              <Table.Summary fixed>
                <Table.Summary.Row>
                  <Table.Summary.Cell colSpan={4} index={0}>
                    Total Sales
                  </Table.Summary.Cell>
                  <Table.Summary.Cell colSpan={2} index={1}>
                    {totalSales.toLocaleString()} TZS
                  </Table.Summary.Cell>
                </Table.Summary.Row>
              </Table.Summary>
            )}
          />
        </Col>
      </Row>
      <Row justify="end">
        <Col>
          <AsyncModal postData={sales}></AsyncModal>
        </Col>
      </Row>
    </>
  );
}
