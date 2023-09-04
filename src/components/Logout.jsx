import React from "react";
import { Navigate } from "react-router-dom";
import { useDispatch } from 'react-redux';
import { setName } from "../store/userActions"
import { signOut } from "firebase/auth";
import { auth } from "../firebase";
export default function Logout() {
  const dispatch = useDispatch();
  const logOut = async () => {
    try {
      await signOut(auth);
      dispatch(setName(undefined));
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
