import React from "react";
import { TypeAnimation } from 'react-type-animation';

export default function Home() {
  return (
    <>
      <TypeAnimation
        style={{
          display: "block",
          fontSize: "30px",
        }}
        sequence={["Welcome to, Typing Trainer...", 800, ""]}
        repeat={Infinity}
      />
    </>
  );
}
