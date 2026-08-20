"use client";

import React, { useState, useEffect, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { GraduationCap, Award, Trophy, ExternalLink, ChevronLeft, ChevronRight } from "lucide-react";

export type Education = {
  id: number;
  institution: string;
  degree: string;
  major: string;
  year: string;
  gpa?: string;
  logo: string | null;
  description?: string;
};

export type Achievement = {
  id: number;
  title: string;
  issuer: string;
  year: string;
  credential_url?: string;
  image: string | null;
};

const ITEMS_PER_PAGE = 4;
const AUTOSLIDE_INTERVAL = 5000; 

export default function EducationAchievements({ 
  educations, 
  achievements 
}: { 
  educations: Education[]; 
  achievements: Achievement[];
}) {
  const [selectedYear, setSelectedYear] = useState<string>("All");
  const [currentPage, setCurrentPage] = useState(0);
  const [direction, setDirection] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  const years = useMemo(() => {
    const allYears = achievements.map(a => a.year);
    return ["All", ...Array.from(new Set(allYears)).sort().reverse()];
  }, [achievements]);

  const filteredAchievements = useMemo(() => {
    if (selectedYear === "All") return achievements;
    return achievements.filter(a => a.year === selectedYear);
  }, [selectedYear, achievements]);

  useEffect(() => {
    setCurrentPage(0);
    setDirection(0);
  }, [selectedYear]);

  const totalPages = Math.ceil(filteredAchievements.length / ITEMS_PER_PAGE);
  const paginatedItems = filteredAchievements.slice(
    currentPage * ITEMS_PER_PAGE,
    (currentPage + 1) * ITEMS_PER_PAGE
  );

  const nextPage = () => {
    setDirection(1);
    if (currentPage < totalPages - 1) {
      setCurrentPage((prev) => prev + 1);
    } else {
      setCurrentPage(0);
    }
  };

  const prevPage = () => {
    setDirection(-1);
    if (currentPage > 0) {
      setCurrentPage((prev) => prev - 1);
    } else {
      setCurrentPage(totalPages - 1); 
    }
  };

  useEffect(() => {
    if (totalPages <= 1 || isHovered) return;

    const interval = setInterval(() => {
      setDirection(1); 
      setCurrentPage(prevPage => (prevPage + 1) % totalPages);
    }, AUTOSLIDE_INTERVAL);

    return () => clearInterval(interval);
  }, [totalPages, isHovered]);

  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 50 : -50,
      opacity: 0,
      scale: 0.98,
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1,
      scale: 1,
    },
    exit: (direction: number) => ({
      zIndex: 0,
      x: direction < 0 ? 50 : -50,
      opacity: 0,
      scale: 0.98,
    }),
  };

  const sectionVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0 } 
  };

  return (
    <section className="min-h-screen w-full bg-white py-10 px-4 sm:px-6 relative overflow-hidden flex flex-col">
      
      <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-emerald-50/30 rounded-full blur-[150px] pointer-events-none translate-x-1/3 -translate-y-1/4" />
      <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-blue-50/30 rounded-full blur-[120px] pointer-events-none -translate-x-1/3 translate-y-1/4" />
      
      <div className="container mx-auto max-w-7xl relative z-10">
        
        <div className="mb-8 lg:mb-10">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false }}
            className="text-3xl lg:text-4xl font-bold text-slate-900 tracking-tight"
          >
            Education & <span className="text-emerald-600">Honors</span>
          </motion.h2>
        </div>

        <motion.div 
          className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start"
          initial="hidden"
          whileInView="visible"
          variants={sectionVariants}
          viewport={{ once: false, amount: 0.2 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          
          <div className="lg:col-span-7 space-y-6">
            <h3 className="text-xs font-bold text-slate-400 flex items-center gap-2 uppercase tracking-widest mb-4 ml-1 group">
              <motion.div whileHover={{ scale: 1.1, rotate: -5 }} transition={{ duration: 0.2 }}>
                <GraduationCap size={14} /> 
              </motion.div>
              Academic Background
            </h3>
            
            {educations.length === 0 ? (
               <div className="p-6 border border-dashed border-slate-200 rounded-3xl text-center text-slate-400">
                  No education data available.
               </div>
            ) : (
               educations.map((edu) => (
              <motion.div
                key={edu.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: false }}
                className="relative bg-white rounded-4xl p-6 sm:p-8 border border-slate-100 shadow-[0_15px_45px_-10px_rgba(0,0,0,0.05)] overflow-hidden hover:shadow-[0_20px_40px_-10px_rgba(16,185,129,0.1)] transition-all duration-300"
              >
                <div className="absolute top-0 right-0 w-40 h-40 bg-linear-to-bl from-emerald-50/80 to-transparent rounded-bl-full -mr-10 -mt-10 pointer-events-none" />
                
                <div className="relative z-10 flex flex-col sm:flex-row gap-6 items-start text-left">
                  <div 
                    className="w-20 h-20 rounded-2xl bg-white border border-slate-100 shadow-sm flex items-center justify-center p-3 shrink-0 overflow-hidden relative group-hover:scale-[1.02] transition-transform duration-300"
                    title={edu.institution}
                  >
                    {edu.logo ? (
                      <img 
                        src={edu.logo} 
                        alt={edu.institution} 
                        className="object-contain p-1 w-full h-full" 
                      />
                    ) : (
                      <GraduationCap size={32} className="text-emerald-500" />
                    )}
                  </div>

                  <div className="flex-1">
                    <h4 className="text-xl lg:text-2xl font-bold text-slate-900 leading-tight mb-2">
                      {edu.institution}
                    </h4>
                    
                    <div className="flex flex-wrap items-center gap-2 mb-4">
                        <span className="text-emerald-600 font-bold text-sm">
                           {edu.degree}
                        </span>
                        <span className="text-slate-300 hidden sm:inline text-xs">•</span>
                        <span className="text-slate-500 text-sm">
                           {edu.major}
                        </span>
                        <span className="text-slate-300 hidden sm:inline text-xs">•</span>
                        <span className="text-slate-500 text-sm font-medium bg-slate-50 px-2 py-0.5 rounded-full">
                           {edu.year}
                        </span>
                    </div>
                    
                    {edu.gpa && (
                      <div className="inline-flex items-center gap-1.5 bg-yellow-50/50 border border-yellow-100/50 rounded-full px-3 py-1 text-yellow-700 font-bold text-xs mb-5">
                        <Trophy size={12} className="fill-yellow-500 text-yellow-500" />
                        GPA: {edu.gpa}
                      </div>
                    )}

                    {edu.description && (
                        <div className="border-t border-slate-50 pt-4">
                           <p className="text-slate-600 text-sm leading-relaxed text-justify font-light">
                              {edu.description}
                           </p>
                        </div>
                    )}
                  </div>
                </div>
              </motion.div>
            )))}
          </div>

          <div 
            className="lg:col-span-5 flex flex-col w-full h-full"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            
            <div className="flex flex-col gap-4 mb-4">
               <div className="flex items-center justify-between">
                  <h3 className="text-xs font-bold text-slate-400 flex items-center gap-2 uppercase tracking-widest ml-1 group">
                    <motion.div whileHover={{ scale: 1.1, rotate: 5 }} transition={{ duration: 0.2 }}>
                      <Award size={14} />
                    </motion.div>
                    Certifications
                  </h3>

                  <div className="flex items-center gap-3">
                    <button 
                      onClick={prevPage}
                      disabled={totalPages <= 1}
                      className="w-8 h-8 rounded-full bg-white border border-slate-100 flex items-center justify-center text-slate-400 hover:text-emerald-600 hover:border-emerald-200 hover:shadow-md disabled:opacity-30 disabled:hover:shadow-none transition-all duration-300"
                    >
                      <ChevronLeft size={16} />
                    </button>
                    <button 
                      onClick={nextPage}
                      disabled={totalPages <= 1}
                      className="w-8 h-8 rounded-full bg-white border border-slate-100 flex items-center justify-center text-slate-400 hover:text-emerald-600 hover:border-emerald-200 hover:shadow-md disabled:opacity-30 disabled:hover:shadow-none transition-all duration-300"
                    >
                      <ChevronRight size={16} /> 
                    </button>
                  </div>
               </div>
               
               <div 
                  className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-hide"
                  style={{ msOverflowStyle: 'none', scrollbarWidth: 'none' }}
               >
                  {years.map((year) => (
                     <button
                        key={year}
                        onClick={() => setSelectedYear(year)}
                        className={`px-3 py-1 rounded-full text-[10px] font-bold transition-all duration-300 whitespace-nowrap border ${
                           selectedYear === year 
                              ? "bg-emerald-600 border-emerald-600 text-white shadow-[inset_0_1px_3px_rgba(0,0,0,0.1)]" 
                              : "bg-transparent border-transparent text-slate-400 hover:bg-slate-50 hover:text-slate-600"
                        }`}
                     >
                        {year}
                     </button>
                  ))}
               </div>
            </div>

            <div className="relative flex-1 min-h-[380px]">
               {filteredAchievements.length === 0 ? (
                  <div className="h-full min-h-[350px] flex flex-col items-center justify-center text-slate-400 text-sm gap-3 border border-dashed border-slate-200 rounded-3xl bg-slate-50/30">
                     <Award size={32} className="opacity-50" />
                     <p>No achievements found in {selectedYear}.</p>
                  </div>
               ) : (
                  <div className="relative overflow-visible h-full">
                    <AnimatePresence initial={false} custom={direction} mode="wait">
                      <motion.div
                        key={currentPage + selectedYear}
                        custom={direction}
                        variants={slideVariants}
                        initial="enter"
                        animate="center"
                        exit="exit"
                        transition={{
                          x: { type: "spring", stiffness: 300, damping: 30 },
                          opacity: { duration: 0.2 }
                        }}
                        className="flex flex-col gap-3"
                      >
                        {paginatedItems.map((ach) => (
                          <div
                              key={ach.id}
                              className="group bg-white p-4 rounded-2xl border border-slate-100 shadow-sm hover:shadow-[0_8px_30px_rgba(0,0,0,0.04)] hover:border-blue-100 hover:-translate-y-0.5 transition-all duration-300 flex items-start gap-4"
                          >
                              <div className="w-10 h-10 rounded-xl bg-slate-50 flex items-center justify-center text-blue-400 shrink-0 group-hover:bg-blue-50 group-hover:text-blue-600 transition-colors duration-300 overflow-hidden relative">
                                <Award size={20} />
                              </div>

                              <div className="flex-1 min-w-0 py-0.5">
                                <div className="flex justify-between items-start gap-3">
                                    <h5 className="font-bold text-slate-800 text-sm leading-snug line-clamp-2 group-hover:text-blue-700 transition-colors w-full" title={ach.title}>
                                      {ach.title}
                                    </h5>
                                    {ach.year && (
                                      <span className="text-[10px] font-bold text-slate-400 bg-slate-50 px-2 py-0.5 rounded-md whitespace-nowrap">
                                          {ach.year}
                                      </span>
                                    )}
                                </div>
                                <p className="text-[11px] text-slate-500 mt-1 font-medium">
                                    {ach.issuer}
                                </p>
                                
                                {ach.credential_url && (
                                    <div className="mt-2 flex">
                                      <a 
                                          href={ach.credential_url} 
                                          target="_blank" 
                                          rel="noopener noreferrer"
                                          className="inline-flex items-center gap-1 text-[10px] font-bold text-slate-400 hover:text-emerald-600 transition-colors group/link"
                                      >
                                          Show Credential 
                                          <ExternalLink size={9} className="group-hover/link:translate-x-0.5 transition-transform" />
                                      </a>
                                    </div>
                                )}
                              </div>
                          </div>
                        ))}
                      </motion.div>
                    </AnimatePresence>
                  </div>
               )}
               
               {totalPages > 1 && (
                 <div className="absolute -bottom-6 left-0 right-0 flex justify-center gap-2">
                    {Array.from({ length: totalPages }).map((_, idx) => (
                      <div 
                        key={idx}
                        className={`h-1 transition-all duration-300 ${
                          idx === currentPage ? "bg-emerald-500 w-4 rounded-full" : "bg-slate-200 w-1.5 rounded-sm"
                        }`}
                      />
                    ))}
                 </div>
               )}
            </div>

          </div>

        </motion.div>
      </div>
    </section>
  );
}