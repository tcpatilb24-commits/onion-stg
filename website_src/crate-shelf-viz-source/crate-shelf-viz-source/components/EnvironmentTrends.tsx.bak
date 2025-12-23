"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { motion } from "framer-motion";

interface DataPoint {
  time: string;
  value: number;
}

interface EnvironmentTrendsProps {
  temperatureData: DataPoint[];
  humidityData: DataPoint[];
  gasData: DataPoint[];
}

/**
 * EnvironmentTrends Component
 * 
 * Displays line/area charts for Temperature, Humidity, and Gas Levels over time.
 * Uses lightweight SVG-based charts to avoid external dependencies.
 */
export default function EnvironmentTrends({
  temperatureData,
  humidityData,
  gasData,
}: EnvironmentTrendsProps) {
  // Helper function to create SVG path for line chart
  const createPath = (data: DataPoint[], width: number, height: number, maxValue: number, minValue: number = 0) => {
    if (data.length === 0) return "";
    if (maxValue === minValue) return `M 0,${height} L ${width},${height}`;
    
    const stepX = width / (data.length - 1 || 1);
    const range = maxValue - minValue || 1;
    const points = data.map((point, index) => {
      const x = index * stepX;
      const normalizedValue = (point.value - minValue) / range;
      const y = height - normalizedValue * height;
      return `${x},${Math.max(0, Math.min(height, y))}`;
    });
    
    return `M ${points.join(" L ")}`;
  };

  // Helper function to create SVG path for area chart
  const createAreaPath = (data: DataPoint[], width: number, height: number, maxValue: number, minValue: number = 0) => {
    if (data.length === 0) return "";
    if (maxValue === minValue) return `M 0,${height} L ${width},${height} L ${width},${height} Z`;
    
    const stepX = width / (data.length - 1 || 1);
    const range = maxValue - minValue || 1;
    const points = data.map((point, index) => {
      const x = index * stepX;
      const normalizedValue = (point.value - minValue) / range;
      const y = height - normalizedValue * height;
      return `${x},${Math.max(0, Math.min(height, y))}`;
    });
    
    const firstX = 0;
    const lastX = width;
    return `M ${firstX},${height} L ${points.join(" L ")} L ${lastX},${height} Z`;
  };

  const chartWidth = 280;
  const chartHeight = 120;
  const tempMax = Math.max(...temperatureData.map(d => d.value), 10);
  const tempMin = Math.min(...temperatureData.map(d => d.value), 0);
  const humidityMax = Math.max(...humidityData.map(d => d.value), 100);
  const humidityMin = Math.min(...humidityData.map(d => d.value), 0);
  const gasMax = Math.max(...gasData.map(d => d.value), 100);
  const gasMin = Math.min(...gasData.map(d => d.value), 0);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.4, duration: 0.6 }}
    >
      <Card className="glass-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            Environment Trends
          </CardTitle>
          <CardDescription>
            Real-time monitoring of environmental conditions over the last 24 hours
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Temperature Chart */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-semibold text-cyan-400">Temperature</h3>
              <span className="text-xs text-muted-foreground">°C</span>
            </div>
            <div className="relative">
              <svg
                width={chartWidth}
                height={chartHeight}
                className="w-full h-auto"
                viewBox={`0 0 ${chartWidth} ${chartHeight}`}
                preserveAspectRatio="none"
              >
                <defs>
                  <linearGradient id="tempGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor="rgba(100, 200, 255, 0.3)" />
                    <stop offset="100%" stopColor="rgba(100, 200, 255, 0.05)" />
                  </linearGradient>
                </defs>
                <path
                  d={createAreaPath(temperatureData, chartWidth, chartHeight, tempMax, tempMin)}
                  fill="url(#tempGradient)"
                />
                <path
                  d={createPath(temperatureData, chartWidth, chartHeight, tempMax, tempMin)}
                  fill="none"
                  stroke="rgb(100, 200, 255)"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
          </div>

          {/* Humidity Chart */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-semibold text-primary">Humidity</h3>
              <span className="text-xs text-muted-foreground">%</span>
            </div>
            <div className="relative">
              <svg
                width={chartWidth}
                height={chartHeight}
                className="w-full h-auto"
                viewBox={`0 0 ${chartWidth} ${chartHeight}`}
                preserveAspectRatio="none"
              >
                <defs>
                  <linearGradient id="humidityGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor="rgba(100, 200, 255, 0.3)" />
                    <stop offset="100%" stopColor="rgba(100, 200, 255, 0.05)" />
                  </linearGradient>
                </defs>
                <path
                  d={createAreaPath(humidityData, chartWidth, chartHeight, humidityMax, humidityMin)}
                  fill="url(#humidityGradient)"
                />
                <path
                  d={createPath(humidityData, chartWidth, chartHeight, humidityMax, humidityMin)}
                  fill="none"
                  stroke="rgb(100, 200, 255)"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
          </div>

          {/* Gas Levels Chart */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-semibold text-green-400">Gas Levels</h3>
              <span className="text-xs text-muted-foreground">Normal</span>
            </div>
            <div className="relative">
              <svg
                width={chartWidth}
                height={chartHeight}
                className="w-full h-auto"
                viewBox={`0 0 ${chartWidth} ${chartHeight}`}
                preserveAspectRatio="none"
              >
                <defs>
                  <linearGradient id="gasGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor="rgba(74, 222, 128, 0.3)" />
                    <stop offset="100%" stopColor="rgba(74, 222, 128, 0.05)" />
                  </linearGradient>
                </defs>
                <path
                  d={createAreaPath(gasData, chartWidth, chartHeight, gasMax, gasMin)}
                  fill="url(#gasGradient)"
                />
                <path
                  d={createPath(gasData, chartWidth, chartHeight, gasMax, gasMin)}
                  fill="none"
                  stroke="rgb(74, 222, 128)"
                  strokeWidth="2"
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

