import React, { useEffect, useState } from "react";
import { AiOutlineMore } from "react-icons/ai";
import { FaSearch } from "react-icons/fa";
import { getDatabase, ref, onValue, push, set, remove } from "firebase/database";
import { useSelector } from 'react-redux';
function Group() {
  const db = getDatabase();
  const data = useSelector((state) => state.userlogininfo.userinfo)
  const [groupname,setGroupname]=useState('')
  const [groupmodal, setGroupmodal] = useState(false);
  const [grouplist,setGrouplist]=useState([])
  let groupModal = () => {
    setGroupmodal(!groupmodal);
  };
  let handle_group_submit=()=>{
    set(push(ref(db, "group/")), {
      groupname : groupname,
      admin : data.displayName,
      adminid : data.uid,      
    }).then(() => {
  setGroupmodal(false)
    });
  }
  useEffect(()=>{
    const starCountRef = ref(db, 'group/');
    onValue(starCountRef, (snapshot) => {
     let array=[];
     snapshot.forEach((item)=>{
      if(data.uid !== item.val().adminid){
        
        array.push({...item.val(), id: item.key})
      }
     })
     setGrouplist(array)
    });
  },[])
  let handle_join=(item)=>{
    set(push(ref(db, "grouprequest/")), {
      groupname : item.groupname,
      admin : item.admin,
      adminid : item.adminid,
      requestname: data.displayName,
      requestid: data.uid,
            
    }).then(() => {

    });
  }
  return (
    <>
      <div className="relative">
        <input
          className="shadow-xl rounded-2xl mb-4 px-20 w-[427px] h-[60px] font-poppins  text-[18px] text-[#3D3D3D]"
          type="text"
          placeholder="Search"
        />
        <FaSearch className="text-[22px] absolute top-5 left-5 " />
        <AiOutlineMore className="text-[22px] text-color2 absolute top-5 right-5" />
      </div>
      <div className="p-5 shadow-xl rounded-2xl  h-[400px]">
        <div className="flex justify-between">
          <h1 className="font-poppins font-semibold text-[18px]">
            {groupmodal ? "Create Group" : "Groups Request"}
          </h1>
          <button
            onClick={groupModal}
            className="rounded-md p-1 text-white font-poppins font-semibold text-[20px] bg-color2"
          >
            {groupmodal ? "Go Back" : "Create Group"}
          </button>
        </div>
        {groupmodal ? (
        <div>
          <input onChange={(e)=>setGroupname(e.target.value)}
          className=" rounded-sm  mb-4 px-5 mt-4 w-full border-[2px] h-[60px] font-poppins   text-[#3D3D3D]"
          type="text"
          placeholder="Enter your group name"
        />
         <button onClick={handle_group_submit}  className=" text-[20px] font-semibold font-nunito w-full rounded-xl py-4  text-white bg-color2 ">
            Submit
            </button>
        </div>
        ) : (
          <div className="w-full h-[300px]   overflow-y-scroll "> 
{grouplist.map((item)=>(

            <div className="flex items-center justify-between mt-3 border-b pb-2 pt-2 rounded-lg   hover:bg-[rgba(0,0,0,0.05)]  cursor-pointer">
              <div>
                <img src="public/Ellipse1.png" alt="" />
              </div>
              <div>
                <h1 className="font-poppins font-semibold text-[18px]">
                 {item.groupname}
                </h1>
                <p className="font-poppins font-medium text-[14px] text-[#4D4D4D]">
                Admin:  {item.admin}
                </p>
              </div>
              <div>
                <button onClick={()=>handle_join(item)} className="rounded-md p-1 text-white font-poppins font-semibold text-[20px] bg-color2">
                 Join
                </button>
              </div>
            </div>
))}
            </div>
        )}
      </div>
    </>
  );
}

export default Group;
