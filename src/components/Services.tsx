import { Globe, Smartphone, Laptop, Monitor, BarChart3 } from "lucide-react";
import type { Service } from "../types";

const ServiceCard = ({ service }: { service: Service }) => {
  const icons = {
    website: Globe,
    mobile: Smartphone,
    webapp: Laptop,
    desktop: Monitor,
    seo: BarChart3,
  };

  const IconComponent = icons[service.icon as keyof typeof icons] || Globe;
  const whatsappNumber = "918807202037";
  const handleWhatsAppClick = () => {
    const message =
      `Hello! 👋

I’m interested in your *${service.title}* service.

*Description:*
${service.description}

*Request:*
• Detailed features
• Pricing information
• Project timeline and delivery

Looking forward to your response. Thank you!`;

    const whatsappURL = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;
    window.open(whatsappURL, "_blank");
  };


  return (
    <div className="bg-[#111827] text-white rounded-2xl shadow-xl border border-gray-700 p-8 hover:shadow-blue-500/30 hover:-translate-y-2 transition-all duration-300">
      <div className="flex items-center space-x-4 mb-5">
        <div className="bg-gradient-to-r from-blue-500 to-cyan-400 p-4 rounded-xl shadow-lg">
          <IconComponent className="w-8 h-8 text-white" />
        </div>
        <h3 className="text-2xl font-semibold">{service.title}</h3>
      </div>

      <p className="text-gray-300 mb-6 leading-relaxed">{service.description}</p>

      <ul className="space-y-2 text-gray-300 mb-6">
        {service.features?.map((feature, i) => (
          <li key={i} className="flex items-start">
            <span className="text-cyan-400 mr-2 mt-1">✔</span>
            {feature}
          </li>
        ))}
      </ul>

      <div className="flex gap-4">
        {/* <button className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 rounded-lg transition">
          🔍 Learn More
        </button> */}
        <button
          onClick={handleWhatsAppClick}
          className="flex-1 bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-white font-medium py-2 rounded-lg transition"
        >
          💬 Get a Quote
        </button>
      </div>
    </div>
  );
};

const Services = () => {
  const services: Service[] = [
    {
      id: 1,
      title: "Website Development",
      description:
        "We build fast, responsive, and SEO-friendly websites tailored to your business goals using the latest web technologies.",
      icon: "website",
      features: [
        "Custom business & portfolio websites",
        "Responsive mobile-friendly layouts",
        "SEO-optimized structure",
        "CMS integration (WordPress, etc.)",
      ],
    },
    {
      id: 2,
      title: "Mobile Application Development",
      description:
        "Native and cross-platform mobile apps with seamless UI/UX and top-notch performance for Android and iOS.",
      icon: "mobile",
      features: [
        "Android & iOS app development",
        "React Native & Flutter solutions",
        "API integration and backend support",
        "App store deployment assistance",
      ],
    },
    {
      id: 3,
      title: "Web Application Development",
      description:
        "Dynamic and secure web applications for businesses, startups, and enterprises using modern frameworks.",
      icon: "webapp",
      features: [
        "Full-stack web app development",
        "Secure user authentication systems",
        "Database-driven architecture",
        "Scalable and cloud-ready solutions",
      ],
    },
    {
      id: 4,
      title: "Desktop Software Development",
      description:
        "Powerful desktop software solutions for business automation, data management, and internal tools.",
      icon: "desktop",
      features: [
        "Windows & Mac software solutions",
        "Cross-platform desktop apps (Electron, .NET)",
        "Database and API integration",
        "Offline data handling",
      ],
    },
    {
      id: 5,
      title: "SEO & Digital Marketing",
      description:
        "Boost your brand visibility with result-oriented SEO, SEM, and content marketing strategies.",
      icon: "seo",
      features: [
        "On-page & technical SEO optimization",
        "Keyword and content strategy",
        "Google Ads & social media campaigns",
        "Performance analytics & reports",
      ],
    },
  ];

  return (
    <section className="min-h-screen py-24 bg-[#0F172A] overflow-y-auto">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <div className="inline-block mb-4 px-4 py-2 bg-blue-900 text-blue-300 rounded-full text-sm font-semibold">
            Our Services
          </div>
          <h2 className="text-5xl font-bold text-white mb-4">
            We Build <span className="text-transparent bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text">Powerful Solutions</span>
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            From web and mobile development to SEO optimization, we provide
            complete technology solutions to grow your business.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
          {services.map((service) => (
            <ServiceCard key={service.id} service={service} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
