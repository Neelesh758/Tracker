import React, { useState } from 'react'
import { TiThMenu } from "react-icons/ti";
import { motion, AnimatePresence, easeInOut } from 'framer-motion';
import { Link } from 'react-router-dom';
import dummy from '../assets/dummy.png';
import axios from 'axios';
import { toast } from 'react-toastify';

export default function Navbar() {
  //Menu states
  const [menu , setMenu] = useState("close")

  //States 
  const [screen , setScreen] = useState("dashboard")
  const [data, setData] = useState(
  JSON.parse(localStorage.getItem("user"))
  );
  const [file,setFile] = useState(null)

  // const user = JSON.parse(localStorage.getItem("user"))
  const userName = data?.userName

  const screenChange = (value) =>{
    setScreen(value)
    setMenu("close")

  }

  //Logout Controller
  const handleLogout = () => {
  const confirmLogout = window.confirm("Do you want to LogOut??")
  if(confirmLogout){
  localStorage.removeItem("user");
  localStorage.removeItem("token");

  // sendong back user to login /Signup
  window.location.href = "/";
  toast.success("Logout Successfully")
  }
};

  //Handle Upload
  const handleUpload = async (selectedFile) => {
  try {
    const formData = new FormData();
    formData.append("image", selectedFile);

    const res = await axios.put(
      `https://tracker-1ouu.onrender.com/api/profileimg/upload/${data._id}`,
      formData
    );

    // update state
    setData((prev) => ({
      ...prev,
      image: res.data.image,
    }));

    // update localStorage
    localStorage.setItem(
      "user",
      JSON.stringify({ ...data, image: res.data.image })
    );

    toast.success("Profile Image Updated Suuccessfully")

  } catch (err) {
    console.log(err);
  }
};

  
  return (
    // Mobile Menu 
    <div className='relative z-10 '>
    <AnimatePresence>
    {menu === "open" ? (
      <motion.div
      initial={{ x: "-100%" }} // Start off-screen to the left
      animate={{ x: 0 }}       // Slide into view
      exit={{ x: "-100%" }}    // Slide back out when closed
      transition={{ type: "tween",ease: "easeInOut" , duration: 0.5 }}
      className=' absolute w-full bg-gray-900 h-screen flex flex-col justify-evenly items-center gap-6 overflow-hidden'>
      <div className='w-full flex flex-col justify-center items-center gap-4  mb-2'>
        <div className='flex justify-between w-full px-2 py-4'>
          <h1 className='font-bold text-3xl text-white'>my<span className='text-red-700'>Tracker</span></h1>
          <button className='bg-red-700 text-white font-bold rounded-full w-7 h-7' onClick={()=>setMenu("close")}>X</button>
        </div>
        <p className='font-bold text-2xl text-white'>Welcome {userName}</p>
        <div className='w-20 h-20 border border-gray-100 rounded-full bg-red-600'>
          <img 
          src={data?.image || dummy}
          alt="image"
          onError={(e)=>(e.target.src = dummy)}
          className='w-full h-full object-cover rounded-full'
          />
        </div>
        <input 
        type="file"
        id='fileInput'
        className='hidden'
        onChange={(e)=>{
          const selectedFile = e.target.files[0];
          setFile(selectedFile);
          if(selectedFile) handleUpload(selectedFile);
        }}
        />
        <div className='flex'>
          <button className='w-20 py-1 bg-green-600 text-white font-bold rounded-md' onClick={()=> document.getElementById("fileInput").click()} >Upload</button>
        </div>
      </div>
      <div className='w-full transition-all'>
        <Link to="/dashboard"><button className={`text-gray-300 w-[99%] py-4 text-xl hover:text-yellow-300 ${screen === "dashboard" ? "ring-2 ring-blue-800 bg-slate-800 border-l-4 border-blue-500 rounded-r-lg" : ""}`} onClick={()=>screenChange("dashboard")}>Dashboard</button></Link>
        <Link to="/income"><button className={`text-gray-300 w-[99%] py-4 text-xl hover:text-yellow-300 ${screen === "income" ? "ring-2 ring-blue-800 bg-slate-800 border-l-4 border-blue-500 rounded-r-lg " : ""}`} onClick={()=>screenChange("income")}>Income</button></Link>
        <Link to="/expense"><button className={`text-gray-300 w-[99%] py-4 text-xl hover:text-yellow-300 ${screen === "expense" ? "ring-2 ring-blue-800 bg-slate-800 border-l-4 border-blue-500 rounded-r-lg " : ""}`} onClick={()=>screenChange("expense")}>Expense</button></Link>
        <Link to="/About"><button className={`text-gray-300 w-[99%] py-4 text-xl hover:text-yellow-300 ${screen === "about" ? "ring-2 ring-blue-800 bg-slate-800 border-l-4 border-blue-500 rounded-r-lg " : ""}`} onClick={()=>screenChange("about")}>About</button></Link>
        <Link to="/support"><button className={`text-gray-300 w-[99%] py-4 text-xl hover:text-yellow-300 ${screen === "support" ? "ring-2 ring-blue-800 bg-slate-800 border-l-4 border-blue-500 rounded-r-lg " : ""}`} onClick={()=>screenChange("support")}>Support</button></Link>
        <button className={`text-gray-300 w-[99%] py-4 text-xl hover:text-yellow-300 ${screen === "support" ? "ring-2 ring-blue-800 bg-slate-800 border-l-4 border-blue-500 rounded-r-lg " : ""}`} onClick={()=>handleLogout()} >LogOut</button>
      </div>
      <div class=" mt-1 py-6 border-t border-gray-100 flex justify-center items-center">
        <p class="text-lg text-gray-300 tracking-wide">
          Made with <span class="text-rose-500">❤️</span> by 
          <span class="font-semibold text-slate-300">Neelesh</span>
        </p>
       </div>
    </motion.div>
    ):(
      <div className='lg:hidden w-full bg-gray-900 flex justify-between px-2 py-4 '>
      <button className='text-white text-2xl' onClick={()=>setMenu("open")}><TiThMenu /></button>
      <h1 className='font-bold text-3xl text-white'>my<span className='text-red-700'>Tracker</span></h1>
    </div>
    )}
    </AnimatePresence>
    {/* <div className=' absolute w-full bg-gray-900 h-screen flex flex-col justify-evenly items-center gap-6'>
      <div className='w-full flex flex-col justify-center items-center gap-4  mb-5'>
        <div>
          <h1 className='font-bold text-3xl text-white'>my<span className='text-red-700'>Tracker</span></h1>
          <button>X</button>
        </div>
        <p className='font-bold text-2xl text-white'>Welcome User</p>
        <div className='w-28 h-28 border border-gray-100 rounded-full'>
          <img src="" alt="" />
        </div>
      </div>
      <div className='w-full transition-all'>
        <button className={`text-gray-300 w-[99%] py-4 text-xl hover:text-yellow-300 ${screen === "dashboard" ? "ring-2 ring-blue-800 bg-slate-800 border-l-4 border-blue-500 rounded-r-lg" : ""}`} onClick={()=>setScreen("dashboard")}>Dashboard</button>
        <button className={`text-gray-300 w-[99%] py-4 text-xl hover:text-yellow-300 ${screen === "income" ? "ring-2 ring-blue-800 bg-slate-800 border-l-4 border-blue-500 rounded-r-lg " : ""}`} onClick={()=>setScreen("income")}>Income</button>
        <button className={`text-gray-300 w-[99%] py-4 text-xl hover:text-yellow-300 ${screen === "expense" ? "ring-2 ring-blue-800 bg-slate-800 border-l-4 border-blue-500 rounded-r-lg " : ""}`} onClick={()=>setScreen("expense")}>Expense</button>
        <button className={`text-gray-300 w-[99%] py-4 text-xl hover:text-yellow-300 ${screen === "about" ? "ring-2 ring-blue-800 bg-slate-800 border-l-4 border-blue-500 rounded-r-lg " : ""}`} onClick={()=>setScreen("about")}>About</button>
        <button className={`text-gray-300 w-[99%] py-4 text-xl hover:text-yellow-300 ${screen === "support" ? "ring-2 ring-blue-800 bg-slate-800 border-l-4 border-blue-500 rounded-r-lg " : ""}`} onClick={()=>setScreen("support")}>Support</button>
      </div>
      <div class="mt-auto py-6 border-t border-gray-100 flex justify-center items-center">
        <p class="text-lg text-gray-300 tracking-wide">
          Made with <span class="text-rose-500">❤️</span> by 
          <span class="font-semibold text-slate-300">Neelesh</span>
        </p>
       </div>
    </div> */}
    

    {/* // Laptop Menu */}
    <div className='hidden w-96 bg-gray-900 h-screen lg:flex flex-col justify-evenly items-center gap-6 '>
      <div className='w-full flex flex-col justify-center items-center gap-4  mb-2'>
        <h1 className='font-bold text-3xl text-white'>my<span className='text-red-700'>Tracker</span></h1>
        <p className='font-bold text-2xl text-white'>Welcome {userName}</p>
        <div className='w-24 h-24 border border-gray-100 rounded-full'>
          <img 
          src={data?.image || dummy}
          alt="image"
          onError={(e)=>(e.target.src = dummy)}
          className='w-full h-full object-cover rounded-full'
          />
        </div>
        <input 
        type="file"
        id='fileInput'
        className='hidden'
        onChange={(e)=>{
          const selectedFile = e.target.files[0];
          setFile(selectedFile);
          if(selectedFile) handleUpload(selectedFile);
        }}
        />
        <button className='w-20 py-1 bg-green-600 text-white font-bold rounded-md' onClick={()=> document.getElementById("fileInput").click()} >Upload</button>
      </div>
      <div className='w-full transition-all'>
        <Link to="/dashboard"><button className={`text-gray-300 w-[99%] py-4 text-xl hover:text-yellow-300 ${screen === "dashboard" ? "ring-2 ring-blue-800 bg-slate-800 border-l-4 border-blue-500 rounded-r-lg" : ""}`} onClick={()=>setScreen("dashboard")}>Dashboard</button></Link>
        <Link to="/income"><button className={`text-gray-300 w-[99%] py-4 text-xl hover:text-yellow-300 ${screen === "income" ? "ring-2 ring-blue-800 bg-slate-800 border-l-4 border-blue-500 rounded-r-lg " : ""}`} onClick={()=>setScreen("income")}>Income</button></Link>
        <Link to="/expense"><button className={`text-gray-300 w-[99%] py-4 text-xl hover:text-yellow-300 ${screen === "expense" ? "ring-2 ring-blue-800 bg-slate-800 border-l-4 border-blue-500 rounded-r-lg " : ""}`} onClick={()=>setScreen("expense")}>Expense</button></Link>
        <Link to="/about"><button className={`text-gray-300 w-[99%] py-4 text-xl hover:text-yellow-300 ${screen === "about" ? "ring-2 ring-blue-800 bg-slate-800 border-l-4 border-blue-500 rounded-r-lg " : ""}`} onClick={()=>setScreen("about")}>About</button></Link>
        <Link to="/support"><button className={`text-gray-300 w-[99%] py-4 text-xl hover:text-yellow-300 ${screen === "support" ? "ring-2 ring-blue-800 bg-slate-800 border-l-4 border-blue-500 rounded-r-lg " : ""}`} onClick={()=>setScreen("support")}>Support</button></Link>
        <button className={`text-gray-300 w-[99%] py-4 text-xl hover:text-yellow-300 ${screen === "support" ? "ring-2 ring-blue-800 bg-slate-800 border-l-4 border-blue-500 rounded-r-lg " : ""}`} onClick={()=>handleLogout()} >LogOut</button>
      </div>
      <div class="mt-auto py-6 border-t border-gray-100 flex justify-center items-center">
        <p class="text-lg text-gray-300 tracking-wide">
          Made with <span>❤️</span> by 
          <span class="font-semibold text-slate-300">Neelesh</span>
        </p>
       </div>
    </div>
  </div>
  )
}
