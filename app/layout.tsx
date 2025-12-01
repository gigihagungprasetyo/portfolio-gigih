import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import Sidebar from "@/components/layout/Sidebar";
import Navbar from "@/components/layout/Navbar";

const fontSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-sans",
  weight: ["400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: "Gigih Agung Prasetyo | Fullstack Developer",
  description: "Portfolio of Gigih Agung Prasetyo, specializing in Laravel & Next.js.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body
        className={`${fontSans.variable} font-sans antialiased bg-white text-slate-900`}
      >
        <Sidebar />
        <Navbar />
        
        {children}
      </body>
    </html>
  );
}
