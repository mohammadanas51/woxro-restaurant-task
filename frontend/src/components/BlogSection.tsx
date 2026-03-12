'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import blogLeftImg from '@/assets/blog section left side image.png';

interface Blog {
  _id: string;
  title: string;
  slug: string;
  excerpt: string;
  imageUrl: string;
  createdAt: string;
}

const getAPI = () => {
  const url = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';
  return url.endsWith('/') ? url.slice(0, -1) : url;
};
const API = getAPI();

export default function BlogSection() {
  const [blogs, setBlogs] = useState<Blog[]>([]);

  useEffect(() => {
    fetch(`${API}/api/blogs`)
      .then(async res => {
        if (!res.ok) {
          const text = await res.text();
          console.error(`Fetch failed for /api/blogs: ${res.status}`, text);
          throw new Error(`HTTP error! status: ${res.status}`);
        }
        return res.json();
      })
      .then(data => setBlogs(data.slice(0, 5)))
      .catch(err => {
        console.error('Failed to parse blog data:', err);
      });
  }, []);

  const formatDate = (d: string) => {
    const date = new Date(d);
    return date.toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' }).toUpperCase();
  };

  return (
    <section id="blog" className="py-24 px-4 md:px-8 bg-black">
      <div className="max-w-[1400px] mx-auto grid grid-cols-1 lg:grid-cols-[1.2fr_1.8fr] gap-8">
        
        {/* Left Column: Blog Image Card */}
        <div className="relative h-[300px] sm:h-[450px] lg:h-[900px] rounded-[32px] md:rounded-[40px] overflow-hidden group border border-white/5">
          <Image
            src={blogLeftImg}
            alt="Blog Lead"
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-105"
            placeholder="blur"
          />
          <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/20 to-transparent pointer-events-none" />
          <div className="absolute top-8 left-8 md:top-12 md:left-12 flex items-center gap-4 md:gap-6">
             <div className="w-10 h-10 md:w-12 md:h-12 rounded-full border border-white/20 flex items-center justify-center bg-black/40 backdrop-blur-sm group-hover:bg-black/60 transition-colors">
                <span className="text-white text-lg md:text-xl">☰</span>
             </div>
             <div className="bg-black/40 backdrop-blur-sm border border-white/10 px-4 md:px-6 py-2 rounded-full hidden sm:block">
                <div className="flex gap-4 md:gap-8 text-[10px] md:text-[11px] tracking-[1.5px] md:tracking-[2px] text-off-white font-sans uppercase font-medium">
                  <a href="#menu" className="hover:text-white transition-colors">Menu</a>
                  <a href="#about" className="hover:text-white transition-colors">About</a>
                  <a href="#reservation" className="hover:text-white transition-colors">Book</a>
                </div>
             </div>
          </div>
          <h2 className="absolute bottom-8 left-8 md:bottom-12 md:left-12 text-off-white font-forum text-6xl sm:text-8xl md:text-[120px] leading-none uppercase pointer-events-none tracking-[-2px]">
            BLOG
          </h2>
        </div>

        {/* Right Column: Blog List */}
        <div className="flex flex-col gap-12 lg:pl-12">
          
          {/* Header */}
          <div className="flex flex-col items-center text-center">
            <div className="flex items-center gap-4 mb-6 w-full">
              <div className="h-px grow bg-white/10" />
              <div className="w-1.5 h-1.5 md:w-2 md:h-2 rotate-45 border border-white/30" />
              <h3 className="text-off-white font-forum text-xl md:text-3xl tracking-[3px] md:tracking-[4px] uppercase whitespace-nowrap px-2 md:px-4">
                BEHIND THE SCENES<br />& LATEST NEWS
              </h3>
              <div className="w-1.5 h-1.5 md:w-2 md:h-2 rotate-45 border border-white/30" />
              <div className="h-px grow bg-white/10" />
            </div>
          </div>

          {/* Blogs List */}
          <div className="flex flex-col gap-10">
            {blogs.length > 0 ? (
              blogs.map((blog) => (
                <Link key={blog._id} href={`/blog/${blog._id}`} className="group cursor-pointer block">
                  <div className="grid grid-cols-1 md:grid-cols-[200px_1fr] gap-8 items-center">
                    <div className="relative aspect-[3/2] md:aspect-square rounded-[20px] overflow-hidden border border-white/5 bg-white/5">
                      {blog.imageUrl ? (
                        <Image
                          src={blog.imageUrl}
                          alt={blog.title}
                          fill
                          unoptimized
                          className="object-cover transition-transform duration-500 group-hover:scale-110"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-white/10 text-[10px] uppercase tracking-widest font-sans font-medium">
                          No Image
                        </div>
                      )}
                    </div>
                    <div className="flex flex-col gap-3">
                      <div className="flex items-center gap-3">
                         <div className="w-1.5 h-1.5 rotate-45 border border-white/30" />
                         <span className="text-[#666] font-sans text-[10px] tracking-[2px] uppercase">
                           {formatDate(blog.createdAt)}
                         </span>
                      </div>
                      <h4 className="text-off-white font-forum text-xl md:text-2xl leading-tight group-hover:text-white transition-colors uppercase tracking-tight">
                        {blog.title}
                      </h4>
                      <p className="text-[#666] font-sans text-sm leading-relaxed line-clamp-2 pr-4">
                        {blog.excerpt}
                      </p>
                    </div>
                  </div>
                </Link>
              ))
            ) : (
              <div className="text-center text-[#444] py-20 font-sans uppercase tracking-[2px]">
                Loading stories...
              </div>
            )}
          </div>

          {/* Footer Links (within section as per design) */}
          <div className="mt-auto pt-12 flex flex-wrap justify-center gap-8 text-[10px] tracking-[2px] text-[#444] font-sans uppercase">
             <span>By Pawel Gola</span>
             <span className="flex items-center gap-2"><div className="w-1 h-1 bg-[#444] rotate-45" /> Licensing</span>
             <span className="flex items-center gap-2"><div className="w-1 h-1 bg-[#444] rotate-45" /> Styleguide</span>
          </div>
        </div>

      </div>
    </section>
  );
}
