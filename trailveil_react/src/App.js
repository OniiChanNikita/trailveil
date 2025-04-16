import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Nav from "./components/Nav";
import Home from "./pages/Home";
import Shop from "./pages/Shop";
import About from "./pages/About";
import Contact from "./pages/Contact";
import NotFound from "./pages/NotFound";
import AuthPage from "./pages/AuthPage";
import Logout from "./pages/Logout";
import Profile from "./pages/Profile";
import ProductsPage from './pages/ProductsPage';
import AdminPage from './pages/AdminPage';
import ChatPage from './pages/ChatPage';

// Admin components
import Dashboard from "./components/adminComponents/Dashboard";
import Users from "./components/adminComponents/Users";
import Products from "./components/adminComponents/Products";
import AdminChat from "./components/adminComponents/AdminChat";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/shop" element={<Shop />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/login" element={<AuthPage isLogin={true}/>} />
        <Route path="/register" element={<AuthPage isLogin={false}/>} />
        <Route path="/logout" element={<Logout/>} />
        <Route path="/products" element={<ProductsPage />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/chat" element={<ChatPage />} />

        {/* Админ-маршруты */}
        <Route path="/admin/*" element={<AdminPage />}>
          <Route index element={<Dashboard />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="users" element={<Users />} />
          <Route path="products" element={<Products />} />
          <Route path="chat" element={<AdminChat />} />
        </Route>

        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
};

export default App;