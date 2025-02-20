'use client';

import { motion } from 'framer-motion';
import { GithubIcon, LinkedinIcon, MailIcon } from 'lucide-react';
import TerminalIntro from './TerminalIntro';

export default function AnimatedHero() {
  return (
    <>
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="flex flex-col items-center text-center"
      >
        {/* Profile Image */}
        <motion.div 
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: "spring", stiffness: 100 }}
          className="w-48 h-48 rounded-full overflow-hidden mb-8 ring-4 ring-blue-500/20"
        >
          <img 
            src="/profile.jpg" 
            alt="Raymond Csirak"
            className="w-full h-full object-cover"
          />
        </motion.div>

        {/* Name and Title */}
        <h1 className="text-4xl font-bold mb-4">Raymond Csirak</h1>
        <h2 className="text-xl text-gray-400 mb-6">DevOps Engineer & SRE</h2>

        {/* Social Links */}
        <div className="flex gap-4 mb-12">
          <a href="mailto:raymondcsirak@gmail.com" className="text-gray-400 hover:text-blue-500 transition-colors">
            <MailIcon className="w-6 h-6" />
          </a>
          <a href="https://linkedin.com/in/raymondcsirak" className="text-gray-400 hover:text-blue-500 transition-colors">
            <LinkedinIcon className="w-6 h-6" />
          </a>
          <a href="https://github.com/raymondcsirak" className="text-gray-400 hover:text-blue-500 transition-colors">
            <GithubIcon className="w-6 h-6" />
          </a>
        </div>

        {/* Terminal Style Intro and Description Container */}
        <div className="w-full max-w-4xl">
          {/* Terminal Style Intro */}
          <TerminalIntro />

          {/* Brief Description */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.5 }}
            className="text-gray-300 leading-relaxed text-left space-y-6"
          >
            <p>
              With over a decade of experience in the IT industry, I am a seasoned DevOps Engineer and Site Reliability Engineer (SRE) with a proven track record of optimizing infrastructure and enhancing system reliability. At Hitter Technologies, I spearhead the modernization of infrastructure, leveraging my expertise in Kubernetes orchestration, Infrastructure as Code (IaC), and CI/CD automation to deliver robust and scalable solutions. My deep-rooted proficiency in Linux system administration and network engineering underpins my ability to design and implement efficient, secure, and high-availability systems.
            </p>
            
            <p>
              In my role as CIO and Head of Infrastructure at noLimits Technologies, I've demonstrated strong leadership in IT project management and infrastructure optimization. I excel in designing and implementing virtualization solutions, managing complex network architectures, and providing high-level technical support. My experience spans from hands-on system administration to strategic IT planning, enabling me to bridge the gap between technical implementation and business objectives.
            </p>

            <p>
              I am passionate about automation and cloud-native technologies, continuously exploring innovative ways to improve performance and reliability. Fluent in multiple languages (Hungarian, Romanian, English) and equipped with a diverse technical skill set, I am a relentless autodidact and problem-solver. My commitment to excellence, combined with my eagerness to embrace new challenges and drive technological advancements, makes me a valuable asset to any forward-thinking organization looking to modernize their infrastructure and streamline their operations.
            </p>
          </motion.div>
        </div>
      </motion.div>

      {/* Dotted Line Separator */}
      <div className="flex items-center justify-center mt-16 mb-0">
        <div className="flex-1 border-t border-dashed border-gray-700"></div>
        <div className="px-6">
          <span className="text-gray-600 font-mono">&lt;/&gt;</span>
        </div>
        <div className="flex-1 border-t border-dashed border-gray-700"></div>
      </div>
    </>
  );
} 