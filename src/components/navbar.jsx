import { motion } from "framer-motion";
import { useLottie } from "lottie-react";
import { useState, useRef, useEffect } from "react";
import { X, Github, Linkedin, Phone,Mail } from "lucide-react"; // prettier icons
import lottie1 from "../assets/lottie1.json";
import lottie2 from "../assets/lottieProfile.json";

// eslint-disable-next-line react/prop-types
// Navbar accepts refs for sections so clicking the items scrolls to them
const Navbar = ({ aboutRef, projectsRef, allSkillsRef, experiencesRef }) => {
  const style = { height: "100px" };
  const smallStyle = { height: "56px", width: "56px" };
  const lottie2Ref = useRef(null);

  // ensure the lottie SVG renders in white for better visibility
  useEffect(() => {
    const el = lottie2Ref.current;
    if (!el) return;

    const applyWhite = (svg) => {
      try {
        // set common attributes and styles to white
        svg.style.color = "white";
        svg.style.filter = "none";
        svg.setAttribute("fill", "white");
        svg.setAttribute("stroke", "white");

        // set all child shapes to white
        const shapes = svg.querySelectorAll("path, rect, circle, ellipse, polygon, polyline, g");
        shapes.forEach((s) => {
          try {
            s.setAttribute("fill", "white");
            s.setAttribute("stroke", "white");
            s.style.fill = "white";
            s.style.stroke = "white";
          } catch {
            // ignore
          }
        });
      } catch {
        // ignore
      }
    };

    // inject a small global rule for lottie wrappers to force white fills (fallback)
    if (!document.getElementById("lottie-white-style")) {
      const styleEl = document.createElement("style");
      styleEl.id = "lottie-white-style";
      styleEl.innerHTML = `
        .lottie-white svg *{ fill: white !important; stroke: white !important; }
        .lottie-white svg{ filter: none !important; }
        /* subtle glow for visibility */
        .lottie-white { filter: drop-shadow(0 6px 18px rgba(255,255,255,0.12)); }
        /* small pulsing highlight */
        @keyframes lottie-glow { 0% { filter: drop-shadow(0 6px 18px rgba(255,255,255,0.08)); } 50% { filter: drop-shadow(0 10px 28px rgba(255,255,255,0.18)); } 100% { filter: drop-shadow(0 6px 18px rgba(255,255,255,0.08)); } }
        .lottie-white.glow { animation: lottie-glow 2.4s ease-in-out infinite; }
      `;
      document.head.appendChild(styleEl);
    }

    // find any svg inside the wrapper and apply white styling
    const svgs = el.querySelectorAll("svg");
    if (svgs.length > 0) {
      svgs.forEach(applyWhite);
    } else {
      // if Lottie hasn't rendered as SVG yet, observe for added svg nodes
      const obs = new MutationObserver((mutations) => {
        for (const m of mutations) {
          m.addedNodes.forEach((node) => {
            if (node.nodeName === 'svg') applyWhite(node);
            if (node.querySelectorAll) {
              node.querySelectorAll('svg').forEach(applyWhite);
            }
          });
        }
      });
      obs.observe(el, { childList: true, subtree: true });
      // stop observing after a short timeout
      setTimeout(() => obs.disconnect(), 2000);
    }
  }, [lottie2Ref]);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const Example = () => {
    const options = { animationData: lottie1, loop: true, autoplay: true };
    const { View } = useLottie(options, style);
    return View;
  };

  const Example2 = () => {
    const options = { animationData: lottie2, loop: true, autoplay: true };
    const { View } = useLottie(options, smallStyle);
    return (
      <motion.div
        ref={lottie2Ref}
        onClick={() => setIsDrawerOpen(true)}
        className="cursor-pointer lottie-white glow"
        style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center' }}
        animate={{ y: [0, -6, 0, -4, 0], rotate: [0, -3, 0, 3, 0], scale: [1, 1.02, 1] }}
        transition={{ duration: 2.6, repeat: Infinity, ease: "easeInOut" }}
        whileHover={{ scale: 1.14, rotate: 0 }}
        whileTap={{ scale: 0.95 }}
      >
        {View}
      </motion.div>
    );
  };

  const navRef = useRef(null);

  useEffect(() => {
    const setNavVar = () => {
      if (navRef.current) {
        document.documentElement.style.setProperty(
          "--nav-height",
          `${navRef.current.offsetHeight}px`
        );
      }
    };
    setNavVar();
    window.addEventListener("resize", setNavVar);
    return () => window.removeEventListener("resize", setNavVar);
  }, []);

  const scrollToSection = (ref) => {
    if (ref?.current) {
      // compute navbar height dynamically so the scrolled-to section appears below it
      const headerHeight = navRef.current?.offsetHeight || 100;
      const y = ref.current.getBoundingClientRect().top + window.scrollY - headerHeight;
      window.scrollTo({ top: y, behavior: "smooth" });
    }
  };

  return (
    <>
      {/* Navbar */}
      <motion.div
        ref={navRef}
        className="items-center"
        initial={{ opacity: 0, scale: 1 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 2 }}
        style={{
          position: "fixed",
          top: "0",
          left: "0",
          width: "100%",
          zIndex: 50,
        }}
      >
        <ul className="flex w-screen flex-row justify-around items-center px-2 md:px-4">
          {/* Lottie Animation - Hidden on mobile */}
          <div className="hidden md:block">
            <Example />
          </div>
          
          {/* Navigation items - Responsive text size */}
          <motion.li
            whileHover={{ scale: 1.35, cursor: "pointer" }}
            onClick={() => scrollToSection(aboutRef)}
            className="text-xs sm:text-sm md:text-base"
          >
            About
          </motion.li>
          <motion.li
            whileHover={{ scale: 1.35, cursor: "pointer" }}
            onClick={() => scrollToSection(allSkillsRef)}
            className="text-xs sm:text-sm md:text-base hidden sm:block"
          >
            All skills
          </motion.li>
          <motion.li
            whileHover={{ scale: 1.35, cursor: "pointer" }}
            onClick={() => scrollToSection(projectsRef)}
            className="text-xs sm:text-sm md:text-base"
          >
            Projects
          </motion.li>
          <motion.li
            whileHover={{ scale: 1.35, cursor: "pointer" }}
            onClick={() => scrollToSection(experiencesRef)}
            className="text-xs sm:text-sm md:text-base hidden sm:block"
          >
            Experiences
          </motion.li>
          <Example2 />
        </ul>
      </motion.div>

      {/* Backdrop */}
      {isDrawerOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40"
          onClick={() => setIsDrawerOpen(false)}
        />
      )}

      {/* Drawer */}
      {isDrawerOpen && (
        <motion.div
          initial={{ x: "100%" }}
          animate={{ x: 0 }}
          exit={{ x: "100%" }}
          transition={{ type: "tween", duration: 0.3 }}
          className="fixed top-0 right-0 h-full w-full sm:w-96 md:w-84 bg-gray-900 text-white z-50 p-4 sm:p-6 shadow-2xl sm:rounded-l-2xl flex flex-col"
        >
          {/* Close button */}
          <button
            onClick={() => setIsDrawerOpen(false)}
            className="self-end text-gray-400 hover:text-white"
          >
            <X size={24} />
          </button>

          <h2 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6 text-yellow-400">
            Connect with Me
          </h2>

          <ul className="space-y-4 sm:space-y-6 text-base sm:text-lg">
            <li>
              <a
                href="https://github.com/alok-godara"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 hover:text-yellow-400 transition"
              >
                <Github size={20} /> GitHub
              </a>
            </li>
            <li>
              <a
                href="https://www.linkedin.com/in/alok-godara"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 hover:text-yellow-400 transition"
              >
                <Linkedin size={20} /> LinkedIn
              </a>
            </li>
            <li>
              <a
                href="tel:+918604479569"
                className="flex items-center gap-3 hover:text-yellow-400 transition"
              >
                <Phone size={20} /> +91 8955477000
              </a>
            </li>
             <li>
        <a
          href="mailto:aakarshkt2002@gmail.com"
          className="flex items-center gap-3 hover:text-yellow-400 transition break-all"
        >
          <Mail size={20} /> alokgodara.official@gmail.com
        </a>
      </li>
            
          </ul>
        </motion.div>
      )}
    </>
  );
};

export default Navbar;
