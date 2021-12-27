import React, { useState } from "react";
import { useDispatch } from "react-redux";
import "./Login.css";
import { login, register } from "../../Action/User";
import ArrowForwardIosIcon from "@material-ui/icons/ArrowForwardIos";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(false)

  const dispatch = useDispatch();

  const handleControlUser = (e) => {
    e.preventDefault()
    if(user){
      registerSignIn(e)
    } else {
      handleSignIn(e)
    }
  }

  const handleSignIn = (e) => {
    e.preventDefault();
    if (email !== "" && password !== "") {
      dispatch(login(email, password));
    }
    else {
      alert("Fill out all details")
    }
  };

  const registerSignIn = (e) => {
    e.preventDefault();
    if (email !== "" && password !== "") {
      dispatch(register(email, password));
    } else {
      alert("Fill out all details");
    }
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
          <p>A Place to Share knowledge and better understand the world !!</p>
        </div>
        <div className="login__auth">
          <div className="login__emailPass">
            <div className="login__label">
              <h2>{user ? 'Register' : 'Login'}</h2>
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
              <button style={{marginRight: 10}} onClick={handleControlUser}>{user ? 'Register' : 'Login'}</button>
            </div>
            <p style ={{
              fontSize: "13px",
              color: "#777",
              cursor: "pointer"
            }} onClick = {() => setUser(!user)}>{!user ? 'New user | Register' : 'Already registered | Login'}</p>
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

export default Login;
