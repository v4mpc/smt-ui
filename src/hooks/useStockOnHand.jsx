import { useState } from "react";
import { useFetch } from "./useFetch.jsx";
import dayjs from "dayjs";
import {API_ROUTES} from "../utils.jsx";

export function useStockOnHand() {
  const [stockOnHand, setStockOnHand] = useState([]);
  const [serverStockOnHand, isLoading, error] = useFetch(
    stockOnHand,
    setStockOnHand,
    API_ROUTES.stock_on_hand,
    "stockOnHandErrorKey",
  );

  const modifiedStockOnHand = serverStockOnHand?.map((soh) => {
    return { ...soh, saleDate: dayjs() };
  });

  return [modifiedStockOnHand,setStockOnHand, isLoading, error];
}
