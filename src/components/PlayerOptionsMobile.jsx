import { Flex, Text } from "@chakra-ui/react";
import { MdSkipPrevious } from "react-icons/md";
import { FaCirclePlay } from "react-icons/fa6";
import { FaCirclePause } from "react-icons/fa6";
import { MdSkipNext } from "react-icons/md";
import { IoIosShuffle } from "react-icons/io";
import { RxLoop } from "react-icons/rx";
import { useState } from "react";
import PlayerRange from "./PlayerRange";
import PlayerRangeMobile from "./PlayerRangeMobile";

const PlayerOptionsMobile = () => {
  const [songCondition, setSongCondition] = useState(false);
  const handlePlayPause = () => {
    setSongCondition(!songCondition);
  };
  return (
    <Flex flexDirection={"column"} w={"full"} alignItems={"center"} gap={6} className="PlayerOptionsMobile">
        <PlayerRangeMobile/>
      <Flex
        gap={4}
        alignItems={"center"}
      >
        <IoIosShuffle  fontSize={"40"} />
        <MdSkipPrevious  fontSize={"40"} />
        {!songCondition && (
          <FaCirclePlay fontSize={"50"} onClick={handlePlayPause} />
        )}
        {songCondition && (
          <FaCirclePause fontSize={"50"} onClick={handlePlayPause} />
        )}
        <MdSkipNext  fontSize={"40"} />
        <RxLoop  fontSize={"28"} />
      </Flex>
    </Flex>
  );
};

export default PlayerOptionsMobile;
