"use client";

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Anton } from "next/font/google";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGithub } from '@fortawesome/free-brands-svg-icons';

const anton = Anton({
  weight: ["400"],
  style: ["normal"],
  subsets: ["latin"],
});

interface ProjectData {
  name: string;
  desc: string;
  link: string;
  github: string;
  imgUrl: string;
  buttonText: string;
  iconList: React.ReactNode[];
}

interface ProjectsGridProps {
  projects: ProjectData[];
  moreProjectsText: string;
}

export const ProjectsGrid: React.FC<ProjectsGridProps> = ({ projects, moreProjectsText }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  // Ensure we have at least 6 items for the grid (PC layout)
  const totalSlots = 6;
  const placeholdersCount = Math.max(0, totalSlots - projects.length);
  const placeholders = Array(placeholdersCount).fill(null);

  const allItems = [...projects, ...placeholders];

  return (
    <div className="w-full flex flex-col items-center">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 w-full">
        {allItems.map((project, index) => {
          // Responsive visibility logic
          // Mobile (<md): Show first 3 (index 0,1,2). Hide others.
          // Tablet (md<lg): Show first 4 (index 0,1,2,3). Hide others.
          // PC (>=lg): Show all 6.
          let visibilityClass = "";
          if (!isExpanded) {
            if (index === 3) visibilityClass = "hidden md:block";
            else if (index >= 4) visibilityClass = "hidden lg:block";
          }

          return (
            <div key={index} className={`relative h-[20rem] md:h-[25rem] w-full ${visibilityClass}`}>
              {project ? (
                <div className="relative group w-full h-full overflow-hidden cursor-pointer border border-transparent">
                  {/* Background Image */}
                  <Image
                    src={require(`@/assets/projects/${project.imgUrl}`)}
                    alt={project.name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  
                  {/* Overlay Content */}
                  <div className="absolute inset-0 bg-black/80 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-center items-center p-6 text-center">
                    <h3 className={`text-white font-bold text-2xl mb-3 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300 ${anton.className}`}>
                      {project.name}
                    </h3>
                    <p className="text-white mb-6 text-sm md:text-base transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300 delay-75 line-clamp-4">
                      {project.desc}
                    </p>
                    
                    {/* Icons */}
                    <div className="flex gap-3 mb-6 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300 delay-100 justify-center">
                      {project.iconList.map((icon: any, idx: any) => (
                        <div key={idx} className="text-white">
                          {icon}
                        </div>
                      ))}
                    </div>

                    {/* Actions */}
                    <div className="flex gap-4 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300 delay-150 items-center">
                      <Link 
                        href={project.link} 
                        target="_blank"
                        className="bg-yellow-400 text-black font-bold py-2 px-6 rounded-full hover:bg-yellow-300 transition-all"
                      >
                        {project.buttonText || "Ver más"}
                      </Link>

                      <Link 
                        href={project.github} 
                        target="_blank"
                        className="bg-black text-white p-3 rounded-full hover:bg-gray-800 transition-all flex justify-center items-center border border-white/20"
                        aria-label="View on GitHub"
                      >
                        <FontAwesomeIcon icon={faGithub} className="w-5 h-5" />
                      </Link>
                    </div>
                  </div>
                </div>
              ) : (
                // More Projects Placeholder
                <Link
                  href="https://github.com/andevbonilla?tab=repositories"
                  target="_blank"
                  className="w-full h-full bg-yellow-400 flex justify-center items-center border-black border-[1px] hover:bg-yellow-300 transition-colors cursor-pointer text-decoration-none"
                >
                  <span className={`text-black font-bold text-2xl sm:text-3xl ${anton.className} text-center`}>
                    {moreProjectsText}
                  </span>
                </Link>
              )}
            </div>
          );
        })}
      </div>

      {/* "Ver más" button for Mobile/Tablet */}
      {!isExpanded && (
        <button
          onClick={() => setIsExpanded(true)}
          className="mt-8 bg-transparent border-2 border-white text-white font-bold py-2 px-8 rounded-full hover:bg-white hover:text-black transition-colors lg:hidden"
        >
          Ver más
        </button>
      )}
    </div>
  );
};
