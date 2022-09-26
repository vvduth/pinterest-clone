import React, { Dispatch, SetStateAction } from "react";
import { Link, useNavigate } from "react-router-dom";
import { IoMdAdd, IoMdSearch } from "react-icons/io";
import useAuthStore from "../store/authStore";
import { IUserProfile } from "../container/Home";

interface IProps {
  searchTerm: string;
  setSearchTerm: Dispatch<SetStateAction<string>>;
}

const Navbar = ({ searchTerm, setSearchTerm }: IProps) => {
  const navigate = useNavigate();

  const { userProfile } = useAuthStore() as IUserProfile | any;

  if (!userProfile) return null;

  return (
    <div className="flex gap-2 md:gap-5 w-full mt-5 pb-7">
      <div className="flex justify-start items-center w-full px-2 rounded-md bg-white border-none outline-none focus-within:shadow-sm">
        <IoMdSearch fontSize={21} className="ml-1" />
        <input
          type="text"
          onChange={(e) => setSearchTerm(e.target.value)}
          value={searchTerm}
          placeholder="Search"
          onFocus={() => navigate("/search")}
          className="p-2 w-full bg-white outline-none"
        />
      </div>
      <div className="flex gap-3">
        <Link
          to={`user-profile/${userProfile._id}`}
          className="hidden md:block"
        >
          <img
            src={userProfile.image}
            alt="user kmage"
            className="w-14 h-12 rounded-lg"
          />
        </Link>
        <Link
          to={`create-pin`}
          className="bg-black text-white rounded-lg w-12 h-12 md:w-14 md:h-12 flex justify-center items-center"
        >
          <IoMdAdd />
        </Link>
      </div>
    </div>
  );
};

export default Navbar;
