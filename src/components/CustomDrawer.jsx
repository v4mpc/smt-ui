import { Drawer } from "antd";
import { useEffect, useState } from "react";
import {
  useLocation,
  useNavigate,
} from "react-router-dom";

export default function CustomDrawer({ title, children }) {
  const [open, setOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (location.pathname === "/expense") {
      setOpen(true);
    } else {
      setOpen(false);
      // navigate(-1);
    }
    // return ()=>(navigate(-1))
  }, [location.pathname]);

  const showDrawer = () => {
    setOpen(true);
  };
  const onClose = () => {
    setOpen(false);
  };

  return (
    <>
      {/*<Button type="primary" onClick={showDrawer}>*/}
      {/*  Open*/}
      {/*</Button>*/}
      <Drawer title={title} onClose={onClose} open={open}>
        {children}
      </Drawer>
    </>
  );
}
