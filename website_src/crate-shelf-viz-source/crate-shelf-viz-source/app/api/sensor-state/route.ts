import { NextResponse } from "next/server";
import { getSensorState, getSensorStateCount } from "@/lib/sensorState";

/**
 * GET /api/sensor-state
 * 
 * Returns the current state of all crates with sensor data.
 * 
 * Response format:
 * {
 *   "success": true,
 *   "data": {
 *     "R2-C3-L1": {
 *       "crateId": "R2-C3-L1",
 *       "temperature": 10.5,
 *       "humidity": 83,
 *       "gas": 320,
 *       "status": "SPOILED",
 *       "timestamp": 1234567890
 *     },
 *     ...
 *   },
 *   "count": 5
 * }
 */
export async function GET() {
  try {
    const stateObject = getSensorState();
    const count = getSensorStateCount();
    
    return NextResponse.json({
      success: true,
      data: stateObject,
      count,
    });
  } catch (error) {
    console.error("Error fetching sensor state:", error);
    return NextResponse.json(
      { error: "Failed to fetch sensor state" },
      { status: 500 }
    );
  }
}

