// Al Ansar Abaya Store - Auto-deployed via GitHub Actions ✓ Deployment Test 2
import { IMAGES } from '../constants';
import { ChevronUp, Facebook, Instagram, Youtube } from 'lucide-react';

const TikTokIcon = ({ size = 16 }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
        <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 0 0-.79-.05 6.34 6.34 0 0 0-6.34 6.34 6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.33-6.34V8.69a8.18 8.18 0 0 0 4.78 1.52V6.75a4.85 4.85 0 0 1-1.01-.06z"/>
    </svg>
);
import { Link } from 'react-router-dom';

const Footer = () => {
    return (
        <footer className="relative bg-[#0a0a0a] text-white pt-20 pb-10 px-6 md:px-12 overflow-hidden">
            {/* Decorative Gradient Blobs */}
            <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-[#c9a96e]/8 rounded-full blur-[150px] pointer-events-none" />
            <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-[#c9a96e]/6 rounded-full blur-[120px] pointer-events-none" />

            {/* Gold Accent Line */}
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#c9a96e] via-[#c9a96e]/40 to-transparent" />
            <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-20">
                {/* Brand Column */}
                <div className="relative z-10">
                    <img
                        src={IMAGES.logo}
                        alt="Al Ansar Abaya Store - Premium Abayas"
                        className="h-16 md:h-20 w-auto object-contain mb-6"
                        loading="lazy"
                        decoding="async"
                    />
                    <p className="text-gray-300 text-sm leading-relaxed mb-6 font-medium">
                        Al Ansar Abaya Store – Premium abayas direct from Chakdara, KPK. Authentic quality, fast delivery across Pakistan. Your trusted destination for elegant, premium abayas and Islamic wear.
                    </p>
                    <div className="flex space-x-4">
                        {[
                            { Icon: Instagram, href: 'https://instagram.com/alansarabaya' },
                            { Icon: Facebook, href: 'https://facebook.com/alansarabaya' },
                        ].map((social, idx) => (
                            <a
                                key={idx}
                                href={social.href}
                                target="_blank"
                                rel="noreferrer"
                                className="w-10 h-10 rounded-full border border-[#c9a96e]/30 bg-[#c9a96e]/10 flex items-center justify-center hover:border-[#c9a96e] hover:bg-[#c9a96e] hover:text-[#1a3a2a] transition-all duration-300 text-[#c9a96e]"
                            >
                                <social.Icon size={16} />
                            </a>
                        ))}
                    </div>
                </div>

                {/* Quick Links */}
                <div className="relative z-10">
                    <div className="flex items-center gap-3 mb-8">
                        <div className="w-1 h-6 bg-gradient-to-b from-[#c9a96e] to-[#c9a96e]/40 rounded-full" />
                        <h4 className="font-black text-base mb-0 uppercase tracking-widest text-[#c9a96e]">Quick Links</h4>
                    </div>
                    <ul className="space-y-3 text-gray-400 text-sm">
                        {[
                            { label: 'Shop Home',       href: '/' },
                            { label: 'Browse Products', href: '/shop' },
                            { label: 'Contact Us',       href: '/contact' },
                            { label: 'My Orders',        href: '/profile' },
                        ].map((link) => (
                            <li key={link.label}>
                                <Link to={link.href} className="hover:text-[#c9a96e] transition-colors font-medium">{link.label}</Link>
                            </li>
                        ))}
                    </ul>
                </div>

                {/* Categories */}
                <div className="relative z-10">
                    <div className="flex items-center gap-3 mb-8">
                        <div className="w-1 h-6 bg-gradient-to-b from-[#c9a96e] to-[#c9a96e]/40 rounded-full" />
                        <h4 className="font-black text-base mb-0 uppercase tracking-widest text-[#c9a96e]">All Categories</h4>
                    </div>
                    <ul className="space-y-3 text-gray-400 text-sm">
                        {[
                            { label: 'Premium Abayas', href: '/shop' },
                            { label: 'Scarves & Hijabs', href: '/shop' },
                            { label: 'Niqab & Face Covers', href: '/shop' },
                            { label: 'New Arrivals', href: '/shop?trending=1' }
                        ].map((link) => (
                            <li key={link.label}>
                                <Link to={link.href} className="hover:text-[#c9a96e] transition-colors font-medium">{link.label}</Link>
                            </li>
                        ))}
                    </ul>
                </div>

                {/* Contact */}
                <div className="relative z-10">
                    <div className="flex items-center gap-3 mb-8">
                        <div className="w-1 h-6 bg-gradient-to-b from-[#c9a96e] to-[#c9a96e]/40 rounded-full" />
                        <h4 className="font-black text-base mb-0 uppercase tracking-widest text-[#c9a96e]">Contact Info</h4>
                    </div>
                    <div className="space-y-4 text-gray-400 text-sm">
                        <div className="flex items-start gap-3 group">
                            <span className="text-[#c9a96e] text-lg group-hover:scale-110 transition-transform">📍</span>
                            <p className="font-medium">Chakdara, Dir Lower,<br />KPK, Pakistan</p>
                        </div>
                        <a href="tel:+923481099433" className="flex items-center gap-3 hover:text-[#c9a96e] transition-colors group">
                            <span className="text-[#c9a96e] text-lg group-hover:scale-110 transition-transform">📞</span>
                            <span className="font-medium">+92 348 1099433</span>
                        </a>
                        <a href="https://wa.me/923481099433" target="_blank" rel="noreferrer" className="flex items-center gap-3 hover:text-[#c9a96e] transition-colors group">
                            <span className="text-[#c9a96e] text-lg group-hover:scale-110 transition-transform">💬</span>
                            <span className="font-medium">WhatsApp Us</span>
                        </a>
                        <a href="mailto:support@alansarabaya.pk" className="flex items-center gap-3 hover:text-[#c9a96e] transition-colors group">
                            <span className="text-[#c9a96e] text-lg group-hover:scale-110 transition-transform">✉️</span>
                            <span className="font-medium">support@alansarabaya.pk</span>
                        </a>
                    </div>
                </div>
            </div>

            <div className="relative z-10 max-w-7xl mx-auto pt-10 border-t border-gray-700 text-center flex flex-col md:flex-row justify-between items-center text-gray-500 text-[10px] font-bold uppercase tracking-widest">
                <p>Copyright © 2026 | Al Ansar Abaya Store — KPK's Premium Destination</p>
                <div className="flex space-x-8 mt-4 md:mt-0">
                    <Link to="/" className="hover:text-[#c9a96e] transition-colors text-[#c9a96e]">Privacy Policy</Link>
                    <Link to="/" className="hover:text-[#c9a96e] transition-colors">Terms & Conditions</Link>
                </div>
            </div>

            <button
                onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                className="fixed bottom-8 left-8 bg-[#c9a96e] text-[#1a3a2a] p-3 rounded-full shadow-2xl shadow-[#c9a96e]/40 hover:bg-white hover:shadow-[#c9a96e]/60 transition-all hover:-translate-y-2 z-50 border-4 border-[#c9a96e]/30 font-black"
            >
                <ChevronUp size={24} />
            </button>
        </footer>
    );
};

export default Footer;



