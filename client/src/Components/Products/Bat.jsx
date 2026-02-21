import React, { useEffect, useState } from 'react'
import Navbar from '../Navbar'
import Footer from '../Footer'
import { useDispatch, useSelector } from 'react-redux'
import { fetchProductAction } from '../../redux/actions/product'
import { addtocartAction} from '../../redux/actions/cart'
import "./Pmain.css"
import { toast } from 'sonner'
import { useNavigate } from 'react-router'

function Bat() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const data = useSelector((store) => store.productGS.data)
  const batProducts = data.filter((product) => product.category == 'bat')

  const addtocart = (productId) => {
    try {
      dispatch(addtocartAction(productId))
    } catch (error) {
      console.error('Error  adding product to cart:', error);

    }
  };



  useEffect(() => { dispatch(fetchProductAction()) }, [dispatch])

  return (

    <div>
      <Navbar></Navbar>
      <div className=' row gap-3  pmain'>
        {batProducts.map((product) => {
          return (
            <div className="card" key={product._id}>
              <img src={product.thumbnail} className="card-img-top imgs " alt="..." />
              <div className="card-body">
                <p className="title">{product.title}</p>
                <div className="prices">
                  <span className='dis'>₹ {product.price}</span>
                  <span >₹ {product.price - product.discount}</span>
                </div>
                <div onClick={() => addtocart(product._id)} className="card-button  ">
                  <span className='cart-button-icon'>
                    <i className=" fa-solid fa-cart-shopping " > </i>
                  </span>
                  <p className='mb-1'>Add to cart</p>
                </div>
              </div>
            </div>
          )
        })}
      </div>
      <Footer></Footer>
    </div>
  )
}

export default Bat
