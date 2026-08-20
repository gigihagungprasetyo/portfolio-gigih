"use client";

import React, { useState, useEffect } from "react";
import { Home, User, Briefcase, Send } from "lucide-react";
import { motion } from "framer-motion";
import { usePathname, useRouter } from "next/navigation"; // Import useRouter (tetap diperlukan untuk jaga-jaga)

const navItems = [
  { id: "home", icon: Home, label: "Home" },
  { id: "about", icon: User, label: "About" },
  { id: "projects", icon: Briefcase, label: "Projects" },
  { id: "contact", icon: Send, label: "Connect" },
];

export default function Sidebar() {
  const [activeSection, setActiveSection] = useState("home");
  const pathname = usePathname();
  const router = useRouter(); 

  useEffect(() => {
    // Scroll listener HANYA aktif di halaman root ("/")
    if (pathname !== "/") return;

    // Pastikan ID 'main-container' sesuai dengan elemen yang menangani scroll di layout utama Anda
    const container = document.getElementById("main-container");
    if (!container) return;

    const handleScroll = () => {
      const scrollPosition = container.scrollTop;
      const windowHeight = container.clientHeight;
      const currentIndex = Math.round(scrollPosition / windowHeight);
      const sectionIds = ["home", "about", "projects", "contact"];
      if (sectionIds[currentIndex]) {
        setActiveSection(sectionIds[currentIndex]);
      }
    };

    container.addEventListener("scroll", handleScroll);
    handleScroll();
    return () => container.removeEventListener("scroll", handleScroll);
  }, [pathname]);

  const handleNavigation = (id: string) => {
    // Karena kita tahu Sidebar HANYA ada di homepage, kita hanya perlu logika scroll lokal.
    
    if (id === "home") {
        // Untuk "Home", pastikan scroll ke puncak halaman (posisi 0,0)
        // Ini mengatasi masalah di mana browser berpikir sudah di 'home'
        const container = document.getElementById("main-container");
        if (container) {
            container.scrollTo({ top: 0, behavior: "smooth" });
        } else {
            // Fallback untuk window scroll jika 'main-container' tidak ditemukan
             window.scrollTo({ top: 0, behavior: "smooth" });
        }
    } else {
        // Untuk section lain, gunakan scrollIntoView
        const element = document.getElementById(id);
        if (element) {
            element.scrollIntoView({ behavior: "smooth" });
        }
    }
    // Perbarui state aktif secara manual setelah klik
    setActiveSection(id);
  };

  // KONDISI UTAMA: HANYA TAMPIL JIKA PATHNAME TEPAT SAMA DENGAN "/"
  if (pathname !== "/") {
    return null; 
  }
  
  return (
    <motion.aside
      initial={{ x: -100, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.5, delay: 0.5 }}
      // Sidebar hanya tampil di homepage
      className="hidden lg:flex fixed left-6 top-1/2 -translate-y-1/2 flex-col items-center gap-6 py-6 px-3 bg-white/90 backdrop-blur-xl border border-slate-200 shadow-2xl shadow-slate-200/50 rounded-full z-40"
    >
      <div className="font-bold text-xl text-emerald-600 mb-2">G.</div>

      {navItems.map((item) => {
        // Logika activeSection sudah terjamin hanya berjalan di homepage
        const isActive = activeSection === item.id;

        return (
          <button
            key={item.id}
            onClick={() => handleNavigation(item.id)} // Menggunakan handleNavigation
            className="relative group flex items-center justify-center"
          >
            <div
              className={`p-3 rounded-full transition-all duration-300 ${
                isActive
                  ? "bg-slate-900 text-white shadow-lg scale-110"
                  : "text-slate-400 hover:text-emerald-600 hover:bg-slate-50"
              }`}
            >
              <item.icon size={20} strokeWidth={isActive ? 2.5 : 2} />
            </div>

            <span className="absolute left-14 px-3 py-1.5 bg-slate-900 text-white text-xs font-medium rounded-lg opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 pointer-events-none whitespace-nowrap shadow-xl z-50">
              {item.label}
              <span className="absolute left-0 top-1/2 -translate-x-1 -translate-y-1/2 border-4 border-transparent border-r-slate-900" />
            </span>
          </button>
        );
      })}
    </motion.aside>
  );
}