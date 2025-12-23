"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Activity, Thermometer, Network } from "lucide-react";
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
      icon: <Activity className="w-5 h-5 text-teal-400" />
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
      icon: <Thermometer className="w-5 h-5 text-amber-400" />
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
      image: "/kanda.png",
      icon: <Network className="w-5 h-5 text-blue-400" />
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
      icon: <div className="w-5 h-5 text-red-400">!</div>
    }
  ];

  const activeContent = boxItems.find(item => item.id === activeBox) || boxItems[0];

  return (
    <main className="min-h-screen bg-slate-950 text-slate-100 p-4 md:p-8 font-sans">
      {/* HERO SECTION */}
      <div className="max-w-7xl mx-auto mb-12">
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
        <div className="grid grid-cols-1 lg:grid-cols-[0.9fr_1.4fr_1.1fr] gap-6">
          {/* LEFT COLUMN - INTERACTIVE BOXES */}
          <div className="space-y-4">
            {boxItems.map((item) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: item.id * 0.1 }}
                className={`relative group cursor-pointer ${
                  activeBox === item.id ? 'ring-2 ring-teal-500/50' : ''
                }`}
                onClick={() => setActiveBox(item.id)}
                onMouseEnter={() => setActiveBox(item.id)}
              >
                <div className={`
                  bg-slate-900/80 border p-4 rounded-xl transition-all duration-300
                  ${activeBox === item.id 
                    ? 'border-teal-500/50 shadow-[0_0_20px_rgba(20,184,166,0.3)]' 
                    : 'border-slate-800 hover:border-teal-500/30'
                  }
                `}>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className={`p-2 rounded-lg ${
                        activeBox === item.id 
                          ? 'bg-teal-500/10' 
                          : 'bg-slate-800/50'
                      }`}>
                        {item.icon}
                      </div>
                      <span className={`font-medium ${
                        activeBox === item.id ? 'text-teal-400' : 'text-slate-200'
                      }`}>
                        {item.label}
                      </span>
                    </div>
                    <ArrowRight className={`w-4 h-4 transition-colors ${
                      activeBox === item.id ? 'text-teal-400' : 'text-slate-500 opacity-0 group-hover:opacity-100'
                    }`} />
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* CENTER COLUMN - BULLET POINTS */}
          <div className="bg-slate-900/50 border border-slate-800 rounded-xl p-6">
            <h3 className="text-xl font-semibold text-white mb-4 flex items-center">
              <div className="p-2 rounded-lg bg-teal-500/10 mr-3">
                {activeContent.icon}
              </div>
              {activeContent.label}
            </h3>
            <ul className="space-y-3">
              {activeContent.bullets.map((bullet, index) => (
                <motion.li 
                  key={index}
                  initial={{ opacity: 0, x: 10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="flex items-start"
                >
                  <span className="text-teal-400 mr-2 mt-1">•</span>
                  <span className="text-slate-300">{bullet}</span>
                </motion.li>
              ))}
            </ul>
          </div>

          {/* RIGHT COLUMN - IMAGE */}
          <motion.div
            key={activeContent.id}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3 }}
            className="relative h-full min-h-[300px] rounded-xl overflow-hidden border border-slate-800"
          >
            <Image
              src={activeContent.image}
              alt={activeContent.label}
              fill
              className="object-cover"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent" />
          </motion.div>
        </div>
      </div>

      {/* CTA SECTION */}
      <div className="max-w-7xl mx-auto text-center mt-16">
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
