import { Flex } from "@chakra-ui/react";
import HPlayListCard from "./HPlayListCard";
import CreatePlaylist from "./CreatePlaylist";
import likedPlaylistAtom from "../atoms/LikedPlaylistAtom";
import { useRecoilState } from "recoil";
import likedSongsAtom from "../atoms/LikedSongsAtom";
import useGetFeedData from "../hooks/useGetFeedData";
import useGetLikedPlaylist from "../hooks/useGetLikedPlaylist";
import useGetLikedSongs from "../hooks/useGetLikedSongs";

const HCardGrp = () => {
  // const [likedPlaylist, setLikedPlaylist] = useRecoilState(likedPlaylistAtom);
  // const [likedSongs, setLikedSongs] = useRecoilState(likedSongsAtom);
  const [likedPlaylist, setLikedPlaylist] = useRecoilState(likedPlaylistAtom);
  if (!likedPlaylist) {
    useGetLikedPlaylist();
  }
  // const { loading, likedPlaylist } = useGetLikedPlaylist();
  const { fetching, likedSongs } = useGetLikedSongs();

  // console.log("liked songs = ", likedSongs);

  return (
    <Flex flexWrap={"wrap"} w={"full"} justifyContent={"space-between"}>
      <HPlayListCard
        avatar={"/liked-song-logo.jpg"}
        playlistId={"likedsongs"}
        title={"Liked Songs"}
        songList={likedSongs?.songs}
      />
      <HPlayListCard
        avatar={"/card-img2.jpg"}
        playlistId={"likedsongs"}
        title={"Recent Played"}
        songList={likedSongs?.songs}
      />
      {likedPlaylist &&
        likedPlaylist.map((playlist, idx) => (
          <HPlayListCard
            key={idx}
            playlistId={playlist._id}
            avatar={playlist.playlistImg}
            title={playlist.playlistName}
            songList={playlist.songs}
          />
        ))}
    </Flex>
  );
};

export default HCardGrp;
