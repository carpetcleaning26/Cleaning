'use client';

import { useState, useEffect } from 'react';
import { MapPin, Plus, Trash2, Search } from 'lucide-react';

export default function AdminSuburbsPage() {
  const [suburbs, setSuburbs] = useState<any[]>([]);
  const [search, setSearch] = useState('');
  const [newSub, setNewSub] = useState({ name: '', postcode: '2600', region: 'North Canberra', sameDayAvailable: true });

  const fetchSuburbs = async () => {
    const res = await fetch('/api/admin/suburbs');
    const data = await res.json();
    if (Array.isArray(data)) setSuburbs(data);
  };

  useEffect(() => {
    fetchSuburbs();
  }, []);

  const handleAdd = async (e: React.FormEvent) => {
    e.preventDefault();
    await fetch('/api/admin/suburbs', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newSub),
    });
    setNewSub({ name: '', postcode: '2600', region: 'North Canberra', sameDayAvailable: true });
    fetchSuburbs();
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Delete suburb?')) return;
    await fetch(`/api/admin/suburbs/${id}`, { method: 'DELETE' });
    fetchSuburbs();
  };

  const filtered = suburbs.filter((s) => s.name.toLowerCase().includes(search.toLowerCase()) || s.postcode.includes(search));

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-black text-white">Service Suburbs ({suburbs.length})</h1>
          <p className="text-xs text-slate-400 font-medium">Manage ACT service coverage suburbs and same-day availability.</p>
        </div>
      </div>

      {/* Add Form */}
      <form onSubmit={handleAdd} className="bg-[#0b132b] border border-sky-900 rounded-3xl p-6 shadow-xl grid grid-cols-1 sm:grid-cols-4 gap-4 text-xs">
        <input
          type="text"
          required
          placeholder="Suburb Name (e.g. Belconnen)"
          value={newSub.name}
          onChange={(e) => setNewSub({ ...newSub, name: e.target.value })}
          className="bg-slate-900 border border-sky-800 rounded-xl p-2.5 text-white"
        />
        <input
          type="text"
          required
          placeholder="Postcode (e.g. 2617)"
          value={newSub.postcode}
          onChange={(e) => setNewSub({ ...newSub, postcode: e.target.value })}
          className="bg-slate-900 border border-sky-800 rounded-xl p-2.5 text-white"
        />
        <select
          value={newSub.region}
          onChange={(e) => setNewSub({ ...newSub, region: e.target.value })}
          className="bg-slate-900 border border-sky-800 rounded-xl p-2.5 text-white"
        >
          <option value="North Canberra">North Canberra</option>
          <option value="Belconnen">Belconnen</option>
          <option value="Gungahlin">Gungahlin</option>
          <option value="South Canberra">South Canberra</option>
          <option value="Woden Valley">Woden Valley</option>
          <option value="Tuggeranong">Tuggeranong</option>
          <option value="Molonglo Valley">Molonglo Valley</option>
          <option value="Queanbeyan Region">Queanbeyan Region</option>
        </select>
        <button type="submit" className="py-2.5 rounded-xl bg-[#10b981] text-white font-black uppercase">Add Suburb</button>
      </form>

      {/* Search Input */}
      <div className="relative max-w-sm">
        <Search className="w-4 h-4 text-sky-400 absolute left-3.5 top-3" />
        <input
          type="text"
          placeholder="Search suburb or postcode..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full bg-[#0b132b] border border-sky-900 rounded-xl pl-10 pr-4 py-2.5 text-white text-xs"
        />
      </div>

      {/* Suburbs Table */}
      <div className="bg-[#0b132b] border border-sky-900 rounded-3xl p-6 shadow-xl overflow-x-auto">
        <table className="w-full text-left text-xs">
          <thead>
            <tr className="border-b border-sky-900 text-sky-300 font-black uppercase">
              <th className="pb-3 px-3">Suburb</th>
              <th className="pb-3 px-3">Postcode</th>
              <th className="pb-3 px-3">Region</th>
              <th className="pb-3 px-3 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-sky-900/60">
            {filtered.map((s) => (
              <tr key={s._id}>
                <td className="py-3 px-3 font-bold text-white">{s.name}</td>
                <td className="py-3 px-3 text-slate-300">{s.postcode}</td>
                <td className="py-3 px-3 text-[#0284c7] font-semibold">{s.region}</td>
                <td className="py-3 px-3 text-right">
                  <button onClick={() => handleDelete(s._id)} className="p-1.5 rounded-lg bg-red-950/60 text-red-300 hover:bg-red-900"><Trash2 className="w-4 h-4" /></button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
