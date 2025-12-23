"use client";

import React from "react";
import * as THREE from "three";
import Crate from "./Crate";
import type { CrateSensorData } from "@/lib/sensorState";
import { getCratePosition } from "@/lib/crateConfig";

/**
 * CrateField Component
 * 
 * Renders a field of crates arranged on a rack.
 * Each crate is positioned based on the matrix configuration.
 * Supports sensor state for spoiled/warning highlighting.
 */
interface CrateFieldProps {
  matrix: number[][];
  rackPosition: [number, number, number];
  rackWidth: number;
  rackHeight: number;
  rackDepth: number;
  levels: number;
  crateSize?: number;
  rackIndex?: number; // Which rack this is (0-indexed)
  crateState?: Record<string, CrateSensorData>; // Sensor state for all crates
}

export default function CrateField({
  matrix,
  rackPosition,
  rackWidth,
  rackHeight,
  rackDepth,
  levels,
  crateSize = 0.8,
  rackIndex = 0,
  crateState = {},
}: CrateFieldProps) {
  // Calculate spacing based on matrix dimensions
  // Use the first row's length as reference (assuming all rows have same length)
  const columns = matrix[0]?.length || 1;
  const spacingX = columns > 1 ? rackWidth / (columns - 1) : rackWidth;
  const spacingY = levels > 1 ? rackHeight / (levels - 1) : rackHeight;
  const depthOffset = rackDepth * 0.3;

  const crates: Array<{
    id: string;
    crateId: string; // Real crateId like "R2-C3-L1"
    position: [number, number, number];
    color: string;
    isSpoiled: boolean;
    isWarning: boolean;
  }> = [];

  // Convert matrix to crate positions
  // Each row in the matrix represents a shelf level
  matrix.forEach((row, rowIndex) => {
    // Only process rows that fit within available levels
    if (rowIndex < levels) {
      row.forEach((value, colIndex) => {
        if (value !== 0) {
          // Calculate positions relative to rack center
          const x = rackPosition[0] + (columns > 1 ? (colIndex * spacingX - rackWidth / 2) : 0);
          const y = rackPosition[1] + (levels > 1 ? (rowIndex * spacingY - rackHeight / 2) : 0);
          const z = rackPosition[2] + (value > 0 ? depthOffset : -depthOffset);

          // Generate crateId based on position (R1-C1-L1 format)
          // rackIndex is 0-indexed, so add 1 for display
          // rowIndex is 0-indexed (level), colIndex is 0-indexed (column)
          const crateId = `R${rackIndex + 1}-C${colIndex + 1}-L${rowIndex + 1}${value < 0 ? "-B" : ""}`;
          
          // Get sensor data for this crate
          const sensorData = crateState[crateId];
          const isSpoiled = sensorData?.status === "SPOILED";
          const isWarning = sensorData?.status === "WARNING";

          // Default colors: cyan for front, teal for back
          const color = value > 0 ? "#22d3ee" : "#22c55e";

          crates.push({
            id: `crate-${rackIndex}-${rowIndex}-${colIndex}`,
            crateId,
            position: [x, y, z],
            color,
            isSpoiled,
            isWarning,
          });
        }
      });
    }
  });

  return (
    <group>
      {crates.map((crate) => (
        <Crate
          key={crate.id}
          position={crate.position}
          size={crateSize}
          color={crate.color}
          isSpoiled={crate.isSpoiled}
          isWarning={crate.isWarning}
        />
      ))}
    </group>
  );
}

