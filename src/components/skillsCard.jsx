import React, { useEffect } from "react";
import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";
import StackIcon from "tech-stack-icons";
import { useLottie } from "lottie-react";
import chessLottie2 from "../assets/chess2.json";

const SkillsCard = (props) => {
  const controls = useAnimation();
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.2 });

  useEffect(() => {
    if (inView) {
      controls.start({
        opacity: 1,
        scale: 1,
        rotate: 360,
        transition: { duration: 1, ease: "easeInOut" },
      });
    }
  }, [controls, inView]);

  const style = { height: "100px" };

  const Example2 = () => {
    const options = {
      animationData: chessLottie2,
      loop: true,
      autoplay: true,
    };
    const { View } = useLottie(options, style);
    return View;
  };

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, scale: 1, rotate: 0 }}
      animate={controls}
      whileHover={{ scale: 1.05 }}
      className="w-full sm:w-[280px] md:w-[300px] p-4 sm:p-6 rounded-xl cursor-pointer 
                 bg-black/40 backdrop-blur-lg border border-white/10 shadow-lg 
                 transition-all duration-300 hover:border-yellow-400 hover:shadow-yellow-400/30"
    >
      <div className="flex flex-col justify-center items-center gap-3 text-center">
        <h2 className="text-xl sm:text-2xl font-bold text-yellow-300">{props.title}</h2>
        <p className="text-gray-200 text-xs sm:text-sm">{props.description}</p>

       

        {props.title === "Chess Platform" ? <Example2 /> : null}

        {props.link && (
          <div
            onClick={() => {
              window.open(props.link);
            }}
            className="hover:scale-110 transition-transform"
          >
            <StackIcon name="github" style={{ width: "40px", height: "40px",  filter:
            "drop-shadow(0px 0px 6px rgba(255,255,255,0.8)) brightness(1.2)", }} className="sm:w-[50px] sm:h-[50px]" />
          </div>
        )}

        {/* <StackIcon name={props.icon} style={{ width: "50px", height: "50px" }} /> */}
      </div>
    </motion.div>
  );
};

export default SkillsCard;
