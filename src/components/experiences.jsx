import React from "react"; 
import ExperienceCard from "./experienceCard";

export default function Experiences() {

    const experiences = [
        {
            title: "Amazon ML Summer School",
            company: "Amazon",
            location: "Remote",
            duration: "July-2024 - August-2024",
        },
        {
            title: "NTSE Scholar",
            company: "NCERT",
            location: "San Francisco, CA",
            duration: "2021 - Present",
        },
       {
            title: "Senior Software Engineer",
            company: "Amazon",
            location: "Seattle, WA",        
            duration: "2020 - 2021",
        },
       {
            title: "Software Engineer",
            company: "Google",
            location: "San Francisco, CA",
            duration: "2021 - Present",
        },
    ]
    return (
        <div className="experiences">
            <ExperienceCard experiences={experiences} />

        </div>
    )
}