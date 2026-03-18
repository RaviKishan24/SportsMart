import React from 'react'
import { useEffect } from 'react'
import { useLocation } from 'react-router'

function ScrollToTop() {

    const {pathName}=useLocation();

    useEffect(()=>{
        window.scrollTo({
            top:0,
            behavior:"instant",  //or "smooth" if you want animation
        },[pathName])
    })
  return null;
}

export default ScrollToTop;
