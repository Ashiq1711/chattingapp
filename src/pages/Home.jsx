import Friendrequest from '../components/Friendrequest'
import Friends from '../components/Friends'
import Group from '../components/Group'
import Sidebar from '../components/Sidebar'
import React from 'react'
import UserList from '../components/UserList'
import MyGroups from '../components/MyGroups'
import BlockedUsers from '../components/BlockedUsers'


function Home() {

  return (
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
  )
}

export default Home