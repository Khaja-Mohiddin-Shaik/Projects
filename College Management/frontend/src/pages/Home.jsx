import React from 'react'
import { Link } from 'react-router-dom'
import Login from './Login'
function Home() {
  return (
    <div className="bg-cover bg-[url('/Login_wallpaper.png')] min-w-full  h-screen flex justify-end items-end">
      <button className='p-3 m-6 text-2xl text-white bg-blue-600 rounded-md'><Link to={"/login"}>Login</Link> </button>
    </div>
    
  )
}

export default Home