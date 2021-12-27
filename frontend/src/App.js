import axios from "axios";
import React, { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./App.css";
import Auth from "./components/auth";
import SocialQA from "./components/SocialQA";

import { BrowserRouter, Switch, Redirect, Route } from "react-router-dom";
import { logout } from "./Action/User";
import AllSpaces from "./components/SocialQA/AllUser";
import Socials from './components/SocialQA/Socials'
import AllUsers from './components/SocialQA/AllSpaces'
import SideBarSpaces from './components/SocialQA/SidebarSpaces'

function App() {
  const dispatch = useDispatch();
  const userLogin = useSelector((state) => state.userLogin);
  console.log(userLogin);

  const checkToken = useCallback(() => {
    const _userInfo = localStorage.getItem("userInfo");
    const token = _userInfo ? JSON.parse(_userInfo).token : "";
    const config = {
      headers: {
        "Content-Type": "application/json",
        authorization: token,
      },
    };
    if (token) {
      axios
        .get("/api/validateTokenExpiry", config)
        .then((res) => {
          // valid
          // console.log(res.data);
        })
        .catch((err) => {
          // expire
          // console.log(err);
          dispatch(logout());
        });
    }
  }, [dispatch]);

  React.useEffect(() => {
    checkToken();
    setInterval(() => {
      checkToken();
    }, 1000 * 60 * 5);
  }, [checkToken]);

  const PrivateRoute = ({ component: Component, ...rest }) => (
    <Route
      {...rest}
      render={(props) =>
        userLogin?.userInfo?.auth ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{
              pathname: "/auth",
              state: {
                from: props.location,
              },
            }}
          />
        )
      }
    />
  );

  return (
    <>
      <BrowserRouter>
        <Switch>
          <main>
            <PrivateRoute exact path="/" component={SocialQA} />
            <PrivateRoute exact path = '/allSpaces' component = {AllSpaces} />
            <PrivateRoute exact path = '/myQuestions' component = {Socials} />
            <PrivateRoute exact path = '/allUsers' component = {AllUsers} />
            <Route exact path = '/myspace/:name' component={SideBarSpaces} />
            <Route exact path="/auth" component={Auth} />
          </main>
        </Switch>
      </BrowserRouter>
      
    </>
  );
}

export default App;
