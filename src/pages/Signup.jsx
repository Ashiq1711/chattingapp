import { useState } from "react";
import { Link } from "react-router-dom";
import { PropagateLoader } from "react-spinners";
import { FaEyeSlash, FaEye } from "react-icons/fa";
import {
  getAuth,
  createUserWithEmailAndPassword,
  sendEmailVerification,
  updateProfile,
} from "firebase/auth";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
const Signup = () => {
  const auth = getAuth();
  let navigate = useNavigate();
  let [email, setEmail] = useState("");
  let [name, setName] = useState("");
  let [password, serPassword] = useState("");
  let [emailerr, setEmailerr] = useState("");
  let [nameerr, setNameerr] = useState("");
  let [passworderr, setPassworderr] = useState("");
  let [loader, setLoader] = useState(false);
  let [passwordShow, setPasswordShow] = useState(false);

  let handle_email = (e) => {
    setEmail(e.target.value);
    setEmailerr("");
  };
  let handle_name = (e) => {
    setName(e.target.value);
    setNameerr("");
  };
  let handle_password = (e) => {
    serPassword(e.target.value);
    setPassworderr("");
  };
  let handle_submit = () => {
    if (!email) {
      setEmailerr("Email is required !");
    } else if (!/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email)) {
      setEmailerr("This is not a mail addres");
    }
    if (!name) {
      setNameerr("Name is required !");
    }
    if (!password) {
      setPassworderr("Password is required !");
    } else if (
      !/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/.test(password)
    ) {
      setPassworderr(
        "Minimum eight length,one special character and one number !"
      );
    }
    if (
      email &&
      name &&
      password &&
      /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email) &&
      /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/.test(password)
    ) {
      const auth = getAuth();
      createUserWithEmailAndPassword(auth, email, password)
        .then((user) => {
          setLoader(true);
          toast("Sign up successfully!", {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          });
          sendEmailVerification(auth.currentUser)
            .then(() => {
              localStorage.setItem("lastname", "Smith");

              updateProfile(auth.currentUser, {
                displayName: name,
                photoURL: "public/profile.png",
              })
                .then(() => {
                  setTimeout(() => {
                    navigate("/login");
                  }, 2000);
                  // Email verification sent!
                  // ...
                })
                .then(() => {
                  setLoader(false);
                });
            })
            .catch((error) => {
              console.log(error);
            });
        })
        .catch((error) => {
          if (error.code.includes("auth/email-already-in-use")) {
            setEmailerr("Email is already used !");
          }
        });
    }
  };
  return (
    <div className="md:flex">
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
      <div className="md:w-2/4 w-full pl-[100px] pr-[100px] md:flex md:justify-end mr-10  mt-[50px] lg:p-0  ">
        <div className=" relative ">
          <h1 className="font-nunito text-[35px] font-bold text-color1 ">
            Get started with easily register...
          </h1>
          <p className="font-nunito text-[20px] mt-[14px] text-color1 ">
            Free register and you can enjoy it
          </p>
          <div className=" relative mt-[53px] h-[70px] md:h-[105px] ">
            <input
              onChange={handle_email}
              className={
                email
                  ? "w-full h-[82px] md:w-[368px] md-h-[80px] border-[2px] px-9 border-green-500 rounded-xl outline-none	 "
                  : "w-full h-[82px] md:w-[368px] md-h-[80px] border-[2px] outline-none	 px-9 border-color1 rounded-xl "
              }
              type="email"
            />
            <p className="absolute text-[15px] tracking-widest top-[-10px] left-[30px] bg-white px-2 ">
              Email Address
            </p>
            {emailerr && <p className="text-red-500">{emailerr}</p>}
          </div>
          <div className=" relative mt-[53px] h-[70px] md:h-[105px]">
            <input
              onChange={handle_name}
              className={
                name
                  ? "w-full h-[82px] md:w-[368px] md-h-[80px] border-[2px] px-9 border-green-500 rounded-xl outline-none"
                  : "w-full h-[82px] md:w-[368px] md-h-[80px] border-[2px] px-9  outline-none border-color1  rounded-xl "
              }
              type="text"
            />
            <p className="absolute text-[15px] tracking-widest top-[-10px] left-[30px] bg-white px-2 ">
              Full Name
            </p>
            {nameerr && <p className="text-red-500">{nameerr}</p>}
          </div>
          <div className=" relative mt-[53px] w-full md:w-[368px]  h-[70px] md:h-[105px]">
            <input
              onChange={handle_password}
              className={
                password
                  ? "w-full h-[82px] md:w-[368px] md-h-[80px] border-[2px] px-9 border-green-500 rounded-xl outline-none"
                  : "w-full h-[82px] md:w-[368px] md-h-[80px] border-[2px] px-9  outline-none border-color1  rounded-xl "
              }
              type={passwordShow ? "text" : "password"}
              value={password}
            />
            <p className="absolute text-[15px] tracking-widest top-[-10px] left-[30px] bg-white px-2 ">
              Password
            </p>
            {passwordShow ? (
              <FaEye
                onClick={() => {
                  setPasswordShow(false);
                }}
                className="absolute right-2 top-7 text-[28px] "
              />
            ) : (
              <FaEyeSlash
                onClick={() => {
                  setPasswordShow(true);
                }}
                className="absolute right-2 top-7 text-[28px] "
              />
            )}
            {passworderr && <p className="text-red-500"> {passworderr}</p>}
          </div>
          {loader ? (
            <div className="w-full h-[62px] md:w-[368px] md-h-[80px] text-center">
              <PropagateLoader color="#36d7b7" />
              <button
                onClick={handle_submit}
                className=" text-[20px] font-semibold font-nunito w-full h-[62px] md:w-[368px] md-h-[80px] rounded-[86px] mt-[52px] text-white bg-color2 "
              >
                Sign up
              </button>
            </div>
          ) : (
            <button
              onClick={handle_submit}
              className=" text-[20px] font-semibold font-nunito w-full h-[62px] md:w-[368px] md-h-[80px] rounded-[86px] mt-[52px] text-white bg-color2 "
            >
              Sign up
            </button>
          )}

          <div className=" w-full h-[62px] md:w-[368px] md-h-[80px] text-center">
            <p className=" mt-4 ">
              Already have an account ?{" "}
              <Link to="/login" className="text-[#EA6C00] ">
                Sign In
              </Link>{" "}
            </p>
          </div>
        </div>
      </div>
      <div className="w-2/4 hidden md:block">
        <img
          className="w-full h-screen object-cover"
          src="public/signup.png"
          alt=""
        />
      </div>
    </div>
  );
};

export default Signup;
