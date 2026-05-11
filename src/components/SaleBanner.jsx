import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { IMAGES } from "../constants";
import { Zap } from "lucide-react";

const getTimeLeft = () => {
  const midnight = new Date();
  midnight.setHours(24, 0, 0, 0);
  const diff = midnight - new Date();
  return {
    days: String(Math.floor(diff / (1000 * 60 * 60 * 24))).padStart(2, "0"),
    hrs: String(Math.floor((diff / (1000 * 60 * 60)) % 24)).padStart(2, "0"),
    min: String(Math.floor((diff / (1000 * 60)) % 60)).padStart(2, "0"),
    sec: String(Math.floor((diff / 1000) % 60)).padStart(2, "0"),
  };
};

const SaleBanner = () => {
  const [time, setTime] = useState(getTimeLeft);

  useEffect(() => {
    const interval = setInterval(() => setTime(getTimeLeft()), 1000);
    return () => clearInterval(interval);
  }, []);

  const units = [
    { label: "Days", val: time.days },
    { label: "Hours", val: time.hrs },
    { label: "Minutes", val: time.min },
    { label: "Seconds", val: time.sec },
  ];

  return (
    <div className="relative mt-0">
      <section className="relative overflow-hidden py-16 md:py-24">
        {/* Gradient Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#1a3a2a] via-[#2d6a4f] to-[#1a3a2a]" />

        {/* Gold Accent Blobs */}
        <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-[#c9a96e]/10 rounded-full blur-[100px] pointer-events-none" />
        <div className="absolute bottom-0 left-1/4 w-[300px] h-[300px] bg-[#c9a96e]/8 rounded-full blur-[80px] pointer-events-none" />

        {/* Faint background text */}
        <div className="absolute top-1/2 left-0 -translate-y-1/2 text-[12vw] md:text-[15vw] font-black text-white opacity-[0.05] whitespace-nowrap pointer-events-none select-none">
          FLASH SALE
        </div>

        {/* Content */}
        <div className="relative max-w-5xl mx-auto px-4 md:px-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-white text-center"
          >
            {/* Label */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="flex items-center gap-2 mb-4 justify-center"
            >
                <Zap size={20} className="text-[#c9a96e]" />
                <span className="text-[#c9a96e] text-xs md:text-sm font-black uppercase tracking-widest">
                  Limited Time Offer
                </span>
              </motion.div>

            {/* Main Heading */}
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.15 }}
              className="text-5xl md:text-7xl lg:text-8xl font-black uppercase mb-3 leading-tight"
            >
              Upto <span className="text-[#c9a96e]">30% OFF</span>
            </motion.h2>

            {/* Subheading */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-lg md:text-2xl font-bold text-white/90 mb-12 uppercase tracking-wide"
            >
              Sirf Aaj Tak Ka Mauqaa!
            </motion.p>

            {/* Countdown Timer */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.25 }}
              className="flex gap-2 md:gap-4 mb-12 justify-center flex-wrap"
            >
                {units.map((unit, i) => (
                  <div
                    key={i}
                    className="flex flex-col items-center bg-white/10 backdrop-blur-md border border-[#c9a96e]/30 rounded-2xl px-3 md:px-6 py-3 md:py-4 min-w-fit hover:border-[#c9a96e]/60 transition-all"
                  >
                    <p className="text-2xl md:text-4xl font-black text-[#c9a96e] tabular-nums leading-none">
                      {unit.val}
                    </p>
                    <p className="text-[8px] md:text-xs uppercase tracking-widest font-bold text-white/70 mt-2">
                      {unit.label}
                    </p>
                  </div>
                ))}
              </motion.div>

            {/* CTA Button */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <Link
                to="/shop"
                className="inline-flex items-center gap-3 bg-[#c9a96e] text-[#1a3a2a] px-8 md:px-12 py-4 md:py-5 rounded-full font-black uppercase tracking-widest text-sm md:text-base hover:bg-white hover:shadow-2xl transition-all duration-300 shadow-lg hover:shadow-[#c9a96e]/40"
              >
                <Zap size={18} />
                Ab Shop Karo
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default SaleBanner;


