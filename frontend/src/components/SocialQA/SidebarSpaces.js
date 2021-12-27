import React, { useEffect, useState} from "react";
import { useParams } from "react-router-dom";
import QABox from "./QABox";
import "./Feed.css";
import Post from "./Post";
import axios from "axios";
import { token } from "../../Utils/decodedToken";
import Header from "./Header";
import Widget from "./Widget.js";
import "./SocialQA.css";
import Sidebar from "./Sidebar";
function SideBarSpaces() {
  const { name } = useParams();
  console.log(name);
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const config = {
      headers: {
        "Content-Type": "application/json",
        authorization: token,
      },
    };
    if (token !== "") {
      axios.get(`/api/questions/find/${name}`, config).then((res) => {
        setPosts(res.data.reverse());
        console.log(res.data);
      });
    }
  }, []);
  return (
    <div className="socialqa">
    <Header />
    <div className="socialqa__contents">
      <div className="socialqa__content">
        <Sidebar />
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
        <Widget />
        </div>
      </div>
    </div>
  );
}

export default SideBarSpaces;
