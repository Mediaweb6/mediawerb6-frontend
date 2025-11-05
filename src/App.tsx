import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Hero from "./components/Hero";
import Services from "./components/Services";
import Portfolio from "./components/Portfolio";
import About from "./components/About";
// import Testimonials from "./components/Testimonials";
import Contact from "./components/Contact";
import FloatingContact from "./components/FloatingContact";
import Loader from "./components/Loader";
function ScrollToSection() {
  const location = useLocation();

  useEffect(() => {
    const sectionId = location.pathname === "/" ? "home" : location.pathname.slice(1);
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
  }, [location]);

  return null;
}

function PageLayout() {
  return (
    <>
      <Header />
      <main className="pt-20">
        <section id="home"><Hero /></section>
        <section id="services"><Services /></section>
        <section id="portfolio"><Portfolio /></section>
        <section id="about"><About /></section>
        {/* <section id="testimonials"><Testimonials /></section> */}
        <section id="contact"><Contact /></section>
      </main>
      <Footer />
      <FloatingContact /> {/* 👈 Add floating contact here */}
    </>
  );
}

export default function App() {
   const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 2500); // match loader duration
    return () => clearTimeout(timer);
  }, []);
  return (
    
      <Router>
      {loading ? (
        < Loader/>
      ) : (
        <Routes>
          <Route path="/*" element={<PageLayout />} />
        </Routes>
      )}
    </Router>
  );
}
