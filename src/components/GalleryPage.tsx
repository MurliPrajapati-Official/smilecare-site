import React, { useState } from 'react';

const GALLERY_HERO_IMG = 'https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260624_113640_ccf3cf97-d447-425b-a134-d7b09fc743fc.png&w=1280&q=85';
const GALLERY_1 = 'https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260624_114219_414dfe80-f15c-4e25-bf52-b13721f4bd88.png&w=1280&q=85';
const GALLERY_2 = 'https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260624_115253_c19ab167-8dd5-48b4-967d-b9f0d9d6e8fb.png&w=1280&q=85';
const GALLERY_3 = 'https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260624_115237_fc519057-6e87-4abf-999a-9610b8b085b4.png&w=1280&q=85';
const GALLERY_4 = 'https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260624_114355_752ba9e6-0942-4abb-9047-5d9bb16632e9.png&w=1280&q=85';

interface GalleryPageProps {
  onNavigate: (page: string) => void;
}

const cases = [
  {
    id: 1,
    title: 'Full Porcelain Veneers Makeover',
    category: 'Veneers',
    img: GALLERY_1,
    duration: '2 Weeks',
    details: 'Corrected chipped enamel, gaps, and severe discoloration with 10 custom ultra-thin porcelain veneers.'
  },
  {
    id: 2,
    title: 'Full Upper Arch Implant Restoration',
    category: 'Implants',
    img: GALLERY_2,
    duration: '3 Months',
    details: 'Restored missing upper teeth using 4 titanium implants and a fixed ceramic bridge.'
  },
  {
    id: 3,
    title: 'Laser Teeth Whitening Transformation',
    category: 'Whitening',
    img: GALLERY_3,
    duration: '60 Minutes',
    details: 'Brightened enamel by 8 shades using in-office laser technology and customized follow-up care.'
  },
  {
    id: 4,
    title: 'Clear Aligner Orthodontic Correction',
    category: 'Aligners',
    img: GALLERY_4,
    duration: '8 Months',
    details: 'Closed front diastema and corrected deep bite using invisible removable aligner trays.'
  }
];

const testimonials = [
  {
    name: 'Amanda R.',
    procedure: 'Porcelain Veneers',
    rating: 5,
    quote: 'Dr. Michael completely transformed my confidence. People compliment my smile everywhere I go now! The process was totally painless.'
  },
  {
    name: 'David K.',
    procedure: 'Full Dental Implants',
    rating: 5,
    quote: 'After years of struggling with missing teeth, Dr. Sarah restored my ability to eat and speak normally. Best decision of my life!'
  },
  {
    name: 'Elena M.',
    procedure: 'Laser Whitening',
    rating: 5,
    quote: 'Fast, professional, and zero tooth sensitivity! The office feels like a luxury spa rather than a dental clinic.'
  }
];

export default function GalleryPage({ onNavigate }: GalleryPageProps) {
  const [activeTab, setActiveTab] = useState('All');
  const categories = ['All', 'Veneers', 'Implants', 'Whitening', 'Aligners'];

  const filteredCases = activeTab === 'All' 
    ? cases 
    : cases.filter(c => c.category === activeTab);

  return (
    <div className="w-full min-h-screen bg-white pt-20 md:pt-24 pb-16">
      
      {/* Gallery Hero Header */}
      <div className="w-full px-3 sm:px-6 lg:px-8 mb-6 md:mb-10">
        <div 
          className="w-full min-h-[340px] sm:min-h-[420px] md:min-h-[480px] rounded-xl md:rounded-2xl overflow-hidden relative shadow-md p-5 sm:p-8 md:p-12 flex flex-col justify-between"
          style={{
            backgroundImage: `url(${GALLERY_HERO_IMG})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center'
          }}
        >
          <div className="z-10 bg-white/40 backdrop-blur-md px-3.5 py-1.5 rounded-full self-start text-xs md:text-sm font-bold text-black border border-white/50">
            Real Patient Results
          </div>

          <div className="z-10 my-4">
            <span className="block text-black text-xs md:text-sm font-bold mb-2 tracking-wide uppercase">
              Smile Makeover Showcase
            </span>
            <h1 className="text-black text-[clamp(2.25rem,6.5vw,7rem)] font-extrabold leading-[0.9] tracking-tight">
              Smile<br/>Transformations
            </h1>
          </div>

          <div className="z-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-t border-white/30 pt-4 mt-2">
            <p className="text-black text-xs md:text-sm font-medium max-w-md">
              Browse actual smile makeovers performed in our West New York clinic by our master cosmetic dentists.
            </p>
            <button 
              onClick={() => onNavigate('contact')}
              className="px-5 py-3 md:px-6 md:py-3.5 bg-white text-black text-xs md:text-sm font-bold rounded-full hover:scale-105 transition-all shadow-lg shrink-0 cursor-pointer"
            >
              Get Your Smile Makeover
            </button>
          </div>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="w-full px-3 sm:px-6 lg:px-8 mb-8">
        <div className="flex items-center gap-2 md:gap-3 p-2 bg-stone-100 rounded-xl md:rounded-2xl overflow-x-auto no-scrollbar">
          {categories.map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 sm:px-5 py-2.5 rounded-xl text-xs md:text-sm font-bold transition-all shrink-0 cursor-pointer ${
                activeTab === tab 
                  ? 'bg-black text-white shadow-md' 
                  : 'bg-transparent text-neutral-600 hover:text-black hover:bg-stone-200'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      {/* Gallery Cards Bento Grid */}
      <div className="w-full px-3 sm:px-6 lg:px-8 mb-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredCases.map(item => (
            <div 
              key={item.id}
              className="rounded-xl md:rounded-2xl bg-stone-50 border border-neutral-200 overflow-hidden shadow-md group flex flex-col justify-between"
            >
              <div className="h-56 sm:h-72 md:h-96 overflow-hidden relative">
                <img 
                  src={item.img} 
                  alt={item.title} 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" 
                />
                <span className="absolute top-3 left-3 sm:top-4 sm:left-4 bg-black/80 backdrop-blur-md text-white text-xs font-bold px-3 py-1.5 rounded-full">
                  {item.category}
                </span>
                <span className="absolute bottom-3 right-3 sm:bottom-4 sm:right-4 bg-white/90 backdrop-blur-md text-black text-xs font-bold px-3 py-1.5 rounded-full shadow">
                  Treatment: {item.duration}
                </span>
              </div>

              <div className="p-5 sm:p-6 md:p-8">
                <h3 className="text-xl sm:text-2xl font-bold text-black mb-2">{item.title}</h3>
                <p className="text-xs md:text-sm text-neutral-600 leading-relaxed mb-4">{item.details}</p>
                <button 
                  onClick={() => onNavigate('contact')}
                  className="w-full py-3 bg-black text-white text-xs font-bold rounded-xl hover:bg-neutral-800 transition-colors cursor-pointer"
                >
                  Request Similar Results
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Patient Testimonials */}
      <div className="w-full px-3 sm:px-6 lg:px-8">
        <div className="rounded-xl md:rounded-2xl bg-zinc-900 text-white p-6 sm:p-8 md:p-12">
          <div className="mb-8 text-center">
            <span className="text-xs font-bold text-amber-400 uppercase tracking-widest">Verified Patient Reviews</span>
            <h2 className="text-2xl sm:text-3xl md:text-5xl font-extrabold mt-2">What Our Patients Say</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
            {testimonials.map((t, idx) => (
              <div key={idx} className="p-5 sm:p-6 bg-zinc-800/80 rounded-xl border border-zinc-700/50 flex flex-col justify-between">
                <div>
                  <div className="flex text-amber-400 gap-1 mb-3">
                    {[...Array(t.rating)].map((_, i) => (
                      <span key={i}>★</span>
                    ))}
                  </div>
                  <p className="text-xs md:text-sm text-neutral-300 italic mb-4">"{t.quote}"</p>
                </div>
                <div>
                  <h4 className="text-sm font-bold text-white">{t.name}</h4>
                  <span className="text-xs text-neutral-400">{t.procedure}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

    </div>
  );
}
