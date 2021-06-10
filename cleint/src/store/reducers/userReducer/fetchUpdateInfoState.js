import axios from 'axios';

export default function fetchUpdateInfo(userInfo) {
    
    // const options = {
    //   headers: {
    //     authorization: "token " + token, 
    //   }}
    return new Promise((resolve,reject) =>{
        axios.post(process.env.REACT_APP_APIURL+'/updateprofile',userInfo)
        .then((data)=>{
            resolve({data:{...data}});
        })
        .catch((err)=>{
            resolve({data:{}});
        })
    }
    );
  }
  