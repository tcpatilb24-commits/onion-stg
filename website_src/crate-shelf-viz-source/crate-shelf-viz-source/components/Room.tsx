"use client";

import React from "react";
import { BackSide } from "three";

export default function Room() {
    return (
        <group>
            <mesh receiveShadow position={[0, 5, 0]}>
                <boxGeometry args={[30, 20, 30]} />
                <meshStandardMaterial
                    color="#e0e0e0"
                    side={BackSide}
                    roughness={0.8}
                />
            </mesh>
        </group>
    );
}
