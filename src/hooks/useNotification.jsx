import { notification } from "antd";

const useNotification = () => {
  const [api, contextHolder] = notification.useNotification();
  const openNotificationWithIcon = (type, title, description) => {
    api[type]({
      message: title,
      description: description,
    });
  };

  return [openNotificationWithIcon, contextHolder];
};
export default useNotification;
