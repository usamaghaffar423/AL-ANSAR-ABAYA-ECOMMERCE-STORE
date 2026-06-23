import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { IMAGES } from '../constants';
import { IMAGE_BASE_URL } from '../config';

const PremiumCard = ({ title, subtitle, link, delay, icon, isLarge, backgroundImage }) => {
  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.6, delay, ease: 'easeOut' }}
      className={`group relative overflow-hidden cursor-pointer rounded-[32px] border border-[#c9a96e]/20 hover:border-[#c9a96e]/60 transition-all duration-500 flex flex-col justify-between ${
        backgroundImage ? 'p-0' : 'p-8'
      } ${
        backgroundImage
          ? isLarge
            ? 'md:col-span-2 md:row-span-2 min-h-[280px] md:min-h-[400px]'
            : 'min-h-[220px] md:min-h-[240px]'
          : isLarge
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
      style={backgroundImage ? {
        backgroundImage: `url('${backgroundImage}')`,
        backgroundSize: 'contain',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
      } : {}}
    >
      {/* Category Badge - Top of card */}
      {backgroundImage && (
        <div className="absolute top-4 left-4 z-20 bg-[#c9a96e] text-gray-900 px-4 py-2 rounded-full text-[8px] md:text-[9px] font-black uppercase tracking-widest">
          {title}
        </div>
      )}

      {/* Background Accent - Only for non-image cards */}
      {!backgroundImage && (
        <div className="absolute -top-20 -right-20 w-40 h-40 bg-[#c9a96e]/5 rounded-full blur-3xl group-hover:bg-[#c9a96e]/10 transition-all duration-500 pointer-events-none" />
      )}

      {/* Icon - Only for non-image cards */}
      {!backgroundImage && (
        <div className={`relative z-10 mb-6 ${isLarge ? 'text-6xl md:text-7xl' : 'text-5xl'} transform group-hover:scale-110 transition-transform duration-300`}>
          {icon}
        </div>
      )}

      {/* Content */}
      <div className={`relative z-10 flex-1 flex flex-col ${backgroundImage ? 'justify-end p-6 md:p-8' : 'justify-between'}`}>
        {/* Text Content - Only for non-image cards */}
        {!backgroundImage && (
          <div>
            <h3 className={`font-black uppercase tracking-tight mb-2 group-hover:text-[#1a3a2a] transition-colors text-gray-900 ${
              isLarge ? 'text-2xl md:text-4xl leading-tight' : 'text-lg md:text-xl'
            }`}>
              {title}
            </h3>
            <p className="text-[10px] md:text-[11px] font-bold uppercase tracking-widest mb-4 text-[#c9a96e]">
              {subtitle}
            </p>
          </div>
        )}

        {/* Button */}
        <div className={`flex items-center ${backgroundImage ? 'justify-start' : 'justify-between pt-4 border-t border-[#c9a96e]/20 group-hover:border-[#c9a96e]/40 transition-colors'}`}>
          {!backgroundImage && <div />}
          <Link
            to={link}
            className={`inline-flex items-center gap-2 font-black uppercase tracking-widest transition-all group-hover:gap-3 text-[9px] md:text-[10px] ${
              backgroundImage
                ? isLarge
                  ? 'text-white bg-[#1a3a2a] px-6 py-2.5 rounded-lg hover:bg-[#0f2817] shadow-lg'
                  : 'text-[#1a3a2a] hover:text-[#c9a96e]'
                : 'text-[#1a3a2a] hover:text-[#c9a96e]'
            }`}
          >
            {backgroundImage ? 'Explore More' : 'Shop Now'}
            <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>
    </motion.article>
  );
};

const PromoCards = () => {
  // Categories with featured images
  const categories = [
    { title: 'Simple Abayas', subtitle: 'Elegant & Timeless', icon: '👗', id: 1, backgroundImage: IMAGES.simple_abaya },
    { title: 'Open Abayas', subtitle: 'Modern Cuts', icon: '✨', id: 2, backgroundImage: IMAGES.open_abaya },
    { title: 'Maxi Simple Galla', subtitle: 'Long & Flowing', icon: '🎀', id: 3, backgroundImage: IMAGES.maxi_simple_galla },
    { title: 'Maxi Cut Galla', subtitle: 'Premium Tailoring', icon: '👑', id: 4, backgroundImage: IMAGES.maxi_cut_galla },
    { title: 'Embroidered Abayas', subtitle: 'Party & Special', icon: '💎', id: 5, backgroundImage: IMAGES.embroidered_abayas },
    { title: 'Straight Open Abayas', subtitle: 'Exquisite Details', icon: '✨', id: 6, backgroundImage: IMAGES.straight_open_abayas },
    { title: 'Zoom Fabric Abayas', subtitle: 'Premium Quality', icon: '🌟', id: 7, backgroundImage: IMAGES.zoom_fabric_abayas },
    { title: 'Nida Fabrics Abayas', subtitle: 'Sophisticated Style', icon: '👸', id: 8, backgroundImage: IMAGES.nida_fabrics_abayas },
    { title: 'Handmade', subtitle: 'Artisan Crafted', icon: '🎨', id: 9, backgroundImage: IMAGES.handmade_abayas },
    { title: 'Butterfly', subtitle: 'Unique Designs', icon: '🦋', id: 10, backgroundImage: IMAGES.butterfly_abayas },
    { title: 'Double Shirt Abayas', subtitle: 'Double Layer Style', icon: '👔', id: 11, backgroundImage: IMAGES.double_shirt_abayas },
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
              key={category.id}
              title={category.title}
              subtitle={category.subtitle}
              icon={category.icon}
              link={`/shop?category_id=${category.id}`}
              delay={idx * 0.08}
              isLarge={idx === 0}
              backgroundImage={category.backgroundImage}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default PromoCards;


