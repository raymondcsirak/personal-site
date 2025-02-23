'use client';

import { motion } from 'framer-motion';
import { SendIcon } from 'lucide-react';
import { useEffect, useState } from 'react';

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
    honeypot: '' // Hidden field to catch bots
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [formStartTime] = useState(Date.now());

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // If form is submitted too quickly (less than 3 seconds), likely a bot
    if (Date.now() - formStartTime < 3000) {
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus('idle');
    
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to send message');
      }

      setSubmitStatus('success');
      setFormData({ name: '', email: '', subject: '', message: '', honeypot: '' });
    } catch (error) {
      console.error('Contact form error:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <label htmlFor="name" className="block text-sm font-medium text-gray-300">
            Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            autoComplete="name"
            className="w-full px-4 py-2 bg-gray-900/50 border border-gray-800/50 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/50 text-gray-100"
            placeholder="Your name"
          />
        </div>
        
        <div className="space-y-2">
          <label htmlFor="email" className="block text-sm font-medium text-gray-300">
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            autoComplete="email"
            className="w-full px-4 py-2 bg-gray-900/50 border border-gray-800/50 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/50 text-gray-100"
            placeholder="your@email.com"
          />
        </div>
      </div>
      
      {/* Honeypot field - hidden from real users */}
      <div className="hidden" aria-hidden="true">
        <input
          type="text"
          name="honeypot"
          tabIndex={-1}
          autoComplete="off"
          value={formData.honeypot}
          onChange={handleChange}
        />
      </div>
      
      <div className="space-y-2">
        <label htmlFor="subject" className="block text-sm font-medium text-gray-300">
          Subject
        </label>
        <input
          type="text"
          id="subject"
          name="subject"
          value={formData.subject}
          onChange={handleChange}
          required
          className="w-full px-4 py-2 bg-gray-900/50 border border-gray-800/50 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/50 text-gray-100"
          placeholder="What's this about?"
        />
      </div>
      
      <div className="space-y-2">
        <label htmlFor="message" className="block text-sm font-medium text-gray-300">
          Message
        </label>
        <textarea
          id="message"
          name="message"
          value={formData.message}
          onChange={handleChange}
          required
          rows={6}
          className="w-full px-4 py-2 bg-gray-900/50 border border-gray-800/50 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/50 text-gray-100 resize-none"
          placeholder="Your message here..."
        />
      </div>
      
      <div className="flex justify-end">
        <button
          type="submit"
          disabled={isSubmitting}
          className="flex items-center gap-2 px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isSubmitting ? (
            <>
              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
              <span>Sending...</span>
            </>
          ) : (
            <>
              <SendIcon className="w-5 h-5" />
              <span>Send Message</span>
            </>
          )}
        </button>
      </div>
      
      {submitStatus === 'success' && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="p-4 bg-green-500/10 border border-green-500/20 rounded-lg text-green-400 text-center"
        >
          Thank you! Your message has been sent successfully.
        </motion.div>
      )}
      
      {submitStatus === 'error' && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="p-4 bg-red-500/10 border border-red-500/20 rounded-lg text-red-400 text-center"
        >
          Oops! Something went wrong. Please try again later.
        </motion.div>
      )}
    </form>
  );
} 