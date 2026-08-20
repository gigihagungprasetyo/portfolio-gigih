"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import { motion, AnimatePresence, useMotionValue, useSpring } from "framer-motion"; 
import { ArrowLeft, ExternalLink, Github, ArrowUpRight, Search, X, ChevronLeft, ChevronRight } from "lucide-react";

interface Project {
  id: number;
  title: string;
  slug: string;
  category: string;
  year: number;
  tech_stack: string[] | null;
  demo_url: string | null;
  repo_url: string | null;
  thumbnail: string | null;
}

const ITEMS_PER_PAGE = 5;

export default function ArchiveClient({ projects }: { projects: Project[] }) {
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(0);
  const [hoveredThumbnail, setHoveredThumbnail] = useState<string | null>(null);
  
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springConfig = { damping: 20, stiffness: 300, mass: 0.5 };
  const x = useSpring(mouseX, springConfig);
  const y = useSpring(mouseY, springConfig);

  const handleMouseMove = (e: React.MouseEvent) => {
    mouseX.set(e.clientX - 150); 
    mouseY.set(e.clientY - 100);
  };

  const getImageUrl = (path: string | null) => {
    if (!path) return null;
    if (path.startsWith("http")) return path;
    return path;
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
    setCurrentPage(0);
  };

  const clearSearch = () => {
    setSearchQuery("");
    setCurrentPage(0);
  };

  const filteredProjects = useMemo(() => {
    if (!searchQuery) return projects;
    
    const query = searchQuery.toLowerCase();
    return projects.filter(p => {
      const titleMatch = p.title?.toLowerCase().includes(query) || false;
      const techMatch = Array.isArray(p.tech_stack) && p.tech_stack.some(t => 
        String(t).toLowerCase().includes(query)
      );
      return titleMatch || techMatch;
    });
  }, [projects, searchQuery]);

  const totalPages = Math.ceil(filteredProjects.length / ITEMS_PER_PAGE);
  const paginatedProjects = filteredProjects.slice(
    currentPage * ITEMS_PER_PAGE,
    (currentPage + 1) * ITEMS_PER_PAGE
  );

  const handleNextPage = () => {
    if (currentPage < totalPages - 1) {
        setCurrentPage(prev => prev + 1);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 0) {
        setCurrentPage(prev => prev - 1);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.05 } }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.4 } }
  };

  return (
    <div className="min-h-screen relative" onMouseMove={handleMouseMove}>
      
      <motion.div
        style={{ x, y, opacity: hoveredThumbnail ? 1 : 0, scale: hoveredThumbnail ? 1 : 0.8 }}
        className="fixed top-0 left-0 pointer-events-none z-50 hidden md:block"
        transition={{ duration: 0.2 }}
      >
        {hoveredThumbnail && (
            <div className="w-[300px] aspect-video rounded-xl overflow-hidden shadow-2xl border-4 border-white bg-slate-200">
                <img 
                    src={hoveredThumbnail} 
                    alt="Project Preview" 
                    className="w-full h-full object-cover"
                    onError={(e) => { (e.target as HTMLImageElement).src = "https://placehold.co/600x400/e2e8f0/94a3b8?text=No+Image"; }}
                />
            </div>
        )}
      </motion.div>
      
      <div className="mb-16">
          <Link href="/projects" className="hidden md:inline-flex items-center gap-2 text-slate-500 hover:text-slate-900 transition-colors mb-10 group">
            <div className="w-10 h-10 rounded-full bg-white border border-slate-200 flex items-center justify-center group-hover:border-slate-400 group-hover:-translate-x-1 transition-all shadow-sm">
               <ArrowLeft size={16} />
            </div>
            <span className="font-semibold text-sm tracking-wide">Back to Projects</span>
          </Link>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <h1 className="text-6xl md:text-7xl lg:text-8xl font-extrabold text-slate-900 mb-8 tracking-tight">The Archive</h1>
            
            <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end gap-8">
                <p className="text-xl text-slate-500 max-w-lg font-light leading-relaxed">
                  A complete timeline of projects I’ve built. <br className="hidden md:block"/>
                  <span className="text-slate-900 font-medium">Big ideas</span>, small experiments, and everything in between.
                </p>
                
                <div className="relative w-full lg:w-96 z-20">
                    <div className="relative group">
                        <div className="relative flex items-center w-full h-12 bg-white rounded-full border border-slate-200 hover:border-slate-300 focus-within:border-emerald-500 focus-within:ring-4 focus-within:ring-emerald-500/10 shadow-sm transition-all duration-300">
                            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none z-10">
                                <Search size={20} className="text-slate-400" />
                            </div>
                            <input 
                                type="text" 
                                placeholder="Search projects..." 
                                value={searchQuery}
                                onChange={handleSearch}
                                className="block w-full h-full pl-12 pr-12 bg-transparent text-slate-700 placeholder:text-slate-400 text-sm font-medium outline-none rounded-full"
                            />
                            <div className="absolute inset-y-0 right-0 pr-3 flex items-center z-10">
                                <AnimatePresence>
                                  {searchQuery && (
                                      <motion.button 
                                          initial={{ opacity: 0, scale: 0.8 }}
                                          animate={{ opacity: 1, scale: 1 }}
                                          exit={{ opacity: 0, scale: 0.8 }}
                                          transition={{ duration: 0.2 }}
                                          type="button" onClick={clearSearch}
                                          className="p-1.5 rounded-full text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-all cursor-pointer shrink-0"
                                      >
                                          <X size={20} />
                                      </motion.button>
                                  )}
                              </AnimatePresence>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
          </motion.div>
      </div>

      {filteredProjects.length > 0 ? (
          <div className="mt-12">
            <motion.div 
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                className="flex flex-col gap-4"
                key={currentPage + searchQuery} 
            >
                {paginatedProjects.map((project) => (
                <motion.div 
                    key={project.id}
                    variants={itemVariants}
                    onMouseEnter={() => setHoveredThumbnail(getImageUrl(project.thumbnail))}
                    onMouseLeave={() => setHoveredThumbnail(null)}
                    className="group relative bg-white/70 backdrop-blur-xl hover:bg-white rounded-3xl p-6 md:p-8 border border-slate-100 hover:border-emerald-100 hover:shadow-2xl hover:shadow-emerald-900/5 transition-all duration-500 cursor-default"
                >
                    <div className="flex flex-col md:flex-row gap-6 md:items-center justify-between">
                        <div className="flex flex-col md:flex-row md:items-center gap-6 md:gap-10 grow">
                            <div className="hidden md:block text-4xl font-bold text-slate-900/20 group-hover:text-emerald-600/30 transition-colors duration-500 font-mono w-24 shrink-0 select-none">
                                {project.year}
                            </div>
                            <div className="md:hidden text-xs font-bold text-emerald-600 uppercase tracking-widest mb-1">
                                {project.year}
                            </div>

                            <div>
                                <Link href={`/projects/${project.slug}`} className="block w-fit">
                                    <h3 className="text-2xl font-bold text-slate-800 group-hover:text-emerald-900 transition-colors mb-3 flex items-center gap-2">
                                        {project.title}
                                        <ArrowUpRight size={18} className="opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all text-emerald-500" />
                                    </h3>
                                </Link>
                                <div className="flex flex-wrap gap-2">
                                    {(project.tech_stack || []).slice(0, 5).map((tech, idx) => (
                                        <span key={idx} className="px-3 py-1 rounded-lg bg-slate-50 border border-slate-200/60 text-xs font-semibold text-slate-500 group-hover:bg-emerald-50 group-hover:border-emerald-100 group-hover:text-emerald-700 transition-colors">
                                            {tech}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </div>

                        <div className="flex items-center gap-3 pt-4 md:pt-0 border-t md:border-none border-slate-100 mt-2 md:mt-0 z-10">
                            {project.demo_url && (
                                <a href={project.demo_url} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 px-5 py-2.5 bg-slate-900 text-white rounded-full text-xs font-bold uppercase tracking-wider hover:bg-emerald-600 hover:shadow-lg hover:shadow-emerald-500/20 transition-all transform hover:-translate-y-0.5">
                                    <span className="hidden sm:inline">Live Demo</span> <span className="sm:hidden">Demo</span> <ExternalLink size={14} />
                                </a>
                            )}
                            {project.repo_url && (
                                <a href={project.repo_url} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center w-10 h-10 rounded-full border border-slate-200 text-slate-400 hover:text-slate-900 hover:border-slate-400 hover:bg-white transition-all" title="View Code">
                                    <Github size={18} />
                                </a>
                            )}
                        </div>
                    </div>
                </motion.div>
                ))}
            </motion.div>

            {totalPages > 1 && (
                <div className="mt-12 flex justify-center items-center gap-4">
                    <button onClick={handlePrevPage} disabled={currentPage === 0} className="p-3 rounded-full bg-white border border-slate-200 text-slate-500 hover:bg-slate-50 disabled:opacity-30 disabled:cursor-not-allowed transition-all shadow-sm">
                        <ChevronLeft size={20} />
                    </button>
                    <span className="text-sm font-bold text-slate-500 px-4">Page {currentPage + 1} of {totalPages}</span>
                    <button onClick={handleNextPage} disabled={currentPage === totalPages - 1} className="p-3 rounded-full bg-white border border-slate-200 text-slate-500 hover:bg-slate-50 disabled:opacity-30 disabled:cursor-not-allowed transition-all shadow-sm">
                        <ChevronRight size={20} />
                    </button>
                </div>
            )}
          </div>
      ) : (
        <div className="py-32 text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-slate-100 mb-4 text-slate-300">
                <Search size={32} />
            </div>
            <h3 className="text-xl font-bold text-slate-900 mb-2">No projects found</h3>
            <p className="text-slate-500">Try adjusting your search query.</p>
            {searchQuery && (
                <button type="button" onClick={clearSearch} className="mt-6 text-emerald-600 font-bold text-sm hover:underline">Clear Search</button>
            )}
        </div>
      )}
    </div>
  );
}