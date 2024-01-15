import { createSlice } from '@reduxjs/toolkit'

export const userSlices = createSlice({
  name: 'user',
  initialState: {
    userinfo: localStorage.getItem('userinfo') ? JSON.parse(localStorage.getItem('userinfo')) : "null"
  },
  reducers: {
    userlogininfo: (state, action) => {
     
      state.userinfo = action.payload;
    },
  }
})


export const { userlogininfo } = userSlices.actions

export default userSlices.reducer