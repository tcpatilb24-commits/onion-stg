"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useState, useEffect } from "react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area } from 'recharts';
import { Activity, Droplets, Wind, AlertCircle, Thermometer } from "lucide-react";

// Mock data generator
const generateData = (points: number, min: number, max: number) => {
  return Array.from({ length: points }, (_, i) => ({
    time: i,
    value: min + Math.random() * (max - min)
  }));
};

const RANGES = {
  humidity: { healthy: [45, 55], rottingStart: [56, 70], rotted: [71, 100] },
  so2: { healthy: [0, 0.08], rottingStart: [0.10, 0.30], rotted: [0.33, 1] },
  h2s: { healthy: [0, 0.05], rottingStart: [0.06, 0.10], rotted: [0.11, 2] },
  ammonia: { healthy: [0, 0.20], rottingStart: [0.25, 0.40], rotted: [0.46, 5] },
  temperature: { healthy: [0, 20], rottingStart: [21, 35], rotted: [36, 50] },
};

const getStatus = (value: number, type: 'humidity' | 'so2' | 'h2s' | 'ammonia' | 'temperature') => {
  const range = RANGES[type];
  // Simple threshold logic based on the continuous nature of the data
  if (type === 'humidity') {
    if (value > 70) return { status: 'Rotted Emission', color: 'text-red-500', bg: 'bg-red-500/10', border: 'border-red-500/50' };
    if (value > 55) return { status: 'Rotting Start Time Emission', color: 'text-yellow-500', bg: 'bg-yellow-500/10', border: 'border-yellow-500/50' };
    return { status: 'Healthy Emission', color: 'text-green-500', bg: 'bg-green-500/10', border: 'border-green-500/50' };
  } else if (type === 'so2') {
    if (value > 0.30) return { status: 'Rotted Emission', color: 'text-red-500', bg: 'bg-red-500/10', border: 'border-red-500/50' };
    if (value > 0.08) return { status: 'Rotting Start Time Emission', color: 'text-yellow-500', bg: 'bg-yellow-500/10', border: 'border-yellow-500/50' };
    return { status: 'Healthy Emission', color: 'text-green-500', bg: 'bg-green-500/10', border: 'border-green-500/50' };
  } else if (type === 'h2s') {
    if (value > 0.10) return { status: 'Rotted Emission', color: 'text-red-500', bg: 'bg-red-500/10', border: 'border-red-500/50' };
    if (value > 0.05) return { status: 'Rotting Start Time Emission', color: 'text-yellow-500', bg: 'bg-yellow-500/10', border: 'border-yellow-500/50' };
    return { status: 'Healthy Emission', color: 'text-green-500', bg: 'bg-green-500/10', border: 'border-green-500/50' };
  } else if (type === 'ammonia') {
    if (value > 0.40) return { status: 'Rotted Emission', color: 'text-red-500', bg: 'bg-red-500/10', border: 'border-red-500/50' };
    if (value > 0.20) return { status: 'Rotting Start Time Emission', color: 'text-yellow-500', bg: 'bg-yellow-500/10', border: 'border-yellow-500/50' };
    return { status: 'Healthy Emission', color: 'text-green-500', bg: 'bg-green-500/10', border: 'border-green-500/50' };
  } else if (type === 'temperature') {
    if (value > 35) return { status: 'Rotted Emission', color: 'text-red-500', bg: 'bg-red-500/10', border: 'border-red-500/50' };
    if (value > 20) return { status: 'Rotting Start Time Emission', color: 'text-yellow-500', bg: 'bg-yellow-500/10', border: 'border-yellow-500/50' };
    return { status: 'Healthy Emission', color: 'text-green-500', bg: 'bg-green-500/10', border: 'border-green-500/50' };
  }
  return { status: 'Unknown', color: 'text-slate-500', bg: 'bg-slate-500/10', border: 'border-slate-500/50' };
};

const simulateNextValue = (current: number, type: keyof typeof RANGES, globalState: number) => {
  // globalState: 0 = healthy, 0.5 = rotting start, 1 = rotted
  // If type is humidity, keep independent logic (random fluctuation)
  if (type === 'humidity') {
    const r = Math.random();
    let targetMin, targetMax;
    if (r < 0.8) [targetMin, targetMax] = RANGES.humidity.healthy;
    else if (r < 0.95) [targetMin, targetMax] = RANGES.humidity.rottingStart;
    else[targetMin, targetMax] = RANGES.humidity.rotted;

    const target = targetMin + Math.random() * (targetMax - targetMin);
    return current + (target - current) * 0.1;
  }

  // Correlated logic for gases and temperature
  const range = RANGES[type];
  let targetMin, targetMax;

  if (globalState < 0.3) {
    // 80% healthy
    [targetMin, targetMax] = range.healthy;
  } else if (globalState < 0.7) {
    // Transition/Early Rot
    [targetMin, targetMax] = range.rottingStart;
  } else {
    // Rotted
    [targetMin, targetMax] = range.rotted;
  }

  // Add some randomness so they aren't identical relative positions
  const drift = (Math.random() - 0.5) * (targetMax - targetMin) * 0.2;
  const target = targetMin + (Math.random() * (targetMax - targetMin)) + drift;

  // Clamp target
  const clampedTarget = Math.max(targetMin, Math.min(targetMax, target));
  return current + (clampedTarget - current) * 0.1;
};

export default function Dashboard() {
  const [humidityData, setHumidityData] = useState(generateData(20, 45, 55));
  const [so2Data, setSo2Data] = useState(generateData(20, 0, 0.08));
  const [h2sData, setH2sData] = useState(generateData(20, 0, 0.05));
  const [ammoniaData, setAmmoniaData] = useState(generateData(20, 0, 0.20));
  const [temperatureData, setTemperatureData] = useState(generateData(20, 0, 20));

  // Global system state for correlation (0 = healthy, 1 = rotted)
  const [systemState, setSystemState] = useState(0);

  // Simulate live data updates every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      // Randomly drift system state
      let newState = systemState;
      const r = Math.random();
      if (r < 0.1) {
        // Occasional spike
        newState = Math.min(1, systemState + 0.3);
      } else if (r > 0.9) {
        // Recovery
        newState = Math.max(0, systemState - 0.2);
      } else {
        // Tend towards healthy (0)
        newState = Math.max(0, systemState - 0.05);
      }
      setSystemState(newState);

      setHumidityData(prev => [...prev.slice(1), { time: prev[prev.length - 1].time + 1, value: simulateNextValue(prev[prev.length - 1].value, 'humidity', newState) }]);
      setSo2Data(prev => [...prev.slice(1), { time: prev[prev.length - 1].time + 1, value: simulateNextValue(prev[prev.length - 1].value, 'so2', newState) }]);
      setH2sData(prev => [...prev.slice(1), { time: prev[prev.length - 1].time + 1, value: simulateNextValue(prev[prev.length - 1].value, 'h2s', newState) }]);
      setAmmoniaData(prev => [...prev.slice(1), { time: prev[prev.length - 1].time + 1, value: simulateNextValue(prev[prev.length - 1].value, 'ammonia', newState) }]);
      setTemperatureData(prev => [...prev.slice(1), { time: prev[prev.length - 1].time + 1, value: simulateNextValue(prev[prev.length - 1].value, 'temperature', newState) }]);
    }, 2000); // Updates every 2 seconds for faster demo

    return () => clearInterval(interval);
  }, [systemState]);

  const sensors = [
    { name: "Humidity Sensor", icon: Droplets, data: humidityData, unit: "%", type: 'humidity' as const },
    { name: "SO₂ Gas Sensor", icon: Wind, data: so2Data, unit: "ppm", type: 'so2' as const },
    { name: "H₂S Gas Sensor", icon: AlertCircle, data: h2sData, unit: "ppm", type: 'h2s' as const },
    { name: "Ammonia Sensor", icon: Activity, data: ammoniaData, unit: "ppm", type: 'ammonia' as const },
    { name: "Temperature Sensor", icon: Thermometer, data: temperatureData, unit: "°C", type: 'temperature' as const }
  ];

  // Calculate Alerts
  const activeAlerts = sensors.map(s => {
    const currentVal = s.data[s.data.length - 1].value;
    const statusInfo = getStatus(currentVal, s.type);
    return { name: s.name, value: currentVal, ...statusInfo, unit: s.unit };
  }).filter(a => a.status !== 'Healthy Emission');

  return (
    <div className="space-y-8 p-6 lg:p-12">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold tracking-tight text-slate-100">Dashboard</h1>
        <p className="text-slate-400">Real-time sensor monitoring and environmental trends</p>
      </div>

      {/* Alert Box */}
      <div className={`p-6 rounded-xl border ${activeAlerts.length === 0 ? 'bg-green-500/10 border-green-500/20' : 'bg-red-500/10 border-red-500/20'}`}>
        <div className="flex items-start gap-4">
          <div className={`p-2 rounded-full ${activeAlerts.length === 0 ? 'bg-green-500/20 text-green-500' : 'bg-red-500/20 text-red-500'}`}>
            {activeAlerts.length === 0 ? <Activity className="w-6 h-6" /> : <AlertCircle className="w-6 h-6" />}
          </div>
          <div>
            <h3 className={`text-lg font-bold ${activeAlerts.length === 0 ? 'text-green-500' : 'text-red-500'}`}>
              {activeAlerts.length === 0 ? 'System Status: Optimal' : 'System Alert: Potential Spoilage Detected'}
            </h3>
            <div className="mt-1 text-slate-300">
              {activeAlerts.length === 0 ? (
                <p>All environmental parameters are within the healthy range. Onions are safe.</p>
              ) : (
                <div>
                  <p className="font-semibold text-red-200">Warning: Significant deviation detected in storage environment.</p>
                  <p className="text-sm mt-1">Multiple indicators suggest potential spoilage conditions. Please check ventilation and isolation systems immediately.</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Sensor Reading Cards */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-5">
        {sensors.map((sensor, index) => {
          const currentValue = sensor.data[sensor.data.length - 1]?.value || 0;
          const previousValue = sensor.data[sensor.data.length - 2]?.value || 0;
          const trend = currentValue > previousValue ? "↑" : currentValue < previousValue ? "↓" : "→";
          const status = getStatus(currentValue, sensor.type);

          return (
            <Card
              key={index}
              className={`bg-slate-900/50 backdrop-blur-sm transition-all duration-300 ${status.border} border shadow-lg`}
            >
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-slate-200">
                  {sensor.name}
                </CardTitle>
                <sensor.icon className={`h-4 w-4 ${status.color}`} />
              </CardHeader>
              <CardContent>
                <div className={`text-2xl font-bold transition-colors duration-300 ${status.color}`}>
                  {currentValue.toFixed(2)} {sensor.unit}
                </div>
                <p className="text-xs text-slate-400 mt-1 flex items-center gap-1">
                  <span className={`font-bold ${currentValue > previousValue ? 'text-green-400' : currentValue < previousValue ? 'text-red-400' : 'text-slate-400'}`}>
                    {trend}
                  </span>
                  <span className={`${status.color} font-semibold`}>
                    {status.status}
                  </span>
                </p>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Live Sensor Trends */}
      <div className="space-y-6">
        <h2 className="text-xl font-semibold text-slate-200">Live Sensor Trends</h2>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {sensors.map((sensor, index) => {
            const status = getStatus(sensor.data[sensor.data.length - 1].value, sensor.type);
            // Use status color for graph
            const graphColor = status.status === 'Healthy Emission' ? '#34d399' : status.status === 'Rotting Start Time Emission' ? '#fbbf24' : '#ef4444';

            return (
              <Card key={index} className="bg-slate-900/50 border-slate-800 backdrop-blur-sm p-4">
                <div className="mb-4 flex items-center justify-between">
                  <h3 className="font-medium text-slate-200">{sensor.name} Trend</h3>
                  <span className="text-xs text-slate-400 flex items-center gap-1">
                    <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse"></span>
                    Live Updates
                  </span>
                </div>
                <div className="h-[200px] w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={sensor.data}>
                      <defs>
                        <linearGradient id={`color${index}`} x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor={graphColor} stopOpacity={0.3} />
                          <stop offset="95%" stopColor={graphColor} stopOpacity={0} />
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" stroke="#334155" vertical={false} />
                      <XAxis dataKey="time" hide />
                      <YAxis stroke="#94a3b8" fontSize={12} tickFormatter={(value) => `${value.toFixed(2)}`} />
                      <Tooltip
                        contentStyle={{ backgroundColor: '#0f172a', borderColor: '#1e293b', color: '#f1f5f9' }}
                        itemStyle={{ color: graphColor }}
                        formatter={(value: number) => [`${value.toFixed(3)} ${sensor.unit}`, sensor.name]}
                        labelStyle={{ display: 'none' }}
                      />
                      <Area
                        type="monotone"
                        dataKey="value"
                        stroke={graphColor}
                        fillOpacity={1}
                        fill={`url(#color${index})`}
                        isAnimationActive={false}
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </Card>
            )
          })}
        </div>
      </div>
    </div>
  );
}
