import React, { useState } from "react";
import { motion } from "framer-motion";
import { Link, useLocation } from "react-router-dom";
import {
  Home,
  Briefcase,
  Layers,
  Info,
  PhoneCall,
  Menu,
  X,
  Facebook,
  Twitter,
  Instagram,
  Mail
} from "lucide-react";
import { FaWhatsapp } from "react-icons/fa";
import logo from "../../assets/Media_web_6.svg";

export default function Header() {
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);

  const navItems = [
    { name: "Home", icon: Home, path: "/" },
    { name: "Services", icon: Briefcase, path: "/services" },
    { name: "Portfolio", icon: Layers, path: "/portfolio" },
    { name: "About", icon: Info, path: "/about" },
    { name: "Contact", icon: PhoneCall, path: "/contact" },
  ];

  return (
    <header className="fixed top-0 left-0 w-full z-50 backdrop-blur-md">
      <motion.div
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="relative flex items-center justify-between px-6 md:px-10 py-4 bg-gradient-to-r from-[#040c2e] via-[#0a2b5f] to-[#0e3182] shadow-[0_4px_20px_rgba(0,0,0,0.4)] border-b border-cyan-400/30"
      >
        {/* Logo */}
        <Link to="/" className="flex items-center gap-3 cursor-pointer select-none">
          <motion.img
            whileHover={{ scale: 1.05, rotateY: 5 }}
            transition={{ type: "spring", stiffness: 120, damping: 8 }}
            src={logo}
            alt="Media Web 6 Logo"
            className="w-10 h-10 object-contain drop-shadow-lg"
          />
          <span className="text-lg font-extrabold bg-gradient-to-r from-cyan-300 via-blue-400 to-indigo-400 bg-clip-text text-transparent drop-shadow-md">
            Media Web 6
          </span>
        </Link>

        {/* Desktop Navigation (≥1197px) */}
        <nav className="hidden xl2:flex absolute left-1/2 transform -translate-x-1/2 gap-6 lg:gap-10 text-base font-semibold text-white/90 tracking-wide">
          {navItems.map(({ name, icon: Icon, path }) => (
            <Link key={name} to={path}>
              <motion.div
                whileHover={{ scale: 1.12 }}
                className={`relative group flex items-center gap-2 transition-all duration-300 ${
                  location.pathname === path ? "text-cyan-300" : "hover:text-cyan-300"
                }`}
              >
                <Icon size={18} className="text-cyan-400 group-hover:scale-110 transition-transform" />
                {name}
                <span
                  className={`absolute left-0 -bottom-1 h-[2px] bg-gradient-to-r from-cyan-400 via-blue-400 to-indigo-400 rounded-full transition-all duration-300 ${
                    location.pathname === path ? "w-full" : "w-0 group-hover:w-full"
                  }`}
                ></span>
              </motion.div>
            </Link>
          ))}
        </nav>

        {/* Social Icons (≥1197px) */}
        <div className="hidden xl2:flex items-center gap-3">
          <a href="tel:+919585602027" className="p-2 rounded-full bg-white/10 hover:bg-emerald-500 text-white transition-all duration-300">
            <PhoneCall size={18} />
          </a>

          <a href="https://wa.me/9585602027" target="_blank" rel="noopener noreferrer"
            className="p-2 rounded-full bg-white/10 hover:bg-green-500 text-white transition-all duration-300">
            <FaWhatsapp size={18} />
          </a>

          <a href="mailto:info@mediaweb6.com" className="p-2 rounded-full bg-white/10 hover:bg-cyan-400 text-white transition-all duration-300">
            <Mail size={18} />
          </a>

          <a href="https://instagram.com" target="_blank" rel="noopener noreferrer"
            className="p-2 rounded-full bg-white/10 hover:bg-pink-600 text-white transition-all duration-300">
            <Instagram size={18} />
          </a>

          <a href="https://facebook.com" target="_blank" rel="noopener noreferrer"
            className="p-2 rounded-full bg-white/10 hover:bg-blue-600 text-white transition-all duration-300">
            <Facebook size={18} />
          </a>

          <a href="https://twitter.com" target="_blank" rel="noopener noreferrer"
            className="p-2 rounded-full bg-white/10 hover:bg-sky-400 text-white transition-all duration-300">
            <Twitter size={18} />
          </a>
        </div>

        {/* Hamburger (Below 1197px) */}
        <button
          className="xl2:hidden text-white p-2 rounded-md hover:text-cyan-300 z-50"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? <X size={26} /> : <Menu size={26} />}
        </button>

        {/* Mobile Menu */}
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="xl2:hidden absolute top-full left-0 w-full bg-[#0a2b5f] shadow-lg flex flex-col items-center py-6 space-y-4"
          >
            {navItems.map(({ name, path }) => (
              <Link
                key={name}
                to={path}
                onClick={() => setMenuOpen(false)}
                className={`text-white hover:text-cyan-300 text-lg font-semibold ${
                  location.pathname === path ? "text-cyan-300" : ""
                }`}
              >
                {name}
              </Link>
            ))}

            {/* Social Icons Mobile */}
            <div className="flex gap-6 pt-4">
              <PhoneCall size={22} className="text-white hover:text-emerald-400" />
              <FaWhatsapp size={22} className="text-white hover:text-green-400" />
              <Mail size={22} className="text-white hover:text-cyan-300" />
              <Instagram size={22} className="text-white hover:text-pink-400" />
              <Facebook size={22} className="text-white hover:text-blue-400" />
              <Twitter size={22} className="text-white hover:text-sky-400" />
            </div>
          </motion.div>
        )}
      </motion.div>
    </header>
  );
}
