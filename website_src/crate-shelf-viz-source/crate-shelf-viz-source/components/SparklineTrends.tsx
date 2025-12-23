"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { motion } from "framer-motion";

interface DataPoint {
  time: string;
  value: number;
}

interface SparklineTrendsProps {
  temperatureData: DataPoint[];
  humidityData: DataPoint[];
  gasData: DataPoint[];
}

/**
 * SparklineTrends Component
 * 
 * Displays compact sparkline-style charts for environment trends.
 * Shows Temperature, Humidity, and Gas Levels over the last 24 hours.
 */
export default function SparklineTrends({
  temperatureData,
  humidityData,
  gasData,
}: SparklineTrendsProps) {
  // Helper function to create SVG path for sparkline
  const createSparklinePath = (data: DataPoint[], width: number, height: number) => {
    if (data.length === 0) return "";
    
    const maxValue = Math.max(...data.map(d => d.value));
    const minValue = Math.min(...data.map(d => d.value));
    const range = maxValue - minValue || 1;
    const padding = 4;
    const chartWidth = width - padding * 2;
    const chartHeight = height - padding * 2;
    
    const stepX = chartWidth / (data.length - 1 || 1);
    const points = data.map((point, index) => {
      const x = padding + index * stepX;
      const normalizedValue = (point.value - minValue) / range;
      const y = padding + chartHeight - normalizedValue * chartHeight;
      return `${x},${y}`;
    });
    
    return `M ${points.join(" L ")}`;
  };

  const sparklineWidth = 200;
  const sparklineHeight = 40;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.5, duration: 0.6 }}
    >
      <Card className="glass-card">
        <CardHeader>
          <CardTitle>Environment Trends</CardTitle>
          <CardDescription>
            Real-time monitoring over the last 24 hours
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Temperature Sparkline */}
          <div className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-2 min-w-[100px]">
              <span className="text-sm font-medium text-cyan-400">Temperature</span>
              <span className="text-xs text-muted-foreground">
                {temperatureData.length > 0 
                  ? `${temperatureData[temperatureData.length - 1].value.toFixed(1)}°C`
                  : "N/A"}
              </span>
            </div>
            <div className="flex-1">
              <svg
                width={sparklineWidth}
                height={sparklineHeight}
                className="w-full h-auto"
                viewBox={`0 0 ${sparklineWidth} ${sparklineHeight}`}
                preserveAspectRatio="none"
              >
                <path
                  d={createSparklinePath(temperatureData, sparklineWidth, sparklineHeight)}
                  fill="none"
                  stroke="rgb(100, 200, 255)"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
          </div>

          {/* Humidity Sparkline */}
          <div className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-2 min-w-[100px]">
              <span className="text-sm font-medium text-primary">Humidity</span>
              <span className="text-xs text-muted-foreground">
                {humidityData.length > 0 
                  ? `${humidityData[humidityData.length - 1].value.toFixed(0)}%`
                  : "N/A"}
              </span>
            </div>
            <div className="flex-1">
              <svg
                width={sparklineWidth}
                height={sparklineHeight}
                className="w-full h-auto"
                viewBox={`0 0 ${sparklineWidth} ${sparklineHeight}`}
                preserveAspectRatio="none"
              >
                <path
                  d={createSparklinePath(humidityData, sparklineWidth, sparklineHeight)}
                  fill="none"
                  stroke="rgb(100, 200, 255)"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
          </div>

          {/* Gas Levels Sparkline */}
          <div className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-2 min-w-[100px]">
              <span className="text-sm font-medium text-green-400">Gas Levels</span>
              <span className="text-xs text-muted-foreground">
                {gasData.length > 0 
                  ? `${gasData[gasData.length - 1].value.toFixed(1)}`
                  : "N/A"}
              </span>
            </div>
            <div className="flex-1">
              <svg
                width={sparklineWidth}
                height={sparklineHeight}
                className="w-full h-auto"
                viewBox={`0 0 ${sparklineWidth} ${sparklineHeight}`}
                preserveAspectRatio="none"
              >
                <path
                  d={createSparklinePath(gasData, sparklineWidth, sparklineHeight)}
                  fill="none"
                  stroke="rgb(74, 222, 128)"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}

