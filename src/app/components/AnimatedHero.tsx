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

        {/* Terminal Style Intro */}
        <TerminalIntro />

        {/* Brief Description */}
        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          className="max-w-2xl text-gray-300 leading-relaxed"
        >
          With over ten years of experience in the IT industry, I am a DevOps Engineer and SRE specializing in Kubernetes, CI/CD, and infrastructure automation. I'm passionate about optimizing performance, reliability, and security through modern cloud-native solutions.
        </motion.p>
      </motion.div>

      {/* Dotted Line Separator */}
      <div className="flex items-center justify-center mt-20 mb-4">
        <div className="w-12 h-12 flex items-center justify-center">
          <span className="text-gray-600 font-mono">&lt;/&gt;</span>
        </div>
        <div className="flex-1 border-t border-dashed border-gray-700 mx-4"></div>
      </div>
    </>
  );
} 