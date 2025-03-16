const ProductCard = ({ product, square, small }) => {
  return (
    <div
      className={`product-card ${square ? "square" : ""} ${small ? "small" : ""}`}
    >
      <img src={product.image} alt={product.name} />
      <h3>{product.name}</h3>
      <p>{product.price} €</p>
    </div>
  );
};

export default ProductCard;
  