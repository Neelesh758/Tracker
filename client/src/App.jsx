import React from 'react'
import Landing from './pages/Landing'
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {BrowserRouter , Routes ,Route} from "react-router-dom";
import Payment from './pages/Payment';
import ProtectedRoutes from './components/ProtectedRoutes';
import Dashboard from './pages/Dashboard';
import Layout from './layout/Layout';
import About from './pages/About';
import Support from './pages/Support';
import Income from './pages/Income';
import Expense from './pages/Expense';
import Success from './pages/Success';


function App() {
  return (
    <BrowserRouter>
      <ToastContainer position='top-right' autoClose={3000} />
      <Routes>
        <Route path='/' element={<Landing />} />
        <Route path='/payments' element={<ProtectedRoutes><Payment /></ProtectedRoutes>} />
        <Route path='/success' element={<Success />} />

        {/* Navbar Routes */}
        <Route element={<Layout />}>
          <Route path='/dashboard' element={<Dashboard />} />
          <Route path='/about' element={<About />} />
          <Route path='/support' element={<Support />} />
          <Route path='/income' element={<Income />} />
          <Route path='/expense' element={<Expense />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App