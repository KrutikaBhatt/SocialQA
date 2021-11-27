import React, { useState } from "react";
import "./register.css";
import ArrowForwardIosIcon from "@material-ui/icons/ArrowForwardIos";
import axios from 'axios';
import { Link } from "react-router-dom";

function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passAgain, setpassAgain] = useState("");
  const [username,setusername] = useState("");
  const [bio,setbio] = useState("");
  

  const registerSignIn = (e) => {
    e.preventDefault();
    const user = {
      username : username,
      email : email,
      password : password,
      bio:bio
    };
    axios.post('http://localhost:8000/sign-up', user)
    .then(response => console.log(response.data));
  };
  return (
    <div className="login">
      <div className="login__container">
        <div className="login__logo">
          <img
            src="https://i.postimg.cc/TPnj7KnK/Social-QA-vertical.png"
            alt=""
          />
        </div>
        <div className="login__desc">
          <p>A Place to Share knowledge and better understand the world</p>
        </div>
        <div className="login__auth">
          <div className="login__emailPass">
            <div className="login__label">
              <h2>Register</h2>
            </div>
            <div className="login__inputFields">
              <div className="login__inputField">
                <input
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  type="text"
                  placeholder="Email"
                />
              </div>
              <div className="login__inputField">
                <input
                  value={username}
                  onChange={(e) => setusername(e.target.value)}
                  type="text"
                  placeholder="Username"
                />
              </div>
              <div className="login__inputField">
                <input
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  type="password"
                  placeholder="Password"
                />
              </div>
              <div className="login__inputField">
                <input
                  value={passAgain}
                  onChange={(e) => setpassAgain(e.target.value)}
                  type="password"
                  placeholder="Enter Password again"
                />
              </div>
              
              <div className="login_bio">
                <textarea rows="4" cols="66"
                  value={bio}
                  onChange={(e) => setbio(e.target.value)}
                  type="password"
                  placeholder="Enter your Bio here. It helps people find you !!"
                />
              </div>
            </div>
            <div className="login__forgButt">
            {<Link to="/login"><small>Already have a account? Login here</small></Link>}
              
            </div>
            <button onClick={registerSignIn}>Register</button>
          </div>
        </div>
        <div className="login__lang">
          <p>हिन्दी</p>
          <ArrowForwardIosIcon fontSize="small" />
        </div>
        <div className="login__footer">
          <p>About</p>
          <p>Languages</p>
          <p>Careers</p>
          <p>Businesses</p>
          <p>Privacy</p>
          <p>Terms</p>
          <p>Contact</p>
          <p>&copy; SocialQA Inc. 2021</p>
        </div>
      </div>
    </div>
  );
}

export default Register;