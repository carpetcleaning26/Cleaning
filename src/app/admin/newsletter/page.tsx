'use client';

import { useState, useEffect } from 'react';
import { Mail, Download } from 'lucide-react';

export default function AdminNewsletterPage() {
  const [subscribers, setSubscribers] = useState<any[]>([]);

  useEffect(() => {
    fetch('/api/admin/newsletter')
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) setSubscribers(data);
      });
  }, []);

  const exportCSV = () => {
    const csvContent = 'data:text/csv;charset=utf-8,' + ['Email,SubscribedAt', ...subscribers.map((s) => `${s.email},${s.subscribedAt}`)].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', 'newsletter_subscribers.csv');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-black text-slate-900">Newsletter Subscribers ({subscribers.length})</h1>
          <p className="text-xs text-slate-500 font-medium">Subscribers captured from the footer signup form.</p>
        </div>
        <button onClick={exportCSV} className="px-4 py-2.5 bg-[#10b981] hover:bg-[#059669] text-white rounded-xl text-xs font-black uppercase flex items-center gap-2 shadow-xs">
          <Download className="w-4 h-4" />
          <span>Export CSV</span>
        </button>
      </div>

      <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-sm overflow-x-auto">
        <table className="w-full text-left text-xs">
          <thead>
            <tr className="border-b border-slate-200 bg-slate-50 text-slate-700 font-black uppercase">
              <th className="py-3 px-3">Subscriber Email</th>
              <th className="py-3 px-3">Subscribed Date</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 font-medium">
            {subscribers.map((s) => (
              <tr key={s._id} className="hover:bg-slate-50 transition-colors">
                <td className="py-3.5 px-3 text-slate-900 font-bold">{s.email}</td>
                <td className="py-3.5 px-3 text-slate-500">{new Date(s.subscribedAt).toLocaleDateString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
