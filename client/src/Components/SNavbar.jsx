import React, { useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import './SNavbar.css'
import cricketbat1 from '../assets/snavbar/cricketbat1.jpg'
import crickball1 from '../assets/snavbar/crickball1.jpg'
import football1 from '../assets/snavbar/football1.jpg'
import badminton from '../assets/snavbar/badminton.jpg'
import carromboard from '../assets/snavbar/carromboard.jpg'
import volleyball from '../assets/snavbar/volleyballs.webp'
import shuttle from '../assets/snavbar/shuttle.webp'
import chess from '../assets/snavbar/chess.jpg'
import trophy from '../assets/snavbar/trophy.webp'
import apparels from '../assets/snavbar/apparels.png'
import tennis from '../assets/snavbar/tennis.png'
import basketball from '../assets/snavbar/basketball.jpg'
function SNavbar() {
  const sliderRef = useRef(null);


  const scrollLeft = () => {
    if (sliderRef.current) {
      sliderRef.current.scrollBy({ left: -200, behavior: 'smooth' });
      sliderRef.current.scrollLeft - 200
    }
  };

  const scrollRight = () => {
    if (sliderRef.current) {
      sliderRef.current.scrollBy({ left: 200, behavior: 'smooth' });
      sliderRef.current.scrollLeft + 200
    }
  };




  return (

    <div className="category-container">
      <h4 className='category-heading'>SHOP BY CATEGORIES  </h4>
      <div className="slider-btn left-btn" onClick={scrollLeft}>
        <i className="fas fa-chevron-left" />
      </div>
      <div className="category-list" ref={sliderRef}>
        <Link to={'./Bat'}>
          <div className="category-item">
            <img className='category-image' src={cricketbat1} alt="" />
            <p className='category-label'>Cricket Bats</p>
          </div>
        </Link>
        <Link to={'/Ball'}>
          <div className="category-item">
            <img className='category-image' src={crickball1} alt="" />
            <p className='category-label'> Cricket Balls</p>
          </div>
        </Link>
        <Link to={'/Football'}>
          <div className="category-item">
            <img className='category-image' src={football1} alt="" />
            <p className='category-label'>Footballs</p>
          </div>
        </Link>
        <Link>
          <div className="category-item">
            <img className='category-image' src={badminton} alt="" />
            <p className='category-label'>Badmintons</p>
          </div>
        </Link>
        <Link>
          <div className="category-item">
            <img className='category-image' src={carromboard} alt="" />
            <p className='category-label'>Carromboards</p>
          </div>
        </Link>
        <Link>
          <div className="category-item">
            <img className='category-image' src={volleyball} alt="" />
            <p className='category-label'> VolleyBalls</p>
          </div>
        </Link>
        <Link>
          <div className="category-item">
            <img className='category-image' src={basketball} alt="" />
            <p className='category-label'>Basketballs</p>
          </div>
        </Link>
        <Link>
          <div className="category-item">
            <img className='category-image' src={shuttle} alt="" />
            <p className='category-label'>Shuttles</p>
          </div>
        </Link>
        <Link>
          <div className="category-item">
            <img className='category-image' src={chess} alt="" />
            <p className='category-label  '>Chess</p>
          </div>
        </Link>
        <Link>
          <div className="category-item ">
            <img className='category-image' src={tennis} alt="" />
            <p className='category-label'>Table Tennis</p>
          </div>
        </Link>
        <Link>
          <div className="category-item ">
            <img className='category-image' src={apparels} alt="" />
            <p className='category-label'>Apparels</p>
          </div>
        </Link>
        <Link>
          <div className="category-item ">
            <img className='category-image' src={trophy} alt="" />
            <p className='category-label'>Footwears</p>
          </div>
        </Link>
        <Link>
          <div className="category-item ">
            <img className='category-image' src={trophy} alt="" />
            <p className='category-label'>Protective Gears</p>
          </div>
        </Link>
        <div className="slider-btn right-btn" onClick={scrollRight}>
        <i className="fas fa-chevron-right" />
      </div>

      </div>
      

    </div>


  )
}

export default SNavbar;
