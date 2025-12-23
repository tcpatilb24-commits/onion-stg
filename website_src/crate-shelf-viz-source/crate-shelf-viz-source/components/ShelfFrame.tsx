"use client";

import React, { useMemo } from "react";

interface ShelfFrameProps {
    rows: number;
    columns: number;
    horizontalSpacing: number;
    verticalSpacing: number;
    depthOffset: number;
    crateSize: number;
}

export default function ShelfFrame({
    rows,
    columns,
    horizontalSpacing,
    verticalSpacing,
    depthOffset,
    crateSize,
}: ShelfFrameProps) {
    const { verticalPoles, horizontalPoles } = useMemo(() => {
        const poleRadius = 0.05;

        // Calculate dimensions
        const totalWidth = (columns - 1) * horizontalSpacing;
        const totalHeight = (rows - 1) * verticalSpacing;

        // Vertical support poles at corners
        const zFront = depthOffset;
        const zBack = -depthOffset;

        const height = totalHeight + verticalSpacing * 2;

        const verticalPoles: { key: string; position: [number, number, number]; args: [number, number, number, number] }[] = [];

        // 4 corner poles
        const corners = [
            [0, zFront],
            [totalWidth, zFront],
            [0, zBack],
            [totalWidth, zBack],
        ];

        corners.forEach(([x, z], i) => {
            verticalPoles.push({
                key: `v-pole-${i}`,
                position: [x, height / 2 - verticalSpacing, z] as [number, number, number],
                args: [poleRadius, poleRadius, height, 16] as [number, number, number, number],
            });
        });

        // Horizontal support poles that crates rest ON
        const horizontalPoles: { key: string; position: [number, number, number]; rotation: [number, number, number]; args: [number, number, number, number] }[] = [];
        const runnerLength = totalWidth + poleRadius * 2;

        // For each row, create horizontal runners that the crates sit on
        for (let i = 0; i < rows; i++) {
            // Y position: bottom of crate minus pole radius
            const y = i * verticalSpacing - crateSize / 2 - poleRadius;

            // Create multiple support poles running along X axis (front to back)
            for (let j = 0; j < columns; j++) {
                const x = j * horizontalSpacing;

                // Front-to-back runner under each crate position
                horizontalPoles.push({
                    key: `support-${i}-${j}`,
                    position: [x, y, 0] as [number, number, number],
                    rotation: [Math.PI / 2, 0, 0] as [number, number, number],
                    args: [poleRadius, poleRadius, depthOffset * 2.2, 16] as [number, number, number, number],
                });
            }

            // Long runners along the width (left to right) for stability
            horizontalPoles.push({
                key: `h-pole-f-${i}`,
                position: [totalWidth / 2, y, zFront] as [number, number, number],
                rotation: [0, 0, Math.PI / 2] as [number, number, number],
                args: [poleRadius, poleRadius, runnerLength, 16] as [number, number, number, number],
            });

            horizontalPoles.push({
                key: `h-pole-b-${i}`,
                position: [totalWidth / 2, y, zBack] as [number, number, number],
                rotation: [0, 0, Math.PI / 2] as [number, number, number],
                args: [poleRadius, poleRadius, runnerLength, 16] as [number, number, number, number],
            });
        }

        return { verticalPoles, horizontalPoles };
    }, [rows, columns, horizontalSpacing, verticalSpacing, depthOffset, crateSize]);

    const bambooColor = "#C19A6B";

    return (
        <group>
            {verticalPoles.map((p) => (
                <mesh key={p.key} position={p.position}>
                    <cylinderGeometry args={p.args} />
                    <meshStandardMaterial color={bambooColor} roughness={0.6} />
                </mesh>
            ))}
            {horizontalPoles.map((p) => (
                <mesh key={p.key} position={p.position} rotation={p.rotation}>
                    <cylinderGeometry args={p.args} />
                    <meshStandardMaterial color={bambooColor} roughness={0.6} />
                </mesh>
            ))}
        </group>
    );
}
