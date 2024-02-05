import React, { useState, createRef } from "react";
import { IoHomeOutline } from "react-icons/io5";
import { AiFillMessage } from "react-icons/ai";
import { BsBell } from "react-icons/bs";
import { IoSettingsOutline } from "react-icons/io5";
import { FaCloudUploadAlt } from "react-icons/fa";
import { TbBrandPagekit } from "react-icons/tb";
import { useSelector } from "react-redux";
import { IoCloseSharp } from "react-icons/io5";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadString,
} from "firebase/storage";
import { getAuth, updateProfile } from "firebase/auth";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// react-cropper
import Cropper from "react-cropper";
import "cropperjs/dist/cropper.css";
// react-cropper

function Sidebar() {
  const auth = getAuth();
  const storage = getStorage();
  const [imageupoad, setImageupload] = useState(false);
  const [magic, setMagic] = useState(false);

  let data = useSelector((state) => state.userlogininfo.userinfo);
  let handle_image_upload = () => {
    setImageupload(true);
  };
  // react-cropper
  const [image, setImage] = useState();
  const [cropData, setCropData] = useState();
  const cropperRef = createRef();

  const onChangePic = (e) => {
    setMagic(true);
    e.preventDefault();
    let files;
    if (e.dataTransfer) {
      files = e.dataTransfer.files;
    } else if (e.target) {
      files = e.target.files;
    }
    const reader = new FileReader();
    reader.onload = () => {
      setImage(reader.result);
    };
    reader.readAsDataURL(files[0]);
  };

  const getCropData = () => {
    if (typeof cropperRef.current?.cropper !== "undefined") {
      setCropData(cropperRef.current?.cropper.getCroppedCanvas().toDataURL());
      const storageRef = ref(storage, "some-child");

      const message4 = cropperRef.current?.cropper
        .getCroppedCanvas()
        .toDataURL();
      uploadString(storageRef, message4, "data_url").then((snapshot) => {
        getDownloadURL(storageRef).then((downloadURL) => {
          console.log("File available at", downloadURL);
          updateProfile(auth.currentUser, {
            photoURL: downloadURL,
          }).then(() => {
            setImageupload(false);
            setMagic(false);
            setCropData("");
            setImage("");
          });
        });
      });
    }
  };

  let handle_close = () => {
    setImageupload(false);
    setMagic(false);
    setCropData("");
    setImage("");
  };
  // react-cropper

  return (
    <div className="w-full h-screen">
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
      <div className="pt-5 relative">
        <div className=" mx-auto h-[100px] w-[100px] rounded-full relative group">
          <img
            className="  mx-auto h-[100px] w-[100px] rounded-full"
            src={data.photoURL}
            alt="profile"
          />

          <div
            onClick={handle_image_upload}
            className="mx-auto w-0 h-[100px] bg-[rgba(0,0,0,.7)]  absolute top-0 left-0 rounded-full  group-hover:w-[100px] flex justify-center items-center"
          >
            <FaCloudUploadAlt className="text-[36px] text-white " />
          </div>
        </div>
      </div>
      <h1 className="text-white text-xl text-center mt-3">
        {data.displayName}
      </h1>
      <div className="relative flex items-center justify-center ml-auto mt-[70px] w-[162px] h-[90px] bg-white rounded-tl-xl   rounded-bl-xl">
        <IoHomeOutline className="text-[36px] mr-[40px] text-color2" />
        <div className="absolute w-[8px] h-[90px] bg-color2 rounded-tl-xl rounded-bl-xl right-0  "></div>
      </div>
      <div className="relative flex items-center justify-center ml-auto mt-[70px] w-[162px] h-[90px] rounded-tl-xl   rounded-bl-xl">
        <AiFillMessage className="text-[40px] mr-[40px] text-white " />
        <div className="absolute w-[8px] h-[90px] bg-color2 rounded-tl-xl rounded-bl-xl right-0  "></div>
      </div>
      <div className="relative flex items-center justify-center ml-auto mt-[70px] w-[162px] h-[90px] rounded-tl-xl   rounded-bl-xl">
        <BsBell className="text-[40px] mr-[40px] text-white" />
        <div className="absolute w-[8px] h-[90px] bg-color2 rounded-tl-xl rounded-bl-xl right-0  "></div>
      </div>
      <div className="relative flex items-center justify-center ml-auto mt-[70px] w-[162px] h-[90px] rounded-tl-xl   rounded-bl-xl">
        <IoSettingsOutline className="text-[40px] mr-[40px] text-white" />
        <div className="absolute w-[8px] h-[90px] bg-color2 rounded-tl-xl rounded-bl-xl right-0  "></div>
      </div>
      <div className="relative flex items-center justify-center ml-auto mt-[20px] w-[162px] h-[90px] rounded-tl-xl   rounded-bl-xl">
        <TbBrandPagekit className="text-[40px] mr-[40px] text-white" />
        <div className="absolute w-[8px] h-[90px] bg-color2 rounded-tl-xl rounded-bl-xl right-0  "></div>
      </div>

      {imageupoad && (
        <div className="  flex justify-center items-center bg-[rgba(0,0,0,.8)] w-full h-screen absolute top-0 left-0 z-50">
          <div className=" p-5  w-[400px] bg-white rounded-xl relative">
            <IoCloseSharp
              onClick={handle_close}
              className=" absolute top-0 right-0 text-2xl text-red-600 "
            />

            <input onChange={onChangePic} type="file" />
            {magic && (
              <Cropper
                ref={cropperRef}
                style={{ height: 400, width: "100%" }}
                zoomTo={0.5}
                initialAspectRatio={1}
                preview=".img-preview"
                src={image}
                viewMode={1}
                minCropBoxHeight={10}
                minCropBoxWidth={10}
                background={false}
                responsive={true}
                autoCropArea={1}
                checkOrientation={false}
                guides={true}
              />
            )}
            <button
              onClick={getCropData}
              className=" w-full mt-3 px-6 py-3 bg-blue-700 text-white font-poppins rounded-xl"
            >
              Upload
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Sidebar;
