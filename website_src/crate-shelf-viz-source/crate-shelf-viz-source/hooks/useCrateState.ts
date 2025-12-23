"use client";

import { useState, useEffect, useCallback } from "react";
import type { CrateSensorData } from "@/lib/sensorState";

/**
 * React hook for polling sensor state from the API
 * 
 * This hook:
 * - Polls /api/sensor-state every 1-2 seconds
 * - Maintains the latest sensor state in React state
 * - Provides helper functions to check crate status
 * 
 * @param pollInterval Polling interval in milliseconds (default: 1500ms)
 */
export function useCrateState(pollInterval: number = 1500) {
  const [crateState, setCrateState] = useState<Record<string, CrateSensorData>>({});
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  /**
   * Fetch sensor state from the API
   */
  const fetchSensorState = useCallback(async () => {
    try {
      const response = await fetch("/api/sensor-state");
      if (!response.ok) {
        throw new Error(`Failed to fetch sensor state: ${response.statusText}`);
      }

      const result = await response.json();
      if (result.success && result.data) {
        setCrateState(result.data);
        setError(null);
      } else {
        throw new Error("Invalid response format");
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Unknown error";
      setError(errorMessage);
      console.error("Error fetching sensor state:", err);
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Initial fetch and set up polling
  useEffect(() => {
    // Fetch immediately
    fetchSensorState();

    // Set up polling interval
    const interval = setInterval(fetchSensorState, pollInterval);

    // Cleanup on unmount
    return () => clearInterval(interval);
  }, [fetchSensorState, pollInterval]);

  /**
   * Get sensor data for a specific crate
   */
  const getCrateData = useCallback((crateId: string): CrateSensorData | undefined => {
    return crateState[crateId];
  }, [crateState]);

  /**
   * Check if a crate is spoiled
   */
  const isCrateSpoiled = useCallback((crateId: string): boolean => {
    const data = crateState[crateId];
    return data?.status === "SPOILED";
  }, [crateState]);

  /**
   * Check if a crate has a warning
   */
  const isCrateWarning = useCallback((crateId: string): boolean => {
    const data = crateState[crateId];
    return data?.status === "WARNING";
  }, [crateState]);

  /**
   * Check if a crate is OK
   */
  const isCrateOk = useCallback((crateId: string): boolean => {
    const data = crateState[crateId];
    return data?.status === "OK";
  }, [crateState]);

  /**
   * Get all spoiled crate IDs
   */
  const getSpoiledCrateIds = useCallback((): string[] => {
    return Object.entries(crateState)
      .filter(([_id, data]) => data.status === "SPOILED")
      .map(([id]) => id);
  }, [crateState]);

  /**
   * Get all warning crate IDs
   */
  const getWarningCrateIds = useCallback((): string[] => {
    return Object.entries(crateState)
      .filter(([_id, data]) => data.status === "WARNING")
      .map(([id]) => id);
  }, [crateState]);

  return {
    crateState,
    isLoading,
    error,
    getCrateData,
    isCrateSpoiled,
    isCrateWarning,
    isCrateOk,
    getSpoiledCrateIds,
    getWarningCrateIds,
    refresh: fetchSensorState,
  };
}

