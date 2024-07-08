import { useRecoilState, useRecoilValue } from "recoil";
import likedSongsAtom from "../atoms/LikedSongsAtom";
import userAtom from "../atoms/userAtom";
import useShowToast from "./useShowToast";
import { useEffect, useState } from "react";

const useGetLikedSongs = () => {
  const user = useRecoilValue(userAtom);

  //   const [playlist, setPlaylist] = useState(null);
  const [fetching, setFetching] = useState(false);
  const showToast = useShowToast();
  //   const [likedPlaylist, setLikedPlaylist] = useRecoilState(likedPlaylistAtom);
  const [likedSongs, setLikedSongs] = useRecoilState(likedSongsAtom);
  //   const [ownPlaylist, setOwnPlaylist] = useRecoilState(ownedPlaylistsAtom);
  // const [feedOne, setFeedOne] = useRecoilState(feedOneAtom);
  //   const [feedTwo, setFeedTwo] = useRecoilState(feedTwoAtom);
  //   const [fetchData, setFetchData] = useState(null);

  useEffect(() => {
    const getLikedSongs = async () => {
      if (fetching) {
        return;
      }

      setFetching(true);
      try {
        const res = await fetch(`/api/playlists/likedsongs`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
        });
        const data = await res.json();
        if (data.error) {
          showToast("Error", data.error, "error");
          return;
        }

        setLikedSongs(() => data);
        // setFetchData(data);
      } catch (error) {
        showToast("Error", error, "error");
        // setPosts(null);
        setLikedSongs([null]);
        // setLikedPlaylist(null);
        // setOwnPlaylist(null);
      } finally {
        // setFetching(false);
        setFetching(false);
      }
    };
    getLikedSongs();
  }, [showToast, setLikedSongs, setFetching]);

  return {
    fetching,
    likedSongs,
  };
};

export default useGetLikedSongs;
