"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, Variants, useScroll, useTransform } from "framer-motion"; 
import { ArrowUpRight, Github, FolderOpen, ChevronLeft, ChevronRight } from "lucide-react";

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
  gallery?: string[];
}

const TABS = [
  { id: "all", label: "All" },
  { id: "web-dev", label: "Web Dev" },
  { id: "data-science", label: "Data Science" },
  { id: "machine-learning", label: "Machine Learning" },
];

export default function FilteredGallery({ projects }: { projects: Project[] }) {
  const [activeTab, setActiveTab] = useState("all");
  const [currentPage, setCurrentPage] = useState(0);
  const [direction, setDirection] = useState(0);
  
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile(); 
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const itemsPerPage = isMobile ? 2 : 6;

  const sectionRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });

  const opacitySection = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);
  const scaleSection = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0.95, 1, 1, 0.95]);

  const formatCategoryLabel = (key: string) => {
    const map: Record<string, string> = {
      'web-dev': 'Web Dev',
      'data-science': 'Data Sci',
      'machine-learning': 'ML / AI',
    };
    if (!key) return 'Project';
    const normalizedKey = key.toLowerCase().replace(/\s+/g, '-');
    return map[normalizedKey] || map[key] || key.replace(/-/g, ' ');
  };

  const filteredProjects = projects.filter((project) => {
    if (activeTab === "all") return true;
    const pCat = (project.category || "").toLowerCase().trim();
    const tCat = activeTab.toLowerCase();
    if (pCat === tCat) return true;
    if (tCat === 'web-dev' && (pCat.includes('web') || pCat.includes('development'))) return true;
    if (tCat === 'data-science' && (pCat.includes('data') || pCat.includes('science'))) return true;
    if (tCat === 'machine-learning' && (pCat.includes('machine') || pCat.includes('learning') || pCat.includes('ml'))) return true;
    return false;
  });

  const handleTabChange = (tabId: string) => {
    if (tabId === activeTab) return; 
    setDirection(0);
    setActiveTab(tabId);
    setCurrentPage(0);
  };

  const totalPages = Math.ceil(filteredProjects.length / itemsPerPage);
  const safePage = Math.min(currentPage, Math.max(0, totalPages - 1));
  const paginatedProjects = filteredProjects.slice(
    safePage * itemsPerPage,
    (safePage + 1) * itemsPerPage
  );

  const handleNext = () => {
    if (safePage < totalPages - 1) {
      setDirection(1);
      setCurrentPage((prev) => prev + 1);
    }
  };

  const handlePrev = () => {
    if (safePage > 0) {
      setDirection(-1);
      setCurrentPage((prev) => prev - 1);
    }
  };

  const sliderVariants: Variants = {
    enter: (direction: number) => ({ x: direction > 0 ? 50 : -50, opacity: 0 }),
    center: { x: 0, opacity: 1, transition: { x: { type: "spring", stiffness: 300, damping: 30 }, opacity: { duration: 0.2 } } },
    exit: (direction: number) => ({ x: direction < 0 ? 50 : -50, opacity: 0, transition: { x: { type: "spring", stiffness: 300, damping: 30 }, opacity: { duration: 0.2 } } }),
  };

  const fadeUpVariants: Variants = {
    hidden: { opacity: 0, y: 40 },
    visible: { 
      opacity: 1, 
      y: 0, 
      transition: { duration: 0.6, ease: "easeOut" } 
    }
  };

  return (
    <section ref={sectionRef} className="py-16 md:py-20 bg-white relative overflow-hidden">
      
      <motion.div 
        style={{ opacity: opacitySection, scale: scaleSection }}
        className="container mx-auto px-4 md:px-6 max-w-7xl"
      >
        
        <div className="flex flex-col gap-8 mb-8 md:mb-12">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <motion.div 
              initial="hidden" 
              whileInView="visible" 
              viewport={{ once: false, amount: 0.3 }} // <-- Update disini
              variants={fadeUpVariants}
            >
              <h2 className="text-3xl md:text-5xl font-bold text-slate-900 mb-2">
                Explore <span className="text-emerald-600">Categories</span>
              </h2>
              <p className="text-slate-500 max-w-lg font-light text-base md:text-lg">
                Curated selection of my work across different domains.
              </p>
            </motion.div>
            
            <motion.a 
                href="/projects/archive" 
                initial="hidden" 
                whileInView="visible" 
                viewport={{ once: false, amount: 0.3 }} // <-- Update disini
                variants={fadeUpVariants} 
                className="inline-flex items-center gap-2 text-sm font-semibold text-slate-500 hover:text-emerald-600 transition-colors group pb-2 mt-2 md:mt-0 self-start md:self-auto"
            >
              View Full Archive 
              <ArrowUpRight size={18} className="group-hover:-translate-y-0.5 group-hover:translate-x-0.5 transition-transform"/>
            </motion.a>
          </div>

          <motion.div 
            initial="hidden" 
            whileInView="visible" 
            viewport={{ once: false, amount: 0.3 }} // <-- Update disini
            variants={fadeUpVariants} 
            className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 border-t border-slate-100 pt-6"
          >
            <div className="w-full md:w-auto overflow-x-auto pb-2 md:pb-0 -mx-4 px-4 md:mx-0 md:px-0 [&::-webkit-scrollbar]:hidden">
              <div className="flex md:flex-wrap gap-2 min-w-max">
                {TABS.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => handleTabChange(tab.id)}
                    className={`px-5 py-2 rounded-full text-sm font-medium transition-all duration-300 whitespace-nowrap ${
                      activeTab === tab.id
                        ? "bg-slate-900 text-white shadow-md shadow-slate-900/20"
                        : "bg-slate-50 text-slate-600 hover:bg-emerald-50 hover:text-emerald-700"
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>
            </div>

            {totalPages > 1 && (
              <div className="flex items-center gap-3 self-end md:self-auto">
                <span className="text-xs font-bold text-slate-400 uppercase tracking-wider mr-2">Page {safePage + 1} / {totalPages}</span>
                <div className="flex gap-2">
                  <button onClick={handlePrev} disabled={safePage === 0} className="p-2.5 rounded-full border border-slate-200 text-slate-500 hover:border-emerald-200 hover:bg-emerald-50 hover:text-emerald-600 disabled:opacity-30 disabled:cursor-not-allowed transition-all"><ChevronLeft size={18} /></button>
                  <button onClick={handleNext} disabled={safePage === totalPages - 1} className="p-2.5 rounded-full border border-slate-200 text-slate-500 hover:border-emerald-200 hover:bg-emerald-50 hover:text-emerald-600 disabled:opacity-30 disabled:cursor-not-allowed transition-all"><ChevronRight size={18} /></button>
                </div>
              </div>
            )}
          </motion.div>
        </div>

        <div className="min-h-[500px] w-full relative"> 
          {filteredProjects.length === 0 ? (
            <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="flex flex-col items-center justify-center py-24 bg-slate-50/50 rounded-3xl border border-dashed border-slate-200">
              <div className="p-4 bg-white rounded-full shadow-sm mb-4"><FolderOpen className="w-8 h-8 text-slate-300" /></div>
              <p className="text-slate-500 font-medium text-lg">No projects found for {activeTab}</p>
            </motion.div>
          ) : (
            <div className="overflow-visible w-full"> 
              <AnimatePresence mode="wait" custom={direction}>
                <motion.div
                  key={`${activeTab}-${safePage}`}
                  custom={direction}
                  variants={sliderVariants}
                  initial="enter"
                  // Kita gunakan kombinasi whileInView pada parent div tadi
                  animate="center" 
                  exit="exit"
                  className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 w-full"
                >
                  {paginatedProjects.map((project, index) => (
                    <motion.div
                      key={project.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="w-full"
                    >
                      <ProjectCard 
                        project={project} 
                        formatCategory={formatCategoryLabel}
                      />
                    </motion.div>
                  ))}
                </motion.div>
              </AnimatePresence>
            </div>
          )}
        </div>
      </motion.div>
    </section>
  );
}

function ProjectCard({ project, formatCategory }: { project: Project; formatCategory: (key: string) => string; }) {
  return (
    <div className="group flex flex-col bg-white rounded-2xl border border-slate-100 overflow-hidden hover:shadow-xl hover:shadow-slate-200/50 hover:-translate-y-1 transition-all duration-300 h-full w-full">
      <a href={`/projects/${project.slug}`} className="block relative aspect-4/3 overflow-hidden bg-slate-100 w-full">
        <img
          src={project.thumbnail || "/api/placeholder/600/400"}
          alt={project.title}
          className="object-cover w-full h-full transform transition-transform duration-700 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-slate-900/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
           <span className="px-6 py-2.5 bg-white/95 backdrop-blur-sm text-slate-900 rounded-full text-sm font-bold shadow-lg transform translate-y-4 group-hover:translate-y-0 transition-all duration-300 hover:bg-emerald-500 hover:text-white">
             View Details
           </span>
        </div>
        <div className="absolute top-4 left-4">
           <span className="px-3 py-1 bg-white/90 backdrop-blur-md text-[10px] font-bold uppercase tracking-wider text-slate-800 rounded-lg shadow-sm border border-white/50">
             {formatCategory(project.category)}
           </span>
        </div>
      </a>

      <div className="p-5 md:p-6 flex flex-col grow">
        <div className="flex justify-between items-start mb-3">
           <h3 className="text-lg md:text-xl font-bold text-slate-900 leading-tight group-hover:text-emerald-600 transition-colors line-clamp-1">
             <a href={`/projects/${project.slug}`}>{project.title}</a>
           </h3>
           {project.repo_url && (
             <a href={project.repo_url} target="_blank" className="text-slate-300 hover:text-slate-600 transition-colors p-1"><Github size={18} /></a>
           )}
        </div>
        <p className="text-slate-500 text-sm line-clamp-3 mb-5 grow leading-relaxed">{project.description}</p>
        <div className="flex items-center gap-2 pt-4 border-t border-slate-50">
           {(project.tech_stack || []).slice(0, 3).map((tech, i) => (
             <span key={i} className="text-[10px] font-semibold text-slate-500 bg-slate-50 px-2 py-1 rounded border border-slate-100">{tech}</span>
           ))}
           {(project.tech_stack || []).length > 3 && (
             <span className="text-[10px] font-semibold text-slate-400 px-1 py-1">+{(project.tech_stack || []).length - 3}</span>
           )}
        </div>
      </div>
    </div>
  );
}