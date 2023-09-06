import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ReactComponent as GoogleLogo } from "../assets/google.svg";
import typingIcon from "../assets/letter-t.png";
import {
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
} from "firebase/auth";
import { useDispatch } from "react-redux";
import { doc, setDoc, getDoc } from "firebase/firestore";
import { auth, googleProvider, db } from "../firebase";
import { setName } from "../store/userActions";
import "firebase/auth";

export default function SignIn() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const signIn = async (e) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password)
      const docSnap = await getDoc(doc(db, "users", auth.currentUser.uid));
      dispatch(setName(docSnap.data()));
      navigate("/");
    } catch (err) {
      console.error(err);
      alert(err.message);
    }
  };
  const signInWithGoogle = async () => {
    try {
      const res = await signInWithPopup(auth, googleProvider);
      const user = res.user;
      await setDoc(doc(db, "users", user.uid), {
        name: user.displayName,
        email: user.email,
        photo: user.photoURL,
      });
      const docSnap = await getDoc(doc(db, "users", user.uid));
      dispatch(setName(docSnap.data()));
      navigate("/");
    } catch (err) {
      console.error(err);
      alert(err.message);
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
        <button onClick={signInWithGoogle} className="btn btnGoogle">
          <GoogleLogo className="googleLogo" />
          <span>Signin with google</span>
        </button>
      </div>
    </>
  );
}
