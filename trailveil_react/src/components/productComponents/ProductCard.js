import { useState } from 'react'
import { FiShoppingBag, FiHeart, FiShare2 } from 'react-icons/fi';
import { GiMountainClimbing } from 'react-icons/gi';
import { IoMdSnow } from 'react-icons/io';

const ProductCard = ({ product }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isLiked, setIsLiked] = useState(false);

  // Определяем цвет тега в зависимости от типа
  const getTagColor = (tag) => {
    switch(tag) {
      case 'new': return 'bg-blue-900/80 text-blue-100';
      case 'bestseller': return 'bg-amber-900/80 text-amber-100';
      case 'limited': return 'bg-purple-900/80 text-purple-100';
      default: return 'bg-gray-800/80 text-gray-100';
    }
  };

  return (
    <div 
      className="relative bg-gray-900/70 rounded-lg overflow-hidden border border-gray-800 hover:border-gray-700 transition-all duration-300 shadow-lg hover:shadow-xl hover:shadow-gray-900/20"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Product Image */}
      <div className="relative aspect-square overflow-hidden">
        <img
          src={product.image}
          alt={product.title}
          className={`w-full h-full object-cover transition-transform duration-500 ${isHovered ? 'scale-105' : 'scale-100'}`}
        />
        
        {/* Product Tags */}
        <div className="absolute top-3 left-3 flex gap-2">
          {product.category?.includes('new') && (
            <span className={`px-2 py-1 text-xs font-medium rounded-md ${getTagColor('new')}`}>
              NEW
            </span>
          )}
          {product.tags?.includes('bestseller') && (
            <span className={`px-2 py-1 text-xs font-medium rounded-md ${getTagColor('bestseller')}`}>
              BESTSELLER
            </span>
          )}
          {product.tags?.includes('limited') && (
            <span className={`px-2 py-1 text-xs font-medium rounded-md ${getTagColor('limited')}`}>
              LIMITED
            </span>
          )}
        </div>
        
        {/* Out of Stock Badge */}
        {!product.availability && (
          <span className="absolute top-3 right-3 bg-red-900/80 text-white px-2 py-1 rounded-md text-xs font-medium">
            SOLD OUT
          </span>
        )}
        
        {/* Quick Actions (appear on hover) */}
        <div className={`absolute bottom-3 right-3 flex gap-2 transition-opacity duration-300 ${isHovered ? 'opacity-100' : 'opacity-0'}`}>
          <button 
            className="w-auto p-2 bg-gray-800/80 hover:bg-gray-700/90 rounded-full text-gray-300 hover:text-white transition-colors"
            onClick={() => setIsLiked(!isLiked)}
          >
            <FiHeart className={`h-4 w-4 ${isLiked ? 'fill-red-500 text-red-500' : ''}`} />
          </button>
          <button className="w-auto p-2 bg-gray-800/80 hover:bg-gray-700/90 rounded-full text-gray-300 hover:text-white transition-colors">
            <FiShare2 className="h-4 w-4" />
          </button>
        </div>
      </div>
      
      {/* Product Info */}
      <div className="p-4">
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-lg font-semibold text-white line-clamp-1">{product.title}</h3>
          {product.availability && (
            <span className="flex items-center text-xs text-green-400 bg-green-900/30 px-2 py-1 rounded-md">
              <div className="w-2 h-2 bg-green-400 rounded-full mr-1"></div>
              IN STOCK
            </span>
          )}
        </div>
        
        <p className="text-gray-400 text-sm mb-3 line-clamp-2">{product.description}</p>
        
        {/* Mountain Tech Indicator */}
        <div className="flex items-center gap-1 text-xs text-gray-500 mb-3">
          <GiMountainClimbing className="h-3 w-3" />
          <IoMdSnow className="h-3 w-3" />
          <span>MOUNTAIN-TESTED</span>
        </div>
        
        <div className="flex justify-between items-center">
          <div>
            <span className="text-lg font-bold text-white">${product.price}</span>
            {product.originalPrice && (
              <span className="ml-2 text-sm text-gray-500 line-through">${product.originalPrice}</span>
            )}
          </div>
          
          <button 
            className={`w-auto bg-transparent flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
              product.availability
                ? 'bg-gray-800 hover:bg-gray-700 text-white'
                : 'bg-gray-900 text-gray-500 cursor-not-allowed'
            }`}
            disabled={!product.availability}
          >
            <FiShoppingBag className="h-4 w-4" />
            {product.availability ? 'Add to pack' : 'Out of stock'}
          </button>
        </div>
      </div>
      
      {/* Hover Overlay */}
      {isHovered && (
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent pointer-events-none"></div>
      )}
    </div>
  );
};

export default ProductCard;