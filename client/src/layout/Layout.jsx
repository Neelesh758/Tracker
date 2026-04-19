import React from 'react'
import Navbar from '../components/Navbar'
import {Outlet} from "react-router-dom"

export default function Layout() {
  return (
    <>
    <div className="lg:flex h-screen ">
      <Navbar  />
      <div className="flex-1">
        <Outlet />
      </div>
    </div>
    </>
  )
}
