import { useEffect, useState } from "react";
import { BASE_URL, openNotification } from "../utils.jsx";

export function useFetch(data, setData, urlPath, errorNotificationKey) {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchData() {
      try {
        setIsLoading(true);
        setError("");
        const resp = await fetch(`${BASE_URL}/${urlPath}`);
        if (!resp.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await resp.json();
        setData(data);
      } catch (e) {
        console.error(e);
        openNotification(errorNotificationKey, "error", "Error", e.message);
        setError(e.message);
      } finally {
        setIsLoading(false);
      }
    }

    fetchData();
  }, [setData, urlPath,errorNotificationKey]);

  return [data, isLoading, error];
}
