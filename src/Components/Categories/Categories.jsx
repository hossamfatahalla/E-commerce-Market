import React from "react";
import Style from "./Categories.module.css";
import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";
export default function Categories() {
  const [categories, setCategories] = useState([]);
  async function getCategories() {
    try {
      const { data } = await axios.get(
        "https://ecommerce.routemisr.com/api/v1/categories"
      );

      setCategories(data.data);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    console.log("mount is did");
    getCategories();
  }, []);
  function categoryRender() {
  var categoryHtml =  categories.map((category) => (
      <>
        <div className="w-full max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
          <a href="#">
            <img
              className="p-8 rounded-t-lg h-[400px] w-full object-cover"
              src={category.image}
              alt="product image"
            />
          </a>
          <div className="px-5 pb-5 flex  justify-center">
            <a href="#">
              <h5 className="text-xl font-semibold tracking-tight  text-gray-900 dark:text-white">
                {category.name}
              </h5>
            </a>
          </div>
        </div>
      </>
    ));

    return (categoryHtml)
  }
  return (
    <div>
      <h2 className="font-bold text-2xl text-center">Categories Component</h2>
      {categories.length == 0 ? "loading.........." : 
      
        <div className="grid grid-cols-3 gap-5 mt-8">{categoryRender()} </div>
      
      }
    </div>
  );
}
