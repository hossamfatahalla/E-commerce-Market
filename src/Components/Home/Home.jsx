import React from "react";
import Style from "./Home.module.css";
import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Slider from "react-slick";
import MainSalider from "../MainSalider/MainSalider";
import CategoriesSalider from "../CategoriesSalider/CategoriesSalider";
import ProductCard from "../ProductCard/ProductCard";
import { useQuery } from "@tanstack/react-query";

export default function Home() {
  

const {isLoading , isError , error , data} = useQuery({
  queryKey : ['products'],
  queryFn : ()=> axios.get("https://ecommerce.routemisr.com/api/v1/products")
})

if(isError){
  return <>fe moshkala</>
}

 
  function renderProducts() {
    var ProductsToHtml = data.data.data.map((product) => (
      <>
       
            <ProductCard product={product} />
      
      </>
    ));

    return ProductsToHtml;
  }

 
  return (
    <div>
     <MainSalider />

      <div>
       <CategoriesSalider />

        {
          isLoading && <>isLoading..................................</>
        }

        {
          data?.data?.data.length > 0 && <div className="grid grid-cols-5 gap-5 mt-8">{renderProducts()} </div>
        }
      </div>
    </div>
  );
}
