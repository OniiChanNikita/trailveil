import React from 'react';
import { Routes, Route } from 'react-router-dom';
import UsersPage from './UsersPage';
import MessagesPage from './MessagesPage';
/*import SettingsPage from './SettingsPage';*/

const AdminRoutes = () => {
  return (
    <Routes>
      <Route path="users/" element={<UsersPage />} />
      <Route path="chat/users/" element={<MessagesPage />} />
      {/*<Route path="settings" element={<SettingsPage />} />*/}
    </Routes>
  );
};

export default AdminRoutes;