import axios from 'axios';

export default function fetchUserState(userInfo) {
    return new Promise((resolve,reject) =>{
        console.log(process.env.REACT_APP_APIURL);
        axios.post(process.env.REACT_APP_APIURL+'/login',{userEmail:userInfo.userEmail,password:userInfo.password})
        .then((data)=>{
            resolve({data:{loginSuccessfull:true,...data}});
        })
        .catch((err)=>{
            resolve({data:{loginSuccessfull:false}});
        })
        // setTimeout(() => resolve({ data: userInfo }), 500)
    }
    );
  }
  