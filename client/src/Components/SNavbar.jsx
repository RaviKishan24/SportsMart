import React, { useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import './SNavbar.css'
import cricketbat1 from '../assets/snavbar/cricketbat1.jpg'
import crickball1 from '../assets/snavbar/crickball1.jpg'
import football1 from '../assets/snavbar/football1.jpg'
import badminton from '../assets/snavbar/badminton.jpg'
import carromboard from '../assets/snavbar/Carromboard.jpg'
import volleyball from '../assets/snavbar/Volleyballs.webp'
import shuttle from '../assets/snavbar/shuttle.webp'
import chess from '../assets/snavbar/chess.jpg'
import trophy from '../assets/snavbar/trophy.webp'
import apparels from '../assets/snavbar/apparels.png'
import tennis from '../assets/snavbar/tennis.png'
import basketball from '../assets/snavbar/basketball.jpg'
function SNavbar() {
  const sliderRef = useRef(null);



  const categories = [
    { img: cricketbat1, label: "Cricket Bats", link: "/Bat" },
    { img: crickball1, label: "Cricket Balls", link: "/Ball" },
    { img: football1, label: "Footballs", link: "/Football" },
    { img: badminton, label: "Badmintons", link: "/badminton" },
    { img: carromboard, label: "Carromboards", link: "/carromboard" },
    { img: volleyball, label: "Volleyballs", link: "/volly" },
    { img: basketball, label: "Basketballs", link: "/basket" },
    { img: shuttle, label: "Shuttles", link: "/shuttle" },
    { img: chess, label: "Chess", link: "/chess" },
    { img: tennis, label: "Table Tennis", link: "/table" },
    { img: apparels, label: "Apparels", link: "/apparels" },
    { img: trophy, label: "Footwears", link: "/trophy" },
    { img: trophy, label: "Protective Gears", link: "/gears" }
  ];




  return (

    <div className="category-container">
      <h4 className='category-heading'>SHOP BY CATEGORIES  </h4>
      <div className="category-list" ref={sliderRef}>
        {categories.map((item, index) => (
          <Link to={item.link} key={index}>
            <div className="category-item">
              <img className="category-image" src={item.img} alt={item.label} />
              <p className="category-label">{item.label}</p>
            </div>
          </Link>
        ))}
      </div>

    </div>




  )
}

export default SNavbar;
