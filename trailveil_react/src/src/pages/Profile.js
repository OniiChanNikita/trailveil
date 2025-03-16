import React, { useState } from 'react';
import "./Profile.css"
import Nav from "../components/Nav.js"



const Profile = () => {
  const [activeTab, setActiveTab] = useState('favoriteProducts'); // Переключение вкладок

  const toggleTab = (tab) => {
    setActiveTab(tab);
  };

  return (
    <div>
    <Nav/>

    <div className="profile-container">

      <div className="profile-background">
        <img
          src="media/fog.png" // Путь к картинке с туманом
          alt="Fog Background"
          className="profile-mountain"
        />
      </div>

      <div className="profile-info-container">
        <div className="profile-info">
          <img
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ1PyRnlyMgiEq9ghUzS-jS1vTpWufJWUeXEg&s" // Путь к аватару пользователя
            alt="Profile Avatar"
            className="profile-avatar"
          />
          <h1>John Doe</h1>
          <p className="profile-description">
            Enthusiast of Gorpcore, Mountain Life, and Adventure.
          </p>
          <p className="profile-location">Location: Somewhere in the Fog</p>
        </div>

        <section className="profile-tabs">
          <button
            className={`tab-button ${activeTab === 'favoriteProducts' ? 'active' : ''}`}
            onClick={() => toggleTab('favoriteProducts')}
          >
            My Favorite Products
          </button>
          <button
            className={`tab-button ${activeTab === 'setsOfProducts' ? 'active' : ''}`}
            onClick={() => toggleTab('setsOfProducts')}
          >
            My Sets of Products
          </button>
        </section>

        <section className="profile-products">
          {activeTab === 'favoriteProducts' && (
            <div className="product-cards">
              {/* Пример товаров */}
              <div className="product-card">
                <img src="/media/gear_1.jpg" alt="Product 1" className="product-image" />
                <p className="product-name">Tactical Jacket</p>
                <p className="product-price">$100</p>
              </div>
              <div className="product-card">
                <img src="/media/gear_2.jpg" alt="Product 2" className="product-image" />
                <p className="product-name">Hiking Boots</p>
                <p className="product-price">$150</p>
              </div>
              {/* Добавьте больше товаров */}
            </div>
          )}

          {activeTab === 'setsOfProducts' && (
            <div className="sets-cards">
              {/* Пример сета */}
              <div className="set-card">
                <p className="set-name">Set 1: Hiking Essentials</p>
                <ul>
                  <li>Backpack</li>
                  <li>Boots</li>
                  <li>Jacket</li>
                </ul>
              </div>
              <div className="set-card">
                <p className="set-name">Set 2: Winter Adventure</p>
                <ul>
                  <li>Winter Jacket</li>
                  <li>Gloves</li>
                  <li>Thermal Boots</li>
                </ul>
              </div>
              {/* Добавьте больше сетов */}
            </div>
          )}
        </section>
      </div>
    </div>
    </div>
  );
};

export default Profile;
