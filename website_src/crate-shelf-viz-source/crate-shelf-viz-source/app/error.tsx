"use client";

import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { AlertTriangle } from "lucide-react";

export default function Error({
    error,
    reset,
}: {
    error: Error & { digest?: string };
    reset: () => void;
}) {
    useEffect(() => {
        console.error("Application error:", error);
    }, [error]);

    return (
        <div className="min-h-screen bg-slate-950 flex items-center justify-center p-4">
            <div className="max-w-md w-full bg-slate-900 border border-slate-800 rounded-xl p-8 text-center">
                <div className="w-16 h-16 rounded-full bg-red-500/10 flex items-center justify-center mx-auto mb-6">
                    <AlertTriangle className="w-8 h-8 text-red-400" />
                </div>
                <h2 className="text-2xl font-bold text-white mb-2">
                    Something went wrong
                </h2>
                <p className="text-slate-400 mb-6">
                    An unexpected error occurred. Please try again.
                </p>
                {error.message && (
                    <div className="bg-slate-950 border border-slate-800 rounded-lg p-4 mb-6 text-left">
                        <p className="text-sm text-slate-300 font-mono break-all">
                            {error.message}
                        </p>
                    </div>
                )}
                <div className="flex gap-4 justify-center">
                    <Button
                        onClick={reset}
                        className="bg-teal-600 hover:bg-teal-500 text-white"
                    >
                        Try again
                    </Button>
                    <Button
                        onClick={() => (window.location.href = "/")}
                        variant="outline"
                        className="border-slate-700 text-slate-300 hover:bg-slate-800"
                    >
                        Go home
                    </Button>
                </div>
            </div>
        </div>
    );
}
