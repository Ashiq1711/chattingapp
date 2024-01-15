import Friendrequest from '../components/Friendrequest'
import Friends from '../components/Friends'
import Group from '../components/Group'
import Sidebar from '../components/Sidebar'
import React, { useEffect } from 'react'
import UserList from '../components/UserList'
import MyGroups from '../components/MyGroups'
import BlockedUsers from '../components/BlockedUsers'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { userLoginInfo } from '../slices/userSlices'

function Home() {
  // const dispatch=useDispatch()
  const auth = getAuth();
let navigate=useNavigate()
const data = useSelector((state)=>state.userlogininfo.userinfo)

useEffect(()=>{
if(data == 'null'){
  navigate('/login')
}
},[]);
// onAuthStateChanged(auth, (user) => {
//   if (user) {
//     dispatch(userlogininfo(user));

//   } else {

//   }
// });

  return (
    <>
    {data.emailVarified ? 
    
    <div className='flex justify-between  '>

    <div className='w-[186px] bg-color2 h-screen flex rounded-2xl'>
    <Sidebar/>
    </div>
  

    <div className='w-[430px]  '>
      <Group/>
      <Friendrequest/>
    </div>
    <div className='w-[430px] '>
      <Friends/>
     <MyGroups/>
    </div>
    <div className='w-[430px]  '>
      <UserList/>
      <BlockedUsers/>
    </div>
   
    </div>
    :
    <div className=' flex justify-center items-center h-screen'>
      <h1 className=' text-[45px]'>Email not verified</h1>
    </div>
  }
    </>
  )
}

export default Home