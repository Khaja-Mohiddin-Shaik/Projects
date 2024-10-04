import { useRef, useEffect, useState } from 'react';
import React from "react";
import {useNavigate} from "react-router-dom";
import { useLoginMutation } from '../services/commonApi';

function Login() {
  const [credentials, setCredentials] = useState({
    userId : "",
    password : ""
  })
  const [login,{ isLoading,isError}] = useLoginMutation();
  const [status, setStatus] = useState("");
  const [loading, setLoading] = useState(false);
  const formRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (formRef.current) {
      formRef.current.querySelector('input').focus();
    }
  }, [formRef]);

  async function handleLogin(e) {
    try{
      e.preventDefault();
      setLoading(true); 
      const response = await login(credentials).unwrap();
      setLoading(false); 
      setStatus(response.status)
      
      if(response.status == "Logged in"){
        const userId = response.userId;
        const branch = response.branch;
        if(response.role === "student"){
          navigate(`/student/home/${branch}/${userId}`)
        }else{
          navigate("/admin/home/"+userId)
        }
      }
    }catch(err){
      setLoading(false); 
      console.log(err)
    }
  }

  return (
    <div className="h-screen min-w-full bg-gray-200">
      <div className="flex items-center justify-center w-full h-full">
        <form
          action=""
          ref={formRef}
          className="flex flex-col p-5 w-[24%] h-[42%] bg-white  rounded-lg shadow-lg "
        >
          <label htmlFor="userId" className="mb-2 font-semibold">
            User ID:
          </label>
          <input
            type="text"
            id="userId"
            name="userId"
            className="px-3 py-2 mb-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            onChange={(e)=>setCredentials((prev)=>({...prev, userId : e.target.value}))}
            value={credentials.userId}
            required={true}
          />

          <label htmlFor="password" className="mb-2 font-semibold">
            Password:
          </label>
          <input
            type="password"
            id="password"
            name="password"
            className="px-3 py-2 mb-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            onChange={(e)=>setCredentials((prev)=>({...prev, password : e.target.value}))}
            value={credentials.password}
            required={true}
          />

          <button
            type="submit"
            className="px-4 py-2 font-semibold text-white bg-blue-500 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
            onClick={handleLogin}
          >
            {loading ? <i className="fa-solid fa-spinner fa-spin" style={{color: "#ffffff"}}></i> : 'Login'}
          </button>
          {status != "Logged in" && <p className='mt-2 text-xl font-semibold text-center text-red-600'>{status}</p>}
        </form>
      </div>
  
    </div>
  );
}

export default Login;