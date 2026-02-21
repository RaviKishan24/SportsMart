import React from 'react';
import './Carousel.css';
import c1 from '../assets/crowsel/c1.png';
import c2 from '../assets/crowsel/c2.jpg';
import c3 from '../assets/crowsel/c3.png';
import c4 from '../assets/crowsel/c4.jpg';
import c5 from '../assets/crowsel/c5.webp';
import c6 from '../assets/crowsel/c6.webp';

const images = [c1, c2, c3, c4, c5, c6];

function Carousel() {
  return (
    <div id="carouselExampleAutoplaying" className="carousel slider " data-bs-ride="carousel">
      <div className="carousel-inner">
        {images.map((image, index) => (
          <div key={index} className={`carousel-item ${index === 0 ? 'active' : ''}`}>
            <img src={image} className="d-block w-100" alt={`carousel-image-${index}`} />
          </div>
        ))}
      </  div>
      <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleAutoplaying" data-bs-slide="prev">
        <span className="carousel-control-prev-icon" aria-hidden="true" />
        <span className="visually-hidden">Previous</span>
      </button>
      <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleAutoplaying" data-bs-slide="next">
        <span className="carousel-control-next-icon" aria-hidden="true" />
        <span className="visually-hidden">Next</span>
      </button>
    </div>
  );
}

export default Carousel;












