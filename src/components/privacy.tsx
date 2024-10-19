'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, ChevronUp, Lock, Database, Shield, Users, Code, DollarSign, Menu, X } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

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

const PrivacySection = ({ title, content, icon: Icon }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <motion.div 
      className="mb-8 bg-[#141414] rounded-lg overflow-hidden"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
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
            transition={{ duration: 0.3 }}
            className="px-6 pb-6"
          >
            <p>{content}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default function Privacy() {
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

  const privacySections = [
    {
      title: "privacy built in, not added on",
      content: "at sorana, we don't just say we care about privacy—we built it into every corner of our platform. there are no centralized servers here, no creepy data tracking, and absolutely no selling your information to advertisers. sorana is decentralized, and your data stays yours. period.",
      icon: Lock
    },
    {
      title: "why we don't really need a privacy policy",
      content: "here's the deal: since sorana doesn't collect your personal data, we technically don't even need a privacy policy. but we're giving you one anyway, just to make it crystal clear how we roll. we're a decentralized platform, and your data belongs to you—always. no sneaky fine print, no hidden data collection. simple as that.",
      icon: Shield
    },
    {
      title: "you own your data",
      content: "in the world of sorana, ownership is real. every search, contribution, and interaction you have belongs to you. no one's selling your data behind your back. it's yours to control, to share, or to keep private. welcome to a platform where your data isn't a product—it's your property.",
      icon: Database
    },
    {
      title: "stay anonymous—unless you break the rules",
      content: "you don't need to share personal details to use sorana. stay anonymous if you want. however, if you decide to start earning sorana reward tokens (srt) or contribute content, we'll need a bit of info to verify your participation. but even then, it's your choice how much to disclose. that said, if you mess with the system (like manipulating srt earnings or spreading false contributions), our ai will catch you, and you'll be put on time-out (aka view-only mode). stay fair, and your anonymity is golden.",
      icon: Users
    },
    {
      title: "blockchain-powered privacy",
      content: "sorana runs on the polygon blockchain, which means every action you take is encrypted and decentralized. no central authority holds your data, and no one—absolutely no one—can spy on your activity. blockchain ensures that privacy isn't just a promise—it's a guarantee. you own the data, the platform just facilitates the action.",
      icon: Lock
    },
    {
      title: "decentralized nodes: your privacy, your power",
      content: "here's where it gets really interesting. sorana is powered by decentralized nodes hosted by users like you. but before you worry about privacy—relax. even though users host parts of the network, all data is encrypted, so no one has access to personal information, not even the people hosting the nodes. your privacy remains intact while you help power the future of the decentralized web. hosting a node makes you part of the infrastructure, but not part of anyone's personal business.",
      icon: Users
    },
    {
      title: "no third-party trackers or ads",
      content: "we don't play with third-party trackers, and we sure as hell don't sell your data. sorana is ad-free and always will be. there are no algorithms watching your every move, and no brands whispering creepy, targeted ads based on what you do. your browsing experience is clean, uninterrupted, and yours alone.",
      icon: Shield
    },
    {
      title: "decentralized governance = decentralized privacy",
      content: "by early 2026, sorana will be fully decentralized, meaning the community will have control over the platform's future—including privacy updates. every major decision, including how privacy is handled, will be up for community vote. no top-down control, no behind-the-scenes changes. just open, transparent governance driven by the users.",
      icon: Users
    },
    {
      title: "updates to the privacy policy",
      content: "any changes to this privacy policy? you'll be the first to know because you'll be the one deciding. as sorana evolves, all updates will be discussed and voted on by the community. transparency is the game here, and you'll have full visibility into any changes before they happen. open-source, open-policy—that's how we roll.",
      icon: Shield
    },
    {
      title: "transparency you can trust",
      content: "starting with our beta launch, sorana will be fully open-source, licensed under a 'full view, no copy' policy. that means you can inspect the code, verify how everything works, and trust that nothing shady is happening behind closed doors. we have nothing to hide, and we're inviting you to take a look.",
      icon: Code
    },
    {
      title: "no sfw or content restrictions",
      content: "we believe in a free and open web, which means we don't impose sfw or inappropriate content restrictions. you can browse and create without censorship. however, abuse of the srt system or false contributions will result in restricted access to your account—fair is fair. beyond that, your experience is yours to shape.",
      icon: Shield
    },
    {
      title: "your rights: total control at all times",
      content: "you're in charge here. want to delete your account? you can do it anytime. want to stay anonymous? you've got that option too. it's your data, and you have the power to control it. sorana exists to empower users, not to control them. you make the rules.",
      icon: Users
    },
    {
      title: "can i earn cash from srt? absolutely.",
      content: "you bet. sorana reward tokens (srt) are yours to use however you want. you can export them, import them, convert them to cash, exchange them, and even spend them in our growing ecosystem. built on the polygon blockchain, srt is flexible, valuable, and 100% yours to control. earn it, trade it, cash it out—it's entirely up to you.",
      icon: DollarSign
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
          privacy policy
        </motion.h1>
        <motion.p
          className="text-xl md:text-2xl text-center mb-12 max-w-3xl mx-auto"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.8 }}
        >
          We Don't Hold Your Privacy. We Save It.
        </motion.p>

        {privacySections.map((section, index) => (
          <PrivacySection
            key={index}
            title={section.title}
            content={section.content}
            icon={section.icon}
          />
        ))}
      </main>

    </div>
  );
}