import React from "react";
import { useSelector } from "react-redux";
import { imageFetch } from "../Data/imageFetch";
import { setName } from "../store/userActions";
import { useDispatch } from "react-redux";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "../firebase";

export default function Setting() {
  const dispatch = useDispatch();
  const contentWrapper = React.useRef(null);
  const [data, setData] = React.useState(null);
  const [toggle, setToggle] = React.useState(false);
  const name = useSelector((state) => state.user.name);
  //fetch imageFetch
  const handleProfile = async()=> {
    setToggle((prev) => !prev);
    if(!data){
      setData(await imageFetch());
    }
  }
  const handleChangeProfile = async (filterImg) =>{
    await updateDoc(doc(db, "users", name.userId), {
      photo: filterImg
    });
    dispatch(setName({
      ...name,
      photo: filterImg
    }));
  }
  const sideScroll = (element,speed,distance,step) => {
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
    <div className="setting">
      <h1>Setting</h1>
      <div className="settingImgChange" onClick={handleProfile}>
        <img src={name.photo} className="settingImg profileImg" />
        <p className="change">Change</p>
      </div>
      {toggle ? (
        <div className="ImgAll" ref={contentWrapper}>
          <button onClick={() => sideScroll(contentWrapper.current, 25, 100, -10)}
          className="btnImgAll left"
          >{`<`}</button>
          {data
            ?.filter((data) => data !== name.photo)
            .map((filterImg, i) => {
              return (
                <img src={filterImg} className="settingImg profileImg" key={i}
                  onClick={()=> handleChangeProfile(filterImg)}
                />
              );
            })}
          <button onClick={() => {sideScroll(contentWrapper.current, 25, 100, 10);}}
          className="btnImgAll right"
          >{`>`}</button>
        </div>
      ) : (
        ""
      )}
    </div>
  );
}
