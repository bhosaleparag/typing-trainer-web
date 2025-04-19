import { useState, useEffect, useCallback, useRef, useMemo } from "react";
import wordList from "../../wordList.js";
import { useNavigate } from "react-router-dom";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "../../firebase";
import { useSelector, useDispatch } from 'react-redux';
import { setName } from "../../store/userActions";

const BADGE_THRESHOLDS = [
  { score: 0, badge: 1 },
  { score: 25, badge: 2 },
  { score: 50, badge: 3 },
  { score: 75, badge: 4 },
  { score: 100, badge: 5 },
  { score: 125, badge: 6 },
  { score: 150, badge: 7 },
  { score: 175, badge: 8 },
  { score: 200, badge: 9 },
  { score: 225, badge: 10 }
];

function WordRace() {
  const gameBoxRef = useRef(null);
  const [gameBoxSize, setGameBoxSize] = useState({ width: 0, height: 0 });
  const name = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [top, setTop] = useState(0);
  const [left, setLeft] = useState(2);
  const [badge, setBadge] = useState(1);
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [score, setScore] = useState(name.wordRaceScore || 0);
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
  }, []);

  useEffect(() => {
    const currentBadge = BADGE_THRESHOLDS.find(
      threshold => score <= threshold.score
    )?.badge || BADGE_THRESHOLDS[BADGE_THRESHOLDS.length - 1].badge;
    setBadge(currentBadge);
  }, [score]);

  const handleMatch = () => {
    setTop(0);
    setLeft(Math.floor(Math.random() * gameBoxSize.width));
    setCurrentWordIndex(Math.floor(Math.random() * 111));
    setIsMatched(false);
    setInputWord("");
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSubmit();
    }
  };

  const handleSave = async (e) => {
    e.preventDefault();
    if(score > (name?.wordRaceScore || 0)){
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
      top: `${top}px`,
      left: `${left}px`,
    };
  }, [top, left]);

  return (
    <div className="WordRace">
      <div className="WordRaceMain">
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
          <p className="boxes-data">{name.highestScoreWordRace || 0}</p>
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
