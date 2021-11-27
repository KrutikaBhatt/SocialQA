import React, { useState } from "react";
import "./login.css";
import ArrowForwardIosIcon from "@material-ui/icons/ArrowForwardIos";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const signIn = () => {
    console.log("SignIn");
  };

  const handleSignIn = (e) => {
    e.preventDefault();

    console.log("Now sining in");
  };

  const registerSignIn = (e) => {
    e.preventDefault();

   console.log("Create new user");
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
              <h2>Login</h2>
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
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  type="password"
                  placeholder="Password"
                />
              </div>
            </div>
            <div className="login__forgButt">
              <small>Forgot Password?</small>
              <button onClick={handleSignIn}>Login</button>
            </div>
            <button onClick={registerSignIn}>New Account</button>
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
          <p>&copy; Quora Fake Inc. 2021</p>
        </div>
      </div>
    </div>
  );
}

export default Login;