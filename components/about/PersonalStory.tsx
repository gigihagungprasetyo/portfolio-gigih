"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Quote, Star, Layers } from "lucide-react";

export default function PersonalStory() {
  return (
    <section className="min-h-screen w-full flex items-center justify-center bg-white relative overflow-hidden p-6 py-8 lg:py-0">
      
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-size-[24px_24px]"></div>
      
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] lg:w-[800px] lg:h-[800px] bg-emerald-50/40 rounded-full blur-[80px] lg:blur-[120px] pointer-events-none" />

      <div className="container mx-auto max-w-6xl relative z-10">
        <div className="grid lg:grid-cols-2 gap-6 lg:gap-20 items-center">
          
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: false, margin: "-50px" }} 
            transition={{ duration: 0.8 }}
            className="relative order-1 lg:order-1 w-full flex justify-center"
          >
            <div className="relative w-full max-w-[180px] sm:max-w-60 lg:max-w-md aspect-4/5 rounded-3xl lg:rounded-[40px] overflow-hidden shadow-2xl shadow-slate-200/50 border-4 border-white group">
               <Image
                 src="/profile-about 2.png"
                 alt="Gigih Agung"
                 fill
                 className="object-cover transition-transform duration-700 group-hover:scale-105"
                 priority
               />
               
               <div className="hidden md:flex absolute bottom-6 left-6 right-6 bg-white/90 backdrop-blur-md p-4 rounded-2xl border border-white/50 shadow-sm items-center justify-between">
                 <div>
                    <p className="text-[10px] font-bold tracking-widest text-emerald-600 uppercase mb-1">Current Status</p>
                    <p className="text-slate-900 font-bold text-sm">Open for Opportunities</p>
                 </div>
                 <div className="relative flex h-3 w-3">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
                 </div>
               </div>
            </div>

            <div className="absolute inset-0 border-2 border-emerald-500/10 rounded-3xl lg:rounded-[40px] translate-x-3 translate-y-3 lg:translate-x-4 lg:translate-y-4 -z-10 max-w-[180px] sm:max-w-60 lg:max-w-md mx-auto" />
          </motion.div>
          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: false, margin: "-50px" }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="space-y-4 lg:space-y-8 order-2 lg:order-2 text-center lg:text-left"
          >
            <div className="space-y-2 lg:space-y-4">
              <Quote className="text-emerald-500 w-6 h-6 lg:w-10 lg:h-10 mx-auto lg:mx-0 opacity-80" />
              <h2 className="text-xl sm:text-3xl lg:text-5xl font-bold text-slate-900 leading-tight tracking-tight">
                Bridging logic with <br className="hidden lg:block" />
                <span className="text-transparent bg-clip-text bg-linear-to-r from-emerald-600 to-teal-500">
                  creative solutions.
                </span>
              </h2>
            </div>

            <div className="space-y-4 text-sm sm:text-base lg:text-lg text-slate-600 leading-relaxed font-light">
              <p>
                I am a Computer Science graduate (GPA 3.79) with a strong focus on <strong>Software Engineering</strong> and <strong>Data Science</strong>. My journey is built on hands-on experience—from guiding students as a Laboratory Assistant to managing sensitive election data at KPU Kota Batu.
              </p>
              
              <p className="hidden md:block">
                Currently, I am expanding my expertise through rigorous training to stay ahead of the curve. I am ready to build systems that are robust in the <strong>Backend</strong> yet intuitive in the <strong>Frontend</strong>.
              </p>
            </div>

            <div className="pt-4 lg:pt-6 border-t border-slate-100 flex items-center justify-center lg:justify-start">
               <div className="flex gap-8 lg:gap-12">
                  <div className="text-center sm:text-left">
                     <div className="flex items-center justify-center sm:justify-start gap-2 text-slate-900 font-bold text-base lg:text-xl">
                        <Star size={16} className="text-yellow-400 fill-yellow-400" /> 3.79
                     </div>
                     <p className="text-[10px] lg:text-xs text-slate-400 uppercase tracking-wider mt-0.5 lg:mt-1">GPA Score</p>
                  </div>
                  <div className="text-center sm:text-left">
                     <div className="flex items-center justify-center sm:justify-start gap-2 text-slate-900 font-bold text-base lg:text-xl">
                        <Layers size={16} className="text-blue-500" /> 10+
                     </div>
                     <p className="text-[10px] lg:text-xs text-slate-400 uppercase tracking-wider mt-0.5 lg:mt-1">Projects</p>
                  </div>
               </div>

            </div>

          </motion.div>

        </div>
      </div>
    </section>
  );
}