'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

interface Blog {
  _id: string;
  title: string;
  slug: string;
  content: string;
  imageUrl: string;
  createdAt: string;
}

const getAPI = () => {
  const url = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';
  return url.endsWith('/') ? url.slice(0, -1) : url;
};
const API = getAPI();

export default function BlogDetailPage() {
  const params = useParams();
  const [blog, setBlog] = useState<Blog | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    if (params.blogId) {
      fetch(`${API}/api/blogs/id/${params.blogId}`)
        .then(async res => {
          if (!res.ok) {
            const text = await res.text();
            console.error(`Fetch failed for blog ID ${params.blogId}: ${res.status}`, text);
            throw new Error(`HTTP error! status: ${res.status}`);
          }
          return res.json();
        })
        .then(data => {
          setBlog(data);
          setLoading(false);
        })
        .catch(err => {
          console.error('Failed to parse blog detail data:', err);
          setError(true);
          setLoading(false);
        });
    }
  }, [params.blogId]);

  const formatDate = (d: string) => {
    const date = new Date(d);
    return date.toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' }).toUpperCase();
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="w-10 h-10 border-2 border-white/10 border-t-white/60 rounded-full animate-spin" />
      </div>
    );
  }

  if (error || !blog) {
    return (
      <div className="min-h-screen bg-black flex flex-col items-center justify-center gap-8 p-6 text-center">
        <h1 className="font-forum text-6xl text-off-white uppercase">Post Not Found</h1>
        <Link href="/" className="px-8 py-3 border border-white/20 text-off-white font-sans text-xs tracking-widest uppercase hover:bg-white hover:text-black transition-colors rounded-full">
          Back to Home
        </Link>
      </div>
    );
  }

  return (
    <div className="bg-black min-h-screen selection:bg-white selection:text-black">
      <Header />
      
      <main className="grid grid-cols-1 lg:grid-cols-2 min-h-screen pt-20">
        
        {/* Left Column: Fixed Image Content */}
        <div className="relative h-[60vh] lg:h-auto lg:sticky lg:top-20 lg:bottom-0 overflow-hidden">
          {blog.imageUrl ? (
            <Image
              src={blog.imageUrl}
              alt={blog.title}
              fill
              unoptimized
              className="object-cover"
              priority
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-white/5 text-white/20 font-forum text-2xl uppercase tracking-widest">
              No Featured Image
            </div>
          )}
          {/* Decorative Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/30" />
          
          {/* Floating Navigation */}
          <div className="absolute top-12 left-12 flex items-center gap-6 z-20">
             <Link 
              href="/#blog" 
              className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center bg-black/40 backdrop-blur-md hover:bg-white hover:text-black transition-all group"
            >
              <span className="text-xl transition-transform group-hover:-translate-x-1">←</span>
            </Link>
             <div className="bg-black/40 backdrop-blur-md border border-white/10 px-6 py-2 rounded-full hidden md:block">
                <div className="flex gap-8 text-[11px] tracking-[2px] text-off-white font-sans uppercase">
                   <span className="opacity-40">Section</span>
                   <span className="text-white">Editorial</span>
                </div>
             </div>
          </div>

          <div className="absolute bottom-12 left-12 right-12 z-20 lg:hidden">
             <h1 className="font-forum text-4xl text-off-white leading-tight uppercase tracking-tight">
               {blog.title}
             </h1>
          </div>
        </div>

        {/* Right Column: Scrollable Content */}
        <div className="bg-[#080808] p-8 md:p-16 lg:p-24 flex flex-col gap-12 border-l border-white/5">
          
          <div className="flex flex-col gap-8 max-w-2xl mx-auto w-full">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="w-1.5 h-1.5 rotate-45 border border-white/30" />
                <span className="text-white/50 font-sans text-xs tracking-[4px] uppercase">
                  {formatDate(blog.createdAt)}
                </span>
              </div>
              <div className="flex items-center gap-4">
                 <span className="text-white/30 font-sans text-[10px] tracking-[2px] uppercase">Share</span>
                 <div className="flex gap-2">
                    <div className="w-6 h-6 rounded-full border border-white/10 flex items-center justify-center text-[10px] hover:bg-white hover:text-black transition-colors cursor-pointer text-white">𝕏</div>
                    <div className="w-6 h-6 rounded-full border border-white/10 flex items-center justify-center text-[10px] hover:bg-white hover:text-black transition-colors cursor-pointer text-white">f</div>
                 </div>
              </div>
            </div>

            <h1 className="hidden lg:block font-forum text-6xl text-off-white leading-[1.1] uppercase tracking-[-1px]">
              {blog.title}
            </h1>

            <div className="flex items-center gap-4 pt-4">
               <div className="w-10 h-10 rounded-full bg-white/10 border border-white/10 flex items-center justify-center font-forum text-white">Q</div>
               <div className="flex flex-col">
                  <span className="text-white/80 font-sans text-xs uppercase tracking-widest">Qitchen Editorial</span>
                  <span className="text-white/30 font-sans text-[10px] uppercase tracking-wider">Culinary Expert</span>
               </div>
            </div>
            
            <div className="h-px w-full bg-gradient-to-r from-white/20 to-transparent mt-4" />
          </div>

          <div className="max-w-2xl mx-auto w-full">
            <div className="font-sans text-white/70 text-lg leading-[1.9] space-y-10">
              {blog.content.split('\n\n').map((paragraph, idx) => {
                if (paragraph.startsWith('## ')) {
                  return (
                    <h2 key={idx} className="font-forum text-3xl text-off-white uppercase tracking-wider mt-16 mb-8 flex items-center gap-4">
                      <span className="w-8 h-px bg-white/20" />
                      {paragraph.replace('## ', '')}
                    </h2>
                  );
                }
                
                // First paragraph drop cap
                if (idx === 0) {
                   return (
                      <p key={idx} className="first-letter:text-7xl first-letter:font-forum first-letter:text-white first-letter:float-left first-letter:mr-4 first-letter:leading-[0.8] first-letter:mt-2">
                         {paragraph}
                      </p>
                   );
                }

                return (
                  <p key={idx}>
                    {paragraph}
                  </p>
                );
              })}
            </div>

            {/* Post Footer */}
            <div className="mt-24 pt-16 border-t border-white/10 flex flex-col md:flex-row justify-between items-start md:items-center gap-8">
               <div className="flex flex-wrap gap-6 text-[10px] tracking-[4px] text-white/30 font-sans uppercase">
                  <span className="flex items-center gap-2"><div className="w-1 h-1 bg-white/20 rotate-45" /> Tradition</span>
                  <span className="flex items-center gap-2"><div className="w-1 h-1 bg-white/20 rotate-45" /> Innovation</span>
               </div>
               <Link href="/#blog" className="px-10 py-4 rounded-full border border-white/10 hover:border-white transition-all text-white font-sans text-[10px] uppercase tracking-[3px] bg-white/5 backdrop-blur-sm">
                  Back to stories
               </Link>
            </div>
          </div>
          
        </div>

      </main>

      <Footer />
    </div>
  );
}
