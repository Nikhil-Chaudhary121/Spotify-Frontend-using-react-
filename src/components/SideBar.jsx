import { Box, Flex , Text } from "@chakra-ui/react"
import SiderBarTop from "./SiderBarTop";
import SideBarBottom from "./SideBarBottom";

const SideBar = () => {
  return (
    <Flex h={"100vh"} id="siderbar"  gap={2} flexDirection={"column"} >
        <SiderBarTop/>
        <SideBarBottom/>
    </Flex>
  )
}

export default SideBar