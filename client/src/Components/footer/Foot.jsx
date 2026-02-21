import React from 'react';
import './criket.css'; // Make sure you have this CSS file for styling

const Foot = () => {
  const products = [
    {
      title: 'Grained PU Stitched Training Football ',
      price: '₹5999',
      originalPrice: '₹7999',
      images: [
        'https://m.media-amazon.com/images/I/51JbAdDuPPL._AC_UL480_FMwebp_QL65_.jpg', // Image 1 (Nike Vapor 14)
        // Image 2 (Nike Logo)
      ],
      description: 'Engineered for speed, the Nike Vapor 14 Pro Football Shoes provide lightweight support and explosive traction on firm ground pitches.',
    },
    {
      title: 'Cosco Thunder Football, Size 5',
      price: '₹5999',
      originalPrice: '₹7999',
      images: [
        'https://m.media-amazon.com/images/I/819B3CLexjL._SX679_.jpg', // Image 1 (Adidas Predator)
         // Image 2 (Adidas Logo)
      ],
      description: 'The Adidas Predator Freak 2.0 Football Shoes feature an innovative design for precision control and power to dominate on the field.',
    },
  ];

  return (
    <div className="page-container">
      {products.map((product, index) => (
        <div key={index} className="product-container">
          <h2 className="product-title">{product.title}</h2>

          <div className="product-price">
            <span className="price-text">{product.price}</span>
            <span className="price-discount">{product.originalPrice}</span>
          </div>

          <div className="product-images">
            {product.images.map((image, idx) => (
              <img key={idx} src={image} alt={product.title} className="product-image" />
            ))}
          </div>

          <p className="product-description">{product.description}</p>
        </div>
      ))}
    </div>
  );
};

export default Foot;
