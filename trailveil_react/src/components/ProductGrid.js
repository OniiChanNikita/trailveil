import React, { useEffect, useRef, useState } from "react";
import "./ProductGrid.css";
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';

const products = [
  { id: 1, img: "/media/123123.jpg", name: "Темный худи", price: "5 600 ₽" },
  { id: 2, img: "/media/123123.jpg", name: "Маска без лица", price: "3 200 ₽" },
  { id: 3, img: "/media/123123.jpg", name: "Альпинистская куртка", price: "12 800 ₽" },
  { id: 4, img: "/media/123123.jpg", name: "Перчатки из тумана", price: "4 000 ₽" },
];

const ProductGrid = () => {
  return (
    <div className="product-content">
      <div className="product-selection">

        <div className="product-item">
          <img src="/media/3.png" />
          <div>
            <p className="product-name">Cargo Parachute Pants </p>
            <p className="product-price">price</p>
          </div>
        </div>
        <div className="product-item">
          <img src="/media/3.png" />
          <div>
            <p className="product-name">Text</p>
            <p className="product-price">price</p>
          </div>
        </div>
        <div className="product-item">
          <img src="/media/3.png" />
          <div>
            <p className="product-name">Text</p>
            <p className="product-price">price</p>
          </div>
        </div>
        <div className="product-item">
          <img src="/media/3.png" />
          <div>
            <p className="product-name">Text</p>
            <p className="product-price">price</p>
          </div>
        </div>
      </div>
        <div className='product-gradient-blur'>
        <button className="sign-btn">
          <span className="blue-circle" />
          <div style={{display: 'flex', justifyContent: "space-between"}}>
            <span style = {{marginLeft: "12px"}} className="reverse-type">shop</span>
            <span style = {{fontSize: "10px"}} className="reverse-type">835m</span>
          </div>
        </button>
        </div>
    </div>
  );
};

export default ProductGrid;
