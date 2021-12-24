import { Avatar } from "@material-ui/core";
import React from "react";
import "./QABox.css";

export default function QABox() {
  // const user = useSelector(selectUser);

  return (
    <div className="qabox">
      <div className="qabox__info">
        <Avatar
          src={
            "https://cdn-icons-png.flaticon.com/128/1177/1177568.png"
          }
          className="qabox__infoAvatar"
        />
        {/* <h5>{user?.displayName ? user?.displayName : user?.email}</h5> */}
      </div>
      <div className="qabox__socialqa">
        <p>What is your question or link?</p>
      </div>
    </div>
  );
}
