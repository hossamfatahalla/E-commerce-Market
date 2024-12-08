import { useFormik } from 'formik'
import React, { useContext } from 'react'
import { CartContext } from '../../Context/CartContext'

export default function ShippingAddress() {
  const {checkoutSession , CartData} =  useContext(CartContext)
   const x = useFormik({
        initialValues: {
            details : '' ,
            city: '' ,
            phone: ''
        },
        onSubmit : function(value){
            console.log(value)
            checkoutSession(CartData._id , value)
        }
    })
  return (
    

<form onSubmit={x.handleSubmit} className="max-w-sm mx-auto">
  <div className="mb-5">
    <label htmlFor="details" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your address</label>
    <input {...x.getFieldProps('details')} type="text" id="details" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="name@flowbite.com" required />
  </div>
 
  <div className="mb-5">
    <label htmlFor="city" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your city</label>
    <input {...x.getFieldProps('city')} type="text" id="city" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="name@flowbite.com" required />
  </div>
  
  <div className="mb-5">
    <label htmlFor="phone" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your phone</label>
    <input {...x.getFieldProps('phone')}  type="tel" id="phone" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="name@flowbite.com" required />
  </div>
  <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Submit</button>
</form>


  )
}
