import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import gsap from "gsap";
import { ArrowRight, ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

// Example images
import webImg from "../../assets/sample1.png";
import seoImg from "../../assets/sample2.png";
import graphicImg from "../../assets/sample3.png";
import mobileImg from "../../assets/sample4.png";
import digitalImg from "../../assets/sample5.png";
import desktopImg from "../../assets/sample2.png";


const SERVICES = [
  { 
    id: "web-development", 
    title: "Web Development", 
    desc: "High-performance, SEO-friendly websites built with clean code, modern UI/UX, and smooth GSAP animations. From landing pages to complex web apps, we ensure your site loads fast, looks stunning, and converts visitors into customers.", 
    img: webImg,
    features: [
      "Responsive layout for all devices",
      "Pixel-perfect UI/UX",
      "Custom dashboards & CMS",
      "GSAP animations & micro-interactions",
      "Optimized performance & security"
    ]
  },
  { 
    id: "seo-optimization", 
    title: "SEO Optimization", 
    desc: "Boost your website's rankings with advanced on-page and off-page SEO strategies. We use analytics-driven insights, keyword research, and technical optimization to increase traffic and visibility on Google.", 
    img: seoImg,
    features: [
      "Keyword & competitor analysis",
      "Technical SEO fixes",
      "Backlink strategy",
      "Content optimization",
      "Real-time analytics & reporting"
    ]
  },
  { 
    id: "graphic-design", 
    title: "Graphic Design", 
    desc: "Creative and professional design solutions for your brand. From logos and posters to full visual identities, we deliver visually stunning graphics tailored for digital and print media.", 
    img: graphicImg,
    features: [
      "Brand identity & guidelines",
      "Logo & icon design",
      "Social media creatives",
      "Print-ready designs",
      "3D & motion graphics (optional)"
    ]
  },
  { 
    id: "mobile-application", 
    title: "Mobile Applications", 
    desc: "Custom Android and iOS mobile apps designed for speed, reliability, and an intuitive user experience. Perfect for startups, businesses, and scalable digital products.", 
    img: mobileImg,
    features: [
      "Cross-platform (React Native / Flutter)",
      "Backend APIs & cloud integration",
      "Smooth UI with native animations",
      "Push notifications & in-app features",
      "Performance & security optimization"
    ]
  },
  { 
    id: "digital-marketing", 
    title: "Digital Marketing", 
    desc: "Grow your brand with data-driven marketing solutions. We manage targeted ad campaigns, social media strategies, and performance analytics to help you reach the right audience and drive measurable results.", 
    img: digitalImg,
    features: [
      "Google & Meta ads",
      "Social media strategy",
      "Content marketing",
      "Lead generation funnels",
      "Detailed analytic reports"
    ]
  },
   { 
    id: "desktop-application", 
    title: "Desktop Applications", 
    desc: "Powerful, native desktop applications for Windows, macOS, and Linux. Build robust software with offline capabilities, system integration, and enterprise-grade performance for your business needs.", 
    img: desktopImg,
    features: [
      "Cross-platform desktop apps",
      "Native system integration",
      "Offline functionality",
      "Database & file management",
      "High-performance computing"
    ]
  },
 
];


const SmoothService = () => {
  const imgRef = useRef<HTMLImageElement | null>(null);
  const cardRef = useRef<HTMLDivElement | null>(null);
  const rightSideRef = useRef<HTMLDivElement | null>(null); // New ref for right side only
  const [active, setActive] = useState(0);
  const autoplayRef = useRef<number | null>(null);
  const navigate = useNavigate();

  // GSAP tilt effect on hover - only for right side
  const handleMouseMove = (e: React.MouseEvent) => {
    if (!rightSideRef.current) return;
    
    const rect = rightSideRef.current.getBoundingClientRect();
    const isInRightSide = e.clientX >= rect.left && e.clientX <= rect.right && 
                          e.clientY >= rect.top && e.clientY <= rect.bottom;
    
    if (!isInRightSide) {
      // Reset to original position when not in right side
      gsap.to(imgRef.current, { 
        rotateY: 0, 
        rotateX: 0, 
        duration: 0.4, 
        transformPerspective: 600, 
        transformOrigin: "center" 
      });
      gsap.to(cardRef.current, { 
        rotateY: 0, 
        rotateX: 0, 
        duration: 0.4, 
        transformPerspective: 600, 
        transformOrigin: "center" 
      });
      return;
    }

    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;

    gsap.to(imgRef.current, { 
      rotateY: x / 20, // Reduced sensitivity for larger image
      rotateX: -y / 20, 
      duration: 0.4, 
      transformPerspective: 600, 
      transformOrigin: "center" 
    });
    gsap.to(cardRef.current, { 
      rotateY: x / 40, // Reduced sensitivity for card
      rotateX: -y / 40, 
      duration: 0.4, 
      transformPerspective: 600, 
      transformOrigin: "center" 
    });
  };

  // Reset tilt when mouse leaves right side
  const handleMouseLeave = () => {
    gsap.to(imgRef.current, { 
      rotateY: 0, 
      rotateX: 0, 
      duration: 0.4, 
      transformPerspective: 600, 
      transformOrigin: "center" 
    });
    gsap.to(cardRef.current, { 
      rotateY: 0, 
      rotateX: 0, 
      duration: 0.4, 
      transformPerspective: 600, 
      transformOrigin: "center" 
    });
  };

  // Autoplay
  useEffect(() => {
    autoplayRef.current = window.setInterval(() => {
      setActive((prev) => (prev + 1) % SERVICES.length);
    }, 5000);

    return () => {
      if (autoplayRef.current) clearInterval(autoplayRef.current);
    };
  }, []);

  const nextService = () => setActive((prev) => (prev + 1) % SERVICES.length);
  const prevService = () => setActive((prev) => (prev - 1 + SERVICES.length) % SERVICES.length);

  const handleExploreMore = () => {
    const serviceId = SERVICES[active].id;
    navigate(`/service/${serviceId}`);
  };

  return (
    <section
      className="relative w-full min-h-screen px-6 md:px-20 py-24 overflow-hidden flex flex-col md:flex-row items-center gap-16 text-white"
    >
      {/* Neon grid background */}
      <div className="absolute inset-0 bg-[radial-gradient(circle,#00ffff30,transparent_70%)] pointer-events-none"></div>
      <div
        className="absolute inset-0 opacity-20 
        bg-[linear-gradient(#00ffff20_1px,transparent_1px),linear-gradient(90deg,#00ffff20_1px,transparent_1px)] 
        bg-[size:80px_80px] animate-[gridMove_8s_linear_infinite]"
      ></div>

      {/* LEFT SIDE: Text */}
      <div className="relative z-10 w-full md:w-1/2 space-y-6">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-4xl md:text-5xl font-bold leading-tight"
        >
          Powerful Digital Services
        </motion.h1>

        <motion.h2
          key={active}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-3xl md:text-4xl font-semibold text-cyan-300"
        >
          {SERVICES[active].title}
        </motion.h2>

        <motion.p
          key={`desc-${active}`}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-gray-300 text-lg md:text-xl leading-relaxed"
        >
          {SERVICES[active].desc}
        </motion.p>

        <motion.div whileHover={{ scale: 1.05 }} className="p-[2px] w-max rounded-xl bg-gradient-to-r from-cyan-500 to-blue-500">
          <button 
            onClick={handleExploreMore}
            className="flex items-center gap-3 px-6 py-3 bg-black rounded-xl text-cyan-300 hover:text-cyan-200 transition-all"
          >
            Explore More <ArrowRight />
          </button>
        </motion.div>
      </div>

      {/* RIGHT SIDE: Image + Card - Only this area responds to mouse movement */}
      <div 
        ref={rightSideRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        className="relative w-full md:w-1/2 flex justify-center items-center min-h-[500px] md:min-h-[600px]" // Increased min-height
      >
        {/* Enhanced Neon Glow */}
        {/* <div className="absolute inset-0 blur-4xl bg-cyan-500/30 rounded-full z-0"></div> */}

        {/* Larger Image */}
        <motion.img
          key={active}
          ref={imgRef}
          src={SERVICES[active].img}
          alt={SERVICES[active].title}
          initial={{ opacity: 0, x: 100, filter: "blur(15px)", scale: 0.8 }}
          animate={{ opacity: 1, x: 0, filter: "blur(0px)", scale: 1 }}
          transition={{ duration: 1.2 }}
          className="relative w-full max-w-2xl rounded-3xl shadow-[0_0_60px_#00ffff80] select-none z-10 cursor-pointer" // Increased size and glow
          draggable={false}
          style={{
            transformStyle: "preserve-3d",
          }}
        />

        {/* Active Service Card */}
        <motion.div
          ref={cardRef}
          key={`card-${active}`}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="absolute bottom-[-2rem] right-0 w-[350px] rounded-2xl bg-black/70 backdrop-blur-xl p-6 neon-card-border shadow-2xl z-20 border border-cyan-500/30"
          style={{
            transformStyle: "preserve-3d",
          }}
        >
          <h3 className="text-cyan-300 text-xl font-bold mb-3">{SERVICES[active].title}</h3>
          <p className="text-gray-300 text-sm leading-relaxed">{SERVICES[active].desc}</p>

          <div className="flex justify-between mt-6">
            <button 
              onClick={prevService} 
              className="px-4 py-2 bg-cyan-500/20 rounded-lg hover:bg-cyan-500/40 transition-all duration-300 hover:scale-110"
            >
              <ArrowLeft size={18} />
            </button>
            <button 
              onClick={nextService} 
              className="px-4 py-2 bg-cyan-500/20 rounded-lg hover:bg-cyan-500/40 transition-all duration-300 hover:scale-110"
            >
              <ArrowRight size={18} />
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default SmoothService;