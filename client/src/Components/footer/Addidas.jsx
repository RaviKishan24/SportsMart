import React from 'react';
import './puma.css'; // Make sure you have this CSS file for styling

const Addidas = () => {
  const products = [
    {
      title: 'Adidas Ultraboost Running Shoes',
      price: '₹9999',
      originalPrice: '₹11999',
      images: [
        'https://rukminim2.flixcart.com/image/612/612/xif0q/shoe/c/k/f/11-id5935-11-adidas-shanav-shanav-gretwo-original-imah6hzfv6tydrdq.jpeg?q=70', // Image 1 (Adidas Ultraboost Running Shoes)
       
      ],
      description: 'Comfortable and responsive running shoes with a Boost midsole for energy return.',
    },
    {
      title: 'Adidas Superstar Sneakers',
      price: '₹4999',
      originalPrice: '₹6999',
      images: [
        'https://rukminim2.flixcart.com/image/612/612/xif0q/shoe/8/h/d/-original-imah4kgzxdhanefr.jpeg?q=70', // Image 1 (Adidas Superstar Sneakers)
        
      ],
      description: 'Classic street-style sneakers with a durable rubber shell toe and a leather upper.',
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

export default Addidas;
