import React, { useEffect, useState } from 'react'
import Navbar from '../components/Navbar'
import AddExp from '../components/AddExp'
import { motion } from 'framer-motion';
import AddIncome from '../components/AddIncome';
import axios from "axios"
import { FaRupeeSign } from "react-icons/fa";

export default function Dashboard() {
  const [clicked , setClicked] = useState("");
  const [result , setResult] = useState([]);

  const user = JSON.parse(localStorage.getItem('user'));
  const id = user?._id
  console.log(id)
  useEffect(()=>{
    if(!id){
      return;
    }
    const data = async () => {
      try {
        const response = await axios.get(`http://localhost:1307/api/transactions/get/${id}`)
        console.log(response)
        setResult(response.data.transactions)
      } catch (error) {
        console.log(error.response?.data || error.message)
      }
    };
    data()
  },[id]);

  //Caculative functions 
  const totalExp = result.filter((item)=>item.type=== "Expense").reduce((sum,item)=>sum=sum+Number(item.amount),0);
  console.log(totalExp)

  const totalIncome = result.filter((item)=>item.type==="Income").reduce((sum,item)=>sum=sum+Number(item.amount),0);

  const balance = totalIncome-totalExp;


  
  

  return (
    <div className='flex justify-between w-full flex-col relative h-[calc(100vh-64px)] md:h-screen  '>
      {clicked==="exp" && (
        <div
        className='absolute inset-0 flex items-center justify-center h-screen bg-black/60'>
          <motion.div
          initial={{y:100,opacity:0}}
          animate={{y:0,opacity:1}}
          transition={{duration:0.4}}
          className='relative w-auto'>
            <p className='w-9 h-9 rounded-full flex justify-center items-center bg-red-700 text-white font-bold absolute left-[290px] bottom-[395px] cursor-pointer' onClick={()=>setClicked("")}>X</p>
            <AddExp />
          </motion.div>
        </div>
      )}
      {clicked==="income" && (
        <div
        className='absolute inset-0 flex items-center justify-center h-screen bg-black/60'>
          <motion.div
          initial={{y:100,opacity:0}}
          animate={{y:0,opacity:1}}
          transition={{duration:0.4}}
          className='relative w-auto'>
            <p className='w-9 h-9 rounded-full flex justify-center items-center bg-red-700 text-white font-bold absolute left-[290px] bottom-[395px] cursor-pointer' onClick={()=>setClicked("")}>X</p>
            <AddIncome />
          </motion.div>
        </div>
      )}
      <div className='text-center p-2'>
        <h1 className='font-bold text-3xl text-black'><span className='text-red-600'>My</span>Dashboard</h1>
      </div>
      <div className='flex justify-center gap-3 md:gap-7 w-full flex-wrap  '>
        <div className='w-64 sm:h-24 md:w-80 md:h-36  shadow-xl bg-red-400 border border-l-8 border-t-2 border-b-2 rounded-lg  border-red-500'>
          <h1 className='font-bold text-xl text-white px-4 mb-3'>Expense(Rs)</h1>
          <h2 className='font-bold text-4xl px-4 flex'><FaRupeeSign />{totalExp}</h2>
        </div>
        <div className='w-64 sm:h-24 md:w-80 md:h-36  shadow-xl bg-green-400 border border-l-8 border-t-2 border-b-2 rounded-lg  border-green-500'>
          <h1 className='font-bold text-xl text-white px-4 mb-3'>Income(Rs)</h1>
          <h2 className='font-bold text-4xl px-4 flex'><FaRupeeSign />{totalIncome}</h2>
        </div>
        <div className='w-64 sm:h-24 md:w-80 md:h-36  shadow-xl bg-blue-400 border border-l-8 border-t-2 border-b-2 rounded-lg  border-blue-500'>
          <h1 className='font-bold text-xl text-white px-4 mb-3'>Balance(Rs)</h1>
          <h2 className='font-bold text-4xl px-4 flex'><FaRupeeSign />{balance}</h2>
        </div>
      </div>
      <div className='flex w-full gap-3 justify-center mt-7 '>
        <button onClick={()=>setClicked("income")} className='w-36 rounded-lg text-white shadow-lg hover:bg-green-400 bg-green-600 font-bold text-lg px-2 py-2'>Add Income</button>
        <button onClick={()=>setClicked("exp")}  className='w-36 rounded-lg text-white shadow-lg hover:bg-red-400 bg-red-600 font-bold text-lg px-2 py-2'>Add Expense</button>
      </div>
      <div className='mt-4  border-b-4 border-blue-950'>
        <h1 className='font-bold text-2xl text-center'>All Transactions</h1>
      </div>
      <div className='w-full overflow-y-scroll h-[545px]'>
        {/* <div className='bg-purple-800 text-white font-bold flex'>
          <div className='w-[20%] py-2 text-center'>
            <h1>Date</h1>
          </div>
          <div className='w-[20%] py-2 text-center'>
            <h1>Type</h1>
          </div>
          <div className='w-[20%] py-2 text-center'>
            <h1>Category</h1>
          </div>
          <div className='w-[20%] py-2 text-center'>
            <h1>Description</h1>
          </div>
          <div className='w-[20%] py-2 text-center'>
            <h1>Amount</h1>
          </div>
        </div> */}
          {result.length === 0 ? (
            <div className='w-full text-center'>
              <p className='font-bold text-xl mt-7'>No Transactions Found</p>
            </div>
          ):
          (
            result.map((item,id)=>(
              <div key={id} className={`${item.type === "Expense" ? "bg-red-500 border   border-black/10 shadow-lg" : "bg-emerald-500   border border-black/10 shadow-lg"} text-white flex flex-col rounded-lg p-4`}>
                <div className='font-bold flex justify-between w-full'>
                  <h1>Date - {new Date(item.createdAt).toLocaleDateString("en-IN")}</h1>
                  <h1>{item.type}</h1>
                </div>
                <div>
                  <p className='font-semibold'>Description - {item.description}</p>
                </div>
                <div className='flex justify-between'>
                  <h1 className='font-semibold'>{item.category}</h1>
                  <h1 className='font-bold text-2xl flex'>{item.type==="Expense" ? (<p>-</p>):""}{item.amount}/-</h1>
                </div>
              </div>
            ))
          ).reverse()
          }
      </div>
    </div>
  )
}
