'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import contactImg from '@/assets/Contact Image.png';
import hoursImg from '@/assets/Opening hours image.png';
import sushiArtImg from '@/assets/Sushi Artistry Redefined Image.png';
import sushiSensationImg from '@/assets/Sushi sensation.png';
import menuSideImg from '@/assets/Menu side image.png';
import ourStoryImg from '@/assets/Our Story image.png';

import mapPreviewImg from '@/assets/map_preview.png';

interface OpeningHour {
  _id: string;
  dayRange: string;
  openTime: string;
  closeTime: string;
}

const API = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';

const InstagramIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="hover:text-white transition-colors cursor-pointer">
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
    <path d="M16 11.37a4 4 0 1 1-7.63-1.37 4 4 0 0 1 7.63 1.37z"></path>
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
  </svg>
);

const TwitterIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="hover:text-white transition-colors cursor-pointer">
    <path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z"></path>
  </svg>
);

const FacebookIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="hover:text-white transition-colors cursor-pointer">
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
  </svg>
);

export default function ContactSection() {
  const [hours, setHours] = useState<OpeningHour[]>([]);

  useEffect(() => {
    fetch(`${API}/api/hours`)
      .then(res => res.json())
      .then(data => setHours(data))
      .catch(() => {});
  }, []);

  return (
    <section id="contact" className="py-24 px-4 md:px-8 bg-black">
      <div className="max-w-[1400px] mx-auto grid grid-cols-1 lg:grid-cols-[1.2fr_1.8fr] gap-8">
        
        {/* Left Column: Contact Image Card */}
        <div className="relative h-[300px] sm:h-[450px] lg:h-auto rounded-[32px] md:rounded-[40px] overflow-hidden group border border-white/5 order-last lg:order-first">
          <Image
            src={contactImg}
            alt="Contact Lead"
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-105"
            placeholder="blur"
          />
          <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/20 to-transparent pointer-events-none" />
          <div className="absolute top-8 left-8 md:top-12 md:left-12 flex items-center gap-4 md:gap-6">
          </div>
          <h2 className="absolute bottom-8 left-8 md:bottom-12 md:left-12 text-off-white font-forum text-6xl sm:text-8xl md:text-[100px] leading-none uppercase pointer-events-none tracking-[-2px]">
            CONTACT
          </h2>
        </div>

        {/* Right Column: Information Grid */}
        <div className="flex flex-col gap-6">
          
          {/* Top Row: Opening Hours and Instagram Grid */}
          <div className="grid grid-cols-1 md:grid-cols-[1.4fr_1fr] gap-6">
            
            {/* Opening Hours Box */}
            <div className="bg-[#111211] p-8 sm:p-10 md:p-14 rounded-[32px] md:rounded-[40px] flex flex-col items-center border border-white/5 relative overflow-hidden group">
              <div className="absolute inset-0 opacity-20 filter grayscale group-hover:scale-105 transition-transform duration-1000">
                <Image src={hoursImg} alt="Hours background" fill className="object-cover" />
              </div>
              <div className="relative z-10 w-full flex flex-col items-center">
                <div className="flex items-center gap-4 mb-8 md:mb-10 w-full">
                  <div className="h-px grow bg-white/10" />
                  <div className="w-1.5 h-1.5 md:w-2 md:h-2 rotate-45 border border-white/30" />
                  <h3 className="text-off-white font-forum text-xl md:text-2xl tracking-[3px] md:tracking-[4px] uppercase whitespace-nowrap">
                    OPENING HOURS
                  </h3>
                  <div className="w-1.5 h-1.5 md:w-2 md:h-2 rotate-45 border border-white/30" />
                  <div className="h-px grow bg-white/10" />
                </div>
                
                <div className="w-full space-y-4 md:space-y-6">
                  {hours.length > 0 ? (
                    hours.map((h) => (
                      <div key={h._id} className="flex justify-between items-center text-[13px] md:text-base border-b border-white/5 pb-3 md:pb-4">
                        <span className="text-[#a0a0a0] font-sans tracking-[1px] uppercase">{h.dayRange}</span>
                        <span className="text-off-white font-forum text-base md:text-lg tracking-[1px]">{h.openTime} - {h.closeTime}</span>
                      </div>
                    ))
                  ) : (
                    <div className="text-center text-[#666] py-8 font-sans uppercase tracking-[2px]">Loading hours...</div>
                  )}
                </div>
              </div>
            </div>

            {/* Instagram Style Image Grid */}
            <div className="grid grid-cols-2 gap-3 md:gap-4">
              {[sushiArtImg, sushiSensationImg, menuSideImg, ourStoryImg].map((img, i) => (
                <div key={i} className="relative aspect-square rounded-[24px] md:rounded-[30px] overflow-hidden border border-white/5 group">
                  <Image
                    src={img}
                    alt={`Gallery ${i}`}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                    placeholder="blur"
                  />
                  {i === 0 && (
                     <div className="absolute inset-0 bg-black/20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                        <span className="text-white text-xl">📸</span>
                     </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Bottom Row: Map and Get in Touch */}
          <div className="grid grid-cols-1 md:grid-cols-[1fr_1.4fr] gap-6">
            
            {/* Map Preview */}
            <div className="relative rounded-[40px] overflow-hidden border border-white/5 group min-h-[300px]">
              <Image
                src={mapPreviewImg}
                alt="Location Map"
                fill
                className="object-cover grayscale group-hover:grayscale-0 transition-all duration-700"
              />
              <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors" />
              <div className="absolute inset-0 flex flex-col items-center justify-center p-8 text-center">
                 <h4 className="relative z-10 text-off-white font-forum text-xl mb-4 uppercase tracking-[2px]">Location Map</h4>
                 <p className="relative z-10 text-white/70 text-xs uppercase tracking-[1px] mb-8">23 Greenfield Avenue, Prague 120 00</p>
                 <a 
                   href="https://www.google.com/maps/dir/?api=1&destination=23+Greenfield+Avenue+Prague+120+00" 
                   target="_blank" 
                   rel="noopener noreferrer"
                   className="relative z-10 px-6 py-3 rounded-full border border-white/20 text-off-white font-sans text-[11px] tracking-[2px] uppercase bg-black/40 backdrop-blur-md hover:bg-white hover:text-black transition-all inline-block"
                 >
                    Show Route →
                 </a>
              </div>
            </div>

            {/* Get in Touch Box */}
            <div className="bg-[#111211] p-8 sm:p-10 md:p-14 rounded-[32px] md:rounded-[40px] flex flex-col border border-white/5 relative overflow-hidden">
               <div className="flex items-center gap-4 mb-10 md:mb-14">
                  <div className="h-px grow bg-white/10" />
                  <div className="w-1.5 h-1.5 md:w-2 md:h-2 rotate-45 border border-white/30" />
                  <h3 className="text-off-white font-forum text-xl md:text-2xl tracking-[3px] md:tracking-[4px] uppercase whitespace-nowrap">
                    GET IN TOUCH
                  </h3>
                  <div className="w-1.5 h-1.5 md:w-2 md:h-2 rotate-45 border border-white/30" />
                  <div className="h-px grow bg-white/10" />
                </div>

                <div className="space-y-10">
                  <div className="flex flex-col md:flex-row md:justify-between items-start gap-4">
                    <span className="text-[#666] font-sans text-[11px] tracking-[2px] uppercase">Address</span>
                    <span className="text-off-white font-forum text-xl md:text-right">23 Greenfield Avenue,<br />Prague 120 00</span>
                  </div>
                  <div className="flex flex-col md:flex-row md:justify-between items-start gap-4">
                    <span className="text-[#666] font-sans text-[11px] tracking-[2px] uppercase">Phone</span>
                    <span className="text-off-white font-forum text-xl">+49 1234 567890</span>
                  </div>
                  <div className="flex flex-col md:flex-row md:justify-between items-start gap-4">
                    <span className="text-[#666] font-sans text-[11px] tracking-[2px] uppercase">Email</span>
                    <span className="text-off-white font-forum text-xl">hello@qitchen.com</span>
                  </div>
                  <div className="flex flex-col md:flex-row md:justify-between items-start gap-4">
                    <span className="text-[#666] font-sans text-[11px] tracking-[2px] uppercase">Follow</span>
                    <div className="flex gap-6 text-[#a0a0a0] items-center">
                      <InstagramIcon />
                      <TwitterIcon />
                      <FacebookIcon />
                    </div>
                  </div>
                </div>
            </div>
          </div>

          {/* Footer Links (within section as per design) */}
          <div className="mt-8 flex flex-wrap justify-center gap-8 text-[10px] tracking-[2px] text-[#444] font-sans uppercase">
             <span>By Pawel Gola</span>
             <span className="flex items-center gap-2"><div className="w-1 h-1 bg-[#444] rotate-45" /> Licensing</span>
             <span className="flex items-center gap-2"><div className="w-1 h-1 bg-[#444] rotate-45" /> Styleguide</span>
          </div>
        </div>

      </div>
    </section>
  );
}
