import React from 'react';
import { AppBar, Toolbar, Typography } from '@mui/material';

const NavBar = () => {
  return (
    <AppBar position="fixed">
      <Toolbar>
        <Typography variant="h6" noWrap component="div">
          Админ Панель
        </Typography>
      </Toolbar>
    </AppBar>
  );
};

export default NavBar;