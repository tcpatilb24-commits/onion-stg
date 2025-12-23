"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useCrateState } from "@/hooks/useCrateState";
import { AlertCircle, CheckCircle, AlertTriangle, RefreshCw } from "lucide-react";
import { motion } from "framer-motion";

/**
 * SensorDebugPanel Component
 * 
 * Displays a debug panel showing current sensor values for all crates.
 * Useful for confirming live data is being received during the demo.
 */
export default function SensorDebugPanel() {
  const { crateState, isLoading, error, refresh } = useCrateState(2000);

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "SPOILED":
        return <AlertCircle className="h-4 w-4 text-red-500" />;
      case "WARNING":
        return <AlertTriangle className="h-4 w-4 text-yellow-500" />;
      case "OK":
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      default:
        return null;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "SPOILED":
        return "text-red-400";
      case "WARNING":
        return "text-yellow-400";
      case "OK":
        return "text-green-400";
      default:
        return "text-slate-400";
    }
  };

  const crateEntries = Object.entries(crateState);

  return (
    <Card className="bg-[rgba(15,23,42,0.9)] border border-[rgba(148,163,184,0.25)] rounded-2xl shadow-[0_20px_60px_rgba(15,23,42,0.9)]">
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle className="text-slate-100">Sensor Data Debug Panel</CardTitle>
          <CardDescription className="text-slate-500">
            Real-time sensor readings from ESP32 devices
          </CardDescription>
        </div>
        <motion.button
          whileHover={{ rotate: 180 }}
          whileTap={{ scale: 0.9 }}
          onClick={refresh}
          className="p-2 rounded-lg bg-slate-800/60 border border-transparent transition-all duration-300 ease-out hover:-translate-y-[3px] hover:brightness-110 hover:scale-[1.015] hover:shadow-[0_0_30px_rgba(34,211,238,0.45)] hover:shadow-[0_0_35px_rgba(34,211,238,0.55)] hover:ring-2 hover:ring-cyan-400/60 hover:border-cyan-400/40 hover:bg-slate-800/80"
        >
          <RefreshCw className="h-4 w-4 text-cyan-400" />
        </motion.button>
      </CardHeader>
      <CardContent>
        {isLoading && (
          <div className="text-center py-8 text-slate-400">
            Loading sensor data...
          </div>
        )}
        
        {error && (
          <div className="text-center py-8 text-red-400">
            Error: {error}
          </div>
        )}
        
        {!isLoading && !error && crateEntries.length === 0 && (
          <div className="text-center py-8 text-slate-500">
            No sensor data received yet. Waiting for ESP32 updates...
          </div>
        )}
        
        {!isLoading && !error && crateEntries.length > 0 && (
          <div className="space-y-2 max-h-[400px] overflow-y-auto">
            {crateEntries.map(([crateId, data]) => (
              <motion.div
                key={crateId}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className={`p-3 rounded-lg border ${
                  data.status === "SPOILED"
                    ? "border-red-500/50 bg-red-500/10"
                    : data.status === "WARNING"
                    ? "border-yellow-500/50 bg-yellow-500/10"
                    : "border-slate-700/50 bg-slate-800/30"
                } transition-all duration-200 ease-out hover:shadow-[0_0_15px_rgba(34,211,238,0.2)]`}
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    {getStatusIcon(data.status)}
                    <span className="font-mono text-sm font-semibold text-cyan-400">
                      {crateId}
                    </span>
                  </div>
                  <span className={`text-xs font-medium ${getStatusColor(data.status)}`}>
                    {data.status}
                  </span>
                </div>
                <div className="grid grid-cols-3 gap-2 text-xs">
                  <div>
                    <span className="text-slate-500">Temp:</span>
                    <span className="ml-1 text-slate-300">{data.temperature}°C</span>
                  </div>
                  <div>
                    <span className="text-slate-500">Humidity:</span>
                    <span className="ml-1 text-slate-300">{data.humidity}%</span>
                  </div>
                  <div>
                    <span className="text-slate-500">Gas:</span>
                    <span className="ml-1 text-slate-300">{data.gas} ppm</span>
                  </div>
                </div>
                <div className="mt-1 text-xs text-slate-500">
                  Updated: {new Date(data.timestamp).toLocaleTimeString()}
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}

