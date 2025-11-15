import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import { useEffect } from "react";

import Header from "./components/headerpage/Header";
import Footer from "./components/footerpage/Footer";
import Hero from "./components/heropage/Hero";
import Services from "./components/servicepage/Services";
import About from "./components/aboutpage/About";
import Contact from "./components/contactpage/Contact";
import FloatingContact from "./components/contactpage/FloatingContact";
import Portfolio from "./components/portofoliopage/PortfolioCard";
import VismeForm from "./components/VismeForm";
import ClientCarousel from "./components/Clientslogos/ClientCarousel";
import Testimonials from "./components/testimonialspages/Testimonials";
import SmokeBackground from "./components/ui/SmokeEffect";
import ServiceDetail from "./components/servicepage/ServiceDetail";

function ScrollToSection() {
  const location = useLocation();

  useEffect(() => {
    // Don't scroll for service detail pages
    if (location.pathname.startsWith('/service/')) return;
    
    const sectionId = location.pathname === "/" ? "home" : location.pathname.slice(1);
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
  }, [location]);

  return null;
}

// Create a layout wrapper that includes the smoke effect
function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative min-h-screen">
      {/* Smoke Background - applies to all pages */}
      <SmokeBackground />
      
      {/* Content with higher z-index to appear above smoke */}
      <div className="relative z-10">
        {children}
      </div>
    </div>
  );
}

function PageLayout() {
  return (
    <AppLayout>
      <Header />
      <ScrollToSection />
      <main className="pt-20">
        <section id="home">
          <Hero />
        </section>

        <section id="services">
          <Services />
        </section>

        <section id="portfolio">
          <Portfolio />
        </section>

        <section id="client">
          <ClientCarousel />
        </section>

        {/* <section id="testimonials">
          <Testimonials />
        </section> */}

        <section id="about">
          <About />
        </section>

        <section id="contact">
          <Contact />
        </section>
      </main>

      <Footer />
      <FloatingContact />
    </AppLayout>
  );
}

// Service Detail Layout with smoke effect


// Visme Form Layout with smoke effect
function VismeFormLayout() {
  return (
    <AppLayout>
      <VismeForm />
    </AppLayout>
  );
}

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/*" element={<PageLayout />} />
        <Route path="/download" element={<VismeFormLayout />} />
        <Route path="/service/:serviceId" element={<ServiceDetail />} /> {/* Fixed: Use ServiceDetailLayout instead of ServiceDetail */}
      </Routes>
    </Router>
  );
}