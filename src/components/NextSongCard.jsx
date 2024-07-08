import { Flex, Image, Text } from "@chakra-ui/react"

const NextSongCard = ({avatar, title , songName }) => {
  return (
    <Flex flexDir={"column"} w={"full"} bg={"#232323"} borderRadius={4}>
        <Image src={avatar} borderRadius={4}/>
        <Flex flexDir={"column"} p={2}>
            <Text fontWeight={"bold"} fontSize={"md"}>{title}</Text>
            <Text fontSize={15} fontWeight={500} color={"gray"}> Song - {songName}</Text>
        </Flex>
    </Flex>
  )
}

export default NextSongCard