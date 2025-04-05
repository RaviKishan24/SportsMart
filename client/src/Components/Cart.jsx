import React, { useState, useEffect } from 'react';
import Navbar from './Navbar';
import "./Cart.css"
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router';
import { fetchcartproductAction, increaseQuantityAction, decreaseQuantityAction, removeproductfromcartAction, } from "../redux/actions/cart"
import { toast } from 'sonner';

function Cart() {
  const dispatch = useDispatch();
  const navigate=useNavigate();
  const cartProducts = useSelector((store) => store.cartGS.data || []);
  const user = useSelector((state) => state.userGS.user)
  useEffect(() => {
    if (user) {
      dispatch(fetchcartproductAction())
    }
  }, [dispatch, user])


  const handleIncreaseQuantity = (productId) => {
    dispatch(increaseQuantityAction(productId));

  };

  const handleDecreaseQuantity = (productId) => {
    dispatch(decreaseQuantityAction(productId));


  };

  const removefromcart = (productId) => {
    try {
      dispatch(removeproductfromcartAction(productId))
    } catch (error) {
      console.error('Error   remove product to cart:', error);
    }

  }

  const placeorderButton=()=>{
    if(cartProducts.length ===0){
      toast.error("User has no product in cart")
    } else{
      navigate('/placeOrder')
    }
  }

  const totaloriginalprice = cartProducts.reduce((accumulator, product) => {
    return accumulator + product.price * product.quantity
  }, 0)
  const totaldiscountprice = cartProducts.reduce((accumulator, product) => {
    return accumulator + product.discount * product.quantity
  }, 0)


  return (
    <div>
      <Navbar />
      <div className='row cart-main mx-5'>
        <div className='cart-header d-flex jusify-content-between align-item-center'>
          <span className="header-item">Product</span>
          <span className="header-item">Price</span>
          <span className="header-item">Quantity</span>
          <span className="header-item">Bill Amounts</span>
        </div>
        <div className='col-8 '>
          <div>
            {cartProducts.map((item) => {
              return (
                <div className='cart-container ' key={item._id}>
                  <div className="cart-details ">
                    <div className='cart-item d-flex justify-content-between align-item-center'>
                      <div className='product-info d-flex'>
                        <img className='cart-img' src={item.thumbnail} alt="" />
                        <div className='product-text'>
                          <h6 className='Product-title'>{item.title}</h6>
                          <p className='delivery-date'>Delivery by: 12 jan 2025 ,Sun</p>
                        </div>
                      </div>
                      <div className=' price-info gap-2'>
                        <p className='original-price '> ₹{item.price}</p>
                        <p className='discounted-price'>₹{item.price - item.discount}</p>
                      </div>
                      <div className='quantity  align-items-center gap-2 '>
                        <button className='quantity-button' onClick={() => handleDecreaseQuantity(item.productId)}>-</button>
                        <span>{item.quantity}</span>
                        <button className='quantity-button ' onClick={() => handleIncreaseQuantity(item.productId)} >+</button>
                      </div>
                    </div>
                    <div className=' container d-flex gap-5'>
                      <h6 className='cursor-pointer '>SAVE FOR LATER</h6>
                      <h6 className='cursor-pointer' onClick={() => removefromcart(item.productId)}>REMOVE</h6>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
        <div className='bill-summary col-4'>
          <div className='calulations'>
            <h5 className='gap-5'>Price: ₹{totaloriginalprice}</h5>
            <h5>discount: ₹{totaldiscountprice}</h5>
            <h5 className='mb-3'>deliverycharge:₹{"0"}</h5>
          </div>
          <h5 className='mt-2'>Total Amount:₹{totaloriginalprice - totaldiscountprice}</h5>
          <Link> <button className='btn btn-danger mt-2'  onClick={placeorderButton}>Place Order</button></Link>
        </div>
      </div>
    </div >
  );
}

export default Cart;
