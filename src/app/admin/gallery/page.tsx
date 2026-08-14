'use client';

import { useState, useEffect } from 'react';
import { Image as ImageIcon, Plus, Trash2, Upload } from 'lucide-react';

export default function AdminGalleryPage() {
  const [items, setItems] = useState<any[]>([]);
  const [uploading, setUploading] = useState(false);
  const [caption, setCaption] = useState('');

  const fetchItems = async () => {
    const res = await fetch('/api/admin/gallery');
    const data = await res.json();
    if (Array.isArray(data)) setItems(data);
  };

  useEffect(() => {
    fetchItems();
  }, []);

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    const fd = new FormData();
    fd.append('file', file);

    try {
      const uploadRes = await fetch('/api/upload', { method: 'POST', body: fd });
      const uploadData = await uploadRes.json();

      if (uploadData.url) {
        await fetch('/api/admin/gallery', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            url: uploadData.url,
            caption: caption || file.name,
            category: 'Carpet',
            displayOrder: items.length,
            published: true,
          }),
        });
        setCaption('');
        fetchItems();
      }
    } catch (err) {
      console.error(err);
    } finally {
      setUploading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Delete photo? File will be removed from Cloudflare R2.')) return;
    await fetch(`/api/admin/gallery/${id}`, { method: 'DELETE' });
    fetchItems();
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-black text-white">Photo Gallery ({items.length})</h1>
          <p className="text-xs text-slate-400 font-medium">Upload new job photos directly to Cloudflare R2.</p>
        </div>
      </div>

      <div className="bg-[#0b132b] border border-sky-900 rounded-3xl p-6 shadow-xl space-y-4 text-xs">
        <h2 className="font-black text-white">Upload New Photo</h2>
        <div className="flex flex-col sm:flex-row gap-3">
          <input
            type="text"
            placeholder="Photo Caption / Location (e.g. Carpet Steam Wash in Belconnen)"
            value={caption}
            onChange={(e) => setCaption(e.target.value)}
            className="flex-1 bg-slate-900 border border-sky-800 rounded-xl p-2.5 text-white"
          />
          <label className="px-5 py-2.5 bg-[#10b981] hover:bg-[#059669] text-white font-black uppercase rounded-xl cursor-pointer flex items-center justify-center gap-2 whitespace-nowrap">
            <Upload className="w-4 h-4" />
            <span>{uploading ? 'Uploading to R2...' : 'Select File & Upload'}</span>
            <input type="file" accept="image/*" onChange={handleUpload} className="hidden" />
          </label>
        </div>
      </div>

      <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-4">
        {items.map((item) => (
          <div key={item._id} className="bg-[#0b132b] border border-sky-900 rounded-2xl overflow-hidden group">
            <div className="relative h-44 w-full">
              <img src={item.url} alt={item.caption} className="w-full h-full object-cover" />
            </div>
            <div className="p-3 flex items-center justify-between gap-2 text-xs">
              <span className="font-bold text-white truncate">{item.caption}</span>
              <button onClick={() => handleDelete(item._id)} className="p-1.5 bg-red-950 text-red-300 rounded-lg flex-shrink-0"><Trash2 className="w-3.5 h-3.5" /></button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
