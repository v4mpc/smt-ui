import {Flex, Statistic, DatePicker, Table, Spin, Button} from "antd";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";
import { useDashboard } from "../hooks/useDashboard.jsx";
import useNotification from "../hooks/useNotification.jsx";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
);

const options = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      position: "top",
    },
    title: {
      display: true,
      text: "Sales and Expenses trends",
    },
  },
};

const columns = [
  {
    title: "Product",
    dataIndex: "product",
  },
  {
    title: "Sold",
    dataIndex: "sold",
  },
  {
    title: "Total",
    dataIndex: "total",
  },
];
const tableData = [
  {
    key: "1",
    product: "John Brown",
    sold: 32,
    total: "New York No. 1 Lake Park",
  },
  {
    key: "2",
    product: "Jim Green",
    sold: 42,
    total: "London No. 1 Lake Park",
  },
  {
    key: "3",
    product: "Joe Black",
    sold: 32,
    total: "Sydney No. 1 Lake Park",
  },
];

export default function Dashboard() {
  const [dashboardData, isLoading, chartData, selectedMonth, setSelectedMonth] =
    useDashboard();
  const [openNotificationWithIcon,contextHolder] = useNotification();
  if (isLoading) return <Spin />;
  return (
    <Flex gap="middle" vertical>
      <Flex justify="space-between">
        <h2>{selectedMonth.format("MMMM YYYY")} | Stats</h2>
        <Flex align="center">
          <DatePicker
            value={selectedMonth}
            onChange={(e) => {
              e && setSelectedMonth(e);
            }}
            picker="month"
          />
        </Flex>
      </Flex>

      <Flex vertical>
        <Flex justify="space-between">
          <Statistic title="Total Sales" value={dashboardData?.totalSales} />
          <Statistic
            title="Total Expenses"
            value={dashboardData?.totalExpenses}
          />
          <Statistic title="Total Profit" value={dashboardData?.totalProfit} />
          <Statistic
            title="Products Sold"
            value={dashboardData?.productsSold}
          />
        </Flex>
      </Flex>

      <Flex vertical>
        <Line options={options} data={chartData} />
      </Flex>
      <Flex vertical={false} justify="space-between">
        <Table
          title={() => "Top Sales"}
          columns={columns}
          dataSource={tableData}
        />
        <Table
          title={() => "Top Expenses"}
          columns={columns}
          dataSource={tableData}
        />
        <Table
          title={() => "Top Selling"}
          columns={columns}
          dataSource={tableData}
        />

        <Button onClick={()=>openNotificationWithIcon("info","dg","sfsdf")}>Click me</Button>
      </Flex>
    </Flex>
  );
}
