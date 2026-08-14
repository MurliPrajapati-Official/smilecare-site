import React from 'react';

const ABOUT_HERO_IMG = 'https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260624_114355_752ba9e6-0942-4abb-9047-5d9bb16632e9.png&w=1280&q=85';
const DOCTOR1_IMG = 'https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260624_115237_fc519057-6e87-4abf-999a-9610b8b085b4.png&w=1280&q=85';
const DOCTOR2_IMG = 'https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260624_113640_ccf3cf97-d447-425b-a134-d7b09fc743fc.png&w=1280&q=85';

interface AboutPageProps {
  onNavigate: (page: string) => void;
}

export default function AboutPage({ onNavigate }: AboutPageProps) {
  return (
    <div className="w-full min-h-screen bg-white pt-20 md:pt-24 pb-16">
      
      {/* About Hero Header */}
      <div className="w-full px-3 sm:px-6 lg:px-8 mb-6 md:mb-10">
        <div 
          className="w-full min-h-[340px] sm:min-h-[420px] md:min-h-[480px] rounded-xl md:rounded-2xl overflow-hidden relative shadow-md p-5 sm:p-8 md:p-12 flex flex-col justify-between"
          style={{
            backgroundImage: `url(${ABOUT_HERO_IMG})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center'
          }}
        >
          <div className="z-10 bg-white/40 backdrop-blur-md px-3.5 py-1.5 rounded-full self-start text-xs md:text-sm font-bold text-black border border-white/50">
            About Our Practice
          </div>

          <div className="z-10 my-4">
            <span className="block text-black text-xs md:text-sm font-bold mb-2 tracking-wide uppercase">
              West New York's Premier Dental Clinic
            </span>
            <h1 className="text-black text-[clamp(2.25rem,6.5vw,7rem)] font-extrabold leading-[0.9] tracking-tight">
              Redefining<br/>Dental Care
            </h1>
          </div>

          <div className="z-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-t border-white/30 pt-4 mt-2">
            <p className="text-black text-xs md:text-sm font-medium max-w-md">
              Founded on principles of clinical excellence, gentle patient care, and modern technology.
            </p>
            <button 
              onClick={() => onNavigate('contact')}
              className="px-5 py-3 md:px-6 md:py-3.5 bg-white text-black text-xs md:text-sm font-bold rounded-full hover:scale-105 transition-all shadow-lg shrink-0 cursor-pointer"
            >
              Meet Our Team
            </button>
          </div>
        </div>
      </div>

      {/* Stats Counter Bento */}
      <div className="w-full px-3 sm:px-6 lg:px-8 mb-12">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4">
          <div className="p-4 sm:p-6 md:p-8 rounded-xl md:rounded-2xl bg-stone-100 flex flex-col justify-between shadow-sm">
            <span className="text-3xl sm:text-4xl md:text-6xl font-extrabold text-black">15+</span>
            <span className="text-xs md:text-sm font-semibold text-neutral-600 mt-2">Years of Dedicated Experience</span>
          </div>

          <div className="p-4 sm:p-6 md:p-8 rounded-xl md:rounded-2xl bg-stone-100 flex flex-col justify-between shadow-sm">
            <span className="text-3xl sm:text-4xl md:text-6xl font-extrabold text-black">12k+</span>
            <span className="text-xs md:text-sm font-semibold text-neutral-600 mt-2">Happy Smiles Transformed</span>
          </div>

          <div className="p-4 sm:p-6 md:p-8 rounded-xl md:rounded-2xl bg-stone-100 flex flex-col justify-between shadow-sm">
            <span className="text-3xl sm:text-4xl md:text-6xl font-extrabold text-black">99.4%</span>
            <span className="text-xs md:text-sm font-semibold text-neutral-600 mt-2">Patient Satisfaction Score</span>
          </div>

          <div className="p-4 sm:p-6 md:p-8 rounded-xl md:rounded-2xl bg-stone-100 flex flex-col justify-between shadow-sm">
            <span className="text-3xl sm:text-4xl md:text-6xl font-extrabold text-black">24/7</span>
            <span className="text-xs md:text-sm font-semibold text-neutral-600 mt-2">Emergency Dental Hotline</span>
          </div>
        </div>
      </div>

      {/* Doctor Spotlight */}
      <div className="w-full px-3 sm:px-6 lg:px-8 mb-12">
        <div className="mb-6">
          <span className="text-xs font-bold uppercase tracking-widest text-neutral-500">Board-Certified Specialists</span>
          <h2 className="text-2xl sm:text-3xl md:text-5xl font-extrabold text-black mt-1">Meet Our Doctors</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          
          {/* Doctor 1 */}
          <div className="rounded-xl md:rounded-2xl bg-stone-50 border border-neutral-200 overflow-hidden flex flex-col sm:flex-row shadow-md group">
            <div className="sm:w-1/2 h-56 sm:h-auto overflow-hidden shrink-0">
              <img src={DOCTOR1_IMG} alt="Dr. Sarah Jenkins" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
            </div>
            <div className="sm:w-1/2 p-5 sm:p-6 md:p-8 flex flex-col justify-between">
              <div>
                <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200 inline-block">
                  Lead Implantologist
                </span>
                <h3 className="text-xl sm:text-2xl font-bold text-black mt-3 mb-1">Dr. Sarah Jenkins, DMD</h3>
                <p className="text-xs text-neutral-500 font-semibold mb-3">Harvard School of Dental Medicine</p>
                <p className="text-xs md:text-sm text-neutral-600 leading-relaxed">
                  Specializing in complex dental implant surgery, full-arch restorations, and bone grafting with over 12 years of clinical surgical experience.
                </p>
              </div>
              <button 
                onClick={() => onNavigate('contact')}
                className="mt-6 px-4 py-2.5 bg-black text-white text-xs font-bold rounded-lg hover:bg-neutral-800 transition-colors self-start cursor-pointer"
              >
                Book with Dr. Sarah
              </button>
            </div>
          </div>

          {/* Doctor 2 */}
          <div className="rounded-xl md:rounded-2xl bg-stone-50 border border-neutral-200 overflow-hidden flex flex-col sm:flex-row shadow-md group">
            <div className="sm:w-1/2 h-56 sm:h-auto overflow-hidden shrink-0">
              <img src={DOCTOR2_IMG} alt="Dr. Michael Chen" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
            </div>
            <div className="sm:w-1/2 p-5 sm:p-6 md:p-8 flex flex-col justify-between">
              <div>
                <span className="text-xs font-bold text-indigo-700 bg-indigo-50 px-3 py-1 rounded-full border border-indigo-200 inline-block">
                  Cosmetic Dentist
                </span>
                <h3 className="text-xl sm:text-2xl font-bold text-black mt-3 mb-1">Dr. Michael Chen, DDS</h3>
                <p className="text-xs text-neutral-500 font-semibold mb-3">NYU College of Dentistry</p>
                <p className="text-xs md:text-sm text-neutral-600 leading-relaxed">
                  Expert in porcelain veneers, laser teeth whitening, and complete aesthetic smile makeovers designed to complement natural facial aesthetics.
                </p>
              </div>
              <button 
                onClick={() => onNavigate('contact')}
                className="mt-6 px-4 py-2.5 bg-black text-white text-xs font-bold rounded-lg hover:bg-neutral-800 transition-colors self-start cursor-pointer"
              >
                Book with Dr. Michael
              </button>
            </div>
          </div>

        </div>
      </div>

      {/* Core Values Bento Grid */}
      <div className="w-full px-3 sm:px-6 lg:px-8">
        <div className="rounded-xl md:rounded-2xl bg-black text-white p-6 sm:p-8 md:p-12">
          <h2 className="text-2xl sm:text-3xl md:text-5xl font-extrabold mb-8 text-center">Why Patients Choose Us</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
            <div className="p-5 sm:p-6 bg-neutral-900 rounded-xl border border-neutral-800">
              <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-white/10 flex items-center justify-center mb-4 text-amber-400 font-bold text-lg sm:text-xl">
                01
              </div>
              <h3 className="text-lg sm:text-xl font-bold mb-2">Zero Anxiety Care</h3>
              <p className="text-xs md:text-sm text-neutral-400 leading-relaxed">
                Gentle local anesthesia, comforting heated chairs, noise-canceling headphones, and sedation options ensure stress-free appointments.
              </p>
            </div>

            <div className="p-5 sm:p-6 bg-neutral-900 rounded-xl border border-neutral-800">
              <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-white/10 flex items-center justify-center mb-4 text-amber-400 font-bold text-lg sm:text-xl">
                02
              </div>
              <h3 className="text-lg sm:text-xl font-bold mb-2">Transparent Pricing</h3>
              <p className="text-xs md:text-sm text-neutral-400 leading-relaxed">
                Clear treatment estimates with zero hidden fees. We work directly with major dental insurance providers and offer flexible financing plans.
              </p>
            </div>

            <div className="p-5 sm:p-6 bg-neutral-900 rounded-xl border border-neutral-800">
              <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-white/10 flex items-center justify-center mb-4 text-amber-400 font-bold text-lg sm:text-xl">
                03
              </div>
              <h3 className="text-lg sm:text-xl font-bold mb-2">Lifetime Warranty</h3>
              <p className="text-xs md:text-sm text-neutral-400 leading-relaxed">
                We stand behind our craftsmanship with comprehensive warranties on porcelain veneers, crowns, and dental implant implants.
              </p>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
}
