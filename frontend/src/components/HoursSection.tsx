'use client';

import { useState, useEffect } from 'react';

interface OpeningHour {
  _id: string;
  dayRange: string;
  openTime: string;
  closeTime: string;
}

const API = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';

export default function HoursSection() {
  const [hours, setHours] = useState<OpeningHour[]>([]);

  useEffect(() => {
    fetch(`${API}/api/hours`)
      .then(res => res.json())
      .then(data => setHours(data))
      .catch(() => {});
  }, []);

  return (
    <section style={{
      padding: '120px 24px',
      maxWidth: '800px',
      margin: '0 auto',
      textAlign: 'center',
    }}>
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
        marginBottom: '48px',
      }}>
        OPENING HOURS
      </h2>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
        {hours.map(h => (
          <div key={h._id} style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: '20px 0',
            borderBottom: '1px solid var(--border-color)',
          }}>
            <span style={{
              fontFamily: 'var(--font-sans)',
              fontSize: '15px',
              color: 'var(--text-cream)',
              letterSpacing: '1px',
            }}>
              {h.dayRange}
            </span>
            <span style={{
              fontFamily: 'var(--font-serif)',
              fontSize: '20px',
              color: 'var(--text-white)',
              letterSpacing: '2px',
            }}>
              {h.openTime} – {h.closeTime}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
}
