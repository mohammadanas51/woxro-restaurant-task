'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import bookImage from '../assets/book a table image.png';

const API = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';

export default function ReservationSection() {
  const [form, setForm] = useState({
    name: '', phone: '', email: '', guests: '', date: '', slot: ''
  });
  const [slots, setSlots] = useState<string[]>([]);
  const [loadingSlots, setLoadingSlots] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  // Get today's date in YYYY-MM-DD for min attribute
  const today = new Date().toISOString().split('T')[0];

  useEffect(() => {
    if (form.date) {
      setLoadingSlots(true);
      setForm(prev => ({ ...prev, slot: '' }));
      fetch(`${API}/api/reservations/slots?date=${form.date}`)
        .then(res => res.json())
        .then(data => { setSlots(data); setLoadingSlots(false); })
        .catch(() => { setSlots([]); setLoadingSlots(false); });
    }
  }, [form.date]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSubmitting(true);

    try {
      const res = await fetch(`${API}/api/reservations`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || 'Failed to make reservation');
      }
      setSuccess(true);
      setForm({ name: '', phone: '', email: '', guests: '', date: '', slot: '' });
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Something went wrong');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section id="reservation" className="py-16 md:py-[120px] px-4 md:px-6 max-w-[1400px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 items-center">
      {/* Left: Image with Text Overlay */}
      <div className="h-[400px] sm:h-[500px] md:h-[700px] rounded-[var(--radius-xl)] overflow-hidden relative">
        <Image
          src={bookImage}
          alt="Book a table at Qitchen"
          className="w-full h-full object-cover"
          placeholder="blur"
        />
        <div className="absolute bottom-8 left-8 md:bottom-[60px] md:left-[60px] text-off-white font-forum text-6xl sm:text-8xl md:text-[112px] leading-[100%] pointer-events-none uppercase tracking-[2px] font-normal">
          BOOK<br />
          A TABLE
        </div>
      </div>

      {/* Right: Form */}
      <div className="p-6 sm:p-10 md:p-12 border border-[var(--border-color)] rounded-[var(--radius-xl)]">
        <div className="diamond-divider">
          <div className="diamond" />
        </div>
        <h2 className="font-serif text-[clamp(32px,4vw,52px)] font-light text-white tracking-[4px] text-center mt-4 mb-4 uppercase">
          RESERVATION
        </h2>
        <p className="text-center font-sans text-sm text-[var(--text-muted)] leading-[1.7] mb-10">
          Secure your spot at Qitchen, where exceptional sushi and a remarkable dining experience await.
        </p>

        {success ? (
          <div className="text-center p-10 border border-[var(--accent-gold)] rounded-[var(--radius-md)]">
            <p className="font-serif text-2xl text-white mb-3">
              Reservation Confirmed!
            </p>
            <p className="font-sans text-sm text-[var(--text-muted)]">
              We look forward to welcoming you. A confirmation has been noted.
            </p>
            <button
              onClick={() => setSuccess(false)}
              className="mt-6 px-8 py-3 border border-white text-white font-sans text-[12px] tracking-[2px] cursor-pointer transition-all hover:bg-white hover:text-black"
            >
              MAKE ANOTHER
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <input
              type="text"
              placeholder="Name"
              value={form.name}
              onChange={e => setForm({ ...form, name: e.target.value })}
              required
              className="w-full px-5 py-4 bg-transparent border border-[var(--border-color)] rounded-[4px] text-[var(--text-cream)] font-sans text-sm outline-none transition-colors focus:border-white"
            />
            <input
              type="tel"
              placeholder="Phone Number"
              value={form.phone}
              onChange={e => setForm({ ...form, phone: e.target.value })}
              required
              className="w-full px-5 py-4 bg-transparent border border-[var(--border-color)] rounded-[4px] text-[var(--text-cream)] font-sans text-sm outline-none transition-colors focus:border-white"
            />
            <input
              type="email"
              placeholder="Email"
              value={form.email}
              onChange={e => setForm({ ...form, email: e.target.value })}
              required
              className="w-full px-5 py-4 bg-transparent border border-[var(--border-color)] rounded-[4px] text-[var(--text-cream)] font-sans text-sm outline-none transition-colors focus:border-white"
            />
            <div className="grid grid-cols-2 gap-4">
              <input
                type="number"
                placeholder="Guests"
                min={1}
                max={20}
                value={form.guests}
                onChange={e => setForm({ ...form, guests: e.target.value })}
                required
                className="w-full px-5 py-4 bg-transparent border border-[var(--border-color)] rounded-[4px] text-[var(--text-cream)] font-sans text-sm outline-none transition-colors focus:border-white"
              />
              <input
                type="date"
                min={today}
                value={form.date}
                onChange={e => setForm({ ...form, date: e.target.value })}
                required
                className="w-full px-5 py-4 bg-transparent border border-[var(--border-color)] rounded-[4px] text-[var(--text-cream)] font-sans text-sm outline-none transition-colors focus:border-white dark:[color-scheme:dark]"
              />
            </div>

            {/* Slot Selection */}
            {form.date && (
              <div>
                <p className="font-sans text-[12px] text-[var(--text-muted)] tracking-wider mb-3 uppercase">
                  AVAILABLE TIME SLOTS
                </p>
                {loadingSlots ? (
                  <p className="text-[var(--text-muted)] text-[13px]">Loading slots...</p>
                ) : slots.length > 0 ? (
                  <div className="flex flex-wrap gap-2">
                    {slots.map(s => (
                      <button
                        key={s}
                        type="button"
                        onClick={() => setForm({ ...form, slot: s })}
                        className={`px-4 py-2 border transition-all rounded-[2px] font-sans text-[12px] cursor-pointer ${
                          form.slot === s 
                            ? 'bg-white text-black border-white' 
                            : 'bg-transparent text-white border-[var(--border-color)]'
                        }`}
                      >
                        {s}
                      </button>
                    ))}
                  </div>
                ) : (
                  <p className="text-[var(--text-muted)] text-[13px]">
                    No slots available for this date. Please try another day.
                  </p>
                )}
              </div>
            )}

            {error && (
              <p className="text-red-400 text-[13px] font-sans">
                {error}
              </p>
            )}

            <button
              type="submit"
              disabled={submitting || !form.slot}
              className={`p-4 border-none bg-white text-black font-sans text-[13px] font-semibold tracking-[3px] transition-all ${
                submitting || !form.slot ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer hover:bg-[#e6e1d3]'
              }`}
            >
              {submitting ? 'RESERVING...' : 'RESERVE'}
            </button>
          </form>
        )}
      </div>
    </section>
  );
}
