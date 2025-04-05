import React from 'react'
import { Link } from 'react-router-dom'
import './bss.css'
import bss1 from '../assets/bss/bss1.avif'
import bss2 from '../assets/bss/bss2.avif'
import bss3 from '../assets/bss/bss3.avif'
import bss4 from '../assets/bss/bss4.avif'

function Bss() {
  return (
    <div className="budget-shop-container">

      <h4 className='budget-shop-heading'>BUDGET SPORT SHOPPING</h4>

      <div className="budget-shop-list gap-3">
        <Link>
          <img className='budget-shop-img' src={bss1} alt="" />
        </Link>
        <Link>
          <img className='budget-shop-img' src={bss2} alt="" />
        </Link>
        <Link>
          <img className='budget-shop-img' src={bss3} alt="" />
        </Link>
        <Link>
          <img className='budget-shop-img' src={bss4} alt="" />
        </Link>
      </div>
    </div>

  )
}

export default Bss;
