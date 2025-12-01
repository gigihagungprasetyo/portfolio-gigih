"use client";

import React, { useState } from "react";
import { Menu, X, Github, Linkedin, Instagram, Mail } from "lucide-react";
import { motion, AnimatePresence, Variants } from "framer-motion";
import Link from "next/link";

const navItems = [
  { label: "Home", href: "/" },
  { label: "About Me", href: "/about" },
  { label: "Projects", href: "/projects" },
  { label: "Connect", href: "/#contact" },
];

const socialLinks = [
  { icon: Github, href: "https://github.com/gigihagungprasetyo" },
  { icon: Linkedin, href: "https://www.linkedin.com/in/gigih-agung-prasetyo-092772246/" },
  { icon: Instagram, href: "https://www.instagram.com/saya_garie/" },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [hoveredLink, setHoveredLink] = useState<number | null>(null);

  const menuVariants: Variants = {
    closed: {
      clipPath: "circle(0% at 100% 0%)",
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 40,
        delay: 0.2
      }
    },
    open: {
      clipPath: "circle(150% at 100% 0%)",
      transition: {
        type: "spring",
        stiffness: 20,
        damping: 10
      }
    }
  };

  const itemVariants: Variants = {
    closed: { opacity: 0, y: 20, transition: { duration: 0.2 } },
    open: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: { delay: i * 0.1 + 0.3, duration: 0.4 }
    })
  };

  const auroraVariants: Variants = {
    animate: {
      scale: [1, 1.2, 1],
      opacity: [0.3, 0.5, 0.3],
      x: [0, 100, -50, 0],
      y: [0, -50, 50, 0],
      transition: {
        duration: 10,
        repeat: Infinity,
        ease: "linear"
      }
    }
  };

  return (
    <>
      <motion.div
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.8 }}
        className="fixed top-6 right-6 z-100"
      >
        <button
          onClick={() => setIsOpen(!isOpen)}
          className={`relative p-3 rounded-full transition-all duration-500 ${
            isOpen
              ? "bg-transparent text-white rotate-90"
              : "bg-white/80 backdrop-blur-md border border-slate-200 text-slate-800 shadow-lg hover:bg-emerald-50 hover:text-emerald-600"
          }`}
        >
          {isOpen ? <X size={28} /> : <Menu size={24} />}
        </button>
      </motion.div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            variants={menuVariants}
            initial="closed"
            animate="open"
            exit="closed"
            className="fixed inset-0 z-90 bg-slate-950/80 backdrop-blur-2xl flex flex-col items-center justify-center text-white overflow-hidden"
          >
            <motion.div
              variants={auroraVariants}
              animate="animate"
              className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-emerald-500/20 rounded-full blur-[120px] pointer-events-none mix-blend-screen"
            />
            <motion.div
              variants={auroraVariants}
              animate="animate"
              transition={{ duration: 15, repeat: Infinity, ease: "linear" }} // Kecepatan beda biar organik
              className="absolute bottom-[-10%] right-[-10%] w-[400px] h-[400px] bg-blue-500/20 rounded-full blur-[100px] pointer-events-none mix-blend-screen"
            />

            <div className="flex flex-col items-center gap-6 relative z-10 w-full max-w-4xl px-6">
              {navItems.map((item, index) => (
                <motion.div
                  key={item.label}
                  custom={index}
                  variants={itemVariants}
                  className="w-full text-center"
                  onMouseEnter={() => setHoveredLink(index)}
                  onMouseLeave={() => setHoveredLink(null)}
                >
                  <Link
                    href={item.href}
                    onClick={() => setIsOpen(false)}
                    className={`block text-5xl md:text-7xl font-bold transition-all duration-500 ${
                      hoveredLink !== null && hoveredLink !== index
                        ? "text-slate-600 blur-[2px] scale-95"
                        : "text-slate-100 scale-100 hover:scale-105 hover:text-emerald-400"
                    }`}
                  >
                    {item.label}
                  </Link>
                </motion.div>
              ))}
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0, transition: { delay: 0.6 } }}
              exit={{ opacity: 0 }}
              className="absolute bottom-12 flex flex-col items-center gap-6 z-10"
            >
              <div className="w-12 h-px bg-slate-700" />
              
              <a href="gigihagungprasetyo@gmail.com" className="text-slate-400 hover:text-white transition-colors flex items-center gap-2 text-sm font-mono">
                <Mail size={16} /> gigihagungprasetyo@gmail.com
              </a>

              <div className="flex gap-6">
                {socialLinks.map((social, idx) => (
                  <a
                    key={idx}
                    href={social.href}
                    className="p-3 rounded-full bg-white/5 border border-white/10 text-slate-400 hover:bg-white/10 hover:text-emerald-400 hover:scale-110 transition-all duration-300"
                  >
                    <social.icon size={20} />
                  </a>
                ))}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}