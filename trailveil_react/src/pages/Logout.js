import React, { useEffect } from 'react';
import { useDispatch } from "react-redux"
import { logout } from "../slices/authSlice"
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

const Logout = () => {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	useEffect(() => {
		const fetchUserData = async () => {
      		try {
    			await axios.get(`http://localhost/api_auth/logout`);

	      	} catch (error) {
		        console.error('Ошибка при logout данных пользователя:', error);
		        navigate('/');
	        }
        }
        fetchUserData()
		dispatch(logout());
		navigate('/');
	}, [])

}

export default Logout
