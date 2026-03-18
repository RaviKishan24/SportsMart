import React from 'react'
import { Link } from 'react-router-dom'
import './bss.css'
import bss1 from '../assets/bss/bss1.avif'
import bss2 from '../assets/bss/bss2.avif'
import bss3 from '../assets/bss/bss3.avif'
import bss4 from '../assets/bss/bss4.avif'




function Bss() {
  const items = [
    { img: bss1, link: "/category1" },
    { img: bss2, link: "/category2" },
    { img: bss3, link: "/category3" },
    { img: bss4, link: "/category4" },
  ]

  return (
    <div>
      <section className="budget-shop-container">

        <h2 className='budget-shop-heading'>
          Budget Sport Shopping
        </h2>

        <div className="budget-shop-grid">

          {items.map((item, index) => (
            <Link to={item.link} key={index} className="budget-card">

              <img src={item.img} alt="sports" />

              <div className="overlay">
                <p>Shop Now</p>
              </div>

            </Link>
          ))}

        </div>
      </section>

    </div>
  )
}

export default Bss;
