import React, { useEffect, useState } from "react";
import QABox from "./QABox";
import "./Feed.css";
import Post from "./Post";
import axios from "axios";
import { token } from "../../Utils/decodedToken";

function Feed() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const config = {
      headers: {
        "Content-Type": "application/json",
        authorization: token,
      },
    };
    if (token !== "") {
      axios.get("/api/questions", config).then((res) => {
        setPosts(res.data.reverse());
        console.log(res.data);
      });
    }
  }, []);
  return (
    <div className="feed">
      <QABox />
      {posts.map((_post) => (
        <Post
          key={_post._id}
          questionId={_post._id}
          question={_post.questionName}
          questionDesc={_post.questionDesc}
          timestamp={_post.createdAt}
          users={_post.userDetails[0]}
          answers={_post.allAnswers}
          upvote = {_post.upvote}
          downvote = {_post.downvote}
        />
      ))}
    </div>
  );
}

export default Feed;
