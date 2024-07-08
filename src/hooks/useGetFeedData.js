import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import useShowToast from "./useShowToast";
import { useRecoilState, useRecoilValue } from "recoil";
import likedPlaylistAtom from "../atoms/LikedPlaylistAtom";
import likedSongsAtom from "../atoms/LikedSongsAtom";
import ownedPlaylistsAtom from "../atoms/OwnedPlaylistAtom";
import feedOneAtom from "../atoms/FeedOneAtom";
import feedTwoAtom from "../atoms/feedTwoAtom";
import userAtom from "../atoms/userAtom";

const useGetFeedData = () => {
  // const { playlistId } = useParams();
  const user = useRecoilValue(userAtom);

  const [playlist, setPlaylist] = useState(null);
  const [loading, setLoading] = useState(false);
  const showToast = useShowToast();
  const [likedPlaylist, setLikedPlaylist] = useRecoilState(likedPlaylistAtom);
  const [likedSongs, setLikedSongs] = useRecoilState(likedSongsAtom);
  const [ownPlaylist, setOwnPlaylist] = useRecoilState(ownedPlaylistsAtom);
  const [feedOne, setFeedOne] = useRecoilState(feedOneAtom);
  const [feedTwo, setFeedTwo] = useRecoilState(feedTwoAtom);
  const [fetchData, setFetchData] = useState(null);

  useEffect(() => {
    const getFeedPlaylist = async () => {
      if (loading) {
        return;
      }

      setLoading(true);
      setLikedPlaylist([]);
      try {
        const res = await fetch(`/api/playlists/feed/${user._id}`, {
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
        setLikedPlaylist(data.likedPlaylists);
        setOwnPlaylist(data.ownPlaylist);
        setFeedOne(data.feedOne);
        setFeedTwo(data.feedTwo);
        setLikedSongs(data.likedSongs);
        setLikedSongs(data.likedSongs);
        setFetchData(data);
      } catch (error) {
        showToast("Error", error, "error");
        // setPosts(null);\
        setLikedPlaylist(null);
        setOwnPlaylist(null);
      } finally {
        // setLoading(false);
        setLoading(false);
      }
    };
    getFeedPlaylist();
  }, [
    showToast,
    setFeedOne,
    setFeedTwo,
    setLikedPlaylist,
    setLikedSongs,
    setOwnPlaylist,
    setFetchData,
    setLoading,
  ]);

  return {
    loading,
    feedOne,
    feedTwo,
    likedPlaylist,
    ownPlaylist,
    fetchData,
    likedSongs,
  };
};

export default useGetFeedData;
