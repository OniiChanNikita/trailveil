import React, { useRef, useState, useEffect } from "react";
import "./ImagesSlider.css";

const ImagesSlider = () => {
  const containerRef = useRef(null);
  const [position, setPosition] = useState(50); // %
  const [isDragging, setIsDragging] = useState(false);

  const handleMouseDown = () => {
    setIsDragging(true);
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleMouseMove = (e) => {
    if (!isDragging) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const percent = (x / rect.width) * 100;
    setPosition(Math.max(0, Math.min(100, percent)));
  };

  // Убираем drag при отпускании вне элемента
  useEffect(() => {
    document.addEventListener("mouseup", handleMouseUp);
    document.addEventListener("mousemove", handleMouseMove);
    return () => {
      document.removeEventListener("mouseup", handleMouseUp);
      document.removeEventListener("mousemove", handleMouseMove);
    };
  }, [isDragging]);

  return (
    <div className="slider-showing-container">
      <div className="slider-showing-text">
        <h1 className="mountain-title">Beyond Style, Built for Survival</h1>
        <p className="mountain-paragraph">
          So you can step outside and not care where the day takes you — into the woods, the city,
          a storm, or a post-rain street — and still feel and look your best.
        </p>
      </div>
      <div ref={containerRef} className="slider-container">
        <img src="/media/mountain_slider.jpg" alt="Mountains" className="background-image" />
        <img
          src="/media/city_slider.jpg"
          alt="City"
          className="foreground-image"
          style={{ clipPath: `inset(0 0 0 ${position}%)` }}
        />
        <img src="/media/3.png" alt="Person" className="person-image" />

        {/* Разделительная палка */}
        <div className="divider-line" style={{ left: `${position}%` }}>
          <div className="slider-handle" onMouseDown={handleMouseDown}></div>
        </div>
      </div>
    </div>
  );
};

export default ImagesSlider;
