import { notification } from "antd";
import dayjs from "dayjs";

// export const BASE_URL = "http://localhost:3000";
// export const BASE_URL = "http://localhost:8080";
export const BASE_URL = "https://2c88-197-250-198-59.ngrok-free.app:8080";

export const DEFAULT_PAGE_SIZE = 20;

export const DATE_FORMAT = "YYYY-MM-DD";

export const DASHBOARD_METRICS_PRECISION=0;
export const DASHBOARD_DIVIDER_ORIENTATION="left"
export const LINE_TENSION=0.3


export const isEmpty = (obj) => {
  return Object.keys(obj).length === 0;
};

export const API_ROUTES = {
  products: "products",
  expenses: "expenses",
  dashboard:"dashboard",
  sales: "sales",
  stockOnhand: "stock-on-hand",
  adjust: "stock-on-hand/adjust",
  stockOnhandAll: "stock-on-hand/all",
  units: "units",
  unitsAll: "units/all",
  bulkSale: "sales/bulk",
};

export function openNotification(key, type, title, description) {
  notification[type]({
    key: key,
    message: title,
    description: description,
  });
}

export function toSalePayload(data, isSale) {
  return data.map((item) => ({
    productId: item.id,
    isSale: isSale,
    saleAdjustment: 0,
    adjustmentQuantity: item.saleQuantity,
    adjustmentDate: dayjs(item.saleDate, DATE_FORMAT),
  }));
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
    let modifiedData = data;
    if (Object.hasOwn(modifiedData, "createdAt")) {
      Date.prototype.toISOString = function () {
        return dayjs(this).format(DATE_FORMAT);
      };
      modifiedData = {
        ...modifiedData,
        createdAt: data.createdAt.format(DATE_FORMAT),
      };
    }

    if (Object.hasOwn(modifiedData, "unitOfMeasure")) {
      modifiedData = {
        ...modifiedData,
        unitOfMeasure: { id: modifiedData.unitOfMeasure },
      };
    }
    initData.body = JSON.stringify(modifiedData);
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
