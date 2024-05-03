import { Flex, Statistic, DatePicker, Table, Spin, Button } from "antd";
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
import Loader from "../components/Loader.jsx";
import ThousandSeparator from "../components/ThousandSeparator.jsx";

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
    title: "Date",
    dataIndex: "createdAt",
    key:"createdAt"
  },
    {
    title: "Product",
    dataIndex: "productName",
    key:"productName"
  },
  {
    title: "Sold",
    dataIndex: "quantity",
    key:"quantity"
  },
  {
    title: "Total(TZS)",
    dataIndex: "total",
    key:"total",
    render:(_,record)=>(<ThousandSeparator value={record.quantity*record.salePrice}/>)
  },
];



const expensesColumn = [

  {
    title: "Date",
    dataIndex: "createdAt",
    key:"createdAt"
  },
  {
    title: "Name",
    dataIndex: "name",
    key:"name"
  },
  {
    title: "Amount(TZS)",
    dataIndex: "amount",
    key:"amount",
    render:(_,record)=>(<ThousandSeparator value={record.amount}/>)

  },
];


export default function Dashboard() {
  const [dashboardData, isLoading, chartData, selectedMonth, setSelectedMonth] =
    useDashboard();
  const [openNotificationWithIcon, contextHolder] = useNotification();
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

      {isLoading ? (
        <Loader />
      ) : (
        <>
          <Flex vertical gap="large">
            <Flex justify="space-between">
              <Statistic
                title="Total Sales"
                value={dashboardData?.totalSales}
              />

              <Statistic
                  title="Sales Profit"
                  value={dashboardData?.totalSalesProfit}
              />
              <Statistic
                title="Total Expenses"
                value={dashboardData?.totalExpenses}
              />
              <Statistic
                title="Net Profit"
                value={dashboardData?.totalNetProfit}
              />
              <Statistic
                title="Products Sold"
                value={dashboardData?.productsSold}
              />
            </Flex>
          </Flex>
          <Flex vertical>
            <Line options={options} data={chartData} height={"90%"} />
          </Flex>
          <Flex vertical={false} gap="middle">
            <Table
              title={() => "Top Sales"}
              columns={columns}
              bordered={true}
              dataSource={dashboardData?.topSales}
              style={{width:"50%"}}
            />
            <Table
              title={() => "Top Expenses"}
              columns={expensesColumn}
              bordered={true}
              style={{
                width:"50%",

            }}
              dataSource={dashboardData?.topExpenses}
            />
          </Flex>
        </>
      )}
    </Flex>
  );
}
