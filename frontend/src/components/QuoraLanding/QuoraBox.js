import { Avatar } from "@material-ui/core";
import React from "react";
import "./QuoraBox.css";

export default function QuoraBox() {
  // const user = useSelector(selectUser);

  return (
    <div className="quoraBox">
      <div className="quoraBox__info">
        <Avatar
          src={
            "https://cdn-icons-png.flaticon.com/128/1177/1177568.png"
          }
          className="quoraBox__infoAvatar"
        />
        {/* <h5>{user?.displayName ? user?.displayName : user?.email}</h5> */}
      </div>
      <div className="quoraBox__quora">
        <p>What is your question or link?</p>
      </div>
    </div>
  );
}
