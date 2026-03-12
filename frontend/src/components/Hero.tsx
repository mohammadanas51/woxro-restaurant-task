'use client';

import Image from 'next/image';
import Link from 'next/link';
import sushiSensation from '@/assets/Sushi sensation.png';
import menuImg from '@/assets/Menu Image.png';
import reservationImg from '@/assets/Reservation Image.png';
import restaurantImg from '@/assets/Our Restaurant Image.png';

export default function Hero() {
  return (
    <section className="relative h-screen min-h-[700px] p-4 bg-[#0a0b0a] overflow-hidden">
      <div className="flex flex-col lg:flex-row h-full gap-4">
        {/* Main Hero Card */}
        <div className="relative flex-1 lg:flex-3 rounded-[48px] overflow-hidden group">
          <Image
            src={sushiSensation}
            alt="Sushi Sensation"
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-105"
            priority
          />
          <div className="absolute inset-0 bg-black/20" />

          <div className="absolute inset-0 bg-black/20" />

          {/* Hero Text */}
          <div className="absolute bottom-8 left-8 md:bottom-12 md:left-12 max-w-[calc(100%-64px)] md:max-w-2xl">
            <h1 className="font-serif text-5xl sm:text-6xl md:text-8xl lg:text-[100px] leading-tight text-white tracking-tight uppercase">
              SUSHI <br /> SENSATION
            </h1>
          </div>

          {/* Social Icons */}
          <div className="absolute top-8 right-8 md:top-auto md:bottom-12 md:right-12 flex md:flex-row flex-col gap-4">
            <a href="#instagram" className="w-9 h-9 md:w-10 md:h-10 rounded-full bg-black/40 backdrop-blur-md border border-white/10 flex items-center justify-center text-white/70 hover:text-white hover:border-white/30 transition-all">
              <svg className="w-4 h-4 md:w-[18px] md:h-[18px]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
            </a>
            <a href="#facebook" className="w-9 h-9 md:w-10 md:h-10 rounded-full bg-black/40 backdrop-blur-md border border-white/10 flex items-center justify-center text-white/70 hover:text-white hover:border-white/30 transition-all">
              <svg className="w-4 h-4 md:w-[18px] md:h-[18px]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path></svg>
            </a>
            <a href="#twitter" className="w-9 h-9 md:w-10 md:h-10 rounded-full bg-black/40 backdrop-blur-md border border-white/10 flex items-center justify-center text-white/70 hover:text-white hover:border-white/30 transition-all">
              <svg className="w-4 h-4 md:w-[18px] md:h-[18px]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z"></path></svg>
            </a>
          </div>
        </div>

        {/* Sidebar Cards */}
        <div className="flex flex-row md:flex-col flex-1 gap-4 h-auto md:h-full lg:max-w-[320px]">
          {/* Menu Card */}
          <Link href="#menu" className="relative flex-1 rounded-[24px] md:rounded-[32px] overflow-hidden group min-h-[160px]">
            <Image
              src={menuImg}
              alt="Menu"
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-linear-to-t from-black/70 to-transparent" />
            <div className="absolute bottom-4 right-4 md:bottom-6 md:right-6 flex items-center gap-2 text-white">
              <span className="text-[9px] md:text-[10px] font-medium tracking-[1.5px] md:tracking-[2px] uppercase">Menu</span>
              <div className="w-5 h-5 md:w-6 md:h-6 rounded-full border border-white/30 flex items-center justify-center group-hover:bg-white group-hover:text-black transition-all">
                <svg className="w-2.5 h-2.5 md:w-3 md:h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </div>
            </div>
          </Link>

          {/* Reservation Card */}
          <Link href="#reservation" className="relative flex-1 rounded-[24px] md:rounded-[32px] overflow-hidden group min-h-[160px]">
            <Image
              src={reservationImg}
              alt="Reservation"
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-linear-to-t from-black/70 to-transparent" />
            <div className="absolute bottom-4 right-4 md:bottom-6 md:right-6 flex items-center gap-2 text-white">
              <span className="text-[9px] md:text-[10px] font-medium tracking-[1.5px] md:tracking-[2px] uppercase">Reservation</span>
              <div className="w-5 h-5 md:w-6 md:h-6 rounded-full border border-white/30 flex items-center justify-center group-hover:bg-white group-hover:text-black transition-all">
                <svg className="w-2.5 h-2.5 md:w-3 md:h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </div>
            </div>
          </Link>

          {/* Restaurant Card */}
          <Link href="#about" className="relative flex-1 rounded-[24px] md:rounded-[32px] overflow-hidden group min-h-[160px] hidden sm:block">
            <Image
              src={restaurantImg}
              alt="Our Restaurant"
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-linear-to-t from-black/70 to-transparent" />
            <div className="absolute bottom-4 right-4 md:bottom-6 md:right-6 flex items-center gap-2 text-white">
              <span className="text-[9px] md:text-[10px] font-medium tracking-[1.5px] md:tracking-[2px] uppercase">Our Restaurant</span>
              <div className="w-5 h-5 md:w-6 md:h-6 rounded-full border border-white/30 flex items-center justify-center group-hover:bg-white group-hover:text-black transition-all">
                <svg className="w-2.5 h-2.5 md:w-3 md:h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </div>
            </div>
          </Link>
        </div>
      </div>
    </section>
  );
}
