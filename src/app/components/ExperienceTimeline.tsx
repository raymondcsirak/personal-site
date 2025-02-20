'use client';

import { motion } from 'framer-motion';
import { BriefcaseIcon, GraduationCapIcon } from 'lucide-react';
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
          className="absolute left-1/2 transform -translate-x-1/2 -mt-12 bg-gray-950/80 px-4 py-1 rounded-full"
        >
          <span className="text-gray-400 font-mono">{year}</span>
        </motion.div>
      )}
      <motion.div 
        initial={{ opacity: 0, x: isLeft ? -50 : 50 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className={`flex w-full ${isLeft ? 'justify-start' : 'justify-end'} mb-24`}
      >
        <div className={`w-full md:w-5/12 ${isLeft ? 'md:pr-8' : 'md:pl-8'} relative`}>
          {/* Connection Line */}
          <div className={`hidden md:block absolute top-1/2 ${isLeft ? 'right-0 mr-[-17px]' : 'left-0 ml-[-17px]'} w-4 h-px bg-gray-800`} />
          
          <motion.div
            ref={cardRef}
            onMouseMove={handleMouseMove}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            whileHover={{ y: -5 }}
            transition={{ duration: 0.2 }}
            className="relative p-6 bg-gray-900/50 rounded-lg shadow-xl transition-all duration-300 hover:bg-gray-900/60 border border-gray-800/50 group"
          >
            {/* Glow Effect */}
            <div
              className="absolute inset-0 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-500"
              style={{
                background: isHovered
                  ? `radial-gradient(circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(56, 189, 248, 0.1) 0%, transparent 60%)`
                  : 'none',
                pointerEvents: 'none',
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
              <p className="text-gray-300 text-sm leading-relaxed">{description}</p>
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
      year: "2024",
    },
    {
      title: "CIO | Head of Infrastructure",
      company: "noLimits Technologies srl / Hitter Technologies",
      date: "January 2019 - Present",
      description: "Managing IT infrastructure, providing Level 3 technical support, and overseeing virtualization infrastructure. Responsible for network engineering, IT service management, and supplier relationship management.",
      year: "2023",
    },
    {
      title: "IT Service Manager",
      company: "noLimits Technologies srl",
      date: "June 2018 - January 2019",
      description: "Led IT project management initiatives and provided Level 2 technical support for business clients. Handled TCP/IP network planning and configurations.",
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
      year: "2022",
    },
    {
      title: "Cisco Networking Academy",
      company: "Cisco",
      date: "2019",
      description: "Specialized networking certification and training.",
      isEducation: true,
      year: "2019",
    },
    {
      title: "Journalism",
      company: 'Universitatea "Babeș-Bolyai" din Cluj-Napoca',
      date: "2005 - 2008",
      description: "Bachelor's degree in Journalism, developing strong communication and analytical skills.",
      isEducation: true,
      year: "2005",
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

  return (
    <section className="pt-8 pb-12 bg-gray-950/50">
      <div className="container mx-auto px-4">
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-3xl font-bold text-center mb-16"
        >
          Experience & Education
        </motion.h2>
        
        <div className="relative">
          {/* Center Line */}
          <div className="hidden md:block absolute left-1/2 transform -translate-x-1/2 w-px h-full bg-gray-800" />
          
          {/* Timeline Dot */}
          <div className="hidden md:block absolute left-1/2 transform -translate-x-1/2 -top-2">
            <div className="w-4 h-4 rounded-full bg-blue-500/50" />
          </div>
          
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