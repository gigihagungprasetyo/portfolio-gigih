"use client";

import React from "react";
import { motion, Variants } from "framer-motion";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

export default function AboutPreview() {
  const viewPortSettings = { once: false, amount: 0.3 };

  const textVariants: Variants = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
  };

  const imageVariants: Variants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.8, ease: "easeOut" } },
  };

  return (
    <section
      id="about"
      className="relative min-h-screen flex items-center justify-center bg-slate-50 overflow-hidden py-10 lg:py-0"
    >
      <div className="absolute top-0 left-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-[0.03] pointer-events-none" />
      
      <div className="absolute bottom-0 right-0 text-[10rem] lg:text-[25rem] font-bold text-slate-200/40 leading-none select-none pointer-events-none z-0 translate-y-1/4 translate-x-1/4">
        01.
      </div>

      <div className="container mx-auto max-w-6xl px-6 relative z-10 h-full flex flex-col justify-center">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-20 items-center">
          
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={viewPortSettings}
            variants={imageVariants}
            className="relative order-1 lg:order-1 w-full flex justify-center lg:block max-w-md mx-auto lg:max-w-none"
          >

            <div className="relative w-[280px] h-[350px] sm:w-[320px] sm:h-[400px] lg:w-full lg:h-auto lg:aspect-4/5 bg-white rounded-[30px] lg:rounded-[40px] overflow-hidden shadow-2xl border-4 border-white">
              <Image
                src="/profile-about.png" 
                alt="About Gigih"
                fill
                className="object-cover hover:scale-105 transition-transform duration-1000"
              />
              
              <div className="absolute top-4 left-4 lg:top-6 lg:left-6 bg-white/95 backdrop-blur-md px-4 py-1.5 lg:px-5 lg:py-2 rounded-full shadow-lg">
                <p className="text-[10px] lg:text-xs text-emerald-600 font-bold tracking-widest uppercase">
                  Based in Indonesia
                </p>
              </div>

              <div className="absolute inset-0 bg-linear-to-t from-black/20 via-transparent to-transparent pointer-events-none" />
            </div>
            
            <div className="absolute -bottom-6 -right-6 w-40 h-40 lg:w-64 lg:h-64 bg-emerald-500/10 rounded-full blur-[60px] lg:blur-[80px] -z-10" />
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={viewPortSettings}
            transition={{ staggerChildren: 0.1 }}
            className="space-y-4 lg:space-y-8 order-2 lg:order-2 text-center lg:text-left"
          >
            <motion.h4 variants={textVariants} className="text-emerald-600 font-bold tracking-widest uppercase text-xs lg:text-sm">
              Who Am I?
            </motion.h4>

            <motion.h2 variants={textVariants} className="text-3xl sm:text-4xl lg:text-7xl font-extrabold text-slate-900 leading-[1.1] lg:leading-[0.95] tracking-tight">
              More Than Just <br />
              <span className="text-slate-400">
                Code Syntax.
              </span>
            </motion.h2>

            <motion.p variants={textVariants} className="text-sm sm:text-base lg:text-xl text-slate-600 leading-relaxed max-w-md mx-auto lg:mx-0 font-medium">
              Building scalable backends and interactive frontends for modern web applications.
            </motion.p>

            <motion.div variants={textVariants} className="pt-2 lg:pt-4 flex justify-center lg:justify-start relative z-20">
              <Link 
                href="/about" 
                className="inline-flex items-center gap-2 lg:gap-3 px-6 py-3 lg:px-8 lg:py-4 bg-slate-900 text-white rounded-xl font-bold hover:bg-emerald-600 active:scale-95 transition-all duration-300 shadow-xl hover:shadow-emerald-500/25 hover:-translate-y-1 group text-sm lg:text-base"
              >
                Read Full Story
                <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
              </Link>
            </motion.div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}