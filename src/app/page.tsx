//page.tsx

'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Zap, Globe, ChevronDown, Linkedin, Twitter, Mail, Instagram } from 'lucide-react';
import Image from 'next/image';
const API_BASE_URL = 'https://soranaapi.replit.app';

const teamMembers = [
  { 
    name: 'yaz', 
    role: 'co-founder & ceo, head of vision', 
    bio: "founder of plawlabs, clade ai and the driving force behind sorana. from leading privacy-first innovations to spearheading the revolution to reclaim the web, yaz is shaping the future of decentralized search and putting control back in users' hands.", 
    imgSrc: '/images/yaz.jpg',
    xLink: 'https://x.com/plawlost/',
    email: 'yaz@sorana.io'
  },
  { 
    name: 'nik', 
    role: 'co-founder & head of industrial & strategic partnerships', 
    bio: 'leading sorana\'s industrial development and satellite strategy, while securing key partnerships to push the product forward. about to drop out of harvard because he believes in sorana that much.', 
    imgSrc: '/images/nik.png',
    linkedinLink: 'https://www.linkedin.com/in/ntoz',
    email: 'nik@sorana.io'
  },
  { 
    name: 'omar', 
    role: 'co-founder & head of web & ux', 
    bio: "computer science graduate and devops wizard, omar crafts sorana's minimal, intuitive interface while ensuring seamless integration across the entire tech stack. his expertise in both user experience and backend infrastructure makes sorana's performance as magical as its design.", 
    imgSrc: '/images/omar.png',
    linkedinLink: 'https://www.linkedin.com/in/omaradwn/',
    email: 'omar@sorana.io'
  },
  { 
    name: 'kyrie', 
    role: 'head of marketing & communications', 
    bio: 'crafting the story behind sorana, telling the world why it matters and getting people hooked.', 
    imgSrc: '/images/kyrie.jpg',
    instagramLink: 'https://www.instagram.com/kyriewasbanned/?utm_source=ig_web_button_share_sheet',
    email: 'kyrie@sorana.io'
  },
  { 
    name: 'kareem', 
    role: 'crypto & financial strategy advisor', 
    bio: 'innovating sorana\'s financial strategy, keeping the numbers sharp while leading the crypto approach.', 
    imgSrc: '/images/kerem.png',
    linkedinLink: 'https://www.linkedin.com/in/kerem-kahraman-9912232a6',
    email: 'kareem@sorana.io'
  }
];


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

      const data = await response.json();
      if (data.success) {
        setIsModalOpen(true);
      } else {
        throw new Error('signup failed');
      }
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
    <h2 className="text-4xl font-bold text-center mb-12 text-[#39FF14]">what's wrong with today's internet?</h2>
    <div className="flex flex-col md:flex-row max-w-6xl mx-auto space-y-8 md:space-y-0 md:space-x-8">
      <div className="flex-1 flex flex-col">
        <div className="aspect-w-16 aspect-h-9 mb-4">
          <Image
            src="/images/dead.png"
            alt="The Dead Internet"
            layout="fill"
            objectFit="cover"
            className="rounded-lg"
          />
        </div>
        <h3 className="text-2xl font-bold mb-4 text-[#39FF14]">the dead internet</h3>
        <p className="text-gray-300 flex-grow">the internet today is controlled by corporations. every search you make is tracked, every click is sold, and you're shown what they want you to see. the web isn't free anymore—it's manipulated by seo, clickbait, and ads.</p>
      </div>
      <div className="flex-1 flex flex-col">
        <div className="aspect-w-16 aspect-h-9 mb-4">
          <Image
            src="/images/sorana_ss.jpg"
            alt="The Sorana Solution"
            layout="fill"
            objectFit="cover"
            className="rounded-lg"
          />
        </div>
        <h3 className="text-2xl font-bold mb-4 text-[#39FF14]">the sorana solution</h3>
        <p className="text-gray-300 flex-grow">decentralized, human-driven, authentic results. take back control of your data and contribute to a free and open internet. with sorana, you're not just a user—you're an owner of the web.</p>
      </div>
    </div>
  </div>
</section>

      <section id="team" className="py-20 px-4 relative z-10">
  <div className="container mx-auto">
    <h2 className="text-4xl font-bold text-center mb-12">the squad making it happen</h2>
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
      {teamMembers.slice(0, 3).map((member, index) => (
        <TeamMemberCard key={member.name} member={member} index={index} />
      ))}
      <div className="sm:col-span-2 lg:col-span-3 flex justify-center gap-8">
        {teamMembers.slice(3, 5).map((member, index) => (
          <div key={member.name} className="w-full sm:w-[calc(50%-1rem)] lg:w-[calc(33.333%-1rem)]">
            <TeamMemberCard member={member} index={index + 3} />
          </div>
        ))}
      </div>
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
          <h3 className="text-2xl font-bold mb-2 text-[#39FF14] group-hover:text-[#0a0a0a]">{product.title}</h3>
          <p className="text-white group-hover:text-[#0a0a0a] mb-4">{product.status}</p>
          <p className="text-gray-300 group-hover:text-[#0a0a0a]">{product.description}</p>
        </motion.div>
      ))}
    </div>
  </div>
</section>
<section id="join" className="py-20 px-4 bg-[#0a0a0a] relative z-10">
  <div className="container mx-auto">
    <h2 className="text-4xl font-bold text-center mb-4 text-[#39FF14]">join the sorana alpha</h2>
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
          placeholder="x / linkedin"
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

const TeamMemberCard = ({ member, index }) => (
  <motion.div
    className="text-center bg-[#141414] p-6 rounded-lg flex flex-col justify-between h-full"
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay: index * 0.1 }}
    whileHover={{ scale: 1.05 }}
    whileTap={{ scale: 0.95 }}
  >
    <div>
      <div className="w-32 h-32 rounded-full bg-[#39FF14] mx-auto mb-4 overflow-hidden">
        <Image
          src={member.imgSrc}
          alt={member.name}
          width={128}
          height={128}
          className="object-cover"
        />
      </div>
      <h3 className="text-2xl font-bold mb-2 text-[#39FF14]">{member.name}</h3>
      <p className="text-white mb-2">{member.role}</p>
      <p className="text-sm text-gray-300 mb-4">{member.bio}</p>
    </div>
    <div className="flex justify-center space-x-4 mt-auto">
      {member.name === 'yaz' && (
        <a href={member.xLink} target="_blank" rel="noopener noreferrer">
          <Twitter className="w-5 h-5 text-[#39FF14] hover:text-white transition-colors" />
        </a>
      )}
      {member.name === 'kyrie' && (
        <a href={member.instagramLink} target="_blank" rel="noopener noreferrer">
          <Instagram className="w-5 h-5 text-[#39FF14] hover:text-white transition-colors" />
        </a>
      )}
      {member.name !== 'yaz' && member.name !== 'kyrie' && (
        <a href={member.linkedinLink} target="_blank" rel="noopener noreferrer">
          <Linkedin className="w-5 h-5 text-[#39FF14] hover:text-white transition-colors" />
        </a>
      )}
      <a href={`mailto:${member.email}`}>
        <Mail className="w-5 h-5 text-[#39FF14] hover:text-white transition-colors" />
      </a>
    </div>
  </motion.div>
);

export default Page;
