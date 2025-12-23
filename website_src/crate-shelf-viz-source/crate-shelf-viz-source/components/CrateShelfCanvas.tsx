"use client";

import React, { useMemo } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Grid, Center, Environment } from "@react-three/drei";
import * as THREE from "three";

import WoodenCrate from "./WoodenCrate";
import Room from "./Room";
import ShelfFrame from "./ShelfFrame";

interface CrateShelfCanvasProps {
    rows: number;
    columns: number;
    crateSize: number;
    horizontalSpacing: number;
    verticalSpacing: number;
    depthOffset: number;
    woodThickness: number;
    sideSlatCount: number;
    bottomSlatCount: number;
    showPlates: boolean;
    woodColor: string;
    plateColor: string;
}

export default function CrateShelfCanvas({
    rows,
    columns,
    crateSize,
    horizontalSpacing,
    verticalSpacing,
    depthOffset,
    woodThickness,
    sideSlatCount,
    bottomSlatCount,
    showPlates,
    woodColor,
    plateColor
}: CrateShelfCanvasProps) {
    const crates = useMemo(() => {
        const items = [];
        for (let i = 0; i < rows; i++) {
            for (let j = 0; j < columns; j++) {
                // Zig-zag pattern logic
                // value(i, j) = ((i + j) % 2 === 0) ? 1 : -1
                const isFront = (i + j) % 2 === 0;
                const z = isFront ? depthOffset : -depthOffset;

                // Position calculation
                const x = j * horizontalSpacing;
                const y = i * verticalSpacing; // Stack upwards

                items.push({
                    id: `${i}-${j}`,
                    position: [x, y, z] as [number, number, number],
                });
            }
        }
        return items;
    }, [rows, columns, horizontalSpacing, verticalSpacing, depthOffset]);

    return (
        <div className="w-full h-full min-h-[500px] bg-slate-900 rounded-lg overflow-hidden border border-slate-700">
            <Canvas camera={{ position: [8, 5, 12], fov: 50 }}>
                <ambientLight intensity={0.4} />
                <directionalLight position={[10, 10, 5]} intensity={0.8} castShadow />
                <pointLight position={[-10, 5, -10]} intensity={0.5} />
                <Environment preset="city" />

                <OrbitControls makeDefault minPolarAngle={0} maxPolarAngle={Math.PI / 1.8} />

                <Room />

                <Center position={[0, 0, 0]}>
                    <group>
                        <ShelfFrame
                            rows={rows}
                            columns={columns}
                            horizontalSpacing={horizontalSpacing}
                            verticalSpacing={verticalSpacing}
                            depthOffset={depthOffset}
                            crateSize={crateSize}
                        />
                        {crates.map((crate) => (
                            <WoodenCrate
                                key={crate.id}
                                position={crate.position}
                                size={crateSize}
                                woodThickness={woodThickness}
                                sideSlatCount={sideSlatCount}
                                bottomSlatCount={bottomSlatCount}
                                showPlates={showPlates}
                                woodColor={woodColor}
                                plateColor={plateColor}
                            />
                        ))}
                    </group>
                </Center>
            </Canvas>
        </div>
    );
}
