"use client";

import React, { useState, useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useSpring } from "framer-motion";
import { Briefcase, ChevronDown, ChevronUp, Loader2, MapPin } from "lucide-react";

export type ExperienceItem = {
  id: number;
  role: string;
  company: string;
  logo: string | null;
  period: string;
  description: string;
  location: string | null;
  technologies: string[];
  isCurrent: boolean;
};

export default function ExperienceTimeline({ experiences }: { experiences: ExperienceItem[] }) {
  const [showAll, setShowAll] = useState(false); 

  const containerRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end end"],
  }); 

  const scaleY = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  const ITEMS_TO_SHOW = 2; 
  const visibleExperiences = showAll ? experiences : experiences.slice(0, ITEMS_TO_SHOW);

  const handleToggle = () => {
    if (showAll) {
      sectionRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    }
    setShowAll(!showAll);
  };

  return (
    <section 
      ref={sectionRef} 
      className="min-h-screen w-full bg-white py-20 px-4 sm:px-6 relative overflow-hidden"
    >
      <div className="absolute inset-0 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] bg-size-[24px_24px] opacity-40 -z-10"></div>
      <motion.div 
        animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-0 left-0 w-[500px] h-[500px] bg-emerald-100/50 rounded-full blur-[100px] -translate-x-1/2 -translate-y-1/2 -z-10"
      />
      <motion.div 
        animate={{ scale: [1, 1.1, 1], opacity: [0.2, 0.4, 0.2] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        className="absolute top-1/2 right-0 w-[600px] h-[600px] bg-blue-50/50 rounded-full blur-[120px] translate-x-1/3 -z-10"
      />

      <div className="container mx-auto max-w-5xl relative z-10">
        
        <div className="text-center mb-12 lg:mb-24">
          <motion.div
             initial={{ opacity: 0, y: 20 }}
             whileInView={{ opacity: 1, y: 0 }}
             viewport={{ once: false }}
             className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-100 text-emerald-600 text-xs font-bold uppercase tracking-widest mb-4"
          >
            <Briefcase size={14} />
            Professional Journey
          </motion.div>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false }}
            transition={{ delay: 0.1 }}
            className="text-3xl lg:text-5xl font-bold text-slate-900"
          >
            Experience <span className="text-emerald-600">Timeline</span>
          </motion.h2>
        </div>

        <div ref={containerRef} className="relative max-w-4xl mx-auto min-h-[200px]">
          
          {experiences.length === 0 ? (
             <div className="text-center p-10 border border-dashed border-slate-200 rounded-2xl">
                <p className="text-slate-400">No experience data found.</p>
             </div>
          ) : (
             <>
                <div className="absolute left-5 lg:left-1/2 top-0 bottom-0 w-0.5 bg-slate-200 lg:-translate-x-1/2 origin-top">
                   <motion.div 
                      style={{ scaleY }} 
                      className="absolute top-0 left-0 w-full bg-linear-to-b from-emerald-500 to-teal-400 origin-top h-full"
                   />
                </div>

                <div className="space-y-12 lg:space-y-0 pb-12">
                  {visibleExperiences.map((exp, index) => (
                    <TimelineItem key={exp.id} data={exp} index={index} />
                  ))}
                </div>
                
                {experiences.length > ITEMS_TO_SHOW && (
                   <motion.div 
                      initial={{ opacity: 0 }}
                      whileInView={{ opacity: 1 }}
                      viewport={{ once: false }}
                      className="flex justify-center mt-12 lg:mt-16 relative z-20 pl-8 lg:pl-0" 
                   >
                      <button 
                         onClick={handleToggle} 
                         className="group flex flex-col items-center gap-2 text-slate-400 hover:text-emerald-600 transition-colors"
                      >
                         <span className="text-xs font-bold uppercase tracking-widest">
                            {showAll ? "Show Less" : "Load More History"}
                         </span>
                         <div className="p-3 rounded-full bg-white border border-slate-200 shadow-sm group-hover:border-emerald-200 group-hover:shadow-md transition-all">
                            {showAll ? (
                               <ChevronUp size={20} className="group-hover:-translate-y-1 transition-transform" />
                            ) : (
                               <ChevronDown size={20} className="animate-bounce" />
                            )}
                         </div>
                      </button>
                   </motion.div>
                )}
             </>
          )}

        </div>
      </div>
    </section>
  );
}

function TimelineItem({ data, index }: { data: ExperienceItem; index: number }) {
  const isEven = index % 2 === 0;
  const isCurrent = data.isCurrent;

  const getInitials = (name: string) => {
    return name.split(" ").map((n) => n[0]).slice(0, 2).join("").toUpperCase();
  };

  return (
    <div className={`relative flex items-center justify-between lg:mb-12 ${isEven ? 'lg:flex-row' : 'lg:flex-row-reverse'} flex-row lg:gap-0 gap-0`}>
      
      <div className="absolute left-5 lg:left-1/2 -translate-x-[50%] lg:-translate-x-1/2 flex items-center justify-center z-20">
         <motion.div 
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: false }}
            className={`relative flex items-center justify-center rounded-full bg-white border-4 shadow-lg ${
               isCurrent 
                 ? "w-7 h-7 lg:w-8 lg:h-8 border-emerald-500 shadow-emerald-200" 
                 : "w-4 h-4 lg:w-5 lg:h-5 border-slate-300"
            }`}
         >
            {isCurrent && (
               <span className="absolute w-full h-full rounded-full bg-emerald-400 opacity-75 animate-ping" />
            )}
            {isCurrent && (
               <span className="w-2 h-2 lg:w-2.5 lg:h-2.5 bg-emerald-600 rounded-full" />
            )}
         </motion.div>
      </div>

      <div className={`hidden lg:block w-[45%] ${isEven ? 'text-right pr-12' : 'text-left pl-12'}`}>
         <motion.div
            initial={{ opacity: 0, x: isEven ? 20 : -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: false }}
            className={`inline-flex flex-col gap-1 ${isEven ? 'items-end' : 'items-start'}`}
         >
            <span className={`font-bold text-xl tracking-tight ${isCurrent ? 'text-emerald-600' : 'text-slate-400'}`}>
               {data.period}
            </span>
            {data.location && (
               <span className="text-slate-400 text-xs font-medium uppercase tracking-wider flex items-center gap-1 justify-end">
                  <MapPin size={12} /> {data.location}
               </span>
            )}
         </motion.div>
      </div>

      <div className={`w-full lg:w-[45%] pl-12 lg:pl-0 ${isEven ? 'lg:pl-12' : 'lg:pr-12'}`}>
         
         <div className={`hidden lg:block absolute top-1/2 -translate-y-1/2 h-0.5 w-12 bg-slate-200 -z-10 ${isEven ? 'left-1/2' : 'right-1/2'}`} />

         <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, margin: "-50px" }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            whileHover={{ y: -5, transition: { duration: 0.2 } }}
            className={`group relative bg-white p-5 lg:p-6 rounded-2xl border transition-all duration-300 ${
               isCurrent 
                 ? "border-emerald-200 shadow-xl shadow-emerald-500/5 ring-1 ring-emerald-100" 
                 : "border-slate-100 shadow-sm hover:shadow-lg hover:border-emerald-100/50"
            }`}
         >
            <div className="lg:hidden flex items-center justify-between mb-4">
               <span className={`font-bold text-[10px] sm:text-xs uppercase tracking-wider px-2 py-1 rounded-md ${
                  isCurrent ? "bg-emerald-100 text-emerald-700" : "bg-slate-100 text-slate-500"
               }`}>
                  {data.period}
               </span>
            </div>

            <div className="relative z-10">
               <div className="flex items-start gap-4 mb-4">
                  <div className="w-10 h-10 lg:w-12 lg:h-12 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-center shrink-0 overflow-hidden relative">
                     {data.logo ? (
                        <Image 
                           src={data.logo} 
                           alt={data.company} 
                           fill 
                           className="object-cover"
                           sizes="48px"
                        />
                     ) : (
                        <span className="text-slate-400 font-bold text-xs lg:text-sm tracking-tight">
                           {getInitials(data.company)}
                        </span>
                     )}
                  </div>
                  
                  <div>
                     <h3 className={`text-base lg:text-lg font-bold leading-tight group-hover:text-emerald-700 transition-colors ${
                        isCurrent ? "text-slate-900" : "text-slate-800"
                     }`}>
                        {data.role}
                     </h3>
                     
                     <div className="flex flex-wrap items-center gap-2 mt-1">
                        <p className="text-slate-500 font-medium text-xs lg:text-sm">
                           {data.company}
                        </p>
                        
                        {isCurrent && (
                           <span className="relative flex h-2 w-2">
                              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                           </span>
                        )}
                     </div>

                     {data.location && (
                       <div className="flex lg:hidden items-center gap-1 text-[10px] text-slate-400 mt-1">
                          <MapPin size={10} />
                          {data.location}
                       </div>
                     )}
                  </div>
               </div>

               {data.description && (
                  <p className="text-slate-600 text-sm leading-relaxed mb-4 border-l-2 border-slate-100 pl-4">
                     {data.description}
                  </p>
               )}

               {data.technologies && data.technologies.length > 0 && (
                  <div className="flex flex-wrap gap-2 mt-4 pt-4 border-t border-slate-50">
                     {data.technologies.map((tech, i) => (
                        <span key={i} className="px-2 py-0.5 lg:px-2.5 lg:py-1 rounded-full bg-slate-50 text-slate-600 text-[10px] font-bold uppercase tracking-wide border border-slate-100 group-hover:border-emerald-100 group-hover:bg-emerald-50/50 transition-colors">
                           {tech}
                        </span>
                     ))}
                  </div>
               )}
            </div>
         </motion.div>
      </div>
    </div>
  );
}