import React, { useState, useEffect } from "react";
import wordList from "../../wordList.js"

function WordRace() {
  const [top, setTop] = useState(0);
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [inputWord, setInputWord] = useState("");
  const [isMatched, setIsMatched] = useState(false);
  const screenHeight = 500;
  const speed = 1;
  const word = wordList[currentWordIndex];

  const handleMatch = () => {
    setCurrentWordIndex(Math.floor(Math.random() * 111));
    setTop(0);
    setIsMatched(false);
    setInputWord("");
  };
  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSubmit(e);
    }
  };
  const handleSubmit = () => {
    console.log("noc");
    if (inputWord === word) {
      setIsMatched(true);
    }
  };

  useEffect(() => {
    let animationFrameId;
    console.log("dsa");
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
    }
  }, [isMatched]);

  const style = {
    position: "absolute",
    top: `${top}px`,
  };
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
      <div>
        <div className="boxes">current Score</div>
        <div className="boxes">high Score</div>
        <div className="boxes">current level</div>
      </div>
    </div>
  );
}

export default WordRace;
