import { useState, useEffect, useCallback, useRef, useMemo } from "react";
import wordList from "../../wordList.js";
import { useNavigate } from "react-router-dom";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "../../firebase";
import { useSelector, useDispatch } from 'react-redux';
import { setName } from "../../store/userActions";

function WordRace() {
  const gameBoxRef = useRef(null);
  const [gameBoxSize, setGameBoxSize] = useState({ width: 0, height: 0 });
  const name = useSelector((state) => state.user.name);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [top, setTop] = useState(0);
  const [left, setLeft] = useState(0);
  const [badge, setBadge] = useState(1);
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [score, setScore] = useState(name.wordRaceScore);
  const [isMatched, setIsMatched] = useState(false);
  const [inputWord, setInputWord] = useState("");
  const speed = 1.5;
  const word = wordList[currentWordIndex];
  
  useEffect(() => {
    const divElement = gameBoxRef.current;
    if (divElement) {
      const width = divElement.offsetWidth - 140;
      const height = divElement.offsetHeight - 40;
      setGameBoxSize({ width, height });
    }
    if(score < 10){
      setBadge(1)
    }else if(score <=25){
      setBadge(2)
    }else if(score <=50){
      setBadge(3)
    }else if(score <=75){
      setBadge(4)
    }else if(score <=100){
      setBadge(5)
    }else if(score <=125){
      setBadge(6)
    }else if(score <=150){
      setBadge(7)
    }else if(score <=175){
      setBadge(8)
    }else if(score <=200){
      setBadge(9)
    }else if(score <=225){
      setBadge(10)
    }
    
  }, []);
  const handleMatch = () => {
    setTop(0);
    setLeft(Math.floor(Math.random() * gameBoxSize.width));
    setCurrentWordIndex(Math.floor(Math.random() * 111));
    setIsMatched(false);
    setInputWord("");
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      console.log(gameBoxSize);
      handleSubmit();
    }
  };
  const handleSave = async (e) => {
    e.preventDefault();
    if(score > name.wordRaceScore){
      await updateDoc(doc(db, "users", name.userId), {
        wordRaceScore: score
      });
      dispatch(setName({
        ...name,
        wordRaceScore: score
      }));
    }
    navigate("/");
  }
  const handleSubmit = useCallback(
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
        if (prevTop + speed >= gameBoxSize.height) {
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
    }
  }, [isMatched]);

  const style = useMemo(() => {
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
        <div className="wordRaceContainer" ref={gameBoxRef}>
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
          <p className="boxes-data">{name.highestScoreWordRace}</p>
        </div>
        <div className="boxes">
          <p className="boxes-title">Rank</p>
          <img src={`https://firebasestorage.googleapis.com/v0/b/typing-trainer-ec708.appspot.com/o/badge%2Fbadge${badge}.png?alt=media&token=e74041a6-5bd5-4eea-ba2d-0ec35b60c026`}/>
        </div>
        <button onClick={handleSave} className="btn wordRace-btn">SAVE</button>
      </div>
    </div>
  );
}

export default WordRace;
