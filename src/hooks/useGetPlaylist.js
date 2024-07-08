import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import useShowToast from "./useShowToast";

const useGetPlaylist = () => {
  const { playlistId } = useParams();
  const [playlist, setPlaylist] = useState(null);
  const [loading, setLoading] = useState(true);
  const showToast = useShowToast();

  useEffect(() => {
    const getPlaylist = async () => {
      try {
        const res = await fetch(`/api/playlists/${playlistId}`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
        });
        const data = await res.json();
        // console.log(data);
        if (data.error) {
          showToast("Error", data.error, "error");
          return;
        }
        // console.log(data);
        setPlaylist(() => data);
      } catch (error) {
        showToast("Error", error, "error");
      } finally {
        setLoading(false);
      }
    };
    getPlaylist();
  }, [playlistId, showToast]);

  return { loading, playlist };
};

export default useGetPlaylist;
