import React from "react";
import code from "../assets/code.png"
import { TypeAnimation } from "react-type-animation";
import { useNavigate } from 'react-router-dom';
export default function Home() {
  const navigate = useNavigate();
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
          <h3 style={{margin: "10px"}}>🏎️💨Word Race</h3>
          <p>Race against the clock, typing words accurately to sprint your way to victory and improve your typing speed!</p>
          <button className="btn" onClick={() => navigate('wordRace')}>START</button>
        </div>
        <div className="games">
        <div className="games-logo"><img src={code} className="gameCodeLogo"/> 
        <h3 className="gameName">Code Typing</h3></div>
          <p>Sharpen your coding skills by typing out code snippets under the pressure of time. Become a coding maestro!</p>
          <button className="btn">START</button>
        </div>
      </div>
      <div className="score">
        <p>Best Score</p>
      </div>
    </>
  );
}
