import { Button, Table, Input, Space } from "antd";
import Highlighter from "react-highlight-words";
import { useSearchParams } from "react-router-dom";
import { SearchOutlined } from "@ant-design/icons";
import { useEffect, useState, useRef } from "react";
import qs from "qs";
import { API_ROUTES, BASE_URL } from "../utils.jsx";
import StockAdjustmentModal from "./StockAdjustment.jsx";
import ThousandSeparator from "../components/ThousandSeparator.jsx";

const getSohParams = (params) => ({
  size: params.pagination?.pageSize,
  page: params.pagination?.current-1,

});

export default function StockOnHand() {
  const [searchParams, setSearchParams] = useSearchParams();
  // const [stockOnHand, setStockOnHand, isLoading, error] = useStockOnHand();
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
  const getColumnSearchProps = (dataIndex) => ({
    filterDropdown: ({
      setSelectedKeys,
      selectedKeys,
      confirm,
      clearFilters,
      close,
    }) => (
      <div
        style={{
          padding: 8,
        }}
        onKeyDown={(e) => e.stopPropagation()}
      >
        <Input
          ref={searchInput}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={(e) =>
            setSelectedKeys(e.target.value ? [e.target.value] : [])
          }
          onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
          style={{
            marginBottom: 8,
            display: "block",
          }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
            icon={<SearchOutlined />}
            size="small"
            style={{
              width: 90,
            }}
          >
            Search
          </Button>
          <Button
            onClick={() => clearFilters && handleReset(clearFilters)}
            size="small"
            style={{
              width: 90,
            }}
          >
            Reset
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => {
              confirm({
                closeDropdown: false,
              });
              setSearchText(selectedKeys[0]);
              setSearchedColumn(dataIndex);
            }}
          >
            Filter
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => {
              close();
            }}
          >
            close
          </Button>
        </Space>
      </div>
    ),
    filterIcon: (filtered) => (
      <SearchOutlined
        style={{
          color: filtered ? "#1677ff" : undefined,
        }}
      />
    ),
    onFilter: (value, record) =>
      record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()),
    onFilterDropdownOpenChange: (visible) => {
      if (visible) {
        setTimeout(() => searchInput.current?.select(), 100);
      }
    },
    render: (text) =>
      searchedColumn === dataIndex ? (
        <Highlighter
          highlightStyle={{
            backgroundColor: "#ffc069",
            padding: 0,
          }}
          searchWords={[searchText]}
          autoEscape
          textToHighlight={text ? text.toString() : ""}
        />
      ) : (
        text
      ),
  });

  async function fetchData() {
    setLoading(true);
    const resp = await fetch(
      `${BASE_URL}/${API_ROUTES.stock_on_hand}?${qs.stringify(getSohParams(tableParams))}`,
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
      key: "product",
      render: (_, record) => <ThousandSeparator value={record.product.buyPrice} />,
    },

    {
      title: "Sale Price(TZS)",
      key: "product",
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
      render: (_, record) => (
        <Button type="primary" onClick={() => handleSetProduct(record)}>
          Adjust
        </Button>
      ),
    },
  ];

  const handleSetProduct = (product) => {
    setSelectedProduct(product);
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
  }, [JSON.stringify(tableParams)]);
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
      />
      <StockAdjustmentModal
        key={selectedProduct?.id}
        selectedProduct={selectedProduct}
        handleSetProduct={handleSetProduct}
      />
    </>
  );
}
