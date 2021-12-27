import { Avatar } from "@material-ui/core";
import React, { useState } from "react";
import "../Post.css";
import ArrowUpwardOutlinedIcon from "@material-ui/icons/ArrowUpwardOutlined";
import ArrowDownwardOutlinedIcon from "@material-ui/icons/ArrowDownwardOutlined";
import ChatBubbleOutlineOutlinedIcon from "@material-ui/icons/ChatBubbleOutlineOutlined";
import DeleteIcon from '@material-ui/icons/Delete';
import { useSelector } from "react-redux";
import { Modal } from "react-responsive-modal";
import parse from 'html-react-parser';

import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import "react-responsive-modal/styles.css";
import CloseIcon from "@material-ui/icons/Close";
import TimeAdded from "../../../Utils/timeAgo";
import { token } from "../../../Utils/decodedToken";
import axios from "axios";
import { errorModal, successModal } from "../../../Utils/AlertModal";

function Post({ questionId, key, question, questionDesc, timestamp, users, answers, upvote, downvote}) {
  
  const userLogin = useSelector((state) => state.userLogin);
  const [UPVOTE,setUpvote] = useState(upvote);
  const [DOWNVOTE,setdownvote] = useState(downvote);
  const [IsmodalOpen, setIsModalOpen] = useState(false);
  const [answer, setAnswer] = useState("");
  const [getAnswers, setGetAnswers] = useState(answers);
  const [openAns, setOpenAns] = useState(false);
  const loggedInUser = userLogin?.userInfo?.userId;

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

  const UpvoteFunction=async()=>{
    await axios
        .put(`/api/questions/upvote/${questionId}`)
        .then((res) => {
          console.log(res);
          if(res.status === 201)
            alert("Post has already been upvoted !!")
          else if(res.status === 202){
            setdownvote(DOWNVOTE-1)
            setUpvote(UPVOTE+1)
          }
          else
            setUpvote(UPVOTE+1)
        })
        .catch(error =>{
          console.log(error);
        })
  }

  const downvoteFunction=async()=>{
    await axios
        .put(`/api/questions/downvote/${questionId}`)
        .then((res) => {
          console.log(res);
          if(res.status === 201)
            alert("Post has already been downvoted !!")
          else if(res.status === 202){
            setUpvote(UPVOTE-1);
            setdownvote(DOWNVOTE+1);
          }
          else
            setdownvote(DOWNVOTE+1);
        })
        .catch(error =>{
          console.log(error);
        })
  }

  const handleDelete = async()=>{
    if (window.confirm("This Post with be deleted permanently")) {
      await axios.delete(`/api/questions/${questionId}`).then(resp =>{
          console.log(resp.data);
          window.location.reload();
      })
      .catch(error =>{
          console.log(error);
      })
    } else {
    console.log("Cancel deletion")
    }
  }

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
  >
      <div className="post__info">
        <Avatar
          src={
            "https://cdn-icons-png.flaticon.com/128/1177/1177568.png"
          }
        />
        <h4>{users?.name ? users?.name : users?.email}</h4>
        {timestamp && (
          <small>
            <TimeAdded date={timestamp} />
          </small>
        )}
        {(loggedInUser==users._id) && <>
            <DeleteIcon style={{marginLeft:20,marginRight:5,color:'grey',cursor:'pointer'}} onClick={handleDelete}/>
          </>}
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
              <button className="cancel" onClick={() => setIsModalOpen(false)}>
                Cancel
              </button>
              <button type="sumbit" onClick={handleAnswer} className="add">
                Add Answer
              </button>
            </div>
          </Modal>
        </div>
        <div style = {{
          width: "100%",
          objectFit: "contain",
          marginBottom: "15px"
        }}>
          {parse(questionDesc)}
        </div>
        <div className="post__footer">
        <div className="post__footerAction">
          {UPVOTE}<ArrowUpwardOutlinedIcon onClick={UpvoteFunction}/>
          {DOWNVOTE}<ArrowDownwardOutlinedIcon onClick={downvoteFunction}/>
        </div>
        <ChatBubbleOutlineOutlinedIcon style={{marginLeft:18}} onClick={()=>{setOpenAns(!openAns)}}/>
        
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
            openAns &&
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
                  "https://cdn-icons-png.flaticon.com/128/1177/1177568.png"
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
