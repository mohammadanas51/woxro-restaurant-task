'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

interface Blog {
  _id: string;
  title: string;
  slug: string;
  excerpt: string;
  imageUrl: string;
  createdAt: string;
}

const API = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';

export default function BlogPreview() {
  const [blogs, setBlogs] = useState<Blog[]>([]);

  useEffect(() => {
    fetch(`${API}/api/blogs`)
      .then(res => res.json())
      .then(data => setBlogs(data.slice(0, 2)))
      .catch(() => {});
  }, []);

  const formatDate = (d: string) => {
    const date = new Date(d);
    return date.toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' }).toUpperCase();
  };

  return (
    <section style={{
      padding: '120px 24px',
      maxWidth: '1400px',
      margin: '0 auto',
    }}>
      <div style={{ textAlign: 'center', marginBottom: '60px' }}>
        <div className="diamond-divider">
          <div className="diamond" />
        </div>
        <h2 style={{
          fontFamily: 'var(--font-serif)',
          fontSize: 'clamp(32px, 4vw, 52px)',
          fontWeight: 300,
          color: 'var(--text-white)',
          letterSpacing: '4px',
          marginTop: '16px',
        }}>
          BEHIND THE SCENES<br />& LATEST NEWS
        </h2>
      </div>

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))',
        gap: '32px',
      }}>
        {blogs.map((blog) => (
          <Link
            key={blog._id}
            href={`/blog/${blog.slug}`}
            style={{ textDecoration: 'none' }}
          >
            <div style={{
              borderRadius: 'var(--radius-lg)',
              overflow: 'hidden',
              border: '1px solid var(--border-color)',
              transition: 'all 0.4s ease',
              cursor: 'pointer',
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
              <div style={{ height: '280px', overflow: 'hidden' }}>
                <img
                  src={blog.imageUrl}
                  alt={blog.title}
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    transition: 'transform 0.6s ease',
                  }}
                  onMouseEnter={e => (e.target as HTMLElement).style.transform = 'scale(1.05)'}
                  onMouseLeave={e => (e.target as HTMLElement).style.transform = 'scale(1)'}
                />
              </div>
              <div style={{ padding: '28px' }}>
                <div className="diamond-divider" style={{ justifyContent: 'flex-start', marginBottom: '8px' }}>
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
                <h3 style={{
                  fontFamily: 'var(--font-serif)',
                  fontSize: '22px',
                  fontWeight: 600,
                  color: 'var(--text-white)',
                  letterSpacing: '1px',
                  lineHeight: 1.3,
                  marginBottom: '12px',
                }}>
                  {blog.title}
                </h3>
                <p style={{
                  fontFamily: 'var(--font-sans)',
                  fontSize: '13px',
                  color: 'var(--text-muted)',
                  lineHeight: 1.7,
                }}>
                  {blog.excerpt}
                </p>
              </div>
            </div>
          </Link>
        ))}
      </div>

      <div style={{ textAlign: 'center', marginTop: '48px' }}>
        <Link href="/blog" style={{
          fontFamily: 'var(--font-sans)',
          fontSize: '12px',
          fontWeight: 500,
          letterSpacing: '2px',
          textTransform: 'uppercase',
          color: 'var(--text-cream)',
          textDecoration: 'none',
          border: '1px solid var(--text-cream)',
          padding: '12px 32px',
          transition: 'all 0.3s',
        }}>
          VIEW ALL POSTS
        </Link>
      </div>
    </section>
  );
}
