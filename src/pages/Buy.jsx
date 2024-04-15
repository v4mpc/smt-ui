import {
  Button,
  Col,
  Row,
  Table,
  InputNumber,
  Flex,
  Typography,
  DatePicker,
} from "antd";
import { PlusOutlined, MinusOutlined } from "@ant-design/icons";
import { useStockOnHand } from "../hooks/useStockOnHand.jsx";

const { Text, Link } = Typography;

export default function Buy() {
  const [stockOnHand, setStockOnHand, isLoading, error] = useStockOnHand();
  const productColumns = [
    {
      title: "#",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Product",
      key: "product",
      filterMode: 'tree',
      filterSearch:true,

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
    },
    {
      title: "Action",
      key: "action",
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

  const sales = stockOnHand.filter((p) => p.saleQuantity > 0);
  const notSales = stockOnHand.filter((p) => p.saleQuantity <= 0);

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
    console.log(dateValue);
    if (dateValue == null) return;
    setStockOnHand((products) =>
      products.map((p) =>
        product.id === p.id ? { ...p, saleDate: dateValue } : p,
      ),
    );
  }

  return (
    <>
      <Row gutter={16}>
        <Col span={10} >
          <Table
            columns={productColumns}
            dataSource={notSales}
            bordered={true}
            loading={isLoading}
            rowKey="id"
          />
        </Col>
        <Col span={12}>
          <Table columns={saleColumns} dataSource={sales} bordered={true} rowKey="id" />
        </Col>
      </Row>
      <Row>
        <Col>
          <Button type="primary">Sale</Button>
        </Col>
      </Row>
    </>
  );
}
