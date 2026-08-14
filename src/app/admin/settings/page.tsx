'use client';

import { useState, useEffect } from 'react';
import { Settings, Save } from 'lucide-react';

export default function AdminSettingsPage() {
  const [settings, setSettings] = useState<any>({
    phone: '0481 734 225',
    email: 'info@canberracarpetcleaningdeals.com.au',
    address: '5 Holford St, Taylor, ACT 2913',
    hours: 'Mon–Sat 7:00am–7:00pm, same-day booking if booked before 11am',
    heroHeadline: "WE'VE BUILT OUR CANBERRA BUSINESS ON 100,000+ CLEAN HOMES",
    heroSubheadline: 'Professional hot water steam extraction, 100% bond-back guarantee, sofa washing, and stain treatment across all Canberra ACT suburbs.',
  });
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    fetch('/api/admin/settings')
      .then((res) => res.json())
      .then((data) => {
        if (data && !data.error) setSettings(data);
      });
  }, []);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaved(false);
    await fetch('/api/admin/settings', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(settings),
    });
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-black text-slate-900">Global Site Settings</h1>
          <p className="text-xs text-slate-500 font-medium">Update business phone, email, address, operating hours, and hero text.</p>
        </div>
      </div>

      {saved && (
        <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold text-center">
          ✓ Site settings saved successfully!
        </div>
      )}

      <form onSubmit={handleSave} className="bg-white border border-slate-200 rounded-3xl p-6 shadow-sm space-y-4 text-xs font-bold">
        <div className="grid sm:grid-cols-2 gap-4">
          <div>
            <label className="text-slate-700">Business Phone Number</label>
            <input type="text" value={settings.phone || ''} onChange={(e) => setSettings({ ...settings, phone: e.target.value })} className="w-full bg-slate-50 border border-slate-300 rounded-xl p-2.5 text-slate-900 mt-1 font-bold" />
          </div>
          <div>
            <label className="text-slate-700">Business Email Address</label>
            <input type="email" value={settings.email || ''} onChange={(e) => setSettings({ ...settings, email: e.target.value })} className="w-full bg-slate-50 border border-slate-300 rounded-xl p-2.5 text-slate-900 mt-1 font-bold" />
          </div>
        </div>

        <div>
          <label className="text-slate-700">Office Address</label>
          <input type="text" value={settings.address || ''} onChange={(e) => setSettings({ ...settings, address: e.target.value })} className="w-full bg-slate-50 border border-slate-300 rounded-xl p-2.5 text-slate-900 mt-1 font-bold" />
        </div>

        <div>
          <label className="text-slate-700">Operating Hours</label>
          <input type="text" value={settings.hours || ''} onChange={(e) => setSettings({ ...settings, hours: e.target.value })} className="w-full bg-slate-50 border border-slate-300 rounded-xl p-2.5 text-slate-900 mt-1 font-bold" />
        </div>

        <div>
          <label className="text-slate-700">Homepage Hero Headline</label>
          <input type="text" value={settings.heroHeadline || ''} onChange={(e) => setSettings({ ...settings, heroHeadline: e.target.value })} className="w-full bg-slate-50 border border-slate-300 rounded-xl p-2.5 text-slate-900 mt-1 font-bold" />
        </div>

        <div>
          <label className="text-slate-700">Homepage Hero Subheadline</label>
          <textarea rows={3} value={settings.heroSubheadline || ''} onChange={(e) => setSettings({ ...settings, heroSubheadline: e.target.value })} className="w-full bg-slate-50 border border-slate-300 rounded-xl p-2.5 text-slate-900 mt-1 font-bold" />
        </div>

        <div className="pt-2 flex justify-end">
          <button type="submit" className="px-6 py-3 bg-[#10b981] hover:bg-[#059669] text-white font-black text-xs uppercase rounded-xl flex items-center gap-2 shadow-md">
            <Save className="w-4 h-4" />
            <span>Save Settings</span>
          </button>
        </div>
      </form>
    </div>
  );
}
