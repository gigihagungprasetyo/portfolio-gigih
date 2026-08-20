"use client";

import React, { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { 
  ArrowLeft, ExternalLink, Github, Calendar, Layers, 
  Target, Lightbulb, Image as ImageIcon, ArrowRight, Sparkles, ChevronLeft, ChevronRight 
} from "lucide-react";
import Contact from "@/components/home/Contact"; 

interface Project {
  id: number;
  title: string;
  slug: string;
  category: string;
  year: number;
  description: string;
  challenge: string | null;
  solution: string | null;
  thumbnail: string | null;
  gallery: string[] | null;
  tech_stack: string[] | null;
  demo_url: string | null;
  repo_url: string | null;
}

const ITEMS_PER_PAGE = 4; 

export default function ProjectDetailClient({ 
  project, 
  recommendations 
}: { 
  project: Project; 
  recommendations: Project[];
}) {
  const [recPage, setRecPage] = useState(0);

  const formatCategory = (key: string) => {
    if (!key) return "";
    const categoryMap: Record<string, string> = {
      'web-dev': 'Web Development',
      'data-science': 'Data Science',
      'machine-learning': 'Machine Learning',
      'mobile-app': 'Mobile Application',
      'ui-ux': 'UI/UX Design',
    };
    return categoryMap[key] || key.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
  };

  const getImageUrl = (path: string | null) => {
    if (!path) return "/api/placeholder/800/600";
    if (path.startsWith("http")) return path;
    return path;
  };

  const totalPages = Math.ceil(recommendations.length / ITEMS_PER_PAGE);
  const displayedRecommendations = recommendations.slice(
    recPage * ITEMS_PER_PAGE, 
    (recPage + 1) * ITEMS_PER_PAGE
  );

  const handleNextPage = () => {
    if (recPage < totalPages - 1) setRecPage(prev => prev + 1);
  };

  const handlePrevPage = () => {
    if (recPage > 0) setRecPage(prev => prev - 1);
  };

  return (
    <main className="min-h-screen bg-white overflow-x-hidden relative selection:bg-emerald-100 selection:text-emerald-900">
      
      <div className="fixed inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-size-[24px_24px] pointer-events-none z-0"></div>
      <div className="fixed top-[-20%] right-[-10%] w-[800px] h-[800px] bg-emerald-50/30 rounded-full blur-[120px] pointer-events-none z-0 mix-blend-multiply" />
      <div className="fixed bottom-[-20%] left-[-10%] w-[600px] h-[600px] bg-blue-50/30 rounded-full blur-[100px] pointer-events-none z-0 mix-blend-multiply" />
      <div className="fixed top-[40%] left-[20%] w-[400px] h-[400px] bg-slate-100/40 rounded-full blur-[80px] pointer-events-none z-0 mix-blend-multiply" />

      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }} 
        transition={{ delay: 0.5, duration: 0.8 }}
        className="fixed top-6 left-6 lg:top-8 lg:left-10 z-50 hidden lg:block"
      >
        <Link 
          href="/projects" 
          className="group flex items-center gap-3 px-4 py-2 bg-white/80 backdrop-blur-xl border border-slate-200/60 rounded-full text-slate-500 hover:text-slate-900 hover:border-slate-300 transition-all shadow-sm hover:shadow-md"
        >
          <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
          <span className="font-medium text-xs tracking-wide">Back to Projects</span>
        </Link>
      </motion.div>

      <div className="relative z-10 container mx-auto px-6 pt-24 pb-4 lg:pt-32 lg:pb-8">
        <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 items-start">
            
            <motion.div 
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                className="w-full lg:w-7/12"
            >
                <motion.div 
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2, duration: 0.6 }}
                  className="inline-flex items-center gap-2 px-3 py-1 mb-4 rounded-full bg-emerald-50/50 border border-emerald-100 text-emerald-800 text-[10px] font-bold uppercase tracking-[0.15em]"
                >
                    {formatCategory(project.category)}
                </motion.div>

                <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold text-slate-900 leading-[1.05] mb-4 tracking-tight">
                    {project.title}
                </h1>

                <p className="text-lg text-slate-500 leading-relaxed font-light max-w-2xl border-l-2 border-emerald-100 pl-4">
                    {project.description}
                </p>
            </motion.div>

            <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
                className="w-full lg:w-5/12 lg:sticky lg:top-24"
            >
                <div className="relative group">
                    <div className="absolute inset-0 bg-linear-to-tr from-emerald-50/50 to-slate-50/50 rounded-3xl blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                    
                    <div className="relative bg-white/80 backdrop-blur-xl p-6 rounded-[1.25rem] border border-slate-200/60 shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)] transition-shadow duration-500">
                        <div className="flex items-start gap-4 mb-4">
                            <div className="p-2.5 bg-white rounded-xl text-slate-900 shadow-sm border border-slate-100">
                                <Calendar size={18} strokeWidth={1.5} />
                            </div>
                            <div>
                                <h3 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-0.5">Year</h3>
                                <p className="text-base font-semibold text-slate-900">{project.year}</p>
                            </div>
                        </div>

                        <div className="flex items-start gap-4 mb-6">
                            <div className="p-2.5 bg-white rounded-xl text-slate-900 shadow-sm border border-slate-100">
                                <Layers size={18} strokeWidth={1.5} />
                            </div>
                            <div>
                                <h3 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2">Tech Stack</h3>
                                <div className="flex flex-wrap gap-1.5">
                                    {project.tech_stack && project.tech_stack.map((tech, idx) => (
                                        <span key={idx} className="text-[11px] font-medium text-slate-600 bg-white border border-slate-200/60 px-2.5 py-1 rounded-lg hover:border-emerald-200 transition-colors cursor-default">
                                            {tech}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </div>

                        <div className="h-px bg-linear-to-r from-transparent via-slate-200 to-transparent w-full mb-5"></div>

                        <div className="flex flex-col gap-2.5">
                            {project.demo_url && (
                                <a href={project.demo_url} target="_blank" rel="noopener noreferrer" className="group flex items-center justify-center gap-2.5 w-full py-2.5 bg-slate-900 text-white rounded-lg font-semibold transition-all hover:bg-slate-800 hover:shadow-lg hover:shadow-slate-900/20 active:scale-[0.98] text-sm">
                                    <ExternalLink size={16} className="group-hover:rotate-45 transition-transform duration-300" />
                                    <span>Live Preview</span>
                                </a>
                            )}
                            
                            {project.repo_url && (
                                <a href={project.repo_url} target="_blank" rel="noopener noreferrer" className="group flex items-center justify-center gap-2.5 w-full py-2.5 bg-white border border-slate-200 text-slate-600 rounded-lg font-semibold hover:border-slate-300 hover:text-slate-900 hover:shadow-sm transition-all active:scale-[0.98] text-sm">
                                    <Github size={16} className="group-hover:scale-110 transition-transform duration-300" />
                                    <span>Source Code</span>
                                </a>
                            )}
                        </div>
                    </div>
                </div>
            </motion.div>
        </div>
      </div>

      <section className="relative z-10 border-t border-slate-100/60 bg-transparent">
        <div className="container mx-auto px-6 py-8 lg:py-12">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-12">
                <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="bg-white/60 backdrop-blur-md p-6 rounded-2xl border border-slate-100/50">
                    <div className="flex items-center gap-3 mb-4">
                        <div className="w-10 h-10 rounded-xl bg-orange-50 border border-orange-100 flex items-center justify-center text-orange-600 shadow-sm"><Target size={20} strokeWidth={1.5} /></div>
                        <h2 className="text-xl md:text-2xl font-bold text-slate-900 tracking-tight">The Challenge</h2>
                    </div>
                    <div className="prose prose-slate text-slate-600 leading-relaxed font-light text-base">
                        <p>{project.challenge || "No challenge description available for this project yet."}</p>
                    </div>
                </motion.div>

                <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.2 }} className="bg-white/60 backdrop-blur-md p-6 rounded-2xl border border-slate-100/50">
                    <div className="flex items-center gap-3 mb-4">
                        <div className="w-10 h-10 rounded-xl bg-emerald-50 border border-emerald-100 flex items-center justify-center text-emerald-600 shadow-sm"><Lightbulb size={20} strokeWidth={1.5} /></div>
                        <h2 className="text-xl md:text-2xl font-bold text-slate-900 tracking-tight">The Solution</h2>
                    </div>
                    <div className="prose prose-slate text-slate-600 leading-relaxed font-light text-base">
                        <p>{project.solution || "No solution description available for this project yet."}</p>
                    </div>
                </motion.div>
            </div>
        </div>
      </section>

      <section className="relative z-10 border-t border-slate-100/60 bg-transparent">
        <div className="container mx-auto px-6 py-8 lg:py-12">
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="flex items-center gap-3 mb-8">
                <div className="w-10 h-10 rounded-xl bg-indigo-50 border border-indigo-100 flex items-center justify-center text-indigo-600 shadow-sm"><ImageIcon size={20} strokeWidth={1.5} /></div>
                <h2 className="text-xl md:text-2xl font-bold text-slate-900 tracking-tight">Visual Gallery</h2>
            </motion.div>

            {project.gallery && project.gallery.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
                    {project.gallery.map((img, index) => (
                        <motion.div key={index} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: index * 0.1 }} className="group relative rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-500 bg-white/80 backdrop-blur-sm border border-slate-200/50 aspect-video">
                            <img 
                                src={getImageUrl(img)} 
                                alt={`${project.title} screenshot ${index + 1}`}
                                className="object-cover w-full h-full transform transition-transform duration-700 group-hover:scale-105"
                                onError={(e) => { (e.target as HTMLImageElement).src = "/api/placeholder/800/600"; }}
                            />
                            <div className="absolute inset-0 bg-slate-900/0 group-hover:bg-slate-900/10 transition-colors duration-300" />
                        </motion.div>
                    ))}
                </div>
            ) : (
                <div className="p-8 border border-dashed border-slate-200 rounded-2xl bg-white/50 text-center">
                    <p className="text-slate-400 italic">No gallery images available for this project.</p>
                </div>
            )}
        </div>
      </section>

      <section className="relative z-10 border-t border-slate-100/60 bg-transparent">
        <div className="container mx-auto px-6 pt-12 pb-20 lg:pt-16 lg:pb-24">
            <div className="flex flex-col gap-8">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                         <Sparkles size={16} className="text-emerald-500" />
                         <span className="text-xs font-bold tracking-[0.2em] text-emerald-600 uppercase">More like this</span>
                    </div>
                    {totalPages > 1 && (
                      <div className="hidden lg:flex items-center gap-2">
                        <button onClick={handlePrevPage} disabled={recPage === 0} className="p-2 rounded-full border border-slate-200 text-slate-500 hover:bg-white hover:shadow-sm disabled:opacity-30 disabled:cursor-not-allowed transition-all"><ChevronLeft size={16} /></button>
                        <span className="text-xs font-bold text-slate-400">{recPage + 1} / {totalPages}</span>
                        <button onClick={handleNextPage} disabled={recPage === totalPages - 1} className="p-2 rounded-full border border-slate-200 text-slate-500 hover:bg-white hover:shadow-sm disabled:opacity-30 disabled:cursor-not-allowed transition-all"><ChevronRight size={16} /></button>
                      </div>
                    )}
                </div>

                {recommendations.length > 0 ? (
                    <>
                        <div className="hidden lg:grid lg:grid-cols-4 gap-6">
                            <AnimatePresence mode="wait">
                                {displayedRecommendations.map((recProject) => (
                                    <RecCard key={recProject.id} recProject={recProject} getImageUrl={getImageUrl} formatCategory={formatCategory} />
                                ))}
                            </AnimatePresence>
                        </div>
                        <div className="lg:hidden flex overflow-x-auto pb-6 -mx-6 px-6 gap-4 snap-x snap-mandatory [&::-webkit-scrollbar]:hidden">
                            {recommendations.map((recProject) => (
                                <div key={recProject.id} className="min-w-[280px] w-[80vw] snap-center">
                                    <RecCard recProject={recProject} getImageUrl={getImageUrl} formatCategory={formatCategory} />
                                </div>
                            ))}
                        </div>
                    </>
                ) : (
                    <div className="p-10 text-center bg-white/50 rounded-2xl border border-dashed border-slate-200">
                         <p className="text-slate-400 text-sm">No similar projects found.</p>
                         <Link href="/projects" className="mt-3 inline-block text-xs font-bold uppercase tracking-wider text-emerald-600 hover:underline">Browse All Projects</Link>
                    </div>
                )}
            </div>
        </div>
      </section>

      <Contact />
    </main>
  );
}

function RecCard({ recProject, getImageUrl, formatCategory }: { recProject: Project, getImageUrl: any, formatCategory: any }) {
    return (
        <Link href={`/projects/${recProject.slug}`} className="group relative bg-white/80 backdrop-blur-sm rounded-2xl overflow-hidden border border-slate-200/60 hover:shadow-lg hover:shadow-slate-200/50 hover:-translate-y-1 transition-all duration-300 flex flex-col h-full">
            <div className="aspect-video w-full overflow-hidden bg-slate-100 relative">
                <img src={getImageUrl(recProject.thumbnail)} alt={recProject.title} className="object-cover w-full h-full transform group-hover:scale-105 transition-transform duration-700" onError={(e) => { (e.target as HTMLImageElement).src = "/api/placeholder/800/600"; }} />
                <div className="absolute inset-0 bg-slate-900/10 group-hover:bg-transparent transition-colors duration-500" />
                <div className="absolute top-3 left-3"><span className="px-2 py-1 bg-white/90 backdrop-blur-md text-[9px] font-bold uppercase tracking-wider text-slate-800 rounded shadow-sm border border-white/50">{formatCategory(recProject.category)}</span></div>
            </div>
            <div className="p-5 flex flex-col grow">
                <div className="flex justify-between items-start mb-2"><h3 className="text-lg font-bold text-slate-900 leading-tight group-hover:text-emerald-600 transition-colors line-clamp-1">{recProject.title}</h3></div>
                <p className="text-slate-500 text-xs line-clamp-2 mb-4 leading-relaxed">{recProject.description}</p>
                <div className="mt-auto flex items-center text-xs font-bold text-slate-400 group-hover:text-emerald-600 transition-colors">View Details <ArrowRight size={14} className="ml-1 group-hover:translate-x-1 transition-transform" /></div>
            </div>
        </Link>
    )
}