"use client";

import React from "react";
import { motion, Variants } from "framer-motion";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

interface Project {
  id: number;
  title: string;
  slug: string;
  thumbnail: string | null;
}

export default function ProjectsPreview({ projects }: { projects: Project[] }) {
  
  const viewPortSettings = { once: false, amount: 0.3 };

  const textVariants: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
  };

  const imageVariants: Variants = {
    hidden: { opacity: 0, scale: 0.95, y: 20 },
    visible: { opacity: 1, scale: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } },
  };

  const getImageUrl = (path: string | null) => {
    if (!path) return "/placeholder.jpg";
    return path; 
  };

  const featuredProject = projects.length > 0 ? projects[0] : null;

  return (
    <section id="projects" className="relative min-h-screen flex items-center justify-center bg-slate-50/50 overflow-hidden py-10 lg:py-0">
      
      <div className="absolute inset-0 h-full w-full bg-[radial-gradient(#cbd5e1_1.5px,transparent_1.5px)] bg-size-[24px_24px] opacity-40"></div>
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-emerald-200/40 rounded-full blur-[120px] pointer-events-none translate-x-1/3 -translate-y-1/3 mix-blend-multiply" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-blue-200/40 rounded-full blur-[100px] pointer-events-none -translate-x-1/3 translate-y-1/3 mix-blend-multiply" />

      <div className="container mx-auto max-w-6xl px-6 relative z-10 h-full flex flex-col justify-center">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-20 items-center">
          
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={viewPortSettings}
            transition={{ staggerChildren: 0.1 }}
            className="space-y-4 lg:space-y-8 text-center lg:text-left order-2 lg:order-1"
          >
            <motion.h4 variants={textVariants} className="text-emerald-600 font-bold tracking-widest uppercase text-xs lg:text-sm">
              Selected Work
            </motion.h4>

            <motion.h2 variants={textVariants} className="text-4xl sm:text-5xl lg:text-7xl font-extrabold text-slate-900 leading-[1.1] lg:leading-[0.95] tracking-tight">
              My <br className="hidden lg:block" />
              <span className="text-slate-400">Projects.</span>
            </motion.h2>

            <motion.p variants={textVariants} className="text-sm sm:text-base lg:text-xl text-slate-600 leading-relaxed max-w-md mx-auto lg:mx-0 font-medium">
              A curated collection of high-performance web applications built with precision and modern technologies.
            </motion.p>

            <motion.div variants={textVariants} className="pt-2 lg:pt-4 flex justify-center lg:justify-start relative z-20">
              <Link 
                href="/projects" 
                className="inline-flex items-center gap-2 lg:gap-3 px-6 py-3 lg:px-8 lg:py-4 bg-slate-900 text-white rounded-xl font-bold hover:bg-emerald-600 active:scale-95 transition-all duration-300 shadow-xl hover:shadow-emerald-500/25 hover:-translate-y-1 group text-sm lg:text-base"
              >
                Explore All Projects
                <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
              </Link>
            </motion.div>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={viewPortSettings}
            variants={imageVariants}
            className="relative w-full flex justify-center lg:block order-1 lg:order-2"
          >
            {featuredProject ? (
                <Link href={`/projects/${featuredProject.slug}`}>
                    <div className="relative w-full max-w-sm lg:max-w-none aspect-4/3 lg:aspect-16/10 bg-white rounded-2xl lg:rounded-3xl overflow-hidden shadow-2xl border-4 border-white group cursor-pointer">
                    
                    <img
                        src={getImageUrl(featuredProject.thumbnail)} 
                        alt={featuredProject.title}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-center text-white p-4 text-center">
                        <h3 className="text-xl lg:text-2xl font-bold translate-y-4 group-hover:translate-y-0 transition-transform duration-300">{featuredProject.title}</h3>
                        <span className="mt-2 px-4 py-2 lg:px-6 lg:py-2 bg-white/20 backdrop-blur-md border border-white/30 rounded-full font-bold text-xs lg:text-sm">
                        View Case Study
                        </span>
                    </div>
                    </div>
                </Link>
            ) : (
                <div className="w-full aspect-4/3 lg:aspect-16/10 bg-slate-100 rounded-2xl flex items-center justify-center text-slate-400 border-2 border-dashed border-slate-300">
                    No projects found.
                </div>
            )}

            <div className="absolute -bottom-6 lg:-bottom-8 left-1/2 -translate-x-1/2 w-[80%] lg:w-[90%] h-8 lg:h-10 bg-emerald-500/20 blur-[30px] lg:blur-2xl -z-10 rounded-full" />
          </motion.div>

        </div>
      </div>
    </section>
  );
}