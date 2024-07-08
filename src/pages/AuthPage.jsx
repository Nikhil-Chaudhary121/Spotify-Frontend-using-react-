import React from "react";
import SignUpCard from "../components/SignUpCard";
import LoginCard from "../components/LoginCard";
import { useRecoilValue } from "recoil";
import authScreenAtom from "../atoms/AuthAtom";

const AuthPage = () => {
  const authScreenState = useRecoilValue(authScreenAtom);
  console.log(authScreenState);

  return <>{authScreenState === "login" ? <LoginCard /> : <SignUpCard />}</>;
};

export default AuthPage;
