import { atom } from "recoil";

const ownedPlaylistsAtom = atom({
  key: "ownedPlaylistsAtom",
  default: [],
});

export default ownedPlaylistsAtom;
