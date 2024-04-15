import { notification } from "antd";




export const BASE_URL = "http://localhost:3000";
export function openNotification(key, type, title, description) {
  notification[type]({
    key: key,
    message: title,
    description: description,
  });
}
