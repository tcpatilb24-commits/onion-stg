"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowRight, Github, Code, Users } from "lucide-react";
import Image from "next/image";

/**
 * About Page
 * 
 * This page provides information about the project, team, and technology stack.
 * Perfect for a hackathon demo to showcase what you've built.
 */
export default function About() {
  return (
    <div className="space-y-6 max-w-4xl">
      {/* Page Header */}
      <div>
        <h1 className="text-3xl font-bold tracking-tight">About the Project</h1>
        <p className="text-muted-foreground">
          Smart India Hackathon - Crate Shelf Visualization System
        </p>
      </div>

      {/* Project Overview */}
      <Card>
        <CardHeader>
          <CardTitle>Project Overview</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4 text-muted-foreground">
          <p>
            This application provides an interactive 3D visualization system for crate shelf
            arrangements. It allows users to define shelf configurations using a matrix-based
            approach and visualize them in real-time using WebGL and React Three Fiber.
          </p>
          <p>
            The system is designed to help warehouse managers, logistics professionals, and
            inventory planners optimize shelf space utilization and visualize different
            arrangement patterns.
          </p>

          {/* Our Solution Subsection */}
          <div
            id="our-solution"
            className="mt-6 pt-6 border-t border-border scroll-mt-24"
          >
            <h3 className="text-lg font-semibold text-foreground mb-3 flex items-center gap-2">
              <span className="w-1 h-6 bg-gradient-to-b from-teal-500 to-cyan-500 rounded-full"></span>
              Our Solution
            </h3>
            <div className="space-y-3 pl-3">
              <p className="text-muted-foreground">
                Our innovative smart crate monitoring system revolutionizes warehouse management through cutting-edge technology and real-time data insights.
              </p>
              <ul className="space-y-2 text-sm">
                <li className="flex items-start gap-2">
                  <span className="text-teal-500 mt-1">•</span>
                  <span><strong className="text-foreground">Real-time monitoring:</strong> Track storage conditions across your entire facility with live updates and instant alerts</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-teal-500 mt-1">•</span>
                  <span><strong className="text-foreground">Crate-level sensors:</strong> Environmental sensors deployed at individual crate level for precise temperature, humidity, and air quality monitoring</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-teal-500 mt-1">•</span>
                  <span><strong className="text-foreground">3D visualization:</strong> Interactive three-dimensional representation of your storage facility for intuitive navigation and analysis</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-teal-500 mt-1">•</span>
                  <span><strong className="text-foreground">Early warning system:</strong> Proactive alerts for potential spoilage issues before they become critical, reducing waste and protecting inventory value</span>
                </li>
              </ul>
              <p className="text-muted-foreground mt-3">
                By combining IoT sensors, advanced analytics, and immersive visualization, we help businesses optimize their storage operations, reduce losses, and maintain product quality throughout the supply chain.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>


      {/* Team Section - MOVED UP */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Users className="h-5 w-5" />
            Team
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div>
            <p className="text-muted-foreground mb-8">
              Developed by the Smart India Hackathon Team - <span className="font-semibold text-foreground">GROUNDZERO</span>. This project demonstrates
              modern web development practices and 3D visualization capabilities.
            </p>

            <div className="mb-6">
              <h3 className="text-xl font-bold mb-2 bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent">
                Meet Our Team
              </h3>
              <p className="text-sm text-muted-foreground">Passionate innovators building the future</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* Team Member 1 - Leader */}
              <div className="group relative">
                <div className="absolute -inset-0.5 bg-gradient-to-r from-primary to-purple-600 rounded-2xl opacity-75 group-hover:opacity-100 transition duration-300 blur"></div>
                <div className="relative bg-background rounded-2xl p-6 transition-all duration-300 hover:shadow-xl">
                  <div className="flex flex-col items-center text-center">
                    <div className="relative mb-4">
                      <div className="w-32 h-32 bg-gradient-to-br from-primary/20 to-purple-600/20 rounded-2xl overflow-hidden border-2 border-primary/30 shadow-lg group-hover:scale-105 transition-transform duration-300">
                        <Image
                          src="/prajwal.jpg"
                          alt="Prajwal Joshi"
                          width={128}
                          height={128}
                          className="object-cover w-full h-full"
                        />
                      </div>
                      <div className="absolute -top-2 -right-2 bg-primary text-primary-foreground text-xs font-bold px-2 py-1 rounded-full shadow-md">
                        Leader
                      </div>
                    </div>
                    <h4 className="font-bold text-lg mb-1">Prajwal Joshi</h4>
                    <p className="text-sm text-primary font-medium">Team Leader</p>
                  </div>
                </div>
              </div>

              {/* Team Member 2 */}
              <div className="group relative">
                <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-2xl opacity-0 group-hover:opacity-75 transition duration-300 blur"></div>
                <div className="relative bg-background rounded-2xl p-6 border border-border hover:border-primary/50 transition-all duration-300 hover:shadow-xl">
                  <div className="flex flex-col items-center text-center">
                    <div className="mb-4">
                      <div className="w-32 h-32 bg-gradient-to-br from-blue-500/10 to-cyan-500/10 rounded-2xl overflow-hidden border-2 border-border group-hover:border-blue-500/50 shadow-md group-hover:scale-105 transition-transform duration-300">
                        <Image
                          src="/Heramb.jpg"
                          alt="Heramb Dhawale"
                          width={128}
                          height={128}
                          className="object-cover w-full h-full"
                        />
                      </div>
                    </div>
                    <h4 className="font-bold text-lg mb-1">Heramb Dhawale</h4>
                    <p className="text-sm text-muted-foreground">Team Member</p>
                  </div>
                </div>
              </div>

              {/* Team Member 3 */}
              <div className="group relative">
                <div className="absolute -inset-0.5 bg-gradient-to-r from-pink-500 to-rose-500 rounded-2xl opacity-0 group-hover:opacity-75 transition duration-300 blur"></div>
                <div className="relative bg-background rounded-2xl p-6 border border-border hover:border-primary/50 transition-all duration-300 hover:shadow-xl">
                  <div className="flex flex-col items-center text-center">
                    <div className="mb-4">
                      <div className="w-32 h-32 bg-gradient-to-br from-pink-500/10 to-rose-500/10 rounded-2xl overflow-hidden border-2 border-border group-hover:border-pink-500/50 shadow-md group-hover:scale-105 transition-transform duration-300">
                        <Image
                          src="/manjusha.jpg"
                          alt="Manjusha Gore"
                          width={128}
                          height={128}
                          className="object-cover w-full h-full"
                        />
                      </div>
                    </div>
                    <h4 className="font-bold text-lg mb-1">Manjusha Gore</h4>
                    <p className="text-sm text-muted-foreground">Team Member</p>
                  </div>
                </div>
              </div>

              {/* Team Member 4 */}
              <div className="group relative">
                <div className="absolute -inset-0.5 bg-gradient-to-r from-green-500 to-emerald-500 rounded-2xl opacity-0 group-hover:opacity-75 transition duration-300 blur"></div>
                <div className="relative bg-background rounded-2xl p-6 border border-border hover:border-primary/50 transition-all duration-300 hover:shadow-xl">
                  <div className="flex flex-col items-center text-center">
                    <div className="mb-4">
                      <div className="w-32 h-32 bg-gradient-to-br from-green-500/10 to-emerald-500/10 rounded-2xl flex items-center justify-center border-2 border-border group-hover:border-green-500/50 shadow-md group-hover:scale-105 transition-transform duration-300">
                        <span className="text-muted-foreground text-xs font-medium">Image</span>
                      </div>
                    </div>
                    <h4 className="font-bold text-lg mb-1">Tejas Patil</h4>
                    <p className="text-sm text-muted-foreground">Team Member</p>
                  </div>
                </div>
              </div>

              {/* Team Member 5 */}
              <div className="group relative">
                <div className="absolute -inset-0.5 bg-gradient-to-r from-orange-500 to-amber-500 rounded-2xl opacity-0 group-hover:opacity-75 transition duration-300 blur"></div>
                <div className="relative bg-background rounded-2xl p-6 border border-border hover:border-primary/50 transition-all duration-300 hover:shadow-xl">
                  <div className="flex flex-col items-center text-center">
                    <div className="mb-4">
                      <div className="w-32 h-32 bg-gradient-to-br from-orange-500/10 to-amber-500/10 rounded-2xl overflow-hidden border-2 border-border group-hover:border-orange-500/50 shadow-md group-hover:scale-105 transition-transform duration-300">
                        <Image
                          src="/nilakshi.jpg"
                          alt="Nilakshi Labhade"
                          width={128}
                          height={128}
                          className="object-cover w-full h-full"
                        />
                      </div>
                    </div>
                    <h4 className="font-bold text-lg mb-1">Nilakshi Labhade</h4>
                    <p className="text-sm text-muted-foreground">Team Member</p>
                  </div>
                </div>
              </div>

              {/* Team Member 6 */}
              <div className="group relative">
                <div className="absolute -inset-0.5 bg-gradient-to-r from-violet-500 to-indigo-500 rounded-2xl opacity-0 group-hover:opacity-75 transition duration-300 blur"></div>
                <div className="relative bg-background rounded-2xl p-6 border border-border hover:border-primary/50 transition-all duration-300 hover:shadow-xl">
                  <div className="flex flex-col items-center text-center">
                    <div className="mb-4">
                      <div className="w-32 h-32 bg-gradient-to-br from-violet-500/10 to-indigo-500/10 rounded-2xl flex items-center justify-center border-2 border-border group-hover:border-violet-500/50 shadow-md group-hover:scale-105 transition-transform duration-300">
                        <span className="text-muted-foreground text-xs font-medium">Image</span>
                      </div>
                    </div>
                    <h4 className="font-bold text-lg mb-1">Tanmay Shinde</h4>
                    <p className="text-sm text-muted-foreground">Team Member</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Contact Information Section */}
      <Card className="bg-gradient-to-br from-slate-900/70 to-slate-900/50 border-slate-800">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <div className="w-1 h-6 bg-gradient-to-b from-teal-500 to-cyan-500 rounded-full"></div>
            For Further Information
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground mb-6">
            Have questions about our project or want to learn more? Feel free to reach out to us!
          </p>
          <div className="grid gap-4 md:grid-cols-2">
            <div className="flex items-start gap-3 p-4 rounded-lg bg-slate-800/50 border border-slate-700/50 hover:border-teal-500/30 transition-all duration-300">
              <div className="w-10 h-10 rounded-lg bg-teal-500/10 flex items-center justify-center flex-shrink-0">
                <svg className="w-5 h-5 text-teal-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <div>
                <h4 className="font-semibold text-sm text-slate-200 mb-1">Email Us</h4>
                <a href="mailto:groundzero.sih@example.com" className="text-sm text-teal-400 hover:text-teal-300 transition-colors">
                  groundzero.sih@example.com
                </a>
              </div>
            </div>

            <div className="flex items-start gap-3 p-4 rounded-lg bg-slate-800/50 border border-slate-700/50 hover:border-teal-500/30 transition-all duration-300">
              <div className="w-10 h-10 rounded-lg bg-teal-500/10 flex items-center justify-center flex-shrink-0">
                <svg className="w-5 h-5 text-teal-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
              </div>
              <div>
                <h4 className="font-semibold text-sm text-slate-200 mb-1">Contact Number</h4>
                <a href="tel:+911234567890" className="text-sm text-teal-400 hover:text-teal-300 transition-colors">
                  +91 1234 567 890
                </a>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Technology Stack */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Code className="h-5 w-5" />
            Technology Stack
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <h3 className="font-semibold mb-2">Frontend</h3>
              <ul className="space-y-1 text-sm text-muted-foreground">
                <li>• Next.js 16 (App Router)</li>
                <li>• React 19</li>
                <li>• TypeScript</li>
                <li>• Tailwind CSS</li>
                <li>• shadcn/ui</li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-2">3D Visualization</h3>
              <ul className="space-y-1 text-sm text-muted-foreground">
                <li>• React Three Fiber</li>
                <li>• Three.js</li>
                <li>• @react-three/drei</li>
                <li>• WebGL</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Features */}
      <Card>
        <CardHeader>
          <CardTitle>Key Features</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="space-y-2">
            <li className="flex items-start gap-2">
              <ArrowRight className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
              <span>Interactive 3D visualization with mouse controls (rotate, zoom, pan)</span>
            </li>
            <li className="flex items-start gap-2">
              <ArrowRight className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
              <span>Matrix-based configuration system for flexible arrangements</span>
            </li>
            <li className="flex items-start gap-2">
              <ArrowRight className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
              <span>Real-time updates when matrix changes</span>
            </li>
            <li className="flex items-start gap-2">
              <ArrowRight className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
              <span>Responsive design for desktop and mobile devices</span>
            </li>
            <li className="flex items-start gap-2">
              <ArrowRight className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
              <span>Modern UI with shadcn/ui components</span>
            </li>
          </ul>
        </CardContent>
      </Card>

      {/* Quick Links */}
      <div className="flex gap-4">
        <Link href="/simulation">
          <Button>
            Try Simulation
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </Link>
        <Link href="/dashboard">
          <Button variant="outline">
            View Dashboard
          </Button>
        </Link>
      </div>
    </div>
  );
}
