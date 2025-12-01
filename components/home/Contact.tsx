"use client";

import React, { useState } from "react";
import { motion, Variants } from "framer-motion";
import { Mail, Github, Linkedin, Instagram, MessageCircle, ArrowUp, Check } from "lucide-react";

export default function Contact() {
  const [isCopied, setIsCopied] = useState(false);
  const viewPortSettings = { once: false, amount: 0.3 };

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.2 }
    }
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
  };

  const socials = [
    { name: "GitHub", icon: Github, href: "https://github.com/gigihagungprasetyo", color: "hover:bg-white hover:text-slate-900" },
    { name: "LinkedIn", icon: Linkedin, href: "https://www.linkedin.com/in/gigih-agung-prasetyo-092772246/", color: "hover:bg-blue-600 hover:text-white" },
    { name: "Instagram", icon: Instagram, href: "https://www.instagram.com/saya_garie/", color: "hover:bg-pink-600 hover:text-white" },
  ];

  const handleEmailClick = (e: React.MouseEvent) => {
    e.preventDefault();
    // Menggunakan document.execCommand('copy') sebagai fallback untuk lingkungan iFrame/preview
    const textToCopy = "gigihagungprasetyo@gmail.com";
    const tempInput = document.createElement('textarea');
    tempInput.value = textToCopy;
    document.body.appendChild(tempInput);
    tempInput.select();
    document.execCommand('copy');
    document.body.removeChild(tempInput);

    setIsCopied(true);
    setTimeout(() => {
      // Setelah disalin, arahkan ke mailto
      window.location.href = "mailto:gigihagungprasetyo@gmail.com";
      setIsCopied(false);
    }, 1000);
  };

  // FIX: Menggunakan window.scrollTo, tetapi menambahkan fallback untuk ID jika scroll window gagal
  const scrollToTop = () => {
    // 1. Coba scroll window (Berhasil di halaman About)
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });

    // 2. Fallback: Jika scroll dikendalikan oleh custom container (Kemungkinan di Homepage)
    // Coba temukan elemen yang memiliki ID 'homepage-top'
    const topElement = document.getElementById('homepage-top');
    if (topElement) {
      topElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <section
      id="contact"
      className="relative min-h-screen flex items-center justify-center bg-slate-950 text-white overflow-hidden py-10 lg:py-10"
    >
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-size-[24px_24px] lg:bg-size-[40px_40px]"></div>
      <div className="absolute inset-0 bg-[radial-gradient(circle_800px_at_50%_50%,transparent,rgba(2,6,23,1))]"></div>

      <motion.div 
        animate={{ 
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] lg:w-[800px] h-[500px] bg-emerald-500/20 rounded-full blur-[120px] pointer-events-none" 
      />

      <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-blue-600/10 rounded-full blur-[100px] pointer-events-none" />

      <div className="container mx-auto px-6 relative z-10 text-center h-full flex flex-col justify-center">
        
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={viewPortSettings}
          className="max-w-3xl mx-auto space-y-8 lg:space-y-10"
        >
          {/* Header */}
          <div className="space-y-4 lg:space-y-6">
            <motion.div variants={itemVariants} className="inline-flex items-center gap-2 px-3 py-1.5 lg:px-4 lg:py-2 rounded-full bg-slate-900 border border-slate-800 text-emerald-400 text-[10px] lg:text-xs font-bold tracking-widest uppercase mb-2 lg:mb-4">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              Open for opportunities
            </motion.div>

            <motion.h2 variants={itemVariants} className="text-4xl sm:text-5xl lg:text-8xl font-extrabold tracking-tight leading-none">
              Let's Work <br />
              <span className="text-slate-500">Together.</span>
            </motion.h2>
          </div>

          <motion.p variants={itemVariants} className="text-base lg:text-2xl text-slate-400 font-light max-w-xs sm:max-w-xl mx-auto">
            Have a project in mind? Let's discuss.
          </motion.p>

          <motion.div variants={itemVariants} className="flex flex-col sm:flex-row items-center justify-center gap-4 lg:gap-6">

            <button
              onClick={handleEmailClick}
              className="group relative inline-flex items-center justify-center gap-3 px-8 py-3 lg:px-10 lg:py-4 bg-emerald-500 text-slate-950 rounded-full font-bold text-base lg:text-lg hover:bg-emerald-400 transition-all duration-300 shadow-[0_0_40px_rgba(16,185,129,0.2)] hover:shadow-[0_0_60px_rgba(16,185,129,0.4)] hover:-translate-y-1 w-full sm:w-auto min-w-[200px]"
            >
              {isCopied ? <Check size={18} /> : <Mail size={18} />}
              <span>{isCopied ? "Email Copied!" : "gigihagungprasetyo@gmail.com"}</span>
            </button>

            <a 
              href="https://wa.me/6285346014262" 
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center justify-center gap-3 px-8 py-3 lg:px-10 lg:py-4 bg-transparent border-2 border-slate-700 text-white rounded-full font-bold text-base lg:text-lg hover:border-emerald-500 hover:text-emerald-400 transition-all duration-300 w-full sm:w-auto"
            >
              <MessageCircle size={18} />
              <span>WhatsApp</span>
            </a>
          </motion.div>

          <motion.div variants={itemVariants} className="flex flex-wrap justify-center gap-4 lg:gap-6 pt-4 lg:pt-6 border-t border-slate-900/50">
            {socials.map((social) => (
              <a
                key={social.name}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className={`p-3 lg:p-4 rounded-full bg-slate-900 border border-slate-800 text-slate-400 transition-all duration-300 ${social.color} hover:-translate-y-1`}
                aria-label={social.name}
              >
                <social.icon size={20} className="lg:w-6 lg:h-6" />
              </a>
            ))}
          </motion.div>

          <motion.div variants={itemVariants} className="pt-8 lg:pt-12 flex flex-col items-center gap-3 lg:gap-4">
            <button 
              onClick={scrollToTop}
              type="button" 
              className="text-slate-600 hover:text-emerald-400 transition-colors flex items-center gap-2 text-xs lg:text-sm font-mono animate-bounce cursor-pointer"
            >
              <ArrowUp size={14} /> Back to Top
            </button>
            <p className="text-slate-600 text-[10px] lg:text-sm font-mono">
              © {new Date().getFullYear()} Gigih Agung Prasetyo.
            </p>
          </motion.div>

        </motion.div>

      </div>
    </section>
  );
}