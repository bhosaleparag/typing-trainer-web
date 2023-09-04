import React from "react";
import { Navigate } from "react-router-dom";
import { signOut } from "firebase/auth";
import { auth } from "../firebase";
export default function Logout() {
  const logOut = async () => {
    try {
      await signOut(auth);
    } catch (err) {
      console.error(err);
    }
  };logOut()
  return (
    <>
      <Navigate to="/signIn" replace={true} />
    </>
  );
}
