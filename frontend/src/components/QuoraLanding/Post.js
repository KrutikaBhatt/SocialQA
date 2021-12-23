import { Avatar } from "@material-ui/core";
import React, { useState } from "react";
import "./Post.css";
import ArrowUpwardOutlinedIcon from "@material-ui/icons/ArrowUpwardOutlined";
import ArrowDownwardOutlinedIcon from "@material-ui/icons/ArrowDownwardOutlined";
import RepeatOutlinedIcon from "@material-ui/icons/RepeatOutlined";
import ChatBubbleOutlineOutlinedIcon from "@material-ui/icons/ChatBubbleOutlineOutlined";
import {MoreHorizOutlined, ShareOutlined } from "@material-ui/icons";
import { useDispatch, useSelector } from "react-redux";
import { Modal } from "react-responsive-modal";
import parse from 'html-react-parser';

// import db from "../firebase";
// import { selectQuestionId, setQuestionInfo } from "../features/questionSlice";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import "react-responsive-modal/styles.css";
import CloseIcon from "@material-ui/icons/Close";
import TimeAdded from "../../Utils/timeAgo";
import { token } from "../../Utils/decodedToken";
import axios from "axios";
import { errorModal, successModal } from "../../Utils/AlertModal";

function Post({ questionId, key, question, imageUrl, timestamp, users, answers }) {

  const userLogin = useSelector((state) => state.userLogin);

  const [IsmodalOpen, setIsModalOpen] = useState(false);
  // const questionId = useSelector(selectQuestionId);
  const [answer, setAnswer] = useState("");
  const [getAnswers, setGetAnswers] = useState(answers);

  // console.log(answers)

  const Close = (
    <CloseIcon
      style={{
        color: "red",
        border: " 2px solid lightgray",
        borderRadius: "3px",
      }}
    />
  );

  const handleQuill = (value) => {
    setAnswer(value);
  };

  const handleModal = () => {
    setIsModalOpen(true);
    console.log(questionId);
  };

  const handleAnswer = async (e) => {
    e.preventDefault();

    const config = {
      headers: {
        "Content-Type": "application/json",
        authorization: token,
      },
    };
    if (answer !== "") {
      const body = {
        answer: answer,
        questionId: questionId,
        userDetails: {
          role: userLogin?.userInfo?.role,
          userEmail: userLogin?.userInfo?.userEmail,
          userId: userLogin?.userInfo?.userId,
        },
      };

      await axios
        .post(`/api/answers`, body, config)
        .then((res) => {
          console.log(res.data);
          successModal('Answer added successfully')
          // alert('Answer added succesfully')
          setIsModalOpen(false)
        })
        .catch((err) => {
          console.log(err);
          errorModal('Error while adding question')
        });
    }
  };
  return (
    <div
      key={key}
      className="post"
      // onClick={() =>
      //   // dispatch(
      //   //   setQuestionInfo({
      //   //     questionId: Id,
      //   //     questionName: question,
      //   //   })
      //   // )
      // }
    >
      <div className="post__info">
        <Avatar
          src={
            "https://img.favpng.com/25/13/19/samsung-galaxy-a8-a8-user-login-telephone-avatar-png-favpng-dqKEPfX7hPbc6SMVUCteANKwj.jpg"
          }
        />
        <h4>{users?.name ? users?.name : users?.email}</h4>
        {timestamp && (
          <small>
            <TimeAdded date={timestamp} />
          </small>
        )}
      </div>
      <div className="post__body">
        <div className="post__question">
          <p>{question}</p>
          <button onClick={handleModal} className="post__btnAnswer">
            Answer
          </button>

          <Modal
            open={IsmodalOpen}
            onClose={() => setIsModalOpen(false)}
            closeOnEsc={true}
            center
            closeOnOverlayClick={false}
            closeIcon={Close}
          >
            <div className="modal__question">
              <h1>{question}</h1>
              <p>
                asked by{" "}
                <span className="name">
                  {users?.name ? users?.name : users?.email}
                </span>{" "}
                {""}
                on{" "}
                <span className="name">
                  {/* {timestamp && (
                    <small>
                      <TimeAdded date={timestamp} />
                    </small>
                  )} */}
                  {new Date(timestamp).toLocaleString()}
                </span>
              </p>
            </div>
            <div className="modal__answer">
              <ReactQuill
                value={answer}
                onChange={handleQuill}
                placeholder="Enter your answer"
              ></ReactQuill>
            </div>
            <div className="modal__button">
              <button className="cancle" onClick={() => setIsModalOpen(false)}>
                Cancel
              </button>
              <button type="sumbit" onClick={handleAnswer} className="add">
                Add Answer
              </button>
            </div>
          </Modal>
        </div>
        <img style = {{
          width: "100%",
          objectFit: "contain"
        }} src={imageUrl} alt="" />
        <div className="post__footer">
        <div className="post__footerAction">
          23<ArrowUpwardOutlinedIcon />
          4<ArrowDownwardOutlinedIcon />
        </div>

        <RepeatOutlinedIcon />
        <ChatBubbleOutlineOutlinedIcon />
        <div className="post__footerLeft">
          <ShareOutlined />
          <MoreHorizOutlined />
        </div>
      </div>
        <p style = {{
          color: "rgba(0,0,0,0.5)",
          fontSize: "12px",
          fontWeight: "bold",
          margin: "10px 0"
        }}>{answers.length} {`${answers.length < 2 ? 'Answer' : 'Answers'}`}</p>
        <div style = {{
              margin: "5px 0px 0px 0px",
              padding: "5px 0px 0px 20px",
              borderTop: "1px solid lightgray",
            }} className="post__answer">
              
          {
            // answer comes here
            getAnswers.map((_answer) => (<>
            <div style = {{
              display: "flex",
              flexDirection: "column",
              width: "100%",
              padding: "10px 5px",
              borderTop: "1px solid lightgray",
            }} className = 'post-answer-container'>
              <div style = {{
                display: "flex",
                alignItems: "center",
                marginBottom: "10px",fontSize: '12px',
                fontWeight: "600",
                color: "#888"
              }} className = 'post-answered'>
                <Avatar src = {
                  "https://w7.pngwing.com/pngs/340/946/png-transparent-avatar-user-computer-icons-software-developer-avatar-child-face-heroes.png"
                } />
                <div style = {{
                  margin: "0px 10px"
                }} className = 'post-info'>
                  
                  <p style = {{
                    margin: "5px 0"
                  }}>{_answer?.userDetails?.userName ? _answer?.userDetails?.userName : _answer?.userDetails?.userEmail}</p>
                  {
                    _answer?.createdAt &&
                    <span><TimeAdded date = {_answer.createdAt} /></span>
                  }
                  
                </div>
              </div>
              <div className = 'post-answer'>
                {parse(_answer.answer)}
              </div>
            </div>
            </>))
          }
        </div>
      </div>
      
    </div>
  );
}

export default Post;
