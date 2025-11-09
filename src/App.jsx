import Navbar from "./components/navbar";
import ParticleBackground from "./components/particles";
import Skills from "./components/skills.jsx";
import About from "./components/about.jsx";
import AllSkills from "./components/allSkills.jsx";
import Projects from "./components/projects.jsx";
import Experiences from "./components/experiencesNew.jsx";
import { useRef } from "react";

const App = () => {
  const aboutRef = useRef(null);
  const projectsRef = useRef(null);
  const allSkillsRef = useRef(null);
  const experiencesRef = useRef(null);
  return (
    <div className="flex flex-col justify-start items-center gap-6 sm:gap-8 md:gap-10 max-w-full overflow-x-hidden">
      <div className="-z-20 relative">
        <ParticleBackground />
      </div>

      <div className="mb-5">
        <Navbar
          aboutRef={aboutRef}
          projectsRef={projectsRef}
          allSkillsRef={allSkillsRef}
          experiencesRef={experiencesRef}
        />
      </div>

      <div className="w-full px-2 sm:px-4" ref={aboutRef} style={{ scrollMarginTop: 'var(--nav-height, 100px)' }}>
        <About />
        <div className="flex flex-wrap justify-center items-center gap-4 sm:gap-5 w-full px-2 sm:px-4">
          <Skills />
        </div>
        <div ref={allSkillsRef} style={{ scrollMarginTop: 'var(--nav-height, 100px)' }}>
          <AllSkills />
        </div>
        <div
          ref={projectsRef}
          style={{
            scrollMarginTop: 'var(--nav-height, 100px)',
            // minHeight: "100vh", // occupy full viewport so only Projects are visible
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            paddingTop: "0px",
            paddingBottom: "150px", 
            boxSizing: "border-box",
            width: "100%",
          }}
          className="pb-24 sm:pb-32 md:pb-52"
        >
          <Projects />
        </div>
        <div ref={experiencesRef} style={{ scrollMarginTop: 'var(--nav-height, 100px)' }}>
          <Experiences />
        </div>
      </div>
    </div>
  );
};
export default App;
