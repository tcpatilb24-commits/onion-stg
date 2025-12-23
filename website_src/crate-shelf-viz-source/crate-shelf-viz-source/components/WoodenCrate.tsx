"use client";

import React, { useMemo } from "react";

interface WoodenCrateProps {
    position: [number, number, number];
    size: number;
    woodThickness: number;
    sideSlatCount: number;
    bottomSlatCount: number;
    showPlates: boolean;
    woodColor: string;
    plateColor: string;
}

export default function WoodenCrate({
    position,
    size,
    woodThickness,
    sideSlatCount,
    bottomSlatCount,
    showPlates,
    woodColor,
    plateColor
}: WoodenCrateProps) {
    // Procedurally generate the parts of the crate
    const { posts, sideSlats, bottomSlats, plates } = useMemo(() => {
        const thickness = woodThickness; // Thickness of the wood
        const halfSize = size / 2;
        const halfThickness = thickness / 2;

        // 1. Corner Posts (4 vertical posts)
        const postHeight = size;
        const postPositions = [
            [halfSize - halfThickness, 0, halfSize - halfThickness], // Front-Right
            [-halfSize + halfThickness, 0, halfSize - halfThickness], // Front-Left
            [halfSize - halfThickness, 0, -halfSize + halfThickness], // Back-Right
            [-halfSize + halfThickness, 0, -halfSize + halfThickness], // Back-Left
        ];

        const posts = postPositions.map((pos, i) => ({
            key: `post-${i}`,
            position: pos as [number, number, number],
            args: [thickness, postHeight, thickness] as [number, number, number],
        }));

        // 2. Side Slats (Horizontal planks on 4 sides)
        const slatCount = sideSlatCount;
        const slatHeight = (size * 0.5) / Math.max(1, slatCount);
        const gap = (size * 0.5) / (slatCount + 1);
        const sideSlats = [];

        for (let i = 0; i < slatCount; i++) {
            const y = -halfSize + gap + i * (slatHeight + gap) + slatHeight / 2;

            // Front and Back (Z-axis offset)
            sideSlats.push({
                key: `slat-front-${i}`,
                position: [0, y, halfSize - halfThickness] as [number, number, number],
                args: [size, slatHeight, thickness] as [number, number, number],
            });
            sideSlats.push({
                key: `slat-back-${i}`,
                position: [0, y, -halfSize + halfThickness] as [number, number, number],
                args: [size, slatHeight, thickness] as [number, number, number],
            });

            // Left and Right (X-axis offset)
            sideSlats.push({
                key: `slat-right-${i}`,
                position: [halfSize - halfThickness, y, 0] as [number, number, number],
                args: [thickness, slatHeight, size - thickness * 2] as [number, number, number],
            });
            sideSlats.push({
                key: `slat-left-${i}`,
                position: [-halfSize + halfThickness, y, 0] as [number, number, number],
                args: [thickness, slatHeight, size - thickness * 2] as [number, number, number],
            });
        }

        // 3. Bottom Slats
        const bottomSlatWidth = (size * 0.6) / Math.max(1, bottomSlatCount);
        const bottomGap = (size * 0.4) / (bottomSlatCount + 1);
        const bottomSlats = [];

        for (let i = 0; i < bottomSlatCount; i++) {
            // Running along X axis
            const z = -halfSize + bottomGap + i * (bottomSlatWidth + bottomGap) + bottomSlatWidth / 2;
            bottomSlats.push({
                key: `bottom-${i}`,
                position: [0, -halfSize + halfThickness, z] as [number, number, number],
                args: [size, thickness, bottomSlatWidth] as [number, number, number]
            })
        }

        // 4. Metal Plates (Corner brackets)
        const plates: { key: string; position: [number, number, number]; args: [number, number, number] }[] = [];
        if (showPlates) {
            const plateSize = thickness * 1.2; // Slightly larger than wood thickness
            const plateHeight = size * 0.15; // Covers top/bottom 15%

            // Top and Bottom corners
            const yPositions = [halfSize - plateHeight / 2, -halfSize + plateHeight / 2];

            yPositions.forEach((y, yIdx) => {
                postPositions.forEach((pos, pIdx) => {
                    // Simple L-shape bracket logic or just a wrapper box
                    // Let's just wrap the post corner
                    plates.push({
                        key: `plate-${yIdx}-${pIdx}`,
                        position: [pos[0], y, pos[2]] as [number, number, number],
                        args: [plateSize, plateHeight, plateSize] as [number, number, number]
                    });
                });
            });
        }

        return { posts, sideSlats, bottomSlats, plates };
    }, [size, woodThickness, sideSlatCount, bottomSlatCount, showPlates]);

    return (
        <group position={position}>
            {/* Posts */}
            {posts.map((p, i) => (
                <mesh key={p.key} position={p.position}>
                    <boxGeometry args={p.args} />
                    <meshStandardMaterial
                        color={woodColor}
                        roughness={0.9}
                        metalness={0.1}
                        // Simple variation based on index
                        color-b={i % 2 === 0 ? 0.1 : 0}
                    />
                </mesh>
            ))}

            {/* Side Slats */}
            {sideSlats.map((s) => (
                <mesh key={s.key} position={s.position}>
                    <boxGeometry args={s.args} />
                    <meshStandardMaterial
                        color={woodColor}
                        roughness={0.9}
                        metalness={0.1}
                    />
                </mesh>
            ))}

            {/* Bottom Slats */}
            {bottomSlats.map((b) => (
                <mesh key={b.key} position={b.position}>
                    <boxGeometry args={b.args} />
                    <meshStandardMaterial
                        color={woodColor}
                        roughness={0.9}
                        metalness={0.1}
                    />
                </mesh>
            ))}

            {/* Metal Plates */}
            {plates.map((p) => (
                <mesh key={p.key} position={p.position}>
                    <boxGeometry args={p.args} />
                    <meshStandardMaterial color={plateColor} metalness={0.8} roughness={0.2} />
                </mesh>
            ))}
        </group>
    );
}
