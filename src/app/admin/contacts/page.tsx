'use client';

import { useState, useEffect } from 'react';
import { MessageSquare, Trash2 } from 'lucide-react';

export default function AdminContactsPage() {
  const [contacts, setContacts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchContacts = async () => {
    try {
      const res = await fetch('/api/admin/contacts');
      const data = await res.json();
      if (Array.isArray(data)) setContacts(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchContacts();
  }, []);

  const updateStatus = async (id: string, newStatus: string) => {
    try {
      await fetch(`/api/admin/contacts/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus }),
      });
      fetchContacts();
    } catch (err) {
      console.error(err);
    }
  };

  const deleteContact = async (id: string) => {
    if (!confirm('Delete this message?')) return;
    try {
      await fetch(`/api/admin/contacts/${id}`, { method: 'DELETE' });
      fetchContacts();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-black text-white">Contact Messages</h1>
          <p className="text-xs text-slate-400 font-medium">Inquiries received from the Contact page form.</p>
        </div>
      </div>

      <div className="bg-[#0b132b] border border-sky-900 rounded-3xl p-6 shadow-xl overflow-x-auto">
        {loading ? (
          <div className="text-xs text-slate-400 py-8 text-center">Loading contact messages...</div>
        ) : contacts.length === 0 ? (
          <div className="text-xs text-slate-400 py-8 text-center">No contact messages received yet.</div>
        ) : (
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-sky-900 text-sky-300 font-black uppercase">
                <th className="pb-3 px-3">Sender</th>
                <th className="pb-3 px-3">Contact Details</th>
                <th className="pb-3 px-3">Message Body</th>
                <th className="pb-3 px-3">Date</th>
                <th className="pb-3 px-3">Status</th>
                <th className="pb-3 px-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-sky-900/60 font-medium">
              {contacts.map((c) => (
                <tr key={c._id} className="hover:bg-sky-900/20 transition-colors">
                  <td className="py-4 px-3 font-bold text-white">{c.name}</td>
                  <td className="py-4 px-3 text-slate-300">
                    <div>{c.email}</div>
                    <div className="text-[11px] text-slate-400">{c.phone || 'No phone'} • {c.suburb || 'No suburb'}</div>
                  </td>
                  <td className="py-4 px-3 text-slate-300 max-w-xs leading-relaxed">{c.message}</td>
                  <td className="py-4 px-3 text-slate-400">{new Date(c.createdAt).toLocaleDateString()}</td>
                  <td className="py-4 px-3">
                    <select
                      value={c.status}
                      onChange={(e) => updateStatus(c._id, e.target.value)}
                      className="bg-slate-900 border border-sky-800 text-white rounded-lg px-2 py-1 text-xs font-bold"
                    >
                      <option value="new">New</option>
                      <option value="read">Read</option>
                      <option value="replied">Replied</option>
                    </select>
                  </td>
                  <td className="py-4 px-3 text-right">
                    <button
                      onClick={() => deleteContact(c._id)}
                      className="p-1.5 rounded-lg bg-red-950/60 text-red-300 hover:bg-red-900 transition-colors"
                      title="Delete"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
