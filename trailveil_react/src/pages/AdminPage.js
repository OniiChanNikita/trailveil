

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate, Outlet } from 'react-router-dom';
import { Box, CssBaseline, Toolbar, Typography, CircularProgress } from '@mui/material';
import { Navigate } from "react-router-dom";

import Sidebar from '../components/adminComponents/Sidebar/Sidebar';
import UsersSidebar from '../components/adminComponents/Sidebar//UsersSidebar';

import NavBar from '../components/adminComponents/NavBar';
import AdminRoutes from '../components/adminComponents/AdminRoutes';
import ChatWindow from '../components/adminComponents/Chat/ChatWindow';

/*import SuperAdminDashboard from '../components/adminComponents/SuperAdminDashboard';
import AdminDashboard from '../components/adminComponents/AdminDashboard';
import ModeratorDashboard from '../components/adminComponents/ModeratorDashboard';
import SupportDashboard from '../components/adminComponents/SupportDashboard';
*/

const AdminPage = () => {
  const [user, setUser] = useState(null);
  const [chatUsers, setChatUsers] = useState(null)

  const [loading, setLoading] = useState(true);
  const [showUsersSidebar, setShowUsersSidebar] = useState(false);
  const [showChat, setShowChat] = useState(false);
  const [selectedChat, setSelectedChat] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get(`http://users.localhost/users_service/users/${localStorage.getItem("username")}/`);

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

  const handleMessagesClick = () => {
    setShowUsersSidebar(true);

    setShowChat(false); // Закрываем чат при открытии списка пользователей
  };

  const handleUserSelect = async (user) => {

    setSelectedChat(user);

    setShowChat(true); // Открываем чат при выборе пользователя

  };

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh">
        <CircularProgress />
      </Box>
    );
  }

  if (!user) {
    return <Navigate to="/" />;
  }


  return (
      <Box sx={{ display: 'flex' }}>
        <CssBaseline />
        <NavBar />
        <Sidebar user={user} onMessagesClick={handleMessagesClick} />
        {showUsersSidebar && (
          <UsersSidebar onUserSelect={handleUserSelect} />
        )}
        <Box component="main" sx={{ flexGrow: 1, display: 'flex' }}>
          <Box sx={{ flex: 1, p: 3 }}>
            <Outlet /> {/* Рендеринг вложенных маршрутов (UsersPage, MessagesPage и т.д.) */}
          </Box>
          {showChat && (
            <Box sx={{ width: '100%', p: 3 }}>
              <ChatWindow selectedUser={selectedChat} />
            </Box>
          )}
        </Box>
      </Box>
    );
  };

export default AdminPage;