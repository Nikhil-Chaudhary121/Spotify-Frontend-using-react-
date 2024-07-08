import { Flex, Text } from "@chakra-ui/react"

const PlayerRangeMobile = () => {
  return (
    <Flex className="prog-mob" w={"full"} alignItems={"center"} gap={2} >
        <Text className="prog-mob-details" fontSize={"sm"}>0:00</Text>
        <input type="range" min={0} max={100} step={1} name="progbar" className="prog-mob-bar"/>
        <Text className="prog-mob-details" fontSize={"sm"}>2:50</Text>

    </Flex>
  )
}

export default PlayerRangeMobile