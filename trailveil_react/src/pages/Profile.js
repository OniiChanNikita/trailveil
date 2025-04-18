import React, { useState, useEffect } from 'react';
import { FiUser, FiHeart, FiSettings, FiShoppingCart, FiChevronDown, FiBell } from 'react-icons/fi';
import { Box, CssBaseline, Toolbar, Typography, CircularProgress } from '@mui/material';
import RecentlyViewProduct from "../components/ProfileComponents/RecentlyViewProduct.js";
import { Navigate } from "react-router-dom";
import { useNavigate, Outlet } from 'react-router-dom';
import axios from 'axios';
import api from "../lib/axiosMiddleware"



const Profile = () => {
  const [loading, setLoading] = useState(true);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [showCart, setShowCart] = useState(false);
  const navigate = useNavigate()

  const [user, setUser] = useState({})
  const [countNewMessages, setCountNewMessages] = useState(0)
  const [countOrders, setCountOrders] = useState(0)
  const [carts, setCarts] = useState({})

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await api.get(`http://users.localhost/users_service/me`);

        if (!response.data.is_staff) {
          navigate('/')
          return;
        }

        console.log(response.data)

        setUser(response.data);
      } catch (error) {
        console.error('Ошибка при получении данных пользователя:', error);
        navigate('/');
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [navigate]);

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh">
        <CircularProgress />
      </Box>
    );
  }
  return (
    <div className="min-h-screen bg-stone-950 text-stone-100 font-sans">
      {/* Header (как в вашем макете) */}
      <header className="bg-black py-4 px-6 flex justify-between items-center border-b border-stone-800">
        <div className="text-2xl font-bold text-white tracking-tighter">TRAILVEIL</div>
        
        <nav className="hidden md:flex space-x-8">
          <a href="#" className="text-stone-300 hover:text-white">Home</a>
          <a href="#" className="text-stone-300 hover:text-white">Products</a>
          <a href="#" className="text-stone-300 hover:text-white">Layout</a>
        </nav>
        
        <div className="flex items-center space-x-4">
          <button 
            className="w-auto bg-stone-800 relative p-2 hover:bg-stone-800 rounded-md transition-all"
            onClick={() => setShowCart(!showCart)}
          >
            <FiShoppingCart className="text-xl" />
            <span className="absolute -top-1 -right-1 bg-amber-500 text-xs rounded-full h-5 w-5 flex items-center justify-center text-black font-bold">3</span>
          </button>
          
          <div className="relative">
            <button 
              className="flex w-auto bg-transparent items-center space-x-1 hover:bg-stone-800 px-3 py-1.5 rounded-md transition-all group"
              onClick={() => setShowProfileMenu(!showProfileMenu)}
            >
              <span className="font-medium group-hover:text-amber-400">{user.username}</span>
              <FiChevronDown className={`transition-transform ${showProfileMenu ? 'rotate-180' : ''}`} />
            </button>
            
            {showProfileMenu && (
              <div className="absolute right-0 mt-2 w-56 bg-stone-900 rounded-md shadow-xl py-1 z-50 border border-stone-700">
                <div className="px-4 py-3 border-b border-stone-800">
                  <p className="font-medium">superadmin@trailveil.com</p>
                  <p className="text-xs text-stone-400">Premium member</p>
                </div>
                <button className="w-full bg-transparent px-4 py-3 text-stone-200 hover:bg-stone-800 text-left">
                  <div className="flex items-center w-full">
                    <FiBell className="mr-3 text-amber-400" />
                    <span>Messages {`(${countNewMessages})`}</span>
                  </div>
                </button>
                <button className="w-full bg-transparent px-4 py-3 text-stone-200 hover:bg-stone-800 text-left">
                  <div className="flex items-center w-full">
                    <FiSettings className="mr-3" />
                    <span>Account settings</span>
                  </div>
                </button>



              </div>
            )}
          </div>
        </div>
      </header>

      {/* Main Content - переработанный */}
      <main className="p-6">
        {/* Hero Section */}
        <div className="relative h-80 md:h-96 mb-12 rounded-xl overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent z-10"></div>
          <div className="absolute inset-0 flex items-end z-20 p-8 md:p-12">
            <div>
              <h1 className="text-4xl md:text-5xl font-bold mb-2">SHADOW PACK</h1>
              <p className="text-stone-300 max-w-md mb-6">Technical apparel for urban explorers. Designed in the dark.</p>
              <button className="w-auto bg-amber-500 text-black px-6 py-2 rounded-lg font-semibold hover:bg-amber-400 transition duration-200 ease-in-out">
                Explore Collection
              </button>

            </div>
          </div>
          <img 
            src="/media/mountain_profile.png" 
            alt="Gorpcore collection"
            className="absolute inset-0 w-full h-full object-cover opacity-90"
          />
        </div>

        {/* User Dashboard - компактный и информативный */}
        <div className="max-w-6xl mx-auto mb-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* User Card */}
            <div className="bg-stone-900 p-6 rounded-xl border border-stone-800">
              <div className="flex items-center mb-4">
                <div className="h-12 w-12 rounded-full bg-stone-800 mr-4 flex items-center justify-center text-amber-400">
                  <FiUser size={20} />
                </div>
                <div>
                  <h2 className="font-bold">{user.username}</h2>
                  <p className="text-xs text-stone-400">Member since {user.created_at}</p>
                </div>
              </div>
              <div className="flex justify-between text-sm">
                <div>
                  <p className="text-stone-400">Orders</p>
                  <p className="font-medium">{countOrders}</p>
                </div>
                <div>
                  <p className="text-stone-400">Whislist</p>
                  <p className="font-medium">{user.wishlist.length}</p>
                </div>
                <div>
                  <p className="text-stone-400">Status</p>
                  <p className="text-amber-400 font-medium">Premium</p>
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-stone-900 p-6 rounded-xl border border-stone-800">
              <h3 className="font-bold mb-4 flex items-center">
                <FiSettings className="mr-2" />
                Quick actions
              </h3>
              <div className="space-y-3">
                <button className="w-full text-left py-2 px-3 bg-stone-800 hover:bg-stone-700 rounded-md transition-all">
                  Edit profile
                </button>
                <button className="w-full text-left py-2 px-3 bg-stone-800 hover:bg-stone-700 rounded-md transition-all">
                  View order history
                </button>
                <button className="w-full text-left py-2 px-3 bg-stone-800 hover:bg-stone-700 rounded-md transition-all">
                  Payment methods
                </button>
              </div>
            </div>

            {/* Recent Activity */}
            <div className="bg-stone-900 p-6 rounded-xl border border-stone-800">
              <h3 className="font-bold mb-4">Recent activity</h3>
              <div className="space-y-3 overflow-hidden">
                <div className="text-sm">
                  <p className="font-medium">Order #TV-2874 shipped</p>
                  <p className="text-stone-400">2 days ago</p>
                </div>
                <div className="text-sm">
                  <p className="font-medium">Added "Ash Cargo Pants" to wishlist</p>
                  <p className="text-stone-400">1 week ago</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Featured Products */}
        <RecentlyViewProduct products={{}} /> 
        
      </main>

      {/* Shopping Cart - улучшенный */}
      {showCart && (
        <div className="fixed inset-0 z-50 overflow-hidden">
          <div className="absolute inset-0 bg-black/70" onClick={() => setShowCart(false)}></div>
          <div className="absolute right-0 top-0 bottom-0 w-full max-w-md bg-stone-950 shadow-xl border-l border-stone-800 flex flex-col">
            <div className="flex justify-between items-center p-6 border-b border-stone-800">
              <h2 className="text-xl font-bold">YOUR CART (3)</h2>
              <button onClick={() => setShowCart(false)} className="bg-transparent text-stone-400 hover:text-white">
                ✕
              </button>
            </div>
            <div className="flex-grow overflow-y-auto p-6 space-y-4">
              {[1, 2, 3].map((item) => (
                <div key={item} className="flex justify-between items-start p-4 bg-stone-900 rounded-lg border border-stone-800">
                  <div className="flex space-x-4">
                    <div className="w-16 h-16 bg-stone-800 rounded-md"></div>
                    <div>
                      <h3 className="font-medium">Shadow Tech Jacket {item}</h3>
                      <p className="text-stone-400 text-sm">Size: M</p>
                      <p className="text-amber-400 text-sm">In stock</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-bold">${(220 + item * 15).toFixed(2)}</p>
                    <button className="bg-transparent w-auto text-xs text-stone-400 hover:text-amber-400 mt-2">Remove</button>
                  </div>
                </div>
              ))}
            </div>
            <div className="p-6 border-t border-stone-800">
              <div className="flex justify-between mb-6">
                <span>Subtotal</span>
                <span className="font-bold">$685.00</span>
              </div>
              <button className="w-full bg-amber-500 text-black py-3.5 rounded-md font-bold hover:bg-amber-400 transition-all">
                PROCEED TO CHECKOUT
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Profile;