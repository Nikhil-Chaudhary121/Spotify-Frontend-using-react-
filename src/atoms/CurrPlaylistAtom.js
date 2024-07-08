import { atom } from "recoil";

const currPlaylistAtom = atom({
  key: "currPlaylistAtom",
  default: null,
  // {
  //   songName: "Unknown",
  //   singerName: "Unknown",
  //   avatar: "./card-img1.jpg",
  //   songUrl:
  //     "https://res.cloudinary.com/dacyjy5go/video/upload/v1717542817/audio/i0i3hpoauo7vtkglj6bb.mp3",
  // },
});

export default currPlaylistAtom;
