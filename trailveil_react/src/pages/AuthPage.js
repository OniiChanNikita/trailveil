import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { setToken } from '../slices/authSlice';
import { setUser } from '../slices/authSlice';
import { setRefreshToken } from '../slices/authSlice';
import { useNavigate } from 'react-router-dom';
import './Auth.css';
import axios from 'axios'

const AuthPage = ({ isLogin }) => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
  });
  const [error, setError] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const url = isLogin
      ? 'http://auth.localhost/auth_service/login/'
      : 'http://auth.localhost/auth_service/register/';

    try {
      const response = await axios.post(url, formData, {
        withCredentials: true // ✅ Обязательно для отправки и получения куки
      });
      console.log(response)
      dispatch(setToken(response.data.access));
      /*dispatch(setRefreshToken(response.data.refresh));*/
      dispatch(setUser(response.data.username));

      navigate('/');
    } catch (err) {
      setError(err.response?.data?.detail || 'Ошибка авторизации');
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-container">
        <h1>{isLogin ? 'Вход' : 'Регистрация'}</h1>
        {error && <p className="error">{error}</p>}
        <form onSubmit={handleSubmit}>
            <input
              type="text"
              name="username"
              placeholder="Имя пользователя"
              value={formData.username}
              onChange={handleChange}
              required
            />
          {!isLogin && (
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            required
          />
          )}

          <input
            type="password"
            name="password"
            placeholder="Пароль"
            value={formData.password}
            onChange={handleChange}
            required
          />
          <button type="submit">{isLogin ? 'Войти' : 'Зарегистрироваться'}</button>
        </form>
        <p>
          {isLogin ? 'Нет аккаунта?' : 'Уже есть аккаунт?'}
          <span onClick={() => navigate(isLogin ? '/register' : '/login')}>
            {isLogin ? ' Зарегистрироваться' : ' Войти'}
          </span>
        </p>
      </div>
    </div>
  );
};

export default AuthPage;
