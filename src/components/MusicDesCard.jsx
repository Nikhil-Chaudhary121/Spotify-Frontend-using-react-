import { Image,  Box, Flex, Text } from "@chakra-ui/react";
import LikeBtn from "./LikeBtn";

const MusicDesCard = ({avatar , title , songCount , singer , canLike}) => {
  return (
    <Flex alignItems={"center"} gap={4}>
      <Image w={12} h={12} borderRadius={6}  src={avatar} />
      <Flex flexDirection={"column"}> 
        <Text fontWeight={"bold"} fontSize={"md"}>{title}</Text>
        {songCount && 
        <Flex alignItems={"center"} gap={2}>
        <Text fontSize={"md"} color={"gray"}>Playlist</Text>
        <Box w={1} h={1} bg={"gray"} borderRadius={"full"}></Box>
        <Text color={"gray"}>{songCount} songs</Text>
      </Flex>}
        {singer && <Text color={"gray"} fontSize={"md"} >{singer}</Text>}
      </Flex>
      
    </Flex>
  )
}

export default MusicDesCard