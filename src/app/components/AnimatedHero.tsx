'use client';

import { motion } from 'framer-motion';
import { Check, Copy, GithubIcon, LinkedinIcon, MailIcon } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import TerminalIntro from './TerminalIntro';

export default function AnimatedHero() {
  const [emailRevealed, setEmailRevealed] = useState(false);
  const [copied, setCopied] = useState(false);
  const email = 'hello@raymi.xyz';
  const emailContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (emailContainerRef.current && !emailContainerRef.current.contains(event.target as Node)) {
        setEmailRevealed(false);
      }
    };

    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, []);

  const handleEmailClick = (e: React.MouseEvent) => {
    e.preventDefault();
    if (!emailRevealed) {
      setEmailRevealed(true);
      return;
    }
    window.location.href = `mailto:${email}`;
  };

  const handleCopy = async (e: React.MouseEvent) => {
    e.stopPropagation();
    try {
      await navigator.clipboard.writeText(email);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  return (
    <>
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full"
      >
        {/* Terminal Style Intro and Description Container */}
        <div className="w-full">
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
      <div className="flex items-center justify-center mt-8 mb-8">
        <div className="flex-1 border-t border-dashed border-gray-700"></div>
        <div className="px-6">
          <span className="text-gray-600 font-mono">&lt;/&gt;</span>
        </div>
        <div className="flex-1 border-t border-dashed border-gray-700"></div>
      </div>
    </>
  );
} 