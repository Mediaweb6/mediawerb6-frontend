import { useState } from 'react';
import { Send, Mail, Phone, MapPin, MessageCircle, Clock, CheckCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { createClient } from '@supabase/supabase-js';

// Contact form data type
interface ContactFormData {
  name: string;
  email: string;
  message: string;
}

// Get environment variables
const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL;
const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY;

// Initialize Supabase client
const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

const Contact = () => {
  const [formData, setFormData] = useState<ContactFormData>({
    name: '',
    email: '',
    message: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // ✅ Supabase Form Submit with environment variables
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Check if environment variables are available
    if (!SUPABASE_URL || !SUPABASE_ANON_KEY) {
      console.error('Supabase environment variables are not configured');
      setSubmitStatus('error');
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      const { error } = await supabase.from('messages').insert([
        {
          full_name: formData.name,
          email: formData.email,
          message: formData.message,
          created_at: new Date().toISOString(),
        },
      ]);

      if (error) throw error;

      setSubmitStatus('success');
      setFormData({ name: '', email: '', message: '' });
      
    } catch (err) {
      console.error('Submission error:', err);
      setSubmitStatus('error');
    }

    setIsSubmitting(false);
    setTimeout(() => setSubmitStatus('idle'), 5000);
  };

  // Email fallback solution
  const handleEmailFallback = () => {
    const subject = `Contact Form Submission from ${formData.name}`;
    const body = `
Name: ${formData.name}
Email: ${formData.email}
Message: ${formData.message}

Sent from Media Web 6 Website
    `.trim();
    
    window.location.href = `mailto:info@mediaweb6.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  };

  return (
    <section id="contact" className="relative min-h-screen py-24 overflow-hidden">
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
        
        {/* Pulse Glow Effects */}
        <div className="absolute top-20 right-10 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl animate-pulse-glow"></div>
        <div className="absolute bottom-20 left-10 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse-glow delay-2000"></div>
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-7xl mx-auto">
          {/* Header Section */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-20"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring" }}
              className="inline-block mb-6 px-6 py-2 bg-cyan-500/20 backdrop-blur-sm border border-cyan-500/30 rounded-full"
            >
              <span className="text-sm font-semibold text-cyan-300 flex items-center gap-2">
                <MessageCircle size={16} />
                Let's Connect
              </span>
            </motion.div>
            
            <h2 className="text-5xl md:text-6xl font-bold text-white mb-6">
              Ready to Start Your
              <span className="block text-transparent bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text">
                Digital Journey?
              </span>
            </h2>
            
            <p className="text-xl text-cyan-200 max-w-3xl mx-auto leading-relaxed">
              Let's transform your ideas into exceptional digital experiences. 
              Get in touch with our team of experts and let's build something remarkable together.
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-16 items-start">
            {/* LEFT INFO SECTION */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="space-y-8"
            >
              {/* Contact Details */}
              <div className="space-y-6">
                {[
                  { 
                    icon: Mail, 
                    label: 'Email', 
                    value: 'info@mediaweb6.com',
                    description: 'Send us your queries anytime'
                  },
                  { 
                    icon: Phone, 
                    label: 'Phone', 
                    value: '+91 82209 36900',
                    description: 'Mon - Fri, 9AM - 6PM'
                  },
                  { 
                    icon: MapPin, 
                    label: 'Location', 
                    value: 'Coimbatore, Tamil Nadu',
                    description: 'Visit our office'
                  },
                ].map((item, index) => {
                  const Icon = item.icon;
                  return (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.5 + index * 0.1 }}
                      whileHover={{ scale: 1.02 }}
                      className="flex items-start space-x-4 group p-6 rounded-2xl bg-gradient-to-br from-slate-800/50 to-blue-900/30 backdrop-blur-sm border border-cyan-500/20 hover:border-cyan-400/40 transition-all duration-300"
                    >
                      <div className="mt-1 p-3 bg-gradient-to-br from-cyan-500/20 to-blue-500/20 rounded-xl group-hover:from-cyan-500/30 group-hover:to-blue-500/30 transition-colors">
                        <Icon className="w-6 h-6 text-cyan-400" />
                      </div>
                      <div className="flex-1">
                        <div className="text-sm text-cyan-300 mb-1 font-medium">{item.label}</div>
                        <div className="text-lg text-white font-semibold mb-1">{item.value}</div>
                        <div className="text-sm text-gray-400">{item.description}</div>
                      </div>
                    </motion.div>
                  );
                })}
              </div>

              {/* Response Time Info */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 }}
                className="p-6 rounded-2xl bg-gradient-to-br from-blue-500/10 to-purple-500/10 backdrop-blur-sm border border-blue-500/20"
              >
                <div className="flex items-center space-x-3 mb-3">
                  <Clock className="w-5 h-5 text-blue-400" />
                  <h3 className="text-lg font-semibold text-white">Quick Response</h3>
                </div>
                <p className="text-cyan-200 text-sm">
                  We typically respond within 2-4 hours during business days. 
                  Your project deserves immediate attention!
                </p>
              </motion.div>
            </motion.div>

            {/* FORM SECTION */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="relative"
            >
              {/* Form Background Glow */}
              <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/20 via-blue-500/20 to-purple-500/20 rounded-3xl blur-xl opacity-50"></div>
              
              <form
                onSubmit={handleSubmit}
                className="relative bg-gradient-to-br from-slate-800/60 to-blue-900/40 backdrop-blur-xl border border-cyan-500/30 rounded-3xl p-8 space-y-6 hover:border-cyan-400/50 transition-all duration-500 shadow-2xl"
              >
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                >
                  <label htmlFor="name" className="block text-cyan-300 font-semibold mb-3 text-lg">
                    Full Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full px-5 py-4 bg-white/10 border border-cyan-500/30 text-white placeholder-cyan-200/50 rounded-xl focus:border-cyan-400 focus:bg-white/15 focus:outline-none focus:ring-2 focus:ring-cyan-400/20 transition-all duration-300 backdrop-blur-sm"
                    placeholder="Enter your full name"
                  />
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                >
                  <label htmlFor="email" className="block text-cyan-300 font-semibold mb-3 text-lg">
                    Email Address
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-5 py-4 bg-white/10 border border-cyan-500/30 text-white placeholder-cyan-200/50 rounded-xl focus:border-cyan-400 focus:bg-white/15 focus:outline-none focus:ring-2 focus:ring-cyan-400/20 transition-all duration-300 backdrop-blur-sm"
                    placeholder="your@email.com"
                  />
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 }}
                >
                  <label htmlFor="message" className="block text-cyan-300 font-semibold mb-3 text-lg">
                    Project Details
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={6}
                    className="w-full px-5 py-4 bg-white/10 border border-cyan-500/30 text-white placeholder-cyan-200/50 rounded-xl focus:border-cyan-400 focus:bg-white/15 focus:outline-none focus:ring-2 focus:ring-cyan-400/20 transition-all duration-300 backdrop-blur-sm resize-none"
                    placeholder="Tell us about your project, timeline, budget, and any specific requirements..."
                  />
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.7 }}
                  className="space-y-3"
                >
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-700 hover:to-blue-700 text-white px-8 py-4 rounded-xl font-semibold flex items-center justify-center space-x-3 transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-cyan-600/30 relative overflow-hidden group"
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 to-blue-500 opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
                    <span className="text-lg">
                      {isSubmitting ? 'Sending Your Message...' : 'Start Your Project'}
                    </span>
                    <Send className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </button>

                  
                </motion.div>

                {/* Status Messages */}
                <AnimatePresence>
                  {submitStatus === 'success' && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.8 }}
                      className="bg-gradient-to-r from-green-500/20 to-emerald-500/20 border border-green-500/50 text-green-200 px-6 py-4 rounded-xl text-sm font-medium backdrop-blur flex items-center space-x-3"
                    >
                      <CheckCircle className="w-5 h-5 text-green-400" />
                      <div>
                        <div className="font-semibold">Message Sent Successfully!</div>
                        <div className="text-green-300/80">We'll get back to you within 2-4 hours.</div>
                      </div>
                    </motion.div>
                  )}

                  {submitStatus === 'error' && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.8 }}
                      className="bg-gradient-to-r from-red-500/20 to-pink-500/20 border border-red-500/50 text-red-200 px-6 py-4 rounded-xl text-sm font-medium backdrop-blur flex items-center space-x-3"
                    >
                      <div className="w-5 h-5 text-red-400">⚠️</div>
                      <div>
                        <div className="font-semibold">Submission Issue</div>
                        <div className="text-red-300/80">
                          Please try the email option above or contact us directly.
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                
              </form>
            </motion.div>
          </div>
        </div>
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
            0%, 100% { opacity: 0.1; transform: scale(1); }
            50% { opacity: 0.15; transform: scale(1.1); }
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
    </section>
  );
};

export default Contact;