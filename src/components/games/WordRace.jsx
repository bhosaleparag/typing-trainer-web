import React, { useState, useEffect } from "react";
import wordList from "../../wordList.js";
// import { doc, setDoc } from "firebase/firestore";
// import { db } from "../../firebase";
import { useSelector } from 'react-redux';

function WordRace() {
  // const name = useSelector((state) => state.user.name);
  const [top, setTop] = useState(0);
  const [left, setLeft] = useState(0);
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [isMatched, setIsMatched] = useState(false);
  const [inputWord, setInputWord] = useState("");
  const screenHeight = 500;
  const speed = 1.5;
  const word = wordList[currentWordIndex];
  
  const handleMatch = () => {
    setTop(0);
    setLeft(Math.floor(Math.random() * 940));
    setCurrentWordIndex(Math.floor(Math.random() * 111));
    setIsMatched(false);
    setInputWord("");
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSubmit();
    }
  };
  const handleSave = () =>{
    console.log("dsa");
    
  }
  const handleSubmit = React.useCallback(
    () => { 
      if (inputWord === word) {
        setIsMatched(true);
        setScore(score + 1);
      }
    },
    [inputWord, score]
  );

  useEffect(() => {
    let animationFrameId;
    const animate = () => {
      setTop((prevTop) => {
        if (prevTop + speed >= screenHeight) {
          handleMatch(); // Change the word after reaching the top
          return 0;
        }
        return prevTop + speed;
      });
      animationFrameId = requestAnimationFrame(animate);
    };

    animationFrameId = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, [currentWordIndex]);
 
  useEffect(() => {
    if (isMatched) {
      handleMatch();
      console.log(name);
    }
  }, [isMatched]);

  const style = React.useMemo(() => {
    return {
      position: "absolute",
      top: `${top}px`,
      left: `${left}px`,
      fontSize: "25px",
    };
  }, [top, left]);
  return (
    <div className="WordRace">
      <div>
        <div className="wordRaceContainer">
          <div className="falling-word" style={style}>
            {word}
          </div>
        </div>
        <input
          type="text"
          value={inputWord}
          onChange={(e) => setInputWord(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="Enter a word"
          className="ipt-wordRace"
        />
        <button onClick={handleSubmit} className="btn wordRace-btn">
          SUBMIT
        </button>
      </div>
      <div className="sideInfoWordRace">
      <div className="boxes">
        <p className="boxes-title">Current Score</p>
        <p className="boxes-data">{score}</p>
      </div>
        <div className="boxes">
          <p className="boxes-title">High - Score</p>
          <p className="boxes-data">{213}</p>
        </div>
        <div className="boxes">
          <p className="boxes-title">Rank</p>
          <img src="https://firebasestorage.googleapis.com/v0/b/typing-trainer-ec708.appspot.com/o/badge%2Fbadge1.png?alt=media&token=e74041a6-5bd5-4eea-ba2d-0ec35b60c026"/>
        </div>
        <button onClick={handleSave} className="btn wordRace-btn">SAVE</button>
      </div>
    </div>
  );
}

export default WordRace;
