"use client";

import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { useState } from "react";
import UnityWebGL from "@/components/UnityWebGL";

export default function SimulationPage() {
  const [activeView, setActiveView] = useState<
    | null
    | {
      id: "front" | "top" | "side";
      title: string;
      src: string;
    }
  >(null);

  const views = {
    front: {
      id: "front" as const,
      title: "Front View",
      src: "/fv.png",
    },
    top: {
      id: "top" as const,
      title: "Top View",
      src: "/tv.png",
    },
    side: {
      id: "side" as const,
      title: "Side View",
      src: "/sv.png",
    },
  };

  const handleOpenView = (viewKey: "front" | "top" | "side") => {
    setActiveView(views[viewKey]);
  };

  const handleCloseView = () => {
    setActiveView(null);
  };

  return (
    <div className="flex flex-col gap-8 p-6 lg:p-12">
      {/* Header */}
      <header className="space-y-2">
        <p className="text-[10px] font-semibold tracking-[0.35em] text-teal-400 uppercase">
          Simulation
        </p>
        <h1 className="text-3xl font-semibold text-slate-100">
          3D Warehouse Simulation
        </h1>
        <p className="max-w-2xl text-sm text-slate-400">
          Inspect the smart onion storage room from multiple angles and prepare
          for live crate-level monitoring during the demo.
        </p>
      </header>

      {/* VIEW OPTIONS / FULL VIEW TOGGLE */}
      {activeView ? (
        <section className="flex flex-col gap-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-[10px] font-semibold tracking-[0.35em] text-teal-400 uppercase">
                Active View
              </p>
              <h2 className="text-2xl font-semibold text-slate-100">
                {activeView.title}
              </h2>
            </div>
            <Button
              variant="outline"
              size="sm"
              className="border-slate-600 hover:bg-slate-800 text-slate-300"
              onClick={handleCloseView}
            >
              Back to all views
            </Button>
          </div>

          <Card className="rounded-2xl border border-slate-700/80 bg-slate-900/80 overflow-hidden w-full">
            <CardContent className="p-0">
              <div className="relative w-full min-h-[400px] lg:min-h-[550px] bg-slate-950">
                <Image
                  src={activeView.src}
                  alt={activeView.title}
                  fill
                  className="object-contain md:object-cover"
                />
              </div>
            </CardContent>
          </Card>
        </section>
      ) : (
        <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* FRONT VIEW */}
          <Card
            className="rounded-2xl border border-slate-700/60 bg-slate-900/70 overflow-hidden group hover:border-teal-500/30 transition-all duration-300 cursor-pointer"
            onClick={() => handleOpenView("front")}
          >
            <CardHeader className="pb-2">
              <CardTitle className="text-lg text-slate-200">Front View</CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <div className="relative aspect-video w-full bg-slate-950/50">
                <Image
                  src="/fv.png"
                  alt="Front View"
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>
            </CardContent>
          </Card>

          {/* TOP VIEW */}
          <Card
            className="rounded-2xl border border-slate-700/60 bg-slate-900/70 overflow-hidden group hover:border-teal-500/30 transition-all duration-300 cursor-pointer"
            onClick={() => handleOpenView("top")}
          >
            <CardHeader className="pb-2">
              <CardTitle className="text-lg text-slate-200">Top View</CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <div className="relative aspect-video w-full bg-slate-950/50">
                <Image
                  src="/tv.png"
                  alt="Top View"
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>
            </CardContent>
          </Card>

          {/* SIDE VIEW */}
          <Card
            className="rounded-2xl border border-slate-700/60 bg-slate-900/70 overflow-hidden group hover:border-teal-500/30 transition-all duration-300 cursor-pointer"
            onClick={() => handleOpenView("side")}
          >
            <CardHeader className="pb-2">
              <CardTitle className="text-lg text-slate-200">Side View</CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <div className="relative aspect-video w-full bg-slate-950/50">
                <Image
                  src="/sv.png"
                  alt="Side View"
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>
            </CardContent>
          </Card>
        </section>
      )}

      {/* MAIN 3D VIEW AREA */}
      <section className="grid gap-6 lg:grid-cols-[minmax(0,2fr)_minmax(0,1fr)]">
        {/* 3D viewer placeholder */}
        <Card className="rounded-2xl border border-slate-700/80 bg-slate-900/80 overflow-hidden h-full min-h-[500px]">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 border-b border-slate-800/50">
            <div>
              <CardTitle className="text-xl text-slate-100">Interactive 3D Warehouse</CardTitle>
              <CardDescription className="text-slate-400">
                Real-time visualization of the storage facility
              </CardDescription>
            </div>
            <Button variant="outline" size="sm" className="border-slate-600 hover:bg-slate-800 text-slate-300">
              Reload View
            </Button>
          </CardHeader>
          <CardContent className="p-0 h-[calc(100%-80px)] relative bg-slate-950">
            <div className="relative w-full h-full bg-slate-950 flex items-center justify-center">
              <video
                className="w-full h-full object-cover"
                controls
                autoPlay
                muted
                loop
                playsInline
              >
                <source src="/onion stg rec.mp4" type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            </div>
          </CardContent>
        </Card>

        {/* Right-side info panel */}
        <Card className="rounded-2xl border border-slate-700/80 bg-slate-900/80 h-full">
          <CardHeader>
            <CardTitle className="text-slate-100">Simulation Notes</CardTitle>
            <CardDescription className="text-slate-400">
              System status and active alerts
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="p-4 rounded-lg bg-teal-500/10 border border-teal-500/20">
              <h4 className="text-sm font-semibold text-teal-400 mb-1">Active Monitoring</h4>
              <p className="text-xs text-slate-300">
                Crates are mapped to sensor IDs from the ESP32 network. Real-time data is being processed.
              </p>
            </div>

            <div className="space-y-2">
              <h4 className="text-sm font-medium text-slate-300">Alert Thresholds</h4>
              <div className="flex justify-between text-xs text-slate-400 border-b border-slate-800 pb-2">
                <span>Temperature</span>
                <span className="text-rose-400">&gt; 25°C</span>
              </div>
              <div className="flex justify-between text-xs text-slate-400 border-b border-slate-800 pb-2">
                <span>Humidity</span>
                <span className="text-amber-400">&gt; 70%</span>
              </div>
              <div className="flex justify-between text-xs text-slate-400 pb-2">
                <span>Gas Levels</span>
                <span className="text-rose-400">&gt; 5ppm</span>
              </div>
            </div>

            <div className="pt-4">
              <p className="text-xs text-slate-500 italic">
                * When a crate crosses spoilage thresholds, it will highlight red in the 3D model.
              </p>
            </div>
          </CardContent>
        </Card>
      </section>
    </div>
  );
}
