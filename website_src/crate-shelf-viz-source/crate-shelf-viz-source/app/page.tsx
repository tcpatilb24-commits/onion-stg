"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Activity, Thermometer, Network, AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";

interface BoxItem {
  id: number;
  label: string;
  bullets: string[];
  image: string;
  icon: React.ReactNode;
}

export default function Home() {
  const [activeBox, setActiveBox] = useState<number>(1);

  const boxItems: BoxItem[] = [
    {
      id: 1,
      label: "Current situation in India",
      bullets: [
        "25-30% of onions are wasted annually due to poor storage",
        "Lack of real-time monitoring leads to spoilage",
        "Farmers face significant economic losses",
        "Price volatility affects both producers and consumers"
      ],
      image: "/india_onion_economy.png",
      icon: <Activity className="w-5 h-5" />
    },
    {
      id: 2,
      label: "What makes onions spoil?",
      bullets: [
        "Improper temperature control",
        "Excess moisture and humidity",
        "Poor ventilation in storage",
        "Lack of early spoilage detection"
      ],
      image: "/rotten_onion.png",
      icon: <Thermometer className="w-5 h-5" />
    },
    {
      id: 3,
      label: "Our solution",
      bullets: [
        "Real-time monitoring of storage conditions",
        "Crate-level environmental sensors",
        "3D visualization of storage facility",
        "Early warning system for spoilage"

      ],
      image: "/the_layout.jpg",
      icon: <Network className="w-5 h-5" />
    },
    {
      id: 4,
      label: "What we want to avoid",
      bullets: [
        "Massive food waste",
        "Economic losses for farmers",
        "Price fluctuations in market",
        "Poor quality produce reaching consumers"
      ],
      image: "/rotten_onions_2.png",
      icon: <AlertTriangle className="w-5 h-5" />
    }
  ];

  const activeContent = boxItems.find(item => item.id === activeBox) || boxItems[0];

  return (
    <main className="min-h-screen bg-slate-950 text-slate-100 p-4 md:p-8 font-sans">
      {/* HERO SECTION */}
      <div className="max-w-7xl mx-auto mb-8">
        <div className="text-center mb-12">
          <span className="inline-block px-3 py-1 mb-4 text-xs font-bold tracking-wider text-teal-400 uppercase bg-teal-950/30 rounded-full border border-teal-900">
            Onion Monitoring Hub
          </span>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-b from-white to-slate-400 mb-4">
            Advanced Onion Storage System
          </h1>
          <p className="text-lg text-slate-400 max-w-2xl mx-auto">
            Real-time environmental monitoring and crate-level insights for optimal onion storage.
          </p>
        </div>

        {/* INTERACTIVE 3-COLUMN LAYOUT */}
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.2fr_1.2fr] gap-6 h-[500px]">

          {/* LEFT COLUMN - INTERACTIVE BOXES */}
          <div className="flex flex-col gap-4 h-full">
            {boxItems.map((item) => (
              <motion.div
                key={item.id}
                className={`relative flex-1 group cursor-pointer rounded-xl border transition-all duration-300 overflow-hidden ${activeBox === item.id
                  ? 'bg-slate-900/80 border-teal-500/50 shadow-[0_0_20px_rgba(20,184,166,0.3)]'
                  : 'bg-slate-900/40 border-slate-800 hover:border-teal-500/30 hover:bg-slate-900/60'
                  }`}
                onClick={() => setActiveBox(item.id)}
                onMouseEnter={() => setActiveBox(item.id)}
                whileHover={{ scale: 1.02 }}
              >
                <div className="flex items-center h-full p-6">
                  <div className={`p-3 rounded-lg mr-4 transition-colors ${activeBox === item.id ? 'bg-teal-500/20 text-teal-400' : 'bg-slate-800 text-slate-400'
                    }`}>
                    {item.icon}
                  </div>
                  <span className={`text-lg font-medium transition-colors ${activeBox === item.id ? 'text-teal-400' : 'text-slate-300'
                    }`}>
                    {item.label}
                  </span>
                  {activeBox === item.id && (
                    <motion.div
                      layoutId="activeGlow"
                      className="absolute inset-0 bg-teal-500/5 pointer-events-none"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                    />
                  )}
                </div>
              </motion.div>
            ))}
          </div>

          {/* CENTER COLUMN - DYNAMIC CONTENT */}
          <div className="bg-slate-900/50 border border-slate-800 rounded-xl p-8 h-full flex flex-col justify-center relative overflow-hidden">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeContent.id}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.2 }}
                className="relative z-10"
              >
                <div className="flex items-center mb-6">
                  <div className="p-2 rounded-lg bg-teal-500/10 mr-3 text-teal-400">
                    {activeContent.icon}
                  </div>
                  <h3 className="text-2xl font-bold text-white">
                    {activeContent.label}
                  </h3>
                </div>
                <ul className="space-y-4">
                  {activeContent.bullets.map((bullet, index) => (
                    <motion.li
                      key={index}
                      initial={{ opacity: 0, x: 10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="flex items-start"
                    >
                      <ArrowRight className="w-5 h-5 text-teal-400 mr-3 mt-0.5 flex-shrink-0" />
                      <span className="text-slate-300 text-lg leading-relaxed">{bullet}</span>
                    </motion.li>
                  ))}
                </ul>

                {/* Learn More Link - only show for "Our solution" */}
                {activeContent.id === 3 && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                    className="mt-6"
                  >
                    <Link
                      href="/about#our-solution"
                      className="inline-flex items-center gap-2 text-teal-400 hover:text-teal-300 font-medium transition-colors group"
                    >
                      <span>Click here to learn more about our solution</span>
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </Link>
                  </motion.div>
                )}
              </motion.div>
            </AnimatePresence>

            {/* Background decoration */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-teal-500/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-cyan-500/5 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2 pointer-events-none" />
          </div>

          {/* RIGHT COLUMN - DYNAMIC IMAGE */}
          <div className="relative h-full rounded-xl overflow-hidden border border-slate-800 bg-slate-900">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeContent.id}
                initial={{ opacity: 0, scale: 1.05 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.4 }}
                className="absolute inset-0"
              >
                <Image
                  src={activeContent.image}
                  alt={activeContent.label}
                  fill
                  className="object-cover"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent" />

                {/* Image Overlay Text */}
                <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-slate-950 to-transparent">
                  <p className="text-sm font-medium text-teal-400 uppercase tracking-wider mb-1">Visualizing</p>
                  <p className="text-white font-semibold">{activeContent.label}</p>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>

      {/* CTA SECTION */}
      <div className="max-w-7xl mx-auto text-center mt-16 pb-12">
        <h2 className="text-2xl font-bold text-white mb-6">
          Ready to optimize your onion storage?
        </h2>
        <Link href="/simulation">
          <Button
            size="lg"
            className="rounded-full bg-gradient-to-r from-teal-600 to-cyan-600 hover:from-teal-500 hover:to-cyan-500 text-white border-0 shadow-[0_0_20px_rgba(20,184,166,0.4)] hover:shadow-[0_0_30px_rgba(20,184,166,0.6)] transition-all duration-300 px-8 py-6 text-lg"
          >
            Explore 3D Simulation
          </Button>
        </Link>
      </div>
    </main>
  );
}
