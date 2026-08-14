import React, { useState } from 'react';

const SERVICES_HERO_IMG = 'https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260624_114219_414dfe80-f15c-4e25-bf52-b13721f4bd88.png&w=1280&q=85';
const TECH_IMG = 'https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260624_115253_c19ab167-8dd5-48b4-967d-b9f0d9d6e8fb.png&w=1280&q=85';

interface ServicesPageProps {
  onNavigate: (page: string) => void;
}

const detailedServices = [
  {
    id: 'veneers',
    title: 'Porcelain Veneers',
    tag: 'Cosmetic',
    desc: 'Ultra-thin, custom-crafted porcelain shells designed to cover the front surface of teeth to correct discoloration, gaps, and minor misalignments.',
    features: ['Custom Shade Matching', 'Stain Resistant Porcelain', 'Minimal Tooth Preparation'],
    duration: '2 Appointments',
    badge: 'Popular'
  },
  {
    id: 'implants',
    title: 'Implant Dentistry',
    tag: 'Restorative',
    desc: 'Permanent titanium tooth root replacements topped with realistic ceramic crowns to restore speech, chewing power, and facial structure.',
    features: ['3D CBCT Surgical Precision', 'Natural Bone Integration', 'Lifetime Durability'],
    duration: 'Multi-stage',
    badge: 'Advanced'
  },
  {
    id: 'whitening',
    title: 'Laser Teeth Whitening',
    tag: 'Cosmetic',
    desc: 'Professional in-office whitening treatment capable of brightening your smile up to 8 shades in less than 60 minutes with zero sensitivity.',
    features: ['Immediate Results', 'Enamel Safe Formula', 'Custom Take-Home Trays Included'],
    duration: '60 Mins',
    badge: 'Fast'
  },
  {
    id: 'ortho',
    title: 'Clear Aligners',
    tag: 'Orthodontics',
    desc: 'Discreet, removable clear aligners that gradually straighten teeth without metal brackets or wires.',
    features: ['Virtually Invisible', 'Removable for Meals', 'Digital 3D Simulation'],
    duration: '6 - 12 Months',
    badge: 'Trending'
  },
  {
    id: 'crowns',
    title: 'Same-Day Ceramic Crowns',
    tag: 'Restorative',
    desc: 'Custom milled ceramic dental crowns designed and placed in a single visit using digital CAD/CAM technology.',
    features: ['No Temporary Crowns', '100% Biocompatible', 'Digital Impression Scanning'],
    duration: 'Single Visit',
    badge: 'Same-Day'
  },
  {
    id: 'emergency',
    title: 'Emergency Dental Care',
    tag: 'Urgent Care',
    desc: 'Same-day urgent treatment for severe toothaches, broken teeth, knocked-out teeth, and abscesses.',
    features: ['24/7 Hotline Support', 'Pain Relief Priority', 'Same-Day Appointments'],
    duration: 'Immediate',
    badge: 'Urgent'
  }
];

export default function ServicesPage({ onNavigate }: ServicesPageProps) {
  const [selectedTag, setSelectedTag] = useState<string>('All');
  const tags = ['All', 'Cosmetic', 'Restorative', 'Orthodontics', 'Urgent Care'];

  const filteredServices = selectedTag === 'All' 
    ? detailedServices 
    : detailedServices.filter(s => s.tag === selectedTag);

  return (
    <div className="w-full min-h-screen bg-white pt-20 md:pt-24 pb-16">
      
      {/* Services Hero Header */}
      <div className="w-full px-3 sm:px-6 lg:px-8 mb-6 md:mb-10">
        <div 
          className="w-full min-h-[340px] sm:min-h-[420px] md:min-h-[480px] rounded-xl md:rounded-2xl overflow-hidden relative shadow-md p-5 sm:p-8 md:p-12 flex flex-col justify-between"
          style={{
            backgroundImage: `url(${SERVICES_HERO_IMG})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center'
          }}
        >
          <div className="z-10 bg-white/40 backdrop-blur-md px-3.5 py-1.5 rounded-full self-start text-xs md:text-sm font-bold text-black border border-white/50">
            Specialized Care Procedures
          </div>

          <div className="z-10 my-4">
            <span className="block text-black text-xs md:text-sm font-bold mb-2 tracking-wide uppercase">
              State-of-the-Art Dental Excellence
            </span>
            <h1 className="text-black text-[clamp(2.25rem,6.5vw,7rem)] font-extrabold leading-[0.9] tracking-tight">
              Our Dental<br/>Services
            </h1>
          </div>

          <div className="z-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-t border-white/30 pt-4 mt-2">
            <p className="text-black text-xs md:text-sm font-medium max-w-md">
              From routine care to complete smile transformations, our board-certified specialists use cutting-edge dental tech.
            </p>
            <button 
              onClick={() => onNavigate('contact')}
              className="px-5 py-3 md:px-6 md:py-3.5 bg-white text-black text-xs md:text-sm font-bold rounded-full hover:scale-105 transition-all shadow-lg shrink-0 cursor-pointer"
            >
              Book Appointment
            </button>
          </div>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="w-full px-3 sm:px-6 lg:px-8 mb-8">
        <div className="flex items-center gap-2 md:gap-3 p-2 bg-stone-100 rounded-xl md:rounded-2xl overflow-x-auto no-scrollbar">
          {tags.map(tag => (
            <button
              key={tag}
              onClick={() => setSelectedTag(tag)}
              className={`px-4 sm:px-5 py-2.5 rounded-xl text-xs md:text-sm font-bold transition-all shrink-0 cursor-pointer ${
                selectedTag === tag 
                  ? 'bg-black text-white shadow-md' 
                  : 'bg-transparent text-neutral-600 hover:text-black hover:bg-stone-200'
              }`}
            >
              {tag}
            </button>
          ))}
        </div>
      </div>

      {/* Services Bento Grid */}
      <div className="w-full px-3 sm:px-6 lg:px-8 mb-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
          {filteredServices.map(service => (
            <div 
              key={service.id}
              className="rounded-xl md:rounded-2xl bg-stone-50 border border-neutral-200 p-5 sm:p-6 md:p-8 flex flex-col justify-between hover:shadow-xl transition-all duration-300 group"
            >
              <div>
                <div className="flex items-center justify-between mb-4 gap-2 flex-wrap">
                  <span className="text-xs font-bold uppercase tracking-wider text-neutral-500 bg-white px-3 py-1 rounded-md border border-neutral-200">
                    {service.tag}
                  </span>
                  <span className="text-xs font-bold text-amber-700 bg-amber-50 px-3 py-1 rounded-full border border-amber-200">
                    {service.badge}
                  </span>
                </div>

                <h3 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-black mb-3 group-hover:text-neutral-700 transition-colors">
                  {service.title}
                </h3>

                <p className="text-xs md:text-sm text-neutral-600 leading-relaxed mb-6">
                  {service.desc}
                </p>

                <div className="space-y-2 mb-6">
                  {service.features.map((feat, idx) => (
                    <div key={idx} className="flex items-center gap-2 text-xs md:text-sm font-medium text-neutral-800">
                      <svg className="w-4 h-4 text-emerald-600 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 13l4 4L19 7" />
                      </svg>
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-4 border-t border-neutral-200 flex items-center justify-between gap-2">
                <span className="text-xs font-semibold text-neutral-500">Duration: {service.duration}</span>
                <button 
                  onClick={() => onNavigate('contact')}
                  className="px-4 py-2 bg-black text-white text-xs font-bold rounded-lg hover:bg-neutral-800 transition-colors cursor-pointer shrink-0"
                >
                  Consult Now
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Tech Highlight Section */}
      <div className="w-full px-3 sm:px-6 lg:px-8">
        <div className="rounded-xl md:rounded-2xl bg-zinc-900 text-white p-6 sm:p-8 md:p-12 grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8 items-center shadow-xl">
          <div className="flex flex-col gap-4">
            <span className="text-xs font-bold tracking-widest text-amber-400 uppercase">Advanced Dental Technology</span>
            <h2 className="text-2xl sm:text-3xl md:text-5xl font-extrabold leading-tight">
              Painless, Precise & Digital Dental Care
            </h2>
            <p className="text-xs md:text-sm text-neutral-400 leading-relaxed">
              We replace old-fashioned dental impressions and noisy drills with 3D intraoral scanners, quiet electric handpieces, and low-radiation 3D CBCT digital imaging.
            </p>
            <div className="grid grid-cols-2 gap-3 sm:gap-4 mt-2">
              <div className="p-4 bg-zinc-800 rounded-xl">
                <span className="block text-xl sm:text-2xl font-bold text-white">100%</span>
                <span className="text-xs text-neutral-400">Digital Impressions</span>
              </div>
              <div className="p-4 bg-zinc-800 rounded-xl">
                <span className="block text-xl sm:text-2xl font-bold text-white">0%</span>
                <span className="text-xs text-neutral-400">Gagging or Mess</span>
              </div>
            </div>
          </div>

          <div className="rounded-xl md:rounded-2xl overflow-hidden h-56 sm:h-72 md:h-96">
            <img src={TECH_IMG} alt="Dental Scanner" className="w-full h-full object-cover" />
          </div>
        </div>
      </div>

    </div>
  );
}
