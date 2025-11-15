import React from "react";

import logo1 from "../../assets/sample6.png";
import logo2 from "../../assets/Chandra Concept logo.png";
import logo3 from "../../assets/Sarswathi Printer logo.png";
import logo4 from "../../assets/Chandra Ads logo.png";
import logo5 from "../../assets/Chandra Digital S.png";
import logo6 from "../../assets/Sth Ree.png";
import logo7 from "../../assets/Join Hands.png";

const clients = [
  { name: "Vanakam City Xpress", logo: logo1 },
  { name: "Chandra Concept", logo: logo2 },
  { name: "Sarswathi Printers", logo: logo3 },
  { name: "Chandra Ads & Events", logo: logo4 },
  { name: "Digital Signage", logo: logo5 },
  { name: "Sth Ree", logo: logo6 },
  { name: "Join Hands", logo: logo7 },
];

const ClientMarquee: React.FC = () => {
  return (
    <section className="w-full py-20 overflow-hidden relative">
      {/* Animated Background */}
      <div className="absolute inset-0">
        {/* Animated Gradient Background */}
        <div className="absolute inset-0 bg-gradient-to-br
from-[#06142E]
to-[#0A1A3A]
animate-gradient-x"></div>
        
        {/* Moving Grid Pattern */}
        <div className="absolute inset-0 opacity-20 
          bg-[linear-gradient(#00ffff10_1px,transparent_1px),linear-gradient(90deg,#00ffff10_1px,transparent_1px)] 
          bg-[size:60px_60px] animate-grid-move"></div>
        
        {/* Floating Particles */}
        <div className="absolute inset-0">
          <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-cyan-400 rounded-full opacity-60 animate-float-1"></div>
          <div className="absolute top-1/3 right-1/3 w-1 h-1 bg-blue-400 rounded-full opacity-40 animate-float-2"></div>
          <div className="absolute bottom-1/4 left-1/3 w-1.5 h-1.5 bg-cyan-300 rounded-full opacity-50 animate-float-3"></div>
          <div className="absolute bottom-1/3 right-1/4 w-1 h-1 bg-blue-300 rounded-full opacity-30 animate-float-4"></div>
        </div>
        
        {/* Pulse Glow Effect */}
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-cyan-500/5 rounded-full blur-3xl animate-pulse-glow"></div>
      </div>
      
      <div className="text-center mb-16 relative z-10">
        <h3 className="text-5xl md:text-6xl font-bold text-white mb-6 bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
          Our Clients
        </h3>
        <p className="text-cyan-300 text-lg md:text-xl font-light">Trusted by industry leaders and innovative brands</p>
      </div>

      {/* Single Marquee Container - Only Top Row */}
      <div className="relative w-full overflow-hidden">
        {/* Marquee - Moving Right to Left */}
        <div className="flex">
          <div className="flex animate-marquee-slow gap-16 py-8">
            {[...clients, ...clients].map((client, index) => (
              <div key={`first-${index}`} className="flex flex-col items-center group">
                <div className="flex items-center justify-center w-48 h-48 rounded-3xl border-2 border-cyan-500/30 bg-gradient-to-br from-cyan-500/10 to-blue-500/10 shadow-2xl backdrop-blur-sm transform transition-all duration-500 hover:scale-110 hover:border-cyan-400 hover:shadow-cyan-400/40 hover:bg-gradient-to-br hover:from-cyan-500/20 hover:to-blue-500/20">
                  <img
                    src={client.logo}
                    alt={client.name}
                    className="max-w-[8rem] max-h-[8rem] object-contain filter group-hover:brightness-110 transition-all duration-500"
                  />
                </div>
                <span className="text-white text-base font-medium mt-4 text-center w-48 opacity-80 group-hover:opacity-100 transition-opacity duration-300">
                  {client.name}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Gradient Fade Edges */}
      <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-[#0f172a] to-transparent z-20 pointer-events-none"></div>
      <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-[#0f172a] to-transparent z-20 pointer-events-none"></div>

      {/* Custom CSS Animations */}
      <style>
        {`
          @keyframes marquee-slow {
            0% { transform: translateX(0); }
            100% { transform: translateX(calc(-100% / 2)); }
          }
          
          @keyframes gradient-x {
            0%, 100% { background-position: 0% 50%; }
            50% { background-position: 100% 50%; }
          }
          
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
          
          .animate-marquee-slow {
            display: flex;
            width: max-content;
            animation: marquee-slow 40s linear infinite;
          }
          
          .animate-gradient-x {
            background-size: 200% 200%;
            animation: gradient-x 15s ease infinite;
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
          
          /* Pause animation on hover */
          .animate-marquee-slow:hover {
            animation-play-state: paused;
          }
        `}
      </style>
    </section>
  );
};

export default ClientMarquee;