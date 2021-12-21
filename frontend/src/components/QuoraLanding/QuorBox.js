import { Avatar } from "@material-ui/core";
import React from "react";
import "./QuoraBox.css";

export default function QuorBox() {
  // const user = useSelector(selectUser);

  return (
    <div className="quoraBox">
      <div className="quoraBox__info">
        <Avatar
          src={
            "https://i.postimg.cc/FsLV3Qq7/c3a1f7f2b9b54019b0822b116243a3fa.png"
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
