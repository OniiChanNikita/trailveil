import api from "../lib/axiosMiddleware"

export const checkUserAccess = async () => {
  try {
    const response = await api.get(`http://localhost/api_users/api/staff/me`);

    
    if (response.status!=200) throw new Error('Ошибка проверки роли');
    
    const data = response.data;
    return {role: data.role, permissions: data.permissions}; // Предполагаем, что бэкенд возвращает { role: 'admin' | 'support' | ... }
  } catch (error) {
    console.error('Failed to check role:', error);
    return null;
  }
};
