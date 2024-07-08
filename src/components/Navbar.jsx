import { Button, Flex, Text } from "@chakra-ui/react";
import { FaCircleChevronLeft } from "react-icons/fa6";
import { FaCircleChevronRight } from "react-icons/fa6";
import { IoMdNotificationsOutline } from "react-icons/io";
import { GoPeople } from "react-icons/go";
import { IoPersonOutline } from "react-icons/io5";
import UserProfilePage from "../pages/UserProfilePage";

const Navbar = () => {
  return (
    <Flex
      w={"full"}
      px={2}
      alignItems={"center"}
      pos={"sticky"}
      top={0}
      zIndex={999}
    >
      <Flex
        px={6}
        bg={"#121212"}
        w={"full"}
        h={"60px"}
        justifyContent={"space-between"}
        alignItems={"center"}
      >
        <Flex alignItems={"center"} gap={4}>
          <FaCircleChevronLeft fontSize={"22"} />
          <FaCircleChevronRight fontSize={"22"} />
        </Flex>
        <Flex alignItems={"center"} gap={3}>
          <Button
            color={"#000"}
            bg={"#fff"}
            className="hide-on-900"
            fontWeight={"bold"}
            fontSize={13}
            borderRadius={"full"}
          >
            Explore Premium
          </Button>
          <IoMdNotificationsOutline className="nav-icons" />
          {/* <GoPeople className="nav-icons" /> */}
          {/* <IoPersonOutline className="nav-icons" /> */}
          <UserProfilePage />
        </Flex>
      </Flex>
    </Flex>
  );
};

export default Navbar;
