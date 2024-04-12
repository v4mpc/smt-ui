import React from "react";
import {
  DashboardOutlined,
  DownloadOutlined,
  DropboxOutlined,
  FileTextOutlined,
  LaptopOutlined,
  NotificationOutlined,
  SettingOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Breadcrumb, Layout, Menu, theme, Typography } from "antd";

const { Title } = Typography;

const footerStyle = {
  textAlign: "center",
  color: "#fff",
  backgroundColor: "#4096ff",
};
const { Header, Content, Sider, Footer } = Layout;

const items3 = [UserOutlined, LaptopOutlined, NotificationOutlined].map(
  (icon, index) => {
    const key = String(index + 1);
    return {
      key: `sub${key}`,
      icon: React.createElement(icon),
      label: `subnav ${key}`,
      children: new Array(4).fill(null).map((_, j) => {
        const subKey = index * 4 + j + 1;
        return {
          key: subKey,
          label: `option${subKey}`,
        };
      }),
    };
  },
);

const items2 = [
  { key: "dashboard", icon: <DashboardOutlined />, label: "Dashboard" },
  { key: "buy", icon: <DownloadOutlined />, label: "Buy" },
  { key: "soh", icon: <DropboxOutlined />, label: "Stock on hand" },
  { key: "reports", icon: <FileTextOutlined />, label: "Reports" },
  {
    key: "settings",
    icon: <SettingOutlined />,
    label: "Settings",
    children: [
      { key: "general", label: "General" },
      { key: "units", label: "Units" },
      { key: "products", label: "Products" },
      { key: "roles", label: "Roles" },
      { key: "users", label: "Users" },
    ],
  },
];
const AppLayout = () => {
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();
  return (
    <Layout style={{ height: "100vh" }}>
      <Header
        style={{
          position: "sticky",
          top: 0,
          zIndex: 1,
          width: "100%",
          display: "flex",
          alignItems: "center",
        }}
      >
        <Title style={{ color: "#fff" }}>SMT</Title>
      </Header>
      <Layout>
        <Sider
          width={200}
          style={{
            background: colorBgContainer,
          }}
        >
          <Menu
            mode="inline"
            defaultSelectedKeys={["1"]}
            defaultOpenKeys={["sub1"]}
            style={{
              height: "100%",
              borderRight: 0,
            }}
            items={items2}
          />
        </Sider>
        <Layout
          style={{
            padding: "0 24px 24px",
          }}
        >
          <Breadcrumb
            style={{
              margin: "16px 0",
            }}
          >
            <Breadcrumb.Item>Home</Breadcrumb.Item>
            <Breadcrumb.Item>List</Breadcrumb.Item>
            <Breadcrumb.Item>App</Breadcrumb.Item>
          </Breadcrumb>
          <Content
            style={{
              padding: 24,
              margin: 0,
              minHeight: 280,
              background: colorBgContainer,
              borderRadius: borderRadiusLG,
            }}
          >
            Content
          </Content>
        </Layout>
      </Layout>
      <Footer style={footerStyle}>Footer</Footer>
    </Layout>
  );
};
export default AppLayout;
