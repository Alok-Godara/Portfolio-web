import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
export default function About() {
  const [opacity, setOpacity] = useState(1); // Opacity state for the element
  const elementRef = useRef(null); // Reference to the element

  useEffect(() => {
    const handleScroll = () => {
      const element = elementRef.current;
      const elementTop = element.getBoundingClientRect().top; // Get the element's position from the top of the viewport

      // If the element is within 100px of the top, start fading out
      if (elementTop <= 100) {
        const newOpacity = Math.max(0, 1 - (100 - elementTop) / 100); // Calculate opacity based on distance from 100px
        setOpacity(newOpacity); // Update opacity
      } else {
        setOpacity(1); // Reset opacity if it's above 100px
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  return (
    <motion.div
      ref={elementRef} // Attach ref to this element
      style={{
        opacity,
        transition: "opacity 0.5s ease", // Smooth transition for opacity
        position: "relative",
        zIndex: 1,
      }}
      className="flex flex-col md:flex-row justify-between items-center gap-4 px-2 md:px-0"
    >
      <motion.img
        src="/profile2.jpeg"
        drag
        dragConstraints={{
          left: -50,
          right: 50,
          top: -50,
          bottom: 100,
        }}
        whileTap={{ scale: 0.9 }}
        whileHover={{
          scale: 1.1,
          cursor: "pointer",
          boxShadow: "0px 0px 10px salmon",
        }}
        height={200}
        width={200}
        alt="Profile"
        className="rounded-full m-2 shadow-md w-32 h-32 sm:w-40 sm:h-40 md:w-[200px] md:h-[200px]"
      />

      <div className="text-sm sm:text-base md:text-base px-2 md:px-0">
        <h1 className="text-base sm:text-lg md:text-base mb-2 md:mb-0">
          Hi, I'm <strong>Alok Godara</strong> — a final-year{" "}
          <strong>B.Tech</strong> student in{" "}
          <strong>Civil and Infrastructure Engineering</strong>
          {" "}at the{" "}
          <a href="https://www.iitj.ac.in/" target="_blank" className="hover:underline">
            Indian Institute of Technology, Jodhpur
          </a>
          .
        </h1>
        <p className="text-sm sm:text-base md:text-base">
          I’m passionate about developing innovative software solutions,
          creating impactful platforms, and leveraging AI/ML to solve real-world
          challenges. As I approach graduation, I’m eager to apply my skills
          across web, mobile, and AI technologies to build meaningful products
          and continue growing as a developer and problem solver.
        </p>
      </div>
    </motion.div>
  );
}

