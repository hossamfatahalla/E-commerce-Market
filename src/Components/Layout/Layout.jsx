import React from 'react'
import Style from './Layout.module.css'
import { useState } from 'react'
import { useEffect } from 'react'
import Navbar from '../Navbar/Navbar'
import { Outlet } from 'react-router-dom'
import Footer from '../Footer/Footer'
export default function Layout() {

    const [counter, setcounter] = useState(0)
    useEffect(()=> {
        console.log("mount is did")
    } , [])



  return (
    <>
    <Navbar />
    <div className=' max-w-screen-xl , mx-auto'>
    <Outlet />
    </div>
    <Footer />
    </>
  )
}
