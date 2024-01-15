// import { createSlice } from '@reduxjs/toolkit'

// export const userSlices = createSlice({
//   name: 'user',
//   initialState: {
//     userinfo: localStorage.getItem('userinfo') ? JSON.parse(localStorage.getItem('userinfo')) : "null"
//   },
//   reducers: {
//     userlogininfo: (state, action) => {
     
//       state.userinfo = action.payload;
//     },
//   }
// })


// export const { userlogininfo } = userSlices.actions

// export default userSlices.reducer



import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  userInfo: localStorage.getItem("userInfo")
    ? JSON.parse(localStorage.getItem("userInfo"))
    : "null",
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    userLoginInfo: (state, action) => {
      state.userInfo = action.payload;
    },
  },
});

export const { userLoginInfo } = userSlice.actions;

export default userSlice.reducer;