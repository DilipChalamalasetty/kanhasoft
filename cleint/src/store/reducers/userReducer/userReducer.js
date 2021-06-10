import {createSlice,createAsyncThunk} from '@reduxjs/toolkit';
import fetchUserLoginState from './fetchUserLoginState';
import fetchUserSignUpState from './fetchUserSignUpState';
import fetchUpdateInfoState from "./fetchUpdateInfoState"
//intial state of counter component
import {userInitialState} from './userInitialState';

export const userLoginStateAsync = createAsyncThunk(
    'user/fetchUserLoginState',
    async (userInfo) => {
      const response = await fetchUserLoginState(userInfo);
      return response.data;
    }
  );

export const userSignUpStateAsync = createAsyncThunk(
    'user/fetchUserSignUpState',
    async (userInfo) => {
      const response = await fetchUserSignUpState(userInfo);
      return response.data;
    }
  );

export const userUpdateInfoAsync = createAsyncThunk(
'user/fetchUpdateInfoState',
async (userInfo) => {
    const response = await fetchUpdateInfoState(userInfo);
    return response.data;
}
);

const userSlice=createSlice({
    name:"user",
    initialState:userInitialState,
    reducers:{
    },
    extraReducers:{
        //login thunks
        [userLoginStateAsync.pending]:(state,action)=>{
            state.isIdle = false;
            state.loading = true;
        },
        [userLoginStateAsync.fulfilled]:(state,action)=>{
            console.log(action);
            state.isIdle=true;
            state.userEmail=action.payload.data.userEmail;
            state.userFirstName=action.payload.data.userFirstName;
            state.userLastName=action.payload.data.userLastName;
            state.userContactNumber=action.payload.data.userContactNumber;
            state.userUploadedImagesUrls=action.payload.data.userUploadedImagesUrls;
            state.token=action.payload.data.token;
            state.loginSuccessfull=true;
            state.loading = false;
        },
        [userLoginStateAsync.rejected]:(state,action)=>{
            state.isIdle=true;
            state.loading = false;
            state.loginSuccessfull=false;
        },
        //signup thunks
        [userSignUpStateAsync.pending]:(state,action)=>{
            state.isIdle = false;
            state.loading = true;
        },
        [userSignUpStateAsync.fulfilled]:(state,action)=>{
            state.isIdle=true;
            state.signUpSuccessfull=true;
            state.loading = false;
        },
        [userSignUpStateAsync.rejected]:(state,action)=>{
            state.isIdle=true;
            state.signUpSuccessfull=false;
            state.loading = false;
        },
        //update thunks
        [userUpdateInfoAsync.pending]:(state,action)=>{
            state.isIdle = false;
            state.loading = true;
        },
        [userUpdateInfoAsync.fulfilled]:(state,action)=>{
            state.isIdle=true;
            state.userEmail=action.payload.data.userEmail;
            state.userFirstName=action.payload.data.userFirstName;
            state.userLastName=action.payload.data.userLastName;
            state.userContactNumber=action.payload.data.userContactNumber;
            state.userUploadedImagesUrls=action.payload.data.userUploadedImagesUrls;
            state.loading = false;
        },
        [userUpdateInfoAsync.rejected]:(state,action)=>{
            state.isIdle=true;
            state.loading = false;
        },
    }
});

export const {}=userSlice.actions;
export default userSlice.reducer;