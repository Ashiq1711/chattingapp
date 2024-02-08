import React, { useEffect, useState } from 'react'
import { AiOutlineMore } from "react-icons/ai";
import { getDatabase, ref, onValue, push, set, remove } from "firebase/database";
import { useSelector } from 'react-redux';
function BlockedUsers() {
  const [blockuser, setBlockuser] = useState([])
  const data = useSelector((state) => state.userlogininfo.userinfo)

  const db = getDatabase();
  useEffect(() => {
    const friendRef = ref(db, 'block/');
    onValue(friendRef, (snapshot) => {
      let array = []
      snapshot.forEach((item) => {
        if(data.uid == item.val().blockbyid){
          array.push({
            blockid: item.val().blockid,
            block: item.val().block,
            id:item.key,
          }); 
        }else if(data.uid==item.val().blockid){
          array.push({
            blockbyid: item.val().blockbyid,
            blockby: item.val().blockby,
            id:item.key,
          }); 
          
        }
      })
      setBlockuser(array)

    });
  }, [])
let handle_unblock=(item)=>{
  set(push(ref(db, "friend/")), {
    sendername: data.displayName,
    senderid: data.uid,
    receivername: item.block,
    receiverid: item.blockid,
  }).then(() => {
    remove(ref(db, 'block/'+ item.id ))
  });
}
  return (
   <>
    <div className='p-5 shadow-xl rounded-2xl mt-5 '>
      <div className='flex justify-between'>
        <h1 className='font-poppins font-semibold text-[18px]'>Blocked Users</h1>
        <AiOutlineMore className='text-[22px] text-color2' />
      </div>
      <div className='w-full h-[400px]   overflow-y-scroll '>
        {blockuser.map((item)=>(

      <div className='flex items-center justify-between mt-3 border-b pb-2 pt-2 rounded-lg   hover:bg-[rgba(0,0,0,0.05)]  cursor-pointer'>
        <div>

          <img src="public/Ellipse1.png" alt="" />
        </div>
        <div>
          <h1 className='font-poppins font-semibold text-[18px]'>{item.block}</h1>
          <h1 className='font-poppins font-semibold text-[18px]'>{item.blockby}</h1>
          <p className='font-poppins font-medium text-[14px] text-[#4D4D4D]'>Hi Guys, Wassup!</p>
        </div><div>
{item.blockid ?

<button onClick={()=>handle_unblock(item)} className='rounded-md px-4 py-2 text-white font-poppins  text-[20px] bg-color2'>Unblock</button>
:

          <button className='rounded-md px-4 py-2 text-red-400 font-poppins  text-[20px] bg-gray-300'>Blocked</button>
}
        </div>
      </div>
        ))}

      </div>
    </div>
   </>
  )
}

export default BlockedUsers