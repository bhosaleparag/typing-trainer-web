import React, { useState, useRef, useEffect } from "react";

const WordTyping = () => {
  const paragraph =
    "The sun dipped below the horizon casting a warm golden glow across the tranquil lake The water rippled gently reflecting the last remnants of daylight Birds sang their evening songs from the surrounding trees and a gentle breeze rustled the leaves It was a moment of serenity a pause in the rush of life as nature's beauty enveloped the world in a soothing embrace";
  const wordList = paragraph.split(" ");
  const activeWord = useRef(null);
  const caretRef = useRef(null);
  const [currWord, setCurrWord] = useState(wordList[0]);
  const [typedWord, setTypedWord] = useState("");
  const [typedHistory, setTypedHistory] = useState([]);
  const extraLetters = typedWord.slice(currWord.length).split("");

  useEffect(() => {
    document.onkeydown = (e) => {
      if (e.key.length === 1) {
        const keyPressed = e.key;
        setTypedWord((prevTypedWord) => prevTypedWord + keyPressed);
        if (keyPressed === " ") {
          setTypedHistory((prevTypedHistory) => [
            ...prevTypedHistory,
            typedWord,
          ]);
          setTypedWord("");
          setCurrWord(wordList[typedHistory.length + 1]);
        }
      } else if (e.key === "Backspace") {
        const currIdx = typedHistory.length - 1;
        const currWordEl = activeWord?.current;
        if (!typedWord && typedHistory[currIdx] !== wordList[currIdx]) {
          currWordEl.previousElementSibling.classList.remove("right", "wrong");
          if (ctrlKey) {
            currWordEl.previousElementSibling.childNodes.forEach((char) => {
              char.classList.remove("wrong", "right");
            });
          }
        } else {
          const newTypedWord = typedWord.slice(0, typedWord.length - 1);
          setTypedWord(newTypedWord);
        }
      }
    };
    return () => {
      document.onkeydown = null;
    };
  }, [typedWord]);
  useEffect(() => {
    let idx = typedWord.length - 1;
    const currWordEl = activeWord?.current;
    if (currWordEl) {
      currWordEl.children[idx + 1].classList.add(
        currWord[idx] !== typedWord[idx] ? "wrong" : "right"
      );
    }
  }, [currWord, typedWord, activeWord]);

  useEffect(() => {
    let idx = typedWord.length;
    const currWordEl = activeWord?.current;
    if (currWordEl && idx < currWord.length)
      currWordEl.children[idx + 1].classList.remove("wrong", "right");
  }, [currWord.length, typedWord, activeWord]);

  console.log(typedHistory);
  return (
    <div className="test">
      <div className="box">
        {wordList.map((word, idx) => {
          const isActive = currWord === word && typedHistory.length === idx;
          return (
            <div
              key={word + idx}
              className="word"
              ref={isActive ? activeWord : null}
            >
              {isActive ? (
                <span
                  ref={caretRef}
                  id="caret"
                  className="blink"
                  style={{
                    left: typedWord.length * 14.5833,
                  }}
                >
                  |
                </span>
              ) : null}
              {word.split("").map((char, charId) => {
                return <span key={char + charId}>{char}</span>;
              })}
              {isActive
                ? extraLetters.map((char, charId) => {
                    return (
                      <span key={char + charId} className="wrong extra">
                        {char}
                      </span>
                    );
                  })
                : typedHistory[idx]
                ? typedHistory[idx]
                    .slice(wordList[idx].length)
                    .split("")
                    .map((char, charId) => {
                      return (
                        <span key={char + charId} className="wrong extra">
                          {char}
                        </span>
                      );
                    })
                : null}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default WordTyping;
