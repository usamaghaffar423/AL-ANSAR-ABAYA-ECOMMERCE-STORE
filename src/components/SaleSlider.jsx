import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ChevronRight, Flame } from 'lucide-react';
import { API_BASE_URL } from '../config';

const SaleSlider = () => {
    const [products, setProducts] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        // Fetch products with discounts
        const fetchSaleProducts = async () => {
            try {
                const res = await fetch(`${API_BASE_URL}/get_products.php?limit=50`);
                const data = await res.json();

                // Filter products with discounts (old_price > price)
                const saleProducts = data.filter(p =>
                    p.retail_price && p.retail_price > p.price && p.discount_pct >= 20
                ).slice(0, 20);

                setProducts(saleProducts);
            } catch (e) {
                console.error('Failed to fetch sale products:', e);
            }
        };

        fetchSaleProducts();
    }, []);

    // Auto-scroll every 4 seconds
    useEffect(() => {
        if (products.length === 0) return;

        const interval = setInterval(() => {
            setCurrentIndex(prev => (prev + 1) % products.length);
        }, 4000);

        return () => clearInterval(interval);
    }, [products.length]);

    if (products.length === 0) return null;

    // Show 3-4 items at once depending on screen size
    const itemsPerView = 4;
    const visibleProducts = [];
    for (let i = 0; i < itemsPerView; i++) {
        visibleProducts.push(products[(currentIndex + i) % products.length]);
    }

    return (
        <div className="bg-gradient-to-r from-[#1a3a2a]/5 to-red-50/5 border-b border-gray-100 py-4 md:py-6 overflow-hidden">
            <div className="max-w-7xl mx-auto px-6">
                {/* Header */}
                <div className="flex items-center gap-3 mb-4 md:mb-5">
                    <div className="flex items-center gap-1.5">
                        <Flame size={18} className="text-[#1a3a2a]" />
                        <span className="text-[11px] font-black uppercase tracking-widest text-[#1a3a2a]">
                            Flash Sale
                        </span>
                    </div>
                    <span className="text-[10px] font-bold text-gray-500 uppercase">Limited Time Offers</span>
                </div>

                {/* Slider Container */}
                <div className="relative overflow-hidden">
                    <motion.div
                        className="flex gap-3 md:gap-4"
                        animate={{ x: 0 }}
                        transition={{ duration: 0.6, ease: 'easeInOut' }}
                    >
                        {visibleProducts.map((product, idx) => (
                            <motion.div
                                key={`${product.id}-${idx}`}
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ duration: 0.5 }}
                                className="flex-shrink-0 w-full sm:w-1/2 md:w-1/3 lg:w-1/4"
                            >
                                <Link
                                    to={`/product/${product.id}`}
                                    className="group block bg-white rounded-2xl overflow-hidden border border-gray-100 hover:border-[#1a3a2a] transition-all shadow-sm hover:shadow-md h-full"
                                >
                                    {/* Image Container */}
                                    <div className="relative aspect-square overflow-hidden bg-gray-50">
                                        <img
                                            src={product.image_url || 'https://via.placeholder.com/300'}
                                            alt={product.title}
                                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                        />

                                        {/* Discount Badge */}
                                        <div className="absolute top-3 right-3 bg-[#1a3a2a] text-white px-2.5 py-1 rounded-xl flex items-center gap-1">
                                            <span className="text-[10px] font-black">-{product.discount_pct}%</span>
                                        </div>

                                        {/* Sale Label */}
                                        <div className="absolute bottom-3 left-3 bg-black/70 text-white px-3 py-1.5 rounded-lg text-[9px] font-black uppercase tracking-widest">
                                            Sale
                                        </div>
                                    </div>

                                    {/* Content */}
                                    <div className="p-3 md:p-4">
                                        <h3 className="text-[11px] md:text-[12px] font-black uppercase tracking-wide text-gray-900 line-clamp-2 mb-2 group-hover:text-[#1a3a2a] transition-colors">
                                            {product.title}
                                        </h3>

                                        {/* Pricing */}
                                        <div className="flex items-center gap-2 mb-3">
                                            <span className="text-sm md:text-base font-black text-[#1a3a2a]">
                                                Rs. {Math.floor(product.price).toLocaleString()}
                                            </span>
                                            <span className="text-[10px] text-gray-400 line-through font-bold">
                                                Rs. {Math.floor(product.retail_price).toLocaleString()}
                                            </span>
                                        </div>

                                        {/* CTA Button */}
                                        <div className="flex items-center gap-1.5 text-[10px] font-black text-[#1a3a2a] uppercase tracking-widest group-hover:translate-x-1 transition-transform">
                                            <span>View</span>
                                            <ChevronRight size={12} />
                                        </div>
                                    </div>
                                </Link>
                            </motion.div>
                        ))}
                    </motion.div>

                    {/* Dots Indicator */}
                    <div className="flex items-center gap-1.5 mt-4 justify-center md:justify-start">
                        {products.map((_, idx) => (
                            <motion.button
                                key={idx}
                                onClick={() => setCurrentIndex(idx)}
                                className={`rounded-full transition-all ${
                                    idx === currentIndex
                                        ? 'bg-[#1a3a2a] w-2 h-2'
                                        : 'bg-gray-300 w-1.5 h-1.5 hover:bg-gray-400'
                                }`}
                                whileHover={{ scale: 1.2 }}
                                whileTap={{ scale: 0.9 }}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SaleSlider;


