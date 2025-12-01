"use client";

import React, { useState, useEffect } from "react";
import { motion, Variants, useScroll, useTransform } from "framer-motion";
import { ArrowRight, Download, Code2, Database, ArrowDown } from "lucide-react";

type HeroContent = {
  name: string;
  tagline: string;
  description: string;
  email: string;
  whatsapp: string;
};

const MOCK_HERO_CONTENT: HeroContent = {
  name: "Gigih Agung Prasetyo",
  tagline: "Full-Stack Developer & AI Enthusiast",
  description: "Merging logic with aesthetics. Building robust, scalable applications with Laravel, Next.js, and React.",
  email: "gigihagungprasetyo@gmail.com",
  whatsapp: "+62 812-3456-7890",
};

const HeroSkeleton = () => (
  <div className="flex flex-col items-center justify-center min-h-screen text-center px-4 py-20">
    <div className="space-y-6">
      <div className="h-10 w-80 bg-slate-200/70 rounded-lg animate-pulse mx-auto" />
      <div className="h-6 w-96 bg-slate-200/50 rounded-md animate-pulse mx-auto" />
    </div>
  </div>
);

export default function Hero() {
  const [data, setData] = useState<HeroContent | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isClient, setIsClient] = useState(false);
  const { scrollY } = useScroll();
  const yBackground = useTransform(scrollY, [0, 500], [0, 200]);
  const yContent = useTransform(scrollY, [0, 500], [0, 100]);
  const opacityContent = useTransform(scrollY, [0, 400], [1, 0]);
  const scaleContent = useTransform(scrollY, [0, 500], [1, 0.95]);

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        await new Promise(resolve => setTimeout(resolve, 800));
        setData(MOCK_HERO_CONTENT);
      } catch (err) {
        console.error("Failed to fetch hero data:", err);
        setData(MOCK_HERO_CONTENT);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
  };
  
  const floatingVariants: Variants = {
    animate: {
      y: [0, -15, 0],
      transition: {
        duration: 4,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  };

  if (isLoading || !data) {
    return <HeroSkeleton />;
  }

  return (
    <section 
      id="homepage-top" 
      className="min-h-screen w-full bg-slate-50 flex items-center relative overflow-hidden px-4 sm:px-6 py-20 lg:pt-0"
    >
      
      <motion.div 
        style={{ y: yBackground }} 
        className="absolute inset-0 w-full h-full z-0"
      >
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-size-[24px_24px]"></div>
        <div className="absolute top-0 right-0 w-[300px] lg:w-[800px] h-[300px] lg:h-[800px] bg-emerald-50/60 rounded-full blur-[80px] lg:blur-[120px] pointer-events-none translate-x-1/2 -translate-y-1/2 lg:translate-x-1/3 lg:-translate-y-1/3" />
      </motion.div>

      <motion.div 
        style={{ opacity: opacityContent, y: yContent, scale: scaleContent }}
        className="container mx-auto max-w-6xl px-6 grid lg:grid-cols-2 gap-8 lg:gap-16 items-center relative z-10 pb-20 lg:pb-0"
      >
        
        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, amount: 0.3 }}
          transition={{ staggerChildren: 0.1 }}
          className="space-y-6 lg:space-y-8 text-center lg:text-left order-2 lg:order-1"
        >
          
          <motion.div variants={itemVariants} className="inline-flex items-center gap-2 px-3 py-1.5 lg:px-4 lg:py-2 rounded-full bg-slate-50 border border-slate-200 text-slate-600 text-xs lg:text-sm font-semibold tracking-wide mx-auto lg:mx-0">
            <span className="relative flex h-2 w-2 lg:h-2.5 lg:w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 lg:h-2.5 lg:w-2.5 bg-emerald-500"></span>
            </span>
            READY TO COLLABORATE
          </motion.div>

          <div className="space-y-1 lg:space-y-2">
            <motion.h1 variants={itemVariants} className="text-4xl sm:text-5xl lg:text-7xl font-extrabold text-slate-900 tracking-tight leading-[1.1] lg:leading-[0.95]">
              FULLSTACK
            </motion.h1>
            <motion.h1 variants={itemVariants} className="text-4xl sm:text-5xl lg:text-7xl font-extrabold text-transparent bg-clip-text bg-linear-to-r from-emerald-600 to-teal-500 tracking-tight leading-[1.1] lg:leading-[0.95]">
              DEVELOPER.
            </motion.h1>
          </div>

          <motion.p variants={itemVariants} className="text-base lg:text-lg text-slate-500 max-w-md mx-auto lg:mx-0 leading-relaxed lg:border-l-4 lg:border-emerald-500 lg:pl-6">
            I am <span className="font-bold text-slate-900">{data.name}</span>. Specializing in the <span className="text-emerald-600 font-semibold">Laravel & Next.js</span> ecosystem.
          </motion.p>

          <motion.div variants={itemVariants} className="flex flex-wrap justify-center lg:justify-start gap-3 lg:gap-4 pt-2 relative z-20">
            <a href="#contact" className="px-6 py-3 lg:px-8 lg:py-4 bg-slate-900 text-white rounded-xl font-bold hover:bg-emerald-600 active:scale-95 transition-all duration-300 flex items-center gap-2 shadow-xl hover:-translate-y-1 text-sm lg:text-base cursor-pointer">
              Let's Connect <ArrowRight size={18} />
            </a>
            
            <a 
              href="/resume.pdf" 
              download="CV_Gigih_Agung.pdf"
              className="px-6 py-3 lg:px-8 lg:py-4 bg-white border-2 border-slate-100 text-slate-700 rounded-xl font-bold hover:border-slate-300 active:scale-95 transition-all flex items-center gap-2 text-sm lg:text-base cursor-pointer"
            >
              <Download size={18} /> Resume
            </a>
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: false, amount: 0.3 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="relative order-1 lg:order-2 flex justify-center lg:block"
        >
            <div className="block lg:hidden relative w-40 h-40 rounded-full overflow-hidden border-4 border-white shadow-2xl shadow-emerald-500/20">
                <img 
                  src="/profile-hero.jpg" 
                  alt="Gigih Agung" 
                  className="object-cover w-full h-full" 
                />
            </div>

            <div className="hidden lg:block relative w-full h-[600px]">
                <div className="absolute top-10 right-10 w-[80%] h-[85%] bg-slate-200 rounded-3xl overflow-hidden border-4 border-white shadow-2xl z-10 rotate-3 hover:rotate-0 transition-all duration-700 ease-out">
                    <img 
                      src="/profile-hero.jpg" 
                      alt="Gigih" 
                      className="object-cover w-full h-full" 
                    />
                </div>
                
                <motion.div 
                  variants={floatingVariants}
                  animate="animate"
                  className="absolute top-20 left-0 bg-white p-5 rounded-2xl shadow-xl border border-slate-100 z-20 w-48"
                >
                   <div className="flex gap-3 items-center">
                     <Database size={20} className="text-red-500"/>
                     <span className="font-bold text-sm text-slate-800">Laravel 12</span>
                   </div>
                </motion.div>

                <motion.div 
                  variants={floatingVariants}
                  animate="animate"
                  transition={{ delay: 1 }}
                  className="absolute bottom-20 left-10 bg-white p-5 rounded-2xl shadow-xl border border-slate-100 z-30 w-52"
                >
                   <div className="flex gap-3 items-center">
                     <Code2 size={20} className="text-blue-500"/>
                     <span className="font-bold text-sm text-slate-800">Next.js & React</span>
                   </div>
                </motion.div>
            </div>
        </motion.div>

      </motion.div>

      <div className="absolute bottom-0 left-0 w-full z-20">
      </div>

      <motion.div 
        className="absolute bottom-5 left-0 right-0 mx-auto w-fit"
        style={{ opacity: opacityContent }}
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 1.5, repeat: Infinity }}
      >
        <ArrowDown size={24} className="text-slate-400" />
      </motion.div>
      
    </section>
  );
}