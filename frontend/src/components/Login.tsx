import React from "react";

import { useNavigate } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";
import shareVideo from "../assets/share.mp4";
import logo from "../assets/logowhite.png";
import logo3 from "../assets/logo3.png";
import { GoogleLogin, googleLogout } from "@react-oauth/google";
import jwt_decode from "jwt-decode";
import { client } from "../client";
import useAuthStore from "../store/authStore";

const Login = () => {
  const { userProfile, addUser, removeUser } = useAuthStore();
  const navigate = useNavigate();

  const createOrGetUser = (response: any, addUser: any) => {
    console.log(response);

    const decoded: { name: string; picture: string; sub: string } = jwt_decode(
      response.credential
    );

    const { name, picture, sub } = decoded;

    console.log("name ", name);

    const user = {
      _id: sub,
      _type: "user",
      userName: name,
      image: picture,
    };

    addUser(user);
    client
      .createIfNotExists(user)
      .then(() => {
        navigate("/", { replace: true });
      })
      .catch((e) => {
        console.log(e);
      });
  };
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
                onSuccess={(response) => {
                  createOrGetUser(response, addUser);
                }}
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
