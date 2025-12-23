"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { motion, Variants } from "framer-motion";
import { LucideIcon } from "lucide-react";

export interface MetricCardData {
  label: string;
  value: string;
  status: string;
  icon: LucideIcon;
}

interface MetricCardProps {
  metric: MetricCardData;
  index?: number;
  variants?: Variants;
}

/**
 * MetricCard Component
 * 
 * Reusable card component for displaying environment metrics.
 * Features hover animations and consistent styling with the industrial theme.
 */
export default function MetricCard({ metric, index = 0, variants }: MetricCardProps) {
  return (
    <motion.div variants={variants}>
      <Card className="glass-card cursor-pointer border border-transparent transition-all duration-300 ease-out hover:-translate-y-[3px] hover:shadow-[0_0_30px_rgba(34,211,238,0.45)] hover:ring-2 hover:ring-cyan-400/60 hover:brightness-110 hover:border-cyan-400/40 hover:scale-[1.015]">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium text-slate-100">{metric.label}</CardTitle>
          <metric.icon className="h-5 w-5 text-cyan-300" />
        </CardHeader>
        <CardContent>
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.8 + index * 0.1, duration: 0.5, type: "spring" }}
            className="text-2xl font-bold text-cyan-400"
          >
            {metric.value}
          </motion.div>
          <p className="text-xs text-slate-500 mt-1">{metric.status}</p>
        </CardContent>
      </Card>
    </motion.div>
  );
}

