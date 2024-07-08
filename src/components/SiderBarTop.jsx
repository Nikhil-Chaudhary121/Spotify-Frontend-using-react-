import { Flex, Text } from "@chakra-ui/react";
import { GrHomeRounded } from "react-icons/gr";
import { FaSearch } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const SiderBarTop = () => {
  const navigate = useNavigate();
  return (
    <Flex
      className="siderbar-part-size"
      position={"relative"}
      flexDirection={"column"}
      gap={6}
      p={4}
      w={"full"}
      background={"#121212"}
      borderRadius={6}
    >
      <Flex
        onClick={() => {
          navigate("/");
        }}
        className="siderbar-part"
        alignItems={"center"}
        w={"full"}
        gap={4}
      >
        <GrHomeRounded className="sidebar-icon" />
        <Text className="hide-on-900" fontWeight={"bold"}>
          Home
        </Text>
      </Flex>
      <Flex
        className="siderbar-part"
        alignItems={"center"}
        w={"full"}
        onClick={() => {
          navigate("/search");
        }}
        gap={4}
      >
        <FaSearch className="sidebar-icon" />
        <Text className="hide-on-900" fontWeight={"bold"}>
          Search
        </Text>
      </Flex>
    </Flex>
  );
};

export default SiderBarTop;
