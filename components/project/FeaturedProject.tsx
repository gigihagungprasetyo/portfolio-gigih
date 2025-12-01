"use client";

import React from "react";
import { motion, Variants } from "framer-motion";
import { ArrowRight, ExternalLink, Github } from "lucide-react";
import Link from "next/link";

interface Project {
  id: number;
  title: string;
  slug: string;
  category: string;
  year: number;
  description: string;
  thumbnail: string | null;
  tech_stack: string[] | null;
  demo_url: string | null;
  repo_url: string | null;
  is_featured?: number | boolean;
}

export default function FeaturedProject({ project }: { project: Project | null }) {
  
  const formatCategory = (key: string) => {
    const categoryMap: Record<string, string> = {
      'web-dev': 'Web Development',
      'data-science': 'Data Science',
      'machine-learning': 'Machine Learning',
      'mobile-app': 'Mobile Application',
      'ui-ux': 'UI/UX Design',
    };
    if (!key) return "Project";
    return categoryMap[key] || key.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
  };

  const getImageUrl = (path: string | null) => {
    if (!path) return "/api/placeholder/800/600";
    if (path.startsWith("http")) return path; 
    return path; 
  };

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.1 },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
  };

  if (!project) return null;

  return (
    <section className="relative py-20 lg:py-32 bg-slate-50 overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] right-[-5%] w-[500px] h-[500px] bg-emerald-100/40 rounded-full blur-[80px]" />
        <div className="absolute bottom-[-10%] left-[-5%] w-[400px] h-[400px] bg-teal-50/60 rounded-full blur-[80px]" />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.5 }}
          transition={{ duration: 0.6 }}
          className="flex items-center gap-4 mb-12 md:mb-20"
        >
          <span className="text-emerald-600 font-bold tracking-[0.2em] uppercase text-xs md:text-sm">
            Featured Project
          </span>
          <div className="h-px flex-1 bg-slate-200"></div>
        </motion.div>

        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
          
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: false, amount: 0.3 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="w-full lg:w-3/5 relative group"
          >
            <div className="relative rounded-2xl overflow-hidden shadow-2xl shadow-slate-200/50 bg-white">
              <div className="aspect-video relative bg-slate-200">
                 <img 
                   src={getImageUrl(project.thumbnail)} 
                   alt={project.title}
                   className="object-cover w-full h-full transform transition-transform duration-700 group-hover:scale-105"
                   onError={(e) => { (e.target as HTMLImageElement).src = "/api/placeholder/800/600"; }}
                 />
                 <div className="absolute inset-0 bg-linear-to-t from-slate-900/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </div>
            </div>
            
            <div className="absolute -bottom-6 -right-6 md:-bottom-8 md:-right-8 bg-white p-4 md:p-6 rounded-xl shadow-xl border border-slate-100 hidden md:block">
               <p className="text-xs text-slate-400 uppercase tracking-wider font-semibold mb-1">Created In</p>
               <p className="text-2xl font-bold text-slate-800">{project.year}</p>
            </div>
          </motion.div>

          <motion.div 
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false, amount: 0.3 }}
            className="w-full lg:w-2/5 space-y-6"
          >
            <motion.div variants={itemVariants} className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-100 text-emerald-700 text-xs font-bold uppercase tracking-wide">
              {formatCategory(project.category)}
            </motion.div>

            <motion.h2 variants={itemVariants} className="text-4xl md:text-5xl font-bold text-slate-900 leading-tight">
              {project.title}
            </motion.h2>

            <motion.p variants={itemVariants} className="text-lg text-slate-600 leading-relaxed font-light">
              {project.description}
            </motion.p>

            <motion.div variants={itemVariants} className="flex flex-wrap gap-2 pt-2">
              {(project.tech_stack || []).map((tech, index) => (
                <span key={index} className="text-sm font-medium text-slate-500 bg-slate-100 px-3 py-1.5 rounded-md">
                  {tech}
                </span>
              ))}
            </motion.div>

            <motion.div variants={itemVariants} className="flex flex-wrap items-center gap-4 pt-6">
              <Link 
                href={`/projects/${project.slug}`}
                className="group relative inline-flex items-center gap-2 px-8 py-3.5 bg-slate-900 text-white rounded-full font-medium transition-all hover:bg-slate-800 hover:shadow-lg hover:shadow-emerald-500/20"
              >
                <span>View Case Study</span>
                <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
              </Link>

              {project.demo_url && (
                <a 
                  href={project.demo_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-3.5 text-slate-600 font-medium hover:text-emerald-600 transition-colors"
                >
                  <ExternalLink size={18} />
                  <span>Live Demo</span>
                </a>
              )}

               {project.repo_url && (
                <a 
                  href={project.repo_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center w-12 h-12 rounded-full border border-slate-200 text-slate-500 hover:text-slate-900 hover:border-slate-400 transition-colors"
                  aria-label="View Source Code"
                >
                  <Github size={20} />
                </a>
              )}
            </motion.div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}