'use client';

import { motion } from 'framer-motion';
import { Check, Copy } from 'lucide-react';
import { memo, useState } from 'react';
import ContactForm from '../components/ContactForm';
import { Particles } from "@/components/ui/particles";
import Sidebar from '../components/Sidebar';

// Memoize the Sidebar component to prevent unnecessary re-renders
const MemoizedSidebar = memo(Sidebar);

export default function Contact() {
  const [emailRevealed, setEmailRevealed] = useState(false);
  const [copied, setCopied] = useState(false);
  const email = 'hello@raymi.xyz';

  const handleCopy = async (e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();
    try {
      await navigator.clipboard.writeText(email);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  return (
    <main className="min-h-screen bg-gray-950 text-gray-100 relative">
      <div className="absolute inset-0 overflow-hidden">
        <Particles
          className="pointer-events-none"
          quantity={120}
          staticity={20}
          ease={40}
          size={1.2}
          color="#E5E7EB"
        />
      </div>
      
      <div className="relative z-10 flex">
        <MemoizedSidebar />
        
        <div className="flex-1 md:ml-72">
          <div className="max-w-3xl mx-auto px-4 md:px-8">
            <section className="pt-20 pb-16">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="space-y-8"
              >
                <div className="text-center">
                  <h1 className="text-4xl font-bold mb-4">Get in Touch</h1>
                  <p className="text-gray-300">Have a question or want to work together?</p>
                </div>
                
                <ContactForm />
                
                <div className="text-center text-gray-400 text-sm">
                  <p>
                    You can also reach me directly at{' '}
                    <span className="inline-flex items-center gap-2">
                      {emailRevealed ? (
                        <>
                          <span className="text-blue-400">{email}</span>
                          <button
                            onClick={handleCopy}
                            className="text-gray-400 hover:text-blue-400 transition-colors"
                            title="Copy email"
                          >
                            {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                          </button>
                        </>
                      ) : (
                        <button
                          onClick={() => setEmailRevealed(true)}
                          className="text-blue-400 hover:text-blue-300 focus:outline-none border-b border-dashed border-blue-400"
                        >
                          click to reveal email
                        </button>
                      )}
                    </span>
                  </p>
                </div>
              </motion.div>
            </section>
          </div>
        </div>
      </div>
    </main>
  );
} 