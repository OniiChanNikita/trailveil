import axios from 'axios';
import store from '../store';
import { setToken, logout } from '../slices/authSlice';

// Создаём экземпляр axios с базовыми настройками
const api = axios.create({
  baseURL: 'http://auth.localhost/auth_service/',
  withCredentials: true, // Важно для работы с HTTP-only cookies
});

// Interceptor для добавления access token в заголовки
api.interceptors.request.use(
  (config) => {
    const token = store.getState().auth.token;
    console.log(token)

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Interceptor для обработки 401 ошибок и обновления токена
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    // Если ошибка 401 и это не запрос на обновление токена

    if ((error.response?.status === 401 || error.response?.status === 403) && !originalRequest._retry) {
      originalRequest._retry = true;
      
      try {

        // Делаем запрос на обновление токена
        const response = await axios.post(
          `http://auth.localhost/auth_service/refresh/`,
          {}, // Пустое тело, так как refresh token в cookies
          { 
            withCredentials: true,
            headers: {
              'Content-Type': 'application/json',
            }
          } // Отправляем cookies
        );
        console.log(response)


        const { access } = response.data;
        
        // Сохраняем новый access token в хранилище
        store.dispatch(setToken({ 
          token: access,
          // refresh token остаётся в HTTP-only cookie
        }));
        
        // Повторяем оригинальный запрос с новым токеном
        originalRequest.headers.Authorization = `Bearer ${access}`;
        return api(originalRequest);
      } catch (refreshError) {
        // Если не удалось обновить - разлогиниваем
        /*store.dispatch(logout());*/
        return Promise.reject(refreshError);
      }
    }
    console.log('error')
    return Promise.reject(error);
  }
);

export default api;