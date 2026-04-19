import React from 'react';
import './page.css';
import comp from '../assets/comp.png'
import { useState } from 'react';
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";
import axios from "axios";
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

export default function Landing() {
  //States
  const [content , setContent] = useState('signup');
  const [showPassword , setShowPassword] = useState(false);
  const [showPin , setShowPin] = useState(false);
  //States for inputs
  const [userName , setUsername] = useState("");
  const [email,setEmail] = useState("");
  const [password , setPassword] = useState("");
  const [pin,setPin] = useState("");
//Navigation
  const navigate = useNavigate()


  //Signup Function
  const handleSignup = async (e)=>{
    e.preventDefault();
    try {
      const response = await axios.post('https://tracker-1ouu.onrender.com/api/user/signup',{
        userName,
        email,
        password,
        securityPin:pin
      })

      toast.success(response.data.message || "Signup successful , Please Login");

      //Clearing fields
      setPassword("")
      setEmail("")
      setUsername("")
      setPin("")
      setContent("login")

      
    } catch (error) {
      console.log(error)
      toast.error(error.response?.data?.message)
    }
  }

  //Login Controller
  const handleLogin = async (e) =>{
    e.preventDefault();
    try {
      const response = await axios.post('https://tracker-1ouu.onrender.com/api/user/login',{
        email,
        password,
      })

      toast.success(response.data.message || "Login Successful");
      toast.info("Welcome")

      //aving token
      localStorage.setItem("token", response.data.token);

      //saving user 
      localStorage.setItem("user",JSON.stringify(response.data.user))

      

      setPassword("");
      setEmail("");
      navigate("/dashboard")
      

      
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.message)
    }
  }
  
  return (
    <div id='background' className='h-screen w-full flex flex-col gap-5 items-center'>
      <div className='text-center mt-2'>
        <h1 className='font-bold text-3xl'>my<span className='font-bold text-3xl text-red-700'>Tracker</span></h1>
      </div>
      <div className='sm:flex sm:w-[50%] sm:justify-between sm:h-[640px] sm:items-center'>
        <div className='hidden lg:block w-60 sm:w-96'>
          <img src={comp} alt="computer" />
        </div>
        <div className='w-[340px] h-[400px] bg-gray-800 mt-[50%] sm:mt-0 text-gray-100 shadow-xl border border-gray-700 rounded-lg'>
          <div className='flex justify-center gap-4 mt-4 mb-2'>
            <button className={`w-24 rounded-lg  p-2 h-8  font-bold text-center flex items-center justify-center ${content === "signup" ? "bg-blue-600 ring-2 ring-blue-400" : "bg-blue-500 hover:bg-blue-600"}`} onClick={()=> setContent("signup")}>SignUp</button>
            <button className={`w-24 rounded-lg  p-2 h-8  font-bold text-center flex items-center justify-center ${content === "login" ? "bg-emerald-600 ring-2 ring-emerald-400" : "bg-emerald-500 hover:bg-emerald-600"}`} onClick={()=> setContent("login")}>LogIn</button>
            {/* <button className={`w-24 rounded-lg  p-2 h-8  font-bold text-center flex items-center justify-center ${content === "forgot" ? "bg-red-600 ring-2 ring-red-400" : "bg-red-500 hover:bg-red-600"}`} onClick={()=> setContent("forgot")}>Fogot?</button> */}
          </div>
          <div>
            <h1 className='font-bold text-xl mt-2 text-center'>Welcome User👋😊</h1>
            <marquee behavior="" direction="">Kindly fill all the details carefully.</marquee>
            {/* content for signup*/}
            {content === "signup" && (
              <form action="" onSubmit={handleSignup} className='w-full h-[272px] px-5 flex flex-col justify-between gap-6 items-center'>
                <div className='w-full flex flex-col gap-3'>
                  <input type="text"  value={userName} onChange={(e)=>setUsername(e.target.value)} placeholder='Enter User Name Here' className='w-full rounded-lg py-2 px-3 bg-gray-700 border border-gray-600 focus:ring-1 outline-none  focus:border-blue-500 focus:ring-blue-500 ' />
                  <input type="email" value={email} onChange={(e)=>setEmail(e.target.value)} placeholder='Enter Email Here' className='w-full rounded-lg py-2 px-3 bg-gray-700 border border-gray-600 focus:ring-1 outline-none  focus:border-blue-500 focus:ring-blue-500 ' />
                  <div className='w-full flex justify-center items-center'>
                    <input type={showPassword ? "text" : "password"} value={password} onChange={(e)=>setPassword(e.target.value)} className='w-[95%] rounded-lg py-2 px-3 bg-gray-700 border border-gray-600 focus:ring-1 outline-none  focus:border-blue-500 focus:ring-blue-500  ' placeholder='Enter Password Here' />
                    {showPassword ? (
                      <FaEye className='cursor-pointer w-[15%]' onClick={()=>setShowPassword(false)} />)
                      :(<FaEyeSlash className='cursor-pointer w-[15%]' onClick={()=>setShowPassword(true)} />)}
                  </div>
                  <div className='w-full flex justify-center items-center'>
                    <input type={showPin ? "text" : "password"} value={pin} onChange={(e)=>setPin(e.target.value)} className='w-[95%] rounded-lg py-2 px-3 bg-gray-700 border border-gray-600 focus:ring-1 outline-none  focus:border-blue-500 focus:ring-blue-500  ' placeholder='Enter Security Pin Here' />
                    {showPin ? (
                      <FaEye className='cursor-pointer w-[15%]' onClick={()=>setShowPin(false)} />)
                      :(<FaEyeSlash className='cursor-pointer w-[15%]' onClick={()=>setShowPin(true)} />)}
                  </div>
                </div>
                <button type='submit' className='w-1/2 rounded-lg py-2 px-3 bg-green-700 text-lg font-bold'>Submit</button>
              </form>
            )}
            {content === "login" && (
              <form action="" onSubmit={handleLogin} className='w-full h-[272px] px-5 flex flex-col justify-between gap-6 items-center'>
                <div className='w-full flex flex-col gap-3'>
                  <input type="email" placeholder='Enter Email Here' onChange={(e)=>setEmail(e.target.value)} className='w-full rounded-lg py-2 px-3 bg-gray-700 border border-gray-600 focus:ring-1 outline-none  focus:border-blue-500 focus:ring-blue-500 ' />
                  <div className='w-full flex justify-center items-center'>
                    <input type={showPassword ? "text" : "password"} onChange={(e)=>setPassword(e.target.value)} className='w-[95%] rounded-lg py-2 px-3 bg-gray-700 border border-gray-600 focus:ring-1 outline-none  focus:border-blue-500 focus:ring-blue-500  ' placeholder='Enter Password Here' />
                    {showPassword ? (
                      <FaEye className='cursor-pointer w-[15%]' onClick={()=>setShowPassword(false)} />)
                      :(<FaEyeSlash className='cursor-pointer w-[15%]' onClick={()=>setShowPassword(true)} />)}
                  </div>
                </div>
                <button type='submit' className='w-1/2 rounded-lg py-2 px-3 bg-green-700 text-lg font-bold'>Submit</button>
              </form>
            )}
            {/* {content === "forgot" && (
              <form action="" className='w-full h-[272px] px-3 flex flex-col gap-3 justify-between items-center'>
                <div className='flex flex-col gap-3'>
                  <div className='w-full flex justify-center items-center'>
                    <input type={showPassword ? "text" : "password"} className='w-[95%] rounded-lg py-2 px-3 bg-gray-700 border border-gray-600 focus:ring-1 outline-none  focus:border-blue-500 focus:ring-blue-500  ' placeholder='Enter New password Here' />
                    {showPassword ? (
                      <FaEye className='cursor-pointer w-[15%]' onClick={()=>setShowPassword(false)} />)
                      :(<FaEyeSlash className='cursor-pointer w-[15%]' onClick={()=>setShowPassword(true)} />)}
                  </div>
                  <div className='w-full flex justify-center items-center'>
                    <input type={showPin ? "text" : "password"} className='w-[95%] rounded-lg py-2 px-3 bg-gray-700 border border-gray-600 focus:ring-1 outline-none  focus:border-blue-500 focus:ring-blue-500  ' placeholder='Enter Security Pin Here' />
                    {showPin ? (
                      <FaEye className='cursor-pointer w-[15%]' onClick={()=>setShowPin(false)} />)
                      :(<FaEyeSlash className='cursor-pointer w-[15%]' onClick={()=>setShowPin(true)} />)}
                  </div>
                  <p className='text-[12px] px-2'>Note-Only option to login after password(forgot) is Security Pin ,If you forgot it you will not able to login again.</p>
                </div>
                <button type='submit' className='w-1/2 rounded-lg py-2 px-3 bg-green-700 text-lg font-bold'>Submit</button>
              </form>
            )} */}
          </div>
        </div>
      </div>
    </div>
  )
}
