import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect, useHistory, useLocation } from "react-router-dom";
import {
  userLoginStateAsync,
  userSignUpStateAsync,
} from "../../../store/reducers/userReducer/userReducer";

export default function Login() {
  const [credentials, setCredentials] = useState({
    userEmail: undefined,
    password: undefined,
  });
  const history = useHistory();
  const dispatch = useDispatch();

  const handleChange = (key) => (event) => {
    if (key === "userEmail") {
      setCredentials({
        ...credentials,
        userEmail: event.target.value,
      });
    } else if (key === "password") {
      setCredentials({
        ...credentials,
        password: event.target.value,
      });
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (credentials.userEmail && credentials.password) {
        dispatch(
          userLoginStateAsync({
            userEmail: credentials.userEmail,
            password: credentials.password,
          })
        );
    }
  };
  const userData = useSelector((state) => state.userReducer);

  useEffect(() => {
    if (userData.token) {
      history.replace("/profile");
    }
  }, [userData.token]);

  return (
    <div>
      <form
        style={{
          padding: 40,
          display: "flex",
          flexDirection: "column",
          margin: 20,
        }}
      >
        <h2>
          "Login"
        </h2>
        <h4>Email Id: </h4>
        <input
          placeholder="Enter Email Id"
          type="email"
          onChange={handleChange("userEmail")}
          style={{ padding: 10 }}
          value={credentials.userEmail}
        />
        <h4>Password: </h4>
        <input
          placeholder="Enter Password"
          type="password"
          onChange={handleChange("password")}
          style={{ padding: 10 }}
          value={credentials.password}
        />
        <button onClick={handleSubmit} style={{ padding: 10, margin: 20 }}>
          Submit
        </button>
      </form>
      <button
        onClick={() => {
          history.push(
            "/signup" 
          );
        }}
      >
        Click Here
      </button>
    </div>
  );
}
