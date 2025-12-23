"use client";

import React from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Environment } from "@react-three/drei";
import * as THREE from "three";
import Rack from "./Rack";
import CrateField from "./CrateField";
import ACUnit from "./ACUnit";
import type { CrateSensorData } from "@/lib/sensorState";

/**
 * WarehouseRoom Component
 * 
 * Main 3D warehouse scene component that renders:
 * - A rectangular room with floor and walls
 * - Multiple shelf racks arranged in the room
 * - Crates on the racks based on matrix configuration
 * - AC ducts/units on the ceiling
 * - Soft lighting and shadows
 * - Mouse orbit controls for interaction
 * - Real-time sensor state visualization (spoiled/warning crates)
 */
interface WarehouseRoomProps {
  matrix?: number[][];
  rackCount?: number;
  crateState?: Record<string, CrateSensorData>; // Sensor state for all crates
}

export default function WarehouseRoom({
  matrix = [
    [1, -1, 1, -1, 1],
    [-1, 1, -1, 1, -1],
    [1, -1, 1, -1, 1],
  ],
  rackCount = 4,
  crateState = {},
}: WarehouseRoomProps) {
  const roomWidth = 20;
  const roomHeight = 8;
  const roomDepth = 15;
  const rackWidth = 3;
  const rackHeight = 6;
  const rackDepth = 2;
  const rackLevels = 4;

  // Calculate rack positions (arrange in rows)
  const racksPerRow = 2;
  const rackSpacingX = roomWidth / (racksPerRow + 1);
  const rackSpacingZ = roomDepth / (Math.ceil(rackCount / racksPerRow) + 1);

  const rackPositions: Array<[number, number, number]> = [];
  for (let i = 0; i < rackCount; i++) {
    const row = Math.floor(i / racksPerRow);
    const col = i % racksPerRow;
    const x = (col + 1) * rackSpacingX - roomWidth / 2;
    const z = (row + 1) * rackSpacingZ - roomDepth / 2;
    rackPositions.push([x, -roomHeight / 2 + rackHeight / 2, z]);
  }

  // AC unit positions on ceiling
  const acUnits = [
    { position: [-roomWidth / 2 + 3, roomHeight / 2 - 0.5, 0] as [number, number, number], length: 4, width: 1.5 },
    { position: [roomWidth / 2 - 3, roomHeight / 2 - 0.5, 0] as [number, number, number], length: 4, width: 1.5 },
    { position: [0, roomHeight / 2 - 0.5, -roomDepth / 2 + 2] as [number, number, number], length: 6, width: 1.5 },
  ];

  return (
    <div className="w-full h-full min-h-[500px] bg-gradient-to-br from-[#020617] to-[#000000] rounded-lg overflow-hidden border border-[rgba(148,163,184,0.25)] shadow-[0_20px_60px_rgba(15,23,42,0.9)]">
      <Canvas
        camera={{ position: [15, 10, 15], fov: 50 }}
        shadows
      >
        {/* Lighting Setup */}
        <ambientLight intensity={0.4} />
        <directionalLight
          position={[10, 15, 5]}
          intensity={0.8}
          castShadow
          shadow-mapSize-width={2048}
          shadow-mapSize-height={2048}
        />
        <pointLight position={[-10, 8, -10]} intensity={0.5} />
        <pointLight position={[10, 8, 10]} intensity={0.3} color="#64c8ff" />

        <Environment preset="warehouse" />

        {/* Camera Controls */}
        <OrbitControls
          makeDefault
          minPolarAngle={0}
          maxPolarAngle={Math.PI / 1.8}
          enableDamping
          dampingFactor={0.05}
        />

        {/* Room Structure */}
        <group>
          {/* Floor */}
          <mesh
            rotation={[-Math.PI / 2, 0, 0]}
            position={[0, -roomHeight / 2, 0]}
            receiveShadow
          >
            <planeGeometry args={[roomWidth, roomDepth]} />
            <meshStandardMaterial
              color="#2d3748"
              roughness={0.8}
              metalness={0.1}
            />
          </mesh>

          {/* Walls - using BackSide to render inside */}
          {/* Back wall */}
          <mesh
            position={[0, 0, -roomDepth / 2]}
            rotation={[0, 0, 0]}
            receiveShadow
          >
            <planeGeometry args={[roomWidth, roomHeight]} />
            <meshStandardMaterial
              color="#374151"
              side={THREE.BackSide}
              roughness={0.7}
            />
          </mesh>

          {/* Left wall */}
          <mesh
            position={[-roomWidth / 2, 0, 0]}
            rotation={[0, Math.PI / 2, 0]}
            receiveShadow
          >
            <planeGeometry args={[roomDepth, roomHeight]} />
            <meshStandardMaterial
              color="#374151"
              side={THREE.BackSide}
              roughness={0.7}
            />
          </mesh>

          {/* Right wall */}
          <mesh
            position={[roomWidth / 2, 0, 0]}
            rotation={[0, -Math.PI / 2, 0]}
            receiveShadow
          >
            <planeGeometry args={[roomDepth, roomHeight]} />
            <meshStandardMaterial
              color="#374151"
              side={THREE.BackSide}
              roughness={0.7}
            />
          </mesh>

          {/* Ceiling */}
          <mesh
            position={[0, roomHeight / 2, 0]}
            rotation={[Math.PI / 2, 0, 0]}
            receiveShadow
          >
            <planeGeometry args={[roomWidth, roomDepth]} />
            <meshStandardMaterial
              color="#1f2937"
              roughness={0.6}
              metalness={0.2}
            />
          </mesh>
        </group>

        {/* Racks */}
        {rackPositions.map((position, index) => (
          <Rack
            key={`rack-${index}`}
            position={position}
            width={rackWidth}
            height={rackHeight}
            depth={rackDepth}
            levels={rackLevels}
          />
        ))}

        {/* Crates on all racks (using the matrix) */}
        {rackPositions.map((rackPos, index) => (
          <CrateField
            key={`crate-field-${index}`}
            matrix={matrix}
            rackPosition={rackPos}
            rackWidth={rackWidth}
            rackHeight={rackHeight}
            rackDepth={rackDepth}
            levels={rackLevels}
            rackIndex={index}
            crateState={crateState}
          />
        ))}

        {/* AC Units on ceiling */}
        {acUnits.map((ac, index) => (
          <ACUnit
            key={`ac-${index}`}
            position={ac.position}
            length={ac.length}
            width={ac.width}
            height={0.3}
          />
        ))}
      </Canvas>
    </div>
  );
}

