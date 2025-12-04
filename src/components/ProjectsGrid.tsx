import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

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
}

export const ProjectsGrid: React.FC<ProjectsGridProps> = ({ projects }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 w-full">
      {projects.map((project, index) => (
        <div key={index} className="relative group h-[20rem] md:h-[25rem] w-full overflow-hidden cursor-pointer">
          {/* Background Image */}
          <Image
            src={require(`@/assets/projects/${project.imgUrl}`)}
            alt={project.name}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          />
          
          {/* Overlay Content */}
          <div className="absolute inset-0 bg-black/80 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-center items-center p-6 text-center">
            <h3 className="text-white font-bold text-2xl mb-3 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
              {project.name}
            </h3>
            <p className="text-white mb-6 text-sm md:text-base transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300 delay-75 line-clamp-4">
              {project.desc}
            </p>
            
            {/* Icons */}
            <div className="flex gap-3 mb-6 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300 delay-100 justify-center">
              {project.iconList.map((icon, idx) => (
                <div key={idx} className="text-white">
                  {icon}
                </div>
              ))}
            </div>

            {/* View More Button (GitHub) */}
            <Link 
              href={project.github} 
              target="_blank"
              className="bg-yellow-400 text-black font-bold py-2 px-6 rounded-full hover:bg-yellow-300 transition-all transform translate-y-4 group-hover:translate-y-0 duration-300 delay-150"
            >
              Ver más
            </Link>
          </div>
        </div>
      ))}
    </div>
  );
};
