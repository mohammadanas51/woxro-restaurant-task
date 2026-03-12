'use client';

import { useState, useEffect, useMemo } from 'react';
import Image from 'next/image';
import menuSideImg from '@/assets/Menu side image.png';

interface MenuItem {
  _id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  imageUrl: string;
}

const getAPI = () => {
  const url = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';
  return url.endsWith('/') ? url.slice(0, -1) : url;
};
const API = getAPI();

export default function MenuSection() {
  const [items, setItems] = useState<MenuItem[]>([]);
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${API}/api/menu`)
      .then(async res => {
        if (!res.ok) {
          const text = await res.text();
          console.error(`Fetch failed for /api/menu: ${res.status}`, text);
          throw new Error(`HTTP error! status: ${res.status}`);
        }
        return res.json();
      })
      .then(data => {
        setItems(data);
        if (data.length > 0) {
          const firstCat = Array.from(new Set(data.map((i: MenuItem) => i.category)))[0] as string;
          setActiveCategory(firstCat);
        }
        setLoading(false);
      })
      .catch(err => {
        console.error('Failed to parse menu data:', err);
        setLoading(false);
      });
  }, []);

  const categories = useMemo(() => {
    return Array.from(new Set(items.map(i => i.category)));
  }, [items]);

  const filteredItems = useMemo(() => {
    if (!activeCategory) return items;
    return items.filter(i => i.category === activeCategory);
  }, [activeCategory, items]);

  return (
    <section id="menu" className="relative min-h-screen bg-[#0a0b0a]">
      <div className="flex flex-col lg:flex-row">
        
        {/* Left Side: Sticky Image */}
        <div className="relative h-[250px] sm:h-[350px] lg:h-screen lg:w-[45%] lg:sticky lg:top-0 overflow-hidden">
          <Image
            src={menuSideImg}
            alt="Menu Art"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-black/40" />
          <div className="absolute bottom-12 left-8 md:bottom-16 md:left-16">
            <h2 className="font-serif text-6xl sm:text-8xl md:text-[140px] text-white/95 leading-none tracking-tighter opacity-90 select-none">
              MENU
            </h2>
          </div>
        </div>

        {/* Right Side: Menu Content */}
        <div className="flex-1 pt-32 pb-16 px-6 md:px-12 lg:px-20 bg-[#0a0b0a]">
          
          {/* Category Filters */}
          <div className="flex flex-wrap items-center justify-center gap-2 md:gap-6 mb-16 md:mb-28 animate-fade-in">
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`flex-1 sm:flex-none min-w-[120px] px-6 md:px-10 py-2.5 md:py-3.5 text-[11px] md:text-[14px] font-medium tracking-[2px] md:tracking-[2.5px] uppercase transition-all duration-500 rounded-full border ${
                  activeCategory === cat 
                    ? 'bg-white/5 text-white border-white/20 shadow-[0_0_20px_rgba(255,255,255,0.05)]' 
                    : 'text-white/40 border-white/5 hover:border-white/20 hover:text-white'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Menu Items List */}
          {loading ? (
            <div className="flex justify-center items-center py-40">
              <div className="w-10 h-10 border-2 border-white/5 border-t-white/40 rounded-full animate-spin" />
            </div>
          ) : (
            <div className="space-y-24 max-w-5xl mx-auto">
              <div className="space-y-16">
                
                {/* Category Header with Decorative Diamonds */}
                <div className="flex items-center justify-center gap-4 md:gap-8 animate-fade-in-up">
                  <div className="h-px grow md:grow-0 md:w-20 bg-white/5" />
                  <div className="hidden sm:block w-2 sm:w-2.5 h-2 sm:h-2.5 rotate-45 border border-white/20" />
                  <h3 className="font-serif text-3xl sm:text-4xl md:text-6xl text-white tracking-[4px] sm:tracking-[8px] uppercase whitespace-nowrap px-2 sm:px-4 font-light">
                    {activeCategory}
                  </h3>
                  <div className="hidden sm:block w-2 sm:w-2.5 h-2 sm:h-2.5 rotate-45 border border-white/20" />
                  <div className="h-px grow md:grow-0 md:w-20 bg-white/5" />
                </div>

                {/* Items List */}
                <div className="grid gap-12">
                  {filteredItems.map((item, idx) => (
                    <div 
                      key={item._id} 
                      className="group flex flex-col md:flex-row items-center md:items-start gap-8 animate-fade-in-up"
                      style={{ animationDelay: `${idx * 100}ms` }}
                    >
                      {/* Item Image */}
                      <div className="relative w-48 h-32 md:w-56 md:h-36 shrink-0 bg-white/5 rounded-2xl overflow-hidden group-hover:shadow-[0_0_40px_rgba(255,255,255,0.05)] transition-all duration-700">
                        {item.imageUrl ? (
                          <Image
                            src={item.imageUrl}
                            alt={item.name}
                            fill
                            unoptimized
                            className="object-cover transition-transform duration-1000 group-hover:scale-110"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center text-white/5 text-[10px] uppercase tracking-widest font-sans font-medium">
                            No Image
                          </div>
                        )}
                      </div>

                      {/* Item Details */}
                      <div className="flex-1 w-full space-y-3">
                        <div className="flex items-center gap-4">
                          <h4 className="font-serif text-2xl md:text-3xl text-white tracking-wide uppercase">
                            {item.name}
                          </h4>
                          <div className="flex-1 border-b border-dotted border-white/20 mb-1" />
                          <span className="font-serif text-2xl md:text-3xl text-[#c4a76c] font-light">
                            ${item.price.toFixed(0)}
                          </span>
                        </div>
                        <p className="text-[14px] md:text-[15px] text-white/40 leading-relaxed font-light max-w-2xl">
                          {item.description}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {items.length === 0 && (
                <div className="text-center py-40">
                  <p className="font-serif text-2xl text-white/20 tracking-widest uppercase italic">
                    The kitchen is empty for now...
                  </p>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
