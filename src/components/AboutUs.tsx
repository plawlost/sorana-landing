'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ChevronDown, Menu, X } from 'lucide-react';
import { useTheme } from "next-themes";
import Particles from "./ui/particles";
import HeroVideoDialog from "./ui/hero-video-dialog";
import '../app/globals.css';
import './AboutUs.css';

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

const Section = ({ id, className, children }) => (
  <section id={id} className={`section ${className}`}>
    <div className="container mx-auto px-4">
      {children}
    </div>
  </section>
);

function HeroVideoDialogDemo() {
  return (
    <div className="relative mt-8">
      <HeroVideoDialog
        className="dark:hidden block"
        animationStyle="from-center"
        videoSrc="https://www.youtube.com/embed/2L6DQ0mXvoc"
        thumbnailSrc="/images/thumb.png"
        thumbnailAlt="Dead Internet Video"
      />
      <HeroVideoDialog
        className="hidden dark:block"
        animationStyle="from-center"
        videoSrc="https://www.youtube.com/embed/qh3NGpYRG3I?si=4rb-zSdDkVK9qxxb"
        thumbnailSrc="https://startup-template-sage.vercel.app/hero-dark.png"
        thumbnailAlt="Dead Internet Video"
      />
    </div>
  );
}

export default function AboutUs() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { theme } = useTheme();
  const [particleColor, setParticleColor] = useState("#39FF14");
  const [srtCount, setSrtCount] = useState(0); // Add this line to manage SRT count

  useEffect(() => {
    setParticleColor(theme === "dark" ? "#39FF14" : "#39FF14");
  }, [theme]);

  return (
    <div className="about-us-page">
      <DynamicBackground />

      <div className="content-wrapper">
        <header className="hero-section">
          <Image src="/images/usercorp.png" alt="Background" layout="fill" objectFit="cover" className="hero-bg" />
          <div className="hero-content">
            <h1 className="hero-title">
              <span className="small-text">stopping the robbery:</span>
              <span className="large-text">future of the internet</span>
            </h1>
            <h2 className="mt-8">no more exploitation. no more manipulation. sorana reclaims the web, where you own it all.</h2>
            <HeroVideoDialogDemo />
            <Link href="#problem" className="btn-primary mt-8">
              learn more <ChevronDown className="ml-2" />
            </Link>
            <Particles
              className="absolute inset-0 z-20"
              quantity={200}
              staticity={30}
              size={3}
              color={particleColor}
              refresh
            />
          </div>
        </header>

        <Section id="problem" className="problem-section">
          <h2>what's wrong with today's internet?</h2>
          <div className="content-block">
            <h3>the problem with today's internet</h3>
            <p>
              the internet was once a place of innovation, where creators and users could thrive.
              but over the years, corporations have centralized control, manipulating what we see,
              tracking every move we make, and making money off every click. their goal? total
              domination of your attention and your wallet.
            </p>
            <p>
              no one cares about data privacy anymore—it's about ownership. the internet isn't
              yours; it's theirs. and the solution they've come up with is worse than the problem.
            </p>
          </div>
        </Section>

        <Section className="solution-section">
          <h2>our solution</h2>
          <div className="content-block">
            <p>
              at sorana, we're doing more than just protecting privacy—we're redefining the way
              the internet works. instead of letting corporations control the web, you control it.
            </p>
            <p>
              with <strong>mesh-to-earn technology</strong>, each user becomes both the client and host of the
              new decentralized web. every search query you make, every data request is
              powered by you—and you earn from it.
            </p>
            <div className="tech-specs">
              <h3>technical specifications</h3>
              <ul>
                <li>blockchain-based rewards (srt tokens) for fair value distribution</li>
                <li>p2p encrypted nodes ensuring security, privacy, and scalability</li>
                <li>decentralized infrastructure where every user is both owner and contributor</li>
              </ul>
            </div>
          </div>
        </Section>

        <Section className="search-revolution">
          <Image src="/images/searchbar.jpg" alt="Decentralized Search" width={800} height={400} className="section-image" />
          <h2>the search revolution</h2>
          <div className="content-block">
            <p>
              the search industry is dominated by corporations who dictate what you see with
              <strong> seo tricks, ads, and clickbait</strong>. sorana changes that. our search engine delivers
              <strong> human-driven, authentic results</strong>, powered by <strong>real users</strong>, without ads or corporate
              manipulation.
            </p>
            <p>
              you don't need to give up control anymore. you own your searches, your data, and
              most importantly—you get rewarded for every contribution with <strong>srt tokens</strong>.
            </p>
          </div>
        </Section>

        <Section className="whats-next">
          <Image src="/images/futuremap.jpg" alt="Future Map" width={800} height={400} className="section-image" />
          <h2>what's next?</h2>
          <div className="content-block">
            <p>
              we're not just stopping here. sorana is building an entire ecosystem, from
              <strong> decentralized browsers</strong> to a <strong>satellite-powered mesh network</strong>, creating a truly
              global internet beyond isp control.
            </p>
            <p>
              check out our <Link href="/roadmap" className="link-highlight">roadmap</Link> to see what's coming next and how you can be a part of it.
            </p>
          </div>
        </Section>
      </div>

    </div>
  );
}
