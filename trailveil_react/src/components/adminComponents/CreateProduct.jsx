import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link  } from 'react-router-dom';
import { fetchProduct, createProduct } from "../../lib/api";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import axios from 'axios';
import { useOutletContext } from 'react-router-dom';


const EditProduct = () => {
    const queryClient = useQueryClient();
    const { slug } = useParams();
    const navigate = useNavigate();
    const { userPermissions } = useOutletContext();
    const [product, setProduct] = useState({
        title: '',
        size: [],
        description: '',
        availability: false,
        rating: 0,
        price: 100,
        category: []
    });

    const [newSize, setNewSize] = useState('');
    const [newCategory, setNewCategory] = useState('');
        
    

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setProduct(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    const handleSizeAdd = () => {
        if (newSize.trim() && !product.size.includes(newSize.trim())) {
            setProduct(prev => ({
                ...prev,
                size: [...prev.size, newSize.trim()]
            }));
            setNewSize('');
        }
    };

    const handleSizeRemove = (sizeToRemove) => {
        setProduct(prev => ({
            ...prev,
            size: prev.size.filter(size => size !== sizeToRemove)
        }));
    };

    const handleCategoryAdd = () => {
        if (newCategory.trim() && !product.category.includes(newCategory.trim())) {
            setProduct(prev => ({
                ...prev,
                category: [...prev.category, newCategory.trim()]
            }));
            setNewCategory('');
        }
    };

    const handleCategoryRemove = (categoryToRemove) => {
        setProduct(prev => ({
            ...prev,
            category: prev.category.filter(cat => cat !== categoryToRemove)
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!userPermissions?.includes("manage_products")) {
            alert("У вас нет прав для редактирования товаров");
            return;
        }

        console.log(slug, product)

        try {
            createProduct(product)
            navigate('/admin/products');
        } catch (error) {
            console.error('Error saving product:', error);
        }
    };

    

    return (
        <div className="max-w-4xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
            <div className="mb-6 flex justify-between items-center">
                <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Редактирование товара</h1>
                <Link 
                    to="/admin/products"
                    className="text-sm text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300"
                >
                    ← Назад к списку
                </Link>
            </div>

            <div className="bg-white dark:bg-gray-800 shadow rounded-lg overflow-hidden">
                <form onSubmit={handleSubmit} className="p-6 space-y-8">
                      {/*  <div className="bg-red-50 border-l-4 border-red-500 p-4">
                            <div className="flex">
                                <div className="flex-shrink-0">
                                    <svg className="h-5 w-5 text-red-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                                    </svg>
                                </div>
                                <div className="ml-3">
                                    <p className="text-sm text-red-700"></p>
                                </div>
                            </div>
                        </div>*/}

                    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                        {/* Название */}
                        <div className="col-span-2">
                            <label htmlFor="title" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                Название товара *
                            </label>
                            <input
                                type="text"
                                id="title"
                                name="title"
                                value={product.title}
                                onChange={handleChange}
                                className="block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                                required
                            />
                        </div>

                        {/* Описание */}
                        <div className="col-span-2">
                            <label htmlFor="description" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                Описание *
                            </label>
                            <textarea
                                id="description"
                                name="description"
                                rows={4}
                                value={product.description}
                                onChange={handleChange}
                                className="block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                                required
                            />
                        </div>

                        {/* Цена */}
                        <div>
                            <label htmlFor="price" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                Цена *
                            </label>
                            <div className="mt-1 relative rounded-md shadow-sm">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <span className="text-gray-500 sm:text-sm">₽</span>
                                </div>
                                <input
                                    type="number"
                                    id="price"
                                    name="price"
                                    min="0"
                                    step="0.01"
                                    value={product.price}
                                    onChange={handleChange}
                                    className="block w-full pl-7 pr-12 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                                    required
                                />
                            </div>
                        </div>

                        {/* Рейтинг */}
                        <div>
                            <label htmlFor="rating" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                Рейтинг
                            </label>
                            <div className="flex items-center">
                                <input
                                    type="number"
                                    id="rating"
                                    name="rating"
                                    min="0"
                                    max="5"
                                    step="0.1"
                                    value={product.rating}
                                    onChange={handleChange}
                                    className="block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                                />
                                <div className="ml-2 flex">
                                    {[...Array(5)].map((_, i) => (
                                        <svg
                                            key={i}
                                            className={`h-5 w-5 ${i < Math.floor(product.rating) ? 'text-yellow-400' : 'text-gray-300'}`}
                                            xmlns="http://www.w3.org/2000/svg"
                                            viewBox="0 0 20 20"
                                            fill="currentColor"
                                        >
                                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                        </svg>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Доступность */}
                        <div className="flex items-center">
                            <input
                                id="availability"
                                name="availability"
                                type="checkbox"
                                checked={product.availability}
                                onChange={handleChange}
                                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                            />
                            <label htmlFor="availability" className="ml-2 block text-sm text-gray-700 dark:text-gray-300">
                                Товар в наличии
                            </label>
                        </div>
                    </div>

                    {/* Размеры */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                            Размеры
                        </label>
                        <div className="flex space-x-2 mb-2">
                            <input
                                type="text"
                                value={newSize}
                                onChange={(e) => setNewSize(e.target.value)}
                                className="flex-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                                placeholder="Добавить размер (например: S, M, L)"
                            />
                            <button
                                type="button"
                                onClick={handleSizeAdd}
                                className="w-auto inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                            >
                                Добавить
                            </button>
                        </div>
                        <div className="flex flex-wrap gap-2">
                            {product.size.map((size) => (
                                <span key={size} className="w-auto inline-flex items-center px-3 py-1 rounded-full bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 text-sm">
                                    {size}
                                    <button
                                        type="button"
                                        onClick={() => handleSizeRemove(size)}
                                        className="w-auto bg-transparent ml-1.5 inline-flex text-gray-400 dark:text-gray-300 hover:text-gray-500 dark:hover:text-gray-100 focus:outline-none"
                                    >
                                        <span className="sr-only">Удалить</span>
                                        <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
                                            <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                                        </svg>
                                    </button>
                                </span>
                            ))}
                        </div>
                    </div>

                    {/* Категории */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                            Категории
                        </label>
                        <div className="flex space-x-2 mb-2">
                            <input
                                type="text"
                                value={newCategory}
                                onChange={(e) => setNewCategory(e.target.value)}
                                className="flex-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                                placeholder="Добавить категорию"
                            />
                            <button
                                type="button"
                                onClick={handleCategoryAdd}
                                className="w-auto inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                            >
                                Добавить
                            </button>
                        </div>
                        <div className="flex flex-wrap gap-2">
                            {product.category.map((cat) => (
                                <span key={cat} className="inline-flex items-center px-3 py-1 rounded-full bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 text-sm">
                                    {cat}
                                    <button
                                        type="button"
                                        onClick={() => handleCategoryRemove(cat)}
                                        className="w-auto bg-transparent ml-1.5 inline-flex text-gray-400 dark:text-gray-300 hover:text-gray-500 dark:hover:text-gray-100 focus:outline-none"
                                    >
                                        <span className="sr-only">Удалить</span>
                                        <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
                                            <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                                        </svg>
                                    </button>
                                </span>
                            ))}
                        </div>
                    </div>

                    <div className="flex justify-end space-x-3 pt-6 border-t border-gray-200 dark:border-gray-700">
                        <button
                            type="button"
                            onClick={() => navigate('/admin/products')}
                            className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 dark:bg-gray-700 dark:text-white dark:hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                        >
                            Отмена
                        </button>
                        <button
                            type="submit"
                            className="w-auto inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                                <>
                                    <svg
                                        className="animate-spin -ml-1 mr-2 h-5 w-5 text-white"
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                    >
                                        <circle
                                            className="opacity-25"
                                            cx="12"
                                            cy="12"
                                            r="10"
                                            stroke="currentColor"
                                            strokeWidth="4"
                                        ></circle>
                                        <path
                                            className="opacity-75"
                                            fill="currentColor"
                                            d="M4 12a8 8 0 018-8v8H4z"
                                        ></path>
                                    </svg>
                                    Сохранение...
                                </>
                                {/*'Сохранить'*/}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};
export default EditProduct;