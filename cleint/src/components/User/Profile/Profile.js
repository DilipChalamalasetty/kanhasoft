
import React,{useState} from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { userUpdateInfoAsync } from "../../../store/reducers/userReducer/userReducer";

import { MultiFileInput } from "../../MultiFileInput";
export const Profile = () => {
  const userData = useSelector((state) => state.userReducer);
  console.log(userData,"userData");
    const dispatch=useDispatch();
  const [profileData, setProfileData] = useState({
    userEmail: userData.userEmail,
    file: undefined,
    userFirstName: userData.userFirstName,
    userLastName: userData.userLastName,
    //userUploadedImagesUrls:userData.userUploadedImagesUrls,
    userContactNumber: userData.userContactNumber,
  });

  const handleChange = (event) => {
    let s = {
      ...profileData,
    };
    s[event.target.name] = event.target.value;
    setProfileData(s);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    let data = new FormData();

    data.append("file", profileData.file);
    data.append("userEmail", profileData.userEmail);
    data.append("userFirstName", profileData.userFirstName);
    data.append("userLastName", profileData.userLastName);
    data.append("userContactNumber", profileData.userContactNumber);
    data.append("token",userData.token);
    //console.log(userData.token);
    dispatch(userUpdateInfoAsync(data));
  };

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
        <h2>"Profile Page"</h2>
        <h4>Email Id: </h4>
        <input
          placeholder="Enter Email Id"
          type="email"
          name="userEmail"
          onChange={handleChange}
          style={{ padding: 10 }}
          value={profileData.userEmail}
        />
        <h4>First Name: </h4>
        <input
          placeholder="Enter First Name"
          type="text"
          name="userFirstName"
          onChange={handleChange}
          style={{ padding: 10 }}
          value={profileData.userFirstName}
        />
        <h4>Last Name: </h4>
        <input
          placeholder="Enter Last Name"
          type="text"
          name="userLastName"
          onChange={handleChange}
          style={{ padding: 10 }}
          value={profileData.userLastName}
        />
        <h4>Contact Number: </h4>
        <input
          placeholder="Enter Contact Number"
          type="text"
          name="userContactNumber"
          onChange={handleChange}
          style={{ padding: 10 }}
          value={profileData.userContactNumber}
        />
        {
            userData.userUploadedImagesUrls.map((value,index)=>{
                return(
                    <img src={process.env.REACT_APP_APIURL+value} key={index} alt={"image"} style={{height:100,width:100}}></img>
                )
            })
        }
        
        <MultiFileInput data={profileData} setData={setProfileData} />
        <button onClick={handleSubmit} style={{ padding: 10, margin: 20 }}>
          Submit
        </button>
      </form>
      
    </div>
  );
};
