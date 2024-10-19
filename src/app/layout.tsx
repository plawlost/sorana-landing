import './globals.css';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <title>sorana - be the web, own the web</title>

        <meta 
          name="description" 
          content="sorana: decentralized, user-powered platform returning the internet to its free and open roots. privacy-first, no ads, no data selling. earn srt, control your web experience, and contribute to a human-centered online space."
        />

        <meta name="viewport" content="width=device-width, initial-scale=1" />
        
        {/* Keywords for better discoverability */}
        <meta 
          name="keywords" 
          content="decentralized web, blockchain, privacy, srt, sorana, open web, human-centered internet, no ads, data privacy"
        />

        {/* Open Graph metadata for social media */}
        <meta property="og:title" content="sorana - be the web, own the web" />
        <meta 
          property="og:description" 
          content="own your web experience with sorana. decentralized, private, no corporate control. earn srt and shape the future of a free and open internet." 
        />
        <meta property="og:image" content="/images/sorana.png" />
        <meta property="og:url" content="https://sorana.io" />
        <meta property="og:type" content="website" />

        {/* Twitter Card metadata */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="sorana - be the web, own the web" />
        <meta 
          name="twitter:description" 
          content="sorana: decentralized, user-powered platform where you control your experience. earn srt and contribute to the future of the open web." 
        />
        <meta name="twitter:image" content="/images/sorana.png" />

        {/* Favicon */}
        <link rel="icon" href="/images/sorana-small.png" />

        {/* Canonical URL */}
        <link rel="canonical" href="https://sorana.io" />
      </head>
      <body>
        <Navbar />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
