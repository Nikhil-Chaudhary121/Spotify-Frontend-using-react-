import { Flex, Image, Text } from "@chakra-ui/react"
import { FaAngleDown } from "react-icons/fa6";
import LikeBtn from "./LikeBtn";
import PlayerOptionsMobile from "./PlayerOptionsMobile";


const MusicplayerMobile = ({player , setPlayer , handlePlayer}) => {
  
  return (
    <Flex position={"absolute"} w={"98%"} h={"94%"} bg={"#202020"} className="mobile-music-player"  zIndex={99999} p={6} mt={-2}  pb={10} borderRadius={10}>
        <Flex w={"full"} h={"full"} flexDir={"column"} justifyContent={"space-between"}>
          <Flex >
            <FaAngleDown fontSize={20} onClick={handlePlayer} />
          </Flex>
          <Flex w={"full"}>
            <Image borderRadius={6} src="/card-img6.jpg"/>
          </Flex>
          <Flex w={"full"} flexDirection={"column"} gap={6}>
            <Flex justifyContent={"space-between"} alignItems={"center"}>
              <Flex flexDirection={"column"}>
                <Text fontSize={24} fontWeight={"bold"} lineHeight={1.1} >Kirai</Text>
                <Text fontSize={18} color={"gray"}>Fujii Kaze</Text>
              </Flex>
              <LikeBtn fs="32"/>
            </Flex>
            <PlayerOptionsMobile/>
          </Flex>
        </Flex>
    </Flex>
  )
}

export default MusicplayerMobile