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
              With over a decade of experience in the IT industry, I am a DevOps and Platform Engineer focused on building resilient, scalable infrastructure. My expertise lies in modernizing legacy systems through Kubernetes orchestration (including bare-metal setups), Infrastructure as Code (IaC), and GitOps workflows using Argo CD and GitLab.
            </p>

            <p>
              Currently, I specialize in bridging the gap between complex operations and seamless delivery. I am passionate about leveraging AI-powered tools to accelerate engineering workflows, optimize CI/CD pipelines, and enhance system reliability. Whether designing high-availability Linux systems or automating disaster recovery strategies, I combine deep technical root-cause analysis with a strategic mindset to drive operational efficiency.
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