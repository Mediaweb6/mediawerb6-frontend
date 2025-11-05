// components/Footer.tsx
import { Facebook, Instagram, Linkedin, Twitter, Zap, ArrowUp } from 'lucide-react';
import type { SocialLink } from '../types';
import MediaWeb6Logo from '../assets/Media_web_6.svg'; // Replace with your actual logo path

const Footer = () => {
  const socialLinks: SocialLink[] = [
    { platform: 'Facebook', url: '#', icon: 'facebook' },
    { platform: 'Instagram', url: '#', icon: 'instagram' },
    { platform: 'LinkedIn', url: '#', icon: 'linkedin' },
    { platform: 'Twitter', url: '#', icon: 'twitter' },
  ];

  const quickLinks = ['Home', 'Services', 'Portfolio', 'About', 'Blog', 'Contact'];

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const getIcon = (iconName: string) => {
    const iconClass = "w-5 h-5";
    switch (iconName) {
      case 'facebook':
        return <Facebook className={iconClass} />;
      case 'instagram':
        return <Instagram className={iconClass} />;
      case 'linkedin':
        return <Linkedin className={iconClass} />;
      case 'twitter':
        return <Twitter className={iconClass} />;
      default:
        return null;
    }
  };

  return (
    <footer className="relative bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl pointer-events-none"></div>

      <div className="container mx-auto px-6 relative z-10">
        {/* Main footer content */}
        <div className="py-16 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-12 mb-12 border-b border-white/10">
          {/* Brand */}
          <div className="space-y-4 text-center sm:text-left">
            <div className="flex items-center justify-center sm:justify-start space-x-2 group cursor-pointer">
              <img src={MediaWeb6Logo} alt="Media Web 6 Logo" className="h-8 object-contain mx-auto sm:mx-0" />
              <h4>Media web 6</h4>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed">
              Transforming businesses through innovative digital solutions and strategic marketing expertise.
            </p>
          </div>

          {/* Other columns remain same, no change */}
        </div>

        {/* Bottom section */}
        <div className="py-8 flex flex-col sm:flex-row justify-center md:justify-between items-center gap-6">
          {/* Copyright */}
          <p className="text-gray-400 text-sm text-center md:text-left">
            &copy; {new Date().getFullYear()} Media Web 6. All rights reserved.
          </p>

          {/* Social links */}
          <div className="flex items-center justify-center gap-4">
            {socialLinks.map((link) => (
              <a key={link.platform} href={link.url} className="...">{getIcon(link.icon)}</a>
            ))}
          </div>

          {/* Scroll to top */}
          <button onClick={scrollToTop} className="...">
            <span className="text-sm font-semibold">Back to Top</span>
            <ArrowUp className="w-4 h-4 group-hover:-translate-y-1 transition-transform" />
          </button>
        </div>

        {/* Bottom section */}
        <div className="py-8 flex flex-col md:flex-row justify-between items-center gap-6">
          {/* Copyright */}
          <p className="text-gray-400 text-sm">
            &copy; {new Date().getFullYear()} Media Web 6. All rights reserved.
          </p>

          {/* Social links */}
          <div className="flex items-center space-x-4">
            {socialLinks.map((link) => (
              <a
                key={link.platform}
                href={link.url}
                className="w-10 h-10 flex items-center justify-center bg-white/10 backdrop-blur text-gray-400 hover:text-white hover:bg-blue-600 rounded-full border border-white/20 hover:border-blue-500 transition-all duration-300 transform hover:scale-110 group"
                aria-label={link.platform}
              >
                {getIcon(link.icon)}
              </a>
            ))}
          </div>

          {/* Scroll to top button */}
          <button
            onClick={scrollToTop}
            className="flex items-center space-x-2 px-4 py-2 bg-blue-600/20 hover:bg-blue-600 text-blue-300 hover:text-white rounded-full border border-blue-500/50 hover:border-blue-400 transition-all duration-300 group"
          >
            <span className="text-sm font-semibold">Back to Top</span>
            <ArrowUp className="w-4 h-4 group-hover:-translate-y-1 transition-transform" />
          </button>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
