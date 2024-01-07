import { configureStore } from '@reduxjs/toolkit'
import  userlogininfo  from './slices/userSlices'

export default configureStore({
  reducer: {
    userlogininfo : userlogininfo
    

  }
})