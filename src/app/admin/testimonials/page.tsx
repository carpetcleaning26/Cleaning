'use client';

import { useState, useEffect } from 'react';
import { Star, Plus, Edit2, Trash2, X } from 'lucide-react';

export default function AdminTestimonialsPage() {
  const [items, setItems] = useState<any[]>([]);
  const [editing, setEditing] = useState<any>(null);

  const fetchItems = async () => {
    const res = await fetch('/api/admin/testimonials');
    const data = await res.json();
    if (Array.isArray(data)) setItems(data);
  };

  useEffect(() => {
    fetchItems();
  }, []);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    const isNew = !editing._id;
    await fetch(isNew ? '/api/admin/testimonials' : `/api/admin/testimonials/${editing._id}`, {
      method: isNew ? 'POST' : 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(editing),
    });
    setEditing(null);
    fetchItems();
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Delete review?')) return;
    await fetch(`/api/admin/testimonials/${id}`, { method: 'DELETE' });
    fetchItems();
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-black text-white">Customer Reviews ({items.length})</h1>
          <p className="text-xs text-slate-400 font-medium">Manage customer testimonials and star ratings.</p>
        </div>
        <button
          onClick={() => setEditing({ id: `r-${Date.now()}`, author: '', suburb: 'Gungahlin', rating: 5, date: 'Recent', service: 'Carpet Steam Cleaning', comment: '', published: true })}
          className="px-4 py-2.5 rounded-xl bg-[#10b981] text-white font-black text-xs uppercase flex items-center gap-2"
        >
          <Plus className="w-4 h-4" />
          <span>Add Testimonial</span>
        </button>
      </div>

      {editing && (
        <form onSubmit={handleSave} className="bg-[#0b132b] border border-sky-800 rounded-3xl p-6 shadow-xl space-y-4 text-xs">
          <div className="flex items-center justify-between border-b border-sky-900 pb-2">
            <h2 className="font-black text-white">{editing._id ? 'Edit Testimonial' : 'New Testimonial'}</h2>
            <button type="button" onClick={() => setEditing(null)}><X className="w-4 h-4 text-slate-400" /></button>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="font-bold text-slate-300">Customer Name</label>
              <input type="text" required value={editing.author} onChange={(e) => setEditing({ ...editing, author: e.target.value })} className="w-full bg-slate-900 border border-sky-800 rounded-xl p-2.5 text-white mt-1" />
            </div>
            <div>
              <label className="font-bold text-slate-300">Suburb</label>
              <input type="text" required value={editing.suburb} onChange={(e) => setEditing({ ...editing, suburb: e.target.value })} className="w-full bg-slate-900 border border-sky-800 rounded-xl p-2.5 text-white mt-1" />
            </div>
          </div>
          <div>
            <label className="font-bold text-slate-300">Review Text</label>
            <textarea required rows={3} value={editing.comment} onChange={(e) => setEditing({ ...editing, comment: e.target.value })} className="w-full bg-slate-900 border border-sky-800 rounded-xl p-2.5 text-white mt-1" />
          </div>
          <div className="flex justify-end gap-2">
            <button type="button" onClick={() => setEditing(null)} className="px-4 py-2 bg-slate-800 rounded-xl">Cancel</button>
            <button type="submit" className="px-5 py-2 bg-[#10b981] font-black rounded-xl text-white">Save</button>
          </div>
        </form>
      )}

      <div className="grid md:grid-cols-2 gap-6">
        {items.map((item) => (
          <div key={item._id} className="bg-[#0b132b] border border-sky-900 rounded-3xl p-6 space-y-3 text-xs">
            <div className="flex items-center justify-between">
              <div>
                <div className="font-black text-white text-sm">{item.author}</div>
                <div className="text-[11px] text-slate-400">{item.suburb} • {item.service}</div>
              </div>
              <div className="flex gap-1">
                <button onClick={() => setEditing(item)} className="p-1.5 bg-sky-900 text-sky-200 rounded-lg"><Edit2 className="w-4 h-4" /></button>
                <button onClick={() => handleDelete(item._id)} className="p-1.5 bg-red-950 text-red-300 rounded-lg"><Trash2 className="w-4 h-4" /></button>
              </div>
            </div>
            <p className="text-slate-300 leading-relaxed font-medium">"{item.comment}"</p>
          </div>
        ))}
      </div>
    </div>
  );
}
