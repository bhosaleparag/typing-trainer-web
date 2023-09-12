import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createUserWithEmailAndPassword } from "firebase/auth";
import typingIcon from "../assets/letter-t.png";
import { auth, db } from "../firebase";
import { doc, setDoc } from "firebase/firestore"; 
import "firebase/auth";

export default function SignUp() {
  const photoURL = ["https://firebasestorage.googleapis.com/v0/b/typing-trainer-ec708.appspot.com/o/images%2FIMG_20230905_200957.jpg?alt=media&token=21c95236-9cce-4244-83f0-243caa516c71","https://firebasestorage.googleapis.com/v0/b/typing-trainer-ec708.appspot.com/o/images%2FIMG_20230905_190012.jpg?alt=media&token=7d3fd75f-2f3c-4bd4-ac75-81b8ad74e5f3","https://firebasestorage.googleapis.com/v0/b/typing-trainer-ec708.appspot.com/o/images%2FIMG_20230905_200823.jpg?alt=media&token=75c8e612-8e88-4135-b387-8065ced6917e","https://firebasestorage.googleapis.com/v0/b/typing-trainer-ec708.appspot.com/o/images%2FIMG_20230905_200940.jpg?alt=media&token=f6e81374-acc7-40cb-bf30-deb4e13c122e","https://firebasestorage.googleapis.com/v0/b/typing-trainer-ec708.appspot.com/o/images%2FIMG_20230905_200857.jpg?alt=media&token=bd00dd0f-a0ac-41d0-9f3d-3a135849a536","https://firebasestorage.googleapis.com/v0/b/typing-trainer-ec708.appspot.com/o/images%2FIMG_20230905_200841.jpg?alt=media&token=6b613a93-9fdd-4469-8f90-bbb03326919a","https://firebasestorage.googleapis.com/v0/b/typing-trainer-ec708.appspot.com/o/images%2FIMG_20230905_200806.jpg?alt=media&token=3a99b085-11e1-4a4a-9f7f-f58864ec871c"]
  const [userData, setUserData] = useState({
    name: "",
    password: "",
    email: "",
    conPassword: "",
  });
  const navigate = useNavigate();
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
        photo: photoURL[Math.floor((Math.random() * 7) + 1)],
        wordRaceScore: 0
      });
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
