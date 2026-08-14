'use client';

import { useState, useEffect } from 'react';
import { FileSpreadsheet, Trash2, CheckCircle } from 'lucide-react';

export default function AdminQuotesPage() {
  const [quotes, setQuotes] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchQuotes = async () => {
    try {
      const res = await fetch('/api/admin/quotes');
      const data = await res.json();
      if (Array.isArray(data)) setQuotes(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchQuotes();
  }, []);

  const updateStatus = async (id: string, newStatus: string) => {
    try {
      await fetch(`/api/admin/quotes/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus }),
      });
      fetchQuotes();
    } catch (err) {
      console.error(err);
    }
  };

  const deleteQuote = async (id: string) => {
    if (!confirm('Are you sure you want to delete this quote record?')) return;
    try {
      await fetch(`/api/admin/quotes/${id}`, { method: 'DELETE' });
      fetchQuotes();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-black text-white">Quote Requests</h1>
          <p className="text-xs text-slate-400 font-medium">Manage incoming customer calculations from the Quote Calculator.</p>
        </div>
      </div>

      <div className="bg-[#0b132b] border border-sky-900 rounded-3xl p-6 shadow-xl overflow-x-auto">
        {loading ? (
          <div className="text-xs text-slate-400 py-8 text-center">Loading quote requests...</div>
        ) : quotes.length === 0 ? (
          <div className="text-xs text-slate-400 py-8 text-center">No quote submissions yet.</div>
        ) : (
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-sky-900 text-sky-300 font-black uppercase">
                <th className="pb-3 px-3">Ref ID</th>
                <th className="pb-3 px-3">Customer</th>
                <th className="pb-3 px-3">Location</th>
                <th className="pb-3 px-3">Total</th>
                <th className="pb-3 px-3">Date</th>
                <th className="pb-3 px-3">Status</th>
                <th className="pb-3 px-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-sky-900/60 font-medium">
              {quotes.map((q) => (
                <tr key={q._id} className="hover:bg-sky-900/20 transition-colors">
                  <td className="py-4 px-3 font-bold text-[#0284c7]">{q.referenceId}</td>
                  <td className="py-4 px-3">
                    <div className="font-bold text-white">{q.customerName}</div>
                    <div className="text-[11px] text-slate-400">{q.email} • {q.phone}</div>
                  </td>
                  <td className="py-4 px-3">{q.address}, {q.suburb}</td>
                  <td className="py-4 px-3 font-black text-[#10b981]">${q.totalAmount} AUD</td>
                  <td className="py-4 px-3 text-slate-400">{new Date(q.createdAt).toLocaleDateString()}</td>
                  <td className="py-4 px-3">
                    <select
                      value={q.status}
                      onChange={(e) => updateStatus(q._id, e.target.value)}
                      className="bg-slate-900 border border-sky-800 text-white rounded-lg px-2 py-1 text-xs font-bold"
                    >
                      <option value="new">New</option>
                      <option value="contacted">Contacted</option>
                      <option value="booked">Booked</option>
                      <option value="completed">Completed</option>
                    </select>
                  </td>
                  <td className="py-4 px-3 text-right">
                    <button
                      onClick={() => deleteQuote(q._id)}
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
