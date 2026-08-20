"use client";

import React, { useState, useMemo } from "react";
import Image from "next/image";
import { motion, AnimatePresence, Variants } from "framer-motion";
import { Code2, Terminal, Globe, Palette, BrainCircuit, ChevronRight, ChevronLeft, Sparkles, LayoutTemplate, Box, RefreshCcw, Bot } from "lucide-react";

export type DatabaseSkill = {
  id: number;
  name: string;
  category: string;
};

type Skill = {
  name: string;
  iconUrl: string;
};

type SkillCategory = {
  id: string;
  label: string;
  icon: React.ElementType;
  description: string;
  skills: Skill[];
  theme: {
    primary: string; 
    bg: string;      
    border: string;  
    gradient: string; 
    blobColors: [string, string];
  };
};

const CATEGORY_CONFIG: Record<string, Omit<SkillCategory, "skills" | "id">> = {
  "web-dev": {
    label: "Web Development",
    icon: Globe,
    description: "Building robust, scalable applications with modern stacks.",
    theme: {
      primary: "text-emerald-600",
      bg: "bg-emerald-50",
      border: "hover:border-emerald-200",
      gradient: "from-emerald-400/20 to-teal-400/20",
      blobColors: ["#34d399", "#2dd4bf"],
    },
  },
  "machine-learning": { 
    label: "Machine Learning",
    icon: Bot,
    description: "Building intelligent systems that learn and adapt from data.",
    theme: {
      primary: "text-rose-600",
      bg: "bg-rose-50",
      border: "hover:border-rose-200",
      gradient: "from-rose-400/20 to-pink-400/20",
      blobColors: ["#fb7185", "#f43f5e"],
    },
  },
  "data-ai": {
    label: "Data Science",
    icon: BrainCircuit,
    description: "Deriving actionable insights from complex datasets.",
    theme: {
      primary: "text-blue-600",
      bg: "bg-blue-50",
      border: "hover:border-blue-200",
      gradient: "from-blue-400/20 to-indigo-400/20",
      blobColors: ["#60a5fa", "#818cf8"],
    },
  },
  "creative": {
    label: "Creative Design",
    icon: Palette,
    description: "Visual storytelling through interface and graphic design.",
    theme: {
      primary: "text-purple-600",
      bg: "bg-purple-50",
      border: "hover:border-purple-200",
      gradient: "from-purple-400/20 to-pink-400/20",
      blobColors: ["#c084fc", "#e879f9"],
    },
  },
  "tools": {
    label: "Tools & DevOps",
    icon: Terminal,
    description: "Streamlining workflow, version control, and deployment.",
    theme: {
      primary: "text-orange-600",
      bg: "bg-orange-50",
      border: "hover:border-orange-200",
      gradient: "from-orange-400/20 to-amber-400/20",
      blobColors: ["#fb923c", "#fbbf24"],
    },
  },
  "default": {
    label: "Other Skills",
    icon: LayoutTemplate,
    description: "Various technical skills and competencies.",
    theme: {
      primary: "text-slate-600",
      bg: "bg-slate-50",
      border: "hover:border-slate-200",
      gradient: "from-slate-400/20 to-gray-400/20",
      blobColors: ["#94a3b8", "#cbd5e1"],
    },
  }
};

const SPECIAL_ICON_NAMES: Record<string, string> = {
  "c++": "cplusplus",
  "c#": "csharp",
  "net core": "dotnetcore",
  "vue.js": "vuejs",
  "next.js": "nextjs",
  "node.js": "nodejs",
  "express.js": "express",
  "react native": "react",
  "tailwind": "tailwindcss",
  "tailwind css": "tailwindcss",
  "html": "html5",
  "css": "css3",
  "sql": "mysql", 
  "postgre": "postgresql",
  "postgres": "postgresql",
  "microsoft sql server": "microsoftsqlserver",
  "golang": "go",
  "jquery": "jquery",
  "scikit-learn": "scikitlearn",
  "tensorflow": "tensorflow",
  "pytorch": "pytorch",
  "opencv": "opencv",
};

const getIconUrl = (skillName: string): string => {
  if (!skillName) return "";
  const normalized = skillName.toLowerCase().trim();
  const iconName = SPECIAL_ICON_NAMES[normalized] || normalized.replace(/[\s.]+/g, ""); 
  return `https://cdn.jsdelivr.net/gh/devicons/devicon/icons/${iconName}/${iconName}-original.svg`;
};

const containerVariants: Variants = {
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: "easeOut", staggerChildren: 0.1 },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

export default function SkillsExpertise({ skills }: { skills: DatabaseSkill[] }) {
  const [activeTab, setActiveTab] = useState<string>("web-dev");
  const [currentPage, setCurrentPage] = useState(0); 
  const [direction, setDirection] = useState(0); 
  
  const categories = useMemo(() => {
    const groupedData: Record<string, SkillCategory> = {};

    skills.forEach((item) => {
        let categoryRaw = item.category ? item.category.toLowerCase().trim() : "default";
        let categoryId = "default";

        if (categoryRaw.match(/web|frontend|backend|fullstack/)) {
          categoryId = "web-dev";
        }
        else if (categoryRaw.match(/machine|learning|ml|deep|neural|nlp/)) { 
          categoryId = "machine-learning";
        }
        else if (categoryRaw.match(/data|ai|science|analytics|python/)) {
          categoryId = "data-ai";
        }
        else if (categoryRaw.match(/creative|design|ui|ux|art/)) {
          categoryId = "creative";
        }
        else if (categoryRaw.match(/tools|devops|cloud|server/)) {
          categoryId = "tools";
        }
        else {
          categoryId = "default"; 
        }

        const config = CATEGORY_CONFIG[categoryId] || CATEGORY_CONFIG["default"];

        if (!groupedData[categoryId]) {
          groupedData[categoryId] = {
            id: categoryId,
            ...config,
            skills: [],
          };
        }

        groupedData[categoryId].skills.push({
          name: item.name,
          iconUrl: getIconUrl(item.name),
        });
      });

      return Object.values(groupedData);
  }, [skills]);


  const handleCategoryChange = (categoryId: string) => {
    if (activeTab === categoryId) return;
    setActiveTab(categoryId);
    setCurrentPage(0);
    setDirection(0);
  };

  const activeCategory = categories.find((cat) => cat.id === activeTab) || categories[0];
  
  if (!activeCategory) return null;

  const ITEMS_PER_PAGE = 8;
  const totalPages = Math.ceil(activeCategory.skills.length / ITEMS_PER_PAGE);
  const currentSkills = activeCategory.skills.slice(
    currentPage * ITEMS_PER_PAGE,
    (currentPage + 1) * ITEMS_PER_PAGE
  );

  const paginate = (newDirection: number) => {
    if (newDirection > 0 && currentPage < totalPages - 1) {
      setDirection(1);
      setCurrentPage((prev) => prev + 1);
    } else if (newDirection < 0 && currentPage > 0) {
      setDirection(-1);
      setCurrentPage((prev) => prev - 1);
    }
  };

  const slideVariants = {
    enter: (direction: number) => ({ x: direction > 0 ? 50 : -50, opacity: 0 }),
    center: { x: 0, opacity: 1 },
    exit: (direction: number) => ({ x: direction > 0 ? -50 : 50, opacity: 0 }),
  };

  return (
    <section className="min-h-screen w-full flex items-center justify-center bg-white relative py-20 px-4 sm:px-6 overflow-hidden">
      
      <motion.div 
        animate={{ 
          background: `linear-gradient(120deg, ${activeCategory.theme.blobColors[0]}, ${activeCategory.theme.blobColors[1]})`,
          y: [0, -20, 0],
          x: [0, 10, 0],
          scale: [1, 1.05, 1],
        }}
        transition={{ duration: 8, repeat: Infinity, repeatType: "reverse", ease: "easeInOut" }}
        className="absolute top-0 right-0 w-[800px] h-[800px] opacity-20 rounded-full blur-[120px] pointer-events-none -translate-y-1/2 translate-x-1/3"
      />
      <div className="absolute inset-0 bg-[linear-gradient(rgba(0,0,0,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(0,0,0,0.02)_1px,transparent_1px)] bg-size-[40px_40px] mask-[radial-gradient(ellipse_at_center,black_40%,transparent_100%)] pointer-events-none"></div>

      <div className="container mx-auto max-w-6xl relative z-10">
        
        <div className="mb-12 text-center lg:text-left">
          <motion.div
             initial={{ opacity: 0, y: 20 }}
             whileInView={{ opacity: 1, y: 0 }}
             viewport={{ once: true }}
             transition={{ duration: 0.6 }}
             className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-100 border border-slate-200 text-slate-500 text-xs font-medium uppercase tracking-wider mb-4"
          >
            <Sparkles size={14} className="text-amber-500" />
            Skills & Tools
          </motion.div>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-3xl lg:text-5xl font-bold text-slate-900 tracking-tight"
          >
            Technical <span className="text-transparent bg-clip-text bg-linear-to-r from-emerald-600 to-teal-500">Expertise</span>
          </motion.h2>
        </div>

        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, margin: "-100px" }} 
          className="hidden lg:grid grid-cols-12 gap-8 bg-white/60 backdrop-blur-xl border border-white/40 rounded-[40px] shadow-2xl shadow-slate-200/50 p-2 overflow-hidden ring-1 ring-slate-100 h-[600px]"
        >
          <div className="col-span-4 bg-white/50 rounded-4xl p-6 border border-slate-100/50 flex flex-col gap-2 overflow-y-auto custom-scrollbar">
            <motion.p variants={itemVariants} className="text-xs font-bold text-slate-400 uppercase tracking-widest px-4 mb-2 mt-2">Categories</motion.p>
            {categories.map((category) => (
              <motion.button
                key={category.id}
                variants={itemVariants}
                onClick={() => handleCategoryChange(category.id)}
                className={`group relative flex items-center gap-4 p-4 rounded-2xl text-left transition-all duration-300 shrink-0 ${
                  activeTab === category.id 
                    ? "bg-white shadow-md shadow-slate-200/50 ring-1 ring-slate-100" 
                    : "hover:bg-white/60 hover:shadow-sm"
                }`}
              >
                <div className={`p-3 rounded-xl transition-colors duration-300 ${
                  activeTab === category.id 
                    ? `${category.theme.bg} ${category.theme.primary}`
                    : "bg-slate-100 text-slate-500 group-hover:bg-slate-200"
                }`}>
                  <category.icon size={20} />
                </div>
                
                <div className="flex-1">
                  <span className={`block font-bold text-sm transition-colors ${
                    activeTab === category.id ? "text-slate-900" : "text-slate-600"
                  }`}>
                    {category.label}
                  </span>
                  {activeTab === category.id && (
                     <motion.span layoutId="navDesc" className="text-[10px] text-slate-400 font-medium line-clamp-1">
                        {category.skills.length} skills available
                     </motion.span>
                  )}
                </div>

                {activeTab === category.id && (
                  <motion.div layoutId="navArrow" className={category.theme.primary}>
                    <ChevronRight size={18} />
                  </motion.div>
                )}
              </motion.button>
            ))}
          </div>

          <div className="col-span-8 p-8 flex flex-col relative">
             <motion.div variants={itemVariants} className="mb-6">
                <h3 className="text-2xl font-bold text-slate-900 mb-2 flex items-center gap-3">
                   {activeCategory.label}
                   <div className={`h-px flex-1 bg-linear-to-r ${activeCategory.theme.gradient} opacity-50`}></div>
                   
                   {totalPages > 1 && (
                     <div className="flex gap-2">
                       <button onClick={() => paginate(-1)} disabled={currentPage === 0} className={`p-2 rounded-full border transition-all ${currentPage === 0 ? "border-slate-100 text-slate-300 cursor-not-allowed" : "border-slate-200 text-slate-600 hover:bg-slate-100 hover:text-slate-900"}`}>
                         <ChevronLeft size={18} />
                       </button>
                       <button onClick={() => paginate(1)} disabled={currentPage === totalPages - 1} className={`p-2 rounded-full border transition-all ${currentPage === totalPages - 1 ? "border-slate-100 text-slate-300 cursor-not-allowed" : "border-slate-200 text-slate-600 hover:bg-slate-100 hover:text-slate-900"}`}>
                         <ChevronRight size={18} />
                       </button>
                     </div>
                   )}
                </h3>
                <p className="text-slate-500 text-lg font-light leading-relaxed max-w-xl">
                  {activeCategory.description}
                </p>
             </motion.div>

             <div className="flex-1 relative">
               <AnimatePresence mode="wait" custom={direction}>
                  <motion.div
                    key={`${activeCategory.id}-${currentPage}`}
                    custom={direction}
                    variants={slideVariants}
                    initial="enter"
                    animate="center"
                    exit="exit"
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                    className="grid grid-cols-4 gap-4 w-full absolute inset-0 content-start"
                  >
                     {currentSkills.map((skill) => (
                        <SkillCard key={skill.name} skill={skill} theme={activeCategory.theme} />
                     ))}
                  </motion.div>
               </AnimatePresence>
             </div>

             {totalPages > 1 && (
               <motion.div variants={itemVariants} className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2">
                 {Array.from({ length: totalPages }).map((_, idx) => (
                   <div 
                     key={idx}
                     className={`h-1.5 rounded-full transition-all duration-300 ${
                       currentPage === idx 
                         ? `w-6 ${activeCategory.theme.bg.replace("bg-", "bg-opacity-100 bg-")}` 
                         : "w-1.5 bg-slate-200"
                     }`}
                     style={{ backgroundColor: currentPage === idx ? activeCategory.theme.blobColors[0] : undefined }}
                   />
                 ))}
               </motion.div>
             )}
          </div>
        </motion.div>

        <div className="lg:hidden flex flex-col gap-4 mt-8">
          {categories.map((category, index) => (
             <MobileAccordionItem 
                key={category.id} 
                category={category} 
                isOpen={activeTab === category.id}
                onClick={() => handleCategoryChange(activeTab === category.id ? "" : category.id)}
                index={index}
             />
          ))}
        </div>

      </div>
      
      <style jsx global>{`
        .custom-scrollbar::-webkit-scrollbar { width: 6px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background-color: #e2e8f0; border-radius: 20px; }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover { background-color: #cbd5e1; }
      `}</style>
    </section>
  );
}

const SkillCard = ({ skill, theme }: { skill: Skill, theme: any }) => {
  const [hasError, setHasError] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3 }}
      className={`group relative flex flex-col items-center justify-center p-6 rounded-2xl bg-white border border-slate-100 shadow-sm transition-all duration-300 hover:shadow-lg hover:-translate-y-1 ${theme.border} h-40`}
    >
      <div className={`absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-linear-to-br ${theme.gradient} rounded-2xl pointer-events-none`} />
      
      <div className="relative z-10 w-12 h-12 mb-4 grayscale group-hover:grayscale-0 transition-all duration-300">
        {!hasError ? (
          <Image src={skill.iconUrl} alt={skill.name} fill className="object-contain drop-shadow-sm" onError={() => setHasError(true)} />
        ) : (
          <div className={`w-full h-full flex items-center justify-center rounded-xl bg-slate-50 text-slate-400 group-hover:${theme.primary} transition-colors`}>
             <Box size={24} strokeWidth={1.5} />
          </div>
        )}
      </div>
      <span className="relative z-10 font-bold text-sm text-center text-slate-700 group-hover:text-slate-900 transition-colors">
        {skill.name}
      </span>
    </motion.div>
  );
};

function MobileAccordionItem({ category, isOpen, onClick, index }: { category: SkillCategory; isOpen: boolean; onClick: () => void; index: number; }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: false }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className={`rounded-3xl border transition-all duration-500 overflow-hidden ${isOpen ? 'bg-white border-white ring-4 ring-slate-100 shadow-xl' : 'bg-white border-slate-100'}`}
    >
      <button onClick={onClick} className="w-full flex items-center justify-between p-5 text-left active:scale-[0.98] transition-transform">
         <div className="flex items-center gap-4">
            <div className={`p-3 rounded-2xl transition-colors ${isOpen ? `${category.theme.bg} ${category.theme.primary}` : 'bg-slate-50 text-slate-400'}`}>
               <category.icon size={22} />
            </div>
            <div>
               <span className={`block font-bold text-lg ${isOpen ? 'text-slate-900' : 'text-slate-600'}`}>{category.label}</span>
               {!isOpen && <span className="text-xs text-slate-400">View skills</span>}
            </div>
         </div>
         <motion.div animate={{ rotate: isOpen ? 90 : 0 }} className={`p-2 rounded-full ${isOpen ? 'bg-slate-100 text-slate-900' : 'text-slate-300'}`}>
           <ChevronRight size={20} />
         </motion.div>
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.3, ease: "easeInOut" }}>
            <div className="p-5 pt-0">
               <div className="w-full h-px bg-slate-100 mb-6" />
               <p className="text-sm text-slate-500 mb-6 leading-relaxed">{category.description}</p>
               <div className="grid grid-cols-2 gap-3">
                  {category.skills.map((skill) => (
                    <div key={skill.name} className="flex items-center gap-3 p-3 bg-slate-50 rounded-xl border border-slate-100">
                       <SkillCardMini skill={skill} />
                    </div>
                  ))}
               </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

const SkillCardMini = ({ skill }: { skill: Skill }) => {
  const [hasError, setHasError] = useState(false);
  return (
    <>
       <div className="relative w-6 h-6 shrink-0">
          {!hasError ? (
            <Image src={skill.iconUrl} alt={skill.name} fill className="object-contain" onError={() => setHasError(true)} />
          ) : (
            <Box size={20} className="text-slate-300" />
          )}
       </div>
       <span className="text-sm font-semibold text-slate-700">{skill.name}</span>
    </>
  );
};