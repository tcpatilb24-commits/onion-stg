"use client";

import React, { useRef } from "react";
import * as THREE from "three";
import { useFrame } from "@react-three/fiber";

/**
 * Crate Component
 * 
 * This component renders a single 3D crate (cube) in the scene.
 * 
 * Props:
 * - position: [x, y, z] - Where to place the crate in 3D space
 * - size: number - The size of the crate (width, height, depth)
 * - color?: string - The color of the crate (optional, defaults to cyan)
 * - isSpoiled?: boolean - If true, crate blinks red/orange
 * - isWarning?: boolean - If true, crate shows yellow/orange highlight
 * 
 * This is a simple cube representation with support for status-based animations.
 */
interface CrateProps {
  position: [number, number, number];
  size: number;
  color?: string;
  isSpoiled?: boolean;
  isWarning?: boolean;
}

export default function Crate({ 
  position, 
  size, 
  color = "#22d3ee", // Default cyan color
  isSpoiled = false,
  isWarning = false 
}: CrateProps) {
  const meshRef = useRef<THREE.Mesh>(null);
  const materialRef = useRef<THREE.MeshStandardMaterial>(null);

  // Animate spoiled crates with pulsing/blinking effect
  useFrame((state) => {
    if (meshRef.current && materialRef.current) {
      if (isSpoiled) {
        // Pulsing scale animation
        const scale = 1 + Math.sin(state.clock.elapsedTime * 3) * 0.1;
        meshRef.current.scale.setScalar(scale);
        
        // Blinking color between red and orange
        const intensity = (Math.sin(state.clock.elapsedTime * 4) + 1) / 2;
        const red = 0.8 + intensity * 0.2; // 0.8 to 1.0
        const green = intensity * 0.3; // 0 to 0.3
        const blue = 0;
        materialRef.current.color.setRGB(red, green, blue);
        materialRef.current.emissive.setRGB(red * 0.5, green * 0.5, blue);
      } else if (isWarning) {
        // Subtle yellow/orange glow for warnings
        const intensity = (Math.sin(state.clock.elapsedTime * 2) + 1) / 2;
        const yellow = 0.8 + intensity * 0.2;
        const red = yellow * 0.8;
        const green = yellow;
        materialRef.current.color.setRGB(red, green, 0);
        materialRef.current.emissive.setRGB(red * 0.3, green * 0.3, 0);
        meshRef.current.scale.setScalar(1);
      } else {
        // Normal state - use provided color or default cyan
        meshRef.current.scale.setScalar(1);
        materialRef.current.color.set(color);
        materialRef.current.emissive.setRGB(0, 0, 0);
      }
    }
  });

  // Determine base color based on status
  let baseColor = color;
  if (isSpoiled) {
    baseColor = "#ef4444"; // Red
  } else if (isWarning) {
    baseColor = "#f59e0b"; // Amber
  }

  return (
    <mesh ref={meshRef} position={position} castShadow receiveShadow>
      {/* BoxGeometry creates a cube with width, height, and depth */}
      <boxGeometry args={[size, size, size]} />
      
      {/* MeshStandardMaterial gives the cube a realistic look with lighting */}
      <meshStandardMaterial
        ref={materialRef}
        color={baseColor}
        roughness={0.7}
        metalness={0.1}
      />
    </mesh>
  );
}

