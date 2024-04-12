import {Link, Outlet,useLocation} from "react-router-dom";
import {
    DashboardOutlined,
    DownloadOutlined,
    DropboxOutlined,
    FileTextOutlined,
    SettingOutlined,
} from "@ant-design/icons";
import { Layout, Menu, theme,Breadcrumb,Table } from "antd";

const { Header, Content, Footer, Sider } = Layout;
const items = [
    {
        key: "dashboard",
        icon: <DashboardOutlined />,
        label: <Link to="/dashboard" >Dashboard</Link>,
    },
    { key: "buy", icon: <DownloadOutlined />, label: <Link to="/buy">Buy</Link> },
    {
        key: "stock-on-hand",
        icon: <DropboxOutlined />,
        label: <Link to="/stock-on-hand">Stock on hand</Link>,

    },
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


const columns = [
    {
        title: 'Name',
        dataIndex: 'name',
    },
    {
        title: 'Age',
        dataIndex: 'age',
    },
    {
        title: 'Address',
        dataIndex: 'address',
    },
];
const data = [
    {
        key: '1',
        name: 'John Brown',
        age: 32,
        address: 'New York No. 1 Lake Park',
    },
    {
        key: '2',
        name: 'Jim Green',
        age: 42,
        address: 'London No. 1 Lake Park',
    },
    {
        key: '3',
        name: 'Joe Black',
        age: 32,
        address: 'Sydney No. 1 Lake Park',
    },
];

const AppLayout = () => {

    const location=useLocation();

    console.log(location.pathname.slice(1))

  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();
  return (
    <Layout hasSider>
      <Sider
        style={{
          overflow: "auto",
          height: "100vh",
          position: "fixed",
          left: 0,
          top: 0,
          bottom: 0,
        }}
      >
        <div className="demo-logo-vertical" />
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={[location?.pathname.slice(1)]}
          items={items}
        />
      </Sider>
      <Layout
        style={{
          marginLeft: 200,
        }}
      >
        <Header
          style={{
            position: "sticky",
            padding: 0,
            background: colorBgContainer,
            top: 0,
            zIndex: 1,
          }}
        />
        <Breadcrumb
          style={{
            margin: "24px 16px 0",
          }}
        >
          <Breadcrumb.Item>Home</Breadcrumb.Item>
          <Breadcrumb.Item>List</Breadcrumb.Item>
          <Breadcrumb.Item>App</Breadcrumb.Item>
        </Breadcrumb>
        <Content
          style={{
            margin: "24px 16px 0",
            overflow: "initial",
          }}
        >
          <div
            style={{
              padding: 24,

              background: colorBgContainer,
              borderRadius: borderRadiusLG,
            }}
          >
         <Outlet/>
          </div>
        </Content>
        <Footer
          style={{
            textAlign: "center",
          }}
        >
          SMT ©{new Date().getFullYear()} Created by V4mpc
        </Footer>
      </Layout>
    </Layout>
  );
};
export default AppLayout;
