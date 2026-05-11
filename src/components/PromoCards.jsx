import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

const PremiumCard = ({ title, subtitle, link, delay, icon, isLarge }) => {
  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.6, delay, ease: 'easeOut' }}
      className={`group relative overflow-hidden cursor-pointer rounded-[32px] border border-[#c9a96e]/20 hover:border-[#c9a96e]/60 transition-all duration-500 flex flex-col justify-between p-8 ${
        isLarge
          ? 'bg-gradient-to-br from-[#1a3a2a]/5 to-[#c9a96e]/10 md:col-span-2 md:row-span-2 min-h-[280px] md:min-h-[400px]'
          : 'bg-white hover:bg-gradient-to-br hover:from-white hover:to-[#f5efe6] min-h-[220px] md:min-h-[240px] shadow-sm hover:shadow-xl hover:shadow-[#c9a96e]/20'
      }`}
      role="link"
      tabIndex="0"
      aria-label={`${title}, ${subtitle}`}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          window.location.href = link;
        }
      }}
    >
      {/* Background Accent */}
      <div className="absolute -top-20 -right-20 w-40 h-40 bg-[#c9a96e]/5 rounded-full blur-3xl group-hover:bg-[#c9a96e]/10 transition-all duration-500 pointer-events-none" />

      {/* Icon */}
      <div className={`relative z-10 mb-6 ${isLarge ? 'text-6xl md:text-7xl' : 'text-5xl'} transform group-hover:scale-110 transition-transform duration-300`}>
        {icon}
      </div>

      {/* Content */}
      <div className="relative z-10 flex-1 flex flex-col justify-between">
        <div>
          <h3 className={`font-black text-gray-900 uppercase tracking-tight mb-2 group-hover:text-[#1a3a2a] transition-colors ${
            isLarge ? 'text-2xl md:text-4xl leading-tight' : 'text-lg md:text-xl'
          }`}>
            {title}
          </h3>
          <p className="text-[10px] md:text-[11px] text-[#c9a96e] font-bold uppercase tracking-widest mb-4">
            {subtitle}
          </p>
        </div>

        {/* Animated Bottom Border */}
        <div className="flex items-center justify-between pt-4 border-t border-[#c9a96e]/20 group-hover:border-[#c9a96e]/40 transition-colors">
          <div />
          <Link
            to={link}
            className="inline-flex items-center gap-2 text-[#1a3a2a] text-[9px] md:text-[10px] font-black uppercase tracking-widest hover:text-[#c9a96e] transition-colors group-hover:gap-3"
          >
            Shop Now
            <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>
    </motion.article>
  );
};

const PromoCards = () => {
  const categories = [
    {
      title: 'Premium Abayas',
      subtitle: '150+ Items',
      icon: '👑',
      link: '/shop?category=premium-abayas',
    },
    {
      title: 'Embroidered Abayas',
      subtitle: '120+ Items',
      icon: '✨',
      link: '/shop?category=embroidered-abayas',
    },
    {
      title: 'Plain Abayas',
      subtitle: '180+ Items',
      icon: '🎀',
      link: '/shop?category=plain-abayas',
    },
    {
      title: 'Casual Abayas',
      subtitle: '200+ Items',
      icon: '👗',
      link: '/shop?category=casual-abayas',
    },
    {
      title: 'Formal Abayas',
      subtitle: '95+ Items',
      icon: '💎',
      link: '/shop?category=formal-abayas',
    },
    {
      title: 'Designer Abayas',
      subtitle: '85+ Items',
      icon: '👸',
      link: '/shop?category=designer-abayas',
    },
    {
      title: 'Wedding Abayas',
      subtitle: '75+ Items',
      icon: '💍',
      link: '/shop?category=wedding-abayas',
    },
    {
      title: 'Niqabs',
      subtitle: '110+ Items',
      icon: '🧕',
      link: '/shop?category=niqabs',
    },
    {
      title: 'Hijabs & Scarves',
      subtitle: '140+ Items',
      icon: '🧣',
      link: '/shop?category=hijabs-scarves',
    },
  ];

  return (
    <section className="py-16 md:py-24 px-4 md:px-8 lg:px-16 bg-[#f5efe6] overflow-hidden">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-12 md:mb-16 flex flex-col md:flex-row md:items-center md:justify-between"
        >
          <div>
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: 0.1 }}
              className="text-[11px] md:text-xs font-black uppercase tracking-widest text-[#1a3a2a] mb-2 md:mb-3 border-l-4 border-[#c9a96e] pl-3"
            >
              Curated Collections
            </motion.p>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-gray-900 uppercase tracking-tight leading-tight">
              Shop By Category
            </h2>
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            <Link
              to="/shop"
              className="inline-flex items-center gap-2 text-[#c9a96e] font-black text-sm uppercase tracking-widest hover:text-[#1a3a2a] transition-colors mt-4 md:mt-0"
            >
              Browse All
              <ArrowRight size={16} />
            </Link>
          </motion.div>
        </motion.div>

        {/* Premium Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-5 lg:gap-6" role="region" aria-label="Abaya product categories">
          {categories.map((category, idx) => (
            <PremiumCard
              key={idx}
              {...category}
              delay={idx * 0.08}
              isLarge={idx === 0}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default PromoCards;


