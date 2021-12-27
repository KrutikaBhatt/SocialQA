import React, { useState } from "react";
import { Avatar, Input } from "@material-ui/core";
import "./QABox.css";
import "react-responsive-modal/styles.css";

export default function QABox() {
  
  return (
    <div className="qabox">
      <div className="qabox__info">
        <Avatar
          src={
            "https://cdn-icons-png.flaticon.com/128/1177/1177568.png"
          }
          className="qabox__infoAvatar"
        />
      </div>
      <div className="qabox__socialqa">
        <p>What is your question or link?</p>
      </div>
    </div>
  );
}
