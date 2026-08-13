import React, { useState } from 'react';

const CONTACT_HERO_IMG = 'https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260624_115253_c19ab167-8dd5-48b4-967d-b9f0d9d6e8fb.png&w=1280&q=85';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    service: 'Porcelain Veneers',
    date: '',
    timeSlot: 'Morning (9:00 AM - 12:00 PM)',
    notes: ''
  });

  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="w-full min-h-screen bg-white pt-20 md:pt-24 pb-16">
      
      {/* Contact Hero Header */}
      <div className="w-full px-2 md:px-4 mb-6 md:mb-10">
        <div 
          className="w-full min-h-[360px] md:min-h-[440px] rounded-xl md:rounded-2xl overflow-hidden relative shadow-md p-6 md:p-12 flex flex-col justify-between"
          style={{
            backgroundImage: `url(${CONTACT_HERO_IMG})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center'
          }}
        >
          <div className="z-10 bg-white/40 backdrop-blur-md px-4 py-2 rounded-full self-start text-xs md:text-sm font-bold text-black border border-white/50">
            Online Booking & Support
          </div>

          <div className="z-10">
            <span className="block text-black text-xs md:text-sm font-bold mb-2 tracking-wide uppercase">
              Schedule Your Dental Visit Today
            </span>
            <h1 className="text-black text-[clamp(2.5rem,7vw,7rem)] font-extrabold leading-[0.9] tracking-tight">
              Get In Touch
            </h1>
          </div>

          <div className="z-10 border-t border-white/30 pt-4 mt-4">
            <p className="text-white text-xs md:text-sm font-medium max-w-md">
              Have questions or need emergency assistance? Our dedicated patient care team is available 24/7.
            </p>
          </div>
        </div>
      </div>

      {/* Main Grid: Form + Info */}
      <div className="w-full px-2 md:px-4">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          
          {/* Booking Form (7 Cols) */}
          <div className="lg:col-span-7 rounded-xl md:rounded-2xl bg-stone-50 border border-neutral-200 p-6 md:p-10 shadow-md">
            {submitted ? (
              <div className="p-8 bg-emerald-50 border border-emerald-200 rounded-xl text-center flex flex-col items-center gap-4 my-8">
                <div className="w-16 h-16 rounded-full bg-emerald-500 text-white flex items-center justify-center text-3xl font-bold">
                  ✓
                </div>
                <h3 className="text-2xl font-extrabold text-emerald-900">Appointment Request Received!</h3>
                <p className="text-xs md:text-sm text-emerald-800 max-w-md">
                  Thank you, <strong>{formData.name}</strong>. Our patient coordinator will call you at <strong>{formData.phone}</strong> shortly to confirm your booking for <strong>{formData.service}</strong>.
                </p>
                <button 
                  onClick={() => setSubmitted(false)}
                  className="mt-4 px-6 py-2.5 bg-emerald-700 text-white text-xs font-bold rounded-lg hover:bg-emerald-800 transition-colors"
                >
                  Book Another Appointment
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                  <h2 className="text-2xl md:text-3xl font-extrabold text-black mb-1">Book Consultation</h2>
                  <p className="text-xs md:text-sm text-neutral-600">Fill in your details below and we will confirm your reservation.</p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold uppercase text-neutral-700 mb-1">Full Name</label>
                    <input 
                      type="text" 
                      required 
                      value={formData.name}
                      onChange={e => setFormData({ ...formData, name: e.target.value })}
                      placeholder="John Doe" 
                      className="w-full px-4 py-3 bg-white border border-neutral-300 rounded-xl text-xs md:text-sm text-black focus:outline-none focus:border-black"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase text-neutral-700 mb-1">Phone Number</label>
                    <input 
                      type="tel" 
                      required 
                      value={formData.phone}
                      onChange={e => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="+1 (201) 555-0123" 
                      className="w-full px-4 py-3 bg-white border border-neutral-300 rounded-xl text-xs md:text-sm text-black focus:outline-none focus:border-black"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold uppercase text-neutral-700 mb-1">Email Address</label>
                    <input 
                      type="email" 
                      required 
                      value={formData.email}
                      onChange={e => setFormData({ ...formData, email: e.target.value })}
                      placeholder="john@example.com" 
                      className="w-full px-4 py-3 bg-white border border-neutral-300 rounded-xl text-xs md:text-sm text-black focus:outline-none focus:border-black"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase text-neutral-700 mb-1">Service Required</label>
                    <select 
                      value={formData.service}
                      onChange={e => setFormData({ ...formData, service: e.target.value })}
                      className="w-full px-4 py-3 bg-white border border-neutral-300 rounded-xl text-xs md:text-sm text-black focus:outline-none focus:border-black"
                    >
                      <option value="Porcelain Veneers">Porcelain Veneers</option>
                      <option value="Implant Dentistry">Implant Dentistry</option>
                      <option value="Laser Teeth Whitening">Laser Teeth Whitening</option>
                      <option value="Clear Aligners">Clear Aligners</option>
                      <option value="Ceramic Crowns">Ceramic Crowns</option>
                      <option value="Emergency Care">Emergency Care</option>
                      <option value="General Consultation">General Consultation</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold uppercase text-neutral-700 mb-1">Preferred Date</label>
                    <input 
                      type="date" 
                      required 
                      value={formData.date}
                      onChange={e => setFormData({ ...formData, date: e.target.value })}
                      className="w-full px-4 py-3 bg-white border border-neutral-300 rounded-xl text-xs md:text-sm text-black focus:outline-none focus:border-black"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase text-neutral-700 mb-1">Preferred Time Slot</label>
                    <select 
                      value={formData.timeSlot}
                      onChange={e => setFormData({ ...formData, timeSlot: e.target.value })}
                      className="w-full px-4 py-3 bg-white border border-neutral-300 rounded-xl text-xs md:text-sm text-black focus:outline-none focus:border-black"
                    >
                      <option value="Morning (9:00 AM - 12:00 PM)">Morning (9:00 AM - 12:00 PM)</option>
                      <option value="Afternoon (1:00 PM - 4:00 PM)">Afternoon (1:00 PM - 4:00 PM)</option>
                      <option value="Evening (4:00 PM - 7:00 PM)">Evening (4:00 PM - 7:00 PM)</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase text-neutral-700 mb-1">Additional Notes / Dental Symptoms</label>
                  <textarea 
                    rows={3}
                    value={formData.notes}
                    onChange={e => setFormData({ ...formData, notes: e.target.value })}
                    placeholder="Tell us about any specific dental goals or pain you are experiencing..." 
                    className="w-full px-4 py-3 bg-white border border-neutral-300 rounded-xl text-xs md:text-sm text-black focus:outline-none focus:border-black"
                  />
                </div>

                <button 
                  type="submit"
                  className="w-full py-4 bg-black text-white text-sm font-bold rounded-xl hover:bg-neutral-800 transition-colors shadow-md"
                >
                  Confirm Appointment Request
                </button>
              </form>
            )}
          </div>

          {/* Info Bento Column (5 Cols) */}
          <div className="lg:col-span-5 flex flex-col gap-6">
            
            {/* Contact Details Card */}
            <div className="p-6 md:p-8 rounded-xl md:rounded-2xl bg-black text-white flex flex-col justify-between shadow-md">
              <div>
                <span className="text-xs font-bold text-amber-400 uppercase tracking-widest">Direct Contact</span>
                <h3 className="text-2xl md:text-3xl font-extrabold text-white mt-2 mb-6">West New York Clinic</h3>
                
                <div className="space-y-4 text-xs md:text-sm text-neutral-300">
                  <div>
                    <span className="block font-bold text-white uppercase text-[10px] tracking-wider mb-1">Clinic Address</span>
                    <p>4500 Bergenline Ave, Suite 300<br/>West New York, NJ 07093</p>
                  </div>

                  <div>
                    <span className="block font-bold text-white uppercase text-[10px] tracking-wider mb-1">Phone & Fax</span>
                    <p>Main: +1 (201) 555-0190<br/>Fax: +1 (201) 555-0191</p>
                  </div>

                  <div>
                    <span className="block font-bold text-white uppercase text-[10px] tracking-wider mb-1">Email Inquiries</span>
                    <p>care@dentalhealthwny.com</p>
                  </div>
                </div>
              </div>

              <div className="mt-8 p-4 bg-neutral-900 rounded-xl border border-neutral-800">
                <span className="block text-xs font-bold text-red-400 uppercase">Emergency Dental Line</span>
                <span className="text-lg font-extrabold text-white">+1 (201) 555-0199</span>
              </div>
            </div>

            {/* Opening Hours Card */}
            <div className="p-6 md:p-8 rounded-xl md:rounded-2xl bg-stone-100 border border-neutral-200 shadow-sm">
              <h4 className="text-lg font-bold text-black mb-4">Clinic Hours</h4>
              <div className="space-y-2 text-xs md:text-sm text-neutral-700">
                <div className="flex justify-between border-b border-neutral-200 pb-2">
                  <span>Monday - Thursday</span>
                  <span className="font-bold text-black">8:00 AM - 7:00 PM</span>
                </div>
                <div className="flex justify-between border-b border-neutral-200 pb-2">
                  <span>Friday</span>
                  <span className="font-bold text-black">8:00 AM - 6:00 PM</span>
                </div>
                <div className="flex justify-between border-b border-neutral-200 pb-2">
                  <span>Saturday</span>
                  <span className="font-bold text-black">9:00 AM - 4:00 PM</span>
                </div>
                <div className="flex justify-between pt-1">
                  <span>Sunday</span>
                  <span className="font-bold text-red-600">Closed (Emergency Only)</span>
                </div>
              </div>
            </div>

          </div>

        </div>
      </div>

    </div>
  );
}
