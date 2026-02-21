import React from 'react';
import './criket.css'; // Ensure this CSS file is applied

const Archery = () => {
  const products = [
    {
      title: 'Bear Archery Legit Compound Bow',
      price: '₹17999',
      originalPrice: '₹22999',
      images: [
        'https://encrypted-tbn0.gstatic.com/shopping?q=tbn:ANd9GcRDQi1N_CXFq4NYOuAz0B_T9x5OK3xrvx0V7Hq8Ll6bJIx88UaDPMYw99EDtNCERL46SU2VInuxz1PHkzUi1iPaIGmpHYFbDHplWVleeJeR', // Image 1 (Bear Archery Bow)
         
      ],
      description: 'The Bear Archery Legit Compound Bow is designed for beginners and experts alike, offering precision and versatility for archers of all levels.',
    },
    {
      title: 'Genesis Original Bow',
      price: '₹8499',
      originalPrice: '₹11999',
      images: [
        'https://encrypted-tbn2.gstatic.com/shopping?q=tbn:ANd9GcREVYlanSlr6vwwLsSkoX6awUWF7qm9ESYnUkTBZUNKaYFq-VWHKXrYhOZrNiWEL42jw-wAPfMonMdHmUf8t5jW-nEbeZmVJWTahlyToZqbHM4dMiX5KQsm' // Image 2 (Genesis Logo)
      ],
      description: 'The Genesis Original Bow is a perfect choice for first-time archers. Its innovative design makes it adjustable for all skill levels.',
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

export default Archery;
