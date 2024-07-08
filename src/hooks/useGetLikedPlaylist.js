import likedPlaylistAtom from "../atoms/LikedPlaylistAtom";
import userAtom from "../atoms/userAtom";
import useShowToast from "./useShowToast";
import { useRecoilState, useRecoilValue } from "recoil";
import { useEffect, useState } from "react";

const useGetLikedPlaylist = () => {
  const user = useRecoilValue(userAtom);

  //   const [playlist, setPlaylist] = useState(null);
  const [loading, setLoading] = useState(false);
  const showToast = useShowToast();
  const [likedPlaylist, setLikedPlaylist] = useRecoilState(likedPlaylistAtom);
  //   const [likedSongs, setLikedSongs] = useRecoilState(likedSongsAtom);
  //   const [ownPlaylist, setOwnPlaylist] = useRecoilState(ownedPlaylistsAtom);
  //    const [feedOne, setFeedOne] = useRecoilState(feedOneAtom);
  //   const [feedTwo, setFeedTwo] = useRecoilState(feedTwoAtom);
  //   const [fetchData, setFetchData] = useState(null);

  useEffect(() => {
    const getLikedPlaylist = async () => {
      if (loading) {
        return;
      }

      setLoading(true);
      try {
        const res = await fetch(`/api/playlists/likedplaylist/${user._id}`, {
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
        // console.log(data);
        // console.log(data.likedPlaylists);
        // console.log(data.ownPlaylist);
        setLikedPlaylist(() => data);
        // setOwnPlaylist(data.ownPlaylist);
        // setFeedOne(data);
        // setFeedTwo(data.feedTwo);
        // setLikedSongs(data.likedSongs);
        // setLikedSongs(data.likedSongs);
        // setFetchData(data);
      } catch (error) {
        showToast("Error", error, "error");
        // setPosts(null);
        // setFeedOne([null]);
        setLikedPlaylist(null);
        // setOwnPlaylist(null);
      } finally {
        // setLoading(false);
        setLoading(false);
      }
    };
    getLikedPlaylist();
  }, [showToast, setLikedPlaylist, setLoading]);

  return {
    loading,
    likedPlaylist,
  };
};

export default useGetLikedPlaylist;
