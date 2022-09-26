import React, { useState } from "react";
import { AiOutlineCloudUpload } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import { MdDelete } from "react-icons/md";

import { categories } from "../utils/data";
import { client } from "../client";
import Spinner from "./Spinner";
import { IUserProfile } from "../container/Home";
import useAuthStore from "../store/authStore";

interface IProps {
  user: IUserProfile | any;
}

// user is global state no need to pass props
const CreatePin = () => {
  const [title, setTitle] = useState("");
  const [about, setAbout] = useState("");
  const [loading, setLoading] = useState(false);
  const [destination, setDestination] = useState();
  const [fields, setFields] = useState<any>();
  const [category, setCategory] = useState();
  const [imageAsset, setImageAsset] = useState<any>();
  const [wrongImageType, setWrongImageType] = useState(false);

  const { userProfile } = useAuthStore() as any;
  const navigate = useNavigate();

  const uploadImage = (e: any) => {
    const selectedFile = e.target.files[0];
    if (
      selectedFile.type === "image/png" ||
      selectedFile.type === "image/svg" ||
      selectedFile.type === "image/jpeg" ||
      selectedFile.type === "image/gif" ||
      selectedFile.type === "image/tiff"
    ) {
      setWrongImageType(false);
      setLoading(true);

      client.assets
        .upload("image", selectedFile, {
          contentType: selectedFile.type,
          filename: selectedFile.name,
        })
        .then((document: any) => {
          setImageAsset(document);
          setLoading(false);
        })
        .catch((e) => {
          console.log(e);
        });
    } else {
      setWrongImageType(true);
    }
  };

  const savePin = () => {
    if (title && destination && about && imageAsset?._id) {
      const doc = {
        _type: 'pin', 
        title,
        about, 
        destination, 
        image: {
          _type: 'image',
          asset: {
            _type: 'reference',
            _ref: imageAsset?._id
          }
        },
        userId: userProfile._id, 
        postedBy: {
          _type: 'postedBy', 
          _ref: userProfile._id 
        },
        category, 
      }
      client.create(doc)
        .then(() => {
          navigate('/')
        })
    } else {
      setFields(true)
      setTimeout(() => setFields(false), 2000)
    }
  }
  return (
    <div className="flex flex-col justify-center items-center mt-5 lg:h-4/5">
      {fields && (
        <p className="text-red-500 mb-5 text-xl transition-all duration-150 ease-in">
          Please fill in all the fields
        </p>
      )}
      <div className="flex lg:flex-row flex-col justify-center items-center bg-white lg:p-5 p-3 lg:w-4/5 w-full">
        <div className="bg-secondaryColor p-3 flex flex-0.7 w-full">
          <div className="flex justify-center items-center flex-col border-2 border-dotted border-gray-300 w-full h-420">
            {loading && <Spinner message="Loading bro..." />}
            {wrongImageType && <p>Wrong Image type bro</p>}
            {!imageAsset ? (
              <label>
                <div className="flex flex-col items-center justify-center h-full">
                  <div className="flex flex-col justify-center items-center">
                    <p className="font-bold text-2xl ">
                      <AiOutlineCloudUpload />
                    </p>
                    <p className="text-lg">Click to upload right neow</p>
                  </div>
                  <p className="mt-32 text-gray-400">
                    Use high quality JPG, SVG, PNG, GIF
                  </p>
                </div>
                <input
                  type="file"
                  name="upload-image"
                  onChange={uploadImage}
                  className="w-0 h-0"
                />
              </label>
            ) : (
              <div className="relative h-full">
                <img
                  src={imageAsset?.url}
                  alt="uploaded pic"
                  className="h-full w-full"
                />
                <button
                  type="button"
                  onClick={() => setImageAsset(null)}
                  className="absolute bottom-3 right-3 p-3 rounded-full bg-white text-xl cursor-pointer outline-none hover:shadow-md transition-all duration-500 ease-in-out"
                >
                  <MdDelete />
                </button>
              </div>
            )}
          </div>
        </div>
        <div className="flex flex-1 flex-col gap-6 lg:pl-5 mt-5 w-full">
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Add your title here bro"
            className="outline-none text-2xl sm:text-3xl font-bold border-b-2 border-gray-200 p-2"
          />
          {userProfile && (
            <div className="flex gap-2 my-2 items-center bg-white rounded-lg">
              <img src={userProfile.image} className="w-10 h-10 rounded-full" />
              <p className="font-bold">Post as {userProfile.userName}</p>
            </div>
          )}

          <input
            type="text"
            value={about}
            onChange={(e) => setAbout(e.target.value)}
            placeholder="What is your pin about bro?"
            className="outline-none text-base sm:text-lg  border-b-2 border-gray-200 p-2"
          />

          <input
            type="text"
            value={destination}
            onChange={(e:any) => setDestination(e.target.value)}
            placeholder="What is the destination/source bro?"
            className="outline-none text-base sm:text-lg  border-b-2 border-gray-200 p-2"
          />
          <div className="flex flex-col">
            <div>
              <p className="mb-2 font-semibold text-lg sm:text-xl">Choose Pin Category Brah</p>
              <select
                onChange={(e: any) => setCategory(e.target.value)}
                className="outline-none w-4/5 text-base border-b-2 border-gray-200 p-2 rounded-md cursor-pointer"
              >
                <option value="other" className="bg-white">
                  Select category bro
                </option>
                {categories.map((category: any) => (
                  <option className="text-base border-0 outline-none bg-white text-black" value={category.name}>
                    {category.name}
                  </option>
                ))}
              </select>
            </div>
            <div className="flex justify-end items-end mt-5">
                  <button
                    type="button"
                    onClick={savePin}
                    className="bg-red-500 text-white font-bold p-2 rounded-full w-28 outline-none"
                    >
                      Save pin
                  </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreatePin;
