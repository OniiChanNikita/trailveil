import React, { useEffect } from 'react';
import { useDispatch } from "react-redux"
import { logout } from "../slices/authSlice"
import { useNavigate } from 'react-router-dom'

const Logout = () => {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	useEffect(() => {
		dispatch(logout());
		navigate('/');
	}, [])

}

export default Logout
