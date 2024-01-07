import React from 'react'
import { IoHomeOutline } from "react-icons/io5";
import { AiFillMessage } from "react-icons/ai";
import { BsBell } from "react-icons/bs";
import { IoSettingsOutline } from "react-icons/io5";
import { FaCloudUploadAlt } from "react-icons/fa";
import { TbBrandPagekit } from "react-icons/tb";
import { useSelector } from 'react-redux';
function Sidebar() {
  let data= useSelector((state)=> state.userlogininfo.userinfo)

  return (
    <div className='w-full h-screen'>
      <div className='pt-5 relative'>
        <div className=' mx-auto h-[100px] w-[100px] rounded-full relative group'>
        <img className='  mx-auto h-[100px] w-[100px] rounded-full' src="public\profile.png" alt="profile" />
      <div className='mx-auto w-0 h-[100px] bg-[rgba(0,0,0,.7)]  absolute top-0 left-0 rounded-full  group-hover:w-[100px] flex justify-center items-center'>
        <FaCloudUploadAlt className='text-[36px] text-white '/>
      </div>
        </div>
      </div>
      <h1 className='text-white text-xl text-center mt-3'>{data.displayName}</h1>
      <div className='relative flex items-center justify-center ml-auto mt-[70px] w-[162px] h-[90px] bg-white rounded-tl-xl   rounded-bl-xl'>
      <IoHomeOutline className='text-[36px] mr-[40px] text-color2' />
      <div className='absolute w-[8px] h-[90px] bg-color2 rounded-tl-xl rounded-bl-xl right-0  '></div>
      </div>
      <div className='relative flex items-center justify-center ml-auto mt-[70px] w-[162px] h-[90px] rounded-tl-xl   rounded-bl-xl'>
      <AiFillMessage className='text-[40px] mr-[40px] text-white ' />
      <div className='absolute w-[8px] h-[90px] bg-color2 rounded-tl-xl rounded-bl-xl right-0  '></div>
      </div>
      <div className='relative flex items-center justify-center ml-auto mt-[70px] w-[162px] h-[90px] rounded-tl-xl   rounded-bl-xl'>
      <BsBell className='text-[40px] mr-[40px] text-white' />
      <div className='absolute w-[8px] h-[90px] bg-color2 rounded-tl-xl rounded-bl-xl right-0  '></div>
      </div>
      <div className='relative flex items-center justify-center ml-auto mt-[70px] w-[162px] h-[90px] rounded-tl-xl   rounded-bl-xl'>
      <IoSettingsOutline className='text-[40px] mr-[40px] text-white' />
      <div className='absolute w-[8px] h-[90px] bg-color2 rounded-tl-xl rounded-bl-xl right-0  '></div>
      </div>
      <div className='relative flex items-center justify-center ml-auto mt-[20px] w-[162px] h-[90px] rounded-tl-xl   rounded-bl-xl'>
      <TbBrandPagekit className='text-[40px] mr-[40px] text-white' />
      <div className='absolute w-[8px] h-[90px] bg-color2 rounded-tl-xl rounded-bl-xl right-0  '></div>
      </div>
    </div>
  )
}

export default Sidebar