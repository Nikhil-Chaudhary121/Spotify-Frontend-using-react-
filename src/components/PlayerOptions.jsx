import { Flex } from "@chakra-ui/react";
import { MdSkipPrevious } from "react-icons/md";
import { FaCirclePlay } from "react-icons/fa6";
import { FaCirclePause } from "react-icons/fa6";
import { MdSkipNext } from "react-icons/md";
import { IoIosShuffle } from "react-icons/io";
import { RxLoop } from "react-icons/rx";
import { useRef, useState } from "react";
import PlayerRange from "./PlayerRange";
import AudioPlayer from "./AudioPlayer";
import { useRecoilState, useRecoilValue } from "recoil";
import currSongAtom from "../atoms/CurrSongAtom";
import currPlaylistAtom from "../atoms/CurrPlaylistAtom";

const PlayerOptions = ({
  handleFunction,
  handleActionLoop,
  NextAction,
  PreviousAction,
  handleShuffle,
}) => {
  const [songCondition, setSongCondition] = useState(false);
  const currSong = useRecoilState(currSongAtom);
  const currPlaylist = useRecoilValue(currPlaylistAtom);
  console.log(currPlaylist);

  const handlePlayPause = () => {
    setSongCondition(!songCondition);
  };

  return (
    <Flex
      flexDirection={"column"}
      right={"50%"}
      position={"absolute"}
      alignItems={"center"}
      className="PlayerOptions"
    >
      <Flex gap={4} alignItems={"center"} cursor={"pointer"}>
        {currPlaylist && (
          <>
            <IoIosShuffle
              className="hide-on-mobile"
              onClick={handleShuffle}
              fontSize={"20px"}
            />
            <MdSkipPrevious fontSize={"20px"} onClick={PreviousAction} />
          </>
        )}
        {!currPlaylist && (
          <>
            <IoIosShuffle
              color=" gray"
              opacity={"0.4"}
              className="hide-on-mobile"
              fontSize={"20px"}
            />
            <MdSkipPrevious color=" gray" opacity={"0.4"} fontSize={"20px"} />
          </>
        )}
        {!songCondition && (
          <FaCirclePlay
            fontSize={"30px"}
            onClick={() => {
              handleFunction();
              handlePlayPause();
            }}
          />
        )}
        {songCondition && (
          <FaCirclePause
            fontSize={"30px"}
            onClick={() => {
              handleFunction();
              handlePlayPause();
            }}
          />
        )}
        {currPlaylist && (
          <MdSkipNext
            fontSize={"20px"}
            cursor={"pointer"}
            onClick={NextAction}
          />
        )}
        {!currPlaylist && (
          <MdSkipNext
            color=" gray"
            opacity={"0.4"}
            fontSize={"20px"}
            cursor={"pointer"}
          />
        )}
        <RxLoop
          className="hide-on-mobile"
          fontSize={"15px"}
          onClick={handleActionLoop}
        />
      </Flex>
      <PlayerRange />
    </Flex>
  );
};

export default PlayerOptions;
