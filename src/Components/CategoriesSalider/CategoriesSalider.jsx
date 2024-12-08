import React from 'react'
import Style from './CategoriesSalider.module.css'
import { useState } from 'react'
import { useEffect } from 'react'
import Slider from 'react-slick'
import axios from 'axios'
export default function CategoriesSalider() {
    const [Categories, setCategories] = useState([]);
    const [counter, setcounter] = useState(0)
    useEffect(()=> {
        console.log("mount is did")
        getCategories();
    } , [])

    
  async function getCategories() {
    const { data } = await axios.get(
      "https://ecommerce.routemisr.com/api/v1/categories"
    );

    setCategories(data.data);
  }


    var settings = {
      dots: true,
      infinite: false,
      speed: 500,
      slidesToShow: 8,
      slidesToScroll: 3,
      responsive: [
        {
          breakpoint: 1024,
          settings: {
            slidesToShow: 3,
            slidesToScroll: 3,
            infinite: true,
            dots: true,
          },
        },
        {
          breakpoint: 600,
          settings: {
            slidesToShow: 2,
            slidesToScroll: 2,
            initialSlide: 2,
          },
        },
        {
          breakpoint: 480,
          settings: {
            slidesToShow: 1,
            slidesToScroll: 1,
          },
        },
      ],
    };
  return (
    <Slider {...settings}>
          {Categories.map((c) => (
            <div className="p-1">
              <img className="h-[200px] w-full object-cover" src={c.image} />
              <h2 className="text-lg text-green-500 font-bold">{c.name}</h2>
            </div>
          ))}
        </Slider>
  )
}
