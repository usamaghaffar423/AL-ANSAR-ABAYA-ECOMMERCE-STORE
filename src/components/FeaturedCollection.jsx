import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';
import { API_BASE_URL } from '../config';
import { MOCK_FEATURED_PRODUCTS } from '../data/mockProducts';
import ProductCard from './ProductCard';

const FeaturedCollection = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await fetch(`${API_BASE_URL}/get_products.php?trending=1&limit=8`);
                if (!response.ok) throw new Error('Failed to fetch products');
                const data = await response.json();
                const fetchedProducts = Array.isArray(data) ? data : [];

                // Fallback to mock products if API returns empty
                if (fetchedProducts.length === 0) {
                    setProducts(MOCK_FEATURED_PRODUCTS);
                } else {
                    setProducts(fetchedProducts);
                }
            } catch (err) {
                console.error('Error fetching featured products:', err);
                // Fallback to mock products on error
                setProducts(MOCK_FEATURED_PRODUCTS);
            } finally {
                setLoading(false);
            }
        };
        fetchProducts();
    }, []);

    return (
        <section className="py-24 px-6 md:px-12 bg-[#f5efe6]">
            <div className="max-w-7xl mx-auto">

                {/* Header */}
                <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-12 gap-6">
                    <div>
                        <span className="text-[#1a3a2a] text-[10px] font-black uppercase tracking-[0.4em] mb-3 block">
                            Featured
                        </span>
                        <h2 className="text-4xl md:text-5xl font-black text-gray-900 leading-[0.9] tracking-tighter uppercase">
                            Aaj Ka Look,<br />
                            <span className="text-[#1a3a2a]">Kal Ki Yaad</span>
                        </h2>
                    </div>
                    <Link
                        to="/shop"
                        className="group flex items-center gap-3 text-[11px] font-black uppercase tracking-widest text-gray-900 hover:text-[#1a3a2a] transition-all self-start sm:self-auto"
                    >
                        Sab Dekho
                        <div className="w-10 h-10 rounded-full border border-gray-200 flex items-center justify-center group-hover:border-[#1a3a2a] group-hover:bg-[#1a3a2a] group-hover:text-white transition-all">
                            <ChevronRight size={16} />
                        </div>
                    </Link>
                </div>

                {/* Product Grid */}
                {loading ? (
                    <div className="flex justify-center py-12">
                        <div className="w-12 h-12 border-4 border-[#1a3a2a]/5 border-t-[#1a3a2a] rounded-full animate-spin"></div>
                    </div>
                ) : products.length === 0 ? (
                    <div className="text-center py-12 text-gray-400">No featured products available</div>
                ) : (
                    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-8">
                        {products.map(p => (
                            <ProductCard key={p.id} product={p} variant="featured" />
                        ))}
                    </div>
                )}

            </div>
        </section>
    );
};

export default FeaturedCollection;


