import React, { useState } from 'react'
import axios from 'axios';
import { toast } from 'react-toastify';

export default function AddExp() {

  //Getting User
  const user = JSON.parse(localStorage.getItem("user"));
  const id = user?._id


  //Input States 
  const [category,setCategory] = useState("");
  const [amount,setAmount] = useState(Number);
  const [type,setType] = useState("Expense");
  const [description , setDescription] = useState("")

  //Handle Function

  const handleAdd = async (e) => {
    e.preventDefault();
    console.log({
      id,
      category,
      amount,
      type,
      description,
      amountType: typeof amount
    });

    try {
      const res = await axios.post(`https://tracker-1ouu.onrender.com/api/transactions/create/${id}`,{
        category,
        amount,
        type,
        description
      })
      
      toast.success(res.data.message || "Transaction Added Successfully" )
      window.location.reload()
    } catch (error) {
      console.log(error)
      toast.error(error.message || "Unable to Add Transaction")
    }
  }
  return (
  <div className="w-[340px] bg-white shadow-2xl rounded-2xl border border-gray-200 flex flex-col">
    <div className="py-4 border-b text-center">
      <h1 className="text-xl font-semibold text-gray-800">Add Expense</h1>
      <p className="text-sm text-gray-500">Track your spending</p>
    </div>

    <form onSubmit={handleAdd} className="p-4 flex flex-col gap-4">
      <div className="flex gap-3">
        <div className="flex flex-col w-1/2">
          <label className="text-sm font-medium text-gray-600 mb-1">
            Category
          </label>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="p-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-red-400"
          >
            <option value="">Select</option>
            <option value="Food">Food</option>
            <option value="Shopping">Shopping</option>
            <option value="Medical">Medical</option>
            <option value="Travel">Travel</option>
            <option value="Bills">Bills</option>
            <option value="Rent/Housing">Rent/Housing</option>
            <option value="Entertainment">Entertainment</option>
            <option value="Others">Others</option>
          </select>
        </div>

        <div className="flex flex-col w-1/2">
          <label className="text-sm font-medium text-gray-600 mb-1">
            Type
          </label>
          <select
            value={type}
            onChange={(e) => setType(e.target.value)}
            className="p-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-red-400"
          >
            <option value="">Select</option>
            <option value="Expense">Expense</option>
          </select>
        </div>
      </div>

      <div className="flex flex-col">
        <label className="text-sm font-medium text-gray-600 mb-1">
          Description
        </label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Enter details..."
          className="p-2 rounded-lg border border-gray-300 h-20 resize-none focus:outline-none focus:ring-2 focus:ring-red-400"
        />
      </div>

      <div className="flex flex-col">
        <label className="text-sm font-medium text-gray-600 mb-1">
          Amount
        </label>
        <input
          type="number"
          value={amount}
          placeholder="₹ Enter amount"
          onChange={(e) => setAmount(e.target.value)}
          className="p-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-red-400"
        />
      </div>

      <button
        type="submit"
        className="mt-2 bg-red-500 hover:bg-red-600 transition-all text-white py-2 rounded-xl font-semibold shadow-md"
      >
        Submit
      </button>
    </form>
  </div>
);}

//   return (
//     <div className='w-[330px] h-[390px] bg-slate-300 shadow-xl rounded-xl border-2 border-slate-400 flex flex-col gap-4 items-center '>
//       <div className='py-4'>
//         <h1 className='font-bold text-2xl text-center'>Add Expense</h1>
//       </div>
//       <form action="" onSubmit={handleAdd} className='flex flex-col '>
//         <div className='flex flex-wrap justify-evenly gap-2'>
//           <div>
//             <h1 className='text-md font-bold'>Selct Category</h1>
//             <select name="" id="" value={category} onChange={(e)=>setCategory(e.target.value)}>
//               <option value="">Select Category</option>
//               <option value="Food">Food</option>
//               <option value="Shopping">Shopping</option>
//               <option value="Medical">Medical</option>
//               <option value="Travel">Travel</option>
//               <option value="Bills">Bills</option>
//               <option value="Rent/Housing">Rent/Housing</option>
//               <option value="Entertainment">Entertainment</option>
//               <option value="Others">Others</option>
//             </select>
//           </div>
//           <div>
//             <h1 className='text-md font-bold'>Type</h1>
//             <select name="" id="" value={type} onChange={(e)=>setType(e.target.value)}>
//               <option value="">Select</option>
//               <option value="Expense">Expense</option>
//             </select>
//           </div>
//           <div>
//             <h1 className='text-md font-bold'>Description</h1>
//             <textarea value={description} name="" id="" placeholder='Enter Description Here' className='w-[250px] h-20' onChange={(e)=>setDescription(e.target.value)}></textarea>
//           </div>
//           <div className='text-left w-[250px]'>
//             <h1 className='text-md font-bold'>Amount</h1>
//             <input type="number" value={amount} className='w-full' placeholder='Enter Amount' onChange={(e)=>setAmount(e.target.value)} />
//           </div>
//         </div>
//         <div className='w-full text-center'>
//           <button className=' mt-7  w-[120px] rounded-lg py-2 px-2 bg-green-500 text-white border-2 border-green-600 text-lg font-bold' type='submit'>Submit</button>
//         </div>
//       </form>
//     </div>
//   )
// }
