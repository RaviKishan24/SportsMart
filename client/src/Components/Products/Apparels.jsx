import React from 'react'
import Navbar from "../Navbar"
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchProductAction } from '../../redux/actions/product'
import Footer from '../Footer'
import "./Pmain.css"
import { addtocartAction } from '../../redux/actions/cart'

const Apparels = () => {

    const dispatch = useDispatch();
      const data = useSelector((store) => store.productGS.data)
      const isloading = useSelector((store) => store.productGS.loading)
      const error = useSelector((store) => store.productGS.error)
    
      useEffect(() => { dispatch(fetchProductAction()) }, [dispatch])
      const ballProducts = data.filter((product) => product.category == 'apparels');
        
        const addtocart = (productId) => {
          try {
            dispatch(addtocartAction(productId))
          } catch (error) {
            console.error('Error  adding product to cart:', error);
          }
        };
    
    
  return (
    <div>
      <div className='Pmain '>
    
      <div className='row gap-3  pmain' >{ballProducts.map((item) => { 
        return (
          <div className="card" key={item._id}>
              
            <img src={item.thumbnail} className="card-img-top imgs" alt="..." />
            <div className="card-body">
              <p className="title">{item.title}</p>
              <div className="prices">
                <span className='dis'>₹{item.price}</span>
                <span>₹ {item.price-item.discount}</span>
              </div>
              <div onClick={() => addtocart(item._id)} className="card-button  ">
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
    
    </div>

    </div>
  )
}

export default Apparels
