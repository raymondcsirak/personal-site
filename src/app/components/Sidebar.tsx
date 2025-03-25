'use client';

import { Check, Copy, GithubIcon, InstagramIcon, LinkedinIcon, MailIcon, Menu, TwitterIcon, X } from 'lucide-react';
import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';

export default function Sidebar() {
  const [emailRevealed, setEmailRevealed] = useState(false);
  const [copied, setCopied] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
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

  const SidebarContent = () => (
    <>
      <div className="w-32 h-32 md:w-32 md:h-32 rounded-full overflow-hidden mb-6 ring-4 ring-blue-500/20">
        <img 
          src="/profile.jpg" 
          alt="Raymond Csirak"
          className="w-full h-full object-cover"
        />
      </div>

      <div className="text-center mb-4">
        <h1 className="text-2xl font-bold mb-2">Raymond Csirak</h1>
        <h2 className="text-gray-400">DevOps Engineer & SRE</h2>
      </div>

      <div className="flex gap-4 mb-8">
        <a href="https://linkedin.com/in/raymondcsirak" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-blue-500 transition-colors">
          <LinkedinIcon className="w-6 h-6" />
        </a>
        <a href="https://github.com/raymondcsirak" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-blue-500 transition-colors">
          <GithubIcon className="w-6 h-6" />
        </a>
        <a href="https://instagram.com/raymondcsirak" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-blue-500 transition-colors">
          <InstagramIcon className="w-6 h-6" />
        </a>
        <a href="https://x.com/raymondcsirak" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-blue-500 transition-colors">
          <TwitterIcon className="w-6 h-6" />
        </a>
      </div>

      <nav className="w-full">
        <ul className="space-y-2">
          <li>
            <Link 
              href="/" 
              className="flex items-center px-4 py-2 text-gray-300 hover:bg-gray-900/50 rounded-lg transition-colors"
            >
              About Me
            </Link>
          </li>
          <li>
            <a 
              href="/Raymond_Csirak.pdf" 
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center px-4 py-2 text-gray-300 hover:bg-gray-900/50 rounded-lg transition-colors"
            >
              Resume
            </a>
          </li>
          <li>
            <Link 
              href="/contact" 
              className="flex items-center px-4 py-2 text-gray-300 hover:bg-gray-900/50 rounded-lg transition-colors"
            >
              Contact
            </Link>
          </li>
        </ul>
      </nav>
    </>
  );

  return (
    <>
      {/* Mobile Menu Button */}
      <button 
        onClick={() => setIsMenuOpen(!isMenuOpen)}
        className="md:hidden fixed top-4 right-4 z-50 p-2 bg-gray-900/90 rounded-lg text-gray-300 hover:text-blue-500 transition-colors"
      >
        {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
      </button>

      {/* Desktop Sidebar */}
      <aside className="hidden md:flex fixed left-0 top-0 h-screen w-72 bg-gray-950/80 border-r border-gray-800/50 p-8 flex-col items-center justify-center">
        <SidebarContent />
      </aside>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className="md:hidden fixed inset-0 bg-gray-950/95 z-40 flex flex-col items-center justify-center p-8"
        >
          <SidebarContent />
        </motion.div>
      )}
    </>
  );
} 