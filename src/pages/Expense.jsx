import GenericTable from "../components/GenericTable.jsx";
import ThousandSeparator from "../components/ThousandSeparator.jsx";
import { InputNumber, Form, Input, DatePicker} from "antd";

const expenseColumns = [
  {
    title: "#",
    dataIndex: "id",
    key: "id",
    width: "5%",
  },
  {
    title: "Date",
    key: "date",
    dataIndex: "date",
    width: "30%",
  },

  {
    title: "Name",
    key: "name",
    dataIndex: "name",
  },

  {
    title: "Amount(TZS)",
    key: "Amount",
    render: (_, record) => <ThousandSeparator value={record.amount} />,
  },
  {
    title: "Action",
    key: "action",
  },
];

export default function Expense() {
  return (
    <GenericTable itemColumns={expenseColumns} listPath="expenses">
      <>
        <Form.Item
            label="Date"
            name="date"
            rules={[
              {
                required: true,
                message: "Please input!",
              },
            ]}
        >
          <DatePicker style={{
            width: '100%',
          }}  />
        </Form.Item>
        <Form.Item label="Expense" name="name">
          <Input />
        </Form.Item>
        <Form.Item label="Amount" name="amount">
          <InputNumber
            style={{
              width: "100%",
            }}
          />
        </Form.Item>
        <Form.Item label="Description" name="description">
          <Input.TextArea />
        </Form.Item>
      </>
    </GenericTable>
  );
}
