import React, { useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'

export default function Success() {
  const [params] = useSearchParams();
  useEffect(()=>{
    const session_id = params.get("session_id");
    const verifyPayment =async () => {
      await axios.post("http://localhost:1307/api/payment/verify-payment",{sessionId})
      window.location.href = "/dashboard";
    };
    if(session_id){
      verifyPayment();
    }

  },[])
  return (
    <h1>Processing Payment...</h1>
  )
}
