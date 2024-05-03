import { useState, useEffect } from "react";
import dayjs from "dayjs";
import {API_ROUTES, fetchData} from "../utils.jsx";
import {useSearchParams} from "react-router-dom";


export function useDashboard() {
  const [dashboardData, setDashboardData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [selectedMonth, setSelectedMonth] = useState(dayjs());
  const yearMonth=selectedMonth.format('YYYY-MM');


  const chartData = {
    labels: dashboardData?.chartLabel,
    datasets: [
      {
        label: "Expenses",
        data: dashboardData?.expensesChartData,
        borderColor: "rgb(255, 99, 132)",
        backgroundColor: "rgba(255, 99, 132, 0.5)",
      },
      {
        label: "Sales",
        data: dashboardData?.salesChartData,
        borderColor: "rgb(53, 162, 235)",
        backgroundColor: "rgba(53, 162, 235, 0.5)",
      },
    ],
  };

  useEffect(() => {
    fetchData(
      dashboardData,
      `${API_ROUTES.dashboard}?m=${yearMonth}`,
      setIsLoading,
      setError,
      "GET",
      setDashboardData,
    );
  }, [selectedMonth,yearMonth]);

  return [
    dashboardData,
    isLoading,
    chartData,
    selectedMonth,
    setSelectedMonth,
    error,
  ];
}
