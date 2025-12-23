"use client";

import { useEffect, useRef, useState } from "react";

interface UnityWebGLProps {
    buildUrl?: string;
    loaderUrl?: string;
    dataUrl?: string;
    frameworkUrl?: string;
    codeUrl?: string;
    width?: string | number;
    height?: string | number;
    className?: string;
}

declare global {
    interface Window {
        createUnityInstance: (
            canvas: HTMLCanvasElement,
            config: any,
            onProgress?: (progress: number) => void
        ) => Promise<any>;
    }
}

export default function UnityWebGL({
    buildUrl = "/unity/Build",
    loaderUrl = "/unity/Build/Dev.loader.js",
    dataUrl = "/unity/Build/Dev.data",
    frameworkUrl = "/unity/Build/Dev.framework.js",
    codeUrl = "/unity/Build/Dev.wasm",
    width = "100%",
    height = "100%",
    className = "",
}: UnityWebGLProps) {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const unityInstanceRef = useRef<any>(null);
    const [loadingProgress, setLoadingProgress] = useState(0);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        let scriptElement: HTMLScriptElement | null = null;

        const loadUnity = async () => {
            if (!canvasRef.current) return;

            try {
                // Load Unity loader script
                scriptElement = document.createElement("script");
                scriptElement.src = loaderUrl;

                scriptElement.onload = () => {
                    if (!canvasRef.current) return;

                    const config = {
                        dataUrl,
                        frameworkUrl,
                        codeUrl,
                        companyName: "DefaultCompany",
                        productName: "MyProject",
                        productVersion: "0.1.0",
                    };

                    console.log("Initializing Unity with config:", config);
                    console.log("Loader URL:", loaderUrl);

                    window
                        .createUnityInstance(canvasRef.current, config, (progress) => {
                            setLoadingProgress(Math.round(progress * 100));
                        })
                        .then((unityInstance) => {
                            unityInstanceRef.current = unityInstance;
                            setIsLoading(false);
                            console.log("Unity instance loaded successfully");
                        })
                        .catch((message) => {
                            setError(message);
                            setIsLoading(false);
                            console.error("Unity load error:", message);
                        });
                };

                scriptElement.onerror = () => {
                    setError("Failed to load Unity loader script");
                    setIsLoading(false);
                };

                document.body.appendChild(scriptElement);
            } catch (err) {
                setError(err instanceof Error ? err.message : "Unknown error");
                setIsLoading(false);
            }
        };

        loadUnity();

        // Cleanup
        return () => {
            if (unityInstanceRef.current) {
                unityInstanceRef.current.Quit().then(() => {
                    console.log("Unity instance cleaned up");
                });
            }
            if (scriptElement && scriptElement.parentNode) {
                scriptElement.parentNode.removeChild(scriptElement);
            }
        };
    }, [loaderUrl, dataUrl, frameworkUrl, codeUrl]);

    return (
        <div
            className={`relative ${className}`}
            style={{ width, height, minHeight: "500px" }}
        >
            <canvas
                id="unity-canvas"
                ref={canvasRef}
                className="w-full h-full"
                style={{
                    display: isLoading ? "none" : "block",
                    background: "#000",
                }}
            />

            {isLoading && (
                <div className="absolute inset-0 flex flex-col items-center justify-center bg-slate-950 text-slate-300">
                    <div className="w-64 space-y-4">
                        <div className="flex items-center justify-between text-sm">
                            <span>Loading Unity WebGL...</span>
                            <span className="font-mono">{loadingProgress}%</span>
                        </div>
                        <div className="w-full h-2 bg-slate-800 rounded-full overflow-hidden">
                            <div
                                className="h-full bg-teal-500 transition-all duration-300"
                                style={{ width: `${loadingProgress}%` }}
                            />
                        </div>
                    </div>
                </div>
            )}

            {error && (
                <div className="absolute inset-0 flex items-center justify-center bg-slate-950 text-rose-400 p-4">
                    <div className="text-center space-y-2">
                        <p className="font-semibold">Failed to load Unity WebGL</p>
                        <p className="text-sm text-slate-400">{error}</p>
                    </div>
                </div>
            )}
        </div>
    );
}
