'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const totalScroll = document.documentElement.scrollHeight - window.innerHeight;
      const currentScroll = window.pageYOffset;
      setScrollProgress((currentScroll / totalScroll) * 100);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-[#0a0a0a] bg-opacity-90 backdrop-blur-md">
      <div className="container mx-auto px-6 py-4 flex justify-between items-center">
        <Link href="/" className="text-2xl font-bold">
          <Image src="/images/sorana.png" alt="Sorana" width={120} height={40} />
        </Link>
        <div className="hidden md:flex space-x-8">
          <Link href="/about" className="text-white hover:text-[#39FF14] transition-colors duration-300">about</Link>
          <Link href="/roadmap" className="text-white hover:text-[#39FF14] transition-colors duration-300">roadmap</Link>
          <Link href="/contact" className="text-white hover:text-[#39FF14] transition-colors duration-300">contact</Link>
          <Link href="/contact#faq" className="text-white hover:text-[#39FF14] transition-colors duration-300">faq</Link>
          <Link href="/#join" className="text-white hover:text-[#39FF14] transition-colors duration-300">join alpha</Link>
        </div>
        <button className="md:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
          {isMenuOpen ? <X className="w-6 h-6 text-white" /> : <Menu className="w-6 h-6 text-white" />}
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
            <Link href="/about" className="block py-2 text-white hover:text-[#39FF14] transition-colors duration-300">about</Link>
            <Link href="/roadmap" className="block py-2 text-white hover:text-[#39FF14] transition-colors duration-300">roadmap</Link>
            <Link href="/contact" className="block py-2 text-white hover:text-[#39FF14] transition-colors duration-300">contact</Link>
            <Link href="/contact#faq" className="block py-2 text-white hover:text-[#39FF14] transition-colors duration-300">faq</Link>
            <Link href="/#join" className="block py-2 text-white hover:text-[#39FF14] transition-colors duration-300">join alpha</Link>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};
