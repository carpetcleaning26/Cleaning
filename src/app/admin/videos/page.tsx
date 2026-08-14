'use client';

import { useState, useEffect } from 'react';
import { Video, Plus, Trash2, Upload } from 'lucide-react';

export default function AdminVideosPage() {
  const [videos, setVideos] = useState<any[]>([]);
  const [uploading, setUploading] = useState(false);
  const [title, setTitle] = useState('');

  const fetchVideos = async () => {
    const res = await fetch('/api/admin/videos');
    const data = await res.json();
    if (Array.isArray(data)) setVideos(data);
  };

  useEffect(() => {
    fetchVideos();
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
        await fetch('/api/admin/videos', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            id: `v-${Date.now()}`,
            title: title || file.name,
            duration: '0:30',
            videoUrl: uploadData.url,
            thumbnail: '/pictures/real_image_1.jpeg',
            displayOrder: videos.length,
            published: true,
          }),
        });
        setTitle('');
        fetchVideos();
      }
    } catch (err) {
      console.error(err);
    } finally {
      setUploading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Delete video item? File will be deleted from Cloudflare R2.')) return;
    await fetch(`/api/admin/videos/${id}`, { method: 'DELETE' });
    fetchVideos();
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-black text-white">Video Showcase ({videos.length})</h1>
          <p className="text-xs text-slate-400 font-medium">Upload new MP4 video clips to Cloudflare R2 storage.</p>
        </div>
      </div>

      <div className="bg-[#0b132b] border border-sky-900 rounded-3xl p-6 shadow-xl space-y-4 text-xs">
        <h2 className="font-black text-white">Upload New MP4 Video</h2>
        <div className="flex flex-col sm:flex-row gap-3">
          <input
            type="text"
            placeholder="Video Title (e.g. Steam Hydro Scrubbing in Gungahlin)"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="flex-1 bg-slate-900 border border-sky-800 rounded-xl p-2.5 text-white"
          />
          <label className="px-5 py-2.5 bg-[#0284c7] hover:bg-[#0369a1] text-white font-black uppercase rounded-xl cursor-pointer flex items-center justify-center gap-2 whitespace-nowrap">
            <Upload className="w-4 h-4" />
            <span>{uploading ? 'Uploading Video...' : 'Select MP4 Video'}</span>
            <input type="file" accept="video/mp4" onChange={handleUpload} className="hidden" />
          </label>
        </div>
      </div>

      <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
        {videos.map((v) => (
          <div key={v._id} className="bg-[#0b132b] border border-sky-900 rounded-2xl overflow-hidden p-4 space-y-3 text-xs">
            <div className="font-bold text-white text-sm">{v.title}</div>
            <video controls src={v.videoUrl} poster={v.thumbnail} className="w-full rounded-xl bg-black aspect-video" />
            <div className="flex justify-end">
              <button onClick={() => handleDelete(v._id)} className="p-1.5 bg-red-950 text-red-300 rounded-lg"><Trash2 className="w-4 h-4" /></button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
