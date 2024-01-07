import { createSlice } from '@reduxjs/toolkit'

export const userSlices = createSlice({
  name: 'user',
  initialState: {
    userinfo: "0"
  },
  reducers: {
    userlogininfo: (state, action) => {
     
      state.userinfo = action.payload;
    },
  }
})


export const { userlogininfo } = userSlices.actions

export default userSlices.reducer