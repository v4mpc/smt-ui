import {Link, Outlet, useLocation} from "react-router-dom";
import {
    CreditCardOutlined,
    DashboardOutlined,
    DownloadOutlined,
    DropboxOutlined,
    FileTextOutlined, LogoutOutlined, RightCircleFilled,
    SettingOutlined, UploadOutlined,
} from "@ant-design/icons";
import {Layout, Menu, theme} from "antd";
import BreadCrumbNav from "./BreadCrumbNav.jsx";
import {DEFAULT_PAGE_SIZE} from "../utils.jsx";


const {Header, Content, Footer, Sider} = Layout;
const items = [
    {
        key: "dashboard",
        icon: <DashboardOutlined/>,
        label: <Link to="/dashboard">Dashboard</Link>,
    },

    {
        key: "stock-on-hand",
        icon: <DropboxOutlined/>,
        // TODO::implement if no pagination in the list page to auto add pagination by default
        label: <Link to={`/stock-on-hand?page=1&size=${DEFAULT_PAGE_SIZE}`}>Stock on hand</Link>,

    },
    {key: "buy", icon: <DownloadOutlined style={{fontSize:"1.1rem"}}/>, label: <Link to="/buy">Buy</Link>},
    {key: "sell", icon: <UploadOutlined/>, label: <Link to="/sell">Sell</Link>},
    {key: "expense", icon: <CreditCardOutlined/>, label: <Link to={`/expense?page=1&size=${DEFAULT_PAGE_SIZE}`} >Expense</Link>},
    {key: "reports", icon: <FileTextOutlined/>, label: <Link to="/reports">Reports</Link>},
    {
        key: "settings",
        icon: <SettingOutlined/>,
        label: "Settings",
        children: [
            {key: "general", label: "❁ General"},
            {key: "units", label: <Link to={`/settings/units?page=1&size=${DEFAULT_PAGE_SIZE}`}>❁ Units</Link>},
            {key: "products", label: <Link to={`/settings/products?page=1&size=${DEFAULT_PAGE_SIZE}`}>❁ Products</Link>},
            {key: "profile", label: "❁ Profile"},
            {key: "designer", label: <Link to="/settings/report-designer">❁ Designer</Link>},
        ],
    },
    {key: "logout", icon: <LogoutOutlined />, label: <Link to="/logout">Logout</Link>},
];



const AppLayout = () => {

    const location = useLocation();
    const {
        token: {colorBgContainer, borderRadiusLG,headerBg},
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
                <div className="demo-logo-vertical"/>
                <Menu
                    theme="dark"
                    mode="inline"
                    defaultOpenKeys={['settings']}
                    selectedKeys={[location?.pathname.slice(1)]}
                    items={items}

                />
            </Sider>
            <Layout
                style={{
                    marginLeft: 200,
                }}
            >

                <BreadCrumbNav/>
                <Content
                    style={{
                        margin: "24px 16px 0",
                        overflow: "initial",
                    }}
                >
                    <div
                        style={{
                            padding: 24,

                            borderRadius: borderRadiusLG,
                            minHeight: '100vh',

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
