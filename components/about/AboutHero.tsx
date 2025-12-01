"use client";

import React from "react";
import { motion } from "framer-motion";
import { ArrowLeft, ChevronDown, Code2, Cpu } from "lucide-react";

export default function AboutHero() {
  
  // Fungsi untuk scroll ke bawah
  const handleScrollDown = () => {
    if (typeof window !== 'undefined') {
      window.scrollTo({
        top: window.innerHeight,
        behavior: "smooth",
      });
    }
  };

  // Varian animasi utama
  const mainVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center bg-white px-6 overflow-hidden">
      
      {/* Background Grid & Blur */}
      <div className="absolute inset-0 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] bg-size-[24px_24px] opacity-40"></div>
      
      {/* --- DESAIN: Watermark Icons Besar + Floating (TANPA PARALLAX SCROLL) --- */}
      
      {/* IKON KIRI: Code2 (Mewakili kode/software) */}
      <div className="absolute top-1/2 left-[-10%] md:left-[5%] -translate-y-1/2 pointer-events-none select-none z-0">
        <motion.div
          animate={{ y: [0, -20, 0], rotate: [0, 5, 0] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          className="text-emerald-50 opacity-60"
        >
          <Code2 strokeWidth={1} size={400} />
        </motion.div>
      </div>

      {/* IKON KANAN: Cpu (Mewakili teknis/hardware/processing - Khas About Me) */}
      <div className="absolute top-1/2 right-[-10%] md:right-[5%] -translate-y-1/2 pointer-events-none select-none z-0">
        <motion.div
          animate={{ y: [0, 20, 0], rotate: [0, -5, 0] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 1 }}
          className="text-emerald-50 opacity-60"
        >
          <Cpu strokeWidth={1} size={400} />
        </motion.div>
      </div>

      {/* --- LOGIKA: Tombol Back to Home --- */}
      <motion.div 
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }} // Menggunakan animate agar muncul saat load (Fix Bug Navigasi)
        transition={{ delay: 0.5 }}
        className="fixed top-6 left-6 lg:top-8 lg:left-8 z-50 hidden lg:block"
      >
        <a 
          href="/" 
          className="group flex items-center gap-3 px-5 py-2.5 bg-white/90 backdrop-blur-md border border-slate-200/60 rounded-full text-slate-600 hover:text-emerald-600 hover:border-emerald-200 transition-all shadow-sm hover:shadow-md"
        >
          <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
          <span className="font-medium text-sm">Back to Home</span>
        </a>
      </motion.div>

      {/* --- KONTEN UTAMA --- */}
      <div className="container mx-auto max-w-5xl text-center relative z-10">
        <motion.div
          initial="hidden"
          animate="visible" // Menggunakan animate (Fix Bug Navigasi)
          variants={mainVariants}
          transition={{ duration: 0.8, ease: "easeOut" }} 
          className="space-y-6"
        >
          {/* Label Journey */}
          <div className="flex items-center justify-center gap-4 mb-2">
            <div className="h-px w-16 bg-emerald-200 hidden sm:block"></div>
            <span className="text-emerald-600 font-bold tracking-[0.25em] uppercase text-xs md:text-sm">
              The Journey
            </span>
            <div className="h-px w-16 bg-emerald-200 hidden sm:block"></div>
          </div>
          
          {/* Headline Besar */}
          <h1 className="text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-extrabold text-slate-900 tracking-tight leading-none">
            Behind the <br className="md:hidden" />
            <span className="text-emerald-500">
              Pixel.
            </span>
          </h1>
          
          {/* Deskripsi */}
          <p className="text-lg md:text-xl text-slate-500 leading-relaxed max-w-2xl mx-auto font-light pt-4">
            A deeper look into my career path, technical expertise,<br className="hidden md:block" /> 
            and the philosophy behind my code.
          </p>
        </motion.div>
      </div>
      
      {/* Indikator Scroll */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 1 }}
        onClick={handleScrollDown}
        className="absolute bottom-12 left-1/2 -translate-x-1/2 text-slate-300 flex flex-col items-center gap-2 cursor-pointer hover:text-emerald-500 transition-colors z-20"
      >
        <span className="text-[10px] uppercase tracking-[0.2em]">Scroll to Explore</span>
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <ChevronDown size={20} />
        </motion.div>
      </motion.div>

    </section>
  );
}