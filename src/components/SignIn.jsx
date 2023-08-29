import React from 'react'
import { signInWithPopup, signOut } from "firebase/auth";
import { useAuthState } from "react-firebase-hooks/auth";
import { useCollection } from "react-firebase-hooks/firestore";
import { auth, googleProvider, db } from "../firebase";
import "firebase/auth";


const Auth = () => {
  const signInWithGoogle = async () => {
    try {
      localStorage.setItem("loggedin", true)
      await signInWithPopup(auth, googleProvider);
    } catch (err) {
      console.error(err);
    }
  };
  return (
    <div>
      <button onClick={signInWithGoogle}> Signin with google</button>
    </div>
  );
};
const logOut = async () => {
  try {
    localStorage.removeItem("loggedin")
    await signOut(auth);
  } catch (err) {
    console.error(err);
  }
};
export default function SignIn() {
  const [user] = useAuthState(auth);
  console.log(user);
  return (
    <>
    <div>SignIn</div>
    {user ? <button onClick={logOut}> logOut</button> : <Auth/>}
    </>
  )
}
