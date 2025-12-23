"use client";

import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import { motion } from "framer-motion";
import { useState } from "react";

/**
 * MainLayout Component
 * 
 * This is the main layout wrapper for all pages with industrial warehouse theme.
 * It includes:
 * - Navbar at the top
 * - Sidebar on the left (desktop only)
 * - Main content area in the center with gradient background
 * 
 * This ensures consistent layout across all pages.
 */
export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  return (
    <div className="min-h-screen flex flex-col relative z-10">
      {/* Top Navigation Bar */}
      <Navbar />

      {/* Main Content Area with Sidebar */}
      <div className="flex flex-1">
        {/* Left Sidebar - Hidden on mobile/tablet, shown on desktop */}
        <Sidebar
          collapsed={sidebarCollapsed}
          onToggle={() => setSidebarCollapsed((prev) => !prev)}
        />

        {/* Main Content with fade-in animation */}
        <motion.main
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className={`flex-1 p-4 lg:p-6 relative z-10 transition-all duration-300 ${sidebarCollapsed ? 'lg:ml-20' : 'lg:ml-72'
            }`}
        >
          {children}
        </motion.main>
      </div>
    </div>
  );
}

