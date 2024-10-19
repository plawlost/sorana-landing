'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { FaInstagram, FaGitlab, FaXTwitter } from 'react-icons/fa6';

const API_BASE_URL = 'https://soranaapi.replit.app';

export const Footer = () => {
  const [srtCount, setSrtCount] = useState(0);

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
    const interval = setInterval(fetchSrtCount, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <footer className="bg-[#141414] text-gray-300 py-8 px-4 relative z-10 mt-auto">
      <div className="max-w-screen-xl mx-auto flex flex-col items-center space-y-6">
        <div className="flex flex-col items-center space-y-4 text-center">
          <Image src="/images/sorana-small.png" alt="Sorana" width={32} height={32} />
          <p className="text-sm">Decentralizing the web, one search at a time.</p>
          <div className="flex space-x-4">
            <a href="https://instagram.com/sorana.web" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-[#39FF14]">
              <FaInstagram size={24} />
            </a>
            <a href="https://gitlab.com/sorana_web" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-[#39FF14]">
              <FaGitlab size={24} />
            </a>
            <a href="https://x.com/sorana_web" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-[#39FF14]">
              <FaXTwitter size={24} />
            </a>
          </div>
        </div>
        
        <nav className="w-full">
          <ul className="flex flex-wrap justify-center space-x-4">
            {['home', 'about', 'roadmap', 'contact', 'privacy', 'terms'].map((item) => (
              <li key={item} className="mb-2">
                <Link href={`/${item === 'home' ? '' : item}`} className="text-sm hover:text-[#39FF14] transition-colors duration-200">
                  {item}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        
        <div className="text-center">
          <p className="text-xs">&copy; 2024 PlawLabs Ltd, London, UK. All rights reserved.</p>
          <p className="text-xs text-gray-400">(Temporarily under PlawLabs)</p>
          <p className="text-[#39FF14] text-sm font-semibold mt-2">
            Total SRT earned: {srtCount ? srtCount.toLocaleString() : '0'}
          </p>
        </div>
      </div>
    </footer>
  );
};
