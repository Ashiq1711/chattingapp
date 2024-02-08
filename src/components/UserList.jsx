import React, { useEffect, useState } from "react";
import { AiOutlineMore } from "react-icons/ai";
import { FaSearch } from "react-icons/fa";
import { getDatabase, ref, onValue, push, set } from "firebase/database";
import { useSelector } from "react-redux";
function UserList() {
  const data = useSelector((state) => state.userlogininfo.userinfo);

  const [userlist, setUserlist] = useState([]);
  const [searchlist, setSearchlist] = useState([]);
  const [friendrequestList, setFriendrequestList] = useState([]);
  const [friendList, setFriendList] = useState([]);
  const db = getDatabase();

  useEffect(() => {
    const starCountRef = ref(db, "users/");
    onValue(starCountRef, (snapshot) => {
      let array = [];
      snapshot.forEach((item) => {
        if (data.uid !== item.key) {
          array.push({ ...item.val(), id: item.key });
        }
      });
      setUserlist(array);
    });
  }, []);

  let handle_friend_request = (item) => {
    set(push(ref(db, "friendrequest/")), {
      sendername: data.displayName,
      senderemail: data.email,
      senderid: data.uid,
      receivername: item.username,
      receiveremail: item.email,
      receiverid: item.id,
    }).then(() => {});
    console.log(item);
  };
  useEffect(() => {
    const friendrequestRef = ref(db, "friendrequest/");
    onValue(friendrequestRef, (snapshot) => {
      let array=[]
      snapshot.forEach((item) => {
        array.push(item.val().receiverid + item.val().senderid)
      });
      setFriendrequestList(array);
    });
  }, []);
  useEffect(() => {
    const friendrequestRef = ref(db, "friend/");
    onValue(friendrequestRef, (snapshot) => {
      let array=[]
      snapshot.forEach((item) => {
        array.push(item.val().receiverid + item.val().senderid)
      });
      setFriendList(array);
    });
  }, []);
let handle_search=(e)=>{
let data= userlist.filter((item)=>item.username.toLowerCase().includes(e.target.value.toLowerCase()))
setSearchlist(data);
}
  return (
    <>
      <div className="p-5 shadow-xl rounded-2xl ">
        <div className="flex justify-between">
          <h1 className="font-poppins font-semibold text-[18px]">User Lists</h1>
          <AiOutlineMore className="text-[22px] text-color2" />
        </div>
        <div className="relative">
        <input onChange={handle_search}
          className="shadow-xl rounded-2xl mb-4 px-20 w-full h-[60px] font-poppins  text-[18px] text-[#3D3D3D]"
          type="text"
          placeholder="Search"
        />
        <FaSearch className="text-[22px] absolute top-5 left-5 " />
        <AiOutlineMore className="text-[22px] text-color2 absolute top-5 right-5" />
      </div>
        <div className="w-full h-[300px]   overflow-y-scroll ">
          {searchlist.length > 0 ? 

searchlist.map((item)=>(
  <div className="flex items-center justify-between mt-3 border-b pb-2 pt-2 rounded-lg   hover:bg-[rgba(0,0,0,0.05)]  cursor-pointer">
  <div>
    <img src="public/Ellipse1.png" alt="" />
  </div>
  <div>
    <h1 className="font-poppins font-semibold text-[18px]">
      {item.username}
    </h1>
    <p className="font-poppins font-medium text-[14px] text-[#4D4D4D]">
      {item.email}
    </p>
  </div>
  <div>
    {
    friendList.includes(data.uid + item.id) ||
    friendList.includes(item.id + data.uid) ? (
      <button className="rounded-md p-1 px-3 text-white font-poppins font-semibold text-[20px] bg-color2">
        F
      </button>
    ) : 
    friendrequestList.includes(data.uid + item.id) ||
      friendrequestList.includes(item.id + data.uid) ? (
      <button className="rounded-md p-1 px-3 text-white font-poppins font-semibold text-[20px] bg-color2">
        -
      </button>
    ) : (
      <button
        onClick={() => handle_friend_request(item)}
        className="rounded-md p-1 px-3 text-white font-poppins font-semibold text-[20px] bg-color2"
      >
        +
      </button>
    )}
  </div>
</div>
))
          :
          userlist.map((item) => (
            <div className="flex items-center justify-between mt-3 border-b pb-2 pt-2 rounded-lg   hover:bg-[rgba(0,0,0,0.05)]  cursor-pointer">
              <div>
                <img src="public/Ellipse1.png" alt="" />
              </div>
              <div>
                <h1 className="font-poppins font-semibold text-[18px]">
                  {item.username}
                </h1>
                <p className="font-poppins font-medium text-[14px] text-[#4D4D4D]">
                  {item.email}
                </p>
              </div>
              <div>
                {
                friendList.includes(data.uid + item.id) ||
                friendList.includes(item.id + data.uid) ? (
                  <button className="rounded-md p-1 px-3 text-white font-poppins font-semibold text-[20px] bg-color2">
                    F
                  </button>
                ) : 
                friendrequestList.includes(data.uid + item.id) ||
                  friendrequestList.includes(item.id + data.uid) ? (
                  <button className="rounded-md p-1 px-3 text-white font-poppins font-semibold text-[20px] bg-color2">
                    -
                  </button>
                ) : (
                  <button
                    onClick={() => handle_friend_request(item)}
                    className="rounded-md p-1 px-3 text-white font-poppins font-semibold text-[20px] bg-color2"
                  >
                    +
                  </button>
                )}
              </div>
            </div>
          ))
          }
        </div>
      </div>
    </>
  );
}

export default UserList;
