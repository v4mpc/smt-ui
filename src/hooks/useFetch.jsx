import { useEffect, useState } from "react";
import {fetchData} from "../utils.jsx";

export function useFetch(data, setData, urlPath, errorNotificationKey) {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchData(data, urlPath, setIsLoading, setError, "GET", setData);
  }, []);

  return [data, isLoading, error];
}
