"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, LayoutDashboard, Box, Info, ChevronLeft, ChevronRight, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

/**
 * Redesigned Sidebar Component
 * 
 * Compact box-based navigation with unified color scheme and smooth animations
 */
export default function Sidebar({
  collapsed = false,
  onToggle,
}: {
  collapsed?: boolean;
  onToggle?: () => void;
}) {
  const pathname = usePathname();

  // Navigation items - unified teal theme
  const navItems = [
    { href: "/", label: "Home", icon: Home },
    { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
    { href: "/simulation", label: "Simulation", icon: Box },
    { href: "/about", label: "About", icon: Info },
  ];

  // Animation variants
  const sidebarVariants = {
    hidden: { x: -100, opacity: 0 },
    visible: {
      x: 0,
      opacity: 1,
      transition: {
        type: "spring" as const,
        stiffness: 100,
        damping: 15,
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
      },
    },
  };

  const itemVariants = {
    hidden: { x: -20, opacity: 0 },
    visible: {
      x: 0,
      opacity: 1,
      transition: {
        type: "spring" as const,
        stiffness: 100,
      },
    },
  };

  const logoVariants = {
    hidden: { scale: 0.8, opacity: 0 },
    visible: {
      scale: 1,
      opacity: 1,
      transition: {
        type: "spring" as const,
        stiffness: 150,
        delay: 0.1,
      },
    },
  };

  const decorativeVariants = {
    hidden: { scale: 0, opacity: 0, rotate: -180 },
    visible: {
      scale: 1,
      opacity: 1,
      rotate: 0,
      transition: {
        type: "spring" as const,
        stiffness: 80,
        delay: 0.6,
      },
    },
  };

  return (
    <motion.aside
      initial="hidden"
      animate={{
        x: 0,
        opacity: 1,
        width: collapsed ? 96 : 256,
      }}
      variants={sidebarVariants}
      className={cn(
        "hidden lg:flex flex-col fixed top-16 left-0 h-[calc(100vh-4rem)] border-r border-slate-800/50 bg-gradient-to-b from-slate-900 to-slate-950 p-5 overflow-hidden z-40"
      )}
      transition={{
        x: {
          type: "spring" as const,
          stiffness: 100,
          damping: 15,
        },
        opacity: {
          duration: 0.5,
        },
        width: {
          type: "spring" as const,
          stiffness: 200,
          damping: 25,
        },
      }}
    >
      {/* Background gradient */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: collapsed ? 0.5 : 1 }}
        transition={{ duration: 0.4 }}
        className="absolute inset-0 bg-gradient-to-br from-teal-500/5 to-cyan-500/5 pointer-events-none"
      />

      {/* Collapse Button */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="flex items-center justify-end mb-6 relative z-10"
      >
        <motion.button
          type="button"
          onClick={onToggle}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          className="inline-flex items-center justify-center h-9 w-9 rounded-lg border border-slate-700/50 bg-slate-800/80 text-slate-300 hover:border-teal-500/50 hover:text-teal-400 transition-all duration-300 shadow-md"
        >
          <motion.div
            key={collapsed ? "right" : "left"}
            initial={{ rotate: 90, opacity: 0 }}
            animate={{ rotate: 0, opacity: 1 }}
            exit={{ rotate: -90, opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            {collapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
          </motion.div>
        </motion.button>
      </motion.div>

      {/* Logo */}
      <AnimatePresence mode="wait">
        {!collapsed && (
          <motion.div
            key="logo"
            initial={{ opacity: 0, height: 0, scale: 0.8 }}
            animate={{ opacity: 1, height: "auto", scale: 1 }}
            exit={{
              opacity: 0,
              height: 0,
              scale: 0.8,
              transition: { duration: 0.2 }
            }}
            transition={{
              type: "spring" as const,
              stiffness: 200,
              damping: 20,
            }}
            className="mb-6 relative z-10 overflow-hidden"
          >
            <div className="flex items-center gap-2.5">
              <motion.div
                whileHover={{ rotate: 360, scale: 1.1 }}
                transition={{ duration: 0.6 }}
                className="w-9 h-9 rounded-lg bg-gradient-to-br from-teal-400 to-cyan-500 flex items-center justify-center shadow-lg"
              >
                <Sparkles className="h-5 w-5 text-white" />
              </motion.div>
              <motion.div
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ x: -20, opacity: 0 }}
                transition={{
                  type: "spring" as const,
                  stiffness: 200,
                  damping: 20,
                }}
              >
                <h3 className="text-sm font-bold text-white">GROUNDZERO</h3>
                <p className="text-xs text-slate-400">SIH 2024</p>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Navigation Boxes - Smaller and uniform color */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className={cn(
          "flex-1 relative z-10",
          collapsed ? "space-y-5" : "space-y-5"
        )}
      >
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.href;

          return (
            <motion.div key={item.href} variants={itemVariants}>
              <Link href={item.href}>
                <motion.div
                  className="relative group"
                  whileHover={{ x: 4 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  {/* Glow effect on active - unified teal color */}
                  {isActive && (
                    <div
                      className="absolute -inset-0.5 rounded-xl bg-gradient-to-r from-teal-500 to-cyan-500 blur animate-pulse"
                      style={{ animationDuration: '3s' }}
                    />
                  )}

                  {/* Hover glow effect */}
                  <div className="absolute -inset-0.5 rounded-xl bg-gradient-to-r from-purple-400/0 to-violet-400/0 group-hover:from-purple-400/40 group-hover:to-violet-400/40 blur transition-all duration-300" />

                  {/* Compact Box */}
                  <div
                    className={cn(
                      "relative rounded-xl border-2 transition-all duration-300",
                      collapsed ? "p-3" : "p-3.5",
                      isActive
                        ? "bg-slate-800/90 border-slate-700 shadow-lg shadow-teal-500/10"
                        : "bg-slate-800/50 border-slate-700/50 hover:bg-slate-800/90 hover:border-purple-500/60 hover:shadow-xl hover:shadow-purple-500/20",
                      "group-hover:scale-[1.03]",
                      collapsed ? "" : "group-hover:translate-x-1"
                    )}
                  >
                    <div className={cn("flex items-center", collapsed ? "justify-center" : "gap-3")}>
                      {/* Icon - better sizing when collapsed */}
                      <div className={cn(
                        "relative flex items-center justify-center rounded-lg transition-all duration-300",
                        collapsed ? "w-10 h-10" : "w-9 h-9",
                        isActive
                          ? "bg-gradient-to-br from-teal-500 to-cyan-500 shadow-md shadow-teal-500/30"
                          : "bg-slate-700/50 group-hover:bg-slate-700"
                      )}>
                        <Icon
                          className={cn(
                            "transition-all",
                            collapsed ? "h-5 w-5" : "h-5 w-5",
                            isActive ? "text-white" : "text-slate-300"
                          )}
                        />

                        {/* Dot indicator - teal color */}
                        {isActive && !collapsed && (
                          <div className="absolute -top-0.5 -right-0.5">
                            <div className="w-2 h-2 rounded-full bg-teal-400 animate-pulse shadow-lg shadow-teal-400/50"
                              style={{ animationDuration: '2s' }}
                            />
                          </div>
                        )}
                      </div>

                      {/* Label with tooltip on hover when collapsed */}
                      <AnimatePresence>
                        {!collapsed && (
                          <motion.span
                            key={`label-${item.href}`}
                            initial={{ opacity: 0, width: 0 }}
                            animate={{ opacity: 1, width: "auto" }}
                            exit={{ opacity: 0, width: 0 }}
                            transition={{ duration: 0.2 }}
                            className={cn(
                              "font-medium text-sm whitespace-nowrap",
                              isActive ? "text-white" : "text-slate-300"
                            )}
                          >
                            {item.label}
                          </motion.span>
                        )}
                      </AnimatePresence>

                      {/* Tooltip for collapsed state */}
                      {collapsed && (
                        <div className="absolute left-full ml-2 px-3 py-1.5 bg-slate-800 border border-slate-700 rounded-lg opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity duration-200 whitespace-nowrap z-50 shadow-lg">
                          <span className="text-sm text-slate-200">{item.label}</span>
                        </div>
                      )}
                    </div>

                    {/* Bottom accent - unified teal */}
                    {isActive && (
                      <div
                        className="absolute bottom-0 left-0 right-0 h-0.5 rounded-b-xl bg-gradient-to-r from-teal-500 to-cyan-500 animate-pulse"
                        style={{ animationDuration: '2s' }}
                      />
                    )}
                  </div>
                </motion.div>
              </Link>
            </motion.div>
          );
        })}
      </motion.div>

      {/* Decorative Image Section */}
      <AnimatePresence>
        {!collapsed && (
          <motion.div
            key="decorative"
            initial={{ scale: 0, opacity: 0, rotate: -180 }}
            animate={{
              scale: 1,
              opacity: 1,
              rotate: 0,
            }}
            exit={{
              scale: 0,
              opacity: 0,
              rotate: 180,
              transition: { duration: 0.3, ease: "easeInOut" }
            }}
            transition={{
              type: "spring" as const,
              stiffness: 150,
              damping: 20,
              delay: 0.1,
            }}
            className="pt-6 flex justify-center"
          >
            <div className="relative group cursor-pointer">
              {/* Glow effect */}
              <motion.div
                animate={{
                  scale: [1, 1.1, 1],
                  opacity: [0.4, 0.6, 0.4]
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
                className="absolute -inset-3 bg-gradient-to-r from-teal-400/20 to-cyan-400/20 rounded-full blur-xl"
              />

              {/* Image Container */}
              <motion.div
                whileHover={{ scale: 1.1, rotate: 5 }}
                transition={{ type: "spring", stiffness: 200 }}
                className="relative w-32 h-32 rounded-full overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-teal-400 to-cyan-500 rounded-full p-0.5">
                  <div className="w-full h-full bg-slate-900 rounded-full p-2">
                    <div className="relative w-full h-full rounded-full border-2 border-teal-400/40 overflow-hidden bg-slate-800/50">
                      {/* Group Logo Image */}
                      <Image
                        src="/grpofono.jpg"
                        alt="Group Logo"
                        width={120}
                        height={120}
                        className="object-cover w-full h-full"
                      />
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.aside>
  );
}
