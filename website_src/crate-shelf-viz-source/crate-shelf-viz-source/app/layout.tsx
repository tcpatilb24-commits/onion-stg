import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import MainLayout from "@/components/layout/MainLayout";

/**
 * Root Layout
 * 
 * This is the root layout file for the entire Next.js app.
 * It wraps all pages and provides:
 * - Font configuration (Inter font from Google)
 * - Global CSS styles with blueprint background
 * - Main layout with navbar and sidebar
 * - Dark theme by default
 */
const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "Smart Onion Storage System",
  description:
    "Advanced Onion Storage System with real-time environmental monitoring and crate-level insights.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <body className={`${inter.className} ${inter.variable} antialiased min-h-screen bg-slate-950 text-slate-100`}>
        {/* Blueprint background */}
        <div className="blueprint-bg" />

        {/* Subtle gradient overlay */}
        <div className="fixed inset-0 bg-gradient-to-br from-slate-950/80 via-slate-950/90 to-slate-950/80 -z-10" />

        {/* Main content */}
        <div className="relative z-10">
          <MainLayout>{children}</MainLayout>
        </div>
      </body>
    </html>
  );
}
