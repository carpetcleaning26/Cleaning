'use client';

import { useState, useEffect } from 'react';
import { Trash2, Eye, X, User, MapPin, Phone, Mail, Home, Package } from 'lucide-react';

export default function AdminQuotesPage() {
  const [quotes, setQuotes] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedQuote, setSelectedQuote] = useState<any | null>(null);

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
          <h1 className="text-2xl font-black text-slate-900">Quote Requests</h1>
          <p className="text-xs text-slate-500 font-medium">Manage incoming customer calculations from the Quote Calculator.</p>
        </div>
      </div>

      <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-sm overflow-x-auto">
        {loading ? (
          <div className="text-xs text-slate-500 py-8 text-center">Loading quote requests...</div>
        ) : quotes.length === 0 ? (
          <div className="text-xs text-slate-500 py-8 text-center">No quote submissions yet.</div>
        ) : (
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-slate-200 bg-slate-50 text-slate-700 font-black uppercase">
                <th className="py-3 px-3">Ref ID</th>
                <th className="py-3 px-3">Customer</th>
                <th className="py-3 px-3">Order Summary</th>
                <th className="py-3 px-3">Location</th>
                <th className="py-3 px-3">Total</th>
                <th className="py-3 px-3">Date</th>
                <th className="py-3 px-3">Status</th>
                <th className="py-3 px-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-medium">
              {quotes.map((q) => {
                const services = Array.isArray(q.selectedServices) ? q.selectedServices : [];
                return (
                <tr key={q._id} className="hover:bg-slate-50 transition-colors">
                  <td className="py-4 px-3">
                    <button
                      type="button"
                      onClick={() => setSelectedQuote(q)}
                      className="font-bold text-[#0284c7] hover:underline cursor-pointer"
                    >
                      {q.referenceId}
                    </button>
                  </td>
                  <td className="py-4 px-3">
                    <div className="font-bold text-slate-900">{q.customerName}</div>
                    <div className="text-[11px] text-slate-500">{q.email} • {q.phone}</div>
                  </td>
                  <td className="py-4 px-3 text-slate-700 max-w-xs">
                    {services.length > 0 ? (
                      <div className="space-y-0.5">
                        <div className="text-[11px] font-bold text-slate-800 truncate">
                          {services.slice(0, 2).map((s: any) => typeof s === 'string' ? s : `${s.name} (×${s.quantity ?? 1})`).join(', ')}
                          {services.length > 2 ? ` +${services.length - 2} more` : ''}
                        </div>
                        <button
                          type="button"
                          onClick={() => setSelectedQuote(q)}
                          className="text-[11px] font-bold text-[#0284c7] hover:underline cursor-pointer"
                        >
                          View full order ({services.length} {services.length === 1 ? 'item' : 'items'})
                        </button>
                      </div>
                    ) : (
                      <span className="text-slate-400">No items</span>
                    )}
                  </td>
                  <td className="py-4 px-3 text-slate-700">
                    <div>{q.address}, {q.suburb}</div>
                    {q.propertyType && <div className="text-[11px] text-slate-400">{q.propertyType}</div>}
                  </td>
                  <td className="py-4 px-3 font-black text-[#10b981]">${q.totalAmount} AUD</td>
                  <td className="py-4 px-3 text-slate-500">{new Date(q.createdAt).toLocaleDateString()}</td>
                  <td className="py-4 px-3">
                    <select
                      value={q.status}
                      onChange={(e) => updateStatus(q._id, e.target.value)}
                      className="bg-slate-50 border border-slate-300 text-slate-900 rounded-lg px-2.5 py-1 text-xs font-bold focus:outline-none"
                    >
                      <option value="new">New</option>
                      <option value="contacted">Contacted</option>
                      <option value="booked">Booked</option>
                      <option value="completed">Completed</option>
                    </select>
                  </td>
                  <td className="py-4 px-3 text-right">
                    <div className="flex items-center justify-end gap-1.5">
                      <button
                        type="button"
                        onClick={() => setSelectedQuote(q)}
                        className="p-1.5 rounded-lg bg-sky-50 border border-sky-200 text-[#0284c7] hover:bg-sky-100 transition-colors cursor-pointer"
                        title="View Quote Details"
                      >
                        <Eye className="w-4 h-4" />
                      </button>
                      <button
                        type="button"
                        onClick={() => deleteQuote(q._id)}
                        className="p-1.5 rounded-lg bg-red-50 border border-red-200 text-red-600 hover:bg-red-100 transition-colors cursor-pointer"
                        title="Delete"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
                );
              })}
            </tbody>
          </table>
        )}
      </div>

      {/* Quote Details Modal */}
      {selectedQuote && (
        <div
          className="fixed inset-0 z-50 bg-slate-900/50 backdrop-blur-xs flex items-center justify-center p-4"
          onClick={() => setSelectedQuote(null)}
        >
          <div
            className="bg-white border border-slate-200 rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl p-6 sm:p-8 space-y-6"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-start justify-between border-b border-slate-100 pb-4">
              <div>
                <div className="text-[11px] font-black uppercase tracking-wider text-[#0284c7]">Quote Order Details</div>
                <h2 className="text-xl font-black text-slate-900">{selectedQuote.referenceId}</h2>
                <div className="text-xs text-slate-500 mt-0.5">
                  Submitted {new Date(selectedQuote.createdAt).toLocaleString()}
                </div>
              </div>
              <button
                type="button"
                onClick={() => setSelectedQuote(null)}
                className="p-2 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-600 cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Customer & Property Info */}
            <div className="grid sm:grid-cols-2 gap-4 bg-slate-50 p-4 rounded-2xl border border-slate-200 text-xs">
              <div className="space-y-2">
                <div className="font-black uppercase text-slate-500 text-[10px] tracking-wider">Customer</div>
                <div className="flex items-center gap-2 font-bold text-slate-900">
                  <User className="w-3.5 h-3.5 text-[#0284c7]" />
                  <span>{selectedQuote.customerName}</span>
                </div>
                <div className="flex items-center gap-2 text-slate-700">
                  <Mail className="w-3.5 h-3.5 text-[#0284c7]" />
                  <span>{selectedQuote.email}</span>
                </div>
                <div className="flex items-center gap-2 text-slate-700">
                  <Phone className="w-3.5 h-3.5 text-[#0284c7]" />
                  <span>{selectedQuote.phone}</span>
                </div>
              </div>
              <div className="space-y-2">
                <div className="font-black uppercase text-slate-500 text-[10px] tracking-wider">Property & Location</div>
                <div className="flex items-start gap-2 text-slate-700">
                  <MapPin className="w-3.5 h-3.5 text-[#10b981] flex-shrink-0 mt-0.5" />
                  <span>{selectedQuote.address}, {selectedQuote.suburb}</span>
                </div>
                <div className="flex items-center gap-2 text-slate-700">
                  <Home className="w-3.5 h-3.5 text-[#10b981]" />
                  <span>{selectedQuote.propertyType || 'Residential'}</span>
                </div>
                <div>
                  <span className="inline-block px-2.5 py-0.5 rounded-full text-[11px] font-bold uppercase bg-sky-100 text-[#0284c7]">
                    Status: {selectedQuote.status}
                  </span>
                </div>
              </div>
            </div>

            {/* Ordered Services Breakdown */}
            <div className="space-y-3">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-slate-700">
                <Package className="w-4 h-4 text-[#0284c7]" />
                <span>Ordered Services</span>
              </div>
              <div className="border border-slate-200 rounded-2xl overflow-hidden">
                <table className="w-full text-xs text-left">
                  <thead className="bg-slate-50 border-b border-slate-200 text-slate-600 font-black uppercase">
                    <tr>
                      <th className="py-2.5 px-4">Service / Item</th>
                      <th className="py-2.5 px-4 text-center">Qty</th>
                      <th className="py-2.5 px-4 text-right">Amount</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {Array.isArray(selectedQuote.selectedServices) && selectedQuote.selectedServices.length > 0 ? (
                      selectedQuote.selectedServices.map((item: any, idx: number) => (
                        <tr key={idx}>
                          <td className="py-2.5 px-4 font-bold text-slate-900">
                            {typeof item === 'string' ? item : item.name}
                          </td>
                          <td className="py-2.5 px-4 text-center text-slate-700">
                            {typeof item === 'string' ? 1 : (item.quantity ?? 1)}
                          </td>
                          <td className="py-2.5 px-4 text-right font-bold text-slate-900">
                            {typeof item === 'string' || item.price === undefined ? '—' : `$${item.price} AUD`}
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan={3} className="py-4 px-4 text-center text-slate-400">
                          No service line items recorded.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Total Footer */}
            <div className="flex items-center justify-between bg-slate-900 text-white p-4 rounded-2xl">
              <div className="text-xs space-y-0.5">
                <div className="text-slate-300 font-semibold">
                  {selectedQuote.discountApplied ? '20% Online Discount Applied' : 'Standard Rate'}
                </div>
                <div className="text-[11px] text-slate-400">Estimated Total (inc GST)</div>
              </div>
              <div className="text-2xl font-black text-[#10b981]">
                ${selectedQuote.totalAmount} AUD
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
