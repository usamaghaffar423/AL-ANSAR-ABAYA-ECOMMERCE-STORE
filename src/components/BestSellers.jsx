import React, { useState, useEffect } from 'react';
import { API_BASE_URL } from '../config';
import { MOCK_PRODUCTS } from '../data/mockProducts';
import ProductCard from './ProductCard';

const BestSellers = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await fetch(`${API_BASE_URL}/get_products.php?limit=8`);
                if (!response.ok) throw new Error('Failed to fetch products');
                const data = await response.json();
                const fetchedProducts = Array.isArray(data) ? data.slice(0, 8) : [];

                // Fallback to mock products if API returns empty
                if (fetchedProducts.length === 0) {
                    setProducts(MOCK_PRODUCTS.slice(0, 8));
                } else {
                    setProducts(fetchedProducts);
                }
            } catch (err) {
                console.error('Error fetching best sellers:', err);
                // Fallback to mock products on error
                setProducts(MOCK_PRODUCTS.slice(0, 8));
            } finally {
                setLoading(false);
            }
        };
        fetchProducts();
    }, []);

    return (
        <section className="py-20 px-6 md:px-12 bg-[#f5efe6]">
            <div className="max-w-7xl mx-auto">
                <div className="text-center mb-16">
                    <h2 className="text-4xl font-bold text-gray-900 mb-4 tracking-tight">Sabse Zyada Bikne Wale</h2>
                    <p className="text-gray-500">KPK ke logon ki favourite picks — abayas, hijabs, niqabs aur zyada</p>
                </div>

                {loading ? (
                    <div className="flex justify-center py-12">
                        <div className="w-12 h-12 border-4 border-[#1a3a2a]/5 border-t-[#1a3a2a] rounded-full animate-spin"></div>
                    </div>
                ) : products.length === 0 ? (
                    <div className="text-center py-12 text-gray-400">No products available</div>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                        {products.map((product) => (
                            <ProductCard key={product.id} product={product} />
                        ))}
                    </div>
                )}
            </div>
        </section>
    );
};

export default BestSellers;

