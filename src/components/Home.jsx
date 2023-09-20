import React from "react";
import code from "../assets/code.png";
import { TypeAnimation } from "react-type-animation";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { setName } from "../store/userActions";
import { auth, db } from "../firebase";
import { getDocs, query, orderBy, limit, collection } from "firebase/firestore";

export default function Home() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [userData, setUserData] = React.useState([]);
  const name = useSelector((state) => state.user.name);

  React.useEffect(() => {
    const fetchData = async () => {
      if (auth.currentUser) {
        const q = query(
          collection(db, "users"),
          orderBy("wordRaceScore", "desc"),
          limit(1)
        );
        try {
          const querySnapshot = await getDocs(q);
          const highestScoreValue = querySnapshot.docs[0].data().wordRaceScore;
          dispatch(
            setName({
              ...name,
              highestScoreWordRace: highestScoreValue,
            })
          );
        } catch (error) {
          console.error("Error getting highest score:", error);
        }
      }
      const q = query(collection(db, "users"),orderBy("wordRaceScore", "desc"),limit(4));
      try {
        const querySnapshot = await getDocs(q);
        const newData = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setUserData(newData); 
        console.log(newData);
      } catch (error) {
        console.error("Error getting highest score:", error);
      }
    };
    fetchData();
  }, []);
  return (
    <>
      <TypeAnimation
        style={{
          display: "block",
          fontSize: "40px",
        }}
        sequence={["Welcome to, Typing Trainer...", 800, ""]}
        repeat={Infinity}
      />
      <div className="gamesContainer">
        <p>Games</p>
        <div className="games">
          <h3 style={{ margin: "10px" }}>🏎️💨Word Race</h3>
          <p>
            Race against the clock, typing words accurately to sprint your way
            to victory and improve your typing speed!
          </p>
          <button className="btn" onClick={() => navigate("wordRace")}>
            START
          </button>
        </div>
        <div className="games">
          <div className="games-logo">
            <img src={code} className="gameCodeLogo" />
            <h3 className="gameName">Code Typing</h3>
          </div>
          <p>
            Sharpen your coding skills by typing out code snippets under the
            pressure of time. Become a coding maestro!
          </p>
          <button className="btn" onClick={() => navigate("codeTyping")}>START</button>
        </div>
      </div>
      <div className="score gamesContainer">
        <p>Best Score</p>
      {userData.map((data, i)=>{
      return (
        <div className="scoreItems" key={i}>
          <img src={data.photo} className="scoreItems-avatar" />
          <div className="scoreItems-rank">{i + 1}</div>
          <div className="scoreItems-name">
            <p>{data.name}</p>
            <p>Word Race</p>
          </div>
          <div className="scoreItems-score">{data.wordRaceScore}</div>
        </div>
      );
    })}
      </div>
    </>
  );
}
