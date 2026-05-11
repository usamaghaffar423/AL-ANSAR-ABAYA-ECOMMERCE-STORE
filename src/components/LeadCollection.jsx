import React, { useEffect, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, Zap } from 'lucide-react';

// ── Marquee text strip ────────────────────────────────────────────────────────
const MARQUEE_ITEMS = [
    'BOLQA HOUSE',  '✦',  'KPK KA STYLE',  '✦',
    'PREMIUM ABAYAS',  '✦',  'APNI GAME UP KAR',  '✦',
    'NEW ARRIVALS',   '✦',  'DESI DRIP',     '✦',
    'FRESH FITS ONLY','✦',  'DIR TO PESHAWAR', '✦',
];

const Marquee = ({ reverse = false }) => {
    const items = [...MARQUEE_ITEMS, ...MARQUEE_ITEMS];
    return (
        <div className="overflow-hidden whitespace-nowrap py-3">
            <motion.div
                className="inline-flex gap-8"
                animate={{ x: reverse ? ['0%', '50%'] : ['0%', '-50%'] }}
                transition={{ repeat: Infinity, duration: 22, ease: 'linear' }}
            >
                {items.map((item, i) => (
                    <span key={i} className={`text-[11px] font-black uppercase tracking-[0.3em] ${
                        item === '✦' ? 'text-[#1a3a2a]' : 'text-white/60'
                    }`}>
                        {item}
                    </span>
                ))}
            </motion.div>
        </div>
    );
};

// ── Floating word pill ────────────────────────────────────────────────────────
const Pill = ({ children, className = '', delay = 0 }) => (
    <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay, duration: 0.6, ease: 'easeOut' }}
        className={`absolute backdrop-blur-md rounded-2xl px-4 py-2.5 text-[10px] font-black uppercase tracking-widest text-white hover:scale-110 transition-transform ${className}`}
    >
        {children}
    </motion.div>
);

// ── Main Banner ───────────────────────────────────────────────────────────────
const LeadCollection = () => {
    const navigate = useNavigate();
    const ref      = useRef(null);

    const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
    const bgY   = useTransform(scrollYProgress, [0, 1], ['0%', '15%']);
    const textY = useTransform(scrollYProgress, [0, 1], ['0%', '-8%']);

    return (
        <section ref={ref} className="relative overflow-hidden py-0" aria-label="Trending abaya collection banner">

            {/* ── Gradient Background ── */}
            <div className="absolute inset-0 bg-gradient-to-br from-[#1a3a2a] via-[#2d6a4f] to-[#0f2818]" />

            {/* Decorative Elements */}
            <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-[#c9a96e]/15 rounded-full blur-[150px] pointer-events-none" />
            <div className="absolute bottom-0 left-1/4 w-[500px] h-[500px] bg-[#c9a96e]/10 rounded-full blur-[140px] pointer-events-none" />
            <div className="absolute top-1/3 left-0 w-[400px] h-[400px] bg-[#a07840]/8 rounded-full blur-[120px] pointer-events-none" />

            {/* ── Top marquee strip ── */}
            <div className="bg-[#0f2818] border-b border-[#c9a96e]/20 py-0.5">
                <Marquee />
            </div>

            {/* ── Main content ── */}
            <div className="relative min-h-[620px] md:min-h-[680px] flex items-center overflow-hidden">

                {/* Background image with parallax - Gold tinted */}
                <motion.div style={{ y: bgY }} className="absolute inset-0 scale-110 opacity-5">
                    <img
                        src="https://images.unsplash.com/photo-1523398002811-999ca8dec234?auto=format&fit=crop&q=80&w=1600"
                        alt=""
                        className="w-full h-full object-cover"
                    />
                </motion.div>

                {/* Gradient overlays with brand colors */}
                <div className="absolute inset-0 bg-gradient-to-r from-[#1a3a2a] via-[#2d6a4f]/60 to-transparent" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#1a3a2a]/80 via-transparent to-transparent" />

                {/* Gold accent line */}
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#c9a96e] via-[#c9a96e] to-transparent" />

                {/* Floating pills with brand colors */}
                <Pill className="hidden lg:block bg-[#c9a96e]/15 border-[#c9a96e]/30 top-16 right-[20%]" delay={0.4}>🔥 Trending Now</Pill>
                <Pill className="hidden lg:block bg-[#c9a96e]/10 border-[#c9a96e]/20 top-32 right-[10%]" delay={0.6}>KPK Exclusive</Pill>
                <Pill className="hidden lg:block bg-[#a07840]/15 border-[#a07840]/30 bottom-24 right-[18%]" delay={0.8}>Free Delivery</Pill>
                <Pill className="hidden lg:block bg-[#c9a96e]/10 border-[#c9a96e]/20 bottom-16 right-[32%]" delay={1.0}>New Drop ✦</Pill>

                {/* Main copy */}
                <motion.div
                    style={{ y: textY }}
                    className="relative z-10 max-w-5xl mx-auto px-6 lg:px-12 w-full text-center"
                >
                    {/* Eyebrow Label */}
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="inline-flex items-center gap-2 mb-8 bg-[#c9a96e]/15 border border-[#c9a96e]/30 rounded-full px-5 py-2.5"
                    >
                        <span className="text-[#c9a96e] text-xs font-black uppercase tracking-widest">
                            ✦ Trending Collection
                        </span>
                    </motion.div>

                    {/* Headline — Mega Bold */}
                    <motion.h2
                        initial={{ opacity: 0, y: 40 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, delay: 0.1 }}
                        className="text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-black text-white uppercase tracking-tighter leading-none mb-6"
                    >
                        Stay Ahead <span className="text-[#c9a96e]">In Style</span><br />
                        <span className="text-[#c9a96e]">Always!</span>
                    </motion.h2>

                    {/* Divider */}
                    <motion.div
                        initial={{ opacity: 0, scaleX: 0 }}
                        whileInView={{ opacity: 1, scaleX: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="h-1 w-32 bg-gradient-to-r from-[#c9a96e] to-transparent mx-auto mb-8"
                    />

                    {/* Description */}
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.3 }}
                        className="text-white/80 text-lg md:text-xl font-bold leading-relaxed mb-3 max-w-2xl mx-auto"
                    >
                        Dost puchenge <span className="text-[#c9a96e] italic">"Yaar yeh abaya kahan se liya?"</span>
                    </motion.p>

                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.35 }}
                        className="text-white/60 text-base font-medium mb-10"
                    >
                        Bas Al Ansar Abaya ka naam bata dena. Peshawar se Mardan, Mingora se Batkhela — Poore KPK ka favourite. ✦
                    </motion.p>

                    {/* CTAs */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.4 }}
                        className="flex flex-col sm:flex-row gap-4 md:gap-6 justify-center items-center"
                    >
                        <motion.button
                            onClick={() => navigate('/shop')}
                            whileHover={{ scale: 1.05, translateY: -2 }}
                            whileTap={{ scale: 0.98 }}
                            className="group flex items-center gap-3 bg-[#c9a96e] text-[#1a3a2a] px-10 md:px-12 py-4 md:py-5 rounded-full font-black uppercase text-sm md:text-base tracking-widest shadow-2xl shadow-[#c9a96e]/40 hover:shadow-2xl hover:shadow-[#c9a96e]/60 transition-all"
                        >
                            <Zap size={18} className="transition-colors" />
                            Apna Look Dhundho
                            <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                        </motion.button>

                        <motion.button
                            onClick={() => navigate('/shop')}
                            whileHover={{ scale: 1.05, translateY: -2 }}
                            whileTap={{ scale: 0.98 }}
                            className="flex items-center gap-3 border-2 border-[#c9a96e] text-[#c9a96e] px-10 md:px-12 py-4 md:py-5 rounded-full font-black uppercase text-sm md:text-base tracking-widest hover:bg-[#c9a96e] hover:text-[#1a3a2a] hover:shadow-2xl hover:shadow-[#c9a96e]/40 transition-all"
                        >
                            <span>New Arrivals</span>
                            <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                        </motion.button>
                    </motion.div>

                    {/* Social proof row */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, delay: 0.5 }}
                        className="flex flex-wrap justify-center gap-6 md:gap-12 mt-16 pt-12 border-t border-[#c9a96e]/20"
                    >
                        {[
                            { number: '2,000+', label: 'Happy Customers' },
                            { number: '100+',   label: 'Premium Products' },
                            { number: '5★',     label: 'Avg. Rating' },
                            { number: '3 Days', label: 'KPK Delivery' },
                        ].map(({ number, label }) => (
                            <motion.div
                                key={label}
                                whileHover={{ scale: 1.1 }}
                                className="text-center"
                            >
                                <p className="text-3xl md:text-4xl font-black text-[#c9a96e] tracking-tighter leading-none">{number}</p>
                                <p className="text-[10px] md:text-xs font-black uppercase tracking-widest text-white/70 mt-2">{label}</p>
                            </motion.div>
                        ))}
                    </motion.div>
                </motion.div>
            </div>

            {/* ── Bottom marquee strip ── */}
            <div className="bg-[#0f2818] border-t border-[#c9a96e]/20">
                <Marquee reverse />
            </div>
        </section>
    );
};

export default LeadCollection;


