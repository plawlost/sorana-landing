'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useTransform, useSpring, AnimatePresence } from 'framer-motion';
import { ChevronDown, Search, Globe, Satellite, Menu, X, ArrowRight } from 'lucide-react';
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

const ScrollPrompt = () => (
  <motion.div
    className="absolute bottom-10 left-1/2 transform -translate-x-1/2"
    animate={{ y: [0, 10, 0] }}
    transition={{ repeat: Infinity, duration: 1.5 }}
  >
    <ChevronDown className="w-10 h-10 text-[#39FF14]" />
    <span className="text-[#39FF14] mt-2">scroll to see the future</span>
  </motion.div>
);

const PhaseSection = ({ title, description, highlights, visual, index }) => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });

  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0.8, 1, 1, 0.8]);
  const x = useTransform(scrollYProgress, [0, 1], [100, -100]);

  const springConfig = { stiffness: 100, damping: 30, restDelta: 0.001 };
  const animatedX = useSpring(x, springConfig);

  return (
    <motion.section
      ref={ref}
      className="min-h-screen flex items-center justify-center py-20 relative z-10"
      style={{ opacity, scale }}
    >
      <motion.div 
        className="container mx-auto px-4 flex flex-col md:flex-row items-center"
        style={{ x: animatedX }}
      >
        <div className="w-full md:w-1/2 mb-10 md:mb-0">
          <motion.h2 
            className="text-3xl md:text-4xl font-bold text-[#39FF14] mb-6"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            {title}
          </motion.h2>
          <motion.p 
            className="text-base md:text-lg mb-6 text-gray-300"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            {description}
          </motion.p>
          <motion.ul 
            className="mb-6"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            {highlights.map((highlight, i) => (
              <motion.li 
                key={i} 
                className="flex items-center mb-2 text-gray-300"
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.8 + i * 0.1 }}
              >
                <span className="text-[#39FF14] mr-2">•</span>
                {highlight}
              </motion.li>
            ))}
          </motion.ul>
        </div>
        <div className="w-full md:w-1/2">
          {visual}
        </div>
      </motion.div>
    </motion.section>
  );
};

const AnimatedIcon = ({ Icon }) => {
  const [rotation, setRotation] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setRotation((prev) => (prev + 1) % 360);
    }, 50);

    return () => clearInterval(interval);
  }, []);

  return (
    <motion.div
      className="relative h-60 md:h-80 w-full"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
    >
      <motion.div
        className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
        animate={{ rotate: rotation }}
      >
        <Icon className="w-16 h-16 md:w-20 md:h-20 text-[#39FF14]" />
      </motion.div>
      <motion.div
        className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.5, 1, 0.5],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      >
        <div className="w-40 h-40 rounded-full border-4 border-[#39FF14] opacity-50" />
      </motion.div>
    </motion.div>
  );
};

const SlideShowBackground = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const images = [
    '/images/satellite.png',
    '/images/www.png',
    '/images/aaron.png',
    '/images/iran.png',
    '/images/web3.png'
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 5000); // Change image every 5 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="absolute inset-0 z-0 overflow-hidden">
      <div className="absolute inset-0" style={{ paddingBottom: '56.25%' }}> {/* 16:9 aspect ratio */}
        {images.map((image, index) => (
          <motion.div
            key={index}
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url(${image})` }}
            initial={{ opacity: 0 }}
            animate={{ opacity: index === currentImageIndex ? 1 : 0 }}
            transition={{ duration: 1 }}
          />
        ))}
      </div>
      <div className="absolute inset-0 bg-black bg-opacity-50 backdrop-filter backdrop-blur-sm" />
    </div>
  );
};

const TimelineSplitter = ({ date, description }) => (
  <motion.div 
    className="py-20 text-center relative z-10"
    initial={{ opacity: 0, y: 50 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.8 }}
  >
    <div className="w-1 h-20 bg-[#39FF14] mx-auto mb-6"></div>
    <h3 className="text-3xl font-bold text-[#39FF14] mb-2">{date}</h3>
    <p className="text-gray-300">{description}</p>
    <div className="w-1 h-20 bg-[#39FF14] mx-auto mt-6"></div>
  </motion.div>
);

export default function Roadmap() {
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

  return (
    <div className="bg-[#0a0a0a] text-white min-h-screen font-montserrat lowercase relative z-10">
      <DynamicBackground />

      <div className="h-1 bg-[#39FF14] fixed top-0 left-0 z-50" style={{ width: `${scrollProgress}%` }}></div>

      <section className="relative min-h-screen flex flex-col justify-center items-center text-center px-4 pt-20 z-10">
        <motion.h1
          className="text-4xl sm:text-6xl md:text-8xl font-bold mb-6 leading-tight text-[#39FF14]"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          the roadmap to<br />owning the web
        </motion.h1>
        <motion.p
          className="text-lg sm:text-xl md:text-2xl mb-8 max-w-3xl text-gray-300"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.8 }}
        >
          a step-by-step revolution to reclaiming the internet for you
        </motion.p>
        <ScrollPrompt />
      </section>

      <PhaseSection
        title="phase 1: sorana engine"
        description="Revolutionize search with the first truly decentralized engine. Powered by users, for users, Sorana Engine ensures your data remains yours while delivering unbiased, manipulation-free results."
        highlights={[
          "Blockchain-based rewards with SRT tokens",
          "No corporate ads or SEO tricks",
          "Decentralized search nodes and human-driven results"
        ]}
        visual={<AnimatedIcon Icon={Search} />}
        index={1}
      />

      <TimelineSplitter 
        date="Q2 2025" 
        description="Sorana Engine Launch: The dawn of decentralized search"
      />

      <PhaseSection
        title="phase 2: sorana nexus"
        description="Redefine your browsing experience with the world's first decentralized, privacy-first browser. Sorana Nexus puts you in control, rewarding you for your participation in this revolutionary ecosystem."
        highlights={[
          "Privacy through decentralized hosting",
          "Users hosting the content they browse",
          "SRT tokens as a reward system"
        ]}
        visual={<AnimatedIcon Icon={Globe} />}
        index={2}
      />

      <TimelineSplitter 
        date="Q4 2025" 
        description="Sorana Nexus Release: Browsing reimagined, privacy amplified"
      />

      <PhaseSection
        title="phase 3: sorana orbit"
        description="Envision a world with unrestricted internet access, free from ISP control. Sorana Orbit creates a global, decentralized satellite mesh network, putting the power of connectivity in the hands of users worldwide."
        highlights={[
          "Satellite-based mesh network, user-powered",
          "Free internet access worldwide, no ISP control",
          "Users contributing to network infrastructure earn SRT tokens"
        ]}
        visual={<AnimatedIcon Icon={Satellite} />}
        index={3}
      />

      <TimelineSplitter 
        date="Q1 2026" 
        description="Sorana Orbit Activation: The internet breaks free from Earth's constraints"
      />

      <section className="relative min-h-screen flex flex-col items-center justify-center py-20 px-4 z-20 overflow-hidden">
        <SlideShowBackground />
        <div className="relative z-10 max-w-4xl mx-auto text-center">
          <motion.h2 
            className="text-3xl md:text-4xl font-bold mb-8 md:mb-12 text-[#39FF14]"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            join the revolution
          </motion.h2>
          <motion.p 
            className="text-base md:text-xl max-w-2xl mx-auto mb-8 md:mb-10 text-gray-300"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            We are just getting started. Sorana is growing rapidly, and we want you to be part of it. With the launch of Sorana Engine, Nexus, and Orbit, the internet is no longer controlled by corporations. It's yours.
          </motion.p>
          <motion.p 
            className="text-xl md:text-2xl font-bold mb-8 md:mb-10 text-[#39FF14]"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            Join us as we reshape the web, step by step.
          </motion.p>
          <motion.div 
            className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-6"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            <motion.a 
              href="/#join"
              className="bg-[#39FF14] text-[#0a0a0a] px-6 py-3 rounded-full font-bold hover:bg-opacity-80 transition-all duration-300 text-sm md:text-base"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              sign up for alpha access
            </motion.a>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
