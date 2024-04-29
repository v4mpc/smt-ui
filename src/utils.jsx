import {notification} from "antd";

export const BASE_URL = "http://localhost:3000";

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
  form=null
) {
  let initData = {
    method: method,
    headers: {
      "Content-Type": "application/json",
    },
  };

  if (method === "POST") {
    initData.body = JSON.stringify(data);
  }

  try {
    setIsLoading(true);
    setError("");
    const resp = await fetch(`${BASE_URL}/${path}`, initData);
    if (!resp.ok) {
      console.log(await resp.json());
      throw new Error("Network response was not ok");
    }
    const respData = await resp.json();
    if (method === "GET") {
      setData(respData);
    }
    if (method === "POST") {
      form.resetFields();
      openNotification("post-success", "success", "Success", "Record save successfully");
    }
  } catch (e) {
    console.error(e);
    openNotification(e.message, "error", "Error", e.message);
    setError(e.message);
  } finally {
    setIsLoading(false);
  }
}
