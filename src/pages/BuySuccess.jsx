
import { Button, Result } from 'antd';
import {Link} from "react-router-dom";
const BuySuccess = () => (
    <Result
        status="success"
        title="Successfully Purchased New Products"
        subTitle="Order number: 2017182818828182881 Cloud server configuration takes 1-5 minutes, please wait."
        extra={[
            <Button type="primary" key="console">
                <Link to="/dashboard">Go Dashboard</Link>
            </Button>,
            <Button key="buy">
                <Link to="/sell">Buy Again</Link>
            </Button>,
        ]}
    />
);
export default BuySuccess;