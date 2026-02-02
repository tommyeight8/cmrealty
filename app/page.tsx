"use client";

import { useState, useEffect, useRef } from "react";

const SEED_PROPERTIES = [
  {
    id: 1,
    address: "1847 Grandview Terrace",
    city: "Beverly Hills",
    state: "CA",
    zip: "90210",
    price: 4250000,
    beds: 5,
    baths: 4,
    sqft: 4800,
    type: "Single Family",
    image:
      "https://images.unsplash.com/photo-1762810981576-1b07f76af9d2?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    featured: true,
    yearBuilt: 2019,
    description:
      "Stunning modern estate with panoramic city views, infinity pool, and chef's kitchen.",
  },
  {
    id: 2,
    address: "2301 Oceanfront Drive",
    city: "Malibu",
    state: "CA",
    zip: "90265",
    price: 8750000,
    beds: 6,
    baths: 7,
    sqft: 7200,
    type: "Waterfront",
    image:
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80",
    featured: true,
    yearBuilt: 2021,
    description:
      "Breathtaking oceanfront retreat with private beach access and floor-to-ceiling glass walls.",
  },
  {
    id: 3,
    address: "456 Elm Street",
    city: "Pasadena",
    state: "CA",
    zip: "91101",
    price: 1850000,
    beds: 4,
    baths: 3,
    sqft: 3200,
    type: "Single Family",
    image:
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&q=80",
    featured: false,
    yearBuilt: 2017,
    description:
      "Elegant craftsman home in the heart of Pasadena with mature landscaping.",
  },
  {
    id: 4,
    address: "789 Wilshire Blvd #42",
    city: "Los Angeles",
    state: "CA",
    zip: "90017",
    price: 975000,
    beds: 2,
    baths: 2,
    sqft: 1450,
    type: "Condo",
    image:
      "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=800&q=80",
    featured: false,
    yearBuilt: 2020,
    description:
      "Luxury high-rise condo with skyline views, concierge, and rooftop amenities.",
  },
  {
    id: 5,
    address: "1122 Sunset Canyon Rd",
    city: "Calabasas",
    state: "CA",
    zip: "91302",
    price: 6300000,
    beds: 7,
    baths: 8,
    sqft: 9500,
    type: "Estate",
    image:
      "https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?w=800&q=80",
    featured: true,
    yearBuilt: 2022,
    description:
      "Gated compound with guest house, home theater, wine cellar, and resort-style pool.",
  },
  {
    id: 6,
    address: "330 Pacific Ave",
    city: "Santa Monica",
    state: "CA",
    zip: "90402",
    price: 3150000,
    beds: 4,
    baths: 3,
    sqft: 2800,
    type: "Townhouse",
    image:
      "https://images.unsplash.com/photo-1762810981576-1b07f76af9d2??w=800&q=80",
    featured: false,
    yearBuilt: 2018,
    description:
      "Contemporary townhome steps from the beach with rooftop deck and smart home features.",
  },
  {
    id: 7,
    address: "5540 Mulholland Drive",
    city: "Los Angeles",
    state: "CA",
    zip: "90068",
    price: 5500000,
    beds: 5,
    baths: 5,
    sqft: 5600,
    type: "Single Family",
    image:
      "https://images.unsplash.com/photo-1762810981576-1b07f76af9d2?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    featured: false,
    yearBuilt: 2023,
    description:
      "Architectural masterpiece perched above the city with walls of glass and floating staircase.",
  },
  {
    id: 8,
    address: "221 Harbor View Ln",
    city: "Newport Beach",
    state: "CA",
    zip: "92660",
    price: 7200000,
    beds: 5,
    baths: 6,
    sqft: 6100,
    type: "Waterfront",
    image:
      "https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=800&q=80",
    featured: false,
    yearBuilt: 2020,
    description:
      "Harbor-front estate with private dock, outdoor kitchen, and Mediterranean-inspired design.",
  },
  {
    id: 9,
    address: "88 Rodeo Place",
    city: "Beverly Hills",
    state: "CA",
    zip: "90210",
    price: 12500000,
    beds: 8,
    baths: 10,
    sqft: 12000,
    type: "Estate",
    image:
      "https://images.unsplash.com/photo-1613977257363-707ba9348227?w=800&q=80",
    featured: true,
    yearBuilt: 2024,
    description:
      "Iconic mega-mansion with ballroom, spa, 12-car garage, and unrivaled luxury throughout.",
  },
];

const TESTIMONIALS = [
  {
    name: "Sarah & James Mitchell",
    text: "Crestview made our dream home a reality. Their market expertise in Beverly Hills is unmatched.",
    location: "Beverly Hills, CA",
  },
  {
    name: "David Chen",
    text: "Sold our condo in 9 days above asking. The team's strategy and negotiation skills are incredible.",
    location: "Santa Monica, CA",
  },
  {
    name: "Maria Gonzalez",
    text: "The property estimate tool saved us months of guesswork. We listed at the perfect price.",
    location: "Pasadena, CA",
  },
];

const formatPrice = (price: number) =>
  new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(price);

// ─── Icons ───
const SearchIcon = () => (
  <svg
    width="22"
    height="22"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.2"
    strokeLinecap="round"
    strokeLinejoin="round"
    viewBox="0 0 24 24"
  >
    <circle cx="11" cy="11" r="8" />
    <line x1="21" y1="21" x2="16.65" y2="16.65" />
  </svg>
);

const BedIcon = () => (
  <svg
    width="16"
    height="16"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.8"
    viewBox="0 0 24 24"
  >
    <path d="M3 7v11m0-4h18m0 0V7a2 2 0 00-2-2H5a2 2 0 00-2 2m18 7v4M3 18v-4m3-6h2m4 0h2" />
  </svg>
);

const BathIcon = () => (
  <svg
    width="16"
    height="16"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.8"
    viewBox="0 0 24 24"
  >
    <path d="M4 12h16a1 1 0 011 1v3a4 4 0 01-4 4H7a4 4 0 01-4-4v-3a1 1 0 011-1zm2-4V6a2 2 0 012-2h1" />
  </svg>
);

const SqftIcon = () => (
  <svg
    width="16"
    height="16"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.8"
    viewBox="0 0 24 24"
  >
    <rect x="3" y="3" width="18" height="18" rx="2" />
    <path d="M3 12h18M12 3v18" />
  </svg>
);

const ArrowRight = () => (
  <svg
    width="18"
    height="18"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    viewBox="0 0 24 24"
  >
    <path d="M5 12h14M12 5l7 7-7 7" />
  </svg>
);

const HomeIcon = () => (
  <svg
    width="32"
    height="32"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.6"
    viewBox="0 0 24 24"
  >
    <path d="M3 12l9-9 9 9M5 10v10a1 1 0 001 1h3a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1h3a1 1 0 001-1V10" />
  </svg>
);

const DollarIcon = () => (
  <svg
    width="32"
    height="32"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.6"
    viewBox="0 0 24 24"
  >
    <path d="M12 1v22M17 5H9.5a3.5 3.5 0 100 7h5a3.5 3.5 0 110 7H6" />
  </svg>
);

const ChartIcon = () => (
  <svg
    width="32"
    height="32"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.6"
    viewBox="0 0 24 24"
  >
    <path d="M3 3v18h18M7 16l4-4 4 4 5-6" />
  </svg>
);

const StarIcon = () => (
  <svg width="16" height="16" fill="currentColor" viewBox="0 0 24 24">
    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
  </svg>
);

const QuoteIcon = () => (
  <svg
    width="40"
    height="40"
    fill="currentColor"
    opacity="0.15"
    viewBox="0 0 24 24"
  >
    <path d="M6 17h3l2-4V7H5v6h3zm8 0h3l2-4V7h-6v6h3z" />
  </svg>
);

const ChevronDown = () => (
  <svg
    width="20"
    height="20"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    viewBox="0 0 24 24"
  >
    <path d="M6 9l6 6 6-6" />
  </svg>
);

const PhoneIcon = () => (
  <svg
    width="20"
    height="20"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.8"
    viewBox="0 0 24 24"
  >
    <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z" />
  </svg>
);

const MailIcon = () => (
  <svg
    width="20"
    height="20"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.8"
    viewBox="0 0 24 24"
  >
    <rect x="2" y="4" width="20" height="16" rx="2" />
    <path d="M22 7l-10 6L2 7" />
  </svg>
);

const MapPinIcon = () => (
  <svg
    width="20"
    height="20"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.8"
    viewBox="0 0 24 24"
  >
    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" />
    <circle cx="12" cy="10" r="3" />
  </svg>
);

const ClockIcon = () => (
  <svg
    width="20"
    height="20"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.8"
    viewBox="0 0 24 24"
  >
    <circle cx="12" cy="12" r="10" />
    <path d="M12 6v6l4 2" />
  </svg>
);

const CheckCircleIcon = () => (
  <svg
    width="56"
    height="56"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    viewBox="0 0 24 24"
  >
    <circle cx="12" cy="12" r="10" />
    <path d="M9 12l2 2 4-4" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const UserIcon = () => (
  <svg
    width="18"
    height="18"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.8"
    viewBox="0 0 24 24"
  >
    <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2" />
    <circle cx="12" cy="7" r="4" />
  </svg>
);

// ─── Property Card ───
function PropertyCard({
  property,
  index,
}: {
  property: (typeof SEED_PROPERTIES)[number];
  index: number;
}) {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageFailed, setImageFailed] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setImageLoaded(true), 3000);
    return () => clearTimeout(timer);
  }, []);

  const showImage = imageLoaded || imageFailed;

  return (
    <div
      className="property-card"
      style={{ animationDelay: `${index * 0.08}s` }}
    >
      <div className="property-image-wrap">
        {!imageFailed ? (
          <img
            src={property.image}
            alt={property.address}
            onLoad={() => setImageLoaded(true)}
            onError={() => {
              setImageFailed(true);
              setImageLoaded(true);
            }}
            style={{ opacity: showImage ? 1 : 0 }}
          />
        ) : (
          <div className="image-fallback">
            <HomeIcon />
            <span>{property.type}</span>
          </div>
        )}
        {!showImage && <div className="image-skeleton" />}
        <div className="property-type-badge">{property.type}</div>
        {property.featured && <div className="featured-badge">Featured</div>}
        <div className="property-price-overlay">
          {formatPrice(property.price)}
        </div>
      </div>
      <div className="property-info">
        <h3 className="property-address">{property.address}</h3>
        <p className="property-city">
          {property.city}, {property.state} {property.zip}
        </p>
        <p className="property-desc">{property.description}</p>
        <div className="property-meta">
          <span>
            <BedIcon /> {property.beds} Beds
          </span>
          <span>
            <BathIcon /> {property.baths} Baths
          </span>
          <span>
            <SqftIcon /> {property.sqft.toLocaleString()} sqft
          </span>
        </div>
        <button className="property-cta">
          View Details <ArrowRight />
        </button>
      </div>
    </div>
  );
}

// ─── Main App ───
export default function CrestviewRealty() {
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredProperties, setFilteredProperties] = useState(SEED_PROPERTIES);
  const [activeTab, setActiveTab] = useState("buy");
  const [hasSearched, setHasSearched] = useState(false);
  const [scrollY, setScrollY] = useState(0);
  const [estimateAddress, setEstimateAddress] = useState("");
  const [estimateResult, setEstimateResult] = useState<{
    low: number;
    mid: number;
    high: number;
  } | null>(null);
  const [contactForm, setContactForm] = useState({
    name: "",
    email: "",
    phone: "",
    interest: "buying",
    message: "",
    budget: "",
  });
  const [contactSubmitted, setContactSubmitted] = useState(false);
  const [contactSubmitting, setContactSubmitting] = useState(false);
  const listingsRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleSearch = () => {
    if (!searchQuery.trim()) {
      setFilteredProperties(SEED_PROPERTIES);
      setHasSearched(false);
      return;
    }
    const q = searchQuery.toLowerCase().trim();
    const results = SEED_PROPERTIES.filter(
      (p) =>
        p.city.toLowerCase().includes(q) ||
        p.zip.includes(q) ||
        p.state.toLowerCase().includes(q) ||
        p.address.toLowerCase().includes(q),
    );
    setFilteredProperties(results);
    setHasSearched(true);
    setTimeout(() => {
      listingsRef.current?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }, 100);
  };

  const handleEstimate = () => {
    if (!estimateAddress.trim()) return;
    const base = 850000 + Math.floor(Math.random() * 4000000);
    const low = Math.floor(base * 0.92);
    const high = Math.floor(base * 1.08);
    setEstimateResult({ low, mid: base, high });
  };

  const handleContactSubmit = () => {
    if (!contactForm.name.trim() || !contactForm.email.trim()) return;
    setContactSubmitting(true);
    setTimeout(() => {
      setContactSubmitting(false);
      setContactSubmitted(true);
    }, 1500);
  };

  const updateContact = (field: string, value: string) => {
    setContactForm((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <div className="app">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,500;0,600;0,700;1,400;1,500&family=DM+Sans:ital,wght@0,300;0,400;0,500;0,600;0,700;1,400&display=swap');

        :root {
          --royal-900: #0a1628;
          --royal-800: #0f2044;
          --royal-700: #142d5e;
          --royal-600: #1a3a7a;
          --royal-500: #1e4d9b;
          --royal-400: #2a6bc4;
          --royal-300: #4a8fdf;
          --royal-200: #7bb3ef;
          --royal-100: #c0d9f7;
          --royal-50: #e8f1fc;
          --gold-600: #b8860b;
          --gold-500: #d4a017;
          --gold-400: #e8b930;
          --gold-300: #f0cc5b;
          --gold-200: #f5dc8a;
          --gold-100: #faefc4;
          --gold-50: #fdf8e8;
          --surface: #f8f9fc;
          --card-bg: #ffffff;
          --text-primary: #0a1628;
          --text-secondary: #4a5568;
          --text-muted: #8896ab;
          --border: #e2e8f0;
          --shadow-sm: 0 1px 3px rgba(10,22,40,0.06);
          --shadow-md: 0 4px 16px rgba(10,22,40,0.08);
          --shadow-lg: 0 12px 40px rgba(10,22,40,0.12);
          --shadow-xl: 0 24px 60px rgba(10,22,40,0.16);
          --radius-sm: 8px;
          --radius-md: 14px;
          --radius-lg: 20px;
          --radius-xl: 28px;
          --font-display: 'Playfair Display', Georgia, serif;
          --font-body: 'DM Sans', system-ui, sans-serif;
          --gold-gradient: linear-gradient(135deg, #d4a017, #f0cc5b, #d4a017);
          --royal-gradient: linear-gradient(135deg, var(--royal-800), var(--royal-600));
        }

        *, *::before, *::after { margin: 0; padding: 0; box-sizing: border-box; }

        .app {
          font-family: var(--font-body);
          color: var(--text-primary);
          background: var(--surface);
          min-height: 100vh;
          overflow-x: hidden;
        }

        /* ─── NAV ─── */
        .nav {
          position: fixed;
          top: 0; left: 0; right: 0;
          z-index: 100;
          padding: 0 48px;
          height: 72px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          background: #ffffff;
          border-bottom: 1px solid var(--border);
          transition: box-shadow 0.3s;
        }
        .nav.scrolled {
          box-shadow: 0 2px 16px rgba(10, 22, 40, 0.08);
        }
        .nav-logo {
          display: flex;
          align-items: center;
          gap: 10px;
          text-decoration: none;
        }
        .nav-logo-icon {
          width: 38px; height: 38px;
          background: var(--royal-gradient);
          border-radius: 10px;
          display: flex; align-items: center; justify-content: center;
          color: #fff;
          font-family: var(--font-display);
          font-weight: 700; font-size: 18px;
        }
        .nav-logo-text {
          font-family: var(--font-display);
          font-size: 22px; font-weight: 600;
          letter-spacing: -0.02em;
          color: var(--royal-900);
        }
        .nav-links {
          display: flex; align-items: center;
          gap: 36px; list-style: none;
        }
        .nav-links a {
          color: var(--text-secondary);
          text-decoration: none;
          font-size: 14.5px; font-weight: 500;
          letter-spacing: 0.02em;
          transition: color 0.2s;
        }
        .nav-links a:hover { color: var(--royal-600); }
        .nav-cta {
          background: var(--royal-gradient) !important;
          color: #fff !important;
          padding: 10px 24px;
          border-radius: 50px;
          font-weight: 600 !important;
          font-size: 14px !important;
          transition: transform 0.2s, box-shadow 0.2s;
        }
        .nav-cta:hover {
          transform: translateY(-1px);
          box-shadow: 0 4px 20px rgba(20, 45, 94, 0.25);
        }


        /* ─── HERO ─── */
        .hero {
          position: relative;
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          background: var(--royal-900);
          overflow: hidden;
        }
        .hero-bg-image {
          position: absolute;
          inset: 0;
          background-image: url('https://images.unsplash.com/photo-1600210491892-03d54c0aaf87?q=80&w=1920&auto=format&fit=crop');
          background-size: cover;
          background-position: center;
          background-repeat: no-repeat;
        }
        .hero-bg {
          position: absolute;
          inset: 0;
          background: 
            linear-gradient(180deg, rgba(10, 22, 40, 0.72) 0%, rgba(10, 22, 40, 0.55) 40%, rgba(10, 22, 40, 0.75) 100%),
            radial-gradient(ellipse 120% 80% at 20% 50%, rgba(26, 58, 122, 0.35) 0%, transparent 60%),
            radial-gradient(ellipse 80% 100% at 80% 20%, rgba(30, 77, 155, 0.2) 0%, transparent 50%),
            radial-gradient(ellipse 60% 60% at 60% 80%, rgba(212, 160, 23, 0.06) 0%, transparent 50%);
        }
        .hero-pattern {
          position: absolute;
          inset: 0;
          opacity: 0.03;
          background-image: 
            linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px);
          background-size: 60px 60px;
        }
        .hero-glow {
          position: absolute;
          width: 600px;
          height: 600px;
          border-radius: 50%;
          background: radial-gradient(circle, rgba(212, 160, 23, 0.08) 0%, transparent 70%);
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          pointer-events: none;
        }
        .hero-content {
          position: relative;
          z-index: 2;
          text-align: center;
          max-width: 820px;
          padding: 0 24px;
          animation: heroFadeIn 1s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
        @keyframes heroFadeIn {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .hero-badge {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          background: rgba(212, 160, 23, 0.12);
          border: 1px solid rgba(212, 160, 23, 0.25);
          color: var(--gold-300);
          padding: 8px 20px;
          border-radius: 50px;
          font-size: 13px;
          font-weight: 600;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          margin-bottom: 28px;
        }
        .hero-badge-dot {
          width: 7px;
          height: 7px;
          background: var(--gold-400);
          border-radius: 50%;
          animation: pulse 2s ease-in-out infinite;
        }
        @keyframes pulse {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.5; transform: scale(1.4); }
        }
        .hero h1 {
          font-family: var(--font-display);
          font-size: clamp(40px, 6vw, 72px);
          font-weight: 600;
          color: #fff;
          line-height: 1.1;
          margin-bottom: 20px;
          letter-spacing: -0.02em;
        }
        .hero h1 em {
          font-style: italic;
          background: var(--gold-gradient);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }
        .hero-subtitle {
          font-size: clamp(16px, 2vw, 19px);
          color: rgba(255,255,255,0.55);
          line-height: 1.6;
          max-width: 560px;
          margin: 0 auto 44px;
          font-weight: 400;
        }

         /* ─── SEARCH BOX ─── */
        .search-container {
          max-width: 720px;
          margin: 0 auto;
          position: relative;
          display: flex; align-items: center;
          background: #ffffff;
          border-radius: 60px;
          padding: 6px;
          box-shadow: 0 8px 32px rgba(10,22,40,0.18), 0 2px 8px rgba(10,22,40,0.08);
          transition: box-shadow 0.3s;
        }
        .search-container:focus-within {
          box-shadow: 0 8px 32px rgba(10,22,40,0.22), 0 0 0 3px rgba(42,107,196,0.15);
        }
        .search-tabs {
          display: flex; gap: 3px;
          padding-left: 6px; flex-shrink: 0;
        }
        .search-tab {
          background: transparent;
          border: 1px solid var(--border);
          color: var(--text-muted);
          padding: 8px 16px; border-radius: 50px;
          font-family: var(--font-body);
          font-size: 13px; font-weight: 500;
          cursor: pointer; transition: all 0.25s;
          white-space: nowrap;
        }
        .search-tab.active {
          background: var(--royal-50);
          border-color: var(--royal-200);
          color: var(--royal-700);
          font-weight: 600;
        }
        .search-tab:hover:not(.active) {
          border-color: var(--royal-200);
          color: var(--royal-500);
          background: var(--royal-50);
        }
        .search-divider {
          width: 1px; height: 28px;
          background: var(--border);
          margin: 0 12px; flex-shrink: 0;
        }
        .search-box {
          display: flex; align-items: center;
          flex: 1; min-width: 0;
        }
        .search-box input {
          flex: 1; background: none; border: none; outline: none;
          color: var(--text-primary);
          font-family: var(--font-body);
          font-size: 16px; padding: 14px 0; font-weight: 400;
        }
        .search-box input::placeholder { color: var(--text-muted); }
        .search-btn {
          display: flex; align-items: center; gap: 8px;
          background: var(--royal-gradient);
          color: #fff; border: none;
          padding: 14px 30px; border-radius: 50px;
          font-family: var(--font-body);
          font-size: 15px; font-weight: 600;
          cursor: pointer; transition: all 0.25s;
          white-space: nowrap;
        }
        .search-btn:hover {
          transform: scale(1.03);
          box-shadow: 0 6px 24px rgba(20,45,94,0.3);
        }
        .hero-stats {
          display: flex;
          justify-content: center;
          gap: 48px;
          margin-top: 56px;
          padding-top: 40px;
          border-top: 1px solid rgba(255,255,255,0.06);
        }
        .hero-stat {
          text-align: center;
        }
        .hero-stat-num {
          font-family: var(--font-display);
          font-size: 32px;
          font-weight: 600;
          color: var(--gold-400);
        }
        .hero-stat-label {
          font-size: 13px;
          color: rgba(255,255,255,0.4);
          margin-top: 4px;
          font-weight: 500;
          letter-spacing: 0.04em;
        }

        /* ─── SECTION SHARED ─── */
        .section {
          padding: 100px 48px;
        }
        .section-header {
          text-align: center;
          max-width: 640px;
          margin: 0 auto 60px;
        }
        .section-label {
          font-size: 12.5px;
          font-weight: 700;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          color: var(--gold-500);
          margin-bottom: 14px;
        }
        .section-title {
          font-family: var(--font-display);
          font-size: clamp(30px, 4vw, 44px);
          font-weight: 600;
          color: var(--text-primary);
          line-height: 1.15;
          letter-spacing: -0.02em;
          margin-bottom: 16px;
        }
        .section-desc {
          font-size: 17px;
          color: var(--text-secondary);
          line-height: 1.65;
        }

        /* ─── LISTINGS GRID ─── */
        .listings-section {
          background: var(--surface);
        }
        .search-result-info {
          text-align: center;
          margin-bottom: 32px;
          color: var(--text-secondary);
          font-size: 15px;
        }
        .search-result-info strong {
          color: var(--royal-600);
        }
        .properties-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(360px, 1fr));
          gap: 28px;
          max-width: 1240px;
          margin: 0 auto;
        }
        .property-card {
          background: var(--card-bg);
          border-radius: var(--radius-lg);
          overflow: hidden;
          border: 1px solid var(--border);
          transition: all 0.35s cubic-bezier(0.16, 1, 0.3, 1);
          animation: cardIn 0.5s cubic-bezier(0.16, 1, 0.3, 1) both;
        }
        @keyframes cardIn {
          from { opacity: 0; transform: translateY(24px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .property-card:hover {
          transform: translateY(-6px);
          box-shadow: var(--shadow-xl);
          border-color: rgba(212, 160, 23, 0.2);
        }
        .property-image-wrap {
          position: relative;
          height: 240px;
          overflow: hidden;
        }
        .property-image-wrap img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.6s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.5s;
        }
        .property-card:hover .property-image-wrap img {
          transform: scale(1.05);
        }
        .image-skeleton {
          position: absolute;
          inset: 0;
          background: linear-gradient(110deg, #e8ecf0 8%, #f3f5f7 18%, #e8ecf0 33%);
          background-size: 200% 100%;
          animation: shimmer 1.5s linear infinite;
        }
        @keyframes shimmer {
          to { background-position-x: -200%; }
        }
        .image-fallback {
          position: absolute;
          inset: 0;
          background: linear-gradient(135deg, var(--royal-800) 0%, var(--royal-600) 50%, var(--royal-700) 100%);
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 8px;
          color: rgba(255,255,255,0.25);
        }
        .image-fallback span {
          font-size: 13px;
          font-weight: 600;
          letter-spacing: 0.06em;
          text-transform: uppercase;
          color: rgba(255,255,255,0.2);
        }
        .property-type-badge {
          position: absolute;
          top: 14px;
          left: 14px;
          background: rgba(10, 22, 40, 0.8);
          backdrop-filter: blur(8px);
          color: white;
          padding: 5px 14px;
          border-radius: 50px;
          font-size: 12px;
          font-weight: 600;
          letter-spacing: 0.04em;
        }
        .featured-badge {
          position: absolute;
          top: 14px;
          right: 14px;
          background: var(--gold-gradient);
          color: var(--royal-900);
          padding: 5px 14px;
          border-radius: 50px;
          font-size: 11.5px;
          font-weight: 700;
          letter-spacing: 0.04em;
          text-transform: uppercase;
        }
        .property-price-overlay {
          position: absolute;
          bottom: 0;
          left: 0;
          right: 0;
          padding: 40px 18px 14px;
          background: linear-gradient(to top, rgba(10,22,40,0.85) 0%, transparent 100%);
          color: white;
          font-family: var(--font-display);
          font-size: 26px;
          font-weight: 600;
        }
        .property-info {
          padding: 20px 22px 22px;
        }
        .property-address {
          font-family: var(--font-display);
          font-size: 18px;
          font-weight: 600;
          color: var(--text-primary);
          margin-bottom: 3px;
        }
        .property-city {
          font-size: 13.5px;
          color: var(--text-muted);
          font-weight: 500;
          margin-bottom: 10px;
        }
        .property-desc {
          font-size: 14px;
          color: var(--text-secondary);
          line-height: 1.55;
          margin-bottom: 16px;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
        .property-meta {
          display: flex;
          gap: 18px;
          padding-bottom: 16px;
          border-bottom: 1px solid var(--border);
          margin-bottom: 16px;
        }
        .property-meta span {
          display: flex;
          align-items: center;
          gap: 6px;
          font-size: 13px;
          font-weight: 500;
          color: var(--text-secondary);
        }
        .property-meta svg {
          color: var(--royal-400);
        }
        .property-cta {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          background: none;
          border: none;
          color: var(--royal-500);
          font-family: var(--font-body);
          font-size: 14px;
          font-weight: 600;
          cursor: pointer;
          padding: 0;
          transition: all 0.2s;
        }
        .property-cta:hover {
          color: var(--gold-600);
          gap: 12px;
        }

        /* ─── SERVICES ─── */
        .services-section {
          background: var(--royal-900);
          position: relative;
          overflow: hidden;
        }
        .services-section::before {
          content: '';
          position: absolute;
          inset: 0;
          background: 
            radial-gradient(ellipse at 0% 0%, rgba(26, 58, 122, 0.4) 0%, transparent 50%),
            radial-gradient(ellipse at 100% 100%, rgba(212, 160, 23, 0.06) 0%, transparent 50%);
        }
        .services-section .section-label { color: var(--gold-400); }
        .services-section .section-title { color: #fff; }
        .services-section .section-desc { color: rgba(255,255,255,0.5); }
        .services-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 28px;
          max-width: 1100px;
          margin: 0 auto;
          position: relative;
          z-index: 1;
        }
        .service-card {
          background: rgba(255,255,255,0.04);
          border: 1px solid rgba(255,255,255,0.08);
          border-radius: var(--radius-lg);
          padding: 40px 32px;
          backdrop-filter: blur(12px);
          transition: all 0.35s;
        }
        .service-card:hover {
          background: rgba(255,255,255,0.07);
          border-color: rgba(212, 160, 23, 0.3);
          transform: translateY(-4px);
          box-shadow: 0 20px 50px rgba(0,0,0,0.3);
        }
        .service-icon {
          width: 60px;
          height: 60px;
          border-radius: 16px;
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 24px;
          background: rgba(212, 160, 23, 0.1);
          border: 1px solid rgba(212, 160, 23, 0.2);
          color: var(--gold-400);
        }
        .service-card h3 {
          font-family: var(--font-display);
          font-size: 22px;
          font-weight: 600;
          color: #fff;
          margin-bottom: 12px;
        }
        .service-card p {
          font-size: 15px;
          color: rgba(255,255,255,0.45);
          line-height: 1.65;
          margin-bottom: 24px;
        }
        .service-card ul {
          list-style: none;
          padding: 0;
        }
        .service-card li {
          font-size: 14px;
          color: rgba(255,255,255,0.55);
          padding: 6px 0;
          display: flex;
          align-items: center;
          gap: 10px;
        }
        .service-card li::before {
          content: '';
          width: 5px;
          height: 5px;
          border-radius: 50%;
          background: var(--gold-400);
          flex-shrink: 0;
        }
        .service-link {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          color: var(--gold-400);
          font-size: 14px;
          font-weight: 600;
          text-decoration: none;
          margin-top: 20px;
          cursor: pointer;
          transition: gap 0.2s;
        }
        .service-link:hover { gap: 10px; }

        /* ─── ESTIMATE ─── */
        .estimate-section {
          background: linear-gradient(180deg, var(--surface) 0%, #fff 100%);
        }
        .estimate-card {
          max-width: 680px;
          margin: 0 auto;
          background: var(--card-bg);
          border-radius: var(--radius-xl);
          padding: 48px;
          box-shadow: var(--shadow-lg);
          border: 1px solid var(--border);
          text-align: center;
        }
        .estimate-input-group {
          display: flex;
          gap: 12px;
          margin-top: 28px;
        }
        .estimate-input {
          flex: 1;
          padding: 16px 22px;
          border: 2px solid var(--border);
          border-radius: var(--radius-md);
          font-family: var(--font-body);
          font-size: 15px;
          outline: none;
          transition: border-color 0.2s;
          background: var(--surface);
        }
        .estimate-input:focus {
          border-color: var(--royal-400);
        }
        .estimate-btn {
          background: var(--royal-gradient);
          color: white;
          border: none;
          padding: 16px 32px;
          border-radius: var(--radius-md);
          font-family: var(--font-body);
          font-size: 15px;
          font-weight: 600;
          cursor: pointer;
          white-space: nowrap;
          transition: all 0.25s;
        }
        .estimate-btn:hover {
          transform: translateY(-1px);
          box-shadow: 0 6px 20px rgba(20, 45, 94, 0.3);
        }
        .estimate-result {
          margin-top: 36px;
          padding: 32px;
          background: var(--royal-50);
          border-radius: var(--radius-md);
          border: 1px solid var(--royal-100);
          animation: cardIn 0.4s ease both;
        }
        .estimate-result-label {
          font-size: 13px;
          color: var(--text-muted);
          text-transform: uppercase;
          letter-spacing: 0.1em;
          font-weight: 600;
          margin-bottom: 8px;
        }
        .estimate-result-value {
          font-family: var(--font-display);
          font-size: 40px;
          font-weight: 700;
          color: var(--royal-700);
        }
        .estimate-result-range {
          display: flex;
          justify-content: center;
          gap: 40px;
          margin-top: 16px;
        }
        .estimate-result-range span {
          font-size: 14px;
          color: var(--text-secondary);
          font-weight: 500;
        }
        .estimate-result-range strong {
          color: var(--royal-600);
        }

        /* ─── TESTIMONIALS ─── */
        .testimonials-section {
          background: #fff;
        }
        .testimonials-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 28px;
          max-width: 1100px;
          margin: 0 auto;
        }
        .testimonial-card {
          background: var(--surface);
          border-radius: var(--radius-lg);
          padding: 36px 28px;
          border: 1px solid var(--border);
          transition: all 0.3s;
        }
        .testimonial-card:hover {
          transform: translateY(-3px);
          box-shadow: var(--shadow-md);
        }
        .testimonial-stars {
          display: flex;
          gap: 3px;
          color: var(--gold-500);
          margin-bottom: 16px;
        }
        .testimonial-quote-icon {
          margin-bottom: 8px;
        }
        .testimonial-text {
          font-size: 15.5px;
          line-height: 1.65;
          color: var(--text-secondary);
          margin-bottom: 20px;
          font-style: italic;
        }
        .testimonial-author {
          font-weight: 600;
          font-size: 15px;
          color: var(--text-primary);
        }
        .testimonial-location {
          font-size: 13px;
          color: var(--text-muted);
          margin-top: 2px;
        }

        /* ─── CTA BANNER ─── */
        .cta-banner {
          background: var(--royal-gradient);
          padding: 80px 48px;
          text-align: center;
          position: relative;
          overflow: hidden;
        }
        .cta-banner::before {
          content: '';
          position: absolute;
          inset: 0;
          background: 
            radial-gradient(circle at 30% 50%, rgba(212, 160, 23, 0.08) 0%, transparent 60%),
            radial-gradient(circle at 70% 50%, rgba(255,255,255,0.03) 0%, transparent 50%);
        }
        .cta-banner h2 {
          font-family: var(--font-display);
          font-size: clamp(28px, 4vw, 40px);
          color: white;
          font-weight: 600;
          margin-bottom: 16px;
          position: relative;
          z-index: 1;
        }
        .cta-banner p {
          font-size: 17px;
          color: rgba(255,255,255,0.55);
          margin-bottom: 32px;
          position: relative;
          z-index: 1;
        }
        .cta-banner-btn {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          background: var(--gold-gradient);
          color: var(--royal-900);
          border: none;
          padding: 16px 40px;
          border-radius: 60px;
          font-family: var(--font-body);
          font-size: 16px;
          font-weight: 700;
          cursor: pointer;
          position: relative;
          z-index: 1;
          transition: all 0.25s;
        }
        .cta-banner-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 30px rgba(212, 160, 23, 0.35);
        }

        /* ─── FOOTER ─── */
        .footer {
          background: var(--royal-900);
          padding: 64px 48px 32px;
          color: rgba(255,255,255,0.4);
        }
        .footer-grid {
          display: grid;
          grid-template-columns: 2fr 1fr 1fr 1fr;
          gap: 48px;
          max-width: 1200px;
          margin: 0 auto 48px;
        }
        .footer-brand p {
          font-size: 14px;
          line-height: 1.6;
          margin-top: 14px;
          max-width: 300px;
        }
        .footer-col h4 {
          color: rgba(255,255,255,0.8);
          font-size: 14px;
          font-weight: 600;
          letter-spacing: 0.06em;
          text-transform: uppercase;
          margin-bottom: 18px;
        }
        .footer-col a {
          display: block;
          color: rgba(255,255,255,0.4);
          text-decoration: none;
          font-size: 14px;
          padding: 5px 0;
          transition: color 0.2s;
        }
        .footer-col a:hover { color: var(--gold-400); }
        .footer-bottom {
          max-width: 1200px;
          margin: 0 auto;
          padding-top: 32px;
          border-top: 1px solid rgba(255,255,255,0.06);
          display: flex;
          justify-content: space-between;
          align-items: center;
          font-size: 13px;
        }
        .footer-bottom-links {
          display: flex;
          gap: 24px;
        }
        .footer-bottom-links a {
          color: rgba(255,255,255,0.35);
          text-decoration: none;
          transition: color 0.2s;
        }
        .footer-bottom-links a:hover { color: var(--gold-400); }

        .no-results {
          text-align: center;
          padding: 60px 20px;
          color: var(--text-secondary);
        }
        .no-results h3 {
          font-family: var(--font-display);
          font-size: 24px;
          color: var(--text-primary);
          margin-bottom: 8px;
        }
        .clear-search {
          background: none;
          border: 1px solid var(--royal-400);
          color: var(--royal-500);
          padding: 10px 24px;
          border-radius: 50px;
          font-family: var(--font-body);
          font-size: 14px;
          font-weight: 600;
          cursor: pointer;
          margin-top: 16px;
          transition: all 0.2s;
        }
        .clear-search:hover {
          background: var(--royal-500);
          color: white;
        }

        /* ─── CONTACT SECTION ─── */
        .contact-section {
          background: var(--surface);
          position: relative;
          overflow: hidden;
        }
        .contact-section::before {
          content: '';
          position: absolute;
          top: -200px;
          right: -200px;
          width: 500px;
          height: 500px;
          border-radius: 50%;
          background: radial-gradient(circle, rgba(26, 58, 122, 0.04) 0%, transparent 70%);
          pointer-events: none;
        }
        .contact-section::after {
          content: '';
          position: absolute;
          bottom: -150px;
          left: -150px;
          width: 400px;
          height: 400px;
          border-radius: 50%;
          background: radial-gradient(circle, rgba(212, 160, 23, 0.04) 0%, transparent 70%);
          pointer-events: none;
        }
        .contact-wrapper {
          display: grid;
          grid-template-columns: 1fr 1.4fr;
          gap: 48px;
          max-width: 1100px;
          margin: 0 auto;
          position: relative;
          z-index: 1;
        }
        .contact-info-panel {
          background: var(--royal-900);
          border-radius: var(--radius-xl);
          padding: 48px 36px;
          position: relative;
          overflow: hidden;
        }
        .contact-info-panel::before {
          content: '';
          position: absolute;
          inset: 0;
          background: 
            radial-gradient(ellipse at 20% 80%, rgba(26, 58, 122, 0.5) 0%, transparent 60%),
            radial-gradient(ellipse at 80% 20%, rgba(212, 160, 23, 0.08) 0%, transparent 50%);
          pointer-events: none;
        }
        .contact-info-panel > * {
          position: relative;
          z-index: 1;
        }
        .contact-info-badge {
          display: inline-flex;
          align-items: center;
          gap: 7px;
          background: rgba(212, 160, 23, 0.12);
          border: 1px solid rgba(212, 160, 23, 0.25);
          color: var(--gold-300);
          padding: 6px 16px;
          border-radius: 50px;
          font-size: 11.5px;
          font-weight: 700;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          margin-bottom: 24px;
        }
        .contact-info-panel h3 {
          font-family: var(--font-display);
          font-size: 28px;
          font-weight: 600;
          color: #fff;
          line-height: 1.2;
          margin-bottom: 12px;
        }
        .contact-info-panel > p {
          font-size: 15px;
          color: rgba(255,255,255,0.45);
          line-height: 1.6;
          margin-bottom: 36px;
        }
        .contact-info-items {
          display: flex;
          flex-direction: column;
          gap: 24px;
          margin-bottom: 40px;
        }
        .contact-info-item {
          display: flex;
          align-items: flex-start;
          gap: 16px;
        }
        .contact-info-icon {
          width: 44px;
          height: 44px;
          border-radius: 12px;
          background: rgba(255,255,255,0.06);
          border: 1px solid rgba(255,255,255,0.08);
          display: flex;
          align-items: center;
          justify-content: center;
          color: var(--gold-400);
          flex-shrink: 0;
        }
        .contact-info-item-text strong {
          display: block;
          color: rgba(255,255,255,0.85);
          font-size: 14px;
          font-weight: 600;
          margin-bottom: 2px;
        }
        .contact-info-item-text span {
          font-size: 13.5px;
          color: rgba(255,255,255,0.4);
        }
        .contact-divider {
          height: 1px;
          background: rgba(255,255,255,0.06);
          margin: 0;
          border: none;
        }
        .contact-agents-label {
          font-size: 12px;
          color: rgba(255,255,255,0.35);
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 0.1em;
          margin-bottom: 14px;
        }
        .contact-agents {
          display: flex;
          align-items: center;
          gap: -6px;
        }
        .contact-agent-avatar {
          width: 40px;
          height: 40px;
          border-radius: 50%;
          border: 2px solid var(--royal-900);
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 13px;
          font-weight: 700;
          color: white;
          margin-right: -8px;
        }
        .contact-agent-avatar:nth-child(1) { background: var(--royal-600); z-index: 4; }
        .contact-agent-avatar:nth-child(2) { background: var(--gold-600); z-index: 3; }
        .contact-agent-avatar:nth-child(3) { background: var(--royal-400); z-index: 2; }
        .contact-agents-text {
          font-size: 13px;
          color: rgba(255,255,255,0.5);
          margin-left: 18px;
        }
        .contact-agents-text strong {
          color: var(--gold-400);
        }

        /* ─── FORM PANEL ─── */
        .contact-form-panel {
          background: var(--card-bg);
          border-radius: var(--radius-xl);
          padding: 44px 40px;
          border: 1px solid var(--border);
          box-shadow: var(--shadow-lg);
        }
        .contact-form-panel h3 {
          font-family: var(--font-display);
          font-size: 24px;
          font-weight: 600;
          color: var(--text-primary);
          margin-bottom: 6px;
        }
        .contact-form-panel > p {
          font-size: 14.5px;
          color: var(--text-muted);
          margin-bottom: 32px;
        }
        .form-row {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 16px;
          margin-bottom: 16px;
        }
        .form-row.full {
          grid-template-columns: 1fr;
        }
        .form-group {
          display: flex;
          flex-direction: column;
          gap: 7px;
        }
        .form-label {
          font-size: 13px;
          font-weight: 600;
          color: var(--text-primary);
          letter-spacing: 0.02em;
        }
        .form-label .required {
          color: #e53e3e;
          margin-left: 2px;
        }
        .form-input,
        .form-select,
        .form-textarea {
          padding: 13px 16px;
          border: 1.5px solid var(--border);
          border-radius: var(--radius-sm);
          font-family: var(--font-body);
          font-size: 14.5px;
          color: var(--text-primary);
          background: var(--surface);
          outline: none;
          transition: all 0.2s;
          width: 100%;
        }
        .form-input:focus,
        .form-select:focus,
        .form-textarea:focus {
          border-color: var(--royal-400);
          box-shadow: 0 0 0 3px rgba(42, 107, 196, 0.1);
          background: #fff;
        }
        .form-input::placeholder,
        .form-textarea::placeholder {
          color: var(--text-muted);
        }
        .form-select {
          cursor: pointer;
          appearance: none;
          background-image: url("data:image/svg+xml,%3Csvg width='12' height='8' viewBox='0 0 12 8' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M1 1.5L6 6.5L11 1.5' stroke='%238896ab' stroke-width='1.8' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E");
          background-repeat: no-repeat;
          background-position: right 16px center;
          padding-right: 40px;
        }
        .form-textarea {
          min-height: 110px;
          resize: vertical;
          line-height: 1.5;
        }
        .form-interest-chips {
          display: flex;
          gap: 10px;
          flex-wrap: wrap;
        }
        .interest-chip {
          padding: 9px 20px;
          border-radius: 50px;
          border: 1.5px solid var(--border);
          background: var(--surface);
          font-family: var(--font-body);
          font-size: 13.5px;
          font-weight: 500;
          color: var(--text-secondary);
          cursor: pointer;
          transition: all 0.2s;
        }
        .interest-chip:hover {
          border-color: var(--royal-300);
          color: var(--royal-500);
        }
        .interest-chip.active {
          background: var(--royal-50);
          border-color: var(--royal-400);
          color: var(--royal-600);
          font-weight: 600;
        }
        .form-submit-btn {
          width: 100%;
          padding: 16px;
          background: var(--royal-gradient);
          color: white;
          border: none;
          border-radius: var(--radius-md);
          font-family: var(--font-body);
          font-size: 16px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.25s;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 10px;
          margin-top: 8px;
          position: relative;
          overflow: hidden;
        }
        .form-submit-btn:hover:not(:disabled) {
          transform: translateY(-1px);
          box-shadow: 0 8px 24px rgba(20, 45, 94, 0.3);
        }
        .form-submit-btn:disabled {
          opacity: 0.7;
          cursor: not-allowed;
        }
        .form-submit-btn .spinner {
          width: 20px;
          height: 20px;
          border: 2.5px solid rgba(255,255,255,0.3);
          border-top-color: white;
          border-radius: 50%;
          animation: spin 0.7s linear infinite;
        }
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
        .form-disclaimer {
          font-size: 12px;
          color: var(--text-muted);
          text-align: center;
          margin-top: 16px;
          line-height: 1.5;
        }
        .form-disclaimer a {
          color: var(--royal-400);
          text-decoration: none;
        }

        /* ─── SUCCESS STATE ─── */
        .contact-success {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          text-align: center;
          padding: 60px 20px;
          animation: cardIn 0.5s ease both;
        }
        .success-icon {
          color: var(--gold-500);
          margin-bottom: 20px;
        }
        .success-icon svg {
          filter: drop-shadow(0 4px 12px rgba(212, 160, 23, 0.25));
        }
        .contact-success h3 {
          font-family: var(--font-display);
          font-size: 26px;
          font-weight: 600;
          color: var(--text-primary);
          margin-bottom: 8px;
        }
        .contact-success p {
          font-size: 15px;
          color: var(--text-secondary);
          line-height: 1.6;
          max-width: 380px;
        }
        .success-detail {
          margin-top: 28px;
          padding: 20px 28px;
          background: var(--gold-50);
          border: 1px solid var(--gold-100);
          border-radius: var(--radius-md);
          display: flex;
          align-items: center;
          gap: 12px;
          font-size: 14px;
          color: var(--gold-600);
          font-weight: 500;
        }

        /* ─── RESPONSIVE ─── */
        @media (max-width: 1024px) {
          .services-grid, .testimonials-grid { grid-template-columns: 1fr; max-width: 520px; }
          .footer-grid { grid-template-columns: 1fr 1fr; }
          .contact-wrapper { grid-template-columns: 1fr; }
        }
        @media (max-width: 768px) {
          .section { padding: 64px 20px; }
          .nav { padding: 0 20px; }
          .nav-links { display: none; }
          .hero-stats { gap: 28px; flex-wrap: wrap; }
          .properties-grid { grid-template-columns: 1fr; }
          .estimate-input-group { flex-direction: column; }
          .estimate-card { padding: 32px 20px; }
          .footer-grid { grid-template-columns: 1fr; gap: 28px; }
          .footer-bottom { flex-direction: column; gap: 12px; text-align: center; }
          .cta-banner { padding: 60px 20px; }
          .contact-form-panel { padding: 28px 20px; }
          .contact-info-panel { padding: 32px 24px; }
          .form-row { grid-template-columns: 1fr; }
          .form-interest-chips { gap: 8px; }
          .search-container { flex-wrap: wrap; border-radius: 20px; padding: 8px; gap: 8px; }
          .search-tabs { width: 100%; justify-content: center; padding-left: 0; }
          .search-divider { display: none; }
          .search-box { width: 100%; }
          .search-btn { padding: 12px 20px; font-size: 14px; }
        }
      `}</style>

      {/* NAV */}
      <nav className={`nav ${scrollY > 50 ? "scrolled" : ""}`}>
        <a href="#" className="nav-logo">
          <div className="nav-logo-icon">C</div>
          <span className="nav-logo-text">CMRealty</span>
        </a>
        <ul className="nav-links">
          <li>
            <a href="#listings">Listings</a>
          </li>
          <li>
            <a href="#services">Services</a>
          </li>
          <li>
            <a href="#estimate">Estimate</a>
          </li>
          <li>
            <a href="#testimonials">Reviews</a>
          </li>
          <li>
            <a href="#contact" className="nav-cta">
              Contact Us
            </a>
          </li>
        </ul>
      </nav>

      {/* HERO */}
      <section className="hero">
        <div
          className="hero-bg-image"
          style={{ transform: `scale(1.05) translateY(${scrollY * 0.15}px)` }}
        />
        <div className="hero-bg" />
        <div className="hero-pattern" />
        <div
          className="hero-glow"
          style={{
            transform: `translate(calc(-50% + ${scrollY * 0.02}px), calc(-50% + ${scrollY * -0.03}px))`,
          }}
        />
        <div className="hero-content">
          <div className="search-container">
            <div className="search-tabs">
              {["buy", "sell", "estimate"].map((tab) => (
                <button
                  key={tab}
                  className={`search-tab ${activeTab === tab ? "active" : ""}`}
                  onClick={() => setActiveTab(tab)}
                >
                  {tab === "buy" ? "Buy" : tab === "sell" ? "Sell" : "Estimate"}
                </button>
              ))}
            </div>
            <div className="search-divider" />
            <div className="search-box">
              <input
                type="text"
                placeholder="City, ZIP, or address..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSearch()}
              />
              <button className="search-btn" onClick={handleSearch}>
                <SearchIcon />
                Search
              </button>
            </div>
          </div>

          <div className="hero-stats">
            <div className="hero-stat">
              <div className="hero-stat-num">2,400+</div>
              <div className="hero-stat-label">Properties Listed</div>
            </div>
            <div className="hero-stat">
              <div className="hero-stat-num">$2.1B</div>
              <div className="hero-stat-label">Total Sales Volume</div>
            </div>
            <div className="hero-stat">
              <div className="hero-stat-num">98%</div>
              <div className="hero-stat-label">Client Satisfaction</div>
            </div>
            <div className="hero-stat">
              <div className="hero-stat-num">15+</div>
              <div className="hero-stat-label">Years of Experience</div>
            </div>
          </div>
        </div>
      </section>

      {/* LISTINGS */}
      <section
        className="section listings-section"
        id="listings"
        ref={listingsRef}
      >
        <div className="section-header">
          <div className="section-label">Explore Properties</div>
          <h2 className="section-title">
            {hasSearched ? "Search Results" : "Featured Listings"}
          </h2>
          <p className="section-desc">
            {hasSearched
              ? `Showing results for "${searchQuery}"`
              : "Handpicked properties in the most desirable neighborhoods across Southern California."}
          </p>
        </div>

        {hasSearched && (
          <div className="search-result-info">
            Found <strong>{filteredProperties.length}</strong> propert
            {filteredProperties.length === 1 ? "y" : "ies"} matching your search
          </div>
        )}

        {filteredProperties.length > 0 ? (
          <div className="properties-grid">
            {filteredProperties.map((property, i) => (
              <PropertyCard key={property.id} property={property} index={i} />
            ))}
          </div>
        ) : (
          <div className="no-results">
            <h3>No properties found</h3>
            <p>Try searching for a different city or ZIP code.</p>
            <button
              className="clear-search"
              onClick={() => {
                setSearchQuery("");
                setFilteredProperties(SEED_PROPERTIES);
                setHasSearched(false);
              }}
            >
              View All Listings
            </button>
          </div>
        )}
      </section>

      {/* SERVICES */}
      <section className="section services-section" id="services">
        <div className="section-header">
          <div className="section-label">Our Services</div>
          <h2 className="section-title">Buying, Selling & Beyond</h2>
          <p className="section-desc">
            Full-service real estate expertise tailored to your goals — from
            first-time buyers to seasoned investors.
          </p>
        </div>
        <div className="services-grid">
          <div className="service-card">
            <div className="service-icon">
              <HomeIcon />
            </div>
            <h3>Buying</h3>
            <p>
              Navigate the market with confidence. We match you with properties
              that fit your vision and budget.
            </p>
            <ul>
              <li>Personalized property matching</li>
              <li>Market analysis & insights</li>
              <li>Negotiation & closing support</li>
              <li>First-time buyer guidance</li>
            </ul>
            <div className="service-link" role="button">
              Explore buying <ArrowRight />
            </div>
          </div>
          <div className="service-card">
            <div className="service-icon">
              <DollarIcon />
            </div>
            <h3>Selling</h3>
            <p>
              Maximize your home's value with our proven marketing strategy and
              expert pricing guidance.
            </p>
            <ul>
              <li>Professional staging & photography</li>
              <li>Strategic pricing analysis</li>
              <li>Multi-channel marketing</li>
              <li>Open house management</li>
            </ul>
            <div className="service-link" role="button">
              Start selling <ArrowRight />
            </div>
          </div>
          <div className="service-card">
            <div className="service-icon">
              <ChartIcon />
            </div>
            <h3>Property Estimates</h3>
            <p>
              Get an accurate home valuation powered by real-time data and deep
              local expertise.
            </p>
            <ul>
              <li>Instant AI-powered estimates</li>
              <li>Comparable sales analysis</li>
              <li>Neighborhood trend reports</li>
              <li>Investment ROI projections</li>
            </ul>
            <div className="service-link" role="button">
              Get estimate <ArrowRight />
            </div>
          </div>
        </div>
      </section>

      {/* ESTIMATE */}
      <section className="section estimate-section" id="estimate">
        <div className="section-header">
          <div className="section-label">Home Valuation</div>
          <h2 className="section-title">What's Your Home Worth?</h2>
          <p className="section-desc">
            Get an instant estimate based on market data, recent sales, and
            neighborhood trends.
          </p>
        </div>
        <div className="estimate-card">
          <div className="estimate-input-group">
            <input
              className="estimate-input"
              type="text"
              placeholder="Enter your property address..."
              value={estimateAddress}
              onChange={(e) => setEstimateAddress(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleEstimate()}
            />
            <button className="estimate-btn" onClick={handleEstimate}>
              Get Estimate
            </button>
          </div>
          {estimateResult && (
            <div className="estimate-result">
              <div className="estimate-result-label">
                Estimated Market Value
              </div>
              <div className="estimate-result-value">
                {formatPrice(estimateResult.mid)}
              </div>
              <div className="estimate-result-range">
                <span>
                  Low: <strong>{formatPrice(estimateResult.low)}</strong>
                </span>
                <span>
                  High: <strong>{formatPrice(estimateResult.high)}</strong>
                </span>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="section testimonials-section" id="testimonials">
        <div className="section-header">
          <div className="section-label">Client Stories</div>
          <h2 className="section-title">Trusted by Homeowners</h2>
          <p className="section-desc">
            Hear from families who found their perfect home with Crestview.
          </p>
        </div>
        <div className="testimonials-grid">
          {TESTIMONIALS.map((t, i) => (
            <div className="testimonial-card" key={i}>
              <div className="testimonial-stars">
                {[...Array(5)].map((_, j) => (
                  <StarIcon key={j} />
                ))}
              </div>
              <div className="testimonial-quote-icon">
                <QuoteIcon />
              </div>
              <p className="testimonial-text">"{t.text}"</p>
              <div className="testimonial-author">{t.name}</div>
              <div className="testimonial-location">{t.location}</div>
            </div>
          ))}
        </div>
      </section>

      {/* CONTACT */}
      <section className="section contact-section" id="contact">
        <div className="section-header">
          <div className="section-label">Get In Touch</div>
          <h2 className="section-title">Let's Start a Conversation</h2>
          <p className="section-desc">
            Whether you're ready to buy, thinking about selling, or just
            exploring — our team is here to help.
          </p>
        </div>
        <div className="contact-wrapper">
          {/* Info Panel */}
          <div className="contact-info-panel">
            <div className="contact-info-badge">Available Now</div>
            <h3>We'd love to hear from you</h3>
            <p>
              Reach out and one of our experienced agents will respond within 2
              hours during business hours.
            </p>

            <div className="contact-info-items">
              <div className="contact-info-item">
                <div className="contact-info-icon">
                  <PhoneIcon />
                </div>
                <div className="contact-info-item-text">
                  <strong>(310) 555-0182</strong>
                  <span>Mon–Sat, 8am–8pm PT</span>
                </div>
              </div>
              <div className="contact-info-item">
                <div className="contact-info-icon">
                  <MailIcon />
                </div>
                <div className="contact-info-item-text">
                  <strong>hello@cmrealty.com</strong>
                  <span>We reply within 2 hours</span>
                </div>
              </div>
              <div className="contact-info-item">
                <div className="contact-info-icon">
                  <MapPinIcon />
                </div>
                <div className="contact-info-item-text">
                  <strong>9440 Wilshire Blvd, Suite 200</strong>
                  <span>Beverly Hills, CA 90212</span>
                </div>
              </div>
              <div className="contact-info-item">
                <div className="contact-info-icon">
                  <ClockIcon />
                </div>
                <div className="contact-info-item-text">
                  <strong>Office Hours</strong>
                  <span>Mon–Fri 8am–7pm, Sat 9am–5pm</span>
                </div>
              </div>
            </div>

            <hr className="contact-divider" />

            <div style={{ marginTop: 24 }}>
              <div className="contact-agents-label">Your dedicated agents</div>
              <div className="contact-agents">
                <img
                  className="contact-agent-avatar"
                  src="https://images.unsplash.com/photo-1560250097-0b93528c311a?w=80&h=80&fit=crop&crop=face"
                  alt="Agent JR"
                />
                <img
                  className="contact-agent-avatar"
                  src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=80&h=80&fit=crop&crop=face"
                  alt="Agent KL"
                />
                <img
                  className="contact-agent-avatar"
                  src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=80&h=80&fit=crop&crop=face"
                  alt="Agent MT"
                />
                <span className="contact-agents-text">
                  <strong>12 agents</strong> ready to help
                </span>
              </div>
            </div>
          </div>

          {/* Form Panel */}
          <div className="contact-form-panel">
            {contactSubmitted ? (
              <div className="contact-success">
                <div className="success-icon">
                  <CheckCircleIcon />
                </div>
                <h3>Thank You!</h3>
                <p>
                  We've received your inquiry and a Crestview agent will be in
                  touch shortly. We typically respond within 2 hours.
                </p>
                <div className="success-detail">
                  <MailIcon />
                  Confirmation sent to {contactForm.email}
                </div>
              </div>
            ) : (
              <>
                <h3>Send Us a Message</h3>
                <p>
                  Fill out the form below and we'll connect you with the right
                  agent.
                </p>

                <div className="form-group" style={{ marginBottom: 20 }}>
                  <span className="form-label">I'm interested in</span>
                  <div className="form-interest-chips">
                    {[
                      "buying",
                      "selling",
                      "renting",
                      "investing",
                      "estimate",
                    ].map((opt) => (
                      <button
                        key={opt}
                        className={`interest-chip ${contactForm.interest === opt ? "active" : ""}`}
                        onClick={() => updateContact("interest", opt)}
                      >
                        {opt.charAt(0).toUpperCase() + opt.slice(1)}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label className="form-label">
                      Full Name <span className="required">*</span>
                    </label>
                    <input
                      className="form-input"
                      type="text"
                      placeholder="John Smith"
                      value={contactForm.name}
                      onChange={(e) => updateContact("name", e.target.value)}
                    />
                  </div>
                  <div className="form-group">
                    <label className="form-label">
                      Email Address <span className="required">*</span>
                    </label>
                    <input
                      className="form-input"
                      type="email"
                      placeholder="john@example.com"
                      value={contactForm.email}
                      onChange={(e) => updateContact("email", e.target.value)}
                    />
                  </div>
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label className="form-label">Phone Number</label>
                    <input
                      className="form-input"
                      type="tel"
                      placeholder="(310) 555-0100"
                      value={contactForm.phone}
                      onChange={(e) => updateContact("phone", e.target.value)}
                    />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Budget Range</label>
                    <select
                      className="form-select"
                      value={contactForm.budget}
                      onChange={(e) => updateContact("budget", e.target.value)}
                    >
                      <option value="">Select a range</option>
                      <option value="under-1m">Under $1M</option>
                      <option value="1m-3m">$1M – $3M</option>
                      <option value="3m-5m">$3M – $5M</option>
                      <option value="5m-10m">$5M – $10M</option>
                      <option value="10m-plus">$10M+</option>
                    </select>
                  </div>
                </div>

                <div className="form-row full">
                  <div className="form-group">
                    <label className="form-label">Message</label>
                    <textarea
                      className="form-textarea"
                      placeholder="Tell us about what you're looking for — preferred neighborhoods, property type, timeline, or any questions you have..."
                      value={contactForm.message}
                      onChange={(e) => updateContact("message", e.target.value)}
                    />
                  </div>
                </div>

                <button
                  className="form-submit-btn"
                  onClick={handleContactSubmit}
                  disabled={
                    contactSubmitting ||
                    !contactForm.name.trim() ||
                    !contactForm.email.trim()
                  }
                >
                  {contactSubmitting ? (
                    <>
                      <div className="spinner" />
                      Sending...
                    </>
                  ) : (
                    <>
                      Send Message <ArrowRight />
                    </>
                  )}
                </button>

                <p className="form-disclaimer">
                  By submitting, you agree to our <a href="#">Privacy Policy</a>{" "}
                  and consent to being contacted about real estate services.
                </p>
              </>
            )}
          </div>
        </div>
      </section>

      {/* CTA BANNER */}
      <section className="cta-banner">
        <h2>Ready to Make Your Move?</h2>
        <p>
          Connect with our team for a personalized consultation — no obligation,
          just expertise.
        </p>
        <button className="cta-banner-btn">
          Schedule a Consultation <ArrowRight />
        </button>
      </section>

      {/* FOOTER */}
      <footer className="footer">
        <div className="footer-grid">
          <div className="footer-brand">
            <a href="#" className="nav-logo" style={{ marginBottom: 0 }}>
              <div className="nav-logo-icon">C</div>
              <span className="nav-logo-text">Crestview</span>
            </a>
            <p>
              Premium real estate services across Southern California. Your
              trusted partner in finding the perfect property.
            </p>
          </div>
          <div className="footer-col">
            <h4>Explore</h4>
            <a href="#">Buy a Home</a>
            <a href="#">Sell a Home</a>
            <a href="#">Property Estimates</a>
            <a href="#">Market Reports</a>
          </div>
          <div className="footer-col">
            <h4>Company</h4>
            <a href="#">About Us</a>
            <a href="#">Our Team</a>
            <a href="#">Careers</a>
            <a href="#">Press</a>
          </div>
          <div className="footer-col">
            <h4>Support</h4>
            <a href="#">Contact</a>
            <a href="#">FAQ</a>
            <a href="#">Blog</a>
            <a href="#">Newsletter</a>
          </div>
        </div>
        <div className="footer-bottom">
          <span>&copy; 2026 Crestview Realty. All rights reserved.</span>
          <div className="footer-bottom-links">
            <a href="#">Privacy</a>
            <a href="#">Terms</a>
            <a href="#">Accessibility</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
