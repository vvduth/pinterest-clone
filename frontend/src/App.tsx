import { useState } from 'react'
import reactLogo from './assets/react.svg'
import {Routes, Route, useNavigate} from 'react-router-dom'
import { GoogleOAuthProvider } from "@react-oauth/google";
import Login from './components/Login'
import Home from './container/Home'

const OAUTHCLIENT='813666729987-q7cop76ibphd14lgvki0ves3gcuai8pl.apps.googleusercontent.com'

function App() {
  

  return (
    <GoogleOAuthProvider
      clientId={`${OAUTHCLIENT}` as string}
    >
      <Routes>
      <Route  path='login' element={<Login/>} />
      <Route  path='/*' element={<Home/>} />
   </Routes>

    </GoogleOAuthProvider>
   
  )
}

export default App
