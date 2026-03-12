'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const menuOptions = [
    { name: 'Menu', href: '/#menu' },
    { name: 'Reservation', href: '/#reservation' },
    { name: 'About', href: '/#about' },
    { name: 'Contact', href: '/#footer' },
    { name: 'Blog', href: '/blog' }
  ];

  return (
    <>
      <header className="fixed top-4 left-4 right-4 md:top-8 md:left-8 md:right-auto z-50 md:max-w-3xl">
        <nav className="bg-black/90 backdrop-blur-md border border-white/10 rounded-2xl px-3 py-2 md:px-4 flex items-center justify-between md:justify-start gap-4 md:gap-6 shadow-2xl transition-all duration-300">
          
          {/* Hamburger button */}
          <button 
            onClick={() => setMenuOpen(true)}
            className="w-10 h-10 flex items-center justify-center rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-colors group"
          >
            <div className="flex flex-col gap-1.5 overflow-hidden">
              <span className="w-6 h-px bg-white/80 group-hover:w-4 transition-all duration-300" />
              <span className="w-6 h-px bg-white/80 transition-all duration-300" />
              <span className="w-4 h-px bg-white/80 group-hover:w-6 transition-all duration-300" />
            </div>
          </button>

          {/* Logo */}
          <Link href="/" className="font-serif text-2xl tracking-[4px] text-white">
            QITCHEN
          </Link>

          {/* Desktop Links */}
          <div className="hidden md:flex items-center gap-6 pr-2">
            <Link href="/#menu" className="text-[11px] font-medium tracking-[2px] text-white/70 hover:text-white transition-colors uppercase">MENU</Link>
            <Link href="/#about" className="text-[11px] font-medium tracking-[2px] text-white/70 hover:text-white transition-colors uppercase">ABOUT</Link>
            <Link href="/#reservation" className="text-[11px] font-medium tracking-[2px] border border-white/20 px-4 py-2 rounded-xl hover:bg-white hover:text-black transition-all uppercase">BOOK A TABLE</Link>
          </div>
        </nav>
      </header>

      {/* Menu Overlay */}
      {menuOpen && (
        <div className="fixed inset-0 z-100 bg-black/95 flex flex-col items-center justify-center animate-fade-in backdrop-blur-xl">
          <button 
            onClick={() => setMenuOpen(false)}
            className="absolute top-10 right-10 text-white/60 hover:text-white text-4xl transition-colors"
          >
            ×
          </button>
          
          <div className="flex flex-col gap-8 text-center">
            {menuOptions.map((option, i) => (
              <Link
                key={i}
                href={option.href}
                onClick={() => setMenuOpen(false)}
                className="font-forum text-4xl md:text-5xl tracking-[4px] text-white/80 hover:text-white transition-all transform hover:scale-110"
              >
                {option.name.toUpperCase()}
              </Link>
            ))}
          </div>
        </div>
      )}
    </>
  );
}
