import React, { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import typingIcon from "../assets/letter-t.png";
import { auth, db } from "../firebase";
import { doc, setDoc } from "firebase/firestore"; 
import "firebase/auth";

export default function SignUp() {
  const [userData, setUserData] = useState({
    name: "",
    password: "",
    email: "",
    conPassword: "",
  });
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserData({
      ...userData,
      [name]: value,
    });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await createUserWithEmailAndPassword(
        auth,
        userData.email,
        userData.password
      );
      const user = res.user;
      await setDoc(doc(db, "users", user.uid), {
        name: userData.name,
        email: userData.email,
      });
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
          <form onSubmit={handleSubmit}>
            <input
              className="iptLogin"
              type="text"
              name="name"
              placeholder="User Name"
              value={userData.name}
              onChange={handleInputChange}
              required
            />
            <input
              className="iptLogin"
              name="email"
              type="email"
              placeholder="Email ID"
              value={userData.email}
              onChange={handleInputChange}
              required
            />
            <input
              className="iptLogin"
              type="password"
              name="password"
              placeholder="Password"
              value={userData.password}
              onChange={handleInputChange}
              required
            />
            <input
              className="iptLogin"
              type="password"
              name="conPassword"
              placeholder="Confirm Password"
              value={userData.conPassword}
              onChange={handleInputChange}
              required
            />
            <button
              type="submit"
              className="btn"
              disabled={userData.conPassword !== userData.password}
            >
              Sign In
            </button>
          </form>
        </div>
      </div>
    </>
  );
}
