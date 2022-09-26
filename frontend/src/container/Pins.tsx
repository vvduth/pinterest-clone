import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import { IUserProfile } from './Home';
import { Navbar, Feed, PinDetail, CreatePin, Search } from '../components';
interface IProps {
  user: IUserProfile | any,
}
const Pins = () => {

  const [searchTerm, setSearchTerm] = useState('') 
  return (
    <div className='px-2 md:px-5'>
      <div className='bg-gray-50'>
        <Navbar searchTerm={searchTerm} setSearchTerm={setSearchTerm}/> 
      </div>
      <div className='h-full'>
        <Routes>
        <Route path="/" element={<Feed />} />
          <Route path="/category/:categoryId" element={<Feed />} />
          <Route path="/pin-detail/:pinId" element={<PinDetail />} />
          <Route path="/create-pin" element={<CreatePin  />} />
          <Route path="/search" element={<Search searchTerm={searchTerm} setSearchTerm={setSearchTerm} />} />
        </Routes>
      </div>

    </div>
  )
}

export default Pins
