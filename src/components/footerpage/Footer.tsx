import React from "react";
import { Facebook, Instagram, Linkedin, Twitter, ArrowUp } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import MediaWeb6Logo from "../../assets/Media_web_6.svg";

const Footer: React.FC = () => {
  const navigate = useNavigate();

  const quickLinks = [
    { name: "Home", path: "/" },
    { name: "Services", path: "/services" },
    { name: "Portfolio", path: "/portfolio" },
    { name: "About", path: "/about" },
    { name: "Contact", path: "/contact" },
  ];

  const services = [
    { name: "Website Development", id: "web-development" },
    { name: "Mobile Application", id: "mobile-application" },
    { name: "Desktop Application", id: "desktop-application" },
    { name: "SEO & Digital Marketing", id: "seo-optimization" },
    { name: "Graphic Design", id: "graphic-design" },
  ];

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleServiceClick = (serviceId: string) => {
    navigate(`/service/${serviceId}`);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="relative overflow-hidden text-white">
      <div className="absolute inset-0 bg-black" />
      <div className="absolute top-[-15%] left-[25%] w-[400px] h-[400px] bg-cyan-500/20 rounded-full blur-3xl opacity-40 animate-pulse" />
      <div className="absolute bottom-[-20%] right-[15%] w-[350px] h-[350px] bg-blue-600/25 rounded-full blur-3xl opacity-40 animate-pulse" />

      <div className="relative z-10 container mx-auto px-5 py-20">
        <div className="text-center mb-20">
          <h2 className="text-2xl md:text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-400 to-blue-600">
            Let's Build Something Incredible Together
          </h2>
          <p className="text-gray-300 text-lg max-w-2xl mx-auto leading-relaxed">
            Empowering brands with stunning digital experiences and next-gen
            technology. Join us in creating the future of the web.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-12 mb-16 border-b border-white/10 pb-12">
          {/* Company Info */}
          <div className="space-y-4 text-center sm:text-left">
            <div className="flex items-center justify-center sm:justify-start space-x-2">
              <Link to="/">
                <img
                  src={MediaWeb6Logo}
                  alt="Media Web 6 Logo"
                  className="h-10 object-contain drop-shadow-[0_0_15px_rgba(0,255,255,0.4)] cursor-pointer hover:scale-105 transition-transform"
                />
              </Link>
              <h4 className="font-bold text-lg tracking-wide">Media Web 6</h4>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed">
              We are a creative digital agency that combines strategy, design,
              and technology to build impactful online experiences.
            </p>
          </div>

          {/* Quick Links */}
          <div className="text-center sm:text-left">
            <h4 className="font-semibold mb-4 text-cyan-300">Quick Links</h4>
            <ul className="space-y-2 text-gray-400">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.path}
                    className="hover:text-cyan-400 transition-all hover:pl-1 text-sm cursor-pointer block w-full text-left"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div className="text-center sm:text-left">
            <h4 className="font-semibold mb-4 text-cyan-300">Our Services</h4>
            <ul className="space-y-2 text-gray-400">
              {services.map((service) => (
                <li key={service.name}>
                  <button
                    onClick={() => handleServiceClick(service.id)}
                    className="hover:text-cyan-400 transition-all hover:pl-1 text-sm cursor-pointer w-full text-left"
                  >
                    {service.name}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div className="text-center sm:text-left space-y-4">
            <h4 className="font-semibold mb-4 text-cyan-300">Contact</h4>

            {/* Email */}
            <a
              href="mailto:info@mediaweb6.com"
              className="text-gray-400 text-sm mb-2 hover:text-cyan-400 transition-colors cursor-pointer block w-full text-left"
            >
              📧 info@mediaweb6.com
            </a>

            {/* Phone */}
            <a
              href="tel:+918220936900"
              className="text-gray-400 text-sm mb-2 hover:text-cyan-400 transition-colors cursor-pointer block w-full text-left"
            >
              📞 +91 82209 36900
            </a>

            {/* Location */}
            <a
              href="https://www.google.com/maps?q=11.0234237,76.958487"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 text-sm hover:text-cyan-400 transition-colors cursor-pointer block w-full text-left"
            >
              📍 Coimbatore, Tamil Nadu
            </a>

            <div className="flex items-center space-x-4 justify-center sm:justify-start mt-4">
              {/* You can add social icons here */}
            </div>
          </div>
        </div>

        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-gray-500 text-sm">
            © {new Date().getFullYear()}{" "}
            <span className="text-cyan-400 font-semibold">Media Web 6</span>.
            All rights reserved.
          </p>
          <button
            onClick={scrollToTop}
            className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-cyan-500/30 to-blue-500/30 hover:from-cyan-500 hover:to-blue-600 text-cyan-300 hover:text-white rounded-full border border-cyan-400/50 hover:border-cyan-200 transition-all duration-300 group"
          >
            <span className="text-sm font-semibold">Back to Top</span>
            <ArrowUp className="w-4 h-4 group-hover:-translate-y-1 transition-transform" />
          </button>
        </div>
      </div>

      <div className="absolute inset-x-0 bottom-0 h-[2px] bg-gradient-to-r from-transparent via-cyan-400 to-transparent animate-pulse" />
    </footer>
  );
};

export default Footer;
