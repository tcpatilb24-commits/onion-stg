"use client";

import React from "react";

/**
 * GroundPlane Component
 * 
 * This creates a flat ground plane to help visualize the 3D scene.
 * It acts like a floor that the crates sit on.
 * 
 * Props:
 * - size: number - How big the ground plane should be
 */
interface GroundPlaneProps {
  size?: number;
}

export default function GroundPlane({ size = 20 }: GroundPlaneProps) {
  return (
    <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -size / 2, 0]} receiveShadow>
      {/* PlaneGeometry creates a flat surface */}
      <planeGeometry args={[size, size]} />
      
      {/* A subtle gray material for the ground */}
      <meshStandardMaterial
        color="#e5e7eb"
        roughness={0.8}
        metalness={0.1}
      />
    </mesh>
  );
}

