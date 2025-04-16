export const fetchUsers = async () => {
  const res = await fetch("http://users.localhost/users_service/api/staff/users");
  return res.json();
};

export const updateUser = async (userId, data) => {
  const res = await fetch(`http://users.localhost/users_service/api/staff/users/?userId=${userId}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  return res.json();
};

export const fetchProducts = async () => {
  const response = await fetch('http://product.localhost/product_service/products/');
  if (!response.ok) {
    throw new Error('Ошибка загрузки товаров');
  }
  return response.json();
};
