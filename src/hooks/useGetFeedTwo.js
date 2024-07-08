import feedTwoAtom from "../atoms/feedTwoAtom";
import userAtom from "../atoms/userAtom";
import useShowToast from "./useShowToast";
import { useRecoilState, useRecoilValue } from "recoil";
import { useEffect, useState } from "react";

const useGetFeedTwo = () => {
  const user = useRecoilValue(userAtom);

  //   const [playlist, setPlaylist] = useState(null);
  const [loading, setLoading] = useState(false);
  const showToast = useShowToast();
  //   const [likedPlaylist, setLikedPlaylist] = useRecoilState(likedPlaylistAtom);
  //   const [likedSongs, setLikedSongs] = useRecoilState(likedSongsAtom);
  //   const [ownPlaylist, setOwnPlaylist] = useRecoilState(ownedPlaylistsAtom);
  // const [feedOne, setFeedOne] = useRecoilState(feedOneAtom);
  const [feedTwo, setFeedTwo] = useRecoilState(feedTwoAtom);
  //   const [fetchData, setFetchData] = useState(null);

  useEffect(() => {
    const getFeedTwo = async () => {
      if (loading) {
        return;
      }

      setLoading(true);
      try {
        const res = await fetch(`/api/playlists/feedtwo/${user._id}`, {
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
        // setLikedPlaylist(data.likedPlaylists);
        // setOwnPlaylist(data.ownPlaylist);
        // setFeedOne(data);
        setFeedTwo(() => data);
        // setLikedSongs(data.likedSongs);
        // setLikedSongs(data.likedSongs);
        // setFetchData(data);
      } catch (error) {
        showToast("Error", error, "error");
        // setPosts(null);
        setFeedTwo([null]);
        // setLikedPlaylist(null);
        // setOwnPlaylist(null);
      } finally {
        // setLoading(false);
        setLoading(false);
      }
    };
    getFeedTwo();
  }, [showToast, setFeedTwo, setLoading]);

  return {
    loading,
    feedTwo,
  };
};

export default useGetFeedTwo;
