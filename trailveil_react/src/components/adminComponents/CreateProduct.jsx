import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { createProduct } from "../../lib/api";
import { useOutletContext } from 'react-router-dom';

const CreateProduct = () => {
    const { userPermissions } = useOutletContext();
    const navigate = useNavigate();

    const [product, setProduct] = useState({
        title: '',
        size: [],
        description: '',
        availability: false,
        rating: 0,
        price: 100,
        category: [],
        image: '' // This will hold the URL or path of the uploaded image
    });

    const [newSize, setNewSize] = useState('');
    const [newCategory, setNewCategory] = useState('');
    const [imageFile, setImageFile] = useState(null); // This will hold the file selected by the user

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

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setImageFile(file);
            setProduct(prev => ({
                ...prev,
                image: URL.createObjectURL(file) // Temporary URL for preview
            }));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!userPermissions?.includes("manage_products")) {
            alert("У вас нет прав для редактирования товаров");
            return;
        }

        const formData = new FormData();
        formData.append('title', product.title);
        formData.append('size', JSON.stringify(product.size));
        formData.append('description', product.description);
        formData.append('availability', product.availability);
        formData.append('rating', product.rating);
        formData.append('price', product.price);
        formData.append('category', JSON.stringify(product.category));

        if (imageFile) formData.append('image', imageFile);


        try {
            console.log(formData)
            await createProduct(formData); // Assuming createProduct handles FormData
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
                                        <span className="sr-only">Remove</span>❌
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
                            {product.category.map((category) => (
                                <span key={category} className="w-auto inline-flex items-center px-3 py-1 rounded-full bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 text-sm">
                                    {category}
                                    <button
                                        type="button"
                                        onClick={() => handleCategoryRemove(category)}
                                        className="w-auto bg-transparent ml-1.5 inline-flex text-gray-400 dark:text-gray-300 hover:text-gray-500 dark:hover:text-gray-100 focus:outline-none"
                                    >
                                        <span className="sr-only">Remove</span>❌
                                    </button>
                                </span>
                            ))}
                        </div>
                    </div>

                    {/* Изображение */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                            Изображение товара
                        </label>
                        <input
                            type="file"
                            accept="image/*"
                            onChange={handleImageChange}
                            className="block w-full text-sm text-gray-500 dark:text-gray-200 file:py-2 file:px-4 file:border file:rounded-md file:bg-blue-100 file:text-blue-700"
                        />
                        {product.image && (
                            <div className="mt-4">
                                <img src={product.image} alt="Product preview" className="max-w-full h-auto"/>
                            </div>
                        )}
                    </div>

                    <div className="mt-8 flex justify-end">
                        <button
                            type="submit"
                            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                        >
                            Сохранить товар
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default CreateProduct;
