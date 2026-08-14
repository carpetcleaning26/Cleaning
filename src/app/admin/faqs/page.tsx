'use client';

import { useState, useEffect } from 'react';
import { HelpCircle, Plus, Trash2, Edit2, X } from 'lucide-react';

export default function AdminFaqsPage() {
  const [faqs, setFaqs] = useState<any[]>([]);
  const [editing, setEditing] = useState<any>(null);

  const fetchFaqs = async () => {
    const res = await fetch('/api/admin/faqs');
    const data = await res.json();
    if (Array.isArray(data)) setFaqs(data);
  };

  useEffect(() => {
    fetchFaqs();
  }, []);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    const isNew = !editing._id;
    const url = isNew ? '/api/admin/faqs' : `/api/admin/faqs/${editing._id}`;
    await fetch(url, {
      method: isNew ? 'POST' : 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(editing),
    });
    setEditing(null);
    fetchFaqs();
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Delete FAQ item?')) return;
    await fetch(`/api/admin/faqs/${id}`, { method: 'DELETE' });
    fetchFaqs();
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-black text-slate-900">Frequently Asked Questions ({faqs.length})</h1>
          <p className="text-xs text-slate-500 font-medium">Manage FAQ accordion items displayed across the site.</p>
        </div>
        <button
          onClick={() => setEditing({ id: `faq-${Date.now()}`, question: '', answer: '', category: 'pricing', displayOrder: faqs.length })}
          className="px-4 py-2.5 rounded-xl bg-[#10b981] text-white font-black text-xs uppercase flex items-center gap-2 shadow-xs"
        >
          <Plus className="w-4 h-4" />
          <span>Add FAQ</span>
        </button>
      </div>

      {editing && (
        <form onSubmit={handleSave} className="bg-white border border-slate-200 rounded-3xl p-6 shadow-xl space-y-4 text-xs">
          <div className="flex items-center justify-between border-b border-slate-100 pb-2">
            <h2 className="font-black text-slate-900">{editing._id ? 'Edit FAQ' : 'New FAQ'}</h2>
            <button type="button" onClick={() => setEditing(null)}><X className="w-4 h-4 text-slate-400" /></button>
          </div>
          <div>
            <label className="font-bold text-slate-700">Question</label>
            <input
              type="text"
              required
              value={editing.question}
              onChange={(e) => setEditing({ ...editing, question: e.target.value })}
              className="w-full bg-slate-50 border border-slate-300 rounded-xl p-2.5 text-slate-900 font-bold mt-1"
            />
          </div>
          <div>
            <label className="font-bold text-slate-700">Answer</label>
            <textarea
              required
              rows={3}
              value={editing.answer}
              onChange={(e) => setEditing({ ...editing, answer: e.target.value })}
              className="w-full bg-slate-50 border border-slate-300 rounded-xl p-2.5 text-slate-900 font-bold mt-1"
            />
          </div>
          <div>
            <label className="font-bold text-slate-700">Category</label>
            <select
              value={editing.category}
              onChange={(e) => setEditing({ ...editing, category: e.target.value })}
              className="w-full bg-slate-50 border border-slate-300 rounded-xl p-2.5 text-slate-900 font-bold mt-1"
            >
              <option value="pricing">Pricing</option>
              <option value="process">Process</option>
              <option value="carpet">Carpet Care</option>
              <option value="bond">End of Lease</option>
              <option value="general">General</option>
            </select>
          </div>
          <div className="flex justify-end gap-2">
            <button type="button" onClick={() => setEditing(null)} className="px-4 py-2 bg-slate-100 font-bold text-slate-700 rounded-xl">Cancel</button>
            <button type="submit" className="px-5 py-2 bg-[#10b981] font-black rounded-xl text-white">Save FAQ</button>
          </div>
        </form>
      )}

      <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-sm space-y-4">
        {faqs.map((f) => (
          <div key={f._id} className="p-4 rounded-2xl bg-slate-50 border border-slate-200 flex items-start justify-between gap-4 text-xs">
            <div className="space-y-1">
              <span className="px-2.5 py-0.5 rounded bg-sky-50 text-[#0284c7] font-black uppercase text-[10px] border border-sky-200">{f.category}</span>
              <h3 className="font-black text-slate-900 text-sm">{f.question}</h3>
              <p className="text-slate-600 leading-relaxed font-medium">{f.answer}</p>
            </div>
            <div className="flex gap-1">
              <button onClick={() => setEditing(f)} className="p-1.5 bg-sky-50 text-sky-700 rounded-lg border border-sky-200"><Edit2 className="w-4 h-4" /></button>
              <button onClick={() => handleDelete(f._id)} className="p-1.5 bg-red-50 text-red-600 rounded-lg border border-red-200"><Trash2 className="w-4 h-4" /></button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
