import React, {
  useState,
  useMemo,
  useRef,
  useEffect,
  useCallback,
} from "react";
import { db } from "../../firebase";
import para from "../../Data/paragraph";
import { doc, updateDoc } from "firebase/firestore";
import { useSelector, useDispatch } from "react-redux";
import { setName } from "../../store/userActions";
import { useNavigate } from "react-router-dom";

const WordTyping = () => {
  const getRandomParagraph = () => {
    return para[Math.floor(Math.random() * para.length)];
  };
  const name = useSelector((state) => state.user.name);
  const dispatch = useDispatch();
  const [paragraph, setParagraph] = useState(getRandomParagraph());
  const wordList = useMemo(() => paragraph.split(" "), [paragraph]);
  const activeWord = useRef(null);
  const caretRef = useRef(null);
  const [wpm,setWpm] = useState(0)
  const timeLimit = 15;
  const navigate = useNavigate();
  const [timer, setTimer] = useState(timeLimit);
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  const [currWord, setCurrWord] = useState(wordList[0]);
  const [typedWord, setTypedWord] = useState("");
  const [typedHistory, setTypedHistory] = useState([]);
  const [result, setResult] = useState([]);
  const extraLetters = typedWord.slice(currWord.length).split("");

  useEffect(() => {
    if (isTimerRunning && timer > 0) {
      const interval = setInterval(() => {
        setTimer((prevTimer) => prevTimer - 1);
      }, 1000);
      return () => {
        clearInterval(interval);
      };
    } else if (timer === 0) {
      let correctChars = 0;
    setResult(typedHistory.map(
      (typedWord, idx) => typedWord === wordList[idx]
    ))
    result.forEach((r, idx) => {
      if (r) correctChars += wordList[idx].length;
    });
    setWpm(((correctChars) / 5) / (timeLimit / 60))
      setIsTimerRunning(false);
    }
  }, [timer, isTimerRunning]);

  const handleKeyDown = useCallback(
    (e) => {
      if (e.key.length === 1) {
        setIsTimerRunning(true);
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
          setTypedWord(typedHistory[typedHistory.length - 1]);
          setCurrWord(wordList[typedHistory.length - 1]);
          setTypedHistory((prev) => prev.slice(0, -1));
          currWordEl.previousElementSibling.classList.remove("right", "wrong");
        } else {
          const newTypedWord = typedWord.slice(0, typedWord.length - 1);
          setTypedWord(newTypedWord);
        }
      }
    },
    [typedWord, typedHistory, wordList, isTimerRunning]
  );
  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [handleKeyDown]);
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

  const restart = () => {
    const newParagraph = getRandomParagraph();
    setParagraph(newParagraph);
    setTypedWord("");
    setTypedHistory([]);
    setWpm(0);
    setTimer(timeLimit);
    setIsTimerRunning(false);
    setResult([]);
    setCurrWord(newParagraph.split(" ")[0]); 
  };
  
  
  const save = async() => {
    dispatch(
      setName({
        ...name,
        wpm: wpm,
      })
    );
    await updateDoc(doc(db, "users", name.userId), {
      wpm: wpm,
    });
    navigate("/")
  };
  return (
    <div className="test">
      {!timer  ? (
        <div className="result">
        <table>
          <tbody>
            <tr>
              <td colSpan={2} align="center">
                <h1>{Math.round(wpm) + " wpm"}</h1>
              </td>
            </tr>
            <tr>
              <td colSpan={2} align="center">Correct Words: {result.filter((x) => x).length}</td>
            </tr>
            <tr className="wrong">
            <td colSpan={2} align="center">Incorrect Words: {result.filter((x) => !x).length}</td>
            </tr>
            <tr>
              <td align="center">
                <button onClick={restart} className="restart">Restart</button>
              </td>
              <td align="center">
                <button onClick={save} className="restart">Save</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      ) : (
        <>
          <div className="timer">
            <span>{timer}</span> seconds left
          </div>
          <div className="box">
            {wordList.map((word, idx) => {
              const isActive = currWord === word && typedHistory.length === idx;
              const extraLettersForWord =
                isActive && extraLetters.length > 0
                  ? extraLetters
                  : typedHistory[idx]
                  ? typedHistory[idx].slice(wordList[idx].length).split("")
                  : [];
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
                  {extraLettersForWord.map((char, charId) => (
                    <span key={char + charId} className="wrong extra">
                      {char}
                    </span>
                  ))}
                </div>
              );
            })}
          </div>
        </>
      )}
    </div>
  );
};

export default WordTyping;
