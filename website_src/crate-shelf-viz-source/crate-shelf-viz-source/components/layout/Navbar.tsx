"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, LayoutDashboard, Box, Info } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

/**
 * Navbar Component
 * 
 * Premium industrial dashboard navbar with:
 * - Glassmorphism effect
 * - Smooth hover animations
 * - Active state indicators with neon glow
 * - Icon animations on hover
 */
export default function Navbar() {
  const pathname = usePathname();

  // Navigation items with their paths and icons
  const navItems = [
    { href: "/", label: "Home", icon: Home },
    { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
    { href: "/simulation", label: "Simulation", icon: Box },
    { href: "/about", label: "About", icon: Info },
  ];

  return (
    <motion.nav
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="sticky top-0 z-50 w-full border-b border-[rgba(148,163,184,0.25)] bg-[#020617]/95 backdrop-blur-md"
    >
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          {/* Logo/Brand with hover animation */}
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Link
              href="/"
              className="flex items-center gap-2 rounded-full border border-transparent px-4 py-1 transition-all duration-300 ease-out hover:-translate-y-[3px] hover:brightness-110 hover:scale-[1.015] hover:shadow-[0_0_30px_rgba(34,211,238,0.45)] hover:shadow-[0_0_35px_rgba(34,211,238,0.55)] hover:ring-2 hover:ring-cyan-400/60 hover:border-cyan-400/40 hover:bg-slate-800/80"
            >
              <motion.div
                animate={{ rotate: [0, 5, -5, 0] }}
                transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
              >
                <Box className="h-6 w-6 text-primary" />
              </motion.div>
              <span className="bg-gradient-to-r from-[#22d3ee] via-[#22c55e] to-[#a855f7] bg-clip-text text-transparent font-extrabold tracking-tight text-2xl">
                Smart Onion Storage
              </span>
            </Link>
          </motion.div>

          {/* Navigation Links - Hidden on mobile, shown on desktop */}
          <div className="hidden md:flex items-center gap-2">
            {navItems.map((item, index) => {
              const Icon = item.icon;
              const isActive = pathname === item.href;
              
              return (
                <motion.div
                  key={item.href}
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1, duration: 0.3 }}
                >
                  <Link href={item.href}>
                    <motion.div
                      whileHover={{ scale: 1.05, y: -2 }}
                      whileTap={{ scale: 0.95 }}
                      transition={{ duration: 0.2, ease: "easeOut" }}
                    >
                      <Button
                        variant={isActive ? "default" : "ghost"}
                        className={cn(
                          "gap-2 rounded-full px-5",
                          isActive
                            ? "bg-gradient-to-r from-[#22d3ee] to-[#22c55e] text-slate-950 font-semibold"
                            : "text-slate-300 hover:text-slate-100"
                        )}
                      >
                        <motion.div
                          animate={isActive ? { rotate: [0, 10, -10, 0] } : {}}
                          transition={{ duration: 0.5, repeat: isActive ? Infinity : 0, repeatDelay: 2 }}
                        >
                          <Icon className="h-4 w-4" />
                        </motion.div>
                        {item.label}
                      </Button>
                    </motion.div>
                  </Link>
                </motion.div>
              );
            })}
          </div>

          {/* Mobile Menu Button - Shown on mobile, hidden on desktop */}
          <div className="md:hidden">
            <motion.div
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <Button
                variant="ghost"
                size="icon"
                className="text-slate-300 hover:text-slate-100 rounded-full"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              </Button>
            </motion.div>
          </div>
        </div>
      </div>
    </motion.nav>
  );
}

