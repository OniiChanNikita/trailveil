import { useState, useEffect } from 'react';
import { FiSearch, FiFilter, FiX, FiCheck, FiArrowRight } from 'react-icons/fi';
import { GiMountainCave, GiMountainRoad } from 'react-icons/gi';
import { IoMdSnow } from 'react-icons/io';
import { RiLoader2Line } from 'react-icons/ri';
import ProductCard from '../components/productComponents/ProductCard'
import axios from "axios";

const Products = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [filters, setFilters] = useState({
    categories: [],
    priceRange: { min: 0, max: 1000 },
    inStock: false
  });

  // Mock API call
  const fetchProducts = async (params = {}) => {
    setIsLoading(true);
    try {
      const response = await axios.get('http://product.localhost/product_service/products', { params });
      return response.data;
      
      // Имитация задержки сети
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Моковые данные
      const mockProducts = [
        // ... (те же mock данные что и раньше)
      ];
      
      // Фильтрация по параметрам (имитация бэкенд-фильтрации)
      let results = mockProducts;
      
      if (params.search) {
        const search = params.search.toLowerCase();
        results = results.filter(p => 
          p.name.toLowerCase().includes(search) || 
          p.description.toLowerCase().includes(search)
        );
      }
      
      if (params.category && params.category.length > 0) {
        results = results.filter(p => params.category.includes(p.category));
      }
      
      if (params.price_min || params.price_max) {
        const min = params.price_min || 0;
        const max = params.price_max || 10000;
        results = results.filter(p => p.price >= min && p.price <= max);
      }
      
      if (params.availability) {
        results = results.filter(p => p.inStock);
      }
      
      return results;
    } finally {
      setIsLoading(false);
    }
  };

  // Initial load
  useEffect(() => {
    loadProducts();
  }, []);

  const loadProducts = async (search = '', filterParams = {}) => {
    const params = {
      search,
      ...filterParams
    };
    const data = await fetchProducts(params);
    setProducts(data);
    setFilteredProducts(data);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    loadProducts(searchQuery);
  };

  const handleFilterSubmit = () => {
    const filterParams = {
      category: filters.categories,
      price_min: filters.priceRange.min,
      price_max: filters.priceRange.max,
      availability: filters.inStock
    };
    loadProducts(searchQuery, filterParams);
    setIsSidebarOpen(false);
  };

  const toggleCategory = (category) => {
    setFilters(prev => ({
      ...prev,
      categories: prev.categories.includes(category)
        ? prev.categories.filter(c => c !== category)
        : [...prev.categories, category]
    }));
  };

  const resetFilters = () => {
    setFilters({
      categories: [],
      priceRange: { min: 0, max: 1000 },
      inStock: false
    });
    setSearchQuery('');
    loadProducts();
  };

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100">
      {/* Navigation */}
      <nav className="bg-black/80 backdrop-blur-md border-b border-gray-800 fixed w-full z-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <span className="text-xl font-bold text-gray-100">TRAILVEIL</span>
            </div>
            <div className="hidden md:flex items-center space-x-6">
              <a href="#" className="text-gray-400 hover:text-white px-3 py-2 text-sm font-medium">Home</a>
              <a href="#" className="bg-gray-900 text-white px-3 py-2 text-sm font-medium rounded-md">Products</a>
              <a href="#" className="text-gray-400 hover:text-white px-3 py-2 text-sm font-medium">Superclaims</a>
              <a href="#" className="text-gray-400 hover:text-white px-3 py-2 text-sm font-medium">Logout</a>
            </div>
            <button 
              className="bg-transparent w-auto md:hidden text-gray-400 hover:text-white" 
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            >
              <FiFilter className="h-5 w-5" />
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Filter Sidebar */}
      <div className={`fixed inset-0 z-30 transform ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} transition-transform duration-300 ease-in-out md:hidden`}>
        <div className="fixed inset-0 bg-black/50" onClick={() => setIsSidebarOpen(false)}></div>
        <div className="relative flex flex-col w-80 max-w-xs h-full bg-gray-900 border-r border-gray-800">
          <div className="p-4 border-b border-gray-800 flex justify-between items-center">
            <h2 className="text-lg font-semibold">Filters</h2>
            <button onClick={() => setIsSidebarOpen(false)} className="bg-transparent w-auto text-gray-400 hover:text-white">
              <FiX className="h-5 w-5" />
            </button>
          </div>
          <div className="p-4 overflow-y-auto">
            <FilterSidebarContent 
              filters={filters} 
              setFilters={setFilters}
              toggleCategory={toggleCategory}
            />
          </div>
          <div className="p-4 border-t border-gray-800 mt-auto flex gap-3">
            <button 
              onClick={resetFilters}
              className="flex-1 bg-gray-800 hover:bg-gray-700 text-white py-2 px-4 rounded-md text-sm"
            >
              Reset
            </button>
            <button 
              onClick={handleFilterSubmit}
              className="flex-1 bg-gray-700 hover:bg-gray-600 text-white py-2 px-4 rounded-md text-sm flex items-center justify-center gap-2"
            >
              Apply <FiArrowRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="pt-16 pb-12">
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Search and Filter Bar */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4 sticky top-16 z-10 bg-gray-900 py-4">
            <form onSubmit={handleSearch} className="relative w-full md:w-96">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FiSearch className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                className="block w-full pl-10 pr-3 py-2 border border-gray-700 rounded-md bg-gray-800 text-white placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-600"
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <button 
                type="submit"
                className="bg-transparent w-auto absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-white"
              >
                <FiArrowRight className="h-5 w-5" />
              </button>
            </form>
            <div className="flex items-center gap-4 w-full md:w-auto">
              <button 
                onClick={() => setIsSidebarOpen(true)}
                className="w-auto flex items-center gap-2 px-4 py-2 bg-gray-800 hover:bg-gray-700 rounded-md text-sm"
              >
                <FiFilter className="h-4 w-4" />
                Filters
              </button>
              <div className="hidden md:block text-sm text-gray-400">
                {filteredProducts.length} products
              </div>
            </div>
          </div>

          <div className="flex flex-col md:flex-row gap-8">
            {/* Desktop Filter Sidebar */}
            <div className="hidden md:block w-64 flex-shrink-0">
              <div className="bg-gray-900/70 rounded-lg border border-gray-800 p-4 sticky top-32 h-[calc(100vh-10rem)] overflow-y-auto">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-lg font-semibold">Filters</h2>
                  <button 
                    onClick={resetFilters}
                    className="bg-transparent w-auto text-xs text-gray-400 hover:text-white"
                  >
                    Reset all
                  </button>
                </div>
                <FilterSidebarContent 
                  filters={filters} 
                  setFilters={setFilters}
                  toggleCategory={toggleCategory}
                />
                <button 
                  onClick={handleFilterSubmit}
                  className="w-full mt-6 bg-gray-700 hover:bg-gray-600 text-white py-2 px-4 rounded-md text-sm flex items-center justify-center gap-2"
                >
                  Apply Filters <FiArrowRight className="h-4 w-4" />
                </button>
              </div>
            </div>

            {/* Product Grid with Loading Overlay */}
            <div className="flex-1 relative">
              {isLoading && (
                <div className="absolute inset-0 z-10 bg-gray-900/70 backdrop-blur-sm flex flex-col items-center justify-center">
                  <div className="animate-spin text-gray-400 mb-4">
                    <RiLoader2Line className="h-12 w-12" />
                  </div>
                  <div className="flex gap-2">
                    <GiMountainCave className="h-6 w-6 text-gray-300 animate-bounce" style={{ animationDelay: '0.1s' }} />
                    <IoMdSnow className="h-6 w-6 text-gray-300 animate-bounce" style={{ animationDelay: '0.3s' }} />
                    <GiMountainRoad className="h-6 w-6 text-gray-300 animate-bounce" style={{ animationDelay: '0.5s' }} />
                  </div>
                  <p className="mt-4 text-gray-300">Scaling the data peaks...</p>
                </div>
              )}
              
              {filteredProducts.length === 0 && !isLoading ? (
                <div className="text-center py-12">
                  <h3 className="text-lg font-medium text-gray-300">No products found</h3>
                  <p className="mt-2 text-gray-500">Try adjusting your search or filter criteria</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredProducts.map((product) => (
                    <ProductCard key={product.id} product={product} />
                  ))}
                </div>
              )}
            </div>
          </div>
        </main>
      </div>

      {/* Footer остается без изменений */}
    </div>
  );
};

// Improved Filter Sidebar Component
const FilterSidebarContent = ({ filters, setFilters, toggleCategory }) => {
  const categories = [
    { value: 'outerwear', label: 'Outerwear' },
    { value: 'pants', label: 'Pants' },
    { value: 'footwear', label: 'Footwear' },
    { value: 'packs', label: 'Packs' },
    { value: 'accessories', label: 'Accessories' }
  ];

  return (
    <div className="space-y-6">
      {/* Categories */}
      <div>
        <h3 className="text-sm font-medium text-gray-300 mb-3">Categories</h3>
        <div className="grid grid-cols-2 gap-2">
          {categories.map((category) => (
            <button
              key={category.value}
              onClick={() => toggleCategory(category.value)}
              className={`w-auto py-2 px-3 rounded-md text-sm flex items-center gap-2 ${
                filters.categories.includes(category.value)
                  ? 'bg-gray-700 border border-gray-600 text-white'
                  : 'bg-gray-800 hover:bg-gray-700 text-gray-300'
              }`}
            >
              {filters.categories.includes(category.value) && (
                <FiCheck className="h-4 w-4" />
              )}
              {category.label}
            </button>
          ))}
        </div>
      </div>

      {/* Price Range Slider */}
      <div>
        <h3 className="text-sm font-medium text-gray-300 mb-3">
          Price Range: ${filters.priceRange.min} - ${filters.priceRange.max}
        </h3>
        <div className="px-2">
          <input
            type="range"
            min="0"
            max="1000"
            step="50"
            value={filters.priceRange.min}
            onChange={(e) => setFilters({
              ...filters,
              priceRange: {
                ...filters.priceRange,
                min: parseInt(e.target.value)
              }
            })}
            className="w-full h-1.5 bg-gray-700 rounded-lg appearance-none cursor-pointer mb-4"
          />
          <input
            type="range"
            min="0"
            max="1000"
            step="50"
            value={filters.priceRange.max}
            onChange={(e) => setFilters({
              ...filters,
              priceRange: {
                ...filters.priceRange,
                max: parseInt(e.target.value)
              }
            })}
            className="w-full h-1.5 bg-gray-700 rounded-lg appearance-none cursor-pointer"
          />
        </div>
        <div className="flex justify-between text-xs text-gray-400 mt-2">
          <span>$0</span>
          <span>$1000</span>
        </div>
      </div>

      {/* In Stock Toggle */}
      <div className="flex items-center justify-between">
        <span className="text-sm text-gray-300">In Stock Only</span>
        <label className="relative inline-flex items-center cursor-pointer">
          <input
            type="checkbox"
            checked={filters.inStock}
            onChange={() => setFilters({
              ...filters,
              inStock: !filters.inStock
            })}
            className="sr-only peer"
          />
          <div className="w-11 h-6 bg-gray-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-gray-600"></div>
        </label>
      </div>
    </div>
  );
};

// Product Card Component остается без изменений

export default Products;