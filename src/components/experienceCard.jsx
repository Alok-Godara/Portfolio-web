import React, { useEffect, useRef, useState } from "react";
import {motion, useAnimation, useInView} from "framer-motion";
export default function ExperienceCard(props) {
    const [opacity, setOpacity] = useState(1); // Opacity state for the element
    const elementRef = useRef(null); 
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
    
        window.addEventListener('scroll', handleScroll);
        return () => {
          window.removeEventListener('scroll', handleScroll);
        };
      }, []);
    return (
        <motion.div
    ref={elementRef}
      style={{
        opacity,
        transition: 'opacity 0.6s ease', // Smooth fade-out effect
        position: 'relative',
        zIndex: 1,
      }}
    className="flex flex-row justify-center items-center  rounded-md  text-white">
     {props.experiences.map((experience, index)=>{
         return <div className="flex flex-col bg-slate-600 rounded-md items-center justify-around p-2 m-2"> 
            <div className="flex flex-col bg-salmon rounded-md items-center justify-around m-2 p-2"> 
                <div className="text-yellow-400 text-2xl font-bold">{experience.title}</div>
                <div className="text-white text-xl font-bold">{experience.company}</div>
                <div className="text-white text-xl font-bold">{experience.location}</div>
                <div className="text-white text-xl font-bold">{experience.duration}</div>
            </div>
        </div>
     })}
     {props.experiences.length === 0 &&
        <div className="flex flex-col bg-salmon rounded-md items-center justify-around"> 
        
        </div>}
        </motion.div>

    )
}