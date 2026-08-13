import React from 'react';

interface FooterProps {
  onNavigate: (page: string) => void;
}

export default function Footer({ onNavigate }: FooterProps) {
  return (
    <footer className="w-full bg-black text-white py-12 md:py-20 px-4 md:px-8">
      <div className="w-full max-w-[1600px] mx-auto grid grid-cols-1 md:grid-cols-4 gap-8 md:gap-12 pb-12 border-b border-neutral-800">
        
        {/* Column 1: Brand */}
        <div className="flex flex-col gap-4">
          <div className="text-2xl md:text-3xl font-extrabold uppercase tracking-tight leading-none text-white">
            <div>Dental</div>
            <div className="-mt-1.5">Health</div>
          </div>
          <p className="text-xs md:text-sm text-neutral-400 leading-relaxed max-w-xs">
            Providing state-of-the-art dental care with precision, comfort, and personalized attention in West New York.
          </p>
          <div className="flex items-center gap-3 mt-2">
            <span className="w-3 h-3 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-xs font-semibold text-neutral-300">Accepting New Patients</span>
          </div>
        </div>

        {/* Column 2: Navigation */}
        <div className="flex flex-col gap-3">
          <h4 className="text-xs font-bold text-neutral-400 uppercase tracking-widest mb-1">Quick Links</h4>
          {['Home', 'Services', 'About', 'Gallery', 'Contact'].map(link => (
            <button
              key={link}
              onClick={() => onNavigate(link.toLowerCase())}
              className="text-left text-sm font-semibold text-neutral-300 hover:text-white transition-colors"
            >
              {link}
            </button>
          ))}
        </div>

        {/* Column 3: Hours & Emergency */}
        <div className="flex flex-col gap-3">
          <h4 className="text-xs font-bold text-neutral-400 uppercase tracking-widest mb-1">Hours & Emergency</h4>
          <div className="text-xs md:text-sm text-neutral-300 space-y-1">
            <p>Mon - Fri: 8:00 AM - 7:00 PM</p>
            <p>Saturday: 9:00 AM - 4:00 PM</p>
            <p>Sunday: Closed</p>
          </div>
          <div className="mt-3 p-4 bg-neutral-900 rounded-xl border border-neutral-800">
            <span className="block text-xs font-bold text-amber-400 uppercase">24/7 Dental Emergency</span>
            <span className="text-base font-bold text-white">+1 (201) 555-0199</span>
          </div>
        </div>

        {/* Column 4: Newsletter */}
        <div className="flex flex-col gap-4">
          <h4 className="text-xs font-bold text-neutral-400 uppercase tracking-widest">Stay Connected</h4>
          <p className="text-xs text-neutral-400">Subscribe to receive dental health tips and exclusive promotional offers.</p>
          <div className="flex flex-col gap-2">
            <input 
              type="email" 
              placeholder="Enter your email" 
              className="px-4 py-3 bg-neutral-900 border border-neutral-800 rounded-xl text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-white transition-colors"
            />
            <button className="px-5 py-3 bg-white text-black text-xs font-bold rounded-xl hover:bg-neutral-200 transition-colors">
              Subscribe
            </button>
          </div>
        </div>

      </div>

      <div className="w-full max-w-[1600px] mx-auto pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-neutral-500 font-medium">
        <p>© {new Date().getFullYear()} Dental Health Practice. All rights reserved.</p>
        <div className="flex gap-6">
          <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
          <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
          <a href="#" className="hover:text-white transition-colors">HIPAA Compliance</a>
        </div>
      </div>
    </footer>
  );
}
