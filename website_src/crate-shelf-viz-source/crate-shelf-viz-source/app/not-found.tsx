import Link from "next/link";
import { Button } from "@/components/ui/button";
import { FileQuestion } from "lucide-react";

export default function NotFound() {
    return (
        <div className="min-h-screen bg-slate-950 flex items-center justify-center p-4">
            <div className="max-w-md w-full bg-slate-900 border border-slate-800 rounded-xl p-8 text-center">
                <div className="w-16 h-16 rounded-full bg-teal-500/10 flex items-center justify-center mx-auto mb-6">
                    <FileQuestion className="w-8 h-8 text-teal-400" />
                </div>
                <h1 className="text-6xl font-bold text-white mb-2">404</h1>
                <h2 className="text-2xl font-bold text-white mb-2">Page not found</h2>
                <p className="text-slate-400 mb-6">
                    The page you're looking for doesn't exist or has been moved.
                </p>
                <Link href="/">
                    <Button className="bg-teal-600 hover:bg-teal-500 text-white">
                        Back to home
                    </Button>
                </Link>
            </div>
        </div>
    );
}
