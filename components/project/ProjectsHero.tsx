"use client";

import React from "react";
import { motion } from "framer-motion";
import { ArrowLeft, ChevronDown, Code2, Layers } from "lucide-react";

export default function ProjectsHero() {
  const handleScrollDown = () => {
    if (typeof window !== 'undefined') {
      window.scrollTo({
        top: window.innerHeight,
        behavior: "smooth",
      });
    }
  };

  const mainVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center bg-white px-6 overflow-hidden">
      
      <div className="absolute inset-0 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] bg-size-[24px_24px] opacity-40"></div>
      
      <div className="absolute top-1/2 left-[-10%] md:left-[5%] -translate-y-1/2 pointer-events-none select-none z-0">
        <motion.div
          animate={{ y: [0, -20, 0], rotate: [0, 5, 0] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          className="text-emerald-50 opacity-60"
        >
          <Code2 strokeWidth={1} size={400} />
        </motion.div>
      </div>

      <div className="absolute top-1/2 right-[-10%] md:right-[5%] -translate-y-1/2 pointer-events-none select-none z-0">
        <motion.div
          animate={{ y: [0, 20, 0], rotate: [0, -5, 0] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 1 }}
          className="text-emerald-50 opacity-60"
        >
          <Layers strokeWidth={1} size={400} />
        </motion.div>
      </div>

      <motion.div 
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }} 
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

      <div className="container mx-auto max-w-5xl text-center relative z-10">
        <motion.div
          initial="hidden"
          animate="visible" 
          variants={mainVariants}
          transition={{ duration: 0.8, ease: "easeOut" }} 
          className="space-y-6"
        >
          <div className="flex items-center justify-center gap-4 mb-2">
            <div className="h-px w-16 bg-emerald-200 hidden sm:block"></div>
            <span className="text-emerald-600 font-bold tracking-[0.25em] uppercase text-xs md:text-sm">
              Portfolio
            </span>
            <div className="h-px w-16 bg-emerald-200 hidden sm:block"></div>
          </div>
          
          <h1 className="text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-extrabold text-slate-900 tracking-tight leading-none">
            Selected <br className="md:hidden" />
            <span className="text-emerald-500">
              Works.
            </span>
          </h1>
          
          <p className="text-lg md:text-xl text-slate-500 leading-relaxed max-w-2xl mx-auto font-light pt-4">
            A showcase of technical precision and creative design.<br className="hidden md:block" /> 
            Solving problems one line of code at a time.
          </p>
        </motion.div>
      </div>
      
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