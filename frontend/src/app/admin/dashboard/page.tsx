'use client';

import { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

const API = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';

interface MenuItem {
  _id: string; name: string; description: string; price: number; category: string; imageUrl: string;
}
interface Reservation {
  _id: string; name: string; email: string; phone: string; guests: number; date: string; slot: string; status: string; createdAt: string;
}
interface OpeningHour {
  _id: string; dayRange: string; openTime: string; closeTime: string;
}
interface Blog {
  _id: string; title: string; slug: string; excerpt: string; content: string; imageUrl: string;
}

export default function AdminDashboard() {
  const router = useRouter();
  const [token, setToken] = useState('');
  const [activeTab, setActiveTab] = useState('menu');

  // Data states
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
  const [reservations, setReservations] = useState<Reservation[]>([]);
  const [hours, setHours] = useState<OpeningHour[]>([]);
  const [blogs, setBlogs] = useState<Blog[]>([]);

  // Modal states
  const [showMenuModal, setShowMenuModal] = useState(false);
  const [editingMenu, setEditingMenu] = useState<MenuItem | null>(null);
  const [showBlogModal, setShowBlogModal] = useState(false);
  const [editingBlog, setEditingBlog] = useState<Blog | null>(null);
  const [editingHour, setEditingHour] = useState<OpeningHour | null>(null);

  // Form states for modals
  const [menuImageUrl, setMenuImageUrl] = useState('');
  const [blogImageUrl, setBlogImageUrl] = useState('');

  const headers = useCallback(() => ({
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${token}`,
  }), [token]);

  useEffect(() => {
    const t = localStorage.getItem('admin_token');
    if (!t) { router.push('/admin'); return; }
    setToken(t);
  }, [router]);

  const fetchData = useCallback(async () => {
    if (!token) return;
    try {
      const [menuRes, resRes, hoursRes, blogsRes] = await Promise.all([
        fetch(`${API}/api/menu`),
        fetch(`${API}/api/admin/reservations`, { headers: { Authorization: `Bearer ${token}` } }),
        fetch(`${API}/api/hours`),
        fetch(`${API}/api/blogs`),
      ]);
      setMenuItems(await menuRes.json());
      setReservations(await resRes.json());
      setHours(await hoursRes.json());
      setBlogs(await blogsRes.json());
    } catch {
      console.error('Failed to fetch data');
    }
  }, [token]);

  useEffect(() => { if (token) fetchData(); }, [token, fetchData]);

  const logout = () => {
    localStorage.removeItem('admin_token');
    router.push('/admin');
  };

  // ─── Image Upload Helper ────────────────
  const [uploading, setUploading] = useState(false);
  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>, setter: (url: string) => void) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    const formData = new FormData();
    formData.append('image', file);
    try {
      const res = await fetch(`${API}/api/admin/upload`, {
        method: 'POST',
        headers: { 'Authorization': `Bearer ${token}` },
        body: formData,
      });
      if (!res.ok) {
        const text = await res.text();
        console.error('Upload failed on server', res.status, text);
        alert(`Upload failed: ${res.status} ${text}`);
      } else {
        const data = await res.json();
        setter(data.url);
      }
    } catch (err) {
      console.error('Network error during upload', err);
      alert('Network error during upload. Check console.');
    } finally {
      setUploading(false);
    }
  };

  // ─── Menu CRUD ───────────────────────────
  const handleMenuSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const body = {
      name: formData.get('name'),
      description: formData.get('description'),
      price: parseFloat(formData.get('price') as string),
      category: formData.get('category'),
      imageUrl: menuImageUrl,
    };
    if (editingMenu) {
      await fetch(`${API}/api/admin/menu/${editingMenu._id}`, { method: 'PUT', headers: headers(), body: JSON.stringify(body) });
    } else {
      await fetch(`${API}/api/admin/menu`, { method: 'POST', headers: headers(), body: JSON.stringify(body) });
    }
    setShowMenuModal(false);
    setEditingMenu(null);
    fetchData();
  };

  const deleteMenuItem = async (id: string) => {
    if (!confirm('Delete this item?')) return;
    await fetch(`${API}/api/admin/menu/${id}`, { method: 'DELETE', headers: headers() });
    fetchData();
  };

  // ─── Blog CRUD ───────────────────────────
  const handleBlogSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const title = formData.get('title') as string;
    const slug = title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');
    const body = {
      title: title,
      slug: slug,
      excerpt: formData.get('excerpt'),
      content: formData.get('content'),
      imageUrl: blogImageUrl,
    };
    if (editingBlog) {
      await fetch(`${API}/api/admin/blogs/${editingBlog._id}`, { method: 'PUT', headers: headers(), body: JSON.stringify(body) });
    } else {
      await fetch(`${API}/api/admin/blogs`, { method: 'POST', headers: headers(), body: JSON.stringify(body) });
    }
    setShowBlogModal(false);
    setEditingBlog(null);
    fetchData();
  };

  const deleteBlog = async (id: string) => {
    if (!confirm('Delete this blog?')) return;
    await fetch(`${API}/api/admin/blogs/${id}`, { method: 'DELETE', headers: headers() });
    fetchData();
  };

  // ─── Hours Update ────────────────────────
  const handleHoursSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!editingHour) return;
    const formData = new FormData(e.currentTarget);
    const body = {
      openTime: formData.get('openTime'),
      closeTime: formData.get('closeTime'),
    };
    await fetch(`${API}/api/admin/hours/${editingHour._id}`, { method: 'PUT', headers: headers(), body: JSON.stringify(body) });
    setEditingHour(null);
    fetchData();
  };

  return (
    <div className="min-h-screen bg-[var(--bg-primary)] p-6">
      {/* Top Bar */}
      <div className="max-w-[1200px] mx-auto flex justify-between items-center mb-8">
        <div className="flex items-center gap-6">
          <Link href="/" className="font-forum text-2xl text-off-white no-underline tracking-[3px]">
            QITCHEN
          </Link>
          <span className="text-[#666] font-sans text-[13px] uppercase tracking-wider">
            Admin Dashboard
          </span>
        </div>
        <button 
          onClick={logout} 
          className="px-6 py-2.5 bg-transparent text-off-white border border-[var(--border-color)] rounded-lg font-sans text-[12px] font-semibold tracking-wider hover:bg-white/5 transition-colors"
        >
          LOGOUT
        </button>
      </div>

      {/* Tabs */}
      <div className="max-w-[1200px] mx-auto mb-8 flex gap-2 flex-wrap">
        {['menu', 'reservations', 'hours', 'blogs'].map(tab => (
          <button 
            key={tab} 
            onClick={() => setActiveTab(tab)} 
            className={`px-6 py-2.5 rounded-lg font-sans text-[12px] font-medium tracking-widest transition-all border
              ${activeTab === tab 
                ? 'bg-off-white text-[var(--bg-primary)] border-off-white' 
                : 'bg-transparent text-off-white border-[var(--border-color)] hover:bg-white/5'}`}
          >
            {tab.toUpperCase()}
          </button>
        ))}
      </div>

      <div className="max-w-[1200px] mx-auto">
        {/* ─── MENU TAB ───────────── */}
        {activeTab === 'menu' && (
          <div className="animate-in fade-in duration-500">
            <div className="flex justify-between items-center mb-6">
              <h2 className="font-forum text-3xl text-white">Menu Items</h2>
              <button 
                onClick={() => { setEditingMenu(null); setMenuImageUrl(''); setShowMenuModal(true); }} 
                className="px-6 py-2.5 bg-off-white text-[var(--bg-primary)] rounded-lg font-sans text-[12px] font-semibold tracking-widest hover:bg-white transition-opacity"
              >
                + ADD ITEM
              </button>
            </div>
            <div className="grid grid-cols-1 gap-3">
              {menuItems.map(item => (
                <div key={item._id} className="bg-[var(--bg-card)] border border-[var(--border-color)] rounded-xl p-5 group">
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-1.5">
                        <span className="font-sans text-[10px] text-[var(--accent-gold)] tracking-widest bg-[var(--accent-gold)]/10 px-2 py-1 rounded-md uppercase">
                          {item.category}
                        </span>
                      </div>
                      <h3 className="font-forum text-xl text-white mb-1.5">{item.name}</h3>
                      <p className="font-sans text-[13px] text-[#666] mb-3 max-w-2xl">{item.description}</p>
                      <p className="font-forum text-lg text-off-white">${item.price.toFixed(2)}</p>
                    </div>
                    <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button 
                        onClick={() => { setEditingMenu(item); setMenuImageUrl(item.imageUrl); setShowMenuModal(true); }} 
                        className="px-4 py-2 bg-transparent text-off-white border border-[var(--border-color)] rounded-md font-sans text-[11px] font-medium tracking-wider hover:bg-white/5 transition-colors"
                      >
                        EDIT
                      </button>
                      <button 
                        onClick={() => deleteMenuItem(item._id)} 
                        className="px-4 py-2 bg-red-500/10 text-red-500 border border-red-500/20 rounded-md font-sans text-[11px] font-medium tracking-wider hover:bg-red-500 hover:text-white transition-all"
                      >
                        DELETE
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ─── RESERVATIONS TAB ───── */}
        {activeTab === 'reservations' && (
          <div className="animate-in fade-in duration-500">
            <h2 className="font-forum text-3xl text-white mb-6">Reservations</h2>
            {reservations.length === 0 ? (
              <p className="text-[#666] font-sans">No reservations yet.</p>
            ) : (
              <div className="grid grid-cols-1 gap-3">
                {reservations.map(r => (
                  <div key={r._id} className="bg-[var(--bg-card)] border border-[var(--border-color)] rounded-xl p-5">
                    <div className="flex justify-between items-start flex-wrap gap-4">
                      <div>
                        <h3 className="font-forum text-xl text-white mb-1.5">{r.name}</h3>
                        <p className="font-sans text-[13px] text-[#666] mb-1">
                          {r.email} &bull; {r.phone}
                        </p>
                        <p className="font-sans text-[13px] text-off-white">
                          {new Date(r.date).toLocaleDateString()} at <span className="text-[var(--accent-gold)]">{r.slot}</span> &bull; {r.guests} guest(s)
                        </p>
                      </div>
                      <div className="flex flex-col items-end">
                        <p className="font-sans text-[10px] text-[#444] uppercase tracking-widest">
                          Reserved on {new Date(r.createdAt).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* ─── HOURS TAB ─────────── */}
        {activeTab === 'hours' && (
          <div className="animate-in fade-in duration-500">
            <h2 className="font-forum text-3xl text-white mb-6">Opening Hours</h2>
            <div className="grid grid-cols-1 gap-3">
              {hours.map(h => (
                <div key={h._id} className="bg-[var(--bg-card)] border border-[var(--border-color)] rounded-xl p-5">
                  {editingHour?._id === h._id ? (
                    <form onSubmit={handleHoursSubmit} className="flex gap-4 items-end flex-wrap">
                      <div className="flex-1 min-w-[200px]">
                        <label className="font-sans text-[11px] text-[#666] block mb-2 uppercase tracking-widest">{h.dayRange}</label>
                        <div className="flex gap-3 items-center">
                          <input 
                            name="openTime" 
                            defaultValue={h.openTime} 
                            className="flex-1 px-4 py-2.5 bg-[var(--bg-secondary)] border border-[var(--border-color)] rounded-lg text-off-white font-sans text-sm outline-none focus:border-white transition-colors"
                          />
                          <span className="text-[#666]">&mdash;</span>
                          <input 
                            name="closeTime" 
                            defaultValue={h.closeTime} 
                            className="flex-1 px-4 py-2.5 bg-[var(--bg-secondary)] border border-[var(--border-color)] rounded-lg text-off-white font-sans text-sm outline-none focus:border-white transition-colors"
                          />
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <button type="submit" className="px-5 py-2.5 bg-off-white text-[var(--bg-primary)] rounded-lg font-sans text-[11px] font-semibold tracking-widest hover:bg-white transition-colors">
                          SAVE
                        </button>
                        <button type="button" onClick={() => setEditingHour(null)} className="px-5 py-2.5 bg-transparent text-off-white border border-[var(--border-color)] rounded-lg font-sans text-[11px] font-semibold tracking-widest hover:bg-white/5 transition-colors">
                          CANCEL
                        </button>
                      </div>
                    </form>
                  ) : (
                    <div className="flex justify-between items-center">
                      <div>
                        <h3 className="font-forum text-xl text-white mb-1.5">{h.dayRange}</h3>
                        <p className="font-sans text-[15px] text-off-white tracking-wide">{h.openTime} &ndash; {h.closeTime}</p>
                      </div>
                      <button 
                        onClick={() => setEditingHour(h)} 
                        className="px-4 py-2 bg-transparent text-off-white border border-[var(--border-color)] rounded-md font-sans text-[11px] font-medium tracking-wider hover:bg-white/5 transition-colors"
                      >
                        EDIT
                      </button>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ─── BLOGS TAB ─────────── */}
        {activeTab === 'blogs' && (
          <div className="animate-in fade-in duration-500">
            <div className="flex justify-between items-center mb-6">
              <h2 className="font-forum text-3xl text-white">Blog Posts</h2>
              <button 
                onClick={() => { setEditingBlog(null); setBlogImageUrl(''); setShowBlogModal(true); }} 
                className="px-6 py-2.5 bg-off-white text-[var(--bg-primary)] rounded-lg font-sans text-[12px] font-semibold tracking-widest hover:bg-white transition-opacity"
              >
                + ADD POST
              </button>
            </div>
            <div className="grid grid-cols-1 gap-3">
              {blogs.map(b => (
                <div key={b._id} className="bg-[var(--bg-card)] border border-[var(--border-color)] rounded-xl p-5 group">
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <h3 className="font-forum text-xl text-white mb-1.5 uppercase tracking-wide">{b.title}</h3>
                      <p className="font-sans text-[12px] text-[#666] tracking-widest italic">/{b.slug}</p>
                    </div>
                    <div className="flex gap-2">
                      <button 
                        onClick={() => { setEditingBlog(b); setBlogImageUrl(b.imageUrl); setShowBlogModal(true); }} 
                        className="px-4 py-2 bg-transparent text-off-white border border-[var(--border-color)] rounded-md font-sans text-[11px] font-medium tracking-wider hover:bg-white/5 transition-colors"
                      >
                        EDIT
                      </button>
                      <button 
                        onClick={() => deleteBlog(b._id)} 
                        className="px-4 py-2 bg-red-500/10 text-red-500 border border-red-500/20 rounded-md font-sans text-[11px] font-medium tracking-wider hover:bg-red-500 hover:text-white transition-all"
                      >
                        DELETE
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* ─── Menu Modal ────────── */}
      {showMenuModal && (
        <div 
          className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[1000] flex items-center justify-center p-6"
          onClick={() => { setShowMenuModal(false); setEditingMenu(null); }}
        >
          <div 
            className="bg-[var(--bg-secondary)] border border-[var(--border-color)] rounded-2xl p-8 w-full max-w-[600px] max-h-[90vh] overflow-y-auto animate-in zoom-in-95 duration-200"
            onClick={e => e.stopPropagation()}
          >
            <h3 className="font-forum text-2xl text-white mb-8 uppercase tracking-widest">
              {editingMenu ? 'Edit Menu Item' : 'Add Menu Item'}
            </h3>
            <form onSubmit={handleMenuSubmit} className="flex flex-col gap-4">
              <input name="name" placeholder="Name" defaultValue={editingMenu?.name} required className="w-full px-4 py-3 bg-[var(--bg-primary)] border border-[var(--border-color)] rounded-lg text-off-white font-sans text-sm focus:border-white outline-none transition-colors" />
              <input name="category" placeholder="Category (e.g. MAKI)" defaultValue={editingMenu?.category} required className="w-full px-4 py-3 bg-[var(--bg-primary)] border border-[var(--border-color)] rounded-lg text-off-white font-sans text-sm focus:border-white outline-none transition-colors" />
              <input name="price" type="number" step="0.01" placeholder="Price" defaultValue={editingMenu?.price} required className="w-full px-4 py-3 bg-[var(--bg-primary)] border border-[var(--border-color)] rounded-lg text-off-white font-sans text-sm focus:border-white outline-none transition-colors" />
              <textarea name="description" placeholder="Description" defaultValue={editingMenu?.description} required className="w-full px-4 py-3 bg-[var(--bg-primary)] border border-[var(--border-color)] rounded-lg text-off-white font-sans text-sm focus:border-white outline-none transition-colors min-h-[100px] resize-none" />
              
              <div className="mb-4">
                <label className="block mb-2 text-[#666] font-sans text-[11px] uppercase tracking-widest">IMAGE</label>
                <div className="relative group/upload">
                  <input 
                    type="file" 
                    accept="image/*" 
                    onChange={(e) => handleFileUpload(e, setMenuImageUrl)}
                    className="w-full px-4 py-3 bg-[var(--bg-primary)] border border-[var(--border-color)] rounded-lg text-[#444] font-sans text-xs focus:border-white outline-none transition-colors file:mr-4 file:py-1 file:px-3 file:rounded-full file:border-0 file:text-[10px] file:font-semibold file:bg-white/10 file:text-off-white hover:file:bg-white/20" 
                  />
                </div>
                {menuImageUrl && (
                  <div className="mt-4 relative aspect-video rounded-xl overflow-hidden border border-[var(--border-color)]">
                    <img src={menuImageUrl} className="w-full h-full object-cover" alt="Preview" />
                  </div>
                )}
              </div>

              <div className="flex gap-3 mt-4">
                <button 
                  type="submit" 
                  disabled={uploading} 
                  className={`flex-1 py-3.5 bg-off-white text-[var(--bg-primary)] rounded-lg font-sans text-[12px] font-bold tracking-widest transition-all
                    ${uploading ? 'opacity-50 cursor-not-allowed' : 'hover:bg-white active:scale-[0.98]'}`}
                >
                  {uploading ? 'UPLOADING...' : (editingMenu ? 'UPDATE ITEM' : 'CREATE ITEM')}
                </button>
                <button 
                  type="button" 
                  onClick={() => { setShowMenuModal(false); setEditingMenu(null); }} 
                  className="px-8 py-3.5 bg-transparent text-off-white border border-[var(--border-color)] rounded-lg font-sans text-[12px] font-bold tracking-widest hover:bg-white/5 transition-colors"
                >
                  CANCEL
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ─── Blog Modal ────────── */}
      {showBlogModal && (
        <div 
          className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[1000] flex items-center justify-center p-6"
          onClick={() => { setShowBlogModal(false); setEditingBlog(null); }}
        >
          <div 
            className="bg-[var(--bg-secondary)] border border-[var(--border-color)] rounded-2xl p-8 w-full max-w-[700px] max-h-[90vh] overflow-y-auto animate-in zoom-in-95 duration-200"
            onClick={e => e.stopPropagation()}
          >
            <h3 className="font-forum text-2xl text-white mb-8 uppercase tracking-widest">
              {editingBlog ? 'Edit Blog Post' : 'Add Blog Post'}
            </h3>
            <form onSubmit={handleBlogSubmit} className="flex flex-col gap-4">
              <input name="title" placeholder="Post Title" defaultValue={editingBlog?.title} required className="w-full px-4 py-3 bg-[var(--bg-primary)] border border-[var(--border-color)] rounded-lg text-off-white font-sans text-sm focus:border-white outline-none transition-colors" />
              <input name="excerpt" placeholder="Short excerpt" defaultValue={editingBlog?.excerpt} className="w-full px-4 py-3 bg-[var(--bg-primary)] border border-[var(--border-color)] rounded-lg text-off-white font-sans text-sm focus:border-white outline-none transition-colors" />
              
              <div className="mb-4">
                <label className="block mb-2 text-[#666] font-sans text-[11px] uppercase tracking-widest">FEATURED IMAGE</label>
                <input 
                  type="file" 
                  accept="image/*" 
                  onChange={(e) => handleFileUpload(e, setBlogImageUrl)}
                  className="w-full px-4 py-3 bg-[var(--bg-primary)] border border-[var(--border-color)] rounded-lg text-[#444] font-sans text-xs focus:border-white outline-none transition-colors file:mr-4 file:py-1 file:px-3 file:rounded-full file:border-0 file:text-[10px] file:font-semibold file:bg-white/10 file:text-off-white hover:file:bg-white/20" 
                />
                {blogImageUrl && (
                  <div className="mt-4 relative aspect-[21/9] rounded-xl overflow-hidden border border-[var(--border-color)]">
                    <img src={blogImageUrl} className="w-full h-full object-cover" alt="Preview" />
                  </div>
                )}
              </div>

              <textarea name="content" placeholder="Blog content (supports markdown headers...)" defaultValue={editingBlog?.content} required className="w-full px-4 py-3 bg-[var(--bg-primary)] border border-[var(--border-color)] rounded-lg text-off-white font-sans text-sm focus:border-white outline-none transition-colors min-h-[300px] resize-none" />
              
              <div className="flex gap-3 mt-4">
                <button 
                  type="submit" 
                  disabled={uploading} 
                  className={`flex-1 py-3.5 bg-off-white text-[var(--bg-primary)] rounded-lg font-sans text-[12px] font-bold tracking-widest transition-all
                    ${uploading ? 'opacity-50 cursor-not-allowed' : 'hover:bg-white active:scale-[0.98]'}`}
                >
                   {uploading ? 'UPLOADING...' : (editingBlog ? 'UPDATE POST' : 'PUBLISH POST')}
                </button>
                <button 
                  type="button" 
                  onClick={() => { setShowBlogModal(false); setEditingBlog(null); }} 
                  className="px-8 py-3.5 bg-transparent text-off-white border border-[var(--border-color)] rounded-lg font-sans text-[12px] font-bold tracking-widest hover:bg-white/5 transition-colors"
                >
                  CANCEL
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
