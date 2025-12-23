"use client";

import React from "react";
import * as THREE from "three";

/**
 * ACUnit Component
 * 
 * Renders an AC duct/unit on the ceiling.
 * Simple rectangular mesh representing industrial HVAC equipment.
 */
interface ACUnitProps {
  position: [number, number, number];
  length: number;
  width: number;
  height: number;
  color?: string;
}

export default function ACUnit({
  position,
  length,
  width,
  height,
  color = "#2d3748", // Dark grey for industrial AC units
}: ACUnitProps) {
  return (
    <group position={position}>
      {/* Main AC unit body */}
      <mesh castShadow receiveShadow>
        <boxGeometry args={[length, height, width]} />
        <meshStandardMaterial
          color={color}
          roughness={0.6}
          metalness={0.4}
        />
      </mesh>
      
      {/* Vent grilles on the bottom */}
      {Array.from({ length: Math.max(1, Math.floor(length / 0.6)) }).map((_, i) => {
        const ventCount = Math.max(1, Math.floor(length / 0.6));
        const spacing = length / (ventCount + 1);
        return (
          <mesh
            key={`vent-${i}`}
            position={[(i + 1) * spacing - length / 2, -height / 2, 0]}
            castShadow
          >
            <boxGeometry args={[0.3, 0.05, width]} />
            <meshStandardMaterial
              color="#1a202c"
              roughness={0.8}
              metalness={0.2}
            />
          </mesh>
        );
      })}
    </group>
  );
}

