import GenericTable from "../components/GenericTable.jsx";
import { Form, Input} from "antd";

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
  return(



      <GenericTable itemColumns={unitColumns} listPath="units">
        <>
          <Form.Item label="Code" name="code"  rules={[
            {
              required: true,
              message: "Please input!",
            },
          ]}>
            <Input />
          </Form.Item>

          <Form.Item label="Name" name="name"  rules={[
            {
              required: true,
              message: "Please input!",
            },
          ]}>
            <Input />
          </Form.Item>

        </>
      </GenericTable>
  );
}
