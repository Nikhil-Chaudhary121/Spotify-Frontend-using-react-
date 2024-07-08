import { atom } from "recoil";

const likedSongsAtom = atom({
  key: "likedSongsAtom",
  default: [],
});

export default likedSongsAtom;
