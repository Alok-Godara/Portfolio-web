/* eslint-disable react/no-unknown-property */
import { useRef, useEffect, useState } from "react";
import StackIcon from "tech-stack-icons";
import { motion } from "framer-motion";
import allSkills from "./allSkills.json";
import { Canvas } from "@react-three/fiber";
import Model from "./robot";
import { Suspense } from "react";
import { useProgress, Html, OrbitControls, Bounds } from "@react-three/drei";

function Loader() {
  const { progress } = useProgress();
  return <Html center>{progress.toFixed(1)} % loaded</Html>;
}

export default function AllSkills() {
  const containerRef = useRef(null);
  const [radius, setRadius] = useState(200);
  const [angleOffset, setAngleOffset] = useState(0);

  useEffect(() => {
    const handleResize = () => {
      // Adjust radius based on screen size
      const isMobile = window.innerWidth < 640;
      const isTablet = window.innerWidth >= 640 && window.innerWidth < 1024;
      
      if (isMobile) {
        setRadius(Math.min(window.innerWidth / 3.5, 120));
      } else if (isTablet) {
        setRadius(Math.min(window.innerWidth / 4.5, 160));
      } else {
        setRadius(Math.min(window.innerWidth / 4, 200));
      }
    };
    handleResize();
    window.addEventListener("resize", handleResize);

    // Animate icons rotation
    let frame;
    const animate = () => {
      setAngleOffset((prev) => prev + 0.002); // adjust speed here
      frame = requestAnimationFrame(animate);
    };
    animate();

    return () => {
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <div className="flex flex-col items-center text-white relative mt-6 sm:mt-8 md:mt-10 mb-12 sm:mb-16 md:mb-20 px-2">
      <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-6 sm:mb-8 md:mb-10 z-10">All Skills</h1>

      <div
        ref={containerRef}
        className="relative"
        style={{
          // make the container square and centered around the circle
          width: radius * 2 + 120,
          height: radius * 2 + 120,
          maxWidth: '100%',
        }}
      >
        {/* Render a full ring: use actual skills for the first N slots, then placeholders
            so the circle looks complete even with few skills. */}
        {(() => {
          const skills = allSkills.allSkills;
          const minSlots = 12; // minimum number of visible slots to form a smooth circle
          const points = Math.max(skills.length, minSlots);

          // Prepare an array of length `points` and place real skills evenly spaced
          const slots = new Array(points).fill(null);
          if (skills.length > 0) {
            for (let k = 0; k < skills.length; k++) {
              // Compute position to place this skill so skills are evenly distributed
                // use floor-based placement to distribute skills evenly without bias
                const pos = Math.floor((k * points) / skills.length);
              // If collision happens (rare), find next empty slot
              let p = pos;
              while (slots[p] !== null) {
                p = (p + 1) % points;
                if (p === pos) break; // full
              }
              slots[p] = skills[k];
            }
          }

          return slots.map((slotSkill, i) => {
            const angle = (i / points) * 2 * Math.PI + angleOffset;
            const x = radius * Math.cos(angle);
            const y = radius * Math.sin(angle);

            const isReal = slotSkill !== null;

            return (
              <motion.div
                key={`${isReal ? slotSkill.icon : 'placeholder'}-${i}`}
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: isReal ? 1 : 0.9 }}
                transition={{
                  delay: i * 0.02,
                  type: "spring",
                  stiffness: 80,
                }}
                whileHover={isReal ? { scale: 1.3, rotate: 15, transition: { duration: 0.3 } } : { scale: 1.1 }}
                className="absolute"
                style={{
                  left: `calc(50% + ${x}px)`,
                  top: `calc(50% + ${y}px)`,
                  transform: "translate(-50%, -50%)",
                  cursor: isReal ? 'pointer' : 'default',
                }}
              >
                {isReal ? (
                  slotSkill.icon !== "springboot" ? (
                    <StackIcon
                      name={slotSkill.icon}
                      style={{
                        width: window.innerWidth < 640 ? "35px" : "50px",
                        height: window.innerWidth < 640 ? "35px" : "50px",
                        filter: "drop-shadow(0px 0px 6px rgba(255,255,255,0.5))",
                      }}
                    />
                  ) : (
                    <img src="/springBoot.png" alt="springboot" style={{ 
                      width: window.innerWidth < 640 ? "35px" : "50px", 
                      height: window.innerWidth < 640 ? "35px" : "50px" 
                    }} />
                  )
                ) : (
                  // Placeholder small dot to visually complete the ring
                  <div
                    style={{
                      width: window.innerWidth < 640 ? 6 : 10,
                      height: window.innerWidth < 640 ? 6 : 10,
                      borderRadius: '50%',
                      background: 'rgba(255,255,255,0.22)',
                      boxShadow: '0 0 6px rgba(255,255,255,0.06)',
                    }}
                  />
                )}
              </motion.div>
            );
          });
        })()}

        {/* Robot in the middle - centered exactly in the container */}
        <div
          className="absolute"
          style={{
            left: "50%",
            top: "50%",
            transform: "translate(-50%, -50%)",
            zIndex: 2,
            width: window.innerWidth < 640 ? "200px" : window.innerWidth < 1024 ? "300px" : "400px",
            height: window.innerWidth < 640 ? "200px" : window.innerWidth < 1024 ? "300px" : "400px",
            pointerEvents: 'none', // allow clicks to pass to icons if needed
          }}
        >
          <Canvas
            camera={{ position: [0, 1.5, 3], fov: 50 }}
            gl={{ antialias: true }}
            dpr={[1, 1.5]}
          >
            <directionalLight position={[-5, -5, 5]} intensity={3} />
            <Suspense fallback={<Loader />}>
              <Bounds observe margin={1.2}>
                <Model />
              </Bounds>
              <OrbitControls enableZoom={false} />
            </Suspense>
          </Canvas>
        </div>
      </div>
    </div>
  );
}
