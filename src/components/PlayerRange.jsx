import { Flex, Input, Text } from "@chakra-ui/react";
import { useRecoilValue } from "recoil";
import currSongAtom from "../atoms/CurrSongAtom";

const PlayerRange = () => {
  const currSong = useRecoilValue(currSongAtom);
  return (
    <Flex className="prog" alignItems={"center"} gap={2}>
      <Text className="prog-details" fontSize={"sm"}>
        0:00
      </Text>
      <input
        type="range"
        min={0}
        max={100}
        step={1}
        name="progbar"
        className="prog-bar"
      />
      <Text className="prog-details" fontSize={"sm"}>
        2:50
      </Text>
    </Flex>
  );
};

export default PlayerRange;
