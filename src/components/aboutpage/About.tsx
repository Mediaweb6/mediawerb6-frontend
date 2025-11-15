import { motion } from "framer-motion";
import { Award, Users, Zap, Target, Eye } from "lucide-react";

const teamMembers = [
  {
    id: 1,
    name: "MATHI KUMAR P",
    role: "Graphic Designer & Developer",
    bio: "Passionate designer and developer who merges creativity with technology to craft visually stunning and functional designs.",
    avatar: "MK",
    specialties: ["Graphic Design", "Front-End Development", "Brand Identity"],
  },
  {
    id: 2,
    name: "Ruby Madhumitha D",
    role: "Graphic Designer & Developer",
    bio: "Creative designer passionate about transforming concepts into elegant and engaging visual experiences.",
    avatar: "RM",
    specialties: ["UI/UX Design", "Illustration", "Visual Storytelling"],
  },
  {
    id: 3,
    name: "PRADEEP G",
    role: "UI & UX Designer & Developer",
    bio: "Creative web developer focused on building responsive, user-friendly websites with seamless UI and smooth interactions.",
    avatar: "PD",
    specialties: ["UI/UX Design", "React", "Responsive Web Design"],
  },
  {
    id: 4,
    name: "AKASH P",
    role: "Full Stack Developer",
    bio: "Dedicated full-stack developer with a strong focus on performance, scalability, and delivering impactful web solutions.",
    avatar: "AK",
    specialties: ["React", "Node.js", "MongoDB", "API Integration"],
  },
];

const stats = [
  { Icon: Users, title: "50+ Clients", desc: "Trusted by global brands" },
  { Icon: Award, title: "20+ Awards", desc: "Recognized for excellence" },
  { Icon: Zap, title: "10+ Years", desc: "Delivering innovation" },
];

const About = () => {
  return (
    <section className="relative py-24 text-white overflow-hidden">
      <div className="container mx-auto px-6 relative z-10">
        {/* Intro */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="max-w-3xl mx-auto text-center mb-24"
        >
          <h2 className="text-5xl md:text-6xl font-extrabold mb-6 bg-white text-transparent bg-clip-text">
            Transforming Businesses{" "}
            <span className="text-cyan-400">Through Digital Innovation</span>
          </h2>
          <p className="text-lg md:text-xl text-white leading-relaxed">
            Since 2015, we craft cutting-edge digital solutions that empower
            brands to thrive. Our team blends design, tech, and strategy to help
            businesses grow and innovate in the digital era.
          </p>
        </motion.div>

        {/* Stats */}
        <div className="grid md:grid-cols-3 gap-8 text-center mb-24">
          {stats.map((stat, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.2 }}
              className="p-6 bg-white/10 rounded-2xl border border-cyan-400/20 backdrop-blur-md hover:shadow-[0_0_25px_rgba(0,255,255,0.3)] transition-all"
            >
              <stat.Icon className="mx-auto text-cyan-400 mb-4" size={40} />
              <h3 className="text-2xl font-bold text-white mb-2">{stat.title}</h3>
              <p className="text-white">{stat.desc}</p>
            </motion.div>
          ))}
        </div>

        {/* Team */}
        <motion.div className="text-center mb-16">
          <h3 className="text-4xl md:text-5xl font-extrabold text-white mb-4">
            Meet Our Expert Team
          </h3>
          <p className="text-lg text-cyan-400">Talented professionals dedicated to your success</p>
        </motion.div>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-10">
          {teamMembers.map((member, i) => (
            <motion.div
              key={member.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="group relative bg-gradient-to-br from-blue-800/60 to-blue-950/40 
                         backdrop-blur-md border border-cyan-400/30 rounded-2xl overflow-hidden 
                         hover:shadow-[0_0_30px_rgba(0,255,255,0.4)] transition-all duration-500 hover:-translate-y-2"
            >
              <div className="h-44 flex items-center justify-center bg-gradient-to-br from-cyan-500 to-blue-500 text-white text-5xl font-bold">
                {member.avatar}
              </div>
              <div className="p-6 text-center">
                <h4 className="text-2xl font-bold text-cyan-200 mb-1">{member.name}</h4>
                <p className="text-cyan-400 font-semibold mb-3">{member.role}</p>
                <p className="text-white text-sm mb-4">{member.bio}</p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Mission & Vision */}
        <div className="grid md:grid-cols-2 gap-12 mt-24">
          {[
            {
              title: "Our Mission",
              text: "Empower businesses with innovative digital solutions that drive real growth, creativity, and sustainable success in an ever-evolving digital landscape.",
              Icon: Target,
            },
            {
              title: "Our Vision",
              text: "To be the most trusted partner for businesses seeking transformation through technology, design, and strategic innovation.",
              Icon: Eye,
            },
          ].map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.2 }}
              className="relative p-12 bg-gradient-to-br from-cyan-700/80 to-blue-900/70 border border-cyan-400/30 rounded-3xl backdrop-blur-md hover:shadow-[0_0_50px_rgba(0,255,255,0.6)] transition-all duration-500"
            >
              <div className="flex items-center gap-4 mb-6">
                <item.Icon className="text-cyan-400" size={48} />
                <h3 className="text-3xl md:text-4xl font-extrabold text-cyan-300">{item.title}</h3>
              </div>
              <p className="text-white text-lg leading-relaxed">{item.text}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default About;
