import React from 'react';
import { List, ListItem, ListItemIcon, ListItemText, Divider, Box, Toolbar } from '@mui/material';
import { Link } from 'react-router-dom';
import PeopleIcon from '@mui/icons-material/People';
import MessageIcon from '@mui/icons-material/Message';
import SettingsIcon from '@mui/icons-material/Settings';

const Sidebar = ({ user, onMessagesClick }) => {
  const hasPermission = (code) => {
    return user.permissions.some((perm) => perm.code === code);
  };

  return (
    <Box sx={{ width: 250, bgcolor: 'background.paper' }}>
      <Toolbar /> {/* Отступ для AppBar */}
      <Divider />
      <List>
        {hasPermission('view_users') && (
          <ListItem button component={Link} to="/admin/users">
            <ListItemIcon>
              <PeopleIcon />
            </ListItemIcon>
            <ListItemText primary="Пользователи" />
          </ListItem>
        )}
        {hasPermission('delete_messages') && (
          <ListItem button onClick={onMessagesClick}> {/* Обработчик для Messages */}
            <ListItemIcon>
              <MessageIcon />
            </ListItemIcon>
            <ListItemText primary="Сообщения" />
          </ListItem>
        )}
        {hasPermission('edit_settings') && (
          <ListItem button component={Link} to="/admin/settings">
            <ListItemIcon>
              <SettingsIcon />
            </ListItemIcon>
            <ListItemText primary="Настройки" />
          </ListItem>
        )}
      </List>
    </Box>
  );
};

export default Sidebar;