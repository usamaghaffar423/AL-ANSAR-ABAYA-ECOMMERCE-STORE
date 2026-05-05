import React from 'react';
import { motion } from 'framer-motion';
import { IMAGES } from '../constants';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

const CollectionCard = ({ title, category, img, accentColor, link, size = 'regular', delay = 0 }) => (
  <motion.div
    initial={{ opacity: 0, y: 40 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: '-50px' }}
    transition={{ duration: 0.6, delay, ease: 'easeOut' }}
    className={`relative rounded-2xl overflow-hidden group cursor-pointer transition-all duration-300 ${
      size === 'large' ? 'h-[500px] lg:h-[650px]' : 'h-[280px]'
    }`}
  >
    {/* Background Image */}
    <img
      src={img}
      alt={title}
      className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-500 ease-out"
    />

    {/* Dark Overlay Gradient */}
    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />

    {/* Content */}
    <div className="absolute inset-0 flex flex-col justify-between p-6 md:p-8">
      {/* Top: Category Badge */}
      <div className="flex justify-start">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ delay: delay + 0.2, duration: 0.4 }}
          style={{ backgroundColor: accentColor }}
          className="px-4 py-2 rounded-full text-white text-[10px] font-black uppercase tracking-widest shadow-lg"
        >
          {category}
        </motion.div>
      </div>

      {/* Bottom: Title + Button */}
      <div>
        <motion.h3
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: delay + 0.3, duration: 0.4 }}
          className="text-2xl md:text-3xl lg:text-4xl font-black text-white mb-6 leading-tight tracking-tight max-w-xs"
        >
          {title}
        </motion.h3>

        <Link
          to={link}
          className={`inline-flex items-center gap-2 px-6 py-3 rounded-full font-black uppercase text-[11px] tracking-widest transition-all duration-300 hover:gap-3 group/btn`}
          style={{ backgroundColor: accentColor, color: 'white' }}
        >
          Shop Now
          <ArrowRight size={16} className="group-hover/btn:translate-x-1 transition-transform" />
        </Link>
      </div>
    </div>
  </motion.div>
);

const PromoCards = () => {
  const collections = [
    {
      title: 'Wrist Watches',
      category: 'Premium Timepieces',
      img: IMAGES.hero_secondary,
      accentColor: '#EB3461',
      link: '/shop?category=wrist-watches',
      size: 'large',
    },
    {
      title: 'Ladies Handbags',
      category: 'Stylish Bags',
      img: IMAGES.category_blue,
      accentColor: '#5680BC',
      link: '/shop?category=ladies-handbags',
      size: 'regular',
    },
    {
      title: 'Premium Perfumes',
      category: 'Fragrances',
      img: IMAGES.category_black,
      accentColor: '#FCB92F',
      link: '/shop?category=fragrances',
      size: 'regular',
    },
    {
      title: 'Edenrobe Clothes',
      category: 'Designer Fashion',
      img: IMAGES.promo_lady,
      accentColor: '#F6BC3E',
      link: '/shop?category=edenrobe',
      size: 'regular',
    },
  ];

  return (
    <section className="py-20 px-6 md:px-12 lg:px-16 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-16 text-center"
        >
          <h2 className="text-5xl md:text-6xl lg:text-7xl font-black text-gray-900 uppercase tracking-tighter mb-6 leading-tight">
            Our Collections
          </h2>
          <motion.div
            initial={{ width: 0 }}
            whileInView={{ width: '100%' }}
            viewport={{ once: true }}
            transition={{ delay: 0.3, duration: 0.8, ease: 'easeOut' }}
            className="h-1 bg-[#EB3461] rounded-full mx-auto"
            style={{ maxWidth: '120px' }}
          />
        </motion.div>

        {/* Collections Grid - Bento Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Large Featured Card - Wrist Watches (Left, spans 2 rows) */}
          <div className="md:row-span-2">
            <CollectionCard
              {...collections[0]}
              delay={0}
            />
          </div>

          {/* Top Right - Ladies Handbags */}
          <div className="md:col-span-1 lg:col-span-2">
            <CollectionCard
              {...collections[1]}
              delay={0.1}
            />
          </div>

          {/* Bottom Right Split - Premium Perfumes & Edenrobe */}
          <CollectionCard
            {...collections[2]}
            delay={0.2}
          />
          <CollectionCard
            {...collections[3]}
            delay={0.3}
          />
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5, duration: 0.6 }}
          className="mt-20 text-center"
        >
          <Link
            to="/shop"
            className="inline-flex items-center gap-3 px-10 py-5 bg-[#EB3461] text-white font-black uppercase text-sm tracking-widest rounded-full hover:bg-black transition-all duration-300 hover:shadow-2xl shadow-lg hover:-translate-y-1"
          >
            Explore All Collections
            <ArrowRight size={18} />
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default PromoCards;
