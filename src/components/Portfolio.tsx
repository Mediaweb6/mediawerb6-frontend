import { ExternalLink, TrendingUp } from 'lucide-react';
import type { PortfolioItem } from '../types';

const PortfolioCard = ({ item, index }: { item: PortfolioItem; index: number }) => {
  return (
    <div
      className="group relative overflow-hidden rounded-2xl h-96 cursor-pointer"
      style={{ transitionDelay: `${index * 100}ms` }}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-blue-600 to-cyan-600 opacity-80 group-hover:opacity-100 transition-opacity duration-500"></div>

      <div className="absolute inset-0 flex flex-col justify-end p-8 bg-gradient-to-t from-black/60 via-black/20 to-transparent">
        <div className="transform translate-y-8 group-hover:translate-y-0 transition-transform duration-300">
          <h3 className="text-2xl font-bold text-white mb-2">{item.title}</h3>
          <p className="text-blue-200 text-sm mb-4">{item.category}</p>
          <p className="text-gray-200 text-sm mb-4 line-clamp-2">{item.description}</p>

          {item.results && (
            <div className="grid grid-cols-2 gap-4 mb-4">
              {item.results.map((result, i) => (
                <div key={i} className="bg-white/10 backdrop-blur p-3 rounded-lg">
                  <div className="text-blue-300 font-bold text-sm">{result.value}</div>
                  <div className="text-gray-300 text-xs">{result.metric}</div>
                </div>
              ))}
            </div>
          )}

          <button className="inline-flex items-center space-x-2 text-white font-semibold hover:text-cyan-300 transition-colors group/btn">
            <span>View Case Study</span>
            <ExternalLink className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
          </button>
        </div>
      </div>

      <div className="absolute inset-0 bg-gradient-to-r from-blue-500/0 via-cyan-500/0 to-blue-500/0 group-hover:from-blue-500/20 group-hover:via-cyan-500/20 group-hover:to-blue-500/20 transition-all duration-300 pointer-events-none"></div>
    </div>
  );
};

const Portfolio = () => {
  const projects: PortfolioItem[] = [
    {
      id: 1,
      title: 'E-Commerce Platform Redesign',
      category: 'Web Design & Development',
      description: 'Complete redesign and development of an e-commerce platform resulting in improved UX and 40% higher conversion rates.',
      image: 'ecommerce',
      results: [
        { metric: 'Conversion Rate', value: '+40%' },
        { metric: 'Load Time', value: '-60%' },
      ],
    },
    {
      id: 2,
      title: 'SaaS Dashboard Launch',
      category: 'Web Development',
      description: 'Built a scalable SaaS dashboard with real-time analytics and user management for a tech startup.',
      image: 'saas',
      results: [
        { metric: 'Users', value: '10K+' },
        { metric: 'Uptime', value: '99.9%' },
      ],
    },
    {
      id: 3,
      title: 'Digital Marketing Campaign',
      category: 'Digital Marketing',
      description: 'Multi-channel digital marketing campaign that increased brand awareness and generated qualified leads.',
      image: 'marketing',
      results: [
        { metric: 'Lead Gen', value: '+150%' },
        { metric: 'ROI', value: '320%' },
      ],
    },
    {
      id: 4,
      title: 'Brand Identity & Website',
      category: 'Branding & Design',
      description: 'Complete brand identity redesign with new website showcasing premium positioning.',
      image: 'branding',
      results: [
        { metric: 'Engagement', value: '+85%' },
        { metric: 'Traffic', value: '+120%' },
      ],
    },
    {
      id: 5,
      title: 'Mobile App Development',
      category: 'App Development',
      description: 'Native iOS and Android applications with seamless synchronization and offline capabilities.',
      image: 'mobile',
      results: [
        { metric: 'Downloads', value: '50K+' },
        { metric: 'Rating', value: '4.8★' },
      ],
    },
    {
      id: 6,
      title: 'SEO Optimization Project',
      category: 'SEO Services',
      description: 'Comprehensive SEO overhaul resulting in improved rankings and organic traffic growth.',
      image: 'seo',
      results: [
        { metric: 'Rankings', value: 'Top 3' },
        { metric: 'Traffic', value: '+280%' },
      ],
    },
  ];

  return (
    <section id="portfolio" className="relative py-24 bg-white overflow-hidden">
      <div className="absolute top-1/2 -left-96 w-96 h-96 bg-blue-200 rounded-full mix-blend-multiply filter blur-3xl opacity-5"></div>
      <div className="absolute bottom-0 -right-96 w-96 h-96 bg-cyan-200 rounded-full mix-blend-multiply filter blur-3xl opacity-5"></div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center mb-20">
          <div className="inline-block mb-4 px-4 py-2 bg-blue-100 text-blue-700 rounded-full text-sm font-semibold">
            Case Studies
          </div>
          <h2 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
            Our Latest
            <span className="block text-transparent bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text">
              Projects & Results
            </span>
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Discover how we've helped brands achieve remarkable growth and digital transformation
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <PortfolioCard key={project.id} item={project} index={index} />
          ))}
        </div>

        <div className="text-center mt-16">
          <a
            href="#contact"
            className="inline-flex items-center space-x-2 px-8 py-4 bg-gradient-to-r from-blue-600 to-cyan-600 text-white font-semibold rounded-xl hover:shadow-lg hover:shadow-blue-600/50 transition-all duration-300 transform hover:scale-105"
          >
            <span>Start Your Project</span>
            <TrendingUp className="w-5 h-5" />
          </a>
        </div>
      </div>
    </section>
  );
};

export default Portfolio;
