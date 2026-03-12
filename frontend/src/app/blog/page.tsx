'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

interface Blog {
  _id: string;
  title: string;
  slug: string;
  excerpt: string;
  imageUrl: string;
  createdAt: string;
}

const API = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';

export default function BlogListPage() {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${API}/api/blogs`)
      .then(res => res.json())
      .then(data => { setBlogs(data); setLoading(false); })
      .catch(() => setLoading(false));
  }, []);

  const formatDate = (d: string) => {
    const date = new Date(d);
    return date.toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' }).toUpperCase();
  };

  return (
    <>
      <Header />
      <main style={{ paddingTop: '120px', minHeight: '100vh' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 24px' }}>
          {/* Page Header */}
          <div style={{ textAlign: 'center', marginBottom: '80px' }}>
            <div className="diamond-divider">
              <div className="diamond" />
            </div>
            <h1 style={{
              fontFamily: 'var(--font-serif)',
              fontSize: 'clamp(40px, 6vw, 72px)',
              fontWeight: 300,
              color: 'var(--text-white)',
              letterSpacing: '4px',
              marginTop: '16px',
            }}>
              BEHIND THE SCENES<br />& LATEST NEWS
            </h1>
          </div>

          {/* Loading */}
          {loading && (
            <div style={{ textAlign: 'center', padding: '60px' }}>
              <div style={{
                width: '40px', height: '40px',
                border: '2px solid var(--border-color)',
                borderTopColor: 'var(--text-cream)',
                borderRadius: '50%',
                animation: 'spin 0.8s linear infinite',
                margin: '0 auto',
              }} />
              <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
            </div>
          )}

          {/* Blog Grid */}
          {!loading && (
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))',
              gap: '32px',
              paddingBottom: '80px',
            }}>
              {blogs.map((blog, idx) => (
                <Link
                  key={blog._id}
                  href={`/blog/${blog._id}`}
                  style={{
                    textDecoration: 'none',
                    opacity: 0,
                    animation: `fadeInUp 0.6s ease-out ${idx * 0.15}s forwards`,
                  }}
                >
                  <article style={{
                    borderRadius: 'var(--radius-lg)',
                    overflow: 'hidden',
                    border: '1px solid var(--border-color)',
                    transition: 'all 0.4s ease',
                    backgroundColor: 'var(--bg-card)',
                  }}
                    onMouseEnter={e => {
                      (e.currentTarget as HTMLElement).style.borderColor = 'var(--text-cream)';
                      (e.currentTarget as HTMLElement).style.transform = 'translateY(-4px)';
                    }}
                    onMouseLeave={e => {
                      (e.currentTarget as HTMLElement).style.borderColor = 'var(--border-color)';
                      (e.currentTarget as HTMLElement).style.transform = 'translateY(0)';
                    }}
                  >
                    <div style={{ height: '300px', overflow: 'hidden' }}>
                      <img
                        src={blog.imageUrl}
                        alt={blog.title}
                        style={{
                          width: '100%', height: '100%', objectFit: 'cover',
                          transition: 'transform 0.6s ease',
                        }}
                      />
                    </div>
                    <div style={{ padding: '32px' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px' }}>
                        <div className="diamond" style={{ width: '6px', height: '6px' }} />
                        <span style={{
                          fontFamily: 'var(--font-sans)',
                          fontSize: '11px',
                          color: 'var(--text-muted)',
                          letterSpacing: '2px',
                        }}>
                          {formatDate(blog.createdAt)}
                        </span>
                      </div>
                      <h2 style={{
                        fontFamily: 'var(--font-serif)',
                        fontSize: '24px',
                        fontWeight: 600,
                        color: 'var(--text-white)',
                        letterSpacing: '1px',
                        lineHeight: 1.3,
                        marginBottom: '12px',
                      }}>
                        {blog.title}
                      </h2>
                      <p style={{
                        fontFamily: 'var(--font-sans)',
                        fontSize: '14px',
                        color: 'var(--text-muted)',
                        lineHeight: 1.7,
                      }}>
                        {blog.excerpt}
                      </p>
                    </div>
                  </article>
                </Link>
              ))}
            </div>
          )}

          {!loading && blogs.length === 0 && (
            <p style={{
              textAlign: 'center',
              color: 'var(--text-muted)',
              fontFamily: 'var(--font-sans)',
              fontSize: '15px',
              padding: '60px',
            }}>
              No blog posts yet. Check back soon!
            </p>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}
