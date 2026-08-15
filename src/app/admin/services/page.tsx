'use client';

import { useState, useEffect } from 'react';
import { Layers, Plus, Edit2, Trash2, Upload, X } from 'lucide-react';

export default function AdminServicesPage() {
  const [services, setServices] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingItem, setEditingItem] = useState<any>(null);
  const [uploading, setUploading] = useState(false);

  const fetchServices = async () => {
    try {
      const res = await fetch('/api/admin/services');
      const data = await res.json();
      if (Array.isArray(data)) setServices(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchServices();
  }, []);

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    const formData = new FormData();
    formData.append('file', file);

    try {
      const res = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });
      const data = await res.json();
      if (data.url) {
        setEditingItem({ ...editingItem, image: data.url });
      }
    } catch (err) {
      console.error(err);
      alert('Upload failed');
    } finally {
      setUploading(false);
    }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const isNew = !editingItem._id;
      const url = isNew ? '/api/admin/services' : `/api/admin/services/${editingItem._id}`;
      const method = isNew ? 'POST' : 'PUT';

      const payload = {
        ...editingItem,
        navTitle: editingItem.navTitle || editingItem.name,
        title: editingItem.title || editingItem.name,
      };

      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      if (!res.ok || data.error) {
        alert(`Failed to save service: ${data.error || 'Server error'}`);
        return;
      }

      setEditingItem(null);
      fetchServices();
    } catch (err: any) {
      console.error(err);
      alert(`Error saving service: ${err.message}`);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Delete this service?')) return;
    try {
      await fetch(`/api/admin/services/${id}`, { method: 'DELETE' });
      fetchServices();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-black text-slate-900">Services Management</h1>
          <p className="text-xs text-slate-500 font-medium">Add, edit, or toggle published status for all cleaning services.</p>
        </div>
        <button
          onClick={() =>
            setEditingItem({
              id: `service-${Date.now()}`,
              slug: `service-${Date.now()}`,
              name: '',
              navTitle: '',
              category: 'GENERAL',
              shortDesc: '',
              fullDesc: '',
              startingPrice: '$27',
              unit: 'per room',
              image: '/pictures/real_image_1.jpeg',
              differentiators: [],
              processSteps: [],
              pricingNotes: [],
              displayOrder: services.length,
              published: true,
            })
          }
          className="px-4 py-2.5 rounded-xl bg-[#10b981] hover:bg-[#059669] text-white font-black text-xs uppercase flex items-center gap-2 shadow-sm"
        >
          <Plus className="w-4 h-4" />
          <span>Add New Service</span>
        </button>
      </div>

      {/* Edit Modal / Form Drawer */}
      {editingItem && (
        <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-xl space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <h2 className="text-base font-black text-slate-900">{editingItem._id ? 'Edit Service' : 'New Service'}</h2>
            <button onClick={() => setEditingItem(null)} className="text-slate-400 hover:text-slate-700"><X className="w-5 h-5" /></button>
          </div>

          <form onSubmit={handleSave} className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
            <div>
              <label className="text-slate-700 font-bold">Service Name</label>
              <input
                type="text"
                required
                value={editingItem.name || ''}
                onChange={(e) => setEditingItem({ ...editingItem, name: e.target.value })}
                className="w-full bg-slate-50 border border-slate-300 rounded-xl p-2.5 text-slate-900 font-bold mt-1"
              />
            </div>

            <div>
              <label className="text-slate-700 font-bold">URL Slug</label>
              <input
                type="text"
                required
                value={editingItem.slug || ''}
                onChange={(e) => setEditingItem({ ...editingItem, slug: e.target.value })}
                className="w-full bg-slate-50 border border-slate-300 rounded-xl p-2.5 text-slate-900 font-bold mt-1"
              />
            </div>

            <div>
              <label className="text-slate-700 font-bold">Starting Price</label>
              <input
                type="text"
                required
                value={editingItem.startingPrice || ''}
                onChange={(e) => setEditingItem({ ...editingItem, startingPrice: e.target.value })}
                className="w-full bg-slate-50 border border-slate-300 rounded-xl p-2.5 text-slate-900 font-bold mt-1"
              />
            </div>

            <div>
              <label className="text-slate-700 font-bold">Unit / Billing Rate</label>
              <input
                type="text"
                required
                value={editingItem.unit || ''}
                onChange={(e) => setEditingItem({ ...editingItem, unit: e.target.value })}
                className="w-full bg-slate-50 border border-slate-300 rounded-xl p-2.5 text-slate-900 font-bold mt-1"
              />
            </div>

            <div className="md:col-span-2">
              <label className="text-slate-700 font-bold">Short Description</label>
              <textarea
                required
                rows={2}
                value={editingItem.shortDesc || ''}
                onChange={(e) => setEditingItem({ ...editingItem, shortDesc: e.target.value })}
                className="w-full bg-slate-50 border border-slate-300 rounded-xl p-2.5 text-slate-900 font-bold mt-1"
              />
            </div>

            <div className="md:col-span-2">
              <label className="text-slate-700 font-bold">Full Description</label>
              <textarea
                required
                rows={4}
                value={editingItem.fullDesc || ''}
                onChange={(e) => setEditingItem({ ...editingItem, fullDesc: e.target.value })}
                className="w-full bg-slate-50 border border-slate-300 rounded-xl p-2.5 text-slate-900 font-bold mt-1"
              />
            </div>

            <div className="md:col-span-2 space-y-1">
              <label className="text-slate-700 font-bold">Service Image URL (R2 Cloud Storage)</label>
              <div className="flex gap-2 items-center">
                <input
                  type="text"
                  required
                  value={editingItem.image || ''}
                  onChange={(e) => setEditingItem({ ...editingItem, image: e.target.value })}
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl p-2.5 text-slate-900 font-bold"
                />
                <label className="px-4 py-2.5 bg-sky-600 hover:bg-sky-500 text-white rounded-xl cursor-pointer font-bold flex items-center gap-1.5 whitespace-nowrap shadow-xs">
                  <Upload className="w-4 h-4" />
                  <span>{uploading ? 'Uploading...' : 'Upload File'}</span>
                  <input type="file" accept="image/*" onChange={handleFileUpload} className="hidden" />
                </label>
              </div>
            </div>

            <div className="md:col-span-2 flex justify-end gap-3 pt-2">
              <button type="button" onClick={() => setEditingItem(null)} className="px-4 py-2 rounded-xl bg-slate-100 text-slate-700 font-bold">Cancel</button>
              <button type="submit" className="px-6 py-2 rounded-xl bg-[#10b981] text-white font-black">Save Service</button>
            </div>
          </form>
        </div>
      )}

      {/* Services List Table */}
      <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-sm overflow-x-auto">
        <table className="w-full text-left text-xs">
          <thead>
            <tr className="border-b border-slate-200 bg-slate-50 text-slate-700 font-black uppercase">
              <th className="py-3 px-3">Service</th>
              <th className="py-3 px-3">Category</th>
              <th className="py-3 px-3">Price</th>
              <th className="py-3 px-3">Status</th>
              <th className="py-3 px-3 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {services.map((s) => (
              <tr key={s._id} className="hover:bg-slate-50 transition-colors">
                <td className="py-4 px-3 font-bold text-slate-900 flex items-center gap-3">
                  <img src={s.image} alt={s.name} className="w-10 h-10 rounded-lg object-cover border border-slate-200" />
                  <div>
                    <div>{s.name}</div>
                    <div className="text-[11px] text-slate-400">/services/{s.slug}</div>
                  </div>
                </td>
                <td className="py-4 px-3 text-slate-600 font-semibold">{s.category}</td>
                <td className="py-4 px-3 font-bold text-[#10b981]">{s.startingPrice} {s.unit}</td>
                <td className="py-4 px-3">
                  <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase ${s.published ? 'bg-emerald-50 text-[#10b981] border border-emerald-200' : 'bg-slate-100 text-slate-500'}`}>
                    {s.published ? 'Published' : 'Draft'}
                  </span>
                </td>
                <td className="py-4 px-3 text-right space-x-2">
                  <button onClick={() => setEditingItem(s)} className="p-1.5 rounded-lg bg-sky-50 text-sky-700 hover:bg-sky-100 border border-sky-200"><Edit2 className="w-4 h-4" /></button>
                  <button onClick={() => handleDelete(s._id)} className="p-1.5 rounded-lg bg-red-50 text-red-600 hover:bg-red-100 border border-red-200"><Trash2 className="w-4 h-4" /></button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
