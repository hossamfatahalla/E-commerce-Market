import React from 'react'
import Style from './TemplateName.module.css'
import { useState } from 'react'
import { useEffect } from 'react'
export default function TemplateName() {

    const [counter, setcounter] = useState(0)
    useEffect(()=> {
        console.log("mount is did")
    } , [])



  return (
    <div>
      <h2>TemplateName Component</h2>
      <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quae maiores velit ex, fugit numquam cumque?</p>
      <p> counter : {counter}</p>
    </div>
  )
}
