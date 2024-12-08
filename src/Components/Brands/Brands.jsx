import React from "react";
import Style from "./Brands.module.css";
import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";
export default function Brands() {
  const [brands, setBrands] = useState([]);
  async function getBrands() {
    try {
      const { data } = await axios.get(
        "https://ecommerce.routemisr.com/api/v1/brands"
      );
      setBrands(data.data);
    } catch (error) {
      console.log(error);
    }
  }
  useEffect(() => {
    console.log("mount is did");
    getBrands();
  }, []);

  function brandRender() {
    var brandsHtml = brands.map((brand) => (
      <>
        <div className="w-full max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
          <a href="#">
            <img
              className="p-8 rounded-t-lg h-[400px] w-[400px] object-contain"
              src={brand.image}
              alt="product image"
            />
          </a>
          <div className="px-5 pb-5 flex  justify-center">
            <a href="#">
              <h5 className="text-xl font-semibold tracking-tight  text-gray-900 dark:text-white">
                {brand.name}
              </h5>
            </a>
          </div>
        </div>
      </>
    ));

    return (brandsHtml)
  }

  return (
    <div>
      <h2  className="font-bold text-2xl text-center">Brands Component</h2>
      {brands.length == 0 ? (
        "isLoading ..............."
      ) : (
        <div className="grid grid-cols-3 gap-5 mt-8">{brandRender()} </div>
      )}
    </div>
  );
}
