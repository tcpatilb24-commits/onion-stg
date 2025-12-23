"use client";

import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";

export interface ShelfConfig {
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

interface ControlsPanelProps {
    config: ShelfConfig;
    onConfigChange: (newConfig: ShelfConfig) => void;
}

export default function ControlsPanel({
    config,
    onConfigChange,
}: ControlsPanelProps) {
    const handleChange = (key: keyof ShelfConfig, value: number) => {
        onConfigChange({ ...config, [key]: value });
    };

    return (
        <Card className="w-full md:w-80 h-fit overflow-y-auto max-h-screen">
            <CardHeader>
                <CardTitle>Shelf Controls</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
                {/* Rows */}
                <div className="space-y-2">
                    <div className="flex justify-between">
                        <Label htmlFor="rows">Rows: {config.rows}</Label>
                    </div>
                    <Slider
                        id="rows"
                        min={1}
                        max={20}
                        step={1}
                        value={[config.rows]}
                        onValueChange={(vals) => handleChange("rows", vals[0])}
                    />
                </div>

                {/* Columns */}
                <div className="space-y-2">
                    <div className="flex justify-between">
                        <Label htmlFor="columns">Columns: {config.columns}</Label>
                    </div>
                    <Slider
                        id="columns"
                        min={1}
                        max={20}
                        step={1}
                        value={[config.columns]}
                        onValueChange={(vals) => handleChange("columns", vals[0])}
                    />
                </div>

                {/* Crate Size */}
                <div className="space-y-2">
                    <Label htmlFor="crateSize">Crate Size</Label>
                    <Input
                        id="crateSize"
                        type="number"
                        step="0.1"
                        value={config.crateSize}
                        onChange={(e) =>
                            handleChange("crateSize", parseFloat(e.target.value) || 0)
                        }
                    />
                </div>

                {/* Horizontal Spacing */}
                <div className="space-y-2">
                    <Label htmlFor="horizontalSpacing">Horizontal Spacing</Label>
                    <Input
                        id="horizontalSpacing"
                        type="number"
                        step="0.1"
                        value={config.horizontalSpacing}
                        onChange={(e) =>
                            handleChange("horizontalSpacing", parseFloat(e.target.value) || 0)
                        }
                    />
                </div>

                {/* Vertical Spacing */}
                <div className="space-y-2">
                    <Label htmlFor="verticalSpacing">Vertical Spacing</Label>
                    <Input
                        id="verticalSpacing"
                        type="number"
                        step="0.1"
                        value={config.verticalSpacing}
                        onChange={(e) =>
                            handleChange("verticalSpacing", parseFloat(e.target.value) || 0)
                        }
                    />
                </div>

                {/* Depth Offset */}
                <div className="space-y-2">
                    <Label htmlFor="depthOffset">Depth Offset</Label>
                    <Input
                        id="depthOffset"
                        type="number"
                        step="0.1"
                        value={config.depthOffset}
                        onChange={(e) =>
                            handleChange("depthOffset", parseFloat(e.target.value) || 0)
                        }
                    />
                </div>

                <div className="border-t border-slate-200 dark:border-slate-800 my-4" />
                <h3 className="font-semibold text-sm text-slate-500">Crate Details</h3>

                {/* Wood Thickness */}
                <div className="space-y-2">
                    <Label htmlFor="woodThickness">Wood Thickness</Label>
                    <Input
                        id="woodThickness"
                        type="number"
                        step="0.01"
                        value={config.woodThickness}
                        onChange={(e) =>
                            handleChange("woodThickness", parseFloat(e.target.value) || 0)
                        }
                    />
                </div>

                {/* Side Slat Count */}
                <div className="space-y-2">
                    <div className="flex justify-between">
                        <Label htmlFor="sideSlatCount">Side Slats: {config.sideSlatCount}</Label>
                    </div>
                    <Slider
                        id="sideSlatCount"
                        min={1}
                        max={10}
                        step={1}
                        value={[config.sideSlatCount]}
                        onValueChange={(vals) => handleChange("sideSlatCount", vals[0])}
                    />
                </div>

                {/* Bottom Slat Count */}
                <div className="space-y-2">
                    <div className="flex justify-between">
                        <Label htmlFor="bottomSlatCount">Bottom Slats: {config.bottomSlatCount}</Label>
                    </div>
                    <Slider
                        id="bottomSlatCount"
                        min={1}
                        max={10}
                        step={1}
                        value={[config.bottomSlatCount]}
                        onValueChange={(vals) => handleChange("bottomSlatCount", vals[0])}
                    />
                </div>

                <div className="border-t border-slate-200 dark:border-slate-800 my-4" />
                <h3 className="font-semibold text-sm text-slate-500">Appearance</h3>

                {/* Show Plates */}
                <div className="flex items-center space-x-2">
                    <Input
                        id="showPlates"
                        type="checkbox"
                        className="w-4 h-4"
                        checked={config.showPlates}
                        onChange={(e) =>
                            // @ts-ignore - Checkbox input handling
                            onConfigChange({ ...config, showPlates: e.target.checked })
                        }
                    />
                    <Label htmlFor="showPlates">Show Metal Plates</Label>
                </div>

                {/* Wood Color */}
                <div className="space-y-2">
                    <Label htmlFor="woodColor">Wood Color</Label>
                    <div className="flex gap-2">
                        <Input
                            id="woodColor"
                            type="color"
                            className="w-12 h-10 p-1"
                            value={config.woodColor}
                            onChange={(e) =>
                                // @ts-ignore
                                onConfigChange({ ...config, woodColor: e.target.value })
                            }
                        />
                        <Input
                            type="text"
                            value={config.woodColor}
                            onChange={(e) =>
                                // @ts-ignore
                                onConfigChange({ ...config, woodColor: e.target.value })
                            }
                        />
                    </div>
                </div>

                {/* Plate Color */}
                {config.showPlates && (
                    <div className="space-y-2">
                        <Label htmlFor="plateColor">Plate Color</Label>
                        <div className="flex gap-2">
                            <Input
                                id="plateColor"
                                type="color"
                                className="w-12 h-10 p-1"
                                value={config.plateColor}
                                onChange={(e) =>
                                    // @ts-ignore
                                    onConfigChange({ ...config, plateColor: e.target.value })
                                }
                            />
                            <Input
                                type="text"
                                value={config.plateColor}
                                onChange={(e) =>
                                    // @ts-ignore
                                    onConfigChange({ ...config, plateColor: e.target.value })
                                }
                            />
                        </div>
                    </div>
                )}
            </CardContent>
        </Card>
    );
}
