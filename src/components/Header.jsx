import { useState, useEffect, useRef } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import {
  Search,
  User,
  ShoppingBag,
  Facebook,
  Instagram,
  Mail,
  ChevronDown,
  Menu,
  X,
  ArrowRight,
  LogOut,
  Phone,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";
import { API_BASE_URL } from "../config";
import { IMAGES } from "../constants";
import SearchModal from "./SearchModal";

const NAV_ITEMS = [
  { label: "Home", href: "/" },
  { label: "Shop", href: "/shop" },
  {
    label: "New Arrivals",
    href: "/shop?trending=1",
    badge: "New",
    badgeColor: "bg-emerald-500",
  },
  {
    label: "Sale",
    href: "/shop",
    badge: "30% Off",
    badgeColor: "bg-[#EB3461]",
  },
  { label: "My Orders", href: "/profile" },
  { label: "Contact", href: "/contact" },
];

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isCatOpen, setIsCatOpen] = useState(false);
  const [isMobileCatOpen, setIsMobileCatOpen] = useState(false);
  const [categories, setCategories] = useState([]);
  const catTimeoutRef = useRef(null);

  const { cartCount, setIsCartOpen } = useCart();
  const { user, logout, isAdmin } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  // Fetch top-level categories for the mega menu
  useEffect(() => {
    fetch(`${API_BASE_URL}/get_categories.php`)
      .then((r) => (r.ok ? r.json() : []))
      .then((data) => {
        if (Array.isArray(data)) {
          setCategories(data);
        }
      })
      .catch(() => {});
  }, []);

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = isMobileMenuOpen ? "hidden" : "unset";
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isMobileMenuOpen]);

  // Close all menus when navigating
  useEffect(() => {
    setIsCatOpen(false);
    setIsMobileMenuOpen(false);
  }, [location.pathname]);

  const visibleNavItems = NAV_ITEMS;

  const openCat = () => {
    clearTimeout(catTimeoutRef.current);
    setIsCatOpen(true);
  };
  const closeCat = () => {
    catTimeoutRef.current = setTimeout(() => setIsCatOpen(false), 150);
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ease-in-out`}
      >
        {/* ── Top Info Bar ──────────────────────────────────── */}
        <div class="bg-[#EB3461] py-0.5">
          <div class="overflow-hidden whitespace-nowrap py-3">
            <div
              class="inline-flex gap-8"
              style="transform: translateX(-6.78636%);"
            >
              <span class="text-[11px] font-black uppercase tracking-[0.3em] text-white/60">
                CLASSYFITTERS
              </span>
              <span class="text-[11px] font-black uppercase tracking-[0.3em] text-[#EB3461]">
                ✦
              </span>
              <span class="text-[11px] font-black uppercase tracking-[0.3em] text-white/60">
                KPK KA STYLE
              </span>
              <span class="text-[11px] font-black uppercase tracking-[0.3em] text-[#EB3461]">
                ✦
              </span>
              <span class="text-[11px] font-black uppercase tracking-[0.3em] text-white/60">
                PESHAWAR SWAG
              </span>
              <span class="text-[11px] font-black uppercase tracking-[0.3em] text-[#EB3461]">
                ✦
              </span>
              <span class="text-[11px] font-black uppercase tracking-[0.3em] text-white/60">
                APNI GAME UP KAR
              </span>
              <span class="text-[11px] font-black uppercase tracking-[0.3em] text-[#EB3461]">
                ✦
              </span>
              <span class="text-[11px] font-black uppercase tracking-[0.3em] text-white/60">
                NEW ARRIVALS
              </span>
              <span class="text-[11px] font-black uppercase tracking-[0.3em] text-[#EB3461]">
                ✦
              </span>
              <span class="text-[11px] font-black uppercase tracking-[0.3em] text-white/60">
                DESI DRIP
              </span>
              <span class="text-[11px] font-black uppercase tracking-[0.3em] text-[#EB3461]">
                ✦
              </span>
              <span class="text-[11px] font-black uppercase tracking-[0.3em] text-white/60">
                FRESH FITS ONLY
              </span>
              <span class="text-[11px] font-black uppercase tracking-[0.3em] text-[#EB3461]">
                ✦
              </span>
              <span class="text-[11px] font-black uppercase tracking-[0.3em] text-white/60">
                MARDAN TO MINGORA
              </span>
              <span class="text-[11px] font-black uppercase tracking-[0.3em] text-[#EB3461]">
                ✦
              </span>
              <span class="text-[11px] font-black uppercase tracking-[0.3em] text-white/60">
                CLASSYFITTERS
              </span>
              <span class="text-[11px] font-black uppercase tracking-[0.3em] text-[#EB3461]">
                ✦
              </span>
              <span class="text-[11px] font-black uppercase tracking-[0.3em] text-white/60">
                KPK KA STYLE
              </span>
              <span class="text-[11px] font-black uppercase tracking-[0.3em] text-[#EB3461]">
                ✦
              </span>
              <span class="text-[11px] font-black uppercase tracking-[0.3em] text-white/60">
                PESHAWAR SWAG
              </span>
              <span class="text-[11px] font-black uppercase tracking-[0.3em] text-[#EB3461]">
                ✦
              </span>
              <span class="text-[11px] font-black uppercase tracking-[0.3em] text-white/60">
                APNI GAME UP KAR
              </span>
              <span class="text-[11px] font-black uppercase tracking-[0.3em] text-[#EB3461]">
                ✦
              </span>
              <span class="text-[11px] font-black uppercase tracking-[0.3em] text-white/60">
                NEW ARRIVALS
              </span>
              <span class="text-[11px] font-black uppercase tracking-[0.3em] text-[#EB3461]">
                ✦
              </span>
              <span class="text-[11px] font-black uppercase tracking-[0.3em] text-white/60">
                DESI DRIP
              </span>
              <span class="text-[11px] font-black uppercase tracking-[0.3em] text-[#EB3461]">
                ✦
              </span>
              <span class="text-[11px] font-black uppercase tracking-[0.3em] text-white/60">
                FRESH FITS ONLY
              </span>
              <span class="text-[11px] font-black uppercase tracking-[0.3em] text-[#EB3461]">
                ✦
              </span>
              <span class="text-[11px] font-black uppercase tracking-[0.3em] text-white/60">
                MARDAN TO MINGORA
              </span>
              <span class="text-[11px] font-black uppercase tracking-[0.3em] text-[#EB3461]">
                ✦
              </span>
            </div>
          </div>
        </div>

        {/* ── Main Header ──────────────────────────────────── */}
        <div
          className={`transition-all duration-700 ease-in-out px-4 md:px-12 lg:px-16 bg-white ${isScrolled ? "py-2.5 md:py-3 shadow-lg border-b border-gray-100" : "py-3 md:py-4"}`}
        >
          <div className="max-w-7xl mx-auto flex items-center justify-between gap-6 md:gap-8">
            {/* Mobile: Hamburger */}
            <div className="flex lg:hidden">
              <button
                onClick={() => setIsMobileMenuOpen(true)}
                className="p-2 -ml-2 text-gray-900 hover:text-[#EB3461] transition-colors"
              >
                <Menu size={24} strokeWidth={1.5} />
              </button>
            </div>

            {/* Brand Logo */}
            <Link to="/" className="flex items-center group flex-shrink-0">
              <img
                src={IMAGES.logo}
                alt="Classyfitters"
                className="h-12 md:h-16 w-auto object-contain"
              />
            </Link>

            {/* ── Desktop Nav ─────────────────────────── */}
            <nav className="hidden lg:flex items-center space-x-8 flex-1 justify-center">
              {visibleNavItems.map((item) => (
                <Link
                  key={item.label}
                  to={item.href}
                  className="relative font-bold text-[11px] uppercase tracking-widest text-gray-700 hover:text-[#EB3461] transition-colors group"
                >
                  {item.label}
                  {item.badge && (
                    <span
                      className={`absolute -top-3 -right-6 ${item.badgeColor} text-white text-[7px] font-black uppercase tracking-wide px-1.5 py-0.5 rounded-full leading-none`}
                    >
                      {item.badge}
                    </span>
                  )}
                  <span className="absolute bottom-[-4px] left-0 h-[2px] w-0 bg-[#EB3461] transition-all duration-300 origin-left group-hover:w-full" />
                </Link>
              ))}

              {/* Categories Mega Menu Trigger */}
              <div
                className="relative"
                onMouseEnter={openCat}
                onMouseLeave={closeCat}
              >
                <button
                  className={`relative flex items-center gap-1.5 font-bold text-[11px] uppercase tracking-widest transition-colors group ${isCatOpen ? "text-[#EB3461]" : "text-gray-700 hover:text-[#EB3461]"}`}
                >
                  Categories
                  <ChevronDown
                    size={14}
                    className={`transition-transform duration-300 ${isCatOpen ? "rotate-180" : ""}`}
                  />
                  <span
                    className={`absolute bottom-[-4px] left-0 h-[2px] bg-[#EB3461] transition-all duration-300 ${isCatOpen ? "w-full" : "w-0 group-hover:w-full"}`}
                  />
                </button>

                <AnimatePresence>
                  {isCatOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: -12, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: -12, scale: 0.95 }}
                      transition={{
                        type: "spring",
                        stiffness: 300,
                        damping: 30,
                        duration: 0.25,
                      }}
                      onMouseEnter={openCat}
                      onMouseLeave={closeCat}
                      className="absolute top-full left-1/2 -translate-x-1/2 mt-6 w-[620px] bg-white rounded-[32px] shadow-2xl shadow-gray-400/20 border border-gray-100 overflow-hidden backdrop-blur-xl"
                    >
                      {/* Mega menu header with gradient */}
                      <div className="px-8 pt-7 pb-5 bg-gradient-to-br from-gray-50 to-white border-b border-gray-100 flex items-center justify-between">
                        <div>
                          <motion.p
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.05, duration: 0.3 }}
                            className="text-[9px] font-black uppercase tracking-[0.4em] text-gray-400 mb-1"
                          >
                            Browse
                          </motion.p>
                          <motion.h3
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.08, duration: 0.3 }}
                            className="text-2xl font-black text-gray-900 uppercase tracking-tight leading-none"
                          >
                            Categories
                          </motion.h3>
                        </div>
                        <Link
                          to="/category"
                          className="flex items-center gap-1.5 text-[10px] font-black uppercase tracking-widest text-[#EB3461] hover:text-black transition-colors group"
                        >
                          All{" "}
                          <ArrowRight
                            size={12}
                            className="group-hover:translate-x-0.5 transition-transform"
                          />
                        </Link>
                      </div>

                      {/* Category grid with staggered animation */}
                      <div className="p-7 space-y-3">
                        {categories.map((cat, idx) => (
                          <motion.div
                            key={cat.id}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{
                              delay: 0.1 + idx * 0.06,
                              duration: 0.4,
                              ease: "easeOut",
                            }}
                          >
                            {/* Parent category - always clickable */}
                            <Link
                              to={`/shop?category=${cat.slug}`}
                              onClick={() => setIsCatOpen(false)}
                              className="group flex items-center justify-between px-5 py-3.5 rounded-2xl transition-all border-2 border-transparent hover:bg-pink-50 hover:border-pink-200"
                            >
                              <span className="text-[12px] font-black uppercase tracking-wide text-gray-900 group-hover:text-[#EB3461] transition-colors leading-tight">
                                {cat.name}
                              </span>
                              <ArrowRight
                                size={14}
                                className="text-gray-300 group-hover:text-[#EB3461] group-hover:translate-x-1 transition-all"
                              />
                            </Link>

                            {/* Child categories (indented with animation) */}
                            {cat.children.length > 0 && (
                              <motion.div
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ height: "auto", opacity: 1 }}
                                transition={{
                                  delay: 0.15 + idx * 0.06,
                                  duration: 0.4,
                                }}
                                className="overflow-hidden"
                              >
                                <div className="pl-6 pt-2 space-y-2">
                                  {cat.children.map((child, cidx) => (
                                    <motion.div
                                      key={child.id}
                                      initial={{ opacity: 0, x: -10 }}
                                      animate={{ opacity: 1, x: 0 }}
                                      transition={{
                                        delay: 0.15 + idx * 0.06 + cidx * 0.05,
                                        duration: 0.3,
                                      }}
                                    >
                                      <Link
                                        to={`/shop?category=${child.slug}`}
                                        className="group flex items-center justify-between px-4 py-2.5 rounded-xl hover:bg-pink-50 transition-all border border-transparent hover:border-pink-200"
                                      >
                                        <span className="text-[11px] font-black uppercase tracking-wide text-gray-600 group-hover:text-[#EB3461] transition-colors leading-tight">
                                          {child.name}
                                        </span>
                                        <ArrowRight
                                          size={12}
                                          className="text-gray-300 group-hover:text-[#EB3461] group-hover:translate-x-0.5 transition-all"
                                        />
                                      </Link>
                                    </motion.div>
                                  ))}
                                </div>
                              </motion.div>
                            )}
                          </motion.div>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </nav>

            {/* ── Right: Icons ────────────────────────── */}
            <div className="flex items-center space-x-2">
              <button
                onClick={() => setIsSearchOpen(true)}
                className="text-gray-700 hover:text-[#EB3461] transition-all p-2 rounded-lg hover:bg-gray-100 hidden md:block group"
                title="Search"
              >
                <Search
                  size={18}
                  className="group-hover:scale-110 transition-transform duration-300"
                />
              </button>
              <button
                onClick={() => setIsCartOpen(true)}
                className="text-gray-700 hover:text-[#EB3461] transition-all p-2 rounded-lg hover:bg-gray-100 relative group"
                title="Cart"
              >
                <ShoppingBag
                  size={18}
                  className="group-hover:scale-110 transition-transform duration-300"
                />
                {cartCount > 0 && (
                  <span className="absolute top-0 right-0 bg-[#EB3461] text-white text-[8px] w-[18px] h-[18px] rounded-full flex items-center justify-center font-bold border-2 border-white">
                    {cartCount > 9 ? "9+" : cartCount}
                  </span>
                )}
              </button>
              <button
                onClick={() =>
                  navigate(isAdmin ? "/admin" : user ? "/profile" : "/login")
                }
                className={`transition-all p-2 rounded-lg hover:bg-gray-100 group ${user ? "text-[#EB3461]" : "text-gray-700 hover:text-[#EB3461]"}`}
                title={user ? `Hi, ${user.username}` : "Login / Register"}
              >
                <User
                  size={18}
                  className="group-hover:scale-110 transition-transform duration-300"
                />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Search Modal */}
      <SearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
      />

      {/* ── Mobile Sidebar ─────────────────────────────────── */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMobileMenuOpen(false)}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[100] lg:hidden"
            />
            <motion.div
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed top-0 left-0 bottom-0 w-[85%] max-w-[360px] bg-white z-[110] lg:hidden shadow-2xl flex flex-col"
            >
              {/* Sidebar Header */}
              <div className="p-5 flex items-center justify-between border-b border-gray-100">
                <Link to="/" onClick={() => setIsMobileMenuOpen(false)}>
                  <span className="text-xl font-black italic tracking-tighter">
                    <span className="text-black">Classy</span>
                    <span className="text-[#EB3461]">fitters</span>
                  </span>
                </Link>
                <button
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="p-2 text-gray-500 hover:text-[#EB3461] transition-colors rounded-xl hover:bg-gray-50"
                >
                  <X size={22} />
                </button>
              </div>

              {/* User greeting */}
              {user && (
                <div className="px-5 py-3 bg-pink-50 border-b border-pink-100 flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-[#EB3461] flex items-center justify-center text-white text-xs font-black uppercase">
                    {user.username?.[0]}
                  </div>
                  <div>
                    <p className="text-[11px] font-black text-gray-900 uppercase tracking-wide">
                      {user.username}
                    </p>
                    <p className="text-[10px] text-gray-400 font-medium">
                      {user.email}
                    </p>
                  </div>
                </div>
              )}

              <div className="flex-1 overflow-y-auto py-6 px-4 scrollbar-hide">
                {/* Main Nav Items */}
                <div className="space-y-1 mb-6">
                  {visibleNavItems.map((item, idx) => (
                    <motion.div
                      key={item.label}
                      initial={{ opacity: 0, x: -16 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.05 + idx * 0.04 }}
                    >
                      <Link
                        to={item.href}
                        className="group flex items-center justify-between px-4 py-3.5 rounded-2xl hover:bg-gray-50 transition-all"
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        <span className="flex items-center gap-2.5">
                          <span className="text-[15px] font-black text-gray-900 group-hover:text-[#EB3461] uppercase tracking-wide transition-colors">
                            {item.label}
                          </span>
                          {item.badge && (
                            <span
                              className={`${item.badgeColor} text-white text-[7px] font-black uppercase tracking-wide px-1.5 py-0.5 rounded-full leading-none`}
                            >
                              {item.badge}
                            </span>
                          )}
                        </span>
                        <ArrowRight
                          size={16}
                          className="text-gray-300 group-hover:text-[#EB3461] group-hover:translate-x-1 transition-all"
                        />
                      </Link>
                    </motion.div>
                  ))}
                </div>

                {/* Categories Section */}
                <div className="border-t border-gray-100 pt-5">
                  <button
                    onClick={() => setIsMobileCatOpen((v) => !v)}
                    className="w-full flex items-center justify-between px-4 py-3.5 rounded-2xl hover:bg-gray-50 transition-all mb-1"
                  >
                    <span className="text-[15px] font-black text-gray-900 uppercase tracking-wide">
                      Categories
                    </span>
                    <ChevronDown
                      size={16}
                      className={`text-gray-400 transition-transform duration-300 ${isMobileCatOpen ? "rotate-180" : ""}`}
                    />
                  </button>

                  <AnimatePresence>
                    {isMobileCatOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="overflow-hidden"
                      >
                        <div className="pl-4 space-y-1 pb-3">
                          {categories.map((cat) => (
                            <div key={cat.id}>
                              {/* Parent - always clickable */}
                              <Link
                                to={`/shop?category=${cat.slug}`}
                                onClick={() => setIsMobileMenuOpen(false)}
                                className="flex items-center justify-between px-4 py-3 rounded-xl hover:bg-pink-50 transition-all group"
                              >
                                <span className="text-[12px] font-black text-gray-700 group-hover:text-[#EB3461] uppercase tracking-wide transition-colors">
                                  {cat.name}
                                </span>
                                <ArrowRight
                                  size={14}
                                  className="text-gray-300 group-hover:text-[#EB3461] transition-colors"
                                />
                              </Link>
                              {/* Children */}
                              {cat.children.length > 0 && (
                                <div className="pl-2 space-y-0.5">
                                  {cat.children.map((child) => (
                                    <Link
                                      key={child.id}
                                      to={`/shop?category=${child.slug}`}
                                      onClick={() => setIsMobileMenuOpen(false)}
                                      className="flex items-center justify-between px-4 py-2.5 rounded-xl hover:bg-pink-50 transition-all group"
                                    >
                                      <span className="text-[11px] font-black text-gray-600 group-hover:text-[#EB3461] uppercase tracking-wide transition-colors">
                                        {child.name}
                                      </span>
                                      <ArrowRight
                                        size={12}
                                        className="text-gray-300 group-hover:text-[#EB3461] transition-colors"
                                      />
                                    </Link>
                                  ))}
                                </div>
                              )}
                            </div>
                          ))}
                          <Link
                            to="/category"
                            onClick={() => setIsMobileMenuOpen(false)}
                            className="flex items-center justify-between px-4 py-3 rounded-xl bg-gray-50 hover:bg-[#EB3461] transition-all group mt-2"
                          >
                            <span className="text-[12px] font-black text-gray-700 group-hover:text-white uppercase tracking-wide transition-colors">
                              All Products
                            </span>
                            <ArrowRight
                              size={14}
                              className="text-gray-300 group-hover:text-white transition-colors shrink-0"
                            />
                          </Link>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {/* Search in mobile */}
                <div className="border-t border-gray-100 pt-5 mt-2">
                  <button
                    onClick={() => {
                      setIsMobileMenuOpen(false);
                      setIsSearchOpen(true);
                    }}
                    className="w-full flex items-center gap-3 px-4 py-3.5 rounded-2xl bg-gray-50 hover:bg-gray-100 transition-all text-gray-500"
                  >
                    <Search size={18} />
                    <span className="text-[13px] font-bold text-gray-500 uppercase tracking-widest">
                      Products Dhundho
                    </span>
                  </button>
                </div>
              </div>

              {/* Sidebar Footer */}
              <div className="p-5 border-t border-gray-100 space-y-3">
                <button
                  onClick={() => {
                    setIsMobileMenuOpen(false);
                    navigate(user ? "/profile" : "/login");
                  }}
                  className="w-full bg-[#EB3461] text-white py-4 rounded-2xl font-black text-[12px] uppercase tracking-widest flex items-center justify-center space-x-2 shadow-lg shadow-pink-100 hover:bg-black transition-all"
                >
                  <User size={16} />
                  <span>{user ? `My Account` : "Login / Register"}</span>
                </button>
                {user && (
                  <button
                    onClick={() => {
                      setIsMobileMenuOpen(false);
                      logout();
                    }}
                    className="w-full border border-gray-200 text-gray-600 py-3 rounded-2xl font-black text-[11px] uppercase tracking-widest flex items-center justify-center space-x-2 hover:border-red-300 hover:text-red-500 transition-all"
                  >
                    <LogOut size={14} />
                    <span>Sign Out</span>
                  </button>
                )}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default Header;
