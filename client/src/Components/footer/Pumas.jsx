import React from 'react';
import './puma.css'; // Make sure you have this CSS file for styling

const Pumas = () => {
  const products = [
    {
      title: 'Puma Running Shoes',
      price: '₹2999',
      originalPrice: '₹3999',
      images: [
       ' https://rukminim2.flixcart.com/image/612/612/xif0q/shoe/s/9/z/11-312077-puma-white-electric-peppermint-original-imah9h24afg8hbyz.jpeg?q=70',
       'https://rukminim2.flixcart.com/image/612/612/xif0q/shoe/q/g/j/-original-imah4ac9namghz3w.jpeg?q=70'
      ],
      description: 'Comfortable and lightweight running shoes with breathable mesh material for better airflow.',
    },
    {
      title: 'Puma Sports Sneakers',
      price: '₹2599',
      originalPrice: '₹3499',
      images: [
        'https://rukminim2.flixcart.com/image/612/612/xif0q/shoe/e/n/d/10-white-leaf-10-urbanbox-white-black-original-imah9fauwe4adpth.jpeg?q=70',  // Image 1
        'https://rukminim2.flixcart.com/image/612/612/xif0q/shoe/r/x/d/-original-imahan49zmzx9fxn.jpeg?q=70',  // Image 2
      ],
      description: 'Perfect for everyday use, these sneakers offer durability and style for sports enthusiasts.',
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

export default Pumas;
