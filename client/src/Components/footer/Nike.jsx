import React from 'react';
import './puma.css'; // Make sure you have this CSS file for styling

const Nike = () => {
  const products = [
    {
      title: 'Nike Air Zoom Pegasus 38',
      price: '₹10999',
      originalPrice: '₹12999',
      images: [
        'https://m.media-amazon.com/images/I/410bD9Yvi9L._AC_UL480_FMwebp_QL65_.jpg', // Image 1 (Nike Air Zoom Pegasus 38)
        // 'https://m.media-amazon.com/images/I/61f9pDQDqlL._AC_UL480_FMwebp_QL65_.jpg'// Image 2 (Nike Logo)
      ],
      description: 'Lightweight and responsive running shoes with a breathable upper and Zoom Air cushioning.',
    },
    {
      title: 'Nike Air Max 270 React',
      price: '₹8999',
      originalPrice: '₹10999',
      images: [
        'https://m.media-amazon.com/images/I/611TEi615bL._AC_UL480_FMwebp_QL65_.jpg',
        // 'https://m.media-amazon.com/images/I/51UcgCzuwPL._AC_UL480_FMwebp_QL65_.jpg', // Image 2 (Nike Logo)
      ],
      description: 'A stylish sneaker with React foam and a Max Air unit for comfort, designed for all-day wear.',
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

export default Nike;
