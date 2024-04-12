import { faker } from "@faker-js/faker";
import { useState, useEffect } from "react";
import dayjs from "dayjs";

const BASE_URL = "http://localhost:3000";

export function useDashboard() {
  const [dashboardData, setDashboardData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [selectedMonth, setSelectedMonth] = useState(dayjs());

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
    async function fetchDashboardData() {
      try {
        setIsLoading(true);
        setError("");
        const resp = await fetch(`${BASE_URL}/dashboard`);
        const data = await resp.json();
        setDashboardData(data);
      } catch (e) {
        setError("There was an error");
      } finally {
        setIsLoading(false);
      }
    }

    fetchDashboardData();
  }, [selectedMonth]);


  return [dashboardData, isLoading, chartData, selectedMonth,setSelectedMonth, error];
}
