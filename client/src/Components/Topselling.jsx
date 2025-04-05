import React, { useEffect, useState } from 'react';
import './Topselling.css';
import { useDispatch, useSelector } from 'react-redux';
import { addtocartAction, fetchcartproductAction, fetchwishlistproductAction, togglewishlistAction, } from '../redux/actions/cart';
import { fetchProductAction } from '../redux/actions/product';



function Topselling() {
  const user = useSelector((state) => state.userGS.user) || []
  const data = useSelector((store) => store.productGS.data) || [];

  const wishlist = user.wishlist || []
  console.log("wishlist is", wishlist)



  const TopsellingProducts = data.filter((product) => product.category == 'topselling')

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchProductAction());
    if (user?._id) {
      dispatch(fetchwishlistproductAction());
      dispatch(fetchcartproductAction());

    }
  }, [dispatch, user?._id]);


  const isInWishlist = (productId) => { return wishlist.some((item) => item.productId === productId) }
  const toggleWishlist = (productId) => {
    dispatch(togglewishlistAction(productId))
  };

  const addtoCart = (productId) => {
    dispatch(addtocartAction(productId))
  };


  return (
    <div className="main">
      <h4 className="head mx-5">TOP SELLING</h4>
      <div className="CARDS gap-3 row">
        {TopsellingProducts.map((product) => {
          
          const inwishlist = isInWishlist(product._id)

          return (
            <div key={product._id} className="card">

              <i className={`whishlisticon fa-heart ${inwishlist ? "fa-solid" : "fa-regular"}  `}
                onClick={() => { toggleWishlist(product._id) }}
                style={{ color: inwishlist ? "red" : "#ccc" }}>
              </i>

              <img src={product.thumbnail} className="card-img-top" alt={product.title} />
              <div className="card-body">
                <p className="title">{product.title}</p>
                <div className="prices">
                  <span className="dis">₹ {product.price}</span>
                  <span> ₹{product.price - product.discount}</span>

                </div>
                <div onClick={() => addtoCart(product._id)} className="card-button  ">
                  <span className='cart-button-icon'>
                    <i className=" fa-solid fa-cart-shopping " > </i>
                  </span>
                  <p className='mb-1'>Add to cart</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Topselling;

