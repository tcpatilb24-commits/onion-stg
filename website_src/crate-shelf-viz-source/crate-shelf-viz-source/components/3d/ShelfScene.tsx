"use client";

import React, { useMemo } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Grid, Environment } from "@react-three/drei";
import Crate from "./Crate";
import GroundPlane from "./GroundPlane";

/**
 * ShelfScene Component
 * 
 * This is the main 3D visualization component that renders the crate shelf arrangement.
 * 
 * Props:
 * - matrix: number[][] - A 2D array where:
 *   - Each row represents a shelf level (Y-axis)
 *   - Each column represents a position along X-axis
 *   - Values: 1 = crate on front (positive Z), -1 = crate on back (negative Z), 0 = no crate
 * 
 * Example matrix:
 * [[1, -1, 1, -1, 1],
 *  [-1, 1, -1, 1, -1],
 *  [1, -1, 1, -1, 1]]
 * 
 * This component:
 * 1. Sets up the 3D canvas (React Three Fiber)
 * 2. Adds lighting and camera controls
 * 3. Renders crates based on the matrix
 * 4. Allows mouse interaction (rotate, zoom, pan)
 */
interface ShelfSceneProps {
  matrix: number[][];
  crateSize?: number;
  spacing?: number;
  depthOffset?: number;
}

export default function ShelfScene({
  matrix,
  crateSize = 0.8,
  spacing = 1.2,
  depthOffset = 0.6,
}: ShelfSceneProps) {
  // Convert the matrix into crate positions
  // This runs whenever the matrix changes
  const crates = useMemo(() => {
    const crateList: Array<{
      id: string;
      position: [number, number, number];
      color: string;
    }> = [];

    // Loop through each row (Y-axis) and column (X-axis) in the matrix
    matrix.forEach((row, rowIndex) => {
      row.forEach((value, colIndex) => {
        // Only create a crate if the value is not 0
        if (value !== 0) {
          // Calculate X position: column index * spacing
          const x = colIndex * spacing;
          
          // Calculate Y position: row index * spacing (inverted so first row is at top)
          // We invert because in 3D, Y goes up, but matrices typically start from top
          const y = (matrix.length - 1 - rowIndex) * spacing;
          
          // Calculate Z position: positive Z for front (1), negative Z for back (-1)
          const z = value > 0 ? depthOffset : -depthOffset;

          // Different colors for front (cyan) and back (teal) crates
          const color = value > 0 ? "#22d3ee" : "#22c55e";

          crateList.push({
            id: `crate-${rowIndex}-${colIndex}`,
            position: [x, y, z],
            color,
          });
        }
      });
    });

    return crateList;
  }, [matrix, spacing, depthOffset]);

  return (
    <div className="w-full h-full min-h-[500px] bg-gradient-to-br from-[#020617] to-[#000000] rounded-lg overflow-hidden border border-[rgba(148,163,184,0.25)] shadow-[0_20px_60px_rgba(15,23,42,0.9)]">
      <Canvas
        camera={{ position: [8, 6, 10], fov: 50 }}
        shadows
      >
        {/* Lighting Setup */}
        {/* Ambient light provides overall illumination */}
        <ambientLight intensity={0.4} />
        
        {/* Directional light simulates sunlight from top-right */}
        <directionalLight
          position={[10, 10, 5]}
          intensity={0.8}
          castShadow
          shadow-mapSize-width={2048}
          shadow-mapSize-height={2048}
        />
        
        {/* Point light adds extra depth from the opposite side */}
        <pointLight position={[-10, 5, -10]} intensity={0.5} />

        {/* Environment provides realistic reflections and lighting */}
        <Environment preset="city" />

        {/* Camera Controls - Allows mouse interaction */}
        {/* You can rotate by dragging, zoom with scroll, pan with right-click drag */}
        <OrbitControls
          makeDefault
          minPolarAngle={0}
          maxPolarAngle={Math.PI / 1.8}
          enableDamping
          dampingFactor={0.05}
        />

        {/* Grid helper - Shows a grid on the ground for reference */}
        <Grid
          renderOrder={-1}
          position={[0, -0.01, 0]}
          infiniteGrid
          cellSize={0.5}
          cellThickness={0.5}
          cellColor="#6b7280"
          sectionSize={2}
          sectionThickness={1}
          sectionColor="#9ca3af"
          fadeDistance={25}
          fadeStrength={1}
        />

        {/* Ground Plane - The floor of the scene */}
        <GroundPlane size={20} />

        {/* Render all crates from the matrix */}
        {crates.map((crate) => (
          <Crate
            key={crate.id}
            position={crate.position}
            size={crateSize}
            color={crate.color}
          />
        ))}
      </Canvas>
    </div>
  );
}

