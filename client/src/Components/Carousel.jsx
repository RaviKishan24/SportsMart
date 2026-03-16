import React from 'react';
import './Carousel.css';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Autoplay } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/navigation';

import c1 from '../assets/crowsel/c1.png';
import c2 from '../assets/crowsel/c2.jpg';
import c3 from '../assets/crowsel/c3.png';
import c4 from '../assets/crowsel/c4.jpg';
import c5 from '../assets/crowsel/c5.webp';
import c6 from '../assets/crowsel/c6.webp';

const images = [c1, c2, c3, c4, c5, c6];

function Carousel() {
  return (
    <div className='crousle'>
      <Swiper
        modules={[Navigation, Autoplay]}
breakpoints={{
  320: {
    slidesPerView: 3,
  },
  768: {
    slidesPerView: 2,
  },
  1024: {
    slidesPerView: 1,
  },
}}
        spaceBetween={50}
        slidesPerView={3}

        navigation={true}

        autoplay={{
          delay: 2000,
          disableOnInteraction: false,
        }}

        loop={true}

      >
        {images.map((img, index) => (
          <SwiperSlide key={index}>
            <img src={img} alt={`slide-${index}`} />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}

export default Carousel;