import React from "react";
import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import Header from "../headerpage/Header";
import Footer from "../footerpage/Footer";
import FloatingContact from "../contactpage/FloatingContact";

// Import all service images
import webImg from "../../assets/sample1.png";
import seoImg from "../../assets/sample2.png";
import graphicImg from "../../assets/sample3.png";
import mobileImg from "../../assets/sample4.png";
import digitalImg from "../../assets/sample5.png";
import desktopImg from "../../assets/sample1.png"; // Add desktop image

const SERVICE_DETAILS = {
  "web-development": {
    title: "Web Development",
    description: "We create fast, responsive, and modern websites with cutting-edge technologies.",
    longDescription: `Our web development services focus on creating high-performance websites that deliver exceptional user experiences. We use modern frameworks and technologies to build scalable, secure, and maintainable web applications.

Key Features:
• Responsive design that works on all devices
• Modern UI/UX with smooth animations
• Fast loading times and optimized performance
• SEO-friendly structure
• Secure and scalable architecture
• Ongoing maintenance and support

We work with technologies like React, Next.js, Vue.js, and modern backend solutions to bring your vision to life.`,
    image: webImg,
    features: [
      "Custom Web Applications",
      "E-commerce Solutions",
      "CMS Development",
      "API Integration",
      "Performance Optimization",
      "Security Implementation"
    ]
  },
  "seo-optimization": {
    title: "SEO Optimization",
    description: "Rank higher on Google with advanced SEO strategies & analytics.",
    longDescription: `Our comprehensive SEO services help your business achieve higher search engine rankings and increase organic traffic. We combine technical expertise with data-driven strategies to deliver measurable results.

Our SEO Process:
• Comprehensive website audit
• Keyword research and strategy
• On-page optimization
• Technical SEO improvements
• Content strategy development
• Link building and outreach
• Performance tracking and reporting

We stay updated with the latest algorithm changes to ensure your website maintains and improves its search engine visibility.`,
    image: seoImg,
    features: [
      "Technical SEO Audit",
      "Keyword Strategy",
      "On-Page Optimization",
      "Content Marketing",
      "Link Building",
      "Performance Analytics"
    ]
  },
  "graphic-design": {
    title: "Graphic Design",
    description: "Logos, posters, branding & high-quality digital creatives.",
    longDescription: `Transform your brand identity with our professional graphic design services. We create visually stunning designs that communicate your brand's message effectively and leave a lasting impression.

Our Design Services:
• Logo design and brand identity
• Print materials (brochures, business cards, posters)
• Digital graphics for web and social media
• UI/UX design for applications
• Brand guideline development
• Packaging design

We combine creativity with strategic thinking to deliver designs that not only look great but also drive results for your business.`,
    image: graphicImg,
    features: [
      "Brand Identity Design",
      "Print Design",
      "Digital Graphics",
      "UI/UX Design",
      "Social Media Graphics",
      "Packaging Design"
    ]
  },
  "mobile-application": {
    title: "Mobile Application",
    description: "Build lightweight, fast Android & iOS mobile apps.",
    longDescription: `We develop high-performance mobile applications for both iOS and Android platforms. Our focus is on creating apps that provide seamless user experiences while meeting your business objectives.

Our Mobile Development Expertise:
• Native iOS and Android development
• Cross-platform solutions
• UI/UX design optimized for mobile
• API integration and backend development
• App store deployment and optimization
• Ongoing maintenance and updates

We use modern technologies like React Native, Flutter, Swift, and Kotlin to build apps that perform excellently on all devices.`,
    image: mobileImg,
    features: [
      "Native iOS & Android Apps",
      "Cross-Platform Development",
      "UI/UX Design",
      "API Integration",
      "App Store Deployment",
      "Performance Optimization"
    ]
  },
  "desktop-application": {
    title: "Desktop Application",
    description: "Build powerful, native desktop applications for Windows, macOS, and Linux.",
    longDescription: `We create robust desktop applications that deliver exceptional performance and seamless user experiences across all major operating systems. Our desktop solutions are perfect for businesses requiring offline capabilities, system integration, and high-performance computing.

Our Desktop Development Expertise:
• Cross-platform desktop applications (Windows, macOS, Linux)
• Native system integration and APIs
• Offline functionality and data synchronization
• Database management and file system operations
• High-performance computing and multi-threading
• Automatic updates and installation packages

We use modern technologies like Electron, .NET MAUI, JavaFX, and Qt to build desktop applications that meet enterprise-grade standards while providing smooth, native-like experiences.`,
    image: desktopImg,
    features: [
      "Cross-Platform Desktop Apps",
      "Native System Integration",
      "Offline Functionality",
      "Database Management",
      "Automatic Updates",
      "Performance Optimization"
    ]
  },
  "digital-marketing": {
    title: "Digital Marketing",
    description: "Grow your brand using real-time performance marketing campaigns.",
    longDescription: `Drive growth and increase your online presence with our comprehensive digital marketing services. We create data-driven strategies that deliver measurable results and help you achieve your business goals.

Our Digital Marketing Services:
• Social media marketing and management
• Search engine marketing (SEM/PPC)
• Content marketing strategy
• Email marketing campaigns
• Analytics and performance tracking
• Conversion rate optimization

We focus on creating campaigns that not only increase visibility but also drive qualified traffic and conversions for your business.`,
    image: digitalImg,
    features: [
      "Social Media Marketing",
      "PPC Advertising",
      "Content Strategy",
      "Email Marketing",
      "Analytics & Reporting",
      "Conversion Optimization"
    ]
  }
};

const ServiceDetail = () => {
  const { serviceId } = useParams<{ serviceId: string }>();
  
  if (!serviceId || !SERVICE_DETAILS[serviceId as keyof typeof SERVICE_DETAILS]) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4">Service Not Found</h1>
          <Link to="/services" className="text-cyan-300 hover:text-cyan-200">
            Back to Services
          </Link>
        </div>
      </div>
    );
  }

  const service = SERVICE_DETAILS[serviceId as keyof typeof SERVICE_DETAILS];

  return (
    <>
      <Header />
      <div className="min-h-screen bg-[radial-gradient(circle,#00ffff30,transparent_70%)] text-white pt-20">
        {/* Background Effects */}
        <div className="fixed inset-0  bg-[linear-gradient(#00ffff20_1px,transparent_1px),linear-gradient(90deg,#00ffff20_1px,transparent_1px)] 
        bg-[size:80px_80px] animate-[gridMove_8s_linear_infinite] pointer-events-none"></div>
        
        <div className="container mx-auto px-6 py-12">
          {/* Back Button */}
          <Link 
            to="/services" 
            className="inline-flex items-center gap-2 text-cyan-300 hover:text-cyan-200 mb-8 transition-colors"
          >
            <ArrowLeft size={20} />
            Back to Services
          </Link>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Image Section */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="relative"
            >
              <div className="absolute inset-0 blur-3xl bg-cyan-500/20 rounded-full"></div>
              <img
                src={service.image}
                alt={service.title}
                className="relative w-full rounded-3xl shadow-[0_0_40px_#00ffff60] z-10"
              />
            </motion.div>

            {/* Content Section */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="space-y-6"
            >
              <h1 className="text-4xl md:text-5xl font-bold text-cyan-300">
                {service.title}
              </h1>
              
              <p className="text-xl text-gray-300 leading-relaxed">
                {service.description}
              </p>

              <div className="space-y-4">
                <h2 className="text-2xl font-semibold">Overview</h2>
                <p className="text-gray-300 leading-relaxed whitespace-pre-line">
                  {service.longDescription}
                </p>
              </div>

              <div className="space-y-4">
                <h2 className="text-2xl font-semibold">What We Offer</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {service.features.map((feature, index) => (
                    <div
                      key={index}
                      className="flex items-center gap-3 p-3 bg-cyan-500/10 rounded-lg border border-cyan-500/20"
                    >
                      <div className="w-2 h-2 bg-cyan-400 rounded-full"></div>
                      <span className="text-gray-200">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>

              <motion.div 
                whileHover={{ scale: 1.05 }}
                className="pt-6"
              >
                <div className="p-[2px] w-max rounded-xl bg-gradient-to-r from-cyan-500 to-blue-500">
                  <Link 
                    to="/contact" 
                    className="flex items-center gap-3 px-8 py-4 bg-black rounded-xl text-cyan-300 hover:text-cyan-200 transition-all"
                  >
                    Get Started with {service.title}
                  </Link>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </div>
      <Footer />
      <FloatingContact />
    </>
  );
};

export default ServiceDetail;