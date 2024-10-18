'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Shield, Zap, Globe, ChevronDown, Menu, X } from 'lucide-react';
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

const Page = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [email, setEmail] = useState('');
  const [githubLink, setGithubLink] = useState('');
  const [linkedinLink, setLinkedinLink] = useState('');
  const [name, setName] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
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

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    try {
      const response = await fetch(`${API_BASE_URL}/signup`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, githubLink, linkedinLink, name }),
      });
      
      if (!response.ok) {
        throw new Error('signup failed');
      }

      setIsModalOpen(true);
    } catch (err) {
      setError('an error occurred. please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const products = [
    {
      icon: Search,
      title: 'sorana engine',
      status: 'already in alpha',
      description: 'the decentralized search engine where users own their data and get real, human-driven results. no ads, no seo tricks, no tracking.'
    },
    {
      icon: Globe,
      title: 'sorana nexus',
      status: 'coming soon',
      description: 'the decentralized browser built for privacy, with no ads, no trackers, and no censorship. the only browser you\'ll need to browse safely and freely.'
    },
    {
      icon: Zap,
      title: 'sorana orbit',
      status: 'in development',
      description: 'the decentralized satellite mesh network that delivers true global internet, free from isp control. powered by the people, for the people.'
    }
  ];

  return (
    <div className="bg-[#0a0a0a] text-white min-h-screen font-montserrat lowercase relative z-10">
      <DynamicBackground />

      <nav className="fixed top-0 left-0 right-0 z-50 bg-[#0a0a0a] bg-opacity-90 backdrop-blur-md">
        <div className="container mx-auto px-6 py-4 flex justify-between items-center">
          <a href="#" className="text-2xl font-bold">
            <Image src="/sorana.png" alt="Sorana" width={120} height={40} />
          </a>
          <div className="hidden md:flex space-x-8">
            <a href="#why" className="hover:text-[#39FF14] transition-colors duration-300">why sorana</a>
            <a href="#products" className="hover:text-[#39FF14] transition-colors duration-300">products</a>
            <a href="#join" className="hover:text-[#39FF14] transition-colors duration-300">join alpha</a>
          </div>
          <button className="md:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
        <div className="h-1 bg-[#39FF14]" style={{ width: `${scrollProgress}%` }}></div>
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              className="md:hidden bg-[#0a0a0a] bg-opacity-95 absolute top-full left-0 right-0 p-4"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
            >
              <a href="#why" className="block py-2 hover:text-[#39FF14] transition-colors duration-300">why sorana</a>
              <a href="#products" className="block py-2 hover:text-[#39FF14] transition-colors duration-300">products</a>
              <a href="#join" className="block py-2 hover:text-[#39FF14] transition-colors duration-300">join alpha</a>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      <section className="relative min-h-screen flex flex-col justify-center items-center text-center px-4 pt-20 z-10">
        <motion.h1
          className="text-6xl md:text-8xl font-bold mb-6 leading-tight text-[#39FF14]"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          be the web.<br />own the web.
        </motion.h1>
        <motion.p
          className="text-xl md:text-2xl mb-8 max-w-3xl text-gray-300"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.8 }}
        >
          the decentralized search engine where you own your data, contribute, and earn. no ads. no tracking. just real, human-driven results.
        </motion.p>
        <motion.button
          className="bg-[#39FF14] text-[#0a0a0a] text-xl py-4 px-10 rounded-full hover:bg-opacity-90 transition-all duration-300 transform hover:scale-105"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => document.getElementById('join')?.scrollIntoView({ behavior: 'smooth' })}
        >
          join the alpha
        </motion.button>
        <motion.div
          className="absolute bottom-10 left-1/2 transform -translate-x-1/2"
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 1.5 }}
        >
          <ChevronDown size={32} className="text-[#39FF14]" />
        </motion.div>
      </section>

      <section id="why" className="py-20 px-4 relative z-10">
        <div className="container mx-auto">
          <h2 className="text-4xl font-bold text-center mb-12">what's wrong with today's internet?</h2>
          <div className="flex flex-col md:flex-row max-w-6xl mx-auto">
            <motion.div
              className="flex-1 p-8 bg-[#141414] rounded-lg mb-8 md:mb-0 md:mr-8 transition-all duration-300 cursor-pointer"
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              whileHover={{ scale: 1.05 }}
            >
              <h3 className="text-2xl font-bold mb-4 text-[#39FF14]">the dead internet</h3>
              <p className="text-gray-300">the internet today is controlled by corporations. every search you make is tracked, every click is sold, and you're shown what they want you to see. the web isn't free anymore—it's manipulated by seo, clickbait, and ads.</p>
            </motion.div>
            <motion.div
              className="flex-1 p-8 bg-[#39FF14] rounded-lg transition-all duration-300 cursor-pointer"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              whileHover={{ scale: 1.05 }}
            >
              <h3 className="text-2xl font-bold mb-4 text-[#0a0a0a]">the sorana solution</h3>
              <p className="text-[#0a0a0a]">decentralized, human-driven, authentic results. take back control of your data and contribute to a free and open internet. with sorana, you're not just a user—you're an owner of the web.</p>
            </motion.div>
          </div>
        </div>
      </section>

      <section id="products" className="py-20 px-4 relative z-10">
        <div className="container mx-auto">
          <h2 className="text-4xl font-bold text-center mb-12">the sorana ecosystem</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {products.map((product, index) => (
              <motion.div
                key={product.title}
                className="text-center p-6 bg-[#141414] rounded-lg hover:bg-[#39FF14] hover:text-[#0a0a0a] transition-all duration-300 cursor-pointer group"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.2 }}
                whileHover={{ scale: 1.05 }}
              >
                <product.icon className="w-16 h-16 text-[#39FF14] group-hover:text-[#0a0a0a] mx-auto mb-4" />
                <h3 className="text-2xl font-bold mb-2">{product.title}</h3>
                <p className="text-[#39FF14] group-hover:text-[#0a0a0a] mb-4">{product.status}</p>
                <p className="text-gray-300 group-hover:text-[#0a0a0a]">{product.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section id="join" className="py-20 px-4 bg-[#0a0a0a] relative z-10">
        <div className="container mx-auto">
          <h2 className="text-4xl font-bold text-center mb-4">join the sorana alpha</h2>
          <p className="text-xl text-center mb-8 text-gray-300">be part of the movement that's taking back the web. your feedback and contributions will help shape sorana for the world.</p>
          <form onSubmit={handleSubmit} className="max-w-md mx-auto">
            <div className="mb-4">
              <input
                type="email"
                placeholder="enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full p-4 bg-[#141414] text-white rounded-full focus:outline-none focus:ring-2 focus:ring-[#39FF14]"
                required
              />
            </div>
            <div className="mb-4">
              <input
                type="text"
                placeholder="github/gitlab link"
                value={githubLink}
                onChange={(e) => setGithubLink(e.target.value)}
                className="w-full p-4 bg-[#141414] text-white rounded-full focus:outline-none focus:ring-2 focus:ring-[#39FF14]"
              />
            </div>
            <div className="mb-4">
              <input
                type="text"
                placeholder="linkedin"
                value={linkedinLink}
                onChange={(e) => setLinkedinLink(e.target.value)}
                className="w-full p-4 bg-[#141414] text-white rounded-full focus:outline-none focus:ring-2 focus:ring-[#39FF14]"
              />
            </div>
            <div className="mb-4">
              <input
                type="text"
                placeholder="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full p-4 bg-[#141414] text-white rounded-full focus:outline-none focus:ring-2 focus:ring-[#39FF14]"
              />
</div>
            {error && <p className="text-red-500 text-center mb-4">{error}</p>}
            <motion.button
              type="submit"
              className="w-full bg-[#39FF14] text-[#0a0a0a] text-xl py-4 rounded-full hover:bg-opacity-90 transition-all duration-300"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              disabled={isLoading}
            >
              {isLoading ? 'signing up...' : 'sign up for early access'}
            </motion.button>
          </form>
        </div>
      </section>

      <footer className="py-12 px-4 bg-[#141414] relative z-10">
        <div className="container mx-auto">
          <div className="flex flex-wrap justify-between items-center">
            <div className="w-full md:w-1/3 mb-6 md:mb-0">
              <h3 className="text-2xl font-bold text-[#39FF14] mb-2">sorana</h3>
              <p className="text-gray-300">decentralizing the web, one search at a time.</p>
            </div>
            <nav className="w-full md:w-1/3 mb-6 md:mb-0">
              <ul className="flex flex-wrap justify-center md:justify-end">
                <li><a href="#" className="text-gray-300 hover:text-[#39FF14] mx-3 transition-colors duration-200">terms</a></li>
                <li><a href="#" className="text-gray-300 hover:text-[#39FF14] mx-3 transition-colors duration-200">privacy</a></li>
                <li><a href="#" className="text-gray-300 hover:text-[#39FF14] mx-3 transition-colors duration-200">about us</a></li>
                <li><a href="#" className="text-gray-300 hover:text-[#39FF14] mx-3 transition-colors duration-200">roadmap</a></li>
                <li><a href="#" className="text-gray-300 hover:text-[#39FF14] mx-3 transition-colors duration-200">contact</a></li>
              </ul>
            </nav>
            <div className="w-full md:w-1/3 text-center md:text-right">
              <p className="text-gray-300">&copy; 2024 sorana. all rights reserved.</p>
              <p className="text-[#39FF14] mt-2">total srt earned: {srtCount.toLocaleString()}</p>
            </div>
          </div>
        </div>
      </footer>

      <AnimatePresence>
        {isModalOpen && (
          <motion.div
            className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="bg-[#141414] p-8 rounded-lg max-w-md text-center"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
            >
              <h3 className="text-2xl font-bold mb-4 text-[#39FF14]">thank you for joining!</h3>
              <p className="mb-6 text-gray-300">we're excited to have you on board. you'll be among the first to experience the future of the web.</p>
              <motion.button
                onClick={() => setIsModalOpen(false)}
                className="bg-[#39FF14] text-[#0a0a0a] py-3 px-6 rounded-full hover:bg-opacity-90 transition-all duration-300"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                close
              </motion.button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Page;