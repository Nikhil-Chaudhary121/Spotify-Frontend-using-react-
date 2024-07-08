import { Flex } from "@chakra-ui/react"
import { GrHomeRounded } from "react-icons/gr";
import { FaSearch } from "react-icons/fa";
import { VscLibrary } from "react-icons/vsc";


const MobileSidebar = () => {
  return (
    <Flex zIndex={99999}  className="bot-nav" pos={"absolute"} w={"99%"} h={"60px"} bg={"#000"}>
        <Flex w={"full"} justifyContent={"space-evenly"} alignItems={"center"}>
            <GrHomeRounded fontSize={24} />
            <FaSearch fontSize={24} />
            <VscLibrary fontSize={24} />
        </Flex>
    </Flex>
  )
}

export default MobileSidebar ;