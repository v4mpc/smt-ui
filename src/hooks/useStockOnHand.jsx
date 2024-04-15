import { useState } from "react";
import { useFetch } from "./useFetch.jsx";
import dayjs from "dayjs";

export function useStockOnHand() {
  const [stockOnHand, setStockOnHand] = useState([]);
  const [serverStockOnHand, isLoading, error] = useFetch(
    stockOnHand,
    setStockOnHand,
    "products",
    "stockOnHandErrorKey",
  );

  const modifiedStockOnHand = serverStockOnHand?.map((soh) => {
    return { ...soh, saleDate: dayjs() };
  });

  return [modifiedStockOnHand,setStockOnHand, isLoading, error];
}
