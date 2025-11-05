import { Award, Users, Zap } from 'lucide-react';
import type { TeamMember } from '../types';

const About = () => {
  const teamMembers: TeamMember[] = [
    {
      id: 1,
      name: 'Sarah Anderson',
      role: 'Creative Director',
      bio: 'Visionary leader with 10+ years in digital design and brand strategy.',
      avatar: 'sa',
      specialties: ['Brand Strategy', 'UX Design', 'Creative Direction'],
    },
    {
      id: 2,
      name: 'Marcus Chen',
      role: 'Lead Developer',
      bio: 'Full-stack developer passionate about building scalable web solutions.',
      avatar: 'mc',
      specialties: ['React', 'Node.js', 'Cloud Architecture'],
    },
    {
      id: 3,
      name: 'Emily Rodriguez',
      role: 'Marketing Specialist',
      bio: 'Data-driven marketer specializing in growth and customer acquisition.',
      avatar: 'er',
      specialties: ['Digital Marketing', 'Analytics', 'Growth Strategy'],
    },
    {
      id: 4,
      name: 'David Kim',
      role: 'SEO Expert',
      bio: 'Technical SEO specialist helping brands dominate search rankings.',
      avatar: 'dk',
      specialties: ['Technical SEO', 'Content Strategy', 'Link Building'],
    },
  ];

  return (
    <section id="about" className="relative py-24 bg-gradient-to-b from-blue-50/50 to-white overflow-hidden">
      <div className="container mx-auto px-6 relative z-10">
        {/* About intro */}
        <div className="max-w-3xl mx-auto text-center mb-20">
          <div className="inline-block mb-4 px-4 py-2 bg-blue-100 text-blue-700 rounded-full text-sm font-semibold">
            About Nexus
          </div>
          <h2 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
            Transforming Businesses
            <span className="block text-transparent bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text">
              Through Digital Innovation
            </span>
          </h2>
          <p className="text-xl text-gray-600 leading-relaxed">
            Since 2015, we've been partnering with businesses to create digital experiences that drive results. Our team of experts combines creativity, strategy, and technology to deliver solutions that transform brands.
          </p>
        </div>

        {/* Stats */}
        <div className="grid md:grid-cols-4 gap-8 mb-24">
          {[
            { icon: Award, label: 'Awards Won', value: '50+' },
            { icon: Users, label: 'Happy Clients', value: '500+' },
            { icon: Zap, label: 'Projects Delivered', value: '1000+' },
            { icon: Award, label: 'Years Experience', value: '8+' },
          ].map((stat, index) => {
            const Icon = stat.icon;
            return (
              <div
                key={index}
                className="text-center group p-6 rounded-2xl bg-white border border-gray-100 hover:border-blue-300 hover:shadow-lg transition-all duration-300 transform hover:-translate-y-2"
              >
                <div className="inline-block mb-4 p-4 bg-blue-100 text-blue-600 rounded-xl group-hover:bg-blue-600 group-hover:text-white transition-all duration-300 transform group-hover:scale-110">
                  <Icon className="w-6 h-6" />
                </div>
                <div className="text-3xl font-bold text-gray-900 mb-2">{stat.value}</div>
                <div className="text-gray-600">{stat.label}</div>
              </div>
            );
          })}
        </div>

        {/* Team Section */}
        <div className="mb-20">
          <div className="text-center mb-16">
            <h3 className="text-4xl font-bold text-gray-900 mb-4">Meet Our Expert Team</h3>
            <p className="text-xl text-gray-600">Talented professionals dedicated to your success</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {teamMembers.map((member) => (
              <div
                key={member.id}
                className="group text-center bg-white rounded-2xl overflow-hidden border border-gray-100 hover:border-blue-300 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2"
              >
                {/* Avatar */}
                <div className="h-48 bg-gradient-to-br from-blue-500 to-cyan-500 relative overflow-hidden flex items-center justify-center group-hover:scale-105 transition-transform duration-300">
                  <div className="text-5xl font-bold text-white opacity-50">{member.avatar}</div>
                </div>

                {/* Content */}
                <div className="p-6">
                  <h4 className="text-xl font-bold text-gray-900 mb-1">{member.name}</h4>
                  <p className="text-blue-600 font-semibold mb-3">{member.role}</p>
                  <p className="text-gray-600 text-sm mb-4">{member.bio}</p>

                  {/* Specialties */}
                  <div className="flex flex-wrap gap-2 justify-center">
                    {member.specialties.slice(0, 2).map((specialty, i) => (
                      <span
                        key={i}
                        className="text-xs bg-blue-50 text-blue-700 px-3 py-1 rounded-full font-medium group-hover:bg-blue-100 transition-colors"
                      >
                        {specialty}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Mission & Vision */}
        <div className="grid md:grid-cols-2 gap-12 mt-24">
          <div className="bg-gradient-to-br from-blue-600/10 to-cyan-600/10 backdrop-blur border border-white/50 rounded-2xl p-12 transform hover:-translate-y-2 transition-all duration-300">
            <h3 className="text-3xl font-bold text-gray-900 mb-4">Our Mission</h3>
            <p className="text-gray-700 leading-relaxed">
              To empower businesses with digital solutions that drive real growth, innovation, and sustainable success in an increasingly digital world.
            </p>
          </div>
          <div className="bg-gradient-to-br from-cyan-600/10 to-blue-600/10 backdrop-blur border border-white/50 rounded-2xl p-12 transform hover:-translate-y-2 transition-all duration-300">
            <h3 className="text-3xl font-bold text-gray-900 mb-4">Our Vision</h3>
            <p className="text-gray-700 leading-relaxed">
              To be the most trusted partner for businesses seeking to transform through technology, creativity, and strategic innovation.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
