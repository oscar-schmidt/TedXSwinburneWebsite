import React, { useState, useEffect, useRef } from 'react';
import {
  Users, Sparkles, Brain, Zap, Cpu, Rocket, Clock, Code, Star, X, Menu, ArrowRight, ChevronDown, MapPin, Calendar, Mail, Twitter, Instagram, Linkedin, Globe
} from 'lucide-react';

const styles = `
  /* Animated Background Styles */
  .hero-bg {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: radial-gradient(circle at 20% 80%, #EB0028 0%, transparent 50%),
                radial-gradient(circle at 80% 20%, #00D4FF 0%, transparent 50%),
                radial-gradient(circle at 40% 40%, #FF4D6D 0%, transparent 50%);
    opacity: 0.3;
    filter: blur(100px);
    animation: float 20s ease-in-out infinite;
  }

  @keyframes float {
    0%, 100% { transform: translate(0, 0) scale(1); }
    33% { transform: translate(-20px, -20px) scale(1.05); }
    66% { transform: translate(20px, -10px) scale(0.95); }
  }

  .particles {
    position: absolute;
    width: 100%;
    height: 100%;
    overflow: hidden;
  }

  .particle {
    position: absolute;
    width: 4px;
    height: 4px;
    background: #EB0028;
    border-radius: 50%;
    opacity: 0;
    animation: particle-float 20s infinite linear;
  }

  @keyframes particle-float {
    from {
      transform: translateY(100vh) rotate(0deg);
      opacity: 0;
    }
    10% {
      opacity: 0.5;
    }
    90% {
      opacity: 0.5;
    }
    to {
      transform: translateY(-100vh) rotate(360deg);
      opacity: 0;
    }
  }

  /* Custom Cursor Styles */
  .cursor {
    width: 20px;
    height: 20px;
    border: 2px solid #EB0028;
    border-radius: 50%;
    position: fixed;
    pointer-events: none;
    transform: translate(-50%, -50%);
    transition: all 0.1s ease;
    z-index: 10000;
    mix-blend-mode: difference;
  }

  .cursor-follower {
    width: 40px;
    height: 40px;
    background: #EB0028;
    opacity: 0.3;
    border-radius: 50%;
    position: fixed;
    pointer-events: none;
    transform: translate(-50%, -50%);
    transition: all 0.3s ease;
    z-index: 9999;
  }

  @media (max-width: 768px) {
    .cursor,
    .cursor-follower {
      display: none;
    }
  }

  /* Animation utilities */
  @keyframes fadeInUp {
    from {
      opacity: 0;
      transform: translateY(30px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  .animate-fadeInUp {
    animation: fadeInUp 1s ease forwards;
  }

  @keyframes slideInUp {
    from {
      opacity: 0;
      transform: translateY(20px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  .animate-slideInUp {
    animation: slideInUp 0.3s ease forwards;
  }

  @keyframes fadeIn {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }

  .animate-fadeIn {
    animation: fadeIn 0.3s ease forwards;
  }

  @keyframes scaleUpCenter {
    from {
      opacity: 0;
      transform: scale(0.9);
    }
    to {
      opacity: 1;
      transform: scale(1);
    }
  }

  .scale-up-center {
    animation: scaleUpCenter 0.3s ease forwards;
  }

  /* Scrollbar styles */
  .scrollbar-thin::-webkit-scrollbar {
    width: 6px;
  }

  .scrollbar-thin::-webkit-scrollbar-track {
    background: #1f2937;
  }

  .scrollbar-thin::-webkit-scrollbar-thumb {
    background: #dc2626;
    border-radius: 3px;
  }

  .scrollbar-thin::-webkit-scrollbar-thumb:hover {
    background: #b91c1c;
  }
`;

const App = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const [scrolled, setScrolled] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [ticketModal, setTicketModal] = useState(false);
  const [sponsorsModal, setSponsorsModal] = useState(false);
  const [selectedSpeaker, setSelectedSpeaker] = useState(null);
  const [emailInput, setEmailInput] = useState("");
  const [contactData, setContactData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [showThankYou, setShowThankYou] = useState(false);
  const particlesRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);

      const sections = [
        "home",
        "about",
        "speakers",
        "schedule",
        "venue",
        "contact",
      ];
      const current = sections.find((sectionId) => {
        const element = document.getElementById(sectionId);
        if (element) {
          const rect = element.getBoundingClientRect();
          return rect.top <= window.innerHeight / 2 && rect.bottom >= window.innerHeight / 2;
        }
        return false;
      });
      if (current) setActiveSection(current);
    };

    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener("scroll", handleScroll);
    window.addEventListener("mousemove", handleMouseMove);
    
    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  // Particle generation
  useEffect(() => {
    const timer = setTimeout(() => {
      if (particlesRef.current && particlesRef.current.children.length === 0) {
        const particleCount = 50;
        for (let i = 0; i < particleCount; i++) {
          const particle = document.createElement('div');
          particle.className = 'particle';
          particle.style.left = Math.random() * 100 + '%';
          particle.style.animationDelay = Math.random() * 20 + 's';
          particle.style.animationDuration = (15 + Math.random() * 10) + 's';
          particlesRef.current.appendChild(particle);
        }
      }
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  // Intersection Observer for animations
  useEffect(() => {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -100px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting && !entry.target.classList.contains('animate-fadeInUp')) {
          entry.target.classList.add('animate-fadeInUp');
        }
      });
    }, observerOptions);

    // Observe elements after a short delay to ensure they're rendered
    const timer = setTimeout(() => {
      document.querySelectorAll('.glass-card, .speaker-card, .timeline-content').forEach(el => {
        observer.observe(el);
      });
    }, 100);

    return () => {
      clearTimeout(timer);
      observer.disconnect();
    };
  }, []);

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
    setIsMenuOpen(false);
  };

  const handleNewsletterSubmit = () => {
    if (emailInput && /\S+@\S+\.\S+/.test(emailInput)) {
      console.log("Newsletter Subscription:", emailInput);
      setEmailInput("");
      setShowThankYou(true);
      setTimeout(() => setShowThankYou(false), 3000);
    } else {
      alert("Please enter a valid email address.");
    }
  };

  const handleContactSubmit = () => {
    if (contactData.name && /\S+@\S+\.\S+/.test(contactData.email) && contactData.message) {
      console.log("Contact Form Submission:", contactData);
      setContactData({ name: "", email: "", message: "" });
      setShowThankYou(true);
      setTimeout(() => setShowThankYou(false), 3000);
    } else {
      alert("Please fill in all fields correctly.");
    }
  };

  const speakers = [
    {
      id: 1,
      name: "Speaker Name",
      title: "Speaker background",
      topic: "Topic of talk",
      image: `https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah&backgroundColor=eb0028,ee3124&backgroundType=gradientLinear&accessoriesProbability=0`,
      bio: "Bio of person speaking",
      achievements: [
        "Achievement 1",
        "Achievement 2",
        "Achievement 3",
      ],
    },
    {
      id: 2,
      name: "Speaker Name",
      title: "Speaker background",
      topic: "Topic of talk",
      image: `https://api.dicebear.com/7.x/avataaars/svg?seed=Marcus&backgroundColor=eb0028,ee3124&backgroundType=gradientLinear&accessoriesProbability=0`,
      bio: "Bio of person speaking",
      achievements: [
        "Achievement 1",
        "Achievement 2",
        "Achievement 3",
      ],
    },
    {
      id: 3,
      name: "Speaker Name",
      title: "Speaker background",
      topic: "Topic of talk",
      image: `https://api.dicebear.com/7.x/avataaars/svg?seed=Aisha&backgroundColor=eb0028,ee3124&backgroundType=gradientLinear&accessoriesProbability=0`,
      bio: "Bio of person speaking",
      achievements: [
        "Achievement 1",
        "Achievement 2",
        "Achievement 3",
      ],
    },
    {
      id: 4,
      name: "Speaker Name",
      title: "Speaker background",
      topic: "Topic of talk",
      image: `https://api.dicebear.com/7.x/avataaars/svg?seed=John&backgroundColor=eb0028,ee3124&backgroundType=gradientLinear&accessoriesProbability=0`,
      bio: "Bio of person speaking",
      achievements: [
        "Achievement 1",
        "Achievement 2",
        "Achievement 3",
      ],
    },
    {
      id: 5,
      name: "Speaker Name",
      title: "Speaker background",
      topic: "Topic of talk",
      image: `https://api.dicebear.com/7.x/avataaars/svg?seed=Lisa&backgroundColor=eb0028,ee3124&backgroundType=gradientLinear&accessoriesProbability=0`,
      bio: "Bio of person speaking",
      achievements: [
        "Achievement 1",
        "Achievement 2",
        "Achievement 3",
      ],
    },
    {
      id: 6,
      name: "Speaker Name",
      title: "Speaker background",
      topic: "Topic of talk",
      image: `https://api.dicebear.com/7.x/avataaars/svg?seed=Robert&backgroundColor=eb0028,ee3124&backgroundType=gradientLinear&accessoriesProbability=0`,
      bio: "Bio of person speaking",
      achievements: [
        "Achievement 1",
        "Achievement 2",
        "Achievement 3",
      ],
    },
  ];

  const schedule = [
    { time: "5:30 PM", event: "Opening Ceremony", duration: "15 min", icon: Star },
    { time: "5:45 PM", event: "Talk 1", duration: "15 min", icon: Sparkles },
    { time: "6:00 PM", event: "Talk 2", duration: "15 min", icon: Brain },
    { time: "6:15 PM", event: "Talk 3", duration: "15 min", icon: Zap },
    { time: "6:30 PM", event: "Talk 4", duration: "15 min", icon: Cpu },
    { time: "6:45 PM", event: "Talk 5", duration: "15 min", icon: Rocket },
    { time: "7:00 PM", event: "Break", duration: "15 min", icon: Clock },
    { time: "7:15 PM", event: "Talk 6", duration: "15 min", icon: Code },
    { time: "7:30 PM", event: "Talk 7", duration: "15 min", icon: Sparkles },
    { time: "7:45 PM", event: "Talk 8", duration: "15 min", icon: Brain },
    { time: "8:00 PM", event: "Talk 9", duration: "15 min", icon: Zap },
    { time: "8:15 PM", event: "Talk 10", duration: "15 min", icon: Cpu },
    { time: "8:30 PM", event: "Closing Remarks & Networking", icon: Star, duration: "60 min" },
  ];

  const sponsors = [
    { 
      name: "Swinburne University of Technology", 
      tier: "presenting", 
      description: "Our host institution supporting innovation and learning",
      logo: "university"
    },
    { 
      name: "Partner 1", 
      tier: "major", 
      description: "Description here",
      logo: "innovation"
    },
    { 
      name: "Partner 2", 
      tier: "supporting", 
      description: "Description here",
      logo: "education"
    },
    { 
      name: "Partner 3", 
      tier: "supporting", 
      description: "Description here",
      logo: "tech"
    }
  ];
  
  const stats = [
    { value: "100", label: "Attendees", icon: Users },
    { value: "10", label: "Talks & Panels", icon: Sparkles },
    { value: "3hrs", label: "Of Ideas", icon: Clock },
    { value: "100%", label: "Inspiration", icon: Star },
  ];

  return (
    <div className={`min-h-screen bg-black text-white ${isMenuOpen ? 'overflow-hidden md:overflow-auto' : ''} overflow-x-hidden`}>
      <style dangerouslySetInnerHTML={{ __html: styles }} />
      
      {/* Custom Cursor */}
      <div className="cursor" style={{ left: `${mousePosition.x}px`, top: `${mousePosition.y}px` }} />
      <div className="cursor-follower" style={{ left: `${mousePosition.x}px`, top: `${mousePosition.y}px` }} />

      {/* Navigation */}
      <nav
        className={`fixed top-0 w-full z-40 transition-all duration-300 ease-in-out ${
          scrolled
            ? "bg-black/80 backdrop-blur-md border-b border-red-500/20 shadow-lg"
            : "bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            <button onClick={() => scrollToSection("home")} className="flex flex-col items-start group">
              <div className="flex items-center">
                <span className="text-3xl font-bold text-red-500 group-hover:opacity-80 transition-opacity">
                  TEDx
                </span>
                <span className="text-2xl ml-1.5 font-light text-gray-200 group-hover:text-white transition-colors">Swinburne</span>
              </div>
              <span className="text-xs text-red-500 font-medium mt-0.5">x = independently organized TED event</span>
            </button>

            {/* Desktop Menu */}
            <div className="hidden md:flex items-center space-x-1">
              {["Home", "About", "Speakers", "Schedule", "Venue", "Contact"].map((item) => (
                <button
                  key={item}
                  onClick={() => scrollToSection(item.toLowerCase())}
                  className={`relative px-4 py-2 text-sm font-medium rounded-md transition-all duration-200 ${
                    activeSection === item.toLowerCase()
                      ? "text-white"
                      : "text-gray-400 hover:text-white hover:bg-red-500/10"
                  }`}
                >
                  {item}
                  {activeSection === item.toLowerCase() && (
                    <div className="absolute bottom-1 left-1/2 transform -translate-x-1/2 w-2 h-1 bg-red-500 rounded-full" />
                  )}
                </button>
              ))}
              <button
                onClick={() => setSponsorsModal(true)}
                className="px-4 py-2 text-sm font-medium rounded-md transition-all duration-200 text-gray-400 hover:text-white hover:bg-red-500/10"
              >
                Partners
              </button>
              <button
                onClick={() => setTicketModal(true)}
                className="ml-4 px-5 py-2.5 bg-red-600 hover:bg-red-700 text-white rounded-full text-sm font-semibold transition-all transform hover:scale-105 hover:shadow-lg hover:shadow-red-600/30"
              >
                Get Tickets
              </button>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2 text-gray-300 hover:text-white focus:outline-none z-50"
            >
              {isMenuOpen ? <X size={28} className="text-red-500" /> : <Menu size={28} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <div className={`md:hidden fixed inset-0 bg-black/95 backdrop-blur-xl transition-transform duration-300 ease-in-out transform ${isMenuOpen ? 'translate-x-0' : 'translate-x-full'} z-40 pt-20`}>
          <div className="px-6 pt-2 pb-3 space-y-2">
            {["Home", "About", "Speakers", "Schedule", "Venue", "Contact"].map((item) => (
              <button
                key={item}
                onClick={() => scrollToSection(item.toLowerCase())}
                className="block w-full text-left px-4 py-3 text-lg font-medium text-gray-300 hover:text-red-500 hover:bg-red-900/10 rounded-lg transition-colors"
              >
                {item}
              </button>
            ))}
            <button
              onClick={() => {
                setSponsorsModal(true);
                setIsMenuOpen(false);
              }}
              className="block w-full text-left px-4 py-3 text-lg font-medium text-gray-300 hover:text-red-500 hover:bg-red-900/10 rounded-lg transition-colors"
            >
              Partners
            </button>
            <button
              onClick={() => {
                setTicketModal(true);
                setIsMenuOpen(false);
              }}
              className="w-full mt-6 px-6 py-3.5 bg-red-600 hover:bg-red-700 text-white rounded-full text-lg font-semibold transition-all"
            >
              Get Tickets
            </button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section
        id="home"
        className="relative min-h-screen flex items-center justify-center px-4 pt-32 md:pt-24 text-center z-10"
      >
        <div className="hero-bg"></div>
        <div className="particles" ref={particlesRef}></div>
        
        <div className="max-w-4xl mx-auto relative z-20">
          <div className="mb-8" data-aos="fade-up">
            <span className="px-5 py-2.5 bg-red-500/10 border border-red-500/30 rounded-full text-sm sm:text-base font-medium text-red-300 shadow-md">
              Month Day, 2025 • Swinburne University
            </span>
          </div>
          <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-extrabold mb-6 leading-tight" data-aos="fade-up" data-aos-delay="100">
            <span className="block text-red-600" style={{ color: '#EB0028' }}>
              Ideas Worth
            </span>
            <span className="block text-white mt-1 md:mt-2">Spreading</span>
          </h1>
          <p className="text-lg sm:text-xl md:text-2xl text-gray-300 mb-12 max-w-3xl mx-auto" data-aos="fade-up" data-aos-delay="200">
            Join us for an extraordinary day of innovation, inspiration, and
            transformation at TEDxSwinburne 2025. Explore the future, today.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center" data-aos="fade-up" data-aos-delay="300">
            <button
              onClick={() => setTicketModal(true)}
              className="px-8 py-4 bg-red-600 hover:bg-red-700 rounded-full font-semibold text-base sm:text-lg text-white transition-all transform hover:scale-105 hover:shadow-2xl hover:shadow-red-600/50 flex items-center justify-center gap-2.5"
            >
              Reserve Your Spot <ArrowRight size={22} />
            </button>
            <button
              onClick={() => scrollToSection("about")}
              className="px-8 py-4 border-2 border-red-500/50 text-red-300 hover:bg-red-500/10 hover:text-white hover:border-red-500 rounded-full font-semibold text-base sm:text-lg transition-all flex items-center justify-center gap-2.5"
            >
              Learn More <ChevronDown size={22} />
            </button>
          </div>
          
          <div className="mt-8 text-center" data-aos="fade-up" data-aos-delay="400">
            <a 
              href="https://www.ted.com/tedx" 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-red-400 hover:text-red-300 transition-colors text-lg font-medium"
            >
              Learn about the TEDx program <ArrowRight size={18} />
            </a>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-20 sm:mt-24 max-w-4xl mx-auto" data-aos="fade-up" data-aos-delay="500">
            {stats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <div key={index} className="text-center p-4 bg-white/5 rounded-xl transition-all hover:bg-white/10 transform hover:scale-105">
                  <Icon size={28} className="mx-auto mb-3 text-red-500" />
                  <div className="text-3xl sm:text-4xl font-bold text-red-400">
                    {stat.value}
                  </div>
                  <div className="text-sm text-gray-400 mt-1">{stat.label}</div>
                </div>
              );
            })}
          </div>
        </div>

        <button 
          onClick={() => scrollToSection("about")}
          className="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce z-10 p-2 rounded-full hover:bg-red-500/10 transition-colors"
          aria-label="Scroll to about section"
        >
          <ChevronDown size={36} className="text-red-500/70" />
        </button>
      </section>

      {/* About Section */}
      <section id="about" className="py-24 px-4 relative z-10 bg-black">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-20" data-aos="fade-up">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              About <span className="text-red-500">TEDx</span>Swinburne
            </h2>
            <div className="w-28 h-1.5 bg-red-500 mx-auto rounded-full" />
          </div>
          <div className="grid md:grid-cols-2 gap-12 lg:gap-16 items-center">
            <div className="space-y-6 glass-card" data-aos="fade-right">
              <div className="mb-6">
                <h4 className="text-xl font-semibold mb-3 text-red-400">What is TEDx?</h4>
                <p className="text-lg text-gray-300 leading-relaxed mb-4">
                  In the spirit of ideas worth spreading, TED has created a program called TEDx.
                </p>
                <p className="text-lg text-gray-300 leading-relaxed mb-4">
                  TEDx is a program of local, self-organized events that bring people together to share a TED-like experience. Our event is called TEDxSwinburne, where x=independently organized TED event. At our TEDxSwinburne event, TEDTalks video and live speakers will combine to spark deep discussion and connection in a small group.
                </p>
                <p className="text-lg text-gray-300 leading-relaxed mb-6">
                  The TED Conference provides general guidance for the TEDx program, but individual TEDx events, including ours, are self-organized.
                </p>
                <a 
                  href="https://www.ted.com/tedx" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-red-600/10 hover:bg-red-600/20 border border-red-500/50 text-red-300 hover:text-white rounded-lg font-semibold transition-all transform hover:scale-105"
                >
                  Learn more about TEDx <ArrowRight size={18} />
                </a>
              </div>
              <div className="pt-6">
                <h4 className="text-2xl font-semibold mb-6 text-red-400">Event Highlights</h4>
                <ul className="space-y-4">
                  {[
                    "10 speakers sharing groundbreaking ideas",
                    "Interactive panel discussions with audience Q&A",
                    "Networking opportunities with innovators and ideas"
                  ].map((highlight, idx) => (
                    <li key={idx} className="flex items-start gap-3">
                      <Star size={20} className="text-red-500 mt-1 flex-shrink-0" />
                      <span className="text-gray-300">{highlight}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <div className="relative glass-card" data-aos="fade-left">
              <div className="absolute -inset-4 bg-gradient-to-r from-red-600/20 to-pink-600/20 blur-3xl opacity-50 animate-pulse" />
              <div className="relative bg-gradient-to-br from-gray-900 via-black to-gray-900 border border-red-500/30 rounded-2xl p-8 lg:p-10 shadow-xl">
                <h3 className="text-2xl lg:text-3xl font-bold mb-6 text-white">About TED</h3>
                <p className="text-gray-300 leading-relaxed mb-6">
                  TED is an annual event where some of the world's leading thinkers and doers are invited to share what they are most passionate about. "TED" stands for Technology, Entertainment, Design — three broad subject areas that are, collectively, shaping our future. And in fact, the event is broader still, showcasing ideas that matter in any discipline.
                </p>
                <p className="text-gray-300 leading-relaxed mb-8">
                  The diverse audience — CEOs, scientists, creatives, philanthropists — is almost as extraordinary as the speakers, who have included Bill Clinton, Bill Gates, Jane Goodall, Frank Gehry, Paul Simon, Sir Richard Branson, Philippe Starck and Bono.
                </p>
                <div className="space-y-6">
                  {[
                    { icon: Globe, title: "Global Impact", desc: "Part of the worldwide TED community" },
                    { icon: Users, title: "Local Community", desc: "Celebrating Melbourne's innovation ecosystem" }
                  ].map((item, idx) => {
                    const IconComp = item.icon;
                    return (
                      <div key={idx} className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-red-500/10 rounded-full flex items-center justify-center border border-red-500/20">
                          <IconComp size={24} className="text-red-500" />
                        </div>
                        <div>
                          <p className="font-semibold text-white">{item.title}</p>
                          <p className="text-sm text-gray-400">{item.desc}</p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Speakers Section */}
      <section id="speakers" className="py-24 px-4 relative z-10 bg-gray-950">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20" data-aos="fade-up">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Featured <span className="text-red-500">Speakers</span>
            </h2>
            <div className="w-28 h-1.5 bg-red-500 mx-auto mb-6 rounded-full" />
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              Meet the brilliant minds and visionary leaders who will ignite your curiosity and inspire action.
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10">
            {speakers.map((speaker, idx) => (
              <div
                key={speaker.id}
                onClick={() => setSelectedSpeaker(speaker)}
                className="speaker-card group cursor-pointer relative overflow-hidden rounded-2xl bg-gray-900 border border-red-500/20 transition-all duration-300 hover:border-red-500/50 hover:shadow-2xl hover:shadow-red-600/15 transform hover:-translate-y-2"
                data-aos="fade-up" data-aos-delay={idx * 100}
              >
                <div className="relative p-6 sm:p-8">
                  <div className="absolute top-0 left-0 w-full h-1/2 bg-gradient-to-b from-red-600/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  <div className="relative flex flex-col items-center text-center">
                    <img
                      src={speaker.image}
                      alt={speaker.name}
                      className="relative w-32 h-32 sm:w-36 sm:h-36 mx-auto rounded-full border-4 border-red-500/40 group-hover:border-red-500 transition-all duration-300 mb-6 shadow-lg"
                    />
                    <h3 className="text-xl sm:text-2xl font-bold mb-1 text-white">{speaker.name}</h3>
                    <p className="text-red-400 text-sm sm:text-base mb-3">{speaker.title}</p>
                    <p className="text-gray-300 font-semibold text-sm sm:text-md mb-4 line-clamp-2 group-hover:line-clamp-none transition-all">
                      "{speaker.topic}"
                    </p>
                    <p className="text-sm text-gray-400 line-clamp-3 mb-5 group-hover:line-clamp-none transition-all">
                      {speaker.bio}
                    </p>
                    <div className="mt-auto pt-2 flex items-center text-red-400 text-sm group-hover:text-red-300 transition-colors">
                      Learn more <ArrowRight size={18} className="ml-1.5 transform group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Schedule Section*/}
      <section id="schedule" className="py-24 px-4 relative z-10 bg-black">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-20" data-aos="fade-up">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Event <span className="text-red-500">Schedule</span>
            </h2>
            <div className="w-28 h-1.5 bg-red-500 mx-auto mb-6 rounded-full" />
            <p className="text-xl text-gray-400">A full day of inspiration, structured for impact.</p>
          </div>
          <div className="relative">
            {/* Timeline Line */}
            <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-1 bg-gradient-to-b from-red-500/30 via-red-500/50 to-red-500/30 rounded-full transform -translate-x-1/2" />
            <div className="md:hidden absolute left-1/2 top-0 bottom-0 w-1 bg-gradient-to-b from-red-500/30 via-red-500/50 to-red-500/30 rounded-full transform -translate-x-1/2" />

            {schedule.map((item, index) => {
              const Icon = item.icon;
              const isEven = index % 2 === 0;
              return (
                <div
                  key={index}
                  className={`relative flex md:items-center mb-10 md:mb-12 group ${isEven ? 'md:flex-row-reverse' : 'md:flex-row'}`}
                  data-aos={isEven ? "fade-left" : "fade-right"}
                >
                  {/* Dot*/}
                  <div className={`absolute top-1 md:top-1/2 ${isEven ? 'md:right-[calc(50%-18px)]' : 'md:left-[calc(50%-18px)]'} left-[calc(50%-16px)] md:left-auto md:transform md:-translate-y-1/2 w-8 h-8 md:w-9 md:h-9 bg-black border-2 border-red-500 rounded-full flex items-center justify-center z-10 shadow-md shadow-red-500/30`}>
                    <Icon size={16} className="text-red-400" />
                  </div>
                  
                  {/* Content Card */}
                  <div className={`timeline-content ml-8 mr-8 md:ml-0 md:mr-0 md:w-[calc(45%-2rem)] ${isEven ? 'md:mr-[calc(5%+2rem)]' : 'md:ml-[calc(5%+2rem)]'} flex-1 bg-gray-900/70 backdrop-blur-md border border-red-500/20 rounded-xl p-5 md:p-6 transition-all duration-300 hover:border-red-500/50 hover:shadow-xl hover:shadow-red-600/15`}>
                    <div className="flex items-center justify-between mb-1.5">
                      <p className="text-sm font-semibold text-red-400">{item.time}</p>
                      {item.duration && (
                        <span className="text-xs text-gray-500 bg-red-500/10 px-2 py-0.5 rounded-full">{item.duration}</span>
                      )}
                    </div>
                    <p className="text-lg md:text-xl font-medium text-white">{item.event}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Venue Section */}
      <section id="venue" className="py-24 px-4 relative z-10 bg-gray-950">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-20" data-aos="fade-up">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Event <span className="text-red-500">Venue</span>
            </h2>
            <div className="w-28 h-1.5 bg-red-500 mx-auto rounded-full" />
          </div>
          <div className="grid md:grid-cols-2 gap-12 lg:gap-16 items-center">
            <div className="relative overflow-hidden rounded-2xl bg-gray-900 border border-red-500/30 shadow-xl" data-aos="fade-right">
              <div className="aspect-w-16 aspect-h-9 bg-gradient-to-br from-red-800/20 to-pink-800/20 flex items-center justify-center p-8 sm:p-12">
                <div className="text-center">
                  <MapPin size={80} className="text-red-500/70 mx-auto mb-6 opacity-50" />
                  <p className="text-2xl sm:text-3xl font-semibold text-white">Swinburne University</p>
                  <p className="text-gray-400 mt-1">Melbourne, Australia</p>
                </div>
              </div>
            </div>
            <div className="space-y-8" data-aos="fade-left">
              <h3 className="text-3xl lg:text-4xl font-bold text-white">
                Swinburne University of Technology
              </h3>
              <div className="space-y-5">
                {[
                  { icon: MapPin, title: "George Swinburne Building", desc: "John Street, Hawthorn VIC 3122" },
                  { icon: Calendar, title: "Month Date, 2025", desc: "9:00 AM - 4:00 PM AEDT" },
                  { icon: Users, title: "Limited Capacity", desc: "500 seats available" }
                ].map((item, idx) => {
                  const IconComp = item.icon;
                  return(
                    <div key={idx} className="flex items-start gap-4">
                      <div className="p-2.5 bg-red-500/10 rounded-full mt-0.5 border border-red-500/20">
                        <IconComp size={22} className="text-red-400 flex-shrink-0" />
                      </div>
                      <div>
                        <p className="font-semibold text-lg text-white mb-0.5">{item.title}</p>
                        <p className="text-gray-400">{item.desc}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
              <div className="pt-4">
                <h4 className="text-xl font-semibold mb-4 text-red-400">Getting There</h4>
                <ul className="space-y-2 text-gray-300 list-disc list-inside marker:text-red-500">
                  <li>5 min walk from Glenferrie Station</li>
                  <li>Tram routes 16, 72 stop nearby</li>
                  <li>Limited parking available on campus</li>
                  <li>Accessible venue with lift access</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-24 px-4 relative z-10 bg-black">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-20" data-aos="fade-up">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Get in <span className="text-red-500">Touch</span>
            </h2>
            <div className="w-28 h-1.5 bg-red-500 mx-auto rounded-full" />
          </div>

          <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-12 lg:gap-16 items-start">
            <div className="space-y-8" data-aos="fade-right">
              <h3 className="text-2xl lg:text-3xl font-bold text-white">Contact Information</h3>
              <div className="space-y-5">
                <a
                  href="mailto:info@tedxswinburne.com"
                  className="flex items-center gap-4 text-gray-300 hover:text-red-400 transition-colors group"
                >
                  <div className="p-2.5 bg-red-500/10 rounded-full border border-red-500/20 group-hover:border-red-500/40 transition-colors">
                    <Mail size={22} className="text-red-400 group-hover:text-red-300 transition-colors" />
                  </div>
                  <span className="text-lg">info@tedxswinburne.com</span>
                </a>
              </div>
              
              <div className="pt-4">
                <h4 className="text-xl font-semibold mb-5 text-red-400">Follow Us</h4>
                <div className="flex gap-4">
                  {[
                    { icon: Twitter, href: "#", label: "Twitter" },
                    { icon: Instagram, href: "#", label: "Instagram" },
                    { icon: Linkedin, href: "#", label: "LinkedIn" }
                  ].map((social, idx) => {
                    const IconComp = social.icon;
                    return (
                      <a
                        key={idx}
                        href={social.href}
                        aria-label={`Follow us on ${social.label}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-3 bg-gray-800/70 hover:bg-red-500/20 border border-red-500/20 hover:border-red-500/40 rounded-full text-red-400 hover:text-red-300 transition-all transform hover:scale-110"
                      >
                        <IconComp size={22} />
                      </a>
                    );
                  })}
                </div>
              </div>

              <div className="pt-6">
                <h4 className="text-xl font-semibold mb-4 text-red-400">Stay Updated</h4>
                <p className="text-gray-400 mb-5">
                  Subscribe to our newsletter for the latest updates, ticket announcements, and exclusive content.
                </p>
                <div className="flex flex-col sm:flex-row gap-3">
                  <input
                    type="email"
                    placeholder="Enter your email"
                    value={emailInput}
                    onChange={(e) => setEmailInput(e.target.value)}
                    className="flex-1 px-5 py-3 bg-black/30 border-2 border-red-500/30 rounded-full focus:outline-none focus:border-red-500 focus:ring-1 focus:ring-red-500 text-white transition-colors placeholder-gray-500"
                  />
                  <button
                    onClick={handleNewsletterSubmit}
                    className="px-7 py-3 bg-red-600 hover:bg-red-700 rounded-full text-white font-semibold transition-all transform hover:scale-105"
                  >
                    Subscribe
                  </button>
                </div>
              </div>
            </div>

            <div className="bg-gray-900/70 backdrop-blur-md border border-red-500/20 rounded-2xl p-8 lg:p-10 shadow-xl" data-aos="fade-left">
              <h3 className="text-2xl lg:text-3xl font-bold mb-8 text-white">Send us a Message</h3>
              <div className="space-y-5">
                <input
                  type="text"
                  name="name"
                  placeholder="Your Name"
                  value={contactData.name}
                  onChange={(e) => setContactData({ ...contactData, name: e.target.value })}
                  className="w-full px-5 py-3.5 bg-black/30 border-2 border-red-500/30 rounded-xl focus:outline-none focus:border-red-500 focus:ring-1 focus:ring-red-500 text-white transition-colors placeholder-gray-500"
                />
                <input
                  type="email"
                  name="email"
                  placeholder="Your Email"
                  value={contactData.email}
                  onChange={(e) => setContactData({ ...contactData, email: e.target.value })}
                  className="w-full px-5 py-3.5 bg-black/30 border-2 border-red-500/30 rounded-xl focus:outline-none focus:border-red-500 focus:ring-1 focus:ring-red-500 text-white transition-colors placeholder-gray-500"
                />
                <textarea
                  name="message"
                  placeholder="Your Message"
                  rows={5}
                  value={contactData.message}
                  onChange={(e) => setContactData({ ...contactData, message: e.target.value })}
                  className="w-full px-5 py-3.5 bg-black/30 border-2 border-red-500/30 rounded-xl focus:outline-none focus:border-red-500 focus:ring-1 focus:ring-red-500 text-white transition-colors resize-none placeholder-gray-500"
                />
                <button
                  onClick={handleContactSubmit}
                  className="w-full px-6 py-4 bg-red-600 hover:bg-red-700 rounded-xl text-white font-semibold text-lg transition-all transform hover:scale-105"
                >
                  Send Message
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-16 px-4 border-t-2 border-red-500/20 relative z-10 bg-black">
        <div className="max-w-7xl mx-auto text-center">
          <button onClick={() => scrollToSection("home")} className="inline-block mb-8 group">
            <div className="flex flex-col items-center">
              <div className="flex items-center">
                <span className="text-4xl font-bold text-red-500 group-hover:opacity-80 transition-opacity">
                  TEDx
                </span>
                <span className="text-3xl ml-1.5 font-light text-gray-200 group-hover:text-white transition-colors">Swinburne</span>
              </div>
              <span className="text-sm text-red-500 font-medium mt-1">x = independently organized TED event</span>
            </div>
          </button>
          <p className="text-gray-400 mb-4 max-w-xl mx-auto">
            This independent TEDx event is operated under license from TED.
          </p>
          <p className="text-gray-400 mb-6 max-w-xl mx-auto">
            Join us as we explore ideas that spark dialogue and drive change.
          </p>
          <p className="text-gray-500 text-sm">
            © {new Date().getFullYear()} TEDxSwinburne. All rights reserved. Designed & Developed with Passion.
          </p>
        </div>
      </footer>

      {/* Partners Modal*/}
      {sponsorsModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md animate-fadeIn">
          <div className="min-h-screen flex items-center justify-center p-4">
            <div className="bg-gray-900 border border-red-500/30 rounded-2xl p-6 sm:p-8 max-w-6xl w-full max-h-[90vh] overflow-y-auto shadow-2xl shadow-red-600/20 transform scale-up-center scrollbar-thin scrollbar-thumb-red-700 scrollbar-track-gray-800 mx-auto">
              <div className="flex justify-between items-center mb-8">
                <div>
                  <h2 className="text-3xl md:text-4xl font-bold text-white">
                    Our <span className="text-red-500">Partners</span>
                  </h2>
                  <div className="w-20 h-1.5 bg-red-500 mt-2 rounded-full" />
                </div>
                <button
                  onClick={() => setSponsorsModal(false)}
                  className="p-2 text-gray-400 hover:text-white hover:bg-red-500/10 rounded-full transition-colors"
                  aria-label="Close partners modal"
                >
                  <X size={24} />
                </button>
              </div>
              
              <p className="text-xl text-gray-400 max-w-3xl mb-12">
                We are grateful for the generous support of our partners who help make TEDxSwinburne possible. In keeping with TEDx guidelines, our partnerships focus on local community organizations committed to supporting the power of ideas.
              </p>

              <div className="space-y-16">
                {/* Presenting Partner */}
                <div>
                  <h3 className="text-2xl md:text-3xl font-semibold text-center mb-10 text-red-400">
                    Presenting Partner
                  </h3>
                  <div className="flex justify-center">
                    <div className="group flex flex-col items-center justify-center text-center bg-gray-800/70 backdrop-blur-md border border-red-500/20 rounded-xl p-8 transition-all duration-300 hover:border-red-500/50 hover:shadow-xl hover:shadow-red-600/15 hover:bg-gray-700/50 min-h-[200px] max-w-md">
                      <div className="w-32 h-16 mb-4 bg-red-500/10 flex items-center justify-center rounded text-red-400 group-hover:text-red-300 transition-colors">
                        <Sparkles size={32} />
                      </div>
                      <h4 className="font-bold mb-2 text-2xl text-white">
                        Swinburne University of Technology
                      </h4>
                      <p className="text-gray-400 text-base">
                        Our host institution supporting innovation and learning
                      </p>
                      <span className="mt-4 pt-3 text-red-400 text-sm group-hover:text-red-300 transition-colors">
                        Visit Website <ArrowRight size={16} className="inline ml-1" />
                      </span>
                    </div>
                  </div>
                </div>

                {/* Supporting Partners */}
                <div>
                  <h3 className="text-2xl md:text-3xl font-semibold text-center mb-10 text-red-400">
                    Supporting Partners
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {sponsors.filter(s => s.tier === 'supporting' || s.tier === 'major').map((sponsor, index) => (
                      <div
                        key={index}
                        className="group flex flex-col items-center justify-center text-center bg-gray-800/70 backdrop-blur-md border border-red-500/20 rounded-xl p-6 transition-all duration-300 hover:border-red-500/50 hover:shadow-xl hover:shadow-red-600/15 hover:bg-gray-700/50 min-h-[160px]"
                      >
                        <div className="w-20 h-10 mb-4 bg-red-500/10 flex items-center justify-center rounded text-red-400 group-hover:text-red-300 transition-colors">
                          <Sparkles size={20} />
                        </div>
                        <h4 className="font-bold mb-1 text-lg text-white">
                          {sponsor.name}
                        </h4>
                        <p className="text-gray-400 text-sm">
                          {sponsor.description}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="mt-16 p-6 bg-red-500/10 border border-red-500/30 rounded-xl">
                <h4 className="text-xl font-semibold mb-4 text-red-400 text-center">Partnership Guidelines</h4>
                <div className="text-gray-300 space-y-2 text-sm">
                  <p className="text-center">
                    In accordance with TEDx guidelines, our partnerships focus on local community organizations committed to supporting innovative ideas and education.
                  </p>
                  <p className="text-center text-xs text-gray-400 mt-4">
                    This independent TEDx event is operated under license from TED.
                  </p>
                </div>
              </div>

              <div className="mt-12 text-center">
                <p className="text-gray-300 mb-6 text-lg">
                  Interested in partnering with TEDxSwinburne and supporting local innovation?
                </p>
                <button className="px-8 py-3.5 bg-red-600/10 hover:bg-red-600/20 border-2 border-red-500/50 text-red-300 hover:text-white rounded-full font-semibold text-lg transition-all transform hover:scale-105">
                  Become a Partner
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Ticket Modal */}
      {ticketModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md animate-fadeIn">
          <div className="min-h-screen flex items-center justify-center p-4">
            <div className="bg-gray-900 border border-red-500/30 rounded-2xl p-6 sm:p-8 max-w-lg w-full shadow-2xl shadow-red-600/20 transform scale-up-center mx-auto">
              <div className="flex justify-between items-center mb-6 sm:mb-8">
                <h3 className="text-2xl sm:text-3xl font-bold text-white">Reserve Your Ticket</h3>
                <button
                  onClick={() => setTicketModal(false)}
                  className="p-2 text-gray-400 hover:text-white hover:bg-red-500/10 rounded-full transition-colors"
                  aria-label="Close ticket modal"
                >
                  <X size={24} />
                </button>
              </div>
              <div className="space-y-5">
                {[
                  { title: "General Admission", price: "Free", desc: "Full access to all talks and networking" },
                  { title: "Student Ticket", price: "Free", desc: "Student ID required at entry. General Admission access." }
                ].map((ticket, idx) => (
                  <div key={idx} className="bg-gray-800/70 border border-red-500/20 rounded-xl p-5 sm:p-6 transition-all hover:border-red-500/40">
                    <div className="flex flex-col sm:flex-row justify-between sm:items-center mb-3">
                      <h4 className="text-lg sm:text-xl font-semibold text-white">{ticket.title}</h4>
                      <span className="text-2xl sm:text-3xl font-bold text-red-500 mt-1 sm:mt-0">{ticket.price}</span>
                    </div>
                    <p className="text-sm text-gray-400 mb-5">{ticket.desc}</p>
                    <button className="w-full px-6 py-3 bg-red-600 hover:bg-red-700 rounded-lg text-white font-semibold transition-all transform hover:scale-105">
                      Select Ticket
                    </button>
                  </div>
                ))}
              </div>
              <div className="mt-8 p-4 bg-red-500/10 border border-red-500/30 rounded-lg">
                <p className="text-sm text-red-300 text-center">
                  This independent TEDx event is operated under license from TED.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Speaker Modal */}
      {selectedSpeaker && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md animate-fadeIn">
          <div className="min-h-screen flex items-center justify-center p-4">
            <div className="bg-gray-900 border border-red-500/30 rounded-2xl p-6 sm:p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl shadow-red-600/20 transform scale-up-center scrollbar-thin scrollbar-thumb-red-700 scrollbar-track-gray-800 mx-auto">
              <div className="flex justify-between items-start mb-6 sm:mb-8">
                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-6">
                  <img
                    src={selectedSpeaker.image}
                    alt={selectedSpeaker.name}
                    className="w-24 h-24 sm:w-28 sm:h-28 rounded-full border-4 border-red-500/60 shadow-md"
                  />
                  <div>
                    <h3 className="text-2xl sm:text-3xl font-bold text-white">{selectedSpeaker.name}</h3>
                    <p className="text-red-400 text-lg">{selectedSpeaker.title}</p>
                  </div>
                </div>
                <button
                  onClick={() => setSelectedSpeaker(null)}
                  className="p-2 text-gray-400 hover:text-white hover:bg-red-500/10 rounded-full transition-colors"
                  aria-label="Close speaker modal"
                >
                  <X size={24} />
                </button>
              </div>
              <div className="space-y-6">
                <div>
                  <h4 className="text-xl font-semibold mb-2 text-red-400">
                    Talk: <span className="text-white">"{selectedSpeaker.topic}"</span>
                  </h4>
                </div>
                <div>
                  <h4 className="text-lg font-semibold mb-2 text-red-400">About the Speaker</h4>
                  <p className="text-gray-300 leading-relaxed">
                    {selectedSpeaker.bio}
                  </p>
                  <p className="text-gray-300 leading-relaxed mt-4">
                    Join us as {selectedSpeaker.name.split(" ")[0]} takes us on a
                    journey through the cutting-edge developments in their field,
                    sharing insights that will challenge our understanding and
                    inspire us to think differently about the future.
                  </p>
                </div>
                {selectedSpeaker.achievements && selectedSpeaker.achievements.length > 0 && (
                  <div>
                    <h4 className="text-lg font-semibold mb-3 text-red-400">
                      Key Achievements
                    </h4>
                    <ul className="space-y-2.5">
                      {selectedSpeaker.achievements.map((achievement, index) => (
                        <li key={index} className="flex items-start gap-3">
                          <Star
                            size={18}
                            className="text-red-500 mt-0.5 flex-shrink-0"
                          />
                          <span className="text-gray-300">{achievement}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Thank You Toast */}
      {showThankYou && (
        <div className="fixed bottom-6 right-6 sm:bottom-8 sm:right-8 bg-gray-800 border-2 border-red-500/50 rounded-xl p-5 sm:p-6 max-w-sm z-[60] shadow-2xl animate-slideInUp">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-red-500/10 rounded-full flex items-center justify-center border border-red-500/30">
              <Sparkles size={24} className="text-red-400" />
            </div>
            <div>
              <p className="font-semibold text-lg text-white">Thank you!</p>
              <p className="text-sm text-gray-300">Your message has been received. We'll be in touch soon.</p>
            </div>
            <button
              onClick={() => setShowThankYou(false)}
              className="ml-auto p-1 text-gray-400 hover:text-white"
              aria-label="Dismiss notification"
            >
              <X size={18} />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default App;