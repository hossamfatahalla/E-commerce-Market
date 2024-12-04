import React from 'react'
import Style from './Proudcts.module.css'
import { useState } from 'react'
import { useEffect } from 'react'
import axios from 'axios'
import { useQuery } from '@tanstack/react-query'
import { Link } from 'react-router-dom'
import ProductCard from '../ProductCard/ProductCard'
export default function Proudcts() {

  const {isLoading , isError , error , data} = useQuery({
    queryKey : ['products'],
    queryFn : ()=> axios.get("https://ecommerce.routemisr.com/api/v1/products"),
    staleTime : 3000
  })
  
  if(isError){
    return <>fe moshkala</>
  }
  
   
    function renderProducts() {
      var ProductsToHtml = data.data.data.map((product) => (
        <>
          <Link to={"/ProductDetailes/" + product.id}>
              <ProductCard product={product} />
          </Link>
        </>
      ));
  
      return ProductsToHtml;
    }
  
   



  return (
    <>
    {
      isLoading && <>isLoading..................................</>
    }

    {
      data?.data?.data.length > 0 && <div className="grid grid-cols-5 gap-5 mt-8">{renderProducts()} </div>
    }
    </>
  )
}
