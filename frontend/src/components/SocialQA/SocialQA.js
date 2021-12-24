import React from "react";
import Feed from "./Feed.js";
import Header from "./Header";
import "./SocialQA.css";
import Sidebar from "./Sidebar";
import Widget from "./Widget.js";

function SocialQA() {
  return (
    <div className="socialqa">
      <Header />
      <div className="socialqa__contents">
        <div className="socialqa__content">
          <Sidebar />
          <Feed />
          <Widget />
        </div>
      </div>
    </div>
  );
}

export default SocialQA;
