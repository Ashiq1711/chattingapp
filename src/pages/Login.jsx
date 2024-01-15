import { useState } from "react";
import { Link } from "react-router-dom";
import { FaEyeSlash, FaRegEye } from "react-icons/fa";
import {PropagateLoader} from "react-spinners"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { getAuth, signInWithEmailAndPassword,  signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import Modal from "../components/Modal";
import { useNavigate } from 'react-router-dom'
import { useDispatch } from "react-redux";
import { userlogininfo } from "../slices/userSlices";
function Login() {
  let dispatch = useDispatch()
  const auth = getAuth();
  const provider = new GoogleAuthProvider();
  let navigate=useNavigate()
  let [email,setEmail]=useState()
  let [password,setPassword]=useState()
  let [emailerr,setEmailerr]=useState()
  let [passworderr,setPassworderr]=useState()
  let [passwordShow,setPasswordShow]=useState(false)
  let [showModal,setShowModal]=useState(false)
  let handle_email=(e)=>{
    setEmail(e.target.value)
    setEmailerr('')


  }
  let handle_password=(e)=>{
    setPassword(e.target.value)
    setPassworderr()

  }
  let handle_submit=()=>{
    if(!email){
      setEmailerr('Email is required !')
    }
    else if(!/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email)){
      setEmailerr('This is not a mail addres')
     }
    if(!password){
      setPassworderr('Password is required !')
    }
    else if (!/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/.test(password)) {
      setPassworderr('Password must be strong !')
  }
  if(email && password){
    signInWithEmailAndPassword(auth, email, password)
    .then((user) => {
     
      dispatch(userlogininfo(user.user));
      localStorage.setItem('userinfo',JSON.stringify(user.user));
      toast('Sign up successfully!', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      setEmailerr('')
    }).then(()=>{
      setTimeout(() => {
        
        navigate("/home")
      }, 3000);
     
    })
    .catch((error) => {
      if(error.code.includes('auth/invalid-credential')){

        setEmailerr('Wrong Password !')
      }
 
    });
  }
}
let handle_google=()=>{
  signInWithPopup(auth, provider)
  .then((result) => {
   
      setTimeout(() => {
        
        navigate("/home")
      }, 2000);
     
   
  }).catch((error) => {
   console.log(error.code);
  });
}
  return (
    <div className="flex ">
       <ToastContainer
position="top-right"
autoClose={5000}
hideProgressBar={false}
newestOnTop={false}
closeOnClick
rtl={false}
pauseOnFocusLoss
draggable
pauseOnHover
theme="light"
/>
{/* Same as */}
<ToastContainer />
      <div className="w-2/4 flex justify-end mr-[70px] mt-[100px]">
        <div>
          <h1 className="font-nunito text-[35px] font-bold text-color1 ">
            Login to your account!
          </h1>
          <button onClick={handle_google} className=" mt-5 items-stretch flex px-[22px] py-[15px] rounded-xl border-color1 border-[2px] ">
            <img className="mr-[10px]" src="public/google.png" alt="" />
            Login with Google
          </button>
          <div className=" relative mt-[53px] h-[105px] ">
            <input onChange={handle_email}
              className={email ? "w-[368px] h-[80px] border-[2px] px-9 border-green-500 rounded-xl outline-none" : "w-[368px] h-[80px] border-[2px] px-9  outline-none border-color1  rounded-xl "} 
              type="email"
            />
            <p className="absolute text-[15px] tracking-widest top-[-10px] left-[30px] bg-white px-2 ">
              Email Address
            </p>
            {emailerr && 
            <p className="text-red-500">{emailerr}</p>
            }
          </div>
          <div className=" relative mt-[53px] h-[105px] ">
            <input onChange={handle_password}
              className={password ? "w-[368px] h-[80px] border-[2px] px-9 border-green-500 rounded-xl outline-none" : "w-[368px] h-[80px] border-[2px] px-9  outline-none border-color1  rounded-xl "} d
              type={passwordShow ? 'text' : 'password'   }
            />
            <p className="absolute text-[15px] tracking-widest top-[-10px] left-[30px] bg-white px-2 ">
              Password
            </p>
            {passwordShow ?
            <FaRegEye onClick={()=>{setPasswordShow(false)}} className=" absolute top-6 right-3 text-[28px] " />
            :
            <FaEyeSlash onClick={()=>{setPasswordShow(true)}} className=" absolute top-6 right-3 text-[28px] " />

            }
           
            {passworderr && 
            <p className="text-red-500">{passworderr}</p>
            }
          </div>
          <div className=" w-[368px] ">
            <button onClick={handle_submit} className=" text-[20px] font-semibold font-nunito w-[368px] h-[68px] rounded-[86px] mt-[52px] text-white bg-color2 ">
              Sign up
            </button>
          </div>
          <div className=" w-[368px] ">
            <p className=" mt-4 text-center ">
              Don’t have an account ?{" "}
              <Link to="/" className="text-[#EA6C00] ">
                Sign Up
              </Link>{" "}
            </p>
            <Link onClick={()=>{setShowModal(true)}}  className="text-[#EA6C00] mt-5 block text-center ">Forget password</Link>
            {showModal && <Modal onClose={()=>setShowModal(false)} />}
          </div>
        </div>
      </div>
      <div className="w-2/4 ">
        <img
          className="w-full h-screen object-cover"
          src="public/login.png"
          alt=""
        />
      </div>
    </div>
  );
}

export default Login;
