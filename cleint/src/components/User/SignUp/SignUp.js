import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect, useHistory, useLocation } from "react-router-dom";
import {
  userLoginStateAsync,
  userSignUpStateAsync,
} from "../../../store/reducers/userReducer/userReducer";
import { MultiFileInput } from "../../MultiFileInput";

export default function Login() {
  const [signUpData, setSignUpData] = useState({
    userEmail: undefined,
    password: undefined,
    file: undefined,
    userFirstName: undefined,
    userLastName: undefined,
    userContactNumber: undefined,
  });
  const history = useHistory();
  const dispatch = useDispatch();

  const handleChange = (event) => {
    let s = {
      ...signUpData,
    };
    s[event.target.name] = event.target.value;
    setSignUpData(s);
  };

  const handleSubmit = (event) => {
    let data = new FormData();

    data.append("file", signUpData.file);
    data.append("userEmail", signUpData.userEmail);
    data.append("password", signUpData.password);
    data.append("userFirstName", signUpData.userFirstName);
    data.append("userLastName", signUpData.userLastName);
    data.append("userContactNumber", signUpData.userContactNumber);

    console.log(signUpData);
    event.preventDefault();
    dispatch(userSignUpStateAsync(data));
    history.replace('/');
  };
  const userData = useSelector((state) => state.userReducer);

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
        <h2>"SignUp"</h2>
        <h4>Email Id: </h4>
        <input
          placeholder="Enter Email Id"
          type="email"
          name="userEmail"
          onChange={handleChange}
          style={{ padding: 10 }}
          value={signUpData.userEmail}
        />
        <h4>Password: </h4>
        <input
          placeholder="Enter Password"
          type="password"
          name="password"
          onChange={handleChange}
          style={{ padding: 10 }}
          value={signUpData.password}
        />
        <h4>First Name: </h4>
        <input
          placeholder="Enter First Name"
          type="text"
          name="userFirstName"
          onChange={handleChange}
          style={{ padding: 10 }}
          value={signUpData.userFirstName}
        />
        <h4>Last Name: </h4>
        <input
          placeholder="Enter Last Name"
          type="text"
          name="userLastName"
          onChange={handleChange}
          style={{ padding: 10 }}
          value={signUpData.userLastName}
        />
        <h4>Contact Number: </h4>
        <input
          placeholder="Enter Contact Number"
          type="text"
          name="userContactNumber"
          onChange={handleChange}
          style={{ padding: 10 }}
          value={signUpData.userContactNumber}
        />

        <MultiFileInput data={signUpData} setData={setSignUpData} />
        <button onClick={handleSubmit} style={{ padding: 10, margin: 20 }}>
          Submit
        </button>
      </form>
      <button
        onClick={() => {
          history.push("/");
        }}
      >
        Click Here
      </button>
    </div>
  );
}
