import React, { useState, useRef } from "react";

const CodeTyping = () => {
  const activeWord = useRef(null);
  const caretRef = useRef(null);

  const wordList = ["dsa", "ytrsf","fsdfda", "fsdasf",  "appears", "there", "is", "there", "is","syntax", "issue", "in", "the", "line", "where", "you", "are", "defining", "the" ]
  const currWord = "appears"
  const typedWord = "app"
  return (
    <div className="test">
      <div className="box">
        {wordList.map((word, idx) => {
          const isActive = currWord === word ;
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
                >|</span>
              ) : null}
              {word.split("").map((char, charId) => {
                return <span key={char + charId}>{char}</span>;
              })}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default CodeTyping;
{/* <input className="wordsInput" tabIndex="0" autoComplete="off" autoCapitalize="off" autoCorrect="off" data-gramm="false" data-gramm_editor="false" data-enable-grammarly="false" list="autocompleteOff" spellCheck="false"
/> */}
