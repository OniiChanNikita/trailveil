export const fetchUsers = async () => {
  const res = await fetch("http://localhost/api_users/api/staff/users");
  return res.json();
};

export const updateUser = async (userId, data) => {
  const res = await fetch(`http://localhost/api_users/api/staff/users/?userId=${userId}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  return res.json();
};

export const fetchProducts = async () => {
  const response = await fetch('http://localhost/api_product/products/', {method: 'GET', headers: { "Content-Type": "application/json" },});
  if (!response.ok) {
    throw new Error('Ошибка загрузки товаров');
  }
  const data = await response.json();
  return data;
};
