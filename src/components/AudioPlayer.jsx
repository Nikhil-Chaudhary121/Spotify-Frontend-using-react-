import React from "react";
import { useRecoilValue } from "recoil";
import currSongAtom from "../atoms/CurrSongAtom";
import { Flex } from "@chakra-ui/react";

function AudioPlayer({ audioUrl }) {
  return (
    <Flex mt={-8}>
      {/* <Audio controls>
        <source src={audioUrl} type="audio/mpeg" />
        Your browser does not support the audio element.
      </Audio> */}
      <audio controls>
        <source src={audioUrl} type="audio/mpeg" />
        Your browser does not support the audio element.
      </audio>
    </Flex>
  );
}

export default AudioPlayer;
