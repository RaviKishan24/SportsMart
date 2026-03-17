import React, { useEffect } from 'react';
import './Topselling.css';
import { useDispatch, useSelector } from 'react-redux';
import {
  addtocartAction,
  fetchcartproductAction,
  fetchwishlistproductAction,
  togglewishlistAction,
} from '../redux/actions/cart';
import { fetchProductAction } from '../redux/actions/product';

// 🔥 SWIPER IMPORT
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { Navigation, Pagination } from 'swiper/modules';

function Topselling() {
  const user = useSelector((state) => state.userGS.user) || [];
  const data = useSelector((store) => store.productGS.data) || [];

  const wishlist = user.wishlist || [];

  const TopsellingProducts = data.filter(
    (product) => product.category === 'topselling'
  );

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchProductAction());
    if (user?._id) {
      dispatch(fetchwishlistproductAction());
      dispatch(fetchcartproductAction());
    }
  }, [dispatch, user?._id]);

  const isInWishlist = (productId) => {
    return wishlist.some((item) => item.productId === productId);
  };

  const toggleWishlist = (productId) => {
    dispatch(togglewishlistAction(productId));
  };

  const addtoCart = (productId) => {
    dispatch(addtocartAction(productId));
  };

  return (
    <div className="main">
      <h4 className="head mx-5">New Arrivals</h4>

      {/* 🔥 SWIPER START */}
      <Swiper
        modules={[Navigation, Pagination]}
        spaceBetween={20}
        navigation
        pagination={{ clickable: true }}
        breakpoints={{
          1200: { slidesPerView: 4 }, // Desktop
          992: { slidesPerView: 3 },  // Laptop
          768: { slidesPerView: 2 },  // Tablet
          0: { slidesPerView: 1 },    // Mobile
        }}
      >
        {TopsellingProducts.map((product) => {
          const inwishlist = isInWishlist(product._id);

          return (
            <SwiperSlide key={product._id}>
              <div className="card">

                <i
                  className={`whishlisticon fa-heart ${
                    inwishlist ? 'fa-solid' : 'fa-regular'
                  }`}
                  onClick={() => toggleWishlist(product._id)}
                  style={{ color: inwishlist ? 'red' : '#ccc' }}
                ></i>

                <img
                  src={product.thumbnail}
                  className="card-img-top"
                  alt={product.title}
                />

                <div className="card-body">
                  <p className="title">{product.title}</p>

                  <div className="prices">
                    <span className="dis">₹ {product.price}</span>
                    <span> ₹{product.price - product.discount}</span>
                  </div>

                  <div
                    onClick={() => addtoCart(product._id)}
                    className="card-button"
                  >
                    <span className="cart-button-icon">
                      <i className="fa-solid fa-cart-shopping"></i>
                    </span>
                    <p className="mb-1">Add to cart</p>
                  </div>
                </div>

              </div>
            </SwiperSlide>
          );
        })}
      </Swiper>
      {/* 🔥 SWIPER END */}
    </div>
  );
}

export default Topselling;