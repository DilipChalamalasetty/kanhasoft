import axios from 'axios';

export default function fetchUserState(userInfo) {
    console.log(userInfo)
    return new Promise((resolve,reject) =>{
        axios.post(process.env.REACT_APP_APIURL+'/signup',userInfo)
        .then((data)=>{
            resolve({data:{signUpSuccessfull:true}});
        })
        .catch((err)=>{
            resolve({data:{signUpSuccessfull:false}});
        })
    }
    );
  }
  