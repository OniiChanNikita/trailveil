import axios from 'axios';
import { useDispatch } from 'react-redux';
import { refreshToken, logout, setToken, setRefreshToken } from './slices/authSlice';

const axiosInstance = axios.create({
  baseURL: 'http://auth.localhost:80', // Ваш URL API
  headers: {
    'Content-Type': 'application/json',
  },
});

// Перехватчик запроса для добавления токена в заголовки
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('accessToken');
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Перехватчик ответа для обработки ошибки 401 и обновления токена
axiosInstance.interceptors.response.use(
  (response) => response, // Если все в порядке, просто возвращаем ответ
  async (error) => {
    const originalRequest = error.config;
    const refreshTokenInStorage = localStorage.getItem('refreshToken');

    if (error.response && error.response.status === 401 && refreshTokenInStorage) {
      const dispatch = useDispatch()
      try {
        // Запрос на обновление токена
        const response = await axios.post('http://auth.localhost:80/auth_service/refresh', {
          refresh_token: refreshTokenInStorage,
        });

        const { accessToken, refreshToken: newRefreshToken } = response.data;


        // Обновляем токен в Redux и localStorage
        console.log('token refreshed')
        dispatch(setToken(accessToken));
        dispatch(setRefreshToken(newRefreshToken));

        // Сохраняем новый accessToken в заголовке и пробуем повторно выполнить запрос
        originalRequest.headers['Authorization'] = `Bearer ${accessToken}`;
        return axiosInstance(originalRequest); // Повторно выполняем запрос с новым токеном
      } catch (err) {
        // В случае ошибки с refresh токеном — выполняем выход
        dispatch(logout());
        return Promise.reject(err);
      }
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;
