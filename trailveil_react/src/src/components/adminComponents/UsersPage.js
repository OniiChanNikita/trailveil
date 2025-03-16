import React, {useState, useEffect} from 'react';
import { Box, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, CircularProgress } from '@mui/material';
import axios from 'axios'
import { Navigate } from "react-router-dom";
import { useNavigate, Outlet } from 'react-router-dom';


const UsersPage = () => {
    const [users, setUsers] = useState([])
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchUserData = async () => {
          try {
            const response = await axios.get('http://admin.localhost/admin_service/api/users/', {
            });
            console.log(response.data)

            setUsers(response.data);
          } catch (error) {
            console.error('Ошибка при получении данных пользователя:', error);
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

    if (!users) {
        return <Navigate to="/" />;
    }

    return (
        <Box>
          <Typography variant="h4" gutterBottom>
            Пользователи
          </Typography>
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>ID</TableCell>
                  <TableCell>Email</TableCell>
                  <TableCell>Роль</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {users.map((user) => (
                  <TableRow key={user.id}>
                    <TableCell>{user.id}</TableCell>
                    <TableCell>{user.email}</TableCell>
                    <TableCell>{user.role}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
      );
    };

export default UsersPage;