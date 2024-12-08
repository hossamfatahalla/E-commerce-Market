import React, { useContext } from 'react'
import Style from './Cart.module.css'
import { useState } from 'react'
import { useEffect } from 'react'
import axios from 'axios'
import { CartContext } from '../../Context/CartContext'
import { Link } from 'react-router-dom'
export default function Cart() {


const  {UpdateCart , checkoutSession ,  getCart , ClearCart , addToCart   ,isLoading , error ,numOfCartItems , CartData}  = useContext(CartContext)





  
     async function deleteProduct(id){
        try {
          const {data} = await  axios.delete(`https://ecommerce.routemisr.com/api/v1/cart/${id}` , {
           headers : {
             token : localStorage.getItem("token")
           }
          })
          console.log(data)
          data.numOfCartItems == 0 ? setcartDetailes(null) :  setcartDetailes(data)
           } catch (error) {
             console.log(error)
           }
      }

 
    useEffect(()=> {
       getCart()
    } , [])

   
    if(CartData == null) {
      return <>No Cart Exist</>
    }



  return (
    

<div className="relative overflow-x-auto shadow-md sm:rounded-lg">

<div className='flex justify-between p-4'>
    <span>Total Price : {CartData.totalCartPrice}</span>
    <span>Number Of Cart Items : {numOfCartItems}</span>
    <button onClick={ClearCart} className='btn rounded border p-2 bg-green-500'>Clear Cart</button>
</div>
  <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
      <tr>
        <th scope="col" className="px-16 py-3">
          <span className="sr-only">Image</span>
        </th>
        <th scope="col" className="px-6 py-3">
          Product
        </th>
        <th scope="col" className="px-6 py-3">
          Qty
        </th>
        <th scope="col" className="px-6 py-3">
          Price
        </th>
        <th scope="col" className="px-6 py-3">
          Action
        </th>
      </tr>
    </thead>
    <tbody>
    {CartData.products.map((item)=>
       <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
        <td className="p-4">
          <img src={item.product.imageCover} className="w-16 md:w-32 max-w-full max-h-full" alt="Apple Watch" />
        </td>
        <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
          {item.product.title}
        </td>
        <td className="px-6 py-4">
          <div className="flex items-center">
            <button disabled={isLoading.update} className="inline-flex items-center justify-center p-1 me-3 text-sm font-medium h-6 w-6 text-gray-500 bg-white border border-gray-300 rounded-full focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700" type="button">
              <span className="sr-only">Quantity button</span>
              <svg onClick={()=> UpdateCart(item.product.id , item.count - 1)} className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 2">
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M1 1h16" />
              </svg>
            </button>
            <div>
              <p>{item.count}</p>
            </div>
            <button className="inline-flex items-center justify-center h-6 w-6 p-1 ms-3 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-full focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700" type="button">
              <span className="sr-only">Quantity button</span>
              <svg onClick={()=> UpdateCart(item.product.id , item.count + 1)} className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 18">
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 1v16M1 9h16" />
              </svg>
            </button>
          </div>
        </td>
        <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
          {item.price}
        </td>
        <td className="px-6 py-4">
          <button onClick={()=> deleteProduct(item.product.id)} href="#" className="font-medium text-red-600 dark:text-red-500 hover:underline">Remove</button>
        </td>
      </tr> )}
    
    </tbody>
  </table>

  <button  className='btn bg-green-500 border rounded-md p-3 mt-4'  ><Link to={"/shippingAddress"}>Next</Link></button>
</div>


  )
}
