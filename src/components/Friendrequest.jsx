import React, { useEffect, useState } from 'react'
import { AiOutlineMore } from "react-icons/ai";
import { getDatabase, ref, onValue, push, set, remove } from "firebase/database";
import {  useSelector } from 'react-redux'
function Friendrequest() {
  const data = useSelector((state)=>state.userlogininfo.userinfo)

  const db = getDatabase();
  let [friendList,setFriendList]=useState([])
  useEffect(()=>{
    const starCountRef = ref(db, 'friendrequest/');
    onValue(starCountRef, (snapshot) => {
     let array=[];
     snapshot.forEach((item)=>{
      if(data.uid == item.val().receiverid){

        array.push({...item.val(), id: item.key})
      }
     })
     setFriendList(array)
    });
  },[])
 

  let handle_friendrequest_accept=(item)=>{
    console.log(item);
    set(push(ref(db, 'friend/')), { 
      ...item
    }).then(()=>{
remove(ref(db, 'friendrequest/'+ item.id ))
    })

  }
  return (
   <>
    <div className='p-5 shadow-xl rounded-2xl mt-8 '>
      <div className='flex justify-between'>
        <h1 className='font-poppins font-semibold text-[18px]'>Friend Request</h1>
        <AiOutlineMore className='text-[22px] text-color2' />
      </div>
      <div className='w-full h-[300px]   overflow-y-scroll '>
        {friendList.map((item)=>(

      <div className='flex items-center justify-between mt-3 border-b pb-2 pt-2 rounded-lg   hover:bg-[rgba(0,0,0,0.05)]  cursor-pointer'>
        <div>

          <img src="public/Ellipse1.png" alt="" />
        </div>
        <div>
          <h1 className='font-poppins font-semibold text-[18px]'>{item.sendername}</h1>
          <p className='font-poppins font-medium text-[14px] text-[#4D4D4D]'>{item.senderemail}</p>
        </div><div>

          <button onClick={()=>handle_friendrequest_accept(item)} className='rounded-md p-1 text-white font-poppins font-semibold text-[20px] bg-color2'>Accept</button>
        </div>
      </div>
        ))}

      </div>
    </div>
   </>
  )
}

export default Friendrequest