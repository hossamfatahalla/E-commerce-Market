import React, { useContext } from 'react'
import Style from './ProductCard.module.css'
import { useState } from 'react'
import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import { CartContext } from '../../Context/CartContext'
export default function ProductCard({product}) {
  const {addToCart} = useContext(CartContext)
  // async function addProduct(id){
   
  //  try {
  //   const {data} = await axios.post('https://ecommerce.routemisr.com/api/v1/cart' ,
  //   {
  //     "productId": id
  //   } ,
  //   {
  //     headers : {
  //       token: localStorage.getItem("token")

  //     }
  //   }
  // )
  // console.log(data)
  //  } catch (error) {
  //   console.log(error)
    
  //  }
  //  }



  const [isWishlist, setIsWishlist] = useState(false); // حالة للتحكم في القلب

  // دالة لإضافة المنتج إلى Wishlist
  async function toggleWishlist(productId) {
    try {
      if (isWishlist) {
        // إزالة المنتج من الـ Wishlist
        await axios.delete(`https://ecommerce.routemisr.com/api/v1/wishlist/${productId}`, {
          headers: {
            token: localStorage.getItem('token'),
          },
        });
      } else {
        // إضافة المنتج إلى الـ Wishlist
        await axios.post(
          'https://ecommerce.routemisr.com/api/v1/wishlist',
          { productId },
          {
            headers: {
              token: localStorage.getItem('token'),
            },
          }
        );
      }
      setIsWishlist(!isWishlist); // تغيير حالة القلب
    } catch (error) {
      console.error('Error toggling wishlist:', error);
    }
  }


  return (

  
    <div className="max-w-sm bg-white border flex flex-col border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
    <Link to={"/ProductDetailes/" + product.id}>
      <a href="#">
      <img className="rounded-t-lg" src={product.imageCover} alt />
    </a>
    <div className="p-5 flex flex-col flex-grow items-start">
      <a href="#">
        <h5 className="mb-2 text-2xl  font-bold tracking-tight text-gray-900 dark:text-white">
          {product.title.split(" ", 3).join(" ")}
        </h5>
      </a>
      <p className="mb-3 line-clamp-4 font-normal text-gray-700 dark:text-gray-400">
        {product.description}
      </p>
      </div>
        </Link>

        <div className="p-5 flex items-center justify-between">
      <button
       onClick={()=> addToCart(product.id)}
        className="inline-flex mt-auto items-center px-3 py-2 text-sm font-medium text-center text-white bg-green-700 rounded-lg hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
      >
        Add to Cart
      </button>

      <button
          onClick={() => toggleWishlist(product.id)}
          className="text-gray-500 hover:text-yellow-500 focus:outline-none"
        >
          {isWishlist ? (
            <i className="fas fa-heart text-yellow-500 text-xl"></i> // قلب ممتلئ
          ) : (
            <i className="far fa-heart text-xl"></i> // قلب مفرغ
          )}
        </button>
        </div>
  </div>
  )
}
