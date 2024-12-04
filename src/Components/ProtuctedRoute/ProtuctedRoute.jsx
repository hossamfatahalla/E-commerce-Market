import React from 'react'
import Style from './ProtuctedRoute.module.css'
import { useState } from 'react'
import { useEffect } from 'react'
import Login from '../Login/Login'
import { Navigate } from 'react-router-dom'
export default function ProtectedRoute({ children }) {

   if(localStorage.getItem("token")== null){
      return <Navigate to='/login'> </Navigate>

  }else {
    return children
  }





}