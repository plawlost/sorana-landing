'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, ChevronUp, Shield, Users, Database, Lock, Code, DollarSign, AlertTriangle, Globe } from 'lucide-react';
import Image from 'next/image';

const API_BASE_URL = 'https://soranaapi.replit.app';

const DynamicBackground = () => (
  <div className="fixed inset-0 z-0">
    <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="grid-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#39FF14" stopOpacity="0.1" />
          <stop offset="100%" stopColor="#39FF14" stopOpacity="0" />
        </linearGradient>
      </defs>
      <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
        <path d="M 40 0 L 0 0 0 40" fill="none" stroke="url(#grid-gradient)" strokeWidth="0.5" />
      </pattern>
      <rect width="100%" height="100%" fill="#0a0a0a" />
      <rect width="100%" height="100%" fill="url(#grid)" />
    </svg>
  </div>
);

const TermsSection = ({ title, content, icon: Icon }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <motion.div 
      className="mb-8 bg-[#141414] rounded-lg overflow-hidden"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
    >
      <button
        className="w-full p-6 flex items-center justify-between text-left focus:outline-none"
        onClick={() => setIsOpen(!isOpen)}
      >
        <div className="flex items-center">
          <Icon className="w-8 h-8 mr-4 text-[#39FF14]" />
          <h3 className="text-xl font-bold">{title}</h3>
        </div>
        {isOpen ? <ChevronUp className="w-6 h-6" /> : <ChevronDown className="w-6 h-6" />}
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
            className="px-6 pb-6"
          >
            <p>{content}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

const VotingSystem = () => {
  return (
    <div className="bg-[#1a1a1a] p-6 rounded-lg mb-8">
      <h3 className="text-2xl font-bold mb-4 text-[#39FF14]">Decentralized Governance</h3>
      <div className="flex flex-wrap justify-around items-center">
        <div className="text-center mb-4">
          <Users className="w-16 h-16 mx-auto mb-2 text-[#39FF14]" />
          <p>Community Proposals</p>
        </div>
        <div className="text-center mb-4">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
          >
            <Globe className="w-16 h-16 mx-auto mb-2 text-[#39FF14]" />
          </motion.div>
          <p>Global Voting</p>
        </div>
        <div className="text-center mb-4">
          <Code className="w-16 h-16 mx-auto mb-2 text-[#39FF14]" />
          <p>Implementation</p>
        </div>
      </div>
      <p className="text-center mt-4">You shape Sorana's future through decentralized voting.</p>
    </div>
  );
};

const NoAdsSection = () => (
  <div className="bg-[#1a1a1a] p-6 rounded-lg mb-8">
    <h3 className="text-2xl font-bold mb-4 text-[#39FF14]">No Ads, No Surveillance</h3>
    <div className="flex justify-center items-center mb-4">
      <div className="relative">
        <AlertTriangle className="w-24 h-24 text-red-500" />
        <motion.div
          className="absolute inset-0 flex items-center justify-center"
          animate={{ rotate: 45 }}
          transition={{ duration: 0.5 }}
        >
          <div className="w-1 h-32 bg-red-500 transform -rotate-45"></div>
        </motion.div>
      </div>
    </div>
    <p className="text-center">Sorana is ad-free and respects your privacy. No tracking, no data selling.</p>
  </div>
);

const termsSections = [
  {
    title: "acceptance of terms",
    content: "by using sorana, you agree to these terms. if you don't agree, please don't use our platform. it's that simple.",
    icon: Shield
  },
  {
    title: "changes to terms",
    content: "we may update these terms. we'll notify you of significant changes. continued use after changes means you accept the new terms.",
    icon: AlertTriangle
  },
  {
    title: "privacy policy",
    content: "our privacy policy is part of these terms. check it out to understand how we handle (or rather, don't handle) your data.",
    icon: Lock
  },
  {
    title: "user accounts",
    content: "you're responsible for maintaining the confidentiality of your account. notify us immediately of any unauthorized use.",
    icon: Users
  },
  {
    title: "content ownership",
    content: "you own your content. by posting, you grant us a license to use it on the platform. but remember, it's still yours.",
    icon: Database
  },
  {
    title: "prohibited conduct",
    content: "don't use sorana for illegal activities, spam, or to harass others. we reserve the right to terminate accounts for misconduct.",
    icon: AlertTriangle
  },
  {
    title: "intellectual property",
    content: "respect others' intellectual property. we'll respond to notices of alleged copyright infringement.",
    icon: Code
  },
  {
    title: "disclaimer of warranties",
    content: "sorana is provided 'as is'. we don't make any warranties about the service's completeness, security, reliability, or availability.",
    icon: AlertTriangle
  },
  {
    title: "limitation of liability",
    content: "we're not liable for indirect, incidental, special, consequential or punitive damages resulting from your use of sorana.",
    icon: Shield
  },
  {
    title: "indemnification",
    content: "you agree to indemnify and hold us harmless from any claims resulting from your use of sorana.",
    icon: Shield
  },
  {
    title: "governing law",
    content: "these terms are governed by the laws of the United Kingdom. any disputes will be resolved in the courts of London.",
    icon: Globe
  },
  {
    title: "sorana reward tokens (srt)",
    content: "srt are not a financial product. their value may fluctuate. use them at your own risk.",
    icon: DollarSign
  }
];

export default function Terms() {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [srtCount, setSrtCount] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const totalScroll = document.documentElement.scrollHeight - window.innerHeight;
      const currentScroll = window.pageYOffset;
      setScrollProgress((currentScroll / totalScroll) * 100);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const fetchSrtCount = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/srt-count`);
        const data = await response.json();
        setSrtCount(data.count);
      } catch (error) {
        console.error('Error fetching SRT count:', error);
      }
    };

    fetchSrtCount();
    const interval = setInterval(fetchSrtCount, 5000); // Update every 5 seconds
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="bg-[#0a0a0a] text-white min-h-screen font-montserrat lowercase relative z-10">
      <DynamicBackground />

      <main className="container mx-auto px-6 py-24 relative z-10">
        <motion.h1
          className="text-5xl md:text-7xl font-bold text-center mb-12"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
        >
          terms of service
        </motion.h1>
        <motion.p
          className="text-xl md:text-2xl text-center mb-12 max-w-3xl mx-auto"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 1, ease: "easeOut" }}
        >
          Simple, Fair, and Transparent
        </motion.p>

        <VotingSystem />
        <NoAdsSection />

        {termsSections.map((section, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1, duration: 0.8, ease: "easeOut" }}
          >
            <TermsSection
              title={section.title}
              content={section.content}
              icon={section.icon}
            />
          </motion.div>
        ))}

        <motion.div
          className="bg-[#39FF14] text-[#0a0a0a] p-8 rounded-lg mt-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 1, ease: "easeOut" }}
        >
          <h2 className="text-3xl font-bold mb-4 text-black">Our Mission: Humanizing the Web, One Step at a Time</h2>
          <p className="text-lg text-black">
            At Sorana, we're on a mission to bring the internet back to its free, open, and human days. The web was once a place where users had power—where connections were authentic, and data wasn't currency. We're using AI to enhance, not exploit, and decentralization to give control back to users. We believe the future of the internet is one where technology serves humanity, not the other way around. And with Sorana, that's exactly what we're building.
          </p>
        </motion.div>
      </main>
    </div>
  );
}
