import { Flex } from "@chakra-ui/react";
import HSizeCard from "./HSizeCard";
import PlayerOptions from "./PlayerOptions";
import UselessOptions from "./UselessOptions";
import MusicDesCard from "./MusicDesCard";
import LikeBtn from "./LikeBtn";
import { useRecoilValue } from "recoil";
import currSongAtom from "../atoms/CurrSongAtom";
import { Howl, Howler } from "howler";
import { useEffect, useState } from "react";
import likedSongsAtom from "../atoms/LikedSongsAtom";

const MusicPlayer = ({
  handlePlayer,
  handlePlayPauseAction,
  handleLoopAction,
  NextAction,
  PreviousAction,
  handleShuffle,
}) => {
  const currSong = useRecoilValue(currSongAtom);
  const likedSongs = useRecoilValue(likedSongsAtom);
  // console.log(currSong);
  let isSongLiked = likedSongs.songs.some((obj) => obj._id === currSong.songId);
  const [liked, setLiked] = useState(isSongLiked);

  const handlePlayPauseSong = () => {};
  return (
    <Flex
      h={"75px"}
      className="musicplayer"
      zIndex={99}
      onClick={handlePlayer}
      position={"absolute"}
      justifyContent={"space-between"}
      bottom={0}
      w={"100vw"}
      px={4}
      background={"#000"}
    >
      <Flex gap={6}>
        {currSong && (
          <MusicDesCard
            canLike={1}
            title={currSong?.songName.slice(0, 20)}
            avatar={currSong?.avatar}
            singer={currSong?.singerName}
          />
        )}
        <LikeBtn liked={liked} setLiked={setLiked} />
      </Flex>
      <PlayerOptions
        handleActionLoop={handleLoopAction}
        handleFunction={handlePlayPauseAction}
        NextAction={NextAction}
        PreviousAction={PreviousAction}
        handleShuffle={handleShuffle}
      />
      <UselessOptions />
    </Flex>
  );
};

export default MusicPlayer;
