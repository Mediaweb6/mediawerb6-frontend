import { useEffect, useRef } from "react";
import { ArrowUpRight } from "lucide-react";
import { motion } from "framer-motion";
import Typed from "typed.js";

import Img1 from "../assets/sample1.png";
import Img2 from "../assets/sample2.png";
import Img3 from "../assets/sample3.png";
import Img4 from "../assets/sample4.png";
import Img5 from "../assets/sample5.png";
import Img6 from "../assets/sample6.png";
import Img7 from "../assets/sample7.png";
import Img8 from "../assets/sample8.png";
import Img9 from "../assets/sample9.png";
import Img10 from "../assets/sample10.png";

const images = [Img1, Img2, Img3, Img4, Img5, Img6, Img7, Img8, Img9, Img10];

const Hero = () => {
  const typedRef = useRef(null);

  useEffect(() => {
    const typed = new Typed(typedRef.current, {
      strings: [
        "Website Development",
        "SEO",
        "Mobile Applications",
        "Desktop Applications",
        "Digital Marketing",
      ],
      typeSpeed: 90,
      backSpeed: 50,
      backDelay: 1200,
      loop: true,
      showCursor: true,
      cursorChar: "|",
    });
    return () => typed.destroy();
  }, []);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-[#06133f] via-[#0a1e6b] to-[#030b30] text-white px-8 md:px-16">
      
      {/* CENTERED TEXT CONTENT */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.2, ease: "easeOut" }}
        className="z-20 w-full flex flex-col items-center text-center space-y-6  "
      >
        <h1 className="text-6xl md:text-7xl font-extrabold leading-tight drop-shadow-xl">
          INDIA'S MOST TRUSTED
        </h1>

        <h2 className="text-3xl md:text-4xl font-semibold text-blue-400 tracking-wide">
          WEB DESIGN COMPANY.
        </h2>

        <h3 className="text-4xl md:text-5xl font-bold mt-4">
          WE BUILD{" "}
          <span
            ref={typedRef}
            className="bg-gradient-to-r from-cyan-400 via-blue-400 to-indigo-400 bg-clip-text text-transparent animate-pulse"
          ></span>
        </h3>

        <p className="text-gray-300 text-lg md:text-xl max-w-xl leading-relaxed">
          One Stop Solution For Your Digital Needs.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 mt-6">
          <motion.a
            href="#portfolio"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="inline-flex items-center justify-center gap-2 bg-white text-blue-700 font-semibold px-8 py-3 rounded-full shadow-lg hover:bg-blue-100 transition-all"
          >
            Explore More
            <ArrowUpRight className="w-5 h-5" />
          </motion.a>

          <motion.button
            whileHover={{
              scale: 1.08,
              boxShadow: "0px 0px 20px rgba(0,200,255,0.6)",
            }}
            whileTap={{ scale: 0.95 }}
            className="px-8 py-3 rounded-full font-semibold text-white bg-gradient-to-r from-cyan-400 via-blue-500 to-indigo-500 shadow-md hover:shadow-cyan-500/50 transition-all duration-300"
          >
            Get Free Consultation
          </motion.button>
        </div>
      </motion.div>

      {/* RIGHT SIDE - DIAGONAL SLIDING IMAGE WALL */}
      <div className="absolute left-[-25%] md:left-[-20%] top-[-10%] w-[150%] h-[150%] overflow-hidden pointer-events-none">
        <div className="absolute inset-0 flex gap-10 justify-center rotate-[45deg] scale-125">
          {[...Array(4)].map((_, colIndex) => (
            <div
              key={colIndex}
              className={`flex flex-col gap-8 ${
                colIndex % 2 === 0 ? "animate-scroll-up" : "animate-scroll-down"
              }`}
            >
              {images.concat(images).map((img, i) => (
                <img
                  key={i}
                  src={img}
                  alt={`bg-${i}`}
                  className="w-[300px] h-[240px] object-cover rounded-2xl transition-all shadow-lg border border-white/20"
                />
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* CENTER MASK — FOCUSED LIGHT (less opacity only in center) */}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#00000070] to-transparent pointer-events-none z-10"></div>
    </section>
  );
};

export default Hero;
