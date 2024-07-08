import { atom } from "recoil";

const likedPlaylistAtom = atom({
  key: "likedPlaylistAtom",
  default: [],
});

export default likedPlaylistAtom;
