import React from 'react';
import './ProductCard.css';

const ProductCard = ({ image, name, price }) => {
  return (
    <div className="product-card headlamp-effect">
      <div className="light-spot" />
      <div className="particles" />
      <img src={image} alt={name} className="product-img" />
      <h3>{name}</h3>
      <p>{price}</p>
    </div>
  );
};

export default ProductCard;
