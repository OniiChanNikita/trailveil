import React from 'react'
import {FiHeart} from "react-icons/fi"

const RecentlyViewProduct = (products) => {
	return (
		<section className="mb-12">
          <h2 className="text-2xl font-bold mb-6 flex items-center">
            <span className="w-3 h-3 bg-amber-500 mr-3"></span>
            YOUR RECENTLY VIEWED
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {[1, 2, 3, 4].map((item) => (
              <div key={item} className="group">
                <div className="aspect-square bg-stone-800 rounded-lg mb-2 overflow-hidden relative">
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                  <button className="absolute top-2 right-2 p-1.5 bg-stone-900/80 rounded-full opacity-0 group-hover:opacity-100 transition-opacity">
                    <FiHeart className="text-stone-100 hover:text-amber-400" />
                  </button>
                </div>
                <div className="px-1">
                  <h3 className="font-medium">Shadow Tech Pants {item}</h3>
                  <p className="text-stone-400 text-sm">Dark matter series</p>
                  <p className="font-bold mt-1">${(220 + item * 15).toFixed(2)}</p>
                </div>
              </div>
            ))}
          </div>
        </section>
  	)
}

export default RecentlyViewProduct; 