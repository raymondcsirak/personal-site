'use client';

import { motion } from 'framer-motion';
import { BriefcaseIcon, GraduationCapIcon, LayersIcon } from 'lucide-react';
import { useRef, useState } from 'react';

interface TimelineItemProps {
  title: string;
  company: string;
  date: string;
  description: string;
  isLeft?: boolean;
  isEducation?: boolean;
  year?: string;
}

const KustomizeIcon = () => (
  <div className="relative w-full h-full flex items-center justify-center">
    <div className="absolute inset-0 flex items-center justify-center text-lg font-bold text-gray-300">K</div>
    <div className="absolute inset-0 flex items-center justify-center text-lg font-bold text-gray-300/30 translate-x-0.5 translate-y-0.5">K</div>
    <div className="absolute inset-0 flex items-center justify-center text-lg font-bold text-gray-300/20 translate-x-1 translate-y-1">K</div>
  </div>
);

const TechStackIcon = ({ name, useIcon: Icon }: { name: string, useIcon?: React.ComponentType<any> }) => (
  <div className="group relative flex items-center bg-gray-900/50 hover:bg-gray-800/50 transition-colors rounded-md px-2 py-1.5 border border-gray-800/50">
    <div className="w-6 h-6">
      {Icon ? (
        <Icon className="w-full h-full text-gray-300" />
      ) : (
        <img 
          src={`/icons/${name}.svg`} 
          alt={name}
          className="w-full h-full"
        />
      )}
    </div>
    <span className="ml-2 text-gray-300 text-sm">{name.charAt(0).toUpperCase() + name.slice(1)}</span>
  </div>
);

const TimelineItem = ({ title, company, date, description, isLeft = false, isEducation = false, year }: TimelineItemProps) => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    setMousePosition({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  return (
    <div className="relative">
      {year && (
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="absolute left-1/2 transform -translate-x-1/2 top-1/2"
        >
          <div className="w-3 h-3 rounded-full bg-blue-500/50" />
        </motion.div>
      )}
      <motion.div 
        initial={{ opacity: 0, x: isLeft ? -50 : 50 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className={`flex w-full ${isLeft ? 'justify-start' : 'justify-end'} mb-24`}
      >
        <div className={`w-full md:w-[47%] ${isLeft ? 'md:pr-0' : 'md:pl-0'} relative`}>
          {/* Remove the old connection line div since we're using the triangle */}
          
          <motion.div
            ref={cardRef}
            onMouseMove={handleMouseMove}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            whileHover={{ y: -5 }}
            transition={{ duration: 0.2 }}
            className={`relative p-6 bg-gray-900/50 shadow-xl transition-all duration-300 hover:bg-gray-900/60 border border-gray-800/50 group
              ${isLeft ? 'clip-path-right' : 'clip-path-left'}`}
            style={{
              clipPath: isLeft 
                ? 'polygon(0 0, calc(100% - 20px) 0, 100% 50%, calc(100% - 20px) 100%, 0 100%)'
                : 'polygon(20px 0, 100% 0, 100% 100%, 20px 100%, 0 50%)'
            }}
          >
            {/* Glow Effect */}
            <div
              className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
              style={{
                background: isHovered
                  ? `radial-gradient(circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(56, 189, 248, 0.1) 0%, transparent 60%)`
                  : 'none',
                pointerEvents: 'none',
                clipPath: isLeft 
                  ? 'polygon(0 0, calc(100% - 20px) 0, 100% 50%, calc(100% - 20px) 100%, 0 100%)'
                  : 'polygon(20px 0, 100% 0, 100% 100%, 20px 100%, 0 50%)'
              }}
            />

            <div className="relative z-10">
              <div className="flex items-center mb-4">
                <div className="p-2 bg-blue-500/5 rounded-lg mr-4">
                  {isEducation ? (
                    <GraduationCapIcon className="w-6 h-6 text-blue-400/80" />
                  ) : (
                    <BriefcaseIcon className="w-6 h-6 text-blue-400/80" />
                  )}
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-100">{title}</h3>
                  <p className="text-gray-400">{company}</p>
                </div>
              </div>
              <p className="text-sm text-blue-400/80 mb-3">{date}</p>
              <p className="text-gray-300 text-sm leading-relaxed mb-4">{description}</p>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
};

export default function ExperienceTimeline() {
  const experiences = [
    {
      title: "DevOps Engineer & SRE",
      company: "Hitter Technologies srl",
      date: "March 2022 - Present",
      description: "Leading DevOps initiatives, managing Kubernetes clusters, and implementing CI/CD pipelines. Specializing in containerization, infrastructure automation, and system reliability. Key expertise in Kubernetes & IaC, containerization, CI/CD automation with GitLab and ArgoCD, backup strategies, and Linux administration.",
      year: "•",
    },
    {
      title: "CIO | Head of Infrastructure",
      company: "noLimits Technologies srl / Hitter Technologies",
      date: "January 2019 - Present",
      description: "Managing IT infrastructure, providing Level 3 technical support, and overseeing virtualization infrastructure. Responsible for network engineering, IT service management, and supplier relationship management.",
      year: "•",
    },
    {
      title: "IT Service Manager",
      company: "noLimits Technologies srl",
      date: "June 2018 - January 2019",
      description: "Led IT project management initiatives and provided Level 2 technical support for business clients. Handled TCP/IP network planning and configurations.",
      year: "•",
    },
    {
      title: "IT Support Specialist",
      company: "noLimits Technologies srl",
      date: "January 2017 - January 2019",
      description: "Offering Level 1 and basic level 2 technical support for business clients.",
    },
    {
      title: "Application Test and Development, Sales Representative",
      company: "noLimits Technologies srl",
      date: "November 2015 - June 2017",
      description: "Combined roles in application testing, development, and sales representation.",
    },
    {
      title: "Jewelry Engraver, Designer, CNC Operator",
      company: "Bijuteria AS, Eldorado",
      date: "January 2015 - October 2015",
      description: "Specialized in jewelry engraving, design, and CNC machine operation.",
    },
    {
      title: "IT Service Technician, Service Manager",
      company: "Ltt Halo",
      date: "September 2008 - January 2015",
      description: "Provided Level 0, 1, and 2 support for business and regular clients. Handled network infrastructure planning, building, and maintenance.",
    },
    {
      title: "International Correspondent Reporter",
      company: "MTVA",
      date: "September 2011 - August 2013",
      description: "Covered news from Satu Mare and Maramures counties for MTVA in Hungary. Created mini-documentaries and arranged interviews, including writing and organizing narratives.",
    },
  ];

  const education = [
    {
      title: "Computer Programming",
      company: "Universitate Tehnica Cluj Napoca",
      date: "2022 - 2024",
      description: "Bachelor's degree in Computer Programming, focusing on software development and engineering principles.",
      isEducation: true,
      year: "•",
    },
    {
      title: "Cisco Networking Academy",
      company: "Cisco",
      date: "2019",
      description: "Specialized networking certification and training.",
      isEducation: true,
      year: "•",
    },
    {
      title: "Journalism",
      company: 'Universitatea "Babeș-Bolyai" din Cluj-Napoca',
      date: "2005 - 2008",
      description: "Bachelor's degree in Journalism, developing strong communication and analytical skills.",
      isEducation: true,
      year: "•",
    },
    {
      title: "Journalism and Multimedia",
      company: "Ady Endre Media College",
      date: "2003 - 2005",
      description: "Studies in journalism and multimedia content creation.",
      isEducation: true,
    },
    {
      title: "General Studies",
      company: "Roman Catholic Theological High School Hám János",
      date: "1999 - 2003",
      description: "High school education with focus on general studies.",
      isEducation: true,
    },
  ];

  const techStack = [
    "kubernetes", "helm", 
    { name: "kustomize", icon: KustomizeIcon },
    "argocd", "gitlab", "docker", "grafana",
    "linux", "bash", "terraform", "vagrant", "ansible", "proxmox", 
    "vmware"
  ];

  return (
    <section className="pt--10 pb-12 bg-gray-950/50">
      <div className="container mx-auto px-4">
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-3xl font-bold text-center mb-8"
        >
          Experience & Education
        </motion.h2>

        {/* Tech Stack */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-wrap justify-center gap-3 mb-12 max-w-4xl mx-auto"
        >
          {techStack.map((tech, index) => (
            <TechStackIcon 
              key={typeof tech === 'string' ? tech : tech.name} 
              name={typeof tech === 'string' ? tech : tech.name}
              useIcon={typeof tech === 'string' ? undefined : tech.icon}
            />
          ))}
        </motion.div>
        
        <div className="relative">
          {/* Center Line */}
          <div className="hidden md:block absolute left-1/2 transform -translate-x-1/2 w-px h-full bg-gray-800" />
          
          {/* Timeline Items */}
          {experiences.map((exp, index) => (
            <TimelineItem
              key={index}
              {...exp}
              isLeft={index % 2 === 0}
            />
          ))}
          
          {/* Education */}
          {education.map((edu, index) => (
            <TimelineItem
              key={`edu-${index}`}
              {...edu}
              isLeft={(index + experiences.length) % 2 === 0}
            />
          ))}
        </div>
      </div>
    </section>
  );
} 