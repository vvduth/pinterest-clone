import React from 'react'
import useAuthStore from '../store/authStore'


const Home = () => {
  const {userProfile} = useAuthStore() 
  console.log(userProfile)
  return (
    <div>
      Home
    </div>
  )
}

export default Home
