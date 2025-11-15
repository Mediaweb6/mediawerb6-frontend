import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

import AAA from "../../assets/sample1.png";
import BBB from "../../assets/sample2.png";
import CCC from "../../assets/sample3.png";

type Project = {
  id: number;
  title: string;
  subtitle?: string;
  description: string;
  tech: string[];
  img: string;
  url?: string;
  category?: string;
  features: string[];
  architecture?: string;
  performance?: string;
};

const projects: Project[] = [
  {
    id: 1,
    title: "E-Commerce Platform",
    subtitle: "Next.js 14, TypeScript, Stripe, PostgreSQL",
    description:
      "A full-stack e-commerce solution with real-time inventory management, payment processing, and admin dashboard. Built with server-side rendering for optimal SEO and performance.",
    tech: ["Next.js 14", "TypeScript", "Stripe", "PostgreSQL", "Tailwind CSS", "Prisma"],
    img: AAA,
    url: "#",
    category: "Full Stack",
    features: [
      "Real-time inventory synchronization",
      "Secure payment processing with Stripe",
      "Server-side rendering for SEO optimization",
      "Responsive design with mobile-first approach",
      "Admin dashboard with analytics",
      "Order tracking and management system"
    ],
    architecture: "Monolithic architecture with microservices for payment and email",
    performance: "Lighthouse Score: 98/100 | Load Time: 1.2s | First Contentful Paint: 0.8s"
  },
  {
    id: 2,
    title: "AI-Powered Analytics Dashboard",
    subtitle: "React, Node.js, TensorFlow.js, WebSocket",
    description:
      "Real-time analytics dashboard with machine learning predictions and live data visualization. Features advanced charting and predictive analytics for business intelligence.",
    tech: ["React", "Node.js", "TensorFlow.js", "WebSocket", "D3.js", "MongoDB"],
    img: BBB,
    url: "#",
    category: "AI/ML",
    features: [
      "Real-time data streaming with WebSocket",
      "Machine learning predictions using TensorFlow.js",
      "Interactive data visualizations with D3.js",
      "Custom chart components with zoom and pan",
      "Data export in multiple formats (CSV, JSON, PDF)",
      "Role-based access control system"
    ],
    architecture: "Event-driven architecture with real-time data pipeline",
    performance: "Handles 10K+ concurrent users | Data processing: <100ms | Real-time updates: 50ms"
  },
  {
    id: 3,
    title: "Cloud-Native SaaS Platform",
    subtitle: "Microservices, Kubernetes, AWS, GraphQL",
    description:
      "Enterprise-grade SaaS platform built with microservices architecture. Features multi-tenancy, scalable infrastructure, and comprehensive API management.",
    tech: ["Kubernetes", "Docker", "AWS", "GraphQL", "React", "Node.js"],
    img: CCC,
    url: "#",
    category: "Cloud",
    features: [
      "Multi-tenant architecture with data isolation",
      "Auto-scaling with Kubernetes HPA",
      "GraphQL API with real-time subscriptions",
      "CI/CD pipeline with GitHub Actions",
      "Comprehensive monitoring with Prometheus",
      "Disaster recovery and backup systems"
    ],
    architecture: "Microservices with API Gateway pattern",
    performance: "99.9% uptime | Auto-scales from 1 to 100 pods | Response time: <200ms"
  },
  {
    id: 4,
    title: "Mobile Banking Application",
    subtitle: "React Native, Firebase, Biometric Auth",
    description:
      "Secure mobile banking application with biometric authentication, real-time transactions, and advanced security features. Built for both iOS and Android platforms.",
    tech: ["React Native", "Firebase", "TypeScript", "Redux", "Jest", "App Center"],
    img: BBB,
    url: "#",
    category: "Mobile",
    features: [
      "Biometric authentication (Face ID, Touch ID)",
      "Real-time transaction processing",
      "Push notifications for transactions",
      "Offline mode with data synchronization",
      "End-to-end encryption",
      "Comprehensive test coverage with Jest"
    ],
    architecture: "Client-server architecture with offline-first approach",
    performance: "App size: 12MB | Cold start: 1.5s | 60 FPS animations"
  },
 
];

const categories = ["All", ...Array.from(new Set(projects.map((p) => p.category || "Other")))] as string[];

export default function ProjectsShowcase() {
  const [filter, setFilter] = useState<string>("All");
  const [selected, setSelected] = useState<Project | null>(null);
  const [visibleCount, setVisibleCount] = useState<number>(3);

  const filtered = projects.filter(
    (p) => filter === "All" || p.category === filter
  );

  const visibleProjects = filtered.slice(0, visibleCount);
  const canViewMore = visibleCount < filtered.length;

  return (
    <div className="min-h-screen py-16 px-6 md:px-12 relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0">
        {/* Gradient Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900"></div>
        
        {/* Moving Grid */}
        <div className="absolute inset-0 opacity-20 
          bg-[linear-gradient(#00ffff10_1px,transparent_1px),linear-gradient(90deg,#00ffff10_1px,transparent_1px)] 
          bg-[size:60px_60px] animate-grid-move"></div>
        
        {/* Floating Particles */}
        <div className="absolute inset-0">
          <div className="absolute top-1/4 left-1/4 w-1 h-1 bg-cyan-400 rounded-full opacity-60 animate-float-1"></div>
          <div className="absolute top-1/3 right-1/3 w-2 h-2 bg-blue-400 rounded-full opacity-40 animate-float-2"></div>
          <div className="absolute bottom-1/4 left-1/3 w-1.5 h-1.5 bg-cyan-300 rounded-full opacity-50 animate-float-3"></div>
          <div className="absolute bottom-1/3 right-1/4 w-1 h-1 bg-blue-300 rounded-full opacity-30 animate-float-4"></div>
        </div>
        
        {/* Pulse Glow */}
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-cyan-500/5 rounded-full blur-3xl animate-pulse-glow"></div>
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-white bg-clip-text text-transparent">
            Technical Portfolio
          </h1>
          <p className="text-xl text-cyan-200 max-w-3xl mx-auto leading-relaxed">
            Showcasing enterprise-grade solutions built with cutting-edge technologies, 
            scalable architectures, and performance-optimized implementations.
          </p>
        </motion.div>

        {/* Filters */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="flex justify-center flex-wrap gap-3 mb-12"
        >
          {categories.map((c) => (
            <button
              key={c}
              onClick={() => {
                setFilter(c);
                setVisibleCount(3);
              }}
              className={`px-5 py-2.5 rounded-full text-sm font-semibold transition-all duration-300 border ${
                filter === c
                  ? "bg-gradient-to-r from-cyan-500 to-blue-500 text-white shadow-lg shadow-cyan-500/25"
                  : "bg-white/10 text-cyan-200 border-cyan-500/30 hover:bg-cyan-500/20 hover:border-cyan-400 backdrop-blur-sm"
              }`}
            >
              {c}
            </button>
          ))}
        </motion.div>

        {/* Grid */}
        <motion.div
          layout
          className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8"
        >
          <AnimatePresence>
            {visibleProjects.map((p, i) => (
              <motion.div
                key={p.id}
                initial={{ opacity: 0, y: 30, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ delay: i * 0.1, duration: 0.5 }}
                whileHover={{ y: -5, transition: { duration: 0.2 } }}
                className="group relative bg-gradient-to-br from-slate-800/50 to-blue-900/30 rounded-2xl overflow-hidden shadow-2xl border border-cyan-500/20 backdrop-blur-sm"
              >
                {/* Project Image */}
                <div className="relative overflow-hidden">
                  <img
                    src={p.img}
                    alt={p.title}
                    className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 to-transparent"></div>
                  <div className="absolute bottom-4 left-4">
                    <span className="px-3 py-1 bg-cyan-500/20 backdrop-blur-sm text-cyan-300 text-xs font-medium rounded-full border border-cyan-500/30">
                      {p.category}
                    </span>
                  </div>
                </div>

                {/* Project Content */}
                <div className="p-6">
                  <h3 className="text-xl font-bold text-white mb-2 group-hover:text-cyan-300 transition-colors">
                    {p.title}
                  </h3>
                  <p className="text-cyan-200 text-sm mb-3 font-medium">
                    {p.subtitle}
                  </p>
                  <p className="text-gray-300 text-sm mb-4 line-clamp-2">
                    {p.description}
                  </p>

                  {/* Tech Stack */}
                  <div className="mb-4">
                    <div className="flex flex-wrap gap-2">
                      {p.tech.slice(0, 4).map((t) => (
                        <span
                          key={t}
                          className="text-xs font-medium px-2.5 py-1 rounded-full bg-cyan-500/10 text-cyan-300 border border-cyan-500/20"
                        >
                          {t}
                        </span>
                      ))}
                      {p.tech.length > 4 && (
                        <span className="text-xs font-medium px-2.5 py-1 rounded-full bg-blue-500/10 text-blue-300 border border-blue-500/20">
                          +{p.tech.length - 4} more
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex justify-between items-center">
                    <button
                      onClick={() => setSelected(p)}
                      className="px-4 py-2 rounded-lg bg-gradient-to-r from-cyan-500/20 to-blue-500/20 text-cyan-300 border border-cyan-500/30 hover:from-cyan-500/30 hover:to-blue-500/30 hover:text-white transition-all duration-300 font-medium text-sm"
                    >
                      Technical Details
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* View More Button */}
        {canViewMore && (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="text-center mt-12"
          >
            <button
              onClick={() => setVisibleCount((prev) => prev + 3)}
              className="px-8 py-3 rounded-full bg-gradient-to-r from-cyan-500 to-blue-500 text-white font-semibold shadow-lg shadow-cyan-500/25 hover:shadow-cyan-500/40 hover:scale-105 transition-all duration-300"
            >
              Load More Projects
            </button>
          </motion.div>
        )}

        {/* Technical Details Modal */}
        <AnimatePresence>
          {selected && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 md:p-6"
              onClick={() => setSelected(null)}
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
                onClick={(e) => e.stopPropagation()}
                className="max-w-4xl w-full max-h-[90vh] overflow-y-auto bg-gradient-to-br from-slate-900 to-blue-900 rounded-2xl shadow-2xl border border-cyan-500/30"
              >
                {/* Modal Header */}
                <div className="relative">
                  <img
                    src={selected.img}
                    alt={selected.title}
                    className="w-full h-64 object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900 to-transparent"></div>
                  <div className="absolute bottom-4 left-6">
                    <span className="px-3 py-1 bg-cyan-500/20 backdrop-blur-sm text-cyan-300 text-sm font-medium rounded-full border border-cyan-500/30">
                      {selected.category}
                    </span>
                  </div>
                  <button
                    onClick={() => setSelected(null)}
                    className="absolute top-4 right-4 w-8 h-8 rounded-full bg-black/50 text-white hover:bg-red-500/80 transition-colors flex items-center justify-center"
                  >
                    ✕
                  </button>
                </div>

                {/* Modal Content */}
                <div className="p-6 md:p-8">
                  <div className="mb-6">
                    <h2 className="text-2xl md:text-3xl font-bold text-white mb-2">
                      {selected.title}
                    </h2>
                    {selected.subtitle && (
                      <p className="text-cyan-300 text-lg font-medium">
                        {selected.subtitle}
                      </p>
                    )}
                  </div>

                  <p className="text-gray-300 text-base leading-relaxed mb-6">
                    {selected.description}
                  </p>

                  {/* Architecture & Performance */}
                  <div className="grid md:grid-cols-2 gap-6 mb-6">
                    {selected.architecture && (
                      <div className="bg-slate-800/50 rounded-xl p-4 border border-cyan-500/20">
                        <h3 className="text-cyan-300 font-semibold mb-2">Architecture</h3>
                        <p className="text-gray-300 text-sm">{selected.architecture}</p>
                      </div>
                    )}
                    {selected.performance && (
                      <div className="bg-slate-800/50 rounded-xl p-4 border border-blue-500/20">
                        <h3 className="text-blue-300 font-semibold mb-2">Performance</h3>
                        <p className="text-gray-300 text-sm">{selected.performance}</p>
                      </div>
                    )}
                  </div>

                  {/* Technical Features */}
                  <div className="mb-6">
                    <h3 className="text-xl font-semibold text-white mb-4">Key Features</h3>
                    <div className="grid md:grid-cols-2 gap-3">
                      {selected.features.map((feature, index) => (
                        <div key={index} className="flex items-start space-x-3">
                          <div className="w-2 h-2 bg-cyan-400 rounded-full mt-2 flex-shrink-0"></div>
                          <span className="text-gray-300 text-sm">{feature}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Tech Stack */}
                  <div>
                    <h3 className="text-xl font-semibold text-white mb-4">Technology Stack</h3>
                    <div className="flex flex-wrap gap-2">
                      {selected.tech.map((t) => (
                        <span
                          key={t}
                          className="px-3 py-1.5 rounded-full bg-gradient-to-r from-cyan-500/20 to-blue-500/20 text-cyan-300 border border-cyan-500/30 text-sm font-medium"
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Custom Animations */}
      <style>
        {`
          @keyframes grid-move {
            0% { transform: translate(0, 0); }
            100% { transform: translate(60px, 60px); }
          }
          
          @keyframes float-1 {
            0%, 100% { transform: translate(0, 0) scale(1); }
            50% { transform: translate(20px, -20px) scale(1.2); }
          }
          
          @keyframes float-2 {
            0%, 100% { transform: translate(0, 0) scale(1); }
            50% { transform: translate(-15px, 15px) scale(1.1); }
          }
          
          @keyframes float-3 {
            0%, 100% { transform: translate(0, 0) scale(1); }
            50% { transform: translate(10px, 20px) scale(1.3); }
          }
          
          @keyframes float-4 {
            0%, 100% { transform: translate(0, 0) scale(1); }
            50% { transform: translate(-20px, -10px) scale(1.1); }
          }
          
          @keyframes pulse-glow {
            0%, 100% { opacity: 0.1; transform: translate(-50%, -50%) scale(1); }
            50% { opacity: 0.15; transform: translate(-50%, -50%) scale(1.1); }
          }
          
          .animate-grid-move {
            animation: grid-move 20s linear infinite;
          }
          
          .animate-float-1 {
            animation: float-1 8s ease-in-out infinite;
          }
          
          .animate-float-2 {
            animation: float-2 12s ease-in-out infinite;
          }
          
          .animate-float-3 {
            animation: float-3 10s ease-in-out infinite;
          }
          
          .animate-float-4 {
            animation: float-4 14s ease-in-out infinite;
          }
          
          .animate-pulse-glow {
            animation: pulse-glow 6s ease-in-out infinite;
          }
        `}
      </style>
    </div>
  );
}