import React, { useState, useEffect } from 'react';


const Nav = () => {

  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      const offset = window.pageYOffset;
      if (offset > 100) {
        setIsVisible(false);
      } else {
        setIsVisible(true);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  return (
    <nav className={`nav ${isVisible ? '' : 'hidden'}`} className="navbar">
      <div className="logo">TrailVeil</div>
      <ul className="nav-links">
        <li>Home</li>
        <li>About</li>
        <li>Contact</li>
      </ul>
    </nav>
  );
};


export default Nav;