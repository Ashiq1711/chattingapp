import React from 'react'
import { AiOutlineMore } from "react-icons/ai";

function BlockedUsers() {
  return (
   <>
    <div className='p-5 shadow-xl rounded-2xl mt-5 '>
      <div className='flex justify-between'>
        <h1 className='font-poppins font-semibold text-[18px]'>Blocked Users</h1>
        <AiOutlineMore className='text-[22px] text-color2' />
      </div>
      <div className='w-full h-[400px]   overflow-y-scroll '>
      <div className='flex items-center justify-between mt-3 border-b pb-2 pt-2 rounded-lg   hover:bg-[rgba(0,0,0,0.05)]  cursor-pointer'>
        <div>

          <img src="public/Ellipse1.png" alt="" />
        </div>
        <div>
          <h1 className='font-poppins font-semibold text-[18px]'>Friends Reunion</h1>
          <p className='font-poppins font-medium text-[14px] text-[#4D4D4D]'>Hi Guys, Wassup!</p>
        </div><div>

          <button className='rounded-md p-1 text-white font-poppins font-semibold text-[20px] bg-color2'>Unblock</button>
        </div>
      </div>
      <div className='flex items-center justify-between mt-3 border-b pb-2 pt-2 rounded-lg   hover:bg-[rgba(0,0,0,0.05)]  cursor-pointer'>
        <div>

          <img src="public/Ellipse1.png" alt="" />
        </div>
        <div>
          <h1 className='font-poppins font-semibold text-[18px]'>Friends Reunion</h1>
          <p className='font-poppins font-medium text-[14px] text-[#4D4D4D]'>Hi Guys, Wassup!</p>
        </div><div>

          <button className='rounded-md p-1 text-white font-poppins font-semibold text-[20px] bg-color2'>Unblock</button>
        </div>
      </div>
      <div className='flex items-center justify-between mt-3 border-b pb-2 pt-2 rounded-lg   hover:bg-[rgba(0,0,0,0.05)]  cursor-pointer'>
        <div>

          <img src="public/Ellipse1.png" alt="" />
        </div>
        <div>
          <h1 className='font-poppins font-semibold text-[18px]'>Friends Reunion</h1>
          <p className='font-poppins font-medium text-[14px] text-[#4D4D4D]'>Hi Guys, Wassup!</p>
        </div><div>

          <button className='rounded-md p-1 text-white font-poppins font-semibold text-[20px] bg-color2'>Unblock</button>
        </div>
      </div>
      <div className='flex items-center justify-between mt-3 border-b pb-2 pt-2 rounded-lg   hover:bg-[rgba(0,0,0,0.05)]  cursor-pointer'>
        <div>

          <img src="public/Ellipse1.png" alt="" />
        </div>
        <div>
          <h1 className='font-poppins font-semibold text-[18px]'>Friends Reunion</h1>
          <p className='font-poppins font-medium text-[14px] text-[#4D4D4D]'>Hi Guys, Wassup!</p>
        </div><div>

          <button className='rounded-md p-1 text-white font-poppins font-semibold text-[20px] bg-color2'>Unblock</button>
        </div>
      </div>
      <div className='flex items-center justify-between mt-3 border-b pb-2 pt-2 rounded-lg   hover:bg-[rgba(0,0,0,0.05)]  cursor-pointer'>
        <div>

          <img src="public/Ellipse1.png" alt="" />
        </div>
        <div>
          <h1 className='font-poppins font-semibold text-[18px]'>Friends Reunion</h1>
          <p className='font-poppins font-medium text-[14px] text-[#4D4D4D]'>Hi Guys, Wassup!</p>
        </div><div>

          <button className='rounded-md p-1 text-white font-poppins font-semibold text-[20px] bg-color2'>Unblock</button>
        </div>
      </div>
      </div>
    </div>
   </>
  )
}

export default BlockedUsers