import { Flex } from "antd";
import Profile from "../components/Profile.jsx";
import GeneralConfiguration from "../components/GeneralConfigurations.jsx";

const General = () => {
  return (
    <Flex vertical={false} style={{ width: "100%" }} justify="center">
      <Flex gap="middle" vertical={true}>
        <Profile />
        <GeneralConfiguration />
      </Flex>
    </Flex>
  );
};

export default General;
