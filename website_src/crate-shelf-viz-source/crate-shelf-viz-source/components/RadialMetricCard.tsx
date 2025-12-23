"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { motion, Variants } from "framer-motion";
import { LucideIcon } from "lucide-react";

export interface RadialMetricCardData {
  label: string;
  value: number; // Percentage value (0-100)
  displayValue: string; // Formatted display value (e.g., "94%", "4°C")
  status: string;
  icon: LucideIcon;
  color?: string; // Optional custom color (defaults to primary)
}

interface RadialMetricCardProps {
  metric: RadialMetricCardData;
  index?: number;
  variants?: Variants;
}

/**
 * RadialMetricCard Component
 * 
 * Displays a metric with a circular progress ring visualization.
 * Features animated arc that fills from 0 to target value on mount.
 */
export default function RadialMetricCard({ metric, index = 0, variants }: RadialMetricCardProps) {
  const size = 120;
  const strokeWidth = 8;
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const color = metric.color || "rgb(34, 211, 238)"; // Default cyan #22d3ee

  return (
    <motion.div variants={variants}>
      <Card className="glass-card cursor-pointer border border-transparent transition-all duration-300 ease-out hover:-translate-y-[3px] hover:shadow-[0_0_30px_rgba(34,211,238,0.45)] hover:ring-2 hover:ring-cyan-400/60 hover:brightness-110 hover:border-cyan-400/40 hover:scale-[1.015]">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium text-slate-100">{metric.label}</CardTitle>
          <metric.icon className="h-5 w-5 text-cyan-300" />
        </CardHeader>
        <CardContent className="flex flex-col items-center justify-center py-4">
          <div className="relative" style={{ width: size, height: size }}>
            <svg width={size} height={size} className="transform -rotate-90">
              {/* Background circle */}
              <circle
                cx={size / 2}
                cy={size / 2}
                r={radius}
                fill="none"
                stroke="rgba(34, 211, 238, 0.1)"
                strokeWidth={strokeWidth}
              />
              {/* Animated progress arc */}
              <motion.circle
                cx={size / 2}
                cy={size / 2}
                r={radius}
                fill="none"
                stroke={color}
                strokeWidth={strokeWidth}
                strokeLinecap="round"
                strokeDasharray={circumference}
                initial={{ strokeDashoffset: circumference }}
                animate={{
                  strokeDashoffset: circumference - (metric.value / 100) * circumference,
                }}
                transition={{ duration: 1.5, ease: "easeOut" }}
              />
            </svg>
            {/* Center value */}
            <div className="absolute inset-0 flex items-center justify-center">
              <motion.div
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.8 + index * 0.1, duration: 0.5, type: "spring" }}
                className="text-center"
              >
                <div className="text-2xl font-bold text-cyan-400">{metric.displayValue}</div>
              </motion.div>
            </div>
          </div>
          <p className="text-xs text-slate-500 mt-2 text-center">{metric.status}</p>
        </CardContent>
      </Card>
    </motion.div>
  );
}

