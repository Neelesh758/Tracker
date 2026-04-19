import axios from 'axios';
import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react'
import Loader from '../components/Loader';
import { PieChart, Pie, Cell, Tooltip, Legend } from "recharts";

export default function Expense() {
  const [loading,setLoading] = useState(false)
  const [result , setResult ] = useState([])
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [showFilter, setShowFilter] = useState(false);
  const [hero,setHero] = useState("Table")

  const user = JSON.parse(localStorage.getItem('user'));
  const id = user?._id
  useEffect(()=>{
    if(!id){
      return
    }
    const data = async () => {
      setLoading(true)
      try {
        const response = await axios.get(`https://tracker-1ouu.onrender.com/api/transactions/get/${id}`)
        setResult(response.data.transactions)
      } catch (error) {
        console.log(error)
      } finally{
        setLoading(false)
      }
    }
    data();
  },[])

  //Calc func
  const totalIncome = result.filter((item)=>item.type=== "Income").reduce((sum,item)=>sum=sum+Number(item.amount),0);

  const categoryData = Object.values(
    [...result]
    .filter((item)=>{
          if(!startDate || !endDate) return true;
          const itemDate = new Date(item.createdAt)
          return(
            itemDate >= new Date(startDate) && itemDate <= new Date(endDate)
          );
        })
    .reduce((acc,item)=>{
      if(item.type === "Income"){
        if(!acc[item.category]){
          acc[item.category] = {
            name : item.category,
            value : 0
          }
        }
        acc[item.category].value += Number(item.amount)
      }
      return acc
    },{})
  )
  const COLORS = [
  "#ef4444", 
  "#f97316", 
  "#eab308", 
  "#22c55e", 
  "#3b82f6", 
  "#a855f7", 
  "#ec4899", 
  "#14b8a6", 
  "#6366f1", 
  "#84cc16", 
];
const incomes = result.filter((item) => item.type === "Income");
  if (!loading && incomes.length === 0) {
  return (
    <div className="h-screen flex flex-col justify-center items-center">
      <h1 className="text-3xl font-bold text-gray-700">
        No Data Found
      </h1>
      <p className="text-gray-500 mt-2">
        Start adding transactions to see data here
      </p>
    </div>
  );
}
  return (
    <>
    {loading && <Loader />}
    <div className='h-[calc(100vh-66px)] md:h-screen overflow-y-auto overflow-x-hidden  '>
      <div className='p-3 w-full flex justify-between items-center'>
           <h1 className='text-2xl md:text-3xl lg:text-4xl font-bold '>Income</h1>
           <div className='mx-3 my-2 font-bold text-lg'>
             <h1 className='text-lg '>All Time Total : {totalIncome}/-</h1>
           </div>
         </div>
        <div className='flex flex-col items-center justify-center'>
        <div className='flex w-full gap-6 justify-center m-6'>
          <button onClick={()=>setHero("Table")} className= {`text-black px-3 py-2 w-24 rounded-md border-2 border-blue-600 ${hero==="Table" ? "bg-blue-600 text-white" : ""}`}>Table</button>
          <button onClick={()=>setHero("Graph")} className={`text-black px-3 py-2 w-24 rounded-md border-2 border-blue-600 ${hero==="Graph" ? "bg-blue-600 text-white" : ""}`}>Graph</button>
        </div>
        {hero === "Graph" && (
          <div className='flex justify-center mt-6'>
            <PieChart width={350} height={350}>
              <Pie 
              data={categoryData}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              outerRadius={120}
              label
              >
                {categoryData.map((entry,index)=>(
                  <Cell 
                  key={`cell-${index}`}
                  fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </div>
        )}
        {hero === "Table" && (
          <div className='flex flex-col justify-center items-center w-full m-4'>
            <div className='flex'>
              <div className='bg-purple-900 text-white border-2 border-black w-44 py-1 flex justify-center items-center font-bold '>
                <h1>Category</h1>
              </div>
              <div className='bg-purple-900 text-white border-2 border-black w-44 py-1 flex justify-center items-center font-bold' >
                <h1>Total</h1>
              </div>
            </div>
            {categoryData.map((item,index)=>(
              <div className='flex'>
                <div className='border-2 border-black w-44 py-1 flex justify-center items-center font-bold '>
                  <h1>{item.name}</h1>
                </div>
                <div className='border-2 border-black w-44 py-1 flex justify-center items-center font-bold' >
                  <h1>{item.value}</h1>
                </div>
              </div>
              ))}
          </div>
        )}
      </div>
      <div className='w-full flex justify-center'>
        <h1 className='font-bold text-black text-3xl mt-5 '>All Transactions</h1>
      </div>
      <div>
        <button className='bg-blue-900 hover:bg-blue-800 text-white px-4 py-1 rounded mx-3 my-3' onClick={()=>setShowFilter(true)}>Filter By Date</button>
      </div>
      {showFilter && (
        <div className="flex gap-1 mb-4 items-center border-b-2 border-gray-900 py-3">
          <input
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            className="border p-2 rounded mx-3"
          />

          <input
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            className="border p-2 rounded mx-3"
          />

          <div onClick={()=>{setShowFilter(false);setEndDate("");setStartDate("")}} className='w-8 h-8 rounded-full flex justify-center items-center bg-red-600 text-white font-bold'>X</div>
        </div>
        
      )}
      <div>
        {[...result]
        .filter((item)=>{
          if(!startDate || !endDate) return true;
          const itemDate = new Date(item.createdAt)
          return(
            itemDate >= new Date(startDate) && itemDate <= new Date(endDate)
          );
        })
        .filter((item,id)=>item.type==="Income").map((item,id)=>(
          <div key={id} className={`${item.type === "Expense" ? "bg-red-500 border   border-black/10 shadow-lg" : "bg-emerald-500   border border-black/10 shadow-lg"} text-white flex flex-col rounded-lg p-4 `}>
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
        ))}
      </div>
    </div>
    </>
  )
}
