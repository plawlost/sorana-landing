'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, ChevronUp, Mail, Briefcase, HelpCircle, Globe as GlobeIcon, ArrowRight, Menu, X } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import Globe, { GLOBE_CONFIG } from './ui/globe';

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

const ContactSection = ({ icon: Icon, title, description, email }) => (
  <motion.div 
    className="bg-[#141414] p-6 rounded-lg hover:bg-[#39FF14] hover:text-[#0a0a0a] transition-all duration-300 cursor-pointer group"
    whileHover={{ scale: 1.05 }}
    whileTap={{ scale: 0.95 }}
  >
    <Icon className="w-12 h-12 text-[#39FF14] group-hover:text-[#0a0a0a] mb-4" />
    <h3 className="text-2xl font-bold mb-2 group-hover:text-[#0a0a0a]">{title}</h3>
    <p className="text-gray-300 group-hover:text-[#0a0a0a] mb-4">{description}</p>
    <a href={`mailto:${email}`} className="text-[#39FF14] group-hover:text-[#0a0a0a] font-bold flex items-center">
      {email}
      <ArrowRight className="ml-2" />
    </a>
  </motion.div>
);

const FAQItem = ({ question, answer }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="mb-4">
      <button
        className="flex justify-between items-center w-full text-left p-4 bg-[#141414] hover:bg-[#39FF14] hover:text-[#0a0a0a] transition-all duration-300 rounded-lg"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className="font-bold">{question}</span>
        {isOpen ? <ChevronUp /> : <ChevronDown />}
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="p-4 bg-[#0f0f0f] rounded-b-lg"
          >
            <p>{answer}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const InteractiveGlobe = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let animationFrameId;

    const drawGlobe = (time) => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;

      const centerX = canvas.width / 2;
      const centerY = canvas.height / 2;
      const radius = Math.min(centerX, centerY) * 0.8;

      // Draw globe
      ctx.beginPath();
      ctx.arc(centerX, centerY, radius, 0, Math.PI * 2);
      ctx.strokeStyle = '#39FF14';
      ctx.lineWidth = 2;
      ctx.stroke();

      // Draw latitude lines
      for (let i = 1; i < 5; i++) {
        ctx.beginPath();
        ctx.arc(centerX, centerY, radius * i / 5, 0, Math.PI * 2);
        ctx.strokeStyle = 'rgba(57, 255, 20, 0.3)';
        ctx.stroke();
      }

      // Draw longitude lines
      for (let i = 0; i < 12; i++) {
        const angle = (i / 12) * Math.PI * 2;
        ctx.beginPath();
        ctx.moveTo(centerX, centerY);
        ctx.lineTo(centerX + Math.cos(angle) * radius, centerY + Math.sin(angle) * radius);
        ctx.strokeStyle = 'rgba(57, 255, 20, 0.3)';
        ctx.stroke();
      }

      // Animate points for different locations
      const locations = [
        { angle: time / 1000, distance: 0.8 },
        { angle: time / 1500 + Math.PI / 2, distance: 0.9 },
        { angle: time / 2000 + Math.PI, distance: 0.85 },
        { angle: time / 1800 + 3 * Math.PI / 2, distance: 0.95 },
      ];

      locations.forEach(loc => {
        const x = centerX + Math.cos(loc.angle) * radius * loc.distance;
        const y = centerY + Math.sin(loc.angle) * radius * loc.distance;
        ctx.beginPath();
        ctx.arc(x, y, 3, 0, Math.PI * 2);
        ctx.fillStyle = '#39FF14';
        ctx.fill();
      });

      animationFrameId = requestAnimationFrame(drawGlobe);
    };

    const handleResize = () => {
      if (canvasRef.current) {
        canvasRef.current.width = canvasRef.current.offsetWidth;
        canvasRef.current.height = canvasRef.current.offsetHeight;
      }
    };

    window.addEventListener('resize', handleResize);
    handleResize();

    drawGlobe(0);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return <canvas ref={canvasRef} className="w-full h-full min-h-[300px]" />;
};

export default function Contact() {
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

  useEffect(() => {
    // Add this effect to handle hash navigation
    const handleHashChange = () => {
      const hash = window.location.hash;
      if (hash === '#faq') {
        const faqSection = document.getElementById('faq-section');
        if (faqSection) {
          faqSection.scrollIntoView({ behavior: 'smooth' });
        }
      }
    };

    // Call the function once on mount to handle initial load
    handleHashChange();

    // Add event listener for hash changes
    window.addEventListener('hashchange', handleHashChange);

    // Clean up the event listener on component unmount
    return () => {
      window.removeEventListener('hashchange', handleHashChange);
    };
  }, []);

  const faqItems = [
    {
      question: "what is sorana, and why is it revolutionary?",
      answer: "sorana is the first truly decentralized platform where users own their data and contributions. no corporate control, no data harvesting. it's built on blockchain and powered by ai, rewarding users with sorana reward tokens (srt). this isn't just another platform—it's the future of the web."
    },
    {
      question: "how do i join the sorana team?",
      answer: "we're looking for visionaries, not employees. if you're ready to live and breathe decentralization, shoot us an email at careers@sorana.io. tell us how you can help build the future."
    },
    {
      question: "how will sorana make money without selling my data?",
      answer: "we take a 3% fee on all srt transactions—simple, transparent, and fair. we'll also offer premium services within sorana, but don't worry—no ads, no data selling. just value-driven monetization."
    },
    {
      question: "how decentralized is sorana?",
      answer: "right now, sorana is rapidly decentralizing, but here's the kicker: we aim to be 100% decentralized by early 2026. that means sorana's management and development will be governed by its users, with new decisions voted on inside the platform. no ceo dictating the future—just the community shaping it."
    },
    {
      question: "can i earn cash from srt?",
      answer: "absolutely. you can export, import, convert, exchange, and spend srt however you want. srt is built on the polygon blockchain, so whether you want to trade it, cash out, or use it in the ecosystem, the choice is yours."
    },
    {
      question: "what's the difference between sorana engine, nexus, and orbit?",
      answer: "sorana engine (launching q2 2025) is our decentralized search engine. nexus (launching q4 2025) is our privacy-first browser. orbit (launching q1 2026) is the world's first satellite-based decentralized mesh network. together, they're building the backbone of the decentralized internet."
    },
    {
      question: "how do i invest in sorana?",
      answer: "we're open to pre-seed funding right now. if you're ready to back the next big thing in decentralized tech, email us at invest@sorana.io. be quick—the future doesn't wait."
    },
    {
      question: "what countries are part of sorana's global team?",
      answer: "our team is as borderless as the internet we're building. we have members from turkey, palestine, ukraine, india, canada, and more. we're creating a truly decentralized web, and our team reflects that global mission."
    },
    {
      question: "what blockchain does sorana use?",
      answer: "sorana is built on the polygon blockchain for its speed, scalability, and low transaction costs. it powers the srt ecosystem and ensures sorana remains fully decentralized."
    },
    {
      question: "what's sorana's end game?",
      answer: "we're making the internet baseless and 100% decentralized. by early 2026, sorana will be fully decentralized, with users managing and voting on all key decisions. this isn't just a platform—it's a movement, and we're building the future of the web together."
    },
    {
      question: "who created this mind-blowing website?",
      answer: "ah, you caught me! it's yaz here, the ceo. while omar was busy revolutionizing our product's web side, i decided to flex my 'mad coding skills' and whip up this site. did you like it? i mean, of course you did. it's a masterpiece of neon green and blockchain buzzwords."
    }
  ];

  return (
    <div className="bg-[#0a0a0a] text-white min-h-screen font-montserrat lowercase relative z-10">
      <DynamicBackground />

      <main className="container mx-auto px-4 py-20 relative z-10">
        <motion.h1
          className="text-5xl md:text-7xl font-bold mb-6 text-center text-[#39FF14]"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          contact us
        </motion.h1>
        <motion.p
          className="text-xl md:text-2xl text-center mb-12 max-w-3xl mx-auto"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.8 }}
        >
          This Isn't Just a Platform—It's the Future of the Internet. Ready to Build It With Us?
        </motion.p>

        <section className="mb-20">
          <h2 className="text-3xl font-bold mb-6 text-[#39FF14]">Join the Revolution</h2>
          <p className="text-gray-300 mb-6">
            At Sorana, we're not just creating a platform—we're laying the foundation for a new internet. And this isn't for the faint of heart. We're looking for builders, outliners, and risk-takers ready to shape the decentralized future with us. Whether you want to invest, partner, or join our revolutionary team, you're in the right place. Let's talk.
          </p>
        </section>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
          <ContactSection
            icon={Mail}
            title="Invest in the Future"
            description="Sorana is open for pre-seed funding. Get in on the ground floor before it's too late. Our Engine launches in Q2 2025, followed by Nexus in Q4 2025, and Orbit in Q1 2026. The goal? Full decentralization by early 2026."
            email="invest@sorana.io"
          />
          <ContactSection
            icon={Briefcase}
            title="Join Our Revolution"
            description="We don't want employees—we want revolutionaries. If you're ready to lose sleep, obsess over code, and live and breathe Sorana, then you're the kind of outliner we want on our team."
            email="careers@sorana.io"
          />
          <ContactSection
            icon={HelpCircle}
            title="Get Real Support"
            description="Got a question? Need help with something? We're here for you—no corporate BS, just real support. We'll get back to you within 48 hours."
            email="support@sorana.io"
          />
        </div>

        <div className="flex flex-col md:flex-row items-center justify-between mb-20">
          <div className="w-full md:w-1/2 mb-8 md:mb-0">
            <h2 className="text-3xl font-bold mb-4 text-[#39FF14]">Global Team, Global Vision</h2>
            <p className="text-gray-300 mb-4">
              Our headquarters is currently in London, under PlawLabs Ltd, but that's just our launchpad. We're expanding to the Netherlands, Singapore, San Francisco, and more. We're on a mission to make the internet truly baseless and global, and our team already reflects that—coming from Turkey, Palestine, Ukraine, India, Canada, and more.
            </p>
            <p className="text-gray-300">
              Soon, you'll see us everywhere, and we'll be adding a globe to Sorana so you can track our growing presence.
            </p>
          </div>
          <div className="w-full md:w-1/2 h-64 md:h-96">
            <InteractiveGlobe />
          </div>
        </div>

        <section id="faq-section" className="mb-20">
          <h2 className="text-3xl font-bold mb-8 text-center text-[#39FF14]">Frequently Asked Questions</h2>
          <div className="max-w-3xl mx-auto">
            {faqItems.map((item, index) => (
              <FAQItem key={index} question={item.question} answer={item.answer} />
            ))}
          </div>
        </section>

        <section className="mb-20">
          <h2 className="text-3xl font-bold mb-4 text-[#39FF14]">See Us Across the Globe</h2>
          <p className="text-gray-300 mb-8">
            We're expanding fast. From London to the Netherlands, Singapore, San Francisco, and beyond—Sorana is a global force. Get ready to see us everywhere.
          </p>
          <div className="relative w-full h-[300px] sm:h-[400px] md:h-[500px] lg:h-[600px] overflow-hidden rounded-lg bg-[#141414]">
            <Globe 
              config={{
                ...GLOBE_CONFIG,
                baseColor: [0.1, 0.1, 0.1],
                glowColor: [0.22, 1, 0.08],
                markerColor: [1, 0, 0],
                diffuse: 0.2,
              }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] to-transparent pointer-events-none"></div>
          </div>
        </section>
      </main>
    </div>
  );
}
