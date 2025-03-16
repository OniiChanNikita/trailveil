import React from 'react';
import Header from '../components/Header';
import Nav from '../components/Nav';
import ProductGrid from '../components/ProductGrid';
import PersonGorp from '../components/PersonGorp';
import './Home.css';

import { useSelector } from "react-redux";


const Home = () => {
  const username = useSelector((state) => state.auth.user);
  const token = useSelector((state) => state.auth.token);
  console.log(username, token)

  return (

    <div className="App">
      <Nav />
      <Header />
      <ProductGrid />
      <PersonGorp />
      <div className = 'opium-gradient-div'>
        <ProductGrid />
      </div>
      <main>
        <section id="home">
          <h1>Welcome to Gorpcore</h1>
          <p>Explore the latest in outdoor fashion.</p>
        </section>
        <section id="about">
          <h2>About Us</h2>
          <p>We are passionate about outdoor adventures and stylish gear.</p>
        </section>
        <section id="contact">
          <h2>Contact Us</h2>
          <p>Get in touch with us for more information.</p>
        </section>
      </main>
    </div>
  );
};

export default Home;