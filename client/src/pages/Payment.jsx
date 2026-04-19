import React from 'react'
import heroimg from "../assets/pngwing.com (8).png"
import { TbPremiumRights } from "react-icons/tb";
import { TiTick } from "react-icons/ti";
import { FaRupeeSign } from "react-icons/fa";

import axios from 'axios';


export default function Payment() {
  const user = JSON.parse(localStorage.getItem("user"))
  const userName = user?.userName

  //Payment Handler
  const handlePay = async () => {
    try {
      const res = await axios.post("http://localhost:1307/api/payment/checkout");

      window.location.href = res.data.url;
    } catch (error) {
      console.log(error)
    }
  }
  return (
    <div className='flex flex-col justify-between h-screen pb-4'>
      <div className='w-full bg-purple-900 h-[60px] flex justify-between px-2 items-center'>
        <div className='w-[50px] h-[50px]'>
          <img src={heroimg} alt="" />
        </div>
        <h1 className='text-white text-xl'>Welcome {userName}</h1>
        <button className=' px-3 h-10 bg-red-600 text-white rounded-lg'>Logout</button>
      </div>
      <div className='flex justify-evenly items-center flex-wrap-reverse'>
        <div>
          <h1 className='text-4xl leading-snug md:text-6xl font-bold md:leading-normal'>Unlock your financial <br /> position with<span className='text-purple-900'> Expense Tracker<br /> Premium</span></h1>
          <p className='text-black text-lg font-serif'>Gain complete control over finances,track smarter and achieve your goals faster with our advance features.</p>
        </div>
        <div>
          <img className='w-96' src={heroimg} alt="" />
        </div>
      </div>
      <div className='w-full mt-6 justify-center flex flex-col items-center'>
        <h1 className='flex text-2xl md:text-4xl font-bold'>Premium Benefits <span className='text-yellow-400 border-2 flex justify-center items-center rounded-full '><TbPremiumRights /></span></h1>
        <div>
          <p className='text-xl flex items-center'><span className='text-xl text-green-600'><TiTick /></span>Add-Free Experience</p>
          <p className='text-xl flex items-center'><span className='text-xl text-green-600'><TiTick /></span>Unlimited Income & Expense Tracking</p>
          <p className='text-xl flex items-center'><span className='text-xl text-green-600'><TiTick /></span>Very Low Price</p>
        </div>
      </div>
      <div className='w-full flex flex-col justify-center items-center mt-6'>
        <h1 className='text-4xl flex justify-center items-center font-bold'><span><FaRupeeSign /></span>1/-</h1>
        <button className='mt-4 bg-purple-900 font-bold text-white py-2 px-3 rounded-lg hover:text-yellow-400' onClick={handlePay}>Buy Premium</button>
        <p className='font-serif'>Limited Time offer Hurry up!!!</p>
      </div>
    </div>
  )
}
