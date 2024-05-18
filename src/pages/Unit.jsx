import GenericTable from "../components/GenericTable.jsx";
import { API_ROUTES } from "../utils.jsx";
import {SearchOutlined} from "@ant-design/icons";
import FilterDropdown from "../components/FilterDropdown.jsx";
import { Form ,Input} from "antd";


const unitColumns = [
  {
    title: "#",
    dataIndex: "id",
    key: "id",
    width: "5%",
  },
  {
    title: "Code",
    key: "code",
    dataIndex: "code",
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
    title: "Name",
    key: "name",
    dataIndex: "name",
  },

  {
    title: "Action",
    key: "action",
  },
];

export default function Unit() {
  return (
    <GenericTable itemColumns={unitColumns} listPath={API_ROUTES.units}>
      <>
        <Form.Item
          label="Code"
          name="code"
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
      </>
    </GenericTable>
  );
}
