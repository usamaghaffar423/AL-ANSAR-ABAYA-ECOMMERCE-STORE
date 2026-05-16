import React from 'react';
import { Heart, ShoppingBag, Star, Flame, Tag } from 'lucide-react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';

const FALLBACK_IMAGE = 'https://images.unsplash.com/photo-1523381210434-271e8be1f52b?auto=format&fit=crop&q=80&w=600';

const ProductCard = React.memo(({ product, variant = 'default' }) => {
    const { addToCart } = useCart();
    const navigate = useNavigate();
    const [wishlisted, setWishlisted] = React.useState(false);

    const handleNavigate = (e) => {
        if (e.target.closest('button')) return;
        navigate(`/product/${product.id}`);
        window.scrollTo(0, 0);
    };

    // final_price = discounted selling price, retail_price = original (strike-through)
    const price      = parseFloat(product.price ?? 0);
    const oldPrice   = parseFloat(product.retail_price ?? 0);
    const discount   = parseFloat(product.discount_pct ?? 0);
    const hasDiscount = discount > 0 && oldPrice > price;
    const imageUrl   = product.image_url || FALLBACK_IMAGE;
    const isOutOfStock = product.stock_status === 'out_of_stock';

    if (variant === 'featured') {
        return (
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                onClick={handleNavigate}
                className="flex flex-col group cursor-pointer"
            >
                <div className="relative aspect-[4/5] bg-[#F7F7F7] rounded-[30px] overflow-hidden mb-4">
                    <img
                        src={imageUrl}
                        width={300}
                        height={375}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                        alt={`${product.title} - Premium abaya`}
                        loading="lazy"
                        decoding="async"
                        onError={(e) => { e.target.src = FALLBACK_IMAGE; }}
                    />
                    {hasDiscount && (
                        <div className="absolute left-1 top-4 bg-[#1a3a2a] text-white px-1.5 py-1 rounded-full text-[6px] font-black uppercase tracking-widest whitespace-nowrap">
                            {discount.toFixed(0)}%
                        </div>
                    )}
                    <div className="absolute top-4 right-4 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-x-4 group-hover:translate-x-0">
                        <button
                            onClick={(e) => { e.stopPropagation(); setWishlisted(!wishlisted); }}
                            aria-label={wishlisted ? 'Remove from wishlist' : 'Add to wishlist'}
                            title={wishlisted ? 'Remove from wishlist' : 'Add to wishlist'}
                            className={`p-2.5 rounded-full shadow-lg transition-all ${wishlisted ? 'bg-[#1a3a2a] text-white' : 'bg-white hover:bg-black hover:text-white'}`}
                        >
                            <Heart size={16} fill={wishlisted ? 'currentColor' : 'none'} />
                        </button>
                        {!isOutOfStock && (
                            <button
                                onClick={(e) => { e.stopPropagation(); addToCart(product); }}
                                className="bg-white p-2.5 rounded-full shadow-lg hover:bg-[#1a3a2a] hover:text-white transition-all"
                            >
                                <ShoppingBag size={16} />
                            </button>
                        )}
                    </div>
                </div>
                <div className="flex justify-between items-start mb-1 text-[9px] font-black uppercase tracking-[0.2em]">
                    <span className="text-gray-400">{product.category}</span>
                    <div className="flex items-center gap-1 text-gray-400">
                        <Star size={8} fill="#FBBF24" className="text-yellow-400" />
                        <span>5.0</span>
                    </div>
                </div>
                <h4 className="text-sm font-black text-gray-900 leading-tight mb-2 group-hover:text-[#1a3a2a] transition-colors line-clamp-2 uppercase">
                    {product.title}
                </h4>
                <div className="flex gap-2 items-center">
                    <span className="text-[#1a3a2a] font-black text-base tracking-tighter">Rs. {price.toLocaleString()}</span>
                    {hasDiscount && (
                        <span className="text-gray-300 line-through text-[10px] font-bold">Rs. {oldPrice.toLocaleString()}</span>
                    )}
                </div>
            </motion.div>
        );
    }

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            onClick={handleNavigate}
            className="group relative flex flex-col bg-white rounded-[32px] overflow-hidden border border-transparent hover:border-gray-100 transition-all duration-500 cursor-pointer"
        >
            <div className="relative aspect-[3/4] overflow-hidden bg-gray-50 rounded-[24px] m-2">
                <img
                    src={imageUrl}
                    width={240}
                    height={320}
                    alt={`${product.title} - Premium abaya from Al Ansar Abaya`}
                    className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                    loading="lazy"
                    decoding="async"
                    onError={(e) => { e.target.src = FALLBACK_IMAGE; }}
                />

                {/* Badges - Vertical flow on left edge */}
                <div className="absolute left-1 top-2 flex flex-col gap-2 z-10 max-w-[70px]">
                    {product.is_trending && (
                        <div className="bg-black text-white px-1.5 py-1 rounded-full flex items-center justify-center gap-0.5 text-[6px] font-black uppercase tracking-widest whitespace-nowrap">
                            <Flame size={6} className="text-[#1a3a2a] flex-shrink-0" />
                            <span className="hidden sm:inline">Trending</span>
                        </div>
                    )}
                    {hasDiscount && (
                        <div className="bg-[#1a3a2a] text-white px-1.5 py-1 rounded-full flex items-center justify-center gap-0.5 text-[6px] font-black uppercase tracking-widest whitespace-nowrap">
                            <Tag size={6} className="flex-shrink-0" />
                            <span className="hidden sm:inline">-{discount.toFixed(0)}%</span>
                            <span className="sm:hidden">{discount.toFixed(0)}%</span>
                        </div>
                    )}
                    {isOutOfStock && (
                        <div className="bg-gray-800 text-white px-1.5 py-1 rounded-full text-[6px] font-black uppercase tracking-widest whitespace-nowrap flex items-center justify-center">
                            Out
                        </div>
                    )}
                </div>

                <div className="absolute top-4 right-4 flex flex-col gap-2 z-10 translate-x-12 opacity-0 group-hover:translate-x-0 group-hover:opacity-100 transition-all duration-500">
                    <button
                        onClick={(e) => { e.stopPropagation(); setWishlisted(!wishlisted); }}
                        aria-label={wishlisted ? 'Remove from wishlist' : 'Add to wishlist'}
                        title={wishlisted ? 'Remove from wishlist' : 'Add to wishlist'}
                        className={`p-2.5 rounded-full shadow-xl backdrop-blur-md transition-all ${wishlisted ? 'bg-[#1a3a2a] text-white' : 'bg-white/90 hover:bg-black hover:text-white'}`}
                    >
                        <Heart size={18} fill={wishlisted ? 'currentColor' : 'none'} />
                    </button>
                    {!isOutOfStock && (
                        <button
                            onClick={(e) => { e.stopPropagation(); addToCart(product); }}
                            aria-label={`Add ${product.title} to cart`}
                            title={`Add ${product.title} to cart`}
                            className="bg-white/90 p-2.5 rounded-full shadow-xl backdrop-blur-md hover:bg-[#1a3a2a] hover:text-white transition-all delay-75"
                        >
                            <ShoppingBag size={18} />
                        </button>
                    )}
                </div>
            </div>

            <div className="p-5 pt-2 text-center flex-1 flex flex-col">
                <span className="text-[9px] font-black text-[#1a3a2a] uppercase tracking-[0.2em] mb-1">{product.category}</span>
                <h3 className="font-black text-gray-900 group-hover:text-[#1a3a2a] transition-colors text-sm uppercase tracking-tight leading-tight mb-3 line-clamp-2">
                    {product.title}
                </h3>
                <div className="flex items-center justify-center gap-1 mb-3">
                    {[...Array(5)].map((_, i) => <Star key={i} size={8} fill="#FBBF24" className="text-yellow-400" />)}
                </div>
                <div className="mt-auto flex items-baseline justify-center gap-2">
                    <span className="text-gray-900 font-black text-lg tracking-tighter">Rs. {price.toLocaleString()}</span>
                    {hasDiscount && (
                        <span className="text-gray-300 text-[10px] font-bold line-through">Rs. {oldPrice.toLocaleString()}</span>
                    )}
                </div>

                <button
                    onClick={(e) => { e.stopPropagation(); if (!isOutOfStock) addToCart(product); }}
                    disabled={isOutOfStock}
                    aria-label={isOutOfStock ? `${product.title} is out of stock` : `Add ${product.title} to cart`}
                    className={`mt-4 w-full py-3.5 rounded-2xl text-[9px] font-black uppercase tracking-widest transition-all transform active:scale-95 shadow-lg shadow-gray-200 ${
                        isOutOfStock
                            ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                            : 'bg-gray-950 text-white hover:bg-[#1a3a2a]'
                    }`}
                >
                    {isOutOfStock ? 'Out of Stock' : 'Add To Cart'}
                </button>
            </div>
        </motion.div>
    );
});

export default ProductCard;


