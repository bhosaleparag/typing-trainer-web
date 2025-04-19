import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "./components/Navbar";
import { useSelector } from "react-redux";

export default function Layout() {
  const name = useSelector((state) => state.user);
  return (
    <div className="main-container" style={{ fontFamily: name ? name.fontFamily : "Rubik" }}>
      <Navbar />
      <div className="other">
        <Outlet />
      </div>
    </div>
  );
}
