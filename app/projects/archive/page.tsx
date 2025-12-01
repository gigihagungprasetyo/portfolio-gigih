import React from "react";
import { supabase } from "@/lib/supabase";
import ArchiveClient from "@/components/project/ArchiveClient";
import Contact from "@/components/home/Contact";

// Fungsi ambil data di server (tanpa API Route)
async function getProjects() {
  const { data, error } = await supabase
    .from('projects')
    .select('*')
    .order('year', { ascending: false }); // Urut berdasarkan tahun
  
  if (error) {
    console.error('Error fetching archive:', error);
    return [];
  }
  
  return data || [];
}

export default async function ArchivePage() {
  const projects = await getProjects();

  return (
    <main className="min-h-screen bg-slate-50 relative overflow-x-hidden selection:bg-emerald-100 selection:text-emerald-900">
        
        {/* Background Decorations */}
        <div className="fixed inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-size-[24px_24px] pointer-events-none z-0"></div>
        <div className="fixed top-[-10%] right-[-5%] w-[600px] h-[600px] bg-emerald-100/40 rounded-full blur-[100px] pointer-events-none z-0" />
        <div className="fixed bottom-[-10%] left-[-5%] w-[500px] h-[500px] bg-indigo-50/50 rounded-full blur-[100px] pointer-events-none z-0" />

        <div className="relative z-10 container mx-auto px-6 py-20 lg:py-32 max-w-5xl">
            {/* Panggil Client Component dan kirim datanya */}
            <ArchiveClient projects={projects} />
        </div>
        
        <Contact />
    </main>
  );
}