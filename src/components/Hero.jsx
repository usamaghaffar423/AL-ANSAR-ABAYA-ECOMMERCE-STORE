import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, ShoppingBag } from "lucide-react";

// Reduce animations on mobile/low-performance devices
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const isMobile = window.innerWidth < 768;

const Hero = () => {
  return (
    <section id="main-content" className="relative w-full h-screen min-h-[600px] md:min-h-[700px] overflow-hidden bg-black">
      {/* Video Background */}
      <video
        autoPlay
        muted
        loop
        playsInline
        preload="none"
        poster="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1920 1080'%3E%3Crect fill='%231a1a1a'/%3E%3C/svg%3E"
        aria-label="Premium abayas hero background video"
        className="absolute inset-0 w-full h-full object-cover"
      >
        <source src="/videos/background-video.mp4" type="video/mp4" />
      </video>

      {/* Dark Green Base Overlay */}
      <div className="absolute inset-0 bg-[#1a3a2a] opacity-40 mix-blend-multiply" />

      {/* Brand Color Gradient Overlay for Shining Effect */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#1a3a2a]/60 via-[#2d6a4f]/40 to-[#c9a96e]/20 mix-blend-overlay" />

      {/* Gold Accent Glow */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#c9a96e]/10 via-transparent to-transparent mix-blend-screen" />

      {/* Content Container */}
      <div className="relative h-full flex items-center justify-center px-4 md:px-6 lg:px-12">
        <div className="max-w-5xl w-full text-center">
          {/* Premium Badge */}
          <motion.div
            initial={prefersReducedMotion ? false : { opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={prefersReducedMotion ? { duration: 0 } : { duration: isMobile ? 0.5 : 0.7, delay: 0.1 }}
            className="inline-block mb-6 md:mb-8"
          >
            <div className="px-6 md:px-8 py-2.5 md:py-3.5 rounded-full bg-[#c9a96e]/20 backdrop-blur-md border border-[#c9a96e]/40 text-[#c9a96e] text-[11px] md:text-sm font-black uppercase tracking-widest">
              ✦ Premium Abayas Direct from KPK
            </div>
          </motion.div>

          {/* Main Heading - Extra Large */}
          <motion.h1
            initial={prefersReducedMotion ? false : { opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={prefersReducedMotion ? { duration: 0 } : { duration: isMobile ? 0.6 : 0.9, delay: isMobile ? 0 : 0.2 }}
            className="text-6xl md:text-8xl lg:text-9xl font-black text-white uppercase tracking-tighter leading-none mb-4 md:mb-6"
          >
            Al Ansar<br />
            <span className="text-[#c9a96e]">Abaya Store</span>
          </motion.h1>

          {/* Divider */}
          <motion.div
            initial={{ opacity: 0, scaleX: 0 }}
            animate={{ opacity: 1, scaleX: 1 }}
            transition={{ duration: 0.8, delay: 0.35 }}
            className="h-1 w-24 bg-gradient-to-r from-[#c9a96e] to-white/20 mx-auto mb-8 md:mb-10"
          />

          {/* Main Value Proposition */}
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-xl md:text-3xl lg:text-4xl font-black text-white mb-6 md:mb-8 leading-tight"
          >
            Authentic Premium Abayas, Direct from Chakdara
          </motion.p>

          {/* Key Benefits */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="flex flex-col sm:flex-row justify-center gap-4 md:gap-8 mb-12 md:mb-16 text-white/90 text-sm md:text-base font-bold"
          >
            <div className="flex items-center gap-2">
              <span className="text-[#c9a96e] font-black">✓</span>
              Fast KPK-Wide Delivery
            </div>
            <div className="flex items-center gap-2">
              <span className="text-[#c9a96e] font-black">✓</span>
              100% Authentic
            </div>
            <div className="flex items-center gap-2">
              <span className="text-[#c9a96e] font-black">✓</span>
              Easy Returns
            </div>
          </motion.div>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="flex flex-col sm:flex-row gap-4 md:gap-6 justify-center items-center"
          >
            {/* Primary CTA */}
            <Link
              to="/shop"
              className="group relative px-8 md:px-10 py-4 md:py-5 bg-white text-[#1a3a2a] font-black uppercase tracking-widest text-sm md:text-base rounded-[20px] hover:bg-[#c9a96e] hover:text-white transition-all duration-300 shadow-2xl hover:shadow-3xl hover:scale-105 flex items-center gap-2"
            >
              <ShoppingBag size={18} />
              <span>Abhi Shop Karein</span>
              <ArrowRight
                size={16}
                className="group-hover:translate-x-1 transition-transform"
              />
            </Link>

            {/* Secondary CTA */}
            <Link
              to="/shop?trending=1"
              className="group px-8 md:px-10 py-4 md:py-5 border-2 border-white text-white font-black uppercase tracking-widest text-sm md:text-base rounded-[20px] hover:bg-white/10 transition-all duration-300 backdrop-blur-sm hover:scale-105 flex items-center gap-2"
            >
              <span>New Arrivals</span>
              <ArrowRight
                size={16}
                className="group-hover:translate-x-1 transition-transform"
              />
            </Link>
          </motion.div>

          {/* Bottom Stats */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="mt-12 md:mt-16 pt-8 md:pt-12 border-t border-white/20 flex justify-around text-center"
          >
            <div>
              <p className="text-2xl md:text-3xl font-black text-white">500+</p>
              <p className="text-white/70 text-xs md:text-sm font-bold uppercase tracking-wide mt-1">
                Products
              </p>
            </div>
            <div>
              <p className="text-2xl md:text-3xl font-black text-white">
                24hrs
              </p>
              <p className="text-white/70 text-xs md:text-sm font-bold uppercase tracking-wide mt-1">
                Delivery
              </p>
            </div>
            <div>
              <p className="text-2xl md:text-3xl font-black text-white">100%</p>
              <p className="text-white/70 text-xs md:text-sm font-bold uppercase tracking-wide mt-1">
                Authentic
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Hero;



