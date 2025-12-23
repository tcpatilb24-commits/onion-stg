/**
 * Shared in-memory store for sensor data
 * 
 * This module provides a centralized store for sensor readings from ESP32 devices.
 * The data is stored in memory and will be lost on server restart.
 * For production, consider using a database or Redis.
 */

export interface CrateSensorData {
  crateId: string;
  temperature: number;
  humidity: number;
  gas: number;
  status: "OK" | "WARNING" | "SPOILED";
  timestamp: number;
}

const sensorState = new Map<string, CrateSensorData>();

/**
 * Get the current sensor state for all crates
 */
export function getSensorState(): Record<string, CrateSensorData> {
  const stateObject: Record<string, CrateSensorData> = {};
  sensorState.forEach((value, key) => {
    stateObject[key] = value;
  });
  return stateObject;
}

/**
 * Get sensor data for a specific crate
 */
export function getCrateSensorData(crateId: string): CrateSensorData | undefined {
  return sensorState.get(crateId);
}

/**
 * Update sensor data for a crate
 */
export function updateSensorData(data: CrateSensorData): void {
  sensorState.set(data.crateId, {
    ...data,
    timestamp: Date.now(),
  });
}

/**
 * Get the number of crates with sensor data
 */
export function getSensorStateCount(): number {
  return sensorState.size;
}

