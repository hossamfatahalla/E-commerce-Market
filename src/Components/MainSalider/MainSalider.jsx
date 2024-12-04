import React from 'react'
import Style from './MainSalider.module.css'
import { useState } from 'react'
import { useEffect } from 'react'
import Slider from 'react-slick'
import img_1 from "../../assets/slider-image-1.jpeg";
import img_2 from "../../assets/slider-image-2.jpeg";
import img_3 from "../../assets/slider-image-3.jpeg";
import img_4 from "../../assets/grocery-banner-2.jpeg";
import img_5 from "../../assets/grocery-banner.png";
export default function MainSalider() {

    const [counter, setcounter] = useState(0)
    useEffect(()=> {
        console.log("mount is did")
    } , [])



  return (
    <div className="grid gap-4 mb-4 grid-cols-12">
    <div className="col-span-8">
      <Slider arrows={false}>
        <img src={img_1} className="w-full h-[400px] object-cover" />
        <img src={img_2} className="w-full h-[400px] object-cover" />
        <img src={img_3} className="w-full h-[400px] object-cover" />
      </Slider>
    </div>
    <div className="col-span-4">
      <img className="w-full h-[200px] object-cover" src={img_4} />
      <img className="w-full h-[200px] object-cover" src={img_5} />
    </div>
  </div>
  )
}
