import React from 'react'
import Style from './ProductDetailes.module.css'
import { useState } from 'react'
import { useEffect } from 'react'
import axios from 'axios'
import { useParams } from 'react-router-dom'
import Slider from 'react-slick'






export default function ProductDetailes() {
  const x = useParams()
  const [productDetails, setproductDetails] = useState(null)
  const [isLoading, setisLoading] = useState(false)
  async function getProductsDetailes(){
    setisLoading(true)
   const{ data } = await axios.get('https://ecommerce.routemisr.com/api/v1/products/' + x.id)
   setisLoading(false)
    setproductDetails(data.data)
    console.log(data.data)
  }

  var settings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  }





    const [counter, setcounter] = useState(false)
    useEffect(()=> {
        console.log("mount is did"),
        getProductsDetailes()
    } , [])


    if(isLoading){
      return <>loading.............</>
    }
  return (
  
    <div className='grid grid-cols-12'>
      <div className='col-span-4'>
    <Slider {...settings}>
    {
      productDetails?.images.map((img)=>{
      return <div> <img src={img} className='w-full' alt='' />
       </div>
      })
    }
    </Slider>
      
          
      </div>
      <div className='col-span-8 flex  flex-col gap-4 justify-center'>
        <h2>{productDetails?.title}</h2>
        <p>{productDetails?.description}</p>
        <div className=' flex justify-between'>
            <span>{productDetails?.price} $</span>
            <span>{productDetails?.ratingsAverage} </span>

        </div>
        <button
          type="submit"
          className="text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
        >
          Add To Cart
        </button>
      </div>
      
    </div>
  




    
      // <div className="grid grid-cols-12 gap-5">
      //   {productDetails ? (
      //     <>
      //       <div className="col-span-4">
      //         <img
      //           src={productDetails.imageCover}
      //           className="w-full"
      //           alt={productDetails.title}
      //         />
      //       </div>
      //       <div className="col-span-8 flex flex-col gap-4 justify-center">
      //         <h2>{productDetails.title}</h2>
      //         <p>{productDetails.description}</p>
      //         <div className="flex justify-between">
      //           <span>{productDetails.price} $</span>
      //           <span>{productDetails.ratingsAverage} <i className='fa-solid fa-heart text-yellow-200' ></i></span>
      //         </div>
      //         <button
      //           type="submit"
      //           className="text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
      //         >
      //           Add To Cart
      //         </button>
      //       </div>
      //     </>
      //   ) : (
      //     <p>Loading...</p>
      //   )}
      // </div>
    );
    
  



}
