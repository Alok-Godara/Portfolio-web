import React from "react";
import { Briefcase, Award } from "lucide-react"; // icon library, optional

const Experiences = () => {
  return (
    <section id="experience" className="w-full px-4 sm:px-6 md:px-8 pb-5 flex flex-col items-center gap-6 sm:gap-8">
      <h2 className="text-2xl sm:text-3xl font-bold text-white flex items-center gap-3">
        <Briefcase className="text-yellow-400 w-6 h-6 sm:w-8 sm:h-8" />
        Experience
      </h2>

      {/* Project H Experience */}
      <div className="w-full max-w-4xl bg-black/40 backdrop-blur-lg border border-white/10 rounded-xl p-4 sm:p-6 shadow-lg">
        <h3 className="text-xl sm:text-2xl font-semibold text-yellow-300"> 
          Web & App Developer
        </h3>
        <p className="text-gray-400 text-sm sm:text-base">Project H • India</p>
        <p className="text-xs sm:text-sm text-gray-500 mb-3">Feb 2025 – Oct 2025</p>

        <ul className="list-disc list-inside space-y-2 text-gray-200 text-sm sm:text-base"> 
          <li>
            Built secure web and mobile platforms to digitize and organize patient medical records, 
            helping oncologists speed up diagnosis and treatment.
          </li>
          <li>
            Integrated AI workflows by coordinating with doctors to collect, digitize, and verify handwritten medical data.
          </li>
          <li>
            Scaled the system for the <strong>Virtual Molecular Tumor Board (VMTB)</strong> under the National Cancer Grid, 
            enabling automated case review and clinical decision support.
          </li>
        </ul>
      </div>

      {/* Research Experience */}
      <div className="w-full max-w-4xl bg-black/40 backdrop-blur-lg border border-white/10 rounded-xl p-4 sm:p-6 shadow-lg">
        <h3 className="text-xl sm:text-2xl font-semibold text-blue-300 flex items-center gap-2">
          <Award className="text-blue-400 w-6 h-6 sm:w-8 sm:h-8" />
          Research Projects
        </h3>
        <p className="text-gray-400 text-sm sm:text-base">IIT Jodhpur • India</p>
        <p className="text-xs sm:text-sm text-gray-500 mb-3">Aug 2024 – Nov 2025</p>

        <ul className="list-disc list-inside space-y-2 text-gray-200 text-sm sm:text-base">
          <li>
            <strong>Smart Damping — MR Fluid Damper Model:</strong> Built and tested a two-story aluminum structure 
            with MR dampers to control vibrations under variable electromagnetic fields.
          </li>
          <li>
            <strong>Eco Asphalt — Coconut Fiber Reinforced Mix:</strong> Developed low-emission, durable asphalt for 
            low-traffic regions using coconut fibers in cold mix designs.
          </li>
          <li>
            <strong>Fast Separation — 3D-Printed Electro-Coalescer:</strong> Designed coalescers to rapidly separate water 
            from crude oil using electric fields and 3D-printed components.
          </li>
        </ul>
      </div>
    </section>
  );
};

export default Experiences;
