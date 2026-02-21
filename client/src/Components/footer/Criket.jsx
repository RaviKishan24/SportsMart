import React from 'react';
import './criket.css'; // Make sure you have this CSS file for styling

const Cricket = () => {
  const products = [
    {
      title: 'Cricket Bat - Grade 1 English Willow',
      price: '₹5999',
      originalPrice: '₹7999',
      images: [
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQlSYfKtC_rBa3p8w1W5ZAn1oxFqIO0TZBxdrzaHovrzgjPSSYfX84mnk57ylzJCg_p-fq4&s', // Image 1 (Cricket Bat)
        
      ],
      description: 'A high-quality Grade 1 English willow cricket bat, perfect for professional and amateur players.',
    },
    {
      title: 'Cricket Helmet - Protective Gear',
      price: '₹2999',
      originalPrice: '₹3999',
      images: [
        'https://encrypted-tbn0.gstatic.com/shopping?q=tbn:ANd9GcSJHiD5kXpLOqTO-teBCjv-b5RjXi0RR_3tsYsQfz5nUlLBfroWvaeNZUNHfjHAE5HcWenDmUB9yd1DhlfOq2t-ejKvZLZVqgoedZ8Ca2Ri3_YdzLJ4Qqvy', // Image 1 (Cricket Helmet)
        // Image 2 (Cricket Logo)
      ],
      description: 'A lightweight and comfortable cricket helmet that ensures safety without compromising on visibility.',
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

export default Cricket;
