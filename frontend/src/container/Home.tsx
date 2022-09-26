import React, { useState, useRef, useEffect } from "react";
import { HiMenu } from "react-icons/hi";
import { AiFillCloseCircle } from "react-icons/ai";
import { Link, Route, Routes } from "react-router-dom";
import SideBar from "../components/SideBar";
import UserProfile from "../components/UserProfile";
import useAuthStore from "../store/authStore";
import logo3 from "../assets/logo3.png";
import Pins from "./Pins";

export interface IUserProfile {
  image: string ,
  userName : string ,
  _id :  string , 

  _type : string , 
} 

const Home = () => {
  const { userProfile }: (IUserProfile | any) = useAuthStore();
  console.log(userProfile);
  const scrollRef = useRef() as any;

  useEffect(() => {
    scrollRef.current.scrollTo(0, 0);
  }, []);

  const [toggleSidebar, setToggleSidebar] = useState(false);
  return (
    <div className="flex bg-gray-50 md:flex-row flex-col h-screen transition-height duration-75 ease-out">
      <div className="hidden md:flex h-screen flex-initial">
        <SideBar />
      </div>
      <div className="flex md:hidden flex-row">
        <div className="p-2 w-full flex flex-row justify-between">
          <HiMenu
            fontSize={40}
            className="cursor-pointer"
            onClick={() => setToggleSidebar(true)}
          />
          <Link to={`/`}>
            <img src={logo3} alt="logo" className="w-20" />
          </Link>
          <Link to={`user-profile/${userProfile?._id}`}>
            <img src={userProfile.image} alt="logo" className="w-20" />
          </Link>
        </div>
      </div>
      {toggleSidebar && (
        <div className="fixed w-4/5 bg-white h-screen overflow-y-auto shadow-md z-10 animate-slide-in">
          <div className="absolute w-full flex justify-end items-center p-2">
            <AiFillCloseCircle
              fontSize={30}
              className="cursor-pointer"
              onClick={() => {
                setToggleSidebar(false);
              }}
            />
          </div>
          <SideBar user={userProfile} closeToggle ={setToggleSidebar} />
        </div>
      )}
      <div className="pb-2 flex-1 h-screen overflow-y-scroll " ref={scrollRef}>
        <Routes>
          <Route path="/user-profile/:userId" element={<UserProfile />} />

          <Route path="/*" element={<Pins />} />
        </Routes>
      </div>
    </div>
  );
};

export default Home;
