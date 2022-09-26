import React from "react";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { useNavigate } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";
import shareVideo from "../assets/share.mp4";
import logo from "../assets/logowhite.png";
import logo3 from "../assets/logo3.png";
import { GoogleLogin, googleLogout } from "@react-oauth/google";
const Login = () => {
  return (
    <div className="flex justify-start items-center flex-col h-screen">
      <div className="relative w-full h-full">
        <video
          src={shareVideo}
          loop
          controls={false}
          muted
          autoPlay
          className="w-full h-full object-cover"
        />
        <div className="absolute flex flex-col justify-center items-center top-0 right-0 left-0 bottom-0    bg-blackOverlay">
          <div className="p-5">
            <img src={logo3} width="130px" alt="logo" />
          </div>
          <div className="shadow-2xl">
            <button
                type="button" 
                className="bg-mainColor flex justify-center items-center p-3 rounded-lg cursor-pointer outline-none"
            >
              <GoogleLogin
                onSuccess={(response) => {}}
                onError={() => {
                  console.log("Error");
                }}
                
              />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
