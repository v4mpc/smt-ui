import { Button, Table, Input, InputNumber,Form } from "antd";

import { useSearchParams } from "react-router-dom";
import { useEffect, useState, useRef } from "react";
import qs from "qs";
import {API_ROUTES, BASE_URL, DATE_FORMAT} from "../utils.jsx";
import ThousandSeparator from "../components/ThousandSeparator.jsx";
import GenericTableModal from "../components/GenericTableModal.jsx";
import { InfoCircleOutlined } from "@ant-design/icons";
import dayjs from "dayjs";

const getSohParams = (params) => ({
  size: params.pagination?.pageSize,
  page: params.pagination?.current-1,

});

export default function StockOnHand() {
  const [searchParams, setSearchParams] = useSearchParams();
  const formModeRef = useRef("CREATE");
  const [open, setOpen] = useState(false);
  const [data, setData] = useState();
  const [loading, setLoading] = useState(false);
  const [tableParams, setTableParams] = useState({
    pagination: {
      current: searchParams.get("page"),
      pageSize: searchParams.get("size"),
    },
  });

  const [searchText, setSearchText] = useState("");
  const [searchedColumn, setSearchedColumn] = useState("");
  const searchInput = useRef(null);
  const [selectedProduct, setSelectedProduct] = useState("");

  const handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
  };
  const handleReset = (clearFilters) => {
    clearFilters();
    setSearchText("");
  };


  const validateAmount = (rule, value, callback) => {
    if (value === 0) {
      callback("Adjustment quantity can not be zero");
    } else if (value < 0 && value * -1 > selectedProduct.stockOnhand) {
      callback("Negative adjustment should not exceed stock on hand");
    } else {
      callback();
    }
  };


  async function fetchData() {
    setLoading(true);
    const resp = await fetch(
      `${BASE_URL}/${API_ROUTES.stockOnhand}?${qs.stringify(getSohParams(tableParams))}`,
    );

    if (!resp.ok) {
      console.log(await resp.json());
      throw new Error("Network response was not ok");
    }
    const respData = await resp.json();
    setData(respData.content);
    setLoading(false);
    setTableParams({
      pagination: {
        ...tableParams.pagination,
        total:respData.totalElements,
      },
    });
  }

  const productColumns = [
    {
      title: "#",
      dataIndex: "id",
      key: "id",
      width: "5%",
      render:(_,record)=>record.product.id
    },
    {
      title: "Product",
      key: "product",
      dataIndex: "product",
      width: "30%",
      render:(_,record)=>record.product.name

    },

    {
      title: "Buy price(TZS)",
      key: "buy",
      dataIndex: "buy",
      render: (_, record) => <ThousandSeparator value={record.product.buyPrice} />,
    },

    {
      title: "Sell Price(TZS)",
      key: "sell",
      dataIndex: "sell",
      render: (_, record) => <ThousandSeparator value={record.product.salePrice} />,
    },

    {
      title: "Stock on hand",
      dataIndex: "stockOnHand",
      key: "stockOnHand",
      render: (_, record) => <ThousandSeparator value={record.stockOnhand} />,
    },
    {
      title: "Action",
      key: "action",
      fixed: 'right',
      dataIndex: "action",
      render: (_, record) => (
        <Button type="primary" onClick={() => handleSetProduct(record)}>
          Adjust
        </Button>
      ),
    },
  ];

  const handleSetProduct = (product) => {
    setSelectedProduct({...product,productId:product.product.id,adjustmentDate:dayjs().format(DATE_FORMAT),name:product.product.name});
    formModeRef.current = "UPDATE";
    setOpen(true);
  };

  const handelModalClose = () => {
    setOpen(false);
  };

  const handleTableChange = (pagination, filters, sorter) => {

    setSearchParams({ page: pagination.current, size: pagination.pageSize });
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
  }, [tableParams.pagination.current]);
  return (
    <>
      <Table
        onChange={handleTableChange}
        columns={productColumns}
        dataSource={data}
        bordered={true}
        pagination={tableParams.pagination}
        loading={loading}
        rowKey="id"
        scroll={{ x: 'max-content' }}
      />

      {open && (
          <GenericTableModal
              key={selectedProduct?.id}
              title={
                formModeRef.current === "UPDATE" ? "Update item" : "Create item"
              }
              formMode={formModeRef.current}
              selectedItem={selectedProduct}
              listPath={API_ROUTES.adjust}
              open={open}
              handleModalClose={handelModalClose}
              refetchData={fetchData}
          >
            <Form.Item label="ProductId" name="productId" hidden={true}>
              <Input disabled={true} />
            </Form.Item>


            <Form.Item label="adjustmentDate" name="adjustmentDate" hidden={true}>
              <Input disabled={true} />
            </Form.Item>

            <Form.Item label="Product" name="name">
              <Input disabled={true} />
            </Form.Item>

            <Form.Item
                label="Stock on hand(@)"
                tooltip={{
                  title: "Stock on hand as of now (2024-04-29,00:00)",
                  icon: <InfoCircleOutlined />,
                }}
                name="stockOnhand"
            >
              <InputNumber
                  style={{
                    width: "100%",
                  }}
                  disabled={true}
              />
            </Form.Item>

            <Form.Item
                label="Quantity to adjust(@)"
                name="adjustmentQuantity"
                tooltip={{
                  title:
                      "Negative(-) value decreases stock e.g -80, Positive value increases stock e.g 80.",
                  icon: <InfoCircleOutlined />,
                }}
                rules={[
                  {
                    required: true,
                    message: "Please input a number",
                  },

                  {
                    validator: validateAmount,
                  },
                ]}
            >
              <InputNumber
                  style={{
                    width: "100%",
                  }}
              />
            </Form.Item>

            <Form.Item
                rules={[
                  {
                    required: true,
                    message: "Provide reason!",
                  },
                ]}
                label="Adjustment Reason"
                name="reason"
            >
              <Input.TextArea />
            </Form.Item>
          </GenericTableModal>
      )}
    </>
  );
}
