import React, { FC } from 'react'
import Masonry from 'react-masonry-css'
import Pin from './Pin'

interface Iprops {
  pins: any[] |null
  
}

const breakPointObj = {
  default: 4, 
  3000: 6, 
  2000: 5, 
  1200: 3, 
  1000: 2 , 
  500: 1,
}
const MasonryLayour:FC<Iprops> = ({pins}) => {
  return (
    <Masonry 
      className='flex animate-slide-fwd' breakpointCols={breakPointObj}
    >

      {pins?.map((pin)=> (
        <Pin 
          key={pin._id}
          pin={pin}
          
        />
      ))}
    </Masonry>
  )
}

export default MasonryLayour
