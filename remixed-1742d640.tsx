import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Home, Menu, X, Download, ChevronDown } from 'lucide-react';

const OliveYoungPresentation = () => {
  const [currentPage, setCurrentPage] = useState(0);
  const [menuOpen, setMenuOpen] = useState(false);
  const [expandedPestel, setExpandedPestel] = useState(null);
  const [expandedVrio, setExpandedVrio] = useState(null);
  const [reducedMotion, setReducedMotion] = useState(false);

  // Check for prefers-reduced-motion
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReducedMotion(mediaQuery.matches);
  }, []);

  const totalPages = 12;

  const pages = [
    { id: 0, title: 'Main Landing', short: 'Home' },
    { id: 1, title: 'Introduction', short: 'Intro' },
    { id: 2, title: 'Company Overview', short: 'Overview' },
    { id: 3, title: 'Products & Business Model', short: 'Products' },
    { id: 4, title: 'Vision & Values', short: 'Vision' },
    { id: 5, title: 'Sustainability', short: 'Sustainability' },
    { id: 6, title: 'PESTEL Analysis', short: 'PESTEL' },
    { id: 7, title: 'VRIO Analysis', short: 'VRIO' },
    { id: 8, title: 'Market Strategy', short: 'Market' },
    { id: 9, title: 'Porter & Integration', short: 'Porter' },
    { id: 10, title: 'SWOT Analysis', short: 'SWOT' },
    { id: 11, title: 'Sources & Thank You', short: 'Close' }
  ];

  const nextPage = () => {
    if (currentPage < totalPages - 1) setCurrentPage(currentPage + 1);
  };

  const prevPage = () => {
    if (currentPage > 0) setCurrentPage(currentPage - 1);
  };

  const goToPage = (page) => {
    setCurrentPage(page);
    setMenuOpen(false);
  };

  // Stars background component
  const StarsBackground = () => (
    <div className="fixed inset-0 overflow-hidden pointer-events-none">
      {!reducedMotion && [...Array(50)].map((_, i) => (
        <div
          key={i}
          className="absolute w-1 h-1 bg-white rounded-full animate-pulse"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            animationDelay: `${Math.random() * 3}s`,
            opacity: Math.random() * 0.7 + 0.3
          }}
        />
      ))}
    </div>
  );

  // Page 0: Main Landing
  const MainLanding = () => (
    <div className="relative min-h-screen flex items-center justify-center px-4">
      <div className="text-center z-10">
        <h1 className="text-6xl md:text-8xl font-bold mb-6 neon-text">
          Business Strategy
        </h1>
        <h2 className="text-4xl md:text-5xl font-semibold mb-8 text-neon-cyan">
          Course Name
        </h2>
        <p className="text-xl md:text-2xl italic text-gray-300 max-w-2xl mx-auto">
          "Strategy is about making choices, trade-offs; it's about deliberately choosing to be different."
        </p>
      </div>
      <div className="absolute bottom-8 left-8 text-6xl md:text-8xl font-bold text-white opacity-60 watermark">
        Jonyliya.com
      </div>
    </div>
  );

  // Page 1: Introduction
  const Introduction = () => (
    <div className="container-page">
      <h1 className="page-title">OLIVE YOUNG</h1>
      <h2 className="text-3xl md:text-4xl text-neon-magenta mb-8">Business Strategy Analysis</h2>
      
      <div className="glass-card p-8 mb-8">
        <h3 className="text-2xl font-bold mb-4 text-neon-cyan">Team Members</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="member-card">Jony</div>
          <div className="member-card">Shoyadbek</div>
          <div className="member-card">Akash</div>
          <div className="member-card">Shuhrat</div>
        </div>
      </div>

      <div className="glass-card p-6">
        <p className="text-lg text-gray-300">
          <strong>Navigation Instructions:</strong> Use the ◀ ▶ buttons to navigate through slides, 
          or use the menu button (☰) to jump to specific sections.
        </p>
      </div>
    </div>
  );

  // Page 2: Company Overview
  const CompanyOverview = () => (
    <div className="container-page">
      <h1 className="page-title">Company Overview</h1>
      
      <div className="glass-card p-8 mb-6">
        <h3 className="text-2xl font-bold mb-4 text-neon-cyan">Company Timeline</h3>
        <div className="space-y-4">
          <div className="timeline-item">
            <span className="font-bold text-neon-magenta">1999</span> - First store opened in Sinsa-dong, Gangnam, Seoul
          </div>
          <div className="timeline-item">
            <span className="font-bold text-neon-magenta">2000s</span> - Rapid expansion across South Korea
          </div>
          <div className="timeline-item">
            <span className="font-bold text-neon-magenta">2010s</span> - Digital transformation & omnichannel strategy
          </div>
          <div className="timeline-item">
            <span className="font-bold text-neon-magenta">2020s</span> - International expansion & sustainability focus
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="glass-card p-6">
          <h4 className="text-xl font-bold mb-3 text-neon-cyan">Headquarters</h4>
          <p className="text-gray-300">Seoul, South Korea</p>
        </div>
        <div className="glass-card p-6">
          <h4 className="text-xl font-bold mb-3 text-neon-cyan">Industry</h4>
          <p className="text-gray-300">Health & Beauty Retail (CJ Group)</p>
        </div>
      </div>

      <div className="glass-card p-6 mt-6">
        <h4 className="text-xl font-bold mb-3 text-neon-magenta">Brand Essence</h4>
        <p className="text-lg text-gray-300">"Healthy Beauty" - Enriching everyday life through beauty and health</p>
      </div>

      <p className="text-xs text-gray-500 mt-4">Source: Olive Young Corporate History, Wikipedia</p>
    </div>
  );

  // Page 3: Products & Business Model
  const ProductsBusinessModel = () => (
    <div className="container-page">
      <h1 className="page-title">Products & Business Model</h1>
      
      <div className="glass-card p-8 mb-6">
        <h3 className="text-2xl font-bold mb-6 text-neon-cyan">Product Categories</h3>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          <div className="product-tile">Skincare</div>
          <div className="product-tile">Makeup</div>
          <div className="product-tile">Haircare</div>
          <div className="product-tile">Health Supplements</div>
          <div className="product-tile">Beauty Devices</div>
          <div className="product-tile">Wellness Products</div>
        </div>
      </div>

      <div className="glass-card p-8">
        <h3 className="text-2xl font-bold mb-4 text-neon-magenta">Omnichannel Retail Model</h3>
        <div className="space-y-4 text-gray-300">
          <div className="flex items-start gap-3">
            <span className="text-neon-cyan text-2xl">🏪</span>
            <div>
              <strong>Physical Stores:</strong> 1,300+ locations across South Korea providing hands-on experience
            </div>
          </div>
          <div className="flex items-start gap-3">
            <span className="text-neon-cyan text-2xl">📱</span>
            <div>
              <strong>Mobile App:</strong> Personalized recommendations, exclusive deals, and loyalty rewards
            </div>
          </div>
          <div className="flex items-start gap-3">
            <span className="text-neon-cyan text-2xl">🌐</span>
            <div>
              <strong>E-commerce:</strong> Seamless online shopping with same-day delivery options
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  // Page 4: Vision & Values
  const VisionValues = () => (
    <div className="container-page">
      <h1 className="page-title">Vision, Mission & Core Values</h1>
      
      <div className="glass-card p-8 mb-6">
        <h3 className="text-3xl font-bold mb-4 text-neon-cyan">🎯 Vision</h3>
        <p className="text-xl text-gray-300">
          To become Asia's leading health and beauty platform, enriching lives through innovation and trust
        </p>
      </div>

      <div className="glass-card p-8 mb-6">
        <h3 className="text-3xl font-bold mb-4 text-neon-magenta">🚀 Mission</h3>
        <p className="text-xl text-gray-300">
          Deliver "Healthy Beauty" by curating quality products and empowering customers to make informed choices
        </p>
      </div>

      <div className="glass-card p-8">
        <h3 className="text-2xl font-bold mb-6 text-neon-cyan">Core Values</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="value-card">
            <span className="text-4xl mb-2">💡</span>
            <h4 className="font-bold mb-2">Innovation</h4>
            <p className="text-sm">Constantly evolving with trends and technology</p>
          </div>
          <div className="value-card">
            <span className="text-4xl mb-2">🤝</span>
            <h4 className="font-bold mb-2">Trust</h4>
            <p className="text-sm">Building authentic relationships with customers</p>
          </div>
          <div className="value-card">
            <span className="text-4xl mb-2">🌱</span>
            <h4 className="font-bold mb-2">Sustainability</h4>
            <p className="text-sm">Commitment to eco-friendly practices</p>
          </div>
        </div>
      </div>

      <p className="text-xs text-gray-500 mt-4">Source: Olive Young Vision & Company Info</p>
    </div>
  );

  // Page 5: Sustainability
  const Sustainability = () => {
    const [expanded, setExpanded] = useState(false);
    
    return (
      <div className="container-page">
        <h1 className="page-title">Sustainability & Impact</h1>
        
        <div className="glass-card p-8 mb-6">
          <h3 className="text-2xl font-bold mb-4 text-neon-cyan">♻️ Environmental Initiatives</h3>
          <div className="space-y-4 text-gray-300">
            <div className="sustainability-item">
              <strong className="text-neon-magenta">Eco-Friendly Packaging:</strong> Transition to recyclable and biodegradable materials
            </div>
            <div className="sustainability-item">
              <strong className="text-neon-magenta">Carbon Reduction:</strong> Energy-efficient stores and green logistics
            </div>
            <div className="sustainability-item">
              <strong className="text-neon-magenta">Sustainable Products:</strong> Curated selection of clean beauty brands
            </div>
          </div>
        </div>

        <div className="glass-card p-6">
          <button 
            onClick={() => setExpanded(!expanded)}
            className="w-full flex items-center justify-between text-left"
          >
            <h4 className="text-xl font-bold text-neon-cyan">📊 2024/2025 Impact Report Highlights</h4>
            <ChevronDown className={`transition-transform ${expanded ? 'rotate-180' : ''}`} />
          </button>
          
          {expanded && (
            <div className="mt-4 space-y-3 text-gray-300">
              <p>• ESG management framework integrated into business operations</p>
              <p>• Partnerships with sustainable beauty brands</p>
              <p>• Customer education programs on sustainable consumption</p>
              <p>• Supply chain transparency initiatives</p>
            </div>
          )}
        </div>

        <p className="text-xs text-gray-500 mt-4">Source: OLIVE YOUNG Impact Report 2024/2025</p>
      </div>
    );
  };

  // Page 6: PESTEL Analysis
  const PestelAnalysis = () => {
    const pestelData = [
      {
        title: 'Political',
        color: 'neon-cyan',
        points: [
          'Stable political environment in South Korea',
          'Government support for K-beauty exports',
          'Trade agreements facilitating international expansion'
        ]
      },
      {
        title: 'Economic',
        color: 'neon-magenta',
        points: [
          'Growing middle class with disposable income',
          'Strong domestic consumption in beauty sector',
          'Currency fluctuations affecting imports/exports'
        ]
      },
      {
        title: 'Social',
        color: 'neon-cyan',
        points: [
          'Rising health and wellness consciousness',
          'K-beauty global popularity and influence',
          'Aging population driving skincare demand'
        ]
      },
      {
        title: 'Technological',
        color: 'neon-magenta',
        points: [
          'Advanced e-commerce and mobile platforms',
          'AI-powered personalized recommendations',
          'Virtual try-on and AR beauty technologies'
        ]
      },
      {
        title: 'Environmental',
        color: 'neon-cyan',
        points: [
          'Increasing demand for sustainable products',
          'Pressure for eco-friendly packaging',
          'Climate change affecting supply chains'
        ]
      },
      {
        title: 'Legal',
        color: 'neon-magenta',
        points: [
          'Strict cosmetics safety regulations',
          'Data privacy laws (GDPR, local regulations)',
          'Intellectual property protections for brands'
        ]
      }
    ];

    return (
      <div className="container-page">
        <h1 className="page-title massive-text">PESTEL</h1>
        <h2 className="text-2xl md:text-3xl text-center mb-8 text-neon-cyan">External Environment Analysis</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {pestelData.map((item, idx) => (
            <div
              key={idx}
              className={`glass-card p-6 cursor-pointer transition-all hover:scale-105 ${
                expandedPestel === idx ? 'ring-2 ring-neon-cyan' : ''
              }`}
              onClick={() => setExpandedPestel(expandedPestel === idx ? null : idx)}
            >
              <h3 className={`text-2xl font-bold mb-3 text-${item.color}`}>{item.title}</h3>
              {expandedPestel === idx && (
                <ul className="space-y-2 text-sm text-gray-300">
                  {item.points.map((point, i) => (
                    <li key={i}>• {point}</li>
                  ))}
                </ul>
              )}
              {expandedPestel !== idx && (
                <p className="text-sm text-gray-400">Click to expand</p>
              )}
            </div>
          ))}
        </div>
      </div>
    );
  };

  // Page 7: VRIO Analysis
  const VrioAnalysis = () => {
    const vrioData = [
      {
        factor: 'Brand Recognition & Trust',
        valuable: 'Yes',
        rare: 'Moderate',
        imitable: 'Moderate',
        organized: 'High',
        explanation: 'Strong brand equity in Korean market, recognized for quality curation and trendsetting in K-beauty.'
      },
      {
        factor: 'Omnichannel Infrastructure',
        valuable: 'Yes',
        rare: 'Moderate',
        imitable: 'Low',
        organized: 'High',
        explanation: 'Seamless integration of 1,300+ stores with digital platforms creates competitive advantage through convenience.'
      },
      {
        factor: 'Product Curation Expertise',
        valuable: 'Yes',
        rare: 'High',
        imitable: 'Moderate',
        organized: 'High',
        explanation: 'Deep understanding of beauty trends and ability to identify emerging brands before competitors.'
      },
      {
        factor: 'CJ Group Resources',
        valuable: 'Yes',
        rare: 'High',
        imitable: 'High',
        organized: 'High',
        explanation: 'Access to conglomerate resources including logistics, technology, and capital for sustained competitive advantage.'
      }
    ];

    return (
      <div className="container-page">
        <h1 className="page-title massive-text">VRIO</h1>
        <h2 className="text-2xl md:text-3xl text-center mb-8 text-neon-magenta">Resource & Capability Analysis</h2>
        
        <div className="space-y-4">
          {vrioData.map((item, idx) => (
            <div
              key={idx}
              className={`glass-card p-6 cursor-pointer transition-all ${
                expandedVrio === idx ? 'ring-2 ring-neon-magenta' : ''
              }`}
              onClick={() => setExpandedVrio(expandedVrio === idx ? null : idx)}
            >
              <h3 className="text-xl font-bold mb-3 text-neon-cyan">{item.factor}</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-2 mb-3">
                <div className="vrio-badge">V: {item.valuable}</div>
                <div className="vrio-badge">R: {item.rare}</div>
                <div className="vrio-badge">I: {item.imitable}</div>
                <div className="vrio-badge">O: {item.organized}</div>
              </div>
              {expandedVrio === idx && (
                <p className="text-sm text-gray-300 mt-3">{item.explanation}</p>
              )}
            </div>
          ))}
        </div>
      </div>
    );
  };

  // Page 8: Market Strategy
  const MarketStrategy = () => (
    <div className="container-page">
      <h1 className="page-title">Market Development & Penetration</h1>
      
      <div className="glass-card p-8 mb-6">
        <h3 className="text-2xl font-bold mb-4 text-neon-cyan">🎯 Market Penetration (Domestic)</h3>
        <div className="space-y-3 text-gray-300">
          <div className="strategy-item">
            <strong>Store Optimization:</strong> Strategic placement in high-traffic areas and continuous store format innovation
          </div>
          <div className="strategy-item">
            <strong>Loyalty Programs:</strong> Mobile app rewards and personalized promotions to increase purchase frequency
          </div>
          <div className="strategy-item">
            <strong>Promotional Campaigns:</strong> Seasonal sales, exclusive launches, and influencer collaborations
          </div>
        </div>
      </div>

      <div className="glass-card p-8">
        <h3 className="text-2xl font-bold mb-4 text-neon-magenta">🌍 Market Development (International)</h3>
        <div className="space-y-3 text-gray-300">
          <div className="strategy-item">
            <strong>U.S. Expansion:</strong> Planned entry into American market leveraging K-beauty trend popularity
          </div>
          <div className="strategy-item">
            <strong>Digital-First Approach:</strong> Online platforms to test markets before physical store investments
          </div>
          <div className="strategy-item">
            <strong>Strategic Partnerships:</strong> Collaborations with local distributors and beauty retailers
          </div>
        </div>
      </div>

      <p className="text-xs text-gray-500 mt-4">Source: Business Insider - Korean Beauty Expansion News</p>
    </div>
  );

  // Page 9: Porter & Vertical Integration
  const PorterIntegration = () => (
    <div className="container-page">
      <h1 className="page-title massive-text">PORTER</h1>
      <h2 className="text-2xl text-center mb-6 text-neon-cyan">Generic Strategy & Vertical Integration</h2>
      
      <div className="glass-card p-8 mb-6">
        <h3 className="text-2xl font-bold mb-4 text-neon-magenta">🎯 Recommended: Differentiation Strategy</h3>
        <div className="space-y-3 text-gray-300">
          <div className="porter-item">
            <strong>✓ Unique Product Curation:</strong> Carefully selected mix of established and emerging brands creates distinctive shopping experience
          </div>
          <div className="porter-item">
            <strong>✓ Omnichannel Excellence:</strong> Superior integration of online and offline channels provides convenience competitors struggle to match
          </div>
          <div className="porter-item">
            <strong>✓ Brand Trust & Expertise:</strong> "Healthy Beauty" positioning and trend leadership justifies premium positioning
          </div>
        </div>
      </div>

      <div className="glass-card p-8">
        <h3 className="text-2xl font-bold mb-4 text-neon-cyan">🔗 Vertical Integration Analysis</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h4 className="font-bold text-neon-magenta mb-3">Upstream (Moderate)</h4>
            <p className="text-sm text-gray-300 mb-2"><strong>Pros:</strong> Private label development, quality control, margin improvement</p>
            <p className="text-sm text-gray-300"><strong>Cons:</strong> High capital investment, reduced brand variety</p>
          </div>
          <div>
            <h4 className="font-bold text-neon-magenta mb-3">Downstream (High)</h4>
            <p className="text-sm text-gray-300 mb-2"><strong>Pros:</strong> Control over customer experience, data collection, loyalty building</p>
            <p className="text-sm text-gray-300"><strong>Cons:</strong> Real estate costs, operational complexity</p>
          </div>
        </div>
      </div>
    </div>
  );

  // Page 10: SWOT Analysis
  const SwotAnalysis = () => (
    <div className="container-page">
      <h1 className="page-title massive-text">SWOT</h1>
      <h2 className="text-2xl text-center mb-6 text-neon-magenta">Strategic Position Summary</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <div className="glass-card p-6 border-l-4 border-neon-cyan">
          <h3 className="text-xl font-bold mb-3 text-neon-cyan">💪 Strengths</h3>
          <ul className="space-y-2 text-sm text-gray-300">
            <li>• Dominant market position in Korea</li>
            <li>• Strong omnichannel infrastructure</li>
            <li>• Brand trust and customer loyalty</li>
            <li>• CJ Group's financial backing</li>
            <li>• Trend identification expertise</li>
          </ul>
        </div>
        
        <div className="glass-card p-6 border-l-4 border-red-500">
          <h3 className="text-xl font-bold mb-3 text-red-400">⚠️ Weaknesses</h3>
          <ul className="space-y-2 text-sm text-gray-300">
            <li>• Heavy reliance on Korean market</li>
            <li>• Limited international presence</li>
            <li>• High operational costs (stores)</li>
            <li>• Competition from pure-play e-commerce</li>
            <li>• Private label limited vs competitors</li>
          </ul>
        </div>
        
        <div className="glass-card p-6 border-l-4 border-green-500">
          <h3 className="text-xl font-bold mb-3 text-green-400">🌟 Opportunities</h3>
          <ul className="space-y-2 text-sm text-gray-300">
            <li>• K-beauty global popularity surge</li>
            <li>• U.S. market expansion potential</li>
            <li>• Sustainable beauty products demand</li>
            <li>• Digital technology innovation (AI/AR)</li>
            <li>• Men's grooming market growth</li>
          </ul>
        </div>
        
        <div className="glass-card p-6 border-l-4 border-yellow-500">
          <h3 className="text-xl font-bold mb-3 text-yellow-400">⚡ Threats</h3>
          <ul className="space-y-2 text-sm text-gray-300">
            <li>• Intense competition from Sephora, Ulta</li>
            <li>• Economic downturn affecting spending</li>
            <li>• Regulatory changes in new markets</li>
            <li>• Supply chain disruptions</li>
            <li>• Changing consumer preferences</li>
          </ul>
        </div>
      </div>

      <div className="glass-card p-6">
        <h3 className="text-xl font-bold mb-3 text-neon-cyan">🎯 Strategic Priorities</h3>
        <div className="space-y-2 text-gray-300">
          <p><strong>1.</strong> Accelerate international expansion using digital-first approach</p>
          <p><strong>2.</strong> Invest in sustainability initiatives to align with consumer values</p>
          <p><strong>3.</strong> Leverage technology for personalization and enhanced customer experience</p>
        </div>
      </div>
    </div>
  );

  // Page 11: Thank You & Sources
  const ThankYou = () => (
    <div className="container-page">
      <h1 className="page-title">Thank You</h1>
      
      <div className="glass-card p-8 mb-6 text-center">
        <h3 className="text-2xl font-bold mb-4 text-neon-cyan">Presented By</h3>
        <p className="text-xl text-gray-300 mb-2">Jony, Shoyadbek, Akash, Shuhrat</p>
        <p className="text-lg text-gray-400">Business Strategy Course</p>
      </div>

      <div className="glass-card p-8">
        <h3 className="text-xl font-bold mb-4 text-neon-magenta">📚 Sources & References</h3>
        <div className="space-y-3 text-sm text-gray-300">
          <p>
            <strong>1.</strong> Olive Young Corporate History & About. 
            <a href="https://corp.oliveyoung.com/en/company/history" className="text-neon-cyan hover:underline ml-2" target="_blank" rel="noopener">
              corp.oliveyoung.com
            </a>
          </p>
          <p>
            <strong>2.</strong> Olive Young Vision & Company Information.
            <a href="https://corp.oliveyoung.com/en/company/vision" className="text-neon-cyan hover:underline ml-2" target="_blank" rel="noopener">
              corp.oliveyoung.com/vision
            </a>
          </p>
          <p>
            <strong>3.</strong> OLIVE YOUNG Impact Report 2024/2025.
            <a href="https://contents.cj.net/esg/report/KR/2024%20OLIVE%20YOUNG%20IMPACT%20REPORT_Web.pdf" className="text-neon-cyan hover:underline ml-2" target="_blank" rel="noopener">
              CJ ESG Report
            </a>
          </p>
          <p>
            <strong>4.</strong> Korean Beauty Brands U.S. Expansion - Business Insider.
            <a href="https://www.businessinsider.com/korean-beauty-brands-exclusive-sephora-ulta-olive-young-2025-10" className="text-neon-cyan hover:underline ml-2" target="_blank" rel="noopener">
              businessinsider.com
            </a>
          </p>
          <p>
            <strong>5.</strong> Wikipedia - Olive Young (Company).
            <a href="https://en.wikipedia.org/wiki/Olive_Young_(company)" className="text-neon-cyan hover:underline ml-2" target="_blank" rel="noopener">
              wikipedia.org
            </a>
          </p>
          <p>
            <strong>6.</strong> Harvard Business School Case Study.
            <a href="https://newsroom.cj.net/cj-olive-young-selected-by-harvard-business-school/" className="text-neon-cyan hover:underline ml-2" target="_blank" rel="noopener">
              CJ Newsroom
            </a>
          </p>
        </div>
      </div>

      <div className="mt-8 text-center">
        <button
          onClick={() => setCurrentPage(0)}
          className="px-8 py-3 bg-gradient-to-r from-neon-cyan to-neon-magenta rounded-lg font-bold hover:scale-105 transition-transform"
        >
          Back to Main Page
        </button>
      </div>
    </div>
  );

  // Render current page
  const renderPage = () => {
    switch(currentPage) {
      case 0: return <MainLanding />;
      case 1: return <Introduction />;
      case 2: return <CompanyOverview />;
      case 3: return <ProductsBusinessModel />;
      case 4: return <VisionValues />;
      case 5: return <Sustainability />;
      case 6: return <PestelAnalysis />;
      case 7: return <VrioAnalysis />;
      case 8: return <MarketStrategy />;
      case 9: return <PorterIntegration />;
      case 10: return <SwotAnalysis />;
      case 11: return <ThankYou />;
      default: return <MainLanding />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900 text-white overflow-hidden">
      <StarsBackground />
      
      {/* Top Navigation Bar */}
      <div className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between p-4 bg-black bg-opacity-50 backdrop-blur-sm">
        {currentPage === 0 ? (
          <button
            onClick={() => setCurrentPage(1)}
            className="px-6 py-2 bg-neon-cyan text-black font-bold rounded-lg hover:scale-105 transition-transform"
          >
            Open Presentation
          </button>
        ) : (
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="p-2 hover:bg-white hover:bg-opacity-10 rounded-lg transition-colors"
          >
            {menuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        )}
        
        <div className="text-sm font-mono">
          {currentPage + 1} / {totalPages}
        </div>
        
        {currentPage > 0 && (
          <button
            onClick={() => setCurrentPage(0)}
            className="p-2 hover:bg-white hover:bg-opacity-10 rounded-lg transition-colors"
            title="Back to Home"
          >
            <Home size={24} />
          </button>
        )}
      </div>

      {/* Side Menu */}
      {menuOpen && (
        <div className="fixed left-0 top-16 bottom-0 w-64 bg-black bg-opacity-90 backdrop-blur-sm z-40 p-4 overflow-y-auto">
          <h3 className="text-lg font-bold mb-4 text-neon-cyan">Navigation</h3>
          <div className="space-y-2">
            {pages.map((page) => (
              <button
                key={page.id}
                onClick={() => goToPage(page.id)}
                className={`w-full text-left px-4 py-2 rounded-lg transition-colors ${
                  currentPage === page.id
                    ? 'bg-neon-cyan text-black font-bold'
                    : 'hover:bg-white hover:bg-opacity-10'
                }`}
              >
                {page.id}. {page.short}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Main Content */}
      <div className="relative z-10 pt-20">
        {renderPage()}
      </div>

      {/* Navigation Buttons */}
      {currentPage > 0 && (
        <div className="fixed bottom-8 right-8 flex gap-4 z-50">
          <button
            onClick={prevPage}
            disabled={currentPage === 0}
            className={`p-4 rounded-full transition-all ${
              currentPage === 0
                ? 'bg-gray-700 opacity-50 cursor-not-allowed'
                : 'bg-neon-magenta hover:scale-110 shadow-lg shadow-neon-magenta/50'
            }`}
          >
            <ChevronLeft size={32} />
          </button>
          <button
            onClick={nextPage}
            disabled={currentPage === totalPages - 1}
            className={`p-4 rounded-full transition-all ${
              currentPage === totalPages - 1
                ? 'bg-gray-700 opacity-50 cursor-not-allowed'
                : 'bg-neon-cyan hover:scale-110 shadow-lg shadow-neon-cyan/50'
            }`}
          >
            <ChevronRight size={32} />
          </button>
        </div>
      )}

      {/* Download Button */}
      {currentPage > 0 && (
        <button
          onClick={() => alert('PDF export would be implemented with jsPDF library. Instructions: Use browser Print > Save as PDF for now.')}
          className="fixed bottom-8 left-8 p-4 bg-green-600 hover:bg-green-700 rounded-full transition-all hover:scale-110 z-50"
          title="Export to PDF"
        >
          <Download size={24} />
        </button>
      )}

      <style jsx>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700;800;900&display=swap');
        
        * {
          font-family: 'Inter', sans-serif;
        }

        .neon-text {
          text-shadow: 0 0 10px #00ffff, 0 0 20px #00ffff, 0 0 30px #00ffff;
        }

        .text-neon-cyan {
          color: #00ffff;
        }

        .text-neon-magenta {
          color: #ff00ff;
        }

        .bg-neon-cyan {
          background-color: #00ffff;
        }

        .bg-neon-magenta {
          background-color: #ff00ff;
        }

        .shadow-neon-cyan\/50 {
          box-shadow: 0 0 20px rgba(0, 255, 255, 0.5);
        }

        .shadow-neon-magenta\/50 {
          box-shadow: 0 0 20px rgba(255, 0, 255, 0.5);
        }

        .watermark {
          pointer-events: none;
          user-select: none;
        }

        .page-title {
          font-size: clamp(2.5rem, 8vw, 5rem);
          font-weight: 900;
          text-align: center;
          margin-bottom: 2rem;
          background: linear-gradient(135deg, #00ffff, #ff00ff);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .massive-text {
          font-size: clamp(3rem, 12vw, 8rem);
          letter-spacing: 0.1em;
        }

        .container-page {
          max-width: 1200px;
          margin: 0 auto;
          padding: 2rem;
          min-height: calc(100vh - 80px);
        }

        .glass-card {
          background: rgba(255, 255, 255, 0.05);
          backdrop-filter: blur(10px);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 1rem;
          transition: all 0.3s ease;
        }

        .glass-card:hover {
          background: rgba(255, 255, 255, 0.08);
          border-color: rgba(0, 255, 255, 0.3);
        }

        .member-card {
          background: linear-gradient(135deg, rgba(0, 255, 255, 0.1), rgba(255, 0, 255, 0.1));
          padding: 1rem;
          border-radius: 0.5rem;
          text-align: center;
          font-weight: 600;
          border: 1px solid rgba(0, 255, 255, 0.3);
        }

        .timeline-item {
          padding: 0.75rem;
          background: rgba(255, 255, 255, 0.03);
          border-left: 3px solid #00ffff;
          padding-left: 1rem;
          color: #e5e7eb;
        }

        .product-tile {
          background: linear-gradient(135deg, rgba(0, 255, 255, 0.15), rgba(255, 0, 255, 0.15));
          padding: 1.5rem;
          border-radius: 0.75rem;
          text-align: center;
          font-weight: 600;
          border: 2px solid rgba(0, 255, 255, 0.3);
          transition: all 0.3s ease;
        }

        .product-tile:hover {
          transform: translateY(-5px);
          box-shadow: 0 10px 25px rgba(0, 255, 255, 0.3);
        }

        .value-card {
          background: rgba(255, 255, 255, 0.05);
          padding: 1.5rem;
          border-radius: 0.75rem;
          text-align: center;
          border: 1px solid rgba(255, 255, 255, 0.1);
          transition: all 0.3s ease;
        }

        .value-card:hover {
          transform: scale(1.05);
          border-color: rgba(0, 255, 255, 0.5);
        }

        .sustainability-item {
          padding: 0.75rem;
          background: rgba(0, 255, 0, 0.05);
          border-radius: 0.5rem;
          border-left: 3px solid #10b981;
        }

        .strategy-item {
          padding: 0.75rem;
          background: rgba(255, 255, 255, 0.03);
          border-radius: 0.5rem;
          border-left: 3px solid #00ffff;
        }

        .porter-item {
          padding: 0.75rem;
          background: rgba(255, 255, 255, 0.03);
          border-radius: 0.5rem;
          border-left: 3px solid #ff00ff;
        }

        .vrio-badge {
          background: rgba(0, 255, 255, 0.2);
          padding: 0.5rem;
          border-radius: 0.375rem;
          text-align: center;
          font-size: 0.875rem;
          font-weight: 600;
          border: 1px solid rgba(0, 255, 255, 0.4);
        }

        @keyframes pulse {
          0%, 100% { opacity: 0.3; }
          50% { opacity: 1; }
        }

        .animate-pulse {
          animation: pulse 3s ease-in-out infinite;
        }

        @media (prefers-reduced-motion: reduce) {
          .animate-pulse {
            animation: none;
          }
          * {
            transition: none !important;
            animation: none !important;
          }
        }

        @media (max-width: 768px) {
          .container-page {
            padding: 1rem;
          }
          
          .watermark {
            font-size: 2rem !important;
          }
        }

        /* Accessibility */
        button:focus-visible {
          outline: 2px solid #00ffff;
          outline-offset: 2px;
        }

        /* Smooth scrolling */
        html {
          scroll-behavior: smooth;
        }
      `}</style>
    </div>
  );
};

export default OliveYoungPresentation;