import { useEffect, useState } from "react";
import { useFetch } from "./useFetch.jsx";
import dayjs from "dayjs";
import {
  API_ROUTES,
  BASE_URL,
  fetchData,
  openNotification,
} from "../utils.jsx";

export function useStockOnHand(path) {
  const [stockOnhand, setStockOnhand] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    async function fetchData() {
      try {
        setError(true);
        setError("");
        const resp = await fetch(`${BASE_URL}/${path}`);
        if (!resp.ok) {
          throw new Error("Network response was not ok");
        }
        const respData = await resp.json();
        setStockOnhand(
          respData.map((p) => ({
            id: p.product.id,
            productName: p.product.name,
            buyPrice: p.product.buyPrice,
            salePrice: p.product.salePrice,
            stockOnHand: p.stockOnhand,
            unit:p.product.unitOfMeasure.code,
            saleQuantity: 0,
            saleDate: dayjs(),
          })),
        );
      } catch (e) {
        console.error(e);
        openNotification(e.message, "error", "Error", e.message);
        setError(e.message);
      } finally {
        setError(false);
      }
    }

    fetchData();
  }, []);

  return [
    stockOnhand,
    setStockOnhand,
    isLoading,
    setIsLoading,
    error,
    setError,
  ];
}
