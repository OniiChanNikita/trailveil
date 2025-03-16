import React, { useEffect, useState } from 'react';
import { List, ListItem, ListItemText, Box } from '@mui/material';
import axios from 'axios';

const UsersSidebar = ({ onUserSelect }) => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get('/api/users/');
        setUsers(response.data);
      } catch (error) {
        console.error('Ошибка при загрузке пользователей:', error);
      }
    };

    fetchUsers();
  }, []);

  return (
    <Box sx={{ width: 250, bgcolor: 'background.paper', borderRight: '1px solid #ddd' }}>
      <List>
        {users.map((user) => (
          <ListItem button key={user.id} onClick={() => onUserSelect(user)}>
            <ListItemText primary={user.email} />
          </ListItem>
        ))}
      </List>
    </Box>
  );
};

export default UsersSidebar;