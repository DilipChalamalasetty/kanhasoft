import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { useDispatch, useSelector } from "react-redux";
import {
  Route,
  Switch,
  Redirect,
  useLocation,
  useHistory,
} from "react-router-dom";
import Login from "../../components/User/Login/Login";
import Signup from "../../components/User/SignUp/SignUp";
import { Profile } from "../../components/User/Profile/Profile";
const useStyles = makeStyles((theme) => ({
  root: {
    width: 600,
    height: "100vh",
    backgroundColor: "white",
    display: "flex",
    flexDirection: "column",
    border: "1px solid black",
  },
  header: {
    display: "flex",
    justifyContent: "space-between",
    height: "10vh",
    alignItems: "center",
  },
  content: {
    height: "100%",
    textAlign: "center",
    overflowY: "scroll",
  },
}));

export default function AppWindow() {
  const classes = useStyles();
  const urlLocation = useLocation();
  const token = useSelector((state) => state.userReducer.token);
  const history = useHistory();

  useEffect(() => {
    if (token === null) {
      if (urlLocation.pathname !== "/") {
        history.push("/");
      }
    }
  }, [token]);

  return (
    <div className={classes.root}>
      <div className={classes.header}>
        <h1>Kanhasoft</h1>
      </div>
      <div className={classes.content}>
        <Switch>
          <Route path="/" exact component={Login} />
          <Route path="/signup" exact component={Signup} />
          <Route path="/profile" exact component={Profile} />
        </Switch>
      </div>
    </div>
  );
}
