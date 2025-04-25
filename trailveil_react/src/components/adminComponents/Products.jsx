import { useQuery } from "@tanstack/react-query";
import { fetchProducts } from "../../lib/api";
import { useState } from "react";
import { Link, useOutletContext } from "react-router-dom";

const Products = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const { permissions } = useOutletContext(); // получаем permissions из контекста
  const { data: products, isLoading: productsLoading, error } = useQuery({
    queryKey: ["products"],
    queryFn: fetchProducts
  });

  console.log(products, permissions)

  const filteredProducts = products?.filter(product =>
    product.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const canEditProducts = permissions?.includes("manage_products"); // 🔑 ключевой пермишен

  if (productsLoading) return <div className="p-4">Загрузка товаров...</div>;
  if (error) return <div className="p-4 text-red-500">Ошибка: {error.message}</div>;

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Товары</h2>
        
        <div className="flex gap-4">
          <input
            type="text"
            placeholder="Поиск товаров..."
            className="p-2 border rounded w-64"
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          
          {canEditProducts && (
            <Link 
              to="/admin/products/create"
              className="w-auto bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded transition-colors"
            >
              + Создать товар
            </Link>
          )}
        </div>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-lg shadow overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-100 dark:bg-gray-700">
            <tr>
              <th className="p-3 text-left">ID</th>
              <th className="p-3 text-left">Название</th>
              <th className="p-3 text-left">Цена</th>
              <th className="p-3 text-left">Доступность</th>
              {canEditProducts && <th className="p-3 text-left">Действия</th>}
            </tr>
          </thead>
          <tbody>
            {filteredProducts?.length > 0 ? (
              filteredProducts.map(product => (
                <tr key={product.slug} className="border-t hover:bg-gray-50 dark:hover:bg-gray-700">
                  <td className="p-3">{product.slug}</td>
                  <td className="p-3">{product.title}</td>
                  <td className="p-3">${product.price?.toFixed(2)}</td>
                  <td className="p-3">
                    <span className={`px-2 py-1 rounded-full text-xs ${
                      product.availability 
                        ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' 
                        : 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
                    }`}>
                      {product.availability ? 'В наличии' : 'Нет в наличии'}
                    </span>
                  </td>
                  {canEditProducts && (
                    <td className="p-3 flex gap-2">
                      <Link 
                        to={`/admin/products/edit/${product.slug}`}
                        className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded text-sm"
                      >
                        Редактировать
                      </Link>
                      <button 
                        className="w-auto bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded text-sm"
                        // onClick={() => handleDelete(product.slug)}
                      >
                        Удалить
                      </button>
                    </td>
                  )}
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={canEditProducts ? 5 : 4} className="p-4 text-center text-gray-500">
                  Товары не найдены
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Products;
