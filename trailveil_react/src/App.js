

import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Home from "./pages/Home";
import Shop from "./pages/Shop";
import About from "./pages/About";
import Contact from "./pages/Contact";
import NotFound from "./pages/NotFound";
import AuthPage from "./pages/AuthPage";
import Logout from "./pages/Logout";
import Profile from "./pages/Profile";
import Products from './pages/Products';
import AdminPage from './pages/AdminPage';
import ChatPage from './pages/ChatPage';
/*import withAdminProtection from './withAdminProtection.js';
*//*import Orders from './pages/Orders';*/

/*const ProtectedAdminPage = withAdminProtection(AdminPage)*/

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

        <Route path="/products" element={<Products />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/chat" element={<ChatPage />} />

        {/*<Route path="/orders" element={<Orders />} />*/}

        <Route path="/admin/*" element={<AdminPage />} /> /*ProtectedAdminPage*/



        <Route path="*" element={<NotFound />} /> {/* Страница 404 */}
      </Routes>
    </Router>
  );
};

export default App;
