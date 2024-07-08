import { Search2Icon } from "@chakra-ui/icons";
import { Button, Flex, Input, Text } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import useShowToast from "../hooks/useShowToast";
import VCard from "../components/VCard";
import SongCard from "../components/SongCard";
import SearchSongCard from "../components/SearchSongCard";
import useMusicPlayerFunctions from "../hooks/useMusicPlayerFunctions";

const SearchhPage = () => {
  const showToast = useShowToast();
  const [loading, setLoading] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [resultPlaylists, setResultPLaylists] = useState([]);
  const [resultSongs, setResultSongs] = useState([]);
  const { handlePlaySong } = useMusicPlayerFunctions();
  const handleTextChange = (e) => {
    setSearchText(e.target.value);
  };
  useEffect(() => {
    if (searchText !== "") {
      setLoading(true);
      //   console.log(searchText);
      const getSearchResult = async () => {
        try {
          const res = await fetch(`/api/playlists/search?query=${searchText}`, {
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
          console.log(data);
          setResultPLaylists(data.playlist);
          setResultSongs(data.songs);
        } catch (error) {
          showToast("Error", error, "error");
        } finally {
          setLoading(false);
        }
      };
      getSearchResult();
    }
  }, [searchText]);
  return (
    <>
      <Flex w={"full"} py={2} flexDirection={"column"} px={4}>
        <Flex w={"full"}>
          <Flex w={"full"}>
            <Input
              h={12}
              placeholder="Search"
              value={searchText}
              onChange={handleTextChange}
              borderTopRightRadius={0}
              borderBottomRightRadius={0}
            />
            <Button
              h={12}
              w={20}
              borderTopLeftRadius={0}
              borderBottomLeftRadius={0}
            >
              <Search2Icon />
            </Button>
          </Flex>
        </Flex>
        <Flex flexDir={"column"}>
          {resultPlaylists?.length !== 0 && (
            <Flex flexDir={"column"} gap={6} w={"full"}>
              <Text fontSize={28} fontWeight={"bold"}>
                Playlists
              </Text>
              <Flex
                gap={4}
                justifyContent={"start"}
                className="card-cantainer"
                flexWrap={"wrap"}
              >
                {resultPlaylists.map((playlist, idx) => (
                  <VCard
                    key={idx}
                    playlistId={playlist._id}
                    avatar={playlist.playlistImg}
                    title={playlist.playlistName}
                    description={"This is a Playlist "}
                  />
                ))}
              </Flex>
            </Flex>
          )}
          {resultSongs?.length !== 0 && (
            <Flex flexDir={"column"} gap={6} w={"full"}>
              <Text fontSize={28} fontWeight={"bold"}>
                Songs
              </Text>
              <Flex
                gap={4}
                justifyContent={"space-around"}
                className="card-cantainer"
                flexWrap={"wrap"}
              >
                {resultSongs.map((song, idx) => (
                  <SearchSongCard
                    handleSongAction={handlePlaySong}
                    idx={idx}
                    key={idx}
                    songId={song._id}
                    avatar={song.songImg}
                    songName={song.songName}
                    singerName={song.singerName}
                    albumName={""}
                    totDur={song.totDur}
                    songUrl={song.songUrl}
                  />
                ))}
              </Flex>
            </Flex>
          )}
        </Flex>
      </Flex>
    </>
  );
};
export default SearchhPage;
