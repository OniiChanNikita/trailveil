import React from 'react';

const ProductGrid = () => {
  const products = Array.from({ length: 10 }, (_, i) => ({
    id: i + 1,
    name: `Product ${i + 1}`,
    image: "/media/123123.jpg",
    price: `$${(i + 1) * 10}`,
  }));

  return (
    <div className="carousel-container">
      <div className="carousel">
        {products.map((product) => (
          <div key={product.id} className="product-card">
            <img
              src={product.image}
              alt={product.name}
              className="product-image"
            />
            <p className="product-name">{product.name}</p>
            <p className="product-price">{product.price}</p>
          </div>
        ))}
        <div className="more-card">Ещё...</div>
      </div>
      {/*<div className="more-text">Больше товаров</div>*/}
    </div>
  );
};

export default ProductGrid