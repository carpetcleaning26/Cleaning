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
          <h1 className="text-2xl font-black text-slate-900">Contact Messages</h1>
          <p className="text-xs text-slate-500 font-medium">Inquiries received from the Contact page form.</p>
        </div>
      </div>

      <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-sm overflow-x-auto">
        {loading ? (
          <div className="text-xs text-slate-500 py-8 text-center">Loading contact messages...</div>
        ) : contacts.length === 0 ? (
          <div className="text-xs text-slate-500 py-8 text-center">No contact messages received yet.</div>
        ) : (
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-slate-200 bg-slate-50 text-slate-700 font-black uppercase">
                <th className="py-3 px-3">Sender</th>
                <th className="py-3 px-3">Contact Details</th>
                <th className="py-3 px-3">Message Body</th>
                <th className="py-3 px-3">Date</th>
                <th className="py-3 px-3">Status</th>
                <th className="py-3 px-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-medium">
              {contacts.map((c) => (
                <tr key={c._id} className="hover:bg-slate-50 transition-colors">
                  <td className="py-4 px-3 font-bold text-slate-900">{c.name}</td>
                  <td className="py-4 px-3 text-slate-700">
                    <div>{c.email}</div>
                    <div className="text-[11px] text-slate-500">{c.phone || 'No phone'} • {c.suburb || 'No suburb'}</div>
                  </td>
                  <td className="py-4 px-3 text-slate-700 max-w-xs leading-relaxed">{c.message}</td>
                  <td className="py-4 px-3 text-slate-500">{new Date(c.createdAt).toLocaleDateString()}</td>
                  <td className="py-4 px-3">
                    <select
                      value={c.status}
                      onChange={(e) => updateStatus(c._id, e.target.value)}
                      className="bg-slate-50 border border-slate-300 text-slate-900 rounded-lg px-2.5 py-1 text-xs font-bold"
                    >
                      <option value="new">New</option>
                      <option value="read">Read</option>
                      <option value="replied">Replied</option>
                    </select>
                  </td>
                  <td className="py-4 px-3 text-right">
                    <button
                      onClick={() => deleteContact(c._id)}
                      className="p-1.5 rounded-lg bg-red-50 border border-red-200 text-red-600 hover:bg-red-100 transition-colors"
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
