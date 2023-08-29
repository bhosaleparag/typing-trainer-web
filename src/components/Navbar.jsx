import React from "react";
import { Link } from "react-router-dom";
import { ReactComponent as HomeLogo } from "../assets/home.svg";
import { ReactComponent as FeedbackLogo } from "../assets/feedback.svg";
import { ReactComponent as AchiveLogo } from "../assets/achive.svg";
import { ReactComponent as SettingLogo } from "../assets/setting.svg";
import { ReactComponent as SignOutLogo } from "../assets/sign-out.svg";
import { ReactComponent as TipsLogo } from "../assets/bulb.svg";
import { ReactComponent as LoginLogo } from "../assets/login.svg";
import { ReactComponent as DashboardLogo } from "../assets/dashboard.svg";
import typingIcon from "../assets/letter-t.png";
export default function Navbar() {
  return (
    <>
      <nav>
        <Link to={"/"}><img src={typingIcon} className="typingLogo" /></Link>
        <div className="nav-btn">
        <Link to={"/dashboard"}><DashboardLogo className="logo dashboardlogo " /></Link>
          <Link to={"/"}><HomeLogo className="logo homeLogo" /></Link>
          <Link to={"/achievement"}><AchiveLogo className="logo achiveLogo" /></Link>
          <Link to={"/setting"}><SettingLogo className="logo settingLogo" /></Link>
          <Link to={"/feedback"}><FeedbackLogo className="logo feedbackLogo" /></Link>
          <Link to={"/tips"}><TipsLogo className="logo tipsLogo" /></Link>
          {/* <SignOutLogo className="logo signOutLogo" /> */}
        </div>
        <Link to={"/signIn"}><LoginLogo className="logo loginLogo" /></Link>
        <div class="vl"></div>
      </nav>
    </>
  );
}
