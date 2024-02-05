import React, { useEffect, useState } from 'react'
import { AiOutlineMore } from "react-icons/ai";
import { getDatabase, ref, onValue, push, set, remove } from "firebase/database";
import { useSelector } from 'react-redux';

function Friends() {
  const [friendlist, setFriendlist] = useState([])
  const data = useSelector((state) => state.userlogininfo.userinfo)

  const db = getDatabase();
  useEffect(() => {
    const friendRef = ref(db, 'friend/');
    onValue(friendRef, (snapshot) => {
      let array = []
      snapshot.forEach((item) => {
        if (data.uid == item.val().senderid || data.uid == item.val().receiverid) {

          array.push({ ...item.val(), id: item.key })
        }
      })
      setFriendlist(array)

    });
  }, [])
  let handle_block=(item)=>{
    if(data.uid==item.senderid){
      set(push(ref(db, 'block/')), { 
   block: item.receivername,
   blockid: item.receiverid,
   blockby: data.displayName,
   blockbyid: data.uid,
      
      }).then(()=>{
  remove(ref(db, 'friend/'+ item.id ))
      })

    }else{
      set(push(ref(db, 'block/')), { 
        block: item.sendername,
        blockid: item.senderid,
        blockby: item.receivername,
        blockbyid: item.receiverid,
           
           }).then(()=>{
       remove(ref(db, 'friend/'+ item.id ))
           })
     
      
    }
  }
  return (
    <>
      <div className='p-5 shadow-xl rounded-2xl '>
        <div className='flex justify-between'>
          <h1 className='font-poppins font-semibold text-[18px]'>Friends</h1>
          <AiOutlineMore className='text-[22px] text-color2' />
        </div>
        <div className='w-full h-[300px]   overflow-y-scroll '>
          {friendlist.map((item) => (
            <div className='flex items-center justify-between mt-3 border-b pb-2 pt-2 rounded-lg   hover:bg-[rgba(0,0,0,0.05)]  cursor-pointer'>
              <div>
              <img src="public/Ellipse1.png" alt="" />
              </div>
              <div>
                {data.uid==item.senderid ?
                
                <h1 className='font-poppins font-semibold text-[18px]'>{item.receivername}</h1>
                :
                
                <h1 className='font-poppins font-semibold text-[18px]'>{item.sendername}</h1>
              }
              <p className='font-poppins font-medium text-[14px] text-[#4D4D4D]'>Hi Guys, Wassup!</p>
              </div><div>
                <button onClick={()=>handle_block(item)} className='font-poppins font-medium text-[14px] bg-color2  text-[#fff] px-5 py-2 rounded-md'>Block</button>
              </div>
            </div>
          ))}

        </div>
      </div>
    </>
  )
}

export default Friends