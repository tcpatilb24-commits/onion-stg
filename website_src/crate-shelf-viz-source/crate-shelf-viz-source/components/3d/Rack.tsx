"use client";

import React from "react";
import * as THREE from "three";

/**
 * Rack Component
 * 
 * Renders a single warehouse rack with vertical and horizontal beams.
 * This creates the structural framework for storing crates.
 */
interface RackProps {
  position: [number, number, number];
  width: number;
  height: number;
  depth: number;
  levels: number;
  beamColor?: string;
}

export default function Rack({
  position,
  width,
  height,
  depth,
  levels,
  beamColor = "#4a5568", // Dark grey for industrial look
}: RackProps) {
  const beamThickness = 0.1;
  const verticalBeamWidth = 0.15;

  return (
    <group position={position}>
      {/* Vertical corner beams */}
      {[
        [0, 0, 0],
        [width, 0, 0],
        [0, 0, depth],
        [width, 0, depth],
      ].map(([x, y, z], i) => (
        <mesh
          key={`vertical-${i}`}
          position={[x, height / 2, z]}
          castShadow
          receiveShadow
        >
          <boxGeometry args={[verticalBeamWidth, height, verticalBeamWidth]} />
          <meshStandardMaterial
            color={beamColor}
            roughness={0.7}
            metalness={0.3}
          />
        </mesh>
      ))}

      {/* Horizontal shelf beams for each level */}
      {Array.from({ length: levels + 1 }).map((_, level) => {
        const y = (height / (levels + 1)) * (level + 1) - height / 2;
        
        return (
          <group key={`level-${level}`}>
            {/* Front beam */}
            <mesh
              position={[width / 2, y, 0]}
              castShadow
              receiveShadow
            >
              <boxGeometry args={[width, beamThickness, beamThickness]} />
              <meshStandardMaterial
                color={beamColor}
                roughness={0.7}
                metalness={0.3}
              />
            </mesh>
            
            {/* Back beam */}
            <mesh
              position={[width / 2, y, depth]}
              castShadow
              receiveShadow
            >
              <boxGeometry args={[width, beamThickness, beamThickness]} />
              <meshStandardMaterial
                color={beamColor}
                roughness={0.7}
                metalness={0.3}
              />
            </mesh>
            
            {/* Side beams */}
            <mesh
              position={[0, y, depth / 2]}
              castShadow
              receiveShadow
            >
              <boxGeometry args={[beamThickness, beamThickness, depth]} />
              <meshStandardMaterial
                color={beamColor}
                roughness={0.7}
                metalness={0.3}
              />
            </mesh>
            
            <mesh
              position={[width, y, depth / 2]}
              castShadow
              receiveShadow
            >
              <boxGeometry args={[beamThickness, beamThickness, depth]} />
              <meshStandardMaterial
                color={beamColor}
                roughness={0.7}
                metalness={0.3}
              />
            </mesh>
          </group>
        );
      })}
    </group>
  );
}

