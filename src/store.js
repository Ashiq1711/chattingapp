import { configureStore } from '@reduxjs/toolkit'
import  userLoginInfo  from './slices/userSlices'

export default configureStore({
  reducer: {
    userlogininfo: userLoginInfo
  },
})