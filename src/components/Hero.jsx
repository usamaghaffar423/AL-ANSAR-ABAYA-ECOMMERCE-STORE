import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, ShoppingBag } from "lucide-react";

const Hero = () => {
  return (
    <section className="relative w-full h-screen min-h-[600px] md:min-h-[700px] overflow-hidden">
      {/* Video Background */}
      <video
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
        className="absolute inset-0 w-full h-full object-cover"
      >
        <source src="/videos/background-video.mp4" type="video/mp4" />
      </video>

      {/* Reddish Overlay */}
      <div className="absolute inset-0 bg-[#EB3461] opacity-35 mix-blend-multiply" />

      {/* Content Container */}
      <div className="relative h-full flex items-center justify-center px-4 md:px-6 lg:px-12">
        <div className="max-w-4xl w-full text-center">
          {/* Animated Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="inline-block mb-6 md:mb-8"
          >
            <div className="px-4 md:px-6 py-2 md:py-3 rounded-full bg-white/15 backdrop-blur-md border border-white/20 text-white text-[10px] md:text-xs font-black uppercase tracking-widest">
              ✨ Premium Pakistani Fashion
            </div>
          </motion.div>

          {/* Main Heading */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-4xl md:text-6xl lg:text-7xl font-black text-white uppercase tracking-tighter leading-tight mb-4 md:mb-6"
          >
            Classy<span className="text-[#EB3461]">fitters</span>
          </motion.h1>

          {/* Subheading */}
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="text-lg md:text-2xl text-white/90 font-bold mb-6 md:mb-10 max-w-2xl mx-auto leading-relaxed"
          >
            Experience authentic KPK style with premium quality fashion that
            defines who you are
          </motion.p>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-sm md:text-base text-white/80 mb-8 md:mb-12 max-w-xl mx-auto leading-relaxed font-medium"
          >
            From Peshawar to the world. Discover exclusive collections crafted
            for the modern Pakistani fashionista.
          </motion.p>

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
              className="group relative px-8 md:px-10 py-4 md:py-5 bg-white text-[#EB3461] font-black uppercase tracking-widest text-sm md:text-base rounded-[20px] hover:bg-yellow-300 transition-all duration-300 shadow-2xl hover:shadow-3xl hover:scale-105 flex items-center gap-2"
            >
              <ShoppingBag size={18} />
              <span>Shop Now</span>
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

      {/* Bottom Gradient Fade */}
      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-white to-transparent pointer-events-none" />
    </section>
  );
};

export default Hero;
