import { Divider, Flex, Text, useStatStyles } from "@chakra-ui/react";
import HCardGrp from "../components/HCardGrp";
import VCard from "../components/VCard";
import PlayListBanner from "../components/PlayListBanner";
import BannerActionGrp from "../components/BannerActionGrp";
import { MdAccessTime } from "react-icons/md";
import SongCard from "../components/SongCard";
import { useRecoilState, useRecoilValue } from "recoil";
import likedSongsAtom from "../atoms/LikedSongsAtom";
import { useParams } from "react-router-dom";
import useGetPlaylist from "../hooks/useGetPlaylist";
import { Howl, Howler } from "howler";
import songCondi from "../atoms/SongCondiAtom";
import { useState } from "react";
import useMusicPlayerFunctions from "../hooks/useMusicPlayerFunctions";
import likedPlaylistAtom from "../atoms/LikedPlaylistAtom";
import currPlaylistAtom from "../atoms/CurrPlaylistAtom";

const PlayList = ({ handleAction }) => {
  const { playlistId } = useParams();
  const { playlist, loading } = useGetPlaylist();
  const [songPlayed, setSongPlayed] = useState(null);
  const [songCondition, setSongCondition] = useRecoilState(songCondi);
  const { handlePlaySong } = useMusicPlayerFunctions();
  // const handlePlaySong = (songUrl) => {
  //   let sound = new Howl({
  //     src: [songUrl],
  //     html5: true,
  //     volume: 1,
  //   });

  //   if (songPlayed) {
  //     console.log("Song Stoped");
  //     songPlayed.stop();
  //   }
  //   setSongPlayed(sound);
  //   console.log("Song Played");
  //   setSongCondition(true);
  //   sound.play();
  // };

  // console.log(playlistId);
  const [likedSongs, setLikedSongs] = useRecoilState(likedSongsAtom);
  // console.log("liked songs = ", likedSongs);

  return (
    <Flex px={2} w={"full"} flexDir={"column"} overflow={"scroll"}>
      <PlayListBanner playlist={playlist} />
      <BannerActionGrp playlist={playlist} />
      <Flex pt={2}>
        <Flex
          px={8}
          position={"relative"}
          color={"gray"}
          w={"full"}
          justifyContent={"space-between"}
        >
          <Flex alignItems={"center"} gap={4}>
            <Text fontWeight={"bold"} lineHeight={1} fontSize={20}>
              #
            </Text>
            <Text>Title</Text>
          </Flex>
          <Flex className=" hide-on-1600 ablum">
            <Text ml={8}>Ablum</Text>
          </Flex>
          <Flex mr={16}>
            <MdAccessTime />
          </Flex>
        </Flex>
      </Flex>
      <Flex px={2}>
        <Divider my={2} />
      </Flex>
      <Flex flexDir={"column"} gap={1} mb={12} px={2}>
        {playlist?.songs &&
          playlist?.songs.map((song, idx) => (
            <SongCard
              playlist={playlist}
              handleSongAction={handlePlaySong}
              idx={idx}
              key={idx}
              songId={song._id}
              avatar={song.songImg}
              songName={song.songName}
              singerName={song.singerName}
              albumName={song.songName}
              totDur={song.totDur}
              songUrl={song.songUrl}
            />
          ))}
      </Flex>
    </Flex>
  );
};

export default PlayList;
