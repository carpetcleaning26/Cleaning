'use client';

import { useState, useEffect } from 'react';
import { FileText, Plus, Edit2, Trash2, Upload, X } from 'lucide-react';

export default function AdminBlogPage() {
  const [posts, setPosts] = useState<any[]>([]);
  const [editing, setEditing] = useState<any>(null);
  const [uploading, setUploading] = useState(false);

  const fetchPosts = async () => {
    const res = await fetch('/api/admin/blog');
    const data = await res.json();
    if (Array.isArray(data)) setPosts(data);
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    const fd = new FormData();
    fd.append('file', file);
    try {
      const res = await fetch('/api/upload', { method: 'POST', body: fd });
      const data = await res.json();
      if (data.url) setEditing({ ...editing, image: data.url });
    } catch (err) {
      console.error(err);
    } finally {
      setUploading(false);
    }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    const isNew = !editing._id;
    await fetch(isNew ? '/api/admin/blog' : `/api/admin/blog/${editing._id}`, {
      method: isNew ? 'POST' : 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(editing),
    });
    setEditing(null);
    fetchPosts();
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Delete blog post?')) return;
    await fetch(`/api/admin/blog/${id}`, { method: 'DELETE' });
    fetchPosts();
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-black text-white">Blog Articles ({posts.length})</h1>
          <p className="text-xs text-slate-400 font-medium">Create and publish ACT carpet cleaning articles and advice.</p>
        </div>
        <button
          onClick={() => setEditing({ id: `b-${Date.now()}`, slug: `article-${Date.now()}`, title: '', excerpt: '', content: '', author: 'Canberra Cleaning Expert', date: 'August 2026', readTime: '5 min read', category: 'Carpet Care', image: '/pictures/real_image_1.jpeg', published: true })}
          className="px-4 py-2.5 rounded-xl bg-[#10b981] text-white font-black text-xs uppercase flex items-center gap-2"
        >
          <Plus className="w-4 h-4" />
          <span>New Article</span>
        </button>
      </div>

      {editing && (
        <form onSubmit={handleSave} className="bg-[#0b132b] border border-sky-800 rounded-3xl p-6 shadow-xl space-y-4 text-xs">
          <div className="flex items-center justify-between border-b border-sky-900 pb-2">
            <h2 className="font-black text-white">{editing._id ? 'Edit Article' : 'New Article'}</h2>
            <button type="button" onClick={() => setEditing(null)}><X className="w-4 h-4 text-slate-400" /></button>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="font-bold text-slate-300">Title</label>
              <input type="text" required value={editing.title} onChange={(e) => setEditing({ ...editing, title: e.target.value })} className="w-full bg-slate-900 border border-sky-800 rounded-xl p-2.5 text-white mt-1" />
            </div>
            <div>
              <label className="font-bold text-slate-300">URL Slug</label>
              <input type="text" required value={editing.slug} onChange={(e) => setEditing({ ...editing, slug: e.target.value })} className="w-full bg-slate-900 border border-sky-800 rounded-xl p-2.5 text-white mt-1" />
            </div>
          </div>
          <div>
            <label className="font-bold text-slate-300">Excerpt</label>
            <textarea required rows={2} value={editing.excerpt} onChange={(e) => setEditing({ ...editing, excerpt: e.target.value })} className="w-full bg-slate-900 border border-sky-800 rounded-xl p-2.5 text-white mt-1" />
          </div>
          <div>
            <label className="font-bold text-slate-300">Full Content (Markdown / Text)</label>
            <textarea required rows={6} value={editing.content} onChange={(e) => setEditing({ ...editing, content: e.target.value })} className="w-full bg-slate-900 border border-sky-800 rounded-xl p-2.5 text-white mt-1" />
          </div>
          <div>
            <label className="font-bold text-slate-300">Cover Image URL (R2 Storage)</label>
            <div className="flex gap-2 items-center mt-1">
              <input type="text" required value={editing.image} onChange={(e) => setEditing({ ...editing, image: e.target.value })} className="w-full bg-slate-900 border border-sky-800 rounded-xl p-2.5 text-white" />
              <label className="px-4 py-2.5 bg-sky-900 text-white rounded-xl cursor-pointer font-bold flex items-center gap-1.5 whitespace-nowrap">
                <Upload className="w-4 h-4" />
                <span>{uploading ? 'Uploading...' : 'Upload'}</span>
                <input type="file" accept="image/*" onChange={handleUpload} className="hidden" />
              </label>
            </div>
          </div>
          <div className="flex justify-end gap-2">
            <button type="button" onClick={() => setEditing(null)} className="px-4 py-2 bg-slate-800 rounded-xl">Cancel</button>
            <button type="submit" className="px-5 py-2 bg-[#10b981] font-black rounded-xl text-white">Save Article</button>
          </div>
        </form>
      )}

      <div className="bg-[#0b132b] border border-sky-900 rounded-3xl p-6 shadow-xl space-y-4">
        {posts.map((post) => (
          <div key={post._id} className="p-4 rounded-2xl bg-slate-900/80 border border-sky-900 flex items-center justify-between gap-4 text-xs">
            <div className="flex items-center gap-3">
              <img src={post.image} alt={post.title} className="w-14 h-14 rounded-xl object-cover border border-sky-800" />
              <div>
                <h3 className="font-black text-white text-sm">{post.title}</h3>
                <div className="text-[11px] text-slate-400">{post.category} • {post.date} • /blog/{post.slug}</div>
              </div>
            </div>
            <div className="flex gap-1">
              <button onClick={() => setEditing(post)} className="p-1.5 bg-sky-900 text-sky-200 rounded-lg"><Edit2 className="w-4 h-4" /></button>
              <button onClick={() => handleDelete(post._id)} className="p-1.5 bg-red-950 text-red-300 rounded-lg"><Trash2 className="w-4 h-4" /></button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
