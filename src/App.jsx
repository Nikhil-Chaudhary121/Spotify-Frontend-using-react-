import { Container } from "@chakra-ui/layout";
import { Navigate, Route, Routes } from "react-router";
import HomePlayList from "./pages/HomePlayList";
import PlayList from "./pages/PlayList";
import SideBar from "./components/SideBar";
import { Flex } from "@chakra-ui/react";

import MusicPlayer from "./components/MusicPlayer";
import RightSiderBar from "./components/RightSiderBar";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import Navbar from "./components/Navbar";
import MobileSidebar from "./components/MobileSidebar";
import MusicplayerMobile from "./components/MusicplayerMobile";
import { useEffect, useState } from "react";
import AuthPage from "./pages/AuthPage";
import UserProfilePage from "./pages/UserProfilePage";
import { useRecoilState, useRecoilValue } from "recoil";
import fullScreenAuth from "./atoms/FullScreenAuth";
import userAtom from "./atoms/userAtom";
import SearchhPage from "./pages/SearchhPage";
import currSongAtom from "./atoms/CurrSongAtom";
import { Howl, Howler } from "howler";
import songPlayedAtom from "./atoms/SongPlayedAtom";
import currPlaylistAtom from "./atoms/CurrPlaylistAtom";
function App() {
  const [player, setPlayer] = useState(false);
  const [fullScreen, setFullScreen] = useRecoilState(fullScreenAuth);
  const [user, setUser] = useRecoilState(userAtom);
  const [currSong, setCurrSong] = useRecoilState(currSongAtom);
  const [songCondition, setSongCondition] = useState(false);
  // const [songPlayed, setSongPlayed] = useRecoilState(songPlayedAtom);
  const [songPlayed, setSongPlayed] = useState(null);
  const [songLoopState, setSongLoopState] = useState(false);
  const [songShuffle, setSongShuffle] = useState(false);
  const currPlaylist = useRecoilValue(currPlaylistAtom);
  // console.log(currSong);
  const handlePlayer = () => {
    setPlayer(!player);
  };
  const handlePausePlaySong = () => {
    if (songCondition) {
      console.log("Song Paused");
      songPlayed.pause();
      setSongCondition(false);
    } else {
      console.log("Song Played");
      songPlayed.play();
      setSongCondition(true);
    }
  };
  const handleLoop = (e) => {
    e.preventDefault();
    if (songLoopState) {
      songPlayed.loop(false);
      console.log("Song removed from loop");
      setSongLoopState(false);
    } else {
      songPlayed.loop(true);
      console.log("Song on Loop");
      setSongLoopState(true);
    }
  };

  const handlePlayNext = (e) => {
    e.preventDefault();
    if (currPlaylist) {
      if (
        currPlaylist.songList.length - 1 !== currSong.songIdx ||
        currPlaylist.songList.length - 1 < currSong.songIdx
      ) {
        // console.log("Next");
        // console.log(currPlaylist.songList.length, " : ", currSong.songIdx);
        const nextSong = currPlaylist.songList[currSong.songIdx + 1];
        // console.log(currSong.songIdx);
        handlePlaySong(nextSong.songUrl);
        setCurrSong({
          songIdx: currSong.songIdx + 1,
          avatar: nextSong.songImg,
          songName: nextSong.songName,
          singerName: nextSong.singerName,
          albumName: currPlaylist.name,
          totDur: nextSong.totDur,
          songId: nextSong._id,
          songUrl: nextSong.songUrl,
        });
      } else {
        // console.log("Last Song , start back");
        const nextSong = currPlaylist.songList[0];
        handlePlaySong(nextSong.songUrl);
        setCurrSong({
          songIdx: 0,
          avatar: nextSong.songImg,
          songName: nextSong.songName,
          singerName: nextSong.singerName,
          albumName: currPlaylist.name,
          totDur: nextSong.totDur,
          songId: nextSong._id,
          songUrl: nextSong.songUrl,
        });
      }
    }
  };
  const handlePlayPrevious = (e) => {
    e.preventDefault();
    if (currPlaylist) {
      if (currSong.songIdx !== 0) {
        const nextSong = currPlaylist.songList[currSong.songIdx - 1];
        handlePlaySong(nextSong.songUrl);
        // console.log(currSong.songIdx);
        // console.log(currSong.songName);
        setCurrSong({
          songIdx: currSong.songIdx - 1,
          avatar: nextSong.songImg,
          songName: nextSong.songName,
          singerName: nextSong.singerName,
          albumName: currPlaylist.name,
          totDur: nextSong.totDur,
          songId: nextSong._id,
          songUrl: nextSong.songUrl,
        });
      } else {
        const nextSong =
          currPlaylist.songList[currPlaylist.songList.length - 1];
        handlePlaySong(nextSong.songUrl);
        // console.log(currSong.songIdx);
        // console.log(currSong.songName);
        setCurrSong({
          songIdx: currPlaylist.songList.length - 1,
          avatar: nextSong.songImg,
          songName: nextSong.songName,
          singerName: nextSong.singerName,
          albumName: currPlaylist.name,
          totDur: nextSong.totDur,
          songId: nextSong._id,
          songUrl: nextSong.songUrl,
        });
      }
    }
  };

  const handleShuffle = (e) => {
    e.preventDefault();
    setSongShuffle(!songShuffle);
    console.log("Shuffle");
  };

  return (
    <>
      <Container
        overflow={"hidden"}
        position={"relative"}
        maxW={"100vw"}
        className="main-container"
        h={"100vh"}
        pt={3}
        px={1}
      >
        <Flex h={"full"} w={"full"} justifyContent={"space-between"}>
          {user && !fullScreen && <SideBar />}
          <Flex w={"full"} px={2}>
            <Flex flexDir={"column"} w={"full"} bg={"#121212"} borderRadius={8}>
              {user && !fullScreen && <Navbar />}
              <Routes>
                <Route
                  path="/"
                  element={!user ? <Navigate to={"auth"} /> : <HomePlayList />}
                />
                <Route
                  path="/:playlistId"
                  element={!user ? <Navigate to={"/"} /> : <PlayList />}
                />
                <Route
                  path="/search"
                  element={!user ? <Navigate to={"/"} /> : <SearchhPage />}
                />
                <Route
                  path="/auth"
                  element={user ? <Navigate to={"/"} /> : <AuthPage />}
                />
              </Routes>
            </Flex>
          </Flex>
          {user && !fullScreen && <RightSiderBar />}
          {user && !fullScreen && currSong && (
            <MusicPlayer
              handleLoopAction={handleLoop}
              handlePlayPauseAction={handlePausePlaySong}
              handlePlayer={handlePlayer}
              NextAction={handlePlayNext}
              PreviousAction={handlePlayPrevious}
              player={player}
              setPlayer={setPlayer}
              handleShuffle={handleShuffle}
            />
          )}
          {user && !fullScreen && !player && currSong && (
            <MusicplayerMobile
              player={player}
              setPlayer={setPlayer}
              handlePlayer={handlePlayer}
            />
          )}
          {user && !fullScreen && <MobileSidebar />}
          {/* {user && <UserProfilePage />} */}
        </Flex>
      </Container>
    </>
  );
}

export default App;
