import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import useShowToast from "./useShowToast";
import RightSiderBar from "../components/RightSiderBar";

const useRightFeed = () => {
  //   const { playlistId } = useParams();
  const [rightFeed, setRightFeed] = useState(null);
  const [loading, setLoading] = useState(true);
  const showToast = useShowToast();

  useEffect(() => {
    const getRightFeed = async () => {
      try {
        const res = await fetch(`/api/songs/rightfeed`);
        const data = await res.json();
        // console.log(data);
        if (data.error) {
          showToast("Error", data.error, "error");
          return;
        }
        // console.log(data);
        setRightFeed(data);
      } catch (error) {
        showToast("Error", error, "error");
      } finally {
        setLoading(false);
      }
    };
    getRightFeed();
  });

  return { loading, rightFeed };
};

export default useRightFeed;
