export const checkUserRole = async () => {
  try {
    const response = await fetch(`http://users.localhost/users_service/users/${localStorage.getItem("username")}`, {
/*      headers: {
        'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
      }*/
    });
    
    if (!response.ok) throw new Error('Ошибка проверки роли');
    
    const data = await response.json();
    console.log(data.role)
    return data.role; // Предполагаем, что бэкенд возвращает { role: 'admin' | 'support' | ... }
  } catch (error) {
    console.error('Failed to check role:', error);
    return null;
  }
};
