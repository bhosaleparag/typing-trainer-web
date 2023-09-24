import React, { useState, useRef } from "react";
import { imageFetch } from "../Data/imageFetch";
import { setName } from "../store/userActions";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "../firebase";
import { ReactComponent as EditLogo } from "../assets/edit.svg";

export default function Setting() {
  const name = useSelector((state) => state.user.name);
  const dispatch = useDispatch();
  const contentWrapper = useRef(null);
  const navigate = useNavigate();
  const [data, setData] = useState(null);
  const [toggle, setToggle] = useState(false);
  const [toggleEdit, setToggleEdit] = useState({ name: true, email: true });
  const [userData, setUserData] = useState({
    name: name?.name,
    email: name?.email,
    photo: name?.photo,
    fontFamily: name?.fontFamily,
  });
  //fetch imageFetch
  const handleProfile = async () => {
    setToggle((prev) => !prev);
    if (!data) {
      setData(await imageFetch());
    }
  };
  const handleUserData = (e) => {
    const { name, value } = e.target;
    setUserData({
      ...userData,
      [name]: value,
    });
  };
  const handleInputBox = (val) => {
    setToggleEdit({
      ...toggleEdit,
      [val]: !toggleEdit?.[val],
    });
  };
  const handleChange = async (e) => {
    e.preventDefault();
    if (userData.email.includes("@")) {
      await updateDoc(doc(db, "users", name.userId), {
        name: userData.name,
        email: userData.email,
        photo: userData.photo[0],
        fontFamily: userData.fontFamily,
      });
      dispatch(
        setName({
          ...name,
          name: userData.name,
          email: userData.email,
          photo: userData.photo,
          fontFamily: userData.fontFamily,
        })
      );
      navigate("/");
    } else {
      alert("please enter correct email address");
    }
  };
  const handleChangeProfile = async (filterImg) => {
    setUserData({
      ...userData,
      photo: [filterImg],
    });
  };
  const sideScroll = (element, speed, distance, step) => {
    let scrollAmount = 0;
    const slideTimer = setInterval(() => {
      element.scrollLeft += step;
      scrollAmount += Math.abs(step);
      if (scrollAmount >= distance) {
        clearInterval(slideTimer);
      }
    }, speed);
  };
  return (
    <form className="setting" onSubmit={handleChange}>
      <header>Setting</header>
      <div className="detail">
        <div className="settingImgChange" onClick={handleProfile}>
          <img src={userData?.photo} className="settingImg profileImg" />
          <p className="change">Change</p>
        </div>
        <div className="detailCon">
          <div className="detailMain">
            <input
              type="text"
              name="name"
              className="detailCon-name"
              onChange={handleUserData}
              value={userData.name}
              placeholder={name.name}
              disabled={toggleEdit.name}
            />
            <EditLogo
              className={`logo editLogo ${toggleEdit.name ? "" : "off"}`}
              onClick={() => handleInputBox("name")}
            />
          </div>
            <div>
              <input
                type="email"
                name="email"
                className="detailCon-mail"
                onChange={handleUserData}
                value={userData.email}
                placeholder={name.email}
                disabled={toggleEdit.email}
              />
              <EditLogo
                className={`logo editLogo ${toggleEdit.email ? "" : "off"}`}
                onClick={() => handleInputBox("email")}
              />
            </div>
            <div>
            Font Style: 
            <select name="fontFamily" 
            value={userData.fontFamily}
            onChange={handleUserData} 
            >
              <option value="Rubik">Rubik</option>
              <option value="Inter">Inter</option>
              <option value="system-ui">system-ui</option>
              <option value="Avenir">Avenir</option>
              <option value="Helvetica">Helvetica</option>
            </select>
            </div>
        </div>
      </div>
      {toggle ? (
        <div className="ImgAll" ref={contentWrapper}>
          <button
            onClick={() => sideScroll(contentWrapper.current, 25, 100, -10)}
            className="btnImgAll left"
          >{`<`}</button>
          {data
            ?.filter((data) => data !== name.photo)
            .map((filterImg, i) => {
              return (
                <img
                  src={filterImg}
                  className="settingImg profileImg"
                  key={i}
                  onClick={() => handleChangeProfile(filterImg)}
                />
              );
            })}
          <button
            onClick={() => {
              sideScroll(contentWrapper.current, 25, 100, 10);
            }}
            className="btnImgAll right"
          >{`>`}</button>
        </div>
      ) : (
        ""
      )}
      <button type="submit" className="btn wordRace-btn">
        SUBMIT
      </button>
    </form>
  );
}
