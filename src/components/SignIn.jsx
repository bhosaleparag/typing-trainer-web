import React, { useState } from "react";
import { Link } from "react-router-dom";
import { ReactComponent as GoogleLogo } from "../assets/google.svg";
import typingIcon from "../assets/letter-t.png";
import {
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
} from "firebase/auth";
import { useAuthState } from "react-firebase-hooks/auth";
// import { useCollection } from "react-firebase-hooks/firestore";
import { auth, googleProvider, db } from "../firebase";
import "firebase/auth";

export default function SignIn() {
  const [user] = useAuthState(auth);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  console.log(auth?.currentUser?.email);
  const signIn = async (e) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
    } catch (err) {
      console.error(err);
      alert(err.message);
    }
  };
  const signInWithGoogle = async () => {
    try {
      localStorage.setItem("loggedin", true);
      await signInWithPopup(auth, googleProvider);
    } catch (err) {
      console.error(err);
    }
  };
  const logOut = async () => {
    try {
      localStorage.removeItem("loggedin");
      await signOut(auth);
    } catch (err) {
      console.error(err);
    }
  };
  return (
    <>
      <div className="login-container">
        <img src={typingIcon} height="100px" width="100px" />
        <div className="login-form">
          <h1>Welcome to Typing Trainer</h1>
          <form onSubmit={signIn}>
            <input
              className="iptLogin"
              type="text"
              placeholder="Email ID"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <input
              className="iptLogin"
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <button type="submit" className="btn">
              Sign In
            </button>
          </form>
        </div>
        <div>
          Don't have an account? <Link to="/signUp">Sign Up</Link>
        </div>
        <span style={{ marginLeft: "20px" }}>
          -------------------------- OR -------------------------
        </span>
        {user ? (
          <button onClick={logOut} className="btn">logOut</button>
        ) : (
          <button onClick={signInWithGoogle} className="btn btnGoogle">
            <GoogleLogo className="googleLogo" />
            <span>Signin with google</span>
          </button>
        )}
      </div>
    </>
  );
}
