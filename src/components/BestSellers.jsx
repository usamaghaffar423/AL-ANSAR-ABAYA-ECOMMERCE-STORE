import React from 'react';
import { MOCK_PRODUCTS } from '../data/mockProducts';
import ProductCard from './ProductCard';

const BestSellers = () => {
    const products = MOCK_PRODUCTS.slice(0, 8);

    return (
        <section className="py-20 px-6 md:px-12 bg-[#f5efe6]">
            <div className="max-w-7xl mx-auto">
                <div className="text-center mb-16">
                    <h2 className="text-4xl font-bold text-gray-900 mb-4 tracking-tight">Sabse Zyada Bikne Wale</h2>
                    <p className="text-gray-500">KPK ke logon ki favourite picks — abayas, hijabs, niqabs aur zyada</p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                    {products.map((product) => (
                        <ProductCard key={product.id} product={product} />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default BestSellers;

