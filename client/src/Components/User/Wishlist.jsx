import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchwishlistproductAction, togglewishlistAction } from '../../redux/actions/cart'
import "./Wishlist.css"

function Wishlist() {
    const dispatch = useDispatch()
    const user = useSelector((state) => state.userGS.user) || {}
    const WishlistProducts = user.wishlist || [];

    useEffect(() => {
        if (user?._id) {
            dispatch(fetchwishlistproductAction());
        }
    }, [dispatch, user?._id])

    const isInWishlist = (productId) => { return WishlistProducts.some((item) => item.productId === productId) }

    const removefromwishlist = (productId) => {
        dispatch(togglewishlistAction(productId))
    }

    return (
        <div className=' wishlist-main '>
            {WishlistProducts.map((item) => {
                const inwishlist = isInWishlist(item.productId)
                return (
                    <div className='wishlist-cart-container' key={item._productId}>
                        <div className="wishlist-cart-details">
                            <div className='wishlist-cart-item'>
                                <div className='wishlist-product-info'>
                                    <img className='wishlist-cart-img' src={item.thumbnail} alt="" />
                                    <div className='wishlist-product-text'>
                                        <h6 className='wishlist-Product-title'>{item.title}</h6>

                                        <i className={`wishlist-icon ${inwishlist ? "fa-solid" : "fa-regular"} fa-heart`}
                                            onClick={() => { removefromwishlist(item.productId) }}
                                            style={{ color: inwishlist ? "red" : "#ccc" }}>
                                        </i>
                                        <div className='wishlist-price-info'>
                                            <p className='wishlist-original-price'>₹{item.price}</p>
                                            <p className='wishlist-discounted-price'>₹{item.price - item.discount}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className='wishlist-button-container'>
                                <button className='wishlist-cursor-pointer'>Buy Now</button>
                                <button className='wishlist-cursor-pointer'>Add to Cart</button>
                            </div>
                        </div>

                    </div>
                )
            })}
        </div>
    )
}

export default Wishlist
