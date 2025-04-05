import React, { useEffect, useRef, useState } from "react";
import "./ProductGrid1.css";
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';

const products = [
  { id: 1, img: "/media/123123.jpg", name: "Темный худи", price: "5 600 ₽" },
  { id: 2, img: "/media/123123.jpg", name: "Маска без лица", price: "3 200 ₽" },
  { id: 3, img: "/media/123123.jpg", name: "Альпинистская куртка", price: "12 800 ₽" },
  { id: 4, img: "/media/123123.jpg", name: "Перчатки из тумана", price: "4 000 ₽" },
];

const ProductGrid1 = () => {
  const lightRef = useRef(null);
  const canvasRef = useRef(null);
  const [mouse, setMouse] = useState({ x: 0.5, y: 0.5 });

  const [currentIndex, setCurrentIndex] = useState(0);
  const [fade, setFade] = useState(false);

  const nextProduct = () => {
    setFade(true);
    setTimeout(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % products.length);
      setFade(false);
    }, 300); // Длительность анимации
  };

  const prevProduct = () => {
    setFade(true);
    setTimeout(() => {
      setCurrentIndex((prevIndex) => (prevIndex - 1 + products.length) % products.length);
      setFade(false);
    }, 300);
  };

  useEffect(() => {
    const handleMouseMove = (e) => {
      const x = e.clientX / window.innerWidth;
      const y = e.clientY / window.innerHeight;
      setMouse({ x, y });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const particles = Array.from({ length: 500 }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      size: Math.random() * 2 + 0.5,
      speedX: Math.random() * Math.random(0.5, 1) - 0.1,
      speedY: Math.random() * Math.random(0.2, 1) - 0.1,
    }));

    function animate() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particles.forEach((p) => {
        p.x += p.speedX;
        p.y += p.speedY;

        if (p.x < 0) p.x = canvas.width;
        if (p.x > canvas.width) p.x = 0;
        if (p.y < 0) p.y = canvas.height;
        if (p.y > canvas.height) p.y = 0;

        const distToLight =
          lightRef.current &&
          Math.hypot(
            p.x - (lightRef.current.offsetLeft + 500),
            p.y - (lightRef.current.offsetTop + 500)
          );

        let alpha = distToLight < 500 ? 0.15 : 0.02;

        ctx.fillStyle = `rgba(255,255,255,${alpha})`;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();
      });

      requestAnimationFrame(animate);
    }

    animate();
  }, []);

  return (
    <div className="product-section"
      style={{
        }}>

      
      <div className="stones-bg"></div>
      <canvas ref={canvasRef} className="dust-layer"></canvas>

      <div
        ref={lightRef}
        className="light-cone"
        style={{
          transform: `translate(${mouse.x * 40 - 10}px, ${mouse.y * 40 - 10}px)`,
        }}
      ></div>

      <div className="product-grid">
        <button className="arrow" style={{ left: '5%' }} onClick={prevProduct}>
          <FaChevronLeft size={30} />
        </button>

        <div style={{opacity: fade ? 0 : 1, transition: 'opacity 0.3s ease-in-out'}} className="product-item">
          <img src={products[currentIndex].img} alt={products[currentIndex].name} />
          <p className="product-name">{products[currentIndex].name}</p>
          <p className="product-price">{products[currentIndex].price}</p>
        </div>

         <button className="arrow" style={{ right: '5%' }} onClick={nextProduct}>
        <FaChevronRight size={30} />
      </button>
      </div>
    </div>
  );
};

export default ProductGrid1;
