import React, { useEffect, useState } from 'react'
import { AiOutlineMore } from "react-icons/ai";
import { getDatabase, ref, onValue, push, set, remove } from "firebase/database";
import { useSelector } from 'react-redux';

function MyGroups() {
  const db = getDatabase();
  const data = useSelector((state) => state.userlogininfo.userinfo);
  const [mygrouplist,setMygrouplist]=useState([]);
  const [mygrouprequestlist,setMygrouprequestlist]=useState([]);
  const [mygrouplistmodal,setMygrouplistmodal]=useState(false);
  useEffect(()=>{
    const starCountRef = ref(db, 'group/');
    onValue(starCountRef, (snapshot) => {
     let array=[];
     snapshot.forEach((item)=>{
      if(data.uid == item.val().adminid){
        
        array.push(item.val())
      }
     })
     setMygrouplist(array)
    });
    
  },[])
  let handle_group_request=()=>{
    setMygrouplistmodal(!mygrouplistmodal)
  }
  useEffect(()=>{
    const starCountRef = ref(db, 'grouprequest/');
    onValue(starCountRef, (snapshot) => {
     let array=[];
     snapshot.forEach((item)=>{  
      if(data.uid==item.val().adminid){

        array.push(item.val())
      }  
     })
     setMygrouprequestlist(array)
    });
    
  },[])
  return (
   <>

    <div className='p-5 shadow-xl rounded-2xl mt-5'>
      <div className='flex justify-between'>
        <h1 className='font-poppins font-semibold text-[18px]'>My Groups</h1>
        <AiOutlineMore onClick={handle_group_request} className='text-[22px] text-color2' />
      </div>
      {mygrouplistmodal? 
      <div>
{mygrouprequestlist.map((item)=>(

 <div className='flex items-center justify-between mt-3 border-b pb-2 pt-2 rounded-lg   hover:bg-[rgba(0,0,0,0.05)]  cursor-pointer'>
 <div>

   <img src="public/Ellipse1.png" alt="" />
 </div>
 <div>
   <h1 className='font-poppins font-semibold text-[18px]'>{item.groupname}</h1>
   <p className='font-poppins font-medium text-[14px] text-[#4D4D4D]'> {item.requestname}</p>
 </div>
</div>
))}
      </div>
  :
      <div className='w-full h-[400px]   overflow-y-scroll '>
  {mygrouplist.map((item)=>(

      <div className='flex items-center justify-between mt-3 border-b pb-2 pt-2 rounded-lg   hover:bg-[rgba(0,0,0,0.05)]  cursor-pointer'>
        <div>

          <img src="public/Ellipse1.png" alt="" />
        </div>
        <div>
          <h1 className='font-poppins font-semibold text-[18px]'>{item.groupname}</h1>
          <p className='font-poppins font-medium text-[14px] text-[#4D4D4D]'>  Admin:  {item.admin}</p>
        </div><div>

        <p className='font-poppins font-medium text-[14px] text-[#4D4D4D]'>Today, 8:56pm</p>
        </div>
      </div>
  ))}
 
      </div>
}
    </div>
  
   </>
  )
}

export default MyGroups