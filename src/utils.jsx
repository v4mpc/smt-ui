import { notification } from "antd";
import dayjs from "dayjs";

// export const BASE_URL = "http://localhost:3000";
export const BASE_URL = "http://localhost:8080";

export const DEFAULT_PAGE_SIZE = 20;

export const DATE_FORMAT = "YYYY-MM-DD";

export const API_ROUTES = {
  products: "products",
  expenses: "expenses",
  sales: "sales",
  stockOnhand: "stock-on-hand",
  adjust: "stock-on-hand/adjust",
  stockOnhandAll: "stock-on-hand/all",
  units: "units",
};

export function openNotification(key, type, title, description) {
  notification[type]({
    key: key,
    message: title,
    description: description,
  });
}

export async function fetchData(
  data,
  path,
  setIsLoading,
  setError,
  method = "GET",
  setData = null,
  form = null,
  successCallback,
) {
  let initData = {
    method: method,
    headers: {
      "Content-Type": "application/json",
    },
  };

  if (method === "POST" || method === "PUT") {
    console.log(data);
    if (data.hasOwnProperty("date")) {
      Date.prototype.toISOString = function () {
        return dayjs(this).format(DATE_FORMAT);
      };
      initData.body = JSON.stringify({
        ...data,
        date: data.date.format(DATE_FORMAT),
      });
      console.log(initData.body);
    }
    initData.body = JSON.stringify(data);
  }

  try {
    setIsLoading(true);
    setError("");
    const resp = await fetch(`${BASE_URL}/${path}`, initData);
    if (!resp.ok) {

      throw new Error("Network response was not ok");
    }
    const respData = await resp.json();
    if (method === "GET") {
      setData(respData);
    }
    if (method === "POST" || method === "PUT") {
      form?.resetFields();
      openNotification(
        "post-success",
        "success",
        "Success",
        "Record save successfully",
      );
      if (successCallback) {
        successCallback();
      }
    }
  } catch (e) {
    console.error(e);
    openNotification(e.message, "error", "Error", e.message);
    setError(e.message);
  } finally {
    setIsLoading(false);
  }
}
