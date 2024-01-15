import React, { useState } from 'react'
import { useRef } from 'react';
import { XCircle } from 'lucide-react';
import { getAuth, sendPasswordResetEmail } from "firebase/auth"
import { useNavigate } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
function Modal({onClose}) {
  let navigate=useNavigate()
    const auth = getAuth();
    let [email,setEmail]=useState()
    let [emailerr,setEmailerr]=useState()
    let [submitdone,setSubmitdone]=useState(false)
    const modalRef= useRef();
const closeModal=(e)=>{
    if(modalRef.current === e.target){
        onClose()
    }
}
let handle_forgetmail=(e)=>{
    setEmail(e.target.value);
    setEmailerr('')

}
let handle_reset_submit=()=>{
   if(! email){
    setEmailerr('Email is required !')
   }
   else if(!/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email)){
    setEmailerr('This is not a email address !')
   }
    sendPasswordResetEmail(auth, email)
      .then((user) => {
       
       setSubmitdone(true)
      })
      .then(()=>{
        setTimeout(() => {
          // navigate("/login")
          toast.info('Please cheack your email', {
            position: "top-center",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
            });
        }, 10);
      })
   
    
      .catch((error) => {
       console.log(error.code);
      });
}
  return (
    
  
    <div ref={modalRef} onClick={closeModal} className='flex  justify-center items-center fixed inset-0 bg-black bg-opacity-30 backdrop-blur-md '> 
       <ToastContainer
position="top-center"
autoClose={5000}
hideProgressBar={false}
newestOnTop={false}
closeOnClick
rtl={false}
pauseOnFocusLoss
draggable
pauseOnHover
theme="dark"
/>
        <div className=' '>
          {submitdone ? 
        <div ><img className=' w-[450px] h-[336px]  rounded-xl ' src="public/succes.gif" alt="" /></div>  
        :

            <div className='relative  bg-white flex-col gap-5 mx-4 px-20 pb-10 pt-20 item-center  rounded-xl'>
            <button onClick={onClose} className=' absolute right-0 top-0 hover:text-white hover:rounded-full  hover:bg-red-500'><XCircle size={40}/></button>
                <h1 className='text-3xl font-poppins text-color1'>Reset Password</h1>
                <div className='mt-[20px]  h-[90px] '>

                <input onChange={handle_forgetmail}
              className=   {email ? "w-[368px] h-[70px] border-[2px] px-9 border-green-500 rounded-xl outline-none" : "w-[368px] h-[70px] border-[2px] px-9  outline-none border-color1  rounded-xl "} 
              type="email"
              placeholder='Enter a valid email'
            />
            {emailerr && 
            <p className='text-red-500'>{emailerr}</p>
            }
                </div>
            <button onClick={handle_reset_submit} className='text-white bg-color2 py-2 px-5 text-xl rounded-xl mt-4 '>Submit</button>
       
            </div>
        }
        </div>
    </div>
  )
}

export default Modal