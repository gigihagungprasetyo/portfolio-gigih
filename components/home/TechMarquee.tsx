"use client";

import React from "react";
import { motion } from "framer-motion";
import { Code2, Database, Server, Globe, Cpu, Layers, Box, Terminal } from "lucide-react";

const skills = [
  { name: "Laravel 12", icon: Database },
  { name: "Next.js 15", icon: Globe },
  { name: "React", icon: Code2 },
  { name: "Tailwind CSS", icon: Layers },
  { name: "TypeScript", icon: Code2 },
  { name: "MySQL", icon: Server },
  { name: "Docker", icon: Box },
  { name: "Git", icon: Terminal },
];

export default function TechMarquee() {
  return (
    <div className="w-full bg-white border-y border-slate-100 py-6 overflow-hidden flex relative z-20">
      <div className="absolute top-0 left-0 w-20 h-full bg-linear-to-r from-white to-transparent z-10" />
      <div className="absolute top-0 right-0 w-20 h-full bg-linear-to-l from-white to-transparent z-10" />

      <motion.div
        className="flex gap-12 items-center whitespace-nowrap"
        animate={{ x: [0, -1000] }} // Geser ke kiri
        transition={{
          ease: "linear",
          duration: 20,
          repeat: Infinity,
        }}
      >
        {[...skills, ...skills, ...skills].map((skill, index) => (
          <div key={index} className="flex items-center gap-3 group cursor-default">
            <skill.icon 
              size={24} 
              className="text-slate-300 group-hover:text-emerald-500 transition-colors duration-300" 
            />
            <span className="text-xl font-bold text-slate-300 group-hover:text-slate-800 transition-colors duration-300">
              {skill.name}
            </span>
          </div>
        ))}
      </motion.div>
    </div>
  );
}