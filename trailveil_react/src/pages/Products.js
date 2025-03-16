import React, { useEffect, useState } from "react";
import "./Products.css";
import Nav from "../components/Nav.js";

const products_list = [
  { id: 1, name: "Gore-Tex Jacket", price: "$199", image: "https://techwear-shadxw.de/cdn/shop/files/gorpcore-jacket-techwear-885_grande.webp?v=1693335346" },
  { id: 2, name: "Hiking Boots", price: "$149", image: "https://media.gq-magazin.de/photos/65f1b87b6c762afdfa33e70b/3:2/w_2560%2Cc_limit/GettyImages-1458857158.jpg" },
  { id: 3, name: "Thermal Gloves", price: "$39", image: "https://media.gq-magazin.de/photos/65f2c4d845ba6810ceb78b56/master/w_1600%2Cc_limit/GettyImages-1337376082.jpg" },
  { id: 4, name: "Backpack", price: "$99", image: "https://img01.ztat.net/article/spp-media-p1/8f3727c167394a64a034e920e0dc39e5/914de6d261394a61a5cbae5d733ab622.jpg?imwidth=1800" },
  { id: 5, name: "Windbreaker", price: "$129", image: "https://img4.dhresource.com/webp/m/0x0/f3/albu/km/s/10/83963b6a-a48a-43de-9562-a134d46f0216.png" },
  { id: 6, name: "Windbreaker", price: "$129", image: "https://techwear-shadxw.de/cdn/shop/articles/what-is-gorpcore.jpg?crop=center&height=1200&v=1693331880&width=1200" },
  { id: 7, name: "Windbreaker", price: "$129", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTUO8yc0fuHOHK6M6-RbLSoGBXIanYkPIYwgw&s" },
  { id: 8, name: "Windbreaker", price: "$129", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT8s3aCBER8xcJUj45Ch2euMohJaMmCTXBiXw&s" },
  { id: 9, name: "Windbreaker", price: "$129", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ5ICP-ehREC0TDkkGZa-foccfKCtYfn298Vg&s" },
];

const Products = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {

    /*const savedProducts = sessionStorage.getItem('products');
    if (savedProducts) {
      setProducts(JSON.parse(savedProducts));
    } else {
      setProducts(products_list);
    }*/
    setProducts(products_list)
  }, []);

  return (
    <div>
      <Nav />
      <div className="container">
        <aside className="sidebar">
          <h3>Фильтры</h3>

          <div className="filter-group">
            <label for="price">Цена:</label>
            <input type="range" id="price" className="price-range" min="0" max="1000" step="10"/>
          </div>

          <div className="filter-group">
            <label>Категории:</label>
            <label className="product-checkbox">
              <input type="checkbox"/> Товары A
            </label>
            <label className="product-checkbox">
              <input type="checkbox"/> Товары B
            </label>
            <label className="product-checkbox">
              <input type="checkbox"/> Товары C
            </label>
          </div>

          <div className="filter-group">
            <label for="search">Поиск:</label>
            <input type="text" id="search" className="search-input" placeholder="Введите название..."/>
          </div>
        </aside>

        <div className="products-container">
            {/* Первая часть */}
            <div className="products-left">
              {products_list.slice(0, 3).map((product) => (
                <div key={product.id} className="product-card">
                  <img src={product.image} alt={product.name} className="product-image" />
                  <div className="product-info">
                    <h3>{product.name}</h3>
                    <p>{product.price}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Вторая часть */}
            <div className="products-center">
              {products_list.slice(3, 6).map((product) => (
                <div key={product.id} className="product-card">
                  <img src={product.image} alt={product.name} className="product-image" />
                  <div className="product-info">
                    <h3>{product.name}</h3>
                    <p>{product.price}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Третья часть */}
            <div className="products-right">
              {products.slice(6, 9).map((product) => (
                <div key={product.id} className="product-card">
                  <img src={product.image} alt={product.name} className="product-image" />
                  <div className="product-info">
                    <h3>{product.name}</h3>
                    <p>{product.price}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
  );
};

export default Products