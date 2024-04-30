import { Button, Table, Input, Space, Flex } from "antd";
import Highlighter from "react-highlight-words";
import { useSearchParams } from "react-router-dom";
import { SearchOutlined } from "@ant-design/icons";
import { useEffect, useState, useRef } from "react";
import qs from "qs";
import { BASE_URL } from "../utils.jsx";
import StockAdjustmentModal from "../pages/StockAdjustment.jsx";
import GenericTableModal from "./GenericTableModal.jsx";

const getItemParams = (params) => ({
  _limit: params.pagination?.pageSize,
  _page: params.pagination?.current,
  ...params,
});



// listPath='/products'
export default function GenericTable({ itemColumns, listPath, children }) {
  const [searchParams, setSearchParams] = useSearchParams();
  const [data, setData] = useState();
  const [loading, setLoading] = useState(false);
  const formModeRef = useRef("CREATE");
  const [open, setOpen] = useState(false);
  const [tableParams, setTableParams] = useState({
    pagination: {
      current: searchParams.get("_page"),
      pageSize: searchParams.get("_limit"),
    },
  });

  itemColumns = itemColumns.map((obj) => {
    if (obj.key === "action") {
      return {
        ...obj,
        render: (_, record) => (
          <Button type="primary" onClick={() => handleSetItem(record)}>
            Edit
          </Button>
        ),
      };
    }
    return obj;
  });
  const [searchText, setSearchText] = useState("");
  const [searchedColumn, setSearchedColumn] = useState("");
  const searchInput = useRef(null);
  const [selectedItem, setSelectedItem] = useState("");

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
      `${BASE_URL}/${listPath}?${qs.stringify(getItemParams(tableParams))}`,
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
        total: 8,
      },
    });
  }

  const handleSetItem = (item) => {
    formModeRef.current = "UPDATE";
    setSelectedItem(item);
    setOpen(true);
  };

  const handleCreateClicked = () => {
    formModeRef.current = "CREATE";
    setOpen(true);
  };

  const handelModalClose = () => {
    setOpen(false);
  };
  const handleTableChange = (pagination, filters, sorter) => {
    setSearchParams({ _page: pagination.current, _limit: pagination.pageSize });
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
    <Flex gap="middle" vertical>
      <Flex justify="flex-end">
        <Button type="primary" onClick={() => handleCreateClicked()}>
          Add
        </Button>
      </Flex>

      <Table
        onChange={handleTableChange}
        columns={itemColumns}
        dataSource={data}
        bordered={true}
        pagination={tableParams.pagination}
        loading={loading}
        rowKey="id"
      />
      {open && (
        <GenericTableModal
          key={selectedItem?.id}
          title={
            formModeRef.current === "UPDATE" ? "Update item" : "Create item"
          }
          formMode={formModeRef.current}
          selectedItem={selectedItem}
          listPath={listPath}
          open={open}
          handleModalClose={handelModalClose}
          refetchData={fetchData}
        >
          {children}
        </GenericTableModal>
      )}
    </Flex>
  );
}
