import React, { useState } from 'react'
import { toast } from 'react-toastify';
import axios from 'axios';

export default function AddIncome() {
  const user = JSON.parse(localStorage.getItem('user'));
  const id = user?._id;

  const [category,setCategory] = useState("");
  const [type,setType] = useState("Income");
  const [description,setDescription] = useState("");
  const [amount , setAmount] = useState(Number)

  const hnadlesubmit = async (e)=>{
    e.preventDefault();
    try {
      const res = await axios.post(`https://tracker-1ouu.onrender.com/api/transactions/create/${id}`,{
        category,
        amount,
        type,
        description
      })
      toast.success(res.data.message || "Transaction Added Successfully" )
       window.location.reload()
      setAmount(Number);
      setCategory("");
      setType("Income");
      setDescription("");
    } catch (error) {
      console.log(error);
      toast.error(error.message || "Unable to Add Transaction")
    }
  }
  return (
  <div className="w-[340px] bg-white shadow-2xl rounded-2xl border border-gray-200 flex flex-col">
    <div className="py-4 border-b text-center">
      <h1 className="text-xl font-semibold text-gray-800">Add Income</h1>
      <p className="text-sm text-gray-500">Track your earnings</p>
    </div>

    <form onSubmit={hnadlesubmit} className="p-4 flex flex-col gap-4">
      <div className="flex gap-3">
        <div className="flex flex-col w-1/2">
          <label className="text-sm font-medium text-gray-600 mb-1">
            Category
          </label>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="p-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-400"
          >
            <option value="">Select</option>
            <option value="Salary">Salary</option>
            <option value="Bussiness/FreeLance">Business/Freelance</option>
            <option value="Investment Return">Investment</option>
            <option value="Bonus/Gifts">Bonus/Gifts</option>
            <option value="Rental Income">Rental</option>
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
            className="p-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-400"
          >
            <option value="">Select</option>
            <option value="Income">Income</option>
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
          className="p-2 rounded-lg border border-gray-300 h-20 resize-none focus:outline-none focus:ring-2 focus:ring-green-400"
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
          className="p-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-400"
        />
      </div>

      <button
        type="submit"
        className="mt-2 bg-green-500 hover:bg-green-600 transition-all text-white py-2 rounded-xl font-semibold shadow-md"
      >
        Submit
      </button>
    </form>
  </div>
);
}
  // return (
//     <div className='w-[330px] h-[390px] bg-slate-300 shadow-xl rounded-xl border-2 border-slate-400 flex flex-col gap-4 items-center '>
//       <div className='py-4'>
//         <h1 className='font-bold text-2xl text-center'>Add Income</h1>
//       </div>
//       <form action="" onSubmit={hnadlesubmit} className='flex flex-col '>
//         <div className='flex flex-wrap justify-evenly gap-2'>
//           <div>
//             <h1 className='text-md font-bold'>Selct Category</h1>
//             <select name="" id="" value={category} onChange={(e)=>setCategory(e.target.value)} className='w-[140px]'>
//               <option value="">Select Category</option>
//               <option value="Salary">Salary</option>
//               <option value="Bussiness/FreeLance">Bussiness/FreeLance</option>
//               <option value="Investment Return">Investment Return</option>
//               <option value="Bonus/Gifts">Bonus/Gifts</option>
//               <option value="Rental Income">Rental Income</option>
//               <option value="Others">Others</option>
//             </select>
//           </div>
//           <div>
//             <h1 className='text-md font-bold'>Type</h1>
//             <select name="" id="" value={type} onChange={(e)=>setType(e.target.value)}>
//               <option value="">Select</option>
//               <option value="Income">Income</option>
//             </select>
//           </div>
//           <div>
//             <h1 className='text-md font-bold'>Description</h1>
//             <textarea value={description} onChange={(e)=>setDescription(e.target.value)} name="" id="" placeholder='Enter Description Here' className='w-[250px] h-20'></textarea>
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


