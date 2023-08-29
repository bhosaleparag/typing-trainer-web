import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "./components/Navbar";

export default function Layout() {
  return (
    <div className="main-container">
      <Navbar />
      <div className="other">
        <Outlet />
      </div>
    </div>
  );
}
