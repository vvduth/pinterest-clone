import React from "react";

import { NavLink, Link } from "react-router-dom";
import { RiHomeFill } from "react-icons/ri";
import { IoIosArrowForward } from "react-icons/io";
import logo3 from "../assets/logo3.png";
import useAuthStore from "../store/authStore";
import { categories } from '../utils/data';



const isNotActiveStyle =
  "flex items-center px-5 gap-3 text-gray-500 hover:text-black transition-all duration-200 ease-in-out capitalize";
const isActiveStyle =
  "flex items-center px-5 gap-3 font-extrabold border-r-2 border-black  transition-all duration-200 ease-in-out capitalize";
interface IProps {
  user?: any;
  closeToggle?: any;
}
const SideBar = ({ user, closeToggle }: IProps) => {
  const {userProfile} = useAuthStore() as any ; 
  const handleCloseSideBar = () => {
    if (closeToggle) {
      closeToggle(false);
    }
  };
  return (
    <div className="flex flex-col justify-between bg-white h-full overflow-y-scroll min-w-210 hide-scrollbar">
      <div className="flex flex-col">
        <Link
          to="/"
          className="flex px-5 gap-2 my-6  pt-1 w-190 items-center"
          onClick={handleCloseSideBar}
        >
          <img src={logo3} alt="logo" className="w-full" />
        </Link>
        <div className="flex flex-col gap-5">
          <NavLink
            to="/"
            className={({ isActive }) =>
              isActive ? isActiveStyle : isNotActiveStyle
            }
            onClick={handleCloseSideBar}
          >
            <RiHomeFill />
            Home
          </NavLink>
          <h3 className="mt-2 px-5 text-base 2xl:text-xl">
            Discover Categories
          </h3>
          {categories
            .slice(0, categories.length - 1)
            .map((category: any, index: number) => (
              <NavLink
                key={index}
                to={`/category/${category.name}`}
                className={({ isActive }) =>
                  isActive ? isActiveStyle : isNotActiveStyle
                }
                onClick={handleCloseSideBar}
              >
                <img src={category.image} alt="pic-category"  className="w-8 h-8 rounded-full shadow-sm"/> 
                {category.name}
              </NavLink>
            ))}
        </div>
      </div>
      {userProfile ? (
        <Link 
          to={`user-profile/${userProfile._id}`}
          className="flex my-5 mb-3 gap-2 p-2 items-center bg-white rounded-lg shadow-lg mx-3"
          onClick={handleCloseSideBar}
        >
          <img src={userProfile.image} className="w-10 h-10 rounded-full" alt="user Profile"/>
          <p>{userProfile.userName}</p>
        </Link>
      ) : (
        <Link 
          to={`/login`}
          className="flex my-5 mb-3 gap-2 p-2 items-center bg-white rounded-lg shadow-lg mx-3"
          onClick={handleCloseSideBar}
        >
          
          <p className="font-bold bg-red-700 text-white rounded-lg p-2">Login rightnow brah!</p>
        </Link>
      )}
    </div>
  );
};

export default SideBar;
