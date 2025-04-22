import React, { useEffect, useState } from 'react';
import { List, ListItem, ListItemText, Box, Toolbar } from '@mui/material';
import axios from 'axios';

const UsersSidebar = ({ onUserSelect }) => {
  const [users, setUsers] = useState({});

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get('http://localhost/messages/staff/');

        for (const i of response.data){
          console.log(i)
          if (i.user1 == 'support'){
            setUsers((prev)=>({...prev, [i.id]: i.user2}));
          }else{
            setUsers((prev)=>({...prev, [i.id]: i.user1}));
          }
        }
      } catch (error) {
        console.error('Ошибка при загрузке пользователей:', error);
      }
    };

    fetchUsers();
  }, []);

  useEffect(() => {
    console.log(users)
  }, [users])

  return (
    <Box sx={{ width: 250, bgcolor: 'background.paper', borderRight: '1px solid #ddd' }}>
      <Toolbar />
      <List>
        {Object.entries(users).map(([id, user]) => (
          <ListItem button key={String(id)} onClick={() => onUserSelect({id: id, user: user})}>
            <ListItemText primary={user} />
          </ListItem>
        ))}
      </List>
    </Box>
  );
};

export default UsersSidebar;

