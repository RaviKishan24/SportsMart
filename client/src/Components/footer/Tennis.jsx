import React from 'react';
import './criket.css'; // Ensure this CSS file is applied

const Tennis = () => {
  const products = [
    {
      title: 'Wilson Pro Staff RF97 Autograph Tennis Racket',
      price: '₹24999',
      originalPrice: '₹29999',
      images: [
        'https://encrypted-tbn1.gstatic.com/shopping?q=tbn:ANd9GcRj3ff2GJJKhdukRMqDYBAjV79GFGaHWHFf2QATzI9Us-tlC7LbZk0_i-BIlzgUj567ELJRyDlyZqahzvX_5SKtea2s42yI4UcWaYo7gG66zsacW5WMY0PnGA&usqp=CAE'
      ],
      description: 'The Wilson Pro Staff RF97 Autograph is the choice of professional players, offering exceptional control and power. Perfect for advanced tennis enthusiasts.',
    },
    {
      title: 'Head Graphene 360+ Speed Pro Tennis Racket',
      price: '₹19999',
      originalPrice: '₹24999',
      images: [
        'https://cdnmedia.racquets4u.com/media/iopt/catalog/product/cache/cd3f430ba3d61418b233993754ed59dd/h/e/head-speed-team-2022-tennis-racquet-unstrung.webp', // Image 2 (Head Logo)
      ],
      description: 'Designed for players who crave speed and precision, the Head Graphene 360+ Speed Pro racket delivers superior stability and control.',
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

export default Tennis;
