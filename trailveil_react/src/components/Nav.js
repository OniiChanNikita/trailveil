import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom';


const Nav = () => {
  const user = useSelector((state) => state.auth.user)
  console.log(user)
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
{/*        <li>About</li>
        <li>Contact</li>*/}
        <li><Link to='/products'>
            Products
          </Link></li>
        {user && ( 
        <li>
          <Link to={user ? '/logout' : '/login'}>
            Logout
          </Link>
        </li>
        )}
        <li>
          <Link to={user ? '/profile' : '/login'}>
            {user ? user : 'Login'}
          </Link>
        </li>

      </ul>
    </nav>
  );
};


export default Nav;