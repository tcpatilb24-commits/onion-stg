import { NextRequest, NextResponse } from "next/server";
import { updateSensorData, type CrateSensorData } from "@/lib/sensorState";

/**
 * POST /api/sensor-update
 * 
 * Accepts sensor data from ESP32 devices.
 * 
 * Expected JSON payload:
 * {
 *   "crateId": "R2-C3-L1",
 *   "temperature": 10.5,
 *   "humidity": 83,
 *   "gas": 320,
 *   "status": "SPOILED" | "OK" | "WARNING"
 * }
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    // Validate required fields
    const { crateId, temperature, humidity, gas, status } = body;
    
    if (!crateId || typeof crateId !== "string") {
      return NextResponse.json(
        { error: "Missing or invalid crateId" },
        { status: 400 }
      );
    }
    
    if (typeof temperature !== "number" || 
        typeof humidity !== "number" || 
        typeof gas !== "number") {
      return NextResponse.json(
        { error: "Invalid sensor values. temperature, humidity, and gas must be numbers" },
        { status: 400 }
      );
    }
    
    if (!["OK", "WARNING", "SPOILED"].includes(status)) {
      return NextResponse.json(
        { error: "Invalid status. Must be 'OK', 'WARNING', or 'SPOILED'" },
        { status: 400 }
      );
    }
    
    // Store the sensor data
    const sensorData: CrateSensorData = {
      crateId,
      temperature,
      humidity,
      gas,
      status,
      timestamp: Date.now(),
    };
    
    updateSensorData(sensorData);
    
    return NextResponse.json({
      success: true,
      message: `Sensor data updated for crate ${crateId}`,
      data: sensorData,
    });
  } catch (error) {
    console.error("Error processing sensor update:", error);
    return NextResponse.json(
      { error: "Invalid JSON payload" },
      { status: 400 }
    );
  }
}

