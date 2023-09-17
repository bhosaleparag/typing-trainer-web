import React from "react";
import { Link } from "react-router-dom";
import { ReactComponent as HomeLogo } from "../assets/home.svg";
import { ReactComponent as FeedbackLogo } from "../assets/feedback.svg";
import { ReactComponent as SettingLogo } from "../assets/setting.svg";
import { ReactComponent as SignOutLogo } from "../assets/sign-out.svg";
import { ReactComponent as TipsLogo } from "../assets/bulb.svg";
import { ReactComponent as LoginLogo } from "../assets/login.svg";
import { ReactComponent as DashboardLogo } from "../assets/dashboard.svg";
import typingIcon from "../assets/letter-t.png";
import { useSelector } from 'react-redux';

export default function Navbar() {
  const name = useSelector((state) => state.user.name);
  console.log(name);
  return (
    <>
      <nav>
        <Link to={"/"}><img src={typingIcon} className="typingLogo" /></Link>
        <div className="nav-btn">
        <Link to={"/dashboard"}><DashboardLogo className="logo dashboardlogo " /></Link>
          <Link to={"/"}><HomeLogo className="logo homeLogo" /></Link>
          <Link to={"/setting"}><SettingLogo className="logo settingLogo" /></Link>
          <Link to={"/feedback"}><FeedbackLogo className="logo feedbackLogo" /></Link>
          <Link to={"/tips"}><TipsLogo className="logo tipsLogo" /></Link>
          {name && <Link to={"/logout"}><SignOutLogo className="logo loginLogo" /></Link>}
        </div>
        {name  ? (
          <Link to={"/setting"}><img src={name?.photo} className="profileImg"/></Link>
        ) : (
          <Link to={"/signIn"}><LoginLogo className="logo loginLogo" /></Link>
        )}
        <div className="vl"></div>
      </nav>
    </>
  );
}
