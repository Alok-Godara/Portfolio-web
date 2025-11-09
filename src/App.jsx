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
    <div className="flex flex-col justify-start items-center  gap-10 max-w-full overflow-x-hidden">
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

      <div className="w-full " ref={aboutRef} style={{ scrollMarginTop: 'var(--nav-height, 100px)' }}>
        <About />
        <div className="flex flex-wrap justify-center items-center gap-5 w-full px-4">
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
            paddingBottom: "210px", 
            boxSizing: "border-box",
            width: "100%",
          }}
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
