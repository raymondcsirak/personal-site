'use client';

import { motion } from 'framer-motion';
import { BriefcaseIcon, GraduationCapIcon } from 'lucide-react';

interface TimelineItemProps {
  title: string;
  company: string;
  date: string;
  description: string;
  isLeft?: boolean;
  isEducation?: boolean;
}

const TimelineItem = ({ title, company, date, description, isLeft = false, isEducation = false }: TimelineItemProps) => {
  return (
    <motion.div 
      initial={{ opacity: 0, x: isLeft ? -50 : 50 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className={`flex w-full ${isLeft ? 'justify-start' : 'justify-end'} mb-8`}
    >
      <div className={`w-full md:w-5/12 ${isLeft ? 'md:pr-8' : 'md:pl-8'}`}>
        <div className="p-6 bg-gray-800 rounded-lg shadow-xl hover:shadow-2xl transition-shadow">
          <div className="flex items-center mb-4">
            <div className="p-2 bg-blue-500/10 rounded-lg mr-4">
              {isEducation ? (
                <GraduationCapIcon className="w-6 h-6 text-blue-400" />
              ) : (
                <BriefcaseIcon className="w-6 h-6 text-blue-400" />
              )}
            </div>
            <div>
              <h3 className="text-lg font-semibold">{title}</h3>
              <p className="text-gray-400">{company}</p>
            </div>
          </div>
          <p className="text-sm text-blue-400 mb-3">{date}</p>
          <p className="text-gray-300 text-sm leading-relaxed">{description}</p>
        </div>
      </div>
    </motion.div>
  );
};

export default function ExperienceTimeline() {
  const experiences = [
    {
      title: "DevOps Engineer & SRE",
      company: "Hitter Technologies srl",
      date: "March 2022 - Present",
      description: "Leading DevOps initiatives, managing Kubernetes clusters, and implementing CI/CD pipelines. Specializing in containerization, infrastructure automation, and system reliability.",
    },
    {
      title: "CIO | Head of Infrastructure",
      company: "noLimits Technologies srl / Hitter Technologies",
      date: "January 2019 - Present",
      description: "Managing IT infrastructure, providing Level 3 technical support, and overseeing virtualization infrastructure. Responsible for network engineering and IT service management.",
    },
    {
      title: "IT Service Manager",
      company: "noLimits Technologies srl",
      date: "June 2018 - January 2019",
      description: "Led IT project management initiatives and provided Level 2 technical support for business clients. Handled TCP/IP network planning and configurations.",
    },
  ];

  const education = [
    {
      title: "Computer Programming",
      company: "Universitate Tehnica Cluj Napoca",
      date: "2022 - 2024",
      description: "Bachelor's degree in Computer Programming, focusing on software development and engineering principles.",
      isEducation: true,
    },
    {
      title: "Journalism",
      company: 'Universitatea "Babeș-Bolyai" din Cluj-Napoca',
      date: "2005 - 2008",
      description: "Bachelor's degree in Journalism, developing strong communication and analytical skills.",
      isEducation: true,
    },
  ];

  return (
    <section className="py-20 bg-gray-900/50">
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
          <div className="hidden md:block absolute left-1/2 transform -translate-x-1/2 w-px h-full bg-gray-700" />
          
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
              isLeft={index % 2 === 0}
            />
          ))}
        </div>
      </div>
    </section>
  );
} 