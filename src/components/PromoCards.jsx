import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

const MasonryCard = ({ title, itemCount, image, accentColor, link, rowSpan, delay }) => (
  <motion.div
    initial={{ opacity: 0, y: 40 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: '-50px' }}
    transition={{ duration: 0.5, delay, ease: 'easeOut' }}
    className={`group relative overflow-hidden rounded-2xl cursor-pointer ${
      rowSpan === 'tall' ? 'row-span-2' : 'row-span-1'
    } h-full`}
  >
    {/* Background Image */}
    <img
      src={image}
      alt={title}
      className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
    />

    {/* Overlay Gradient */}
    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />

    {/* Content Container */}
    <div className="absolute inset-0 flex flex-col justify-between p-3 md:p-5 lg:p-6">
      {/* Top: Accent Badge */}
      <div className="flex justify-start items-center gap-2">
        <motion.div
          initial={{ scale: 0 }}
          whileInView={{ scale: 1 }}
          transition={{ delay: delay + 0.15, duration: 0.4 }}
          style={{ backgroundColor: accentColor }}
          className="w-3.5 h-3.5 rounded-full"
        />
        <motion.span
          initial={{ opacity: 0, x: -10 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ delay: delay + 0.2, duration: 0.4 }}
          style={{ color: accentColor }}
          className="text-[9px] font-black uppercase tracking-widest"
        >
          Featured
        </motion.span>
      </div>

      {/* Bottom: Title + CTA */}
      <div>
        <motion.h3
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: delay + 0.25, duration: 0.4 }}
          className="text-sm md:text-xl lg:text-3xl font-black text-white mb-1 md:mb-2 leading-tight"
        >
          {title}
        </motion.h3>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: delay + 0.3, duration: 0.4 }}
          className="text-[9px] md:text-[11px] text-white/60 mb-2 md:mb-4 font-bold uppercase tracking-wide"
        >
          {itemCount}+ Items
        </motion.p>

        {/* Explore Button - Slides up on hover */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileHover={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <Link
            to={link}
            style={{ backgroundColor: accentColor }}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-white text-[10px] font-black uppercase tracking-widest transition-all duration-300 hover:gap-3 shadow-lg"
          >
            Explore
            <ArrowRight size={14} />
          </Link>
        </motion.div>
      </div>
    </div>
  </motion.div>
);

const PromoCards = () => {
  const categories = [
    {
      title: 'Wrist Watches',
      itemCount: 120,
      image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=700&q=80',
      accentColor: '#EB3461',
      link: '/shop?category=watches',
      rowSpan: 'tall',
    },
    {
      title: 'Premium Perfumes',
      itemCount: 85,
      image: 'https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?w=700&q=80',
      accentColor: '#FCB92F',
      link: '/shop?category=perfumes',
      rowSpan: 'short',
    },
    {
      title: 'Ladies Handbags',
      itemCount: 150,
      image: 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=700&q=80',
      accentColor: '#5680BC',
      link: '/shop?category=handbags',
      rowSpan: 'tall',
    },
    {
      title: 'Edenrobe Fashion',
      itemCount: 200,
      image: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=700&q=80',
      accentColor: '#111111',
      link: '/shop?category=edenrobe',
      rowSpan: 'tall',
    },
    {
      title: 'Gold Jewellery',
      itemCount: 95,
      image: 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=700&q=80',
      accentColor: '#D97706',
      link: '/shop?category=jewellery',
      rowSpan: 'short',
    },
  ];

  return (
    <section className="py-16 md:py-24 px-4 md:px-12 lg:px-16 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-12 md:mb-16 text-center"
        >
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.1 }}
            className="text-[11px] md:text-[13px] font-black uppercase tracking-[0.3em] text-[#EB3461] mb-3 md:mb-4"
          >
            Browse
          </motion.p>
          <h2 className="text-3xl md:text-6xl lg:text-8xl font-black text-gray-900 uppercase tracking-tighter mb-4 md:mb-6 leading-tight">
            Our Categories
          </h2>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-gray-600 text-sm md:text-lg lg:text-xl max-w-2xl mx-auto"
          >
            From KPK's finest selection — discover something new for every style
          </motion.p>
        </motion.div>

        {/* Masonry Grid - 3 columns desktop, 2 columns mobile */}
        <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 auto-rows-[220px] md:auto-rows-[280px] lg:auto-rows-[360px] gap-4 md:gap-6">
          {categories.map((category, idx) => (
            <MasonryCard
              key={idx}
              {...category}
              delay={idx * 0.08}
            />
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.6, duration: 0.6 }}
          className="mt-12 md:mt-20 text-center"
        >
          <Link
            to="/shop"
            className="inline-flex items-center gap-2 md:gap-3 px-8 md:px-12 py-4 md:py-6 bg-[#EB3461] text-white font-black uppercase text-[10px] md:text-sm tracking-widest rounded-full hover:bg-black transition-all duration-300 shadow-2xl hover:shadow-3xl hover:-translate-y-1"
          >
            Browse All Categories
            <ArrowRight size={16} className="md:block hidden" />
            <ArrowRight size={14} className="md:hidden block" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default PromoCards;
