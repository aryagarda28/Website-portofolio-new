
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Lock } from 'lucide-react';

export default function Sertifikat() {
  const navigate = useNavigate();
  const isAdmin = localStorage.getItem('role') === 'admin';
  const sertifikatList = [
    {
      title: "Marketing Management",
      img: require("../asset/Marketing managemen Sertif.png")
    },
    {
      title: "User Experience Research",
      img: require("../asset/UserExperiance Sertif.png")
    },
    {
      title: "User Interface Design",
      img: require("../asset/UserInterface Sertif.png")
    },
    {
      title: "Website Development Fundamental",
      img: require("../asset/Webdevelopment Sertif.png")
    },
    {
      title: "Basic Public Speaking: Anti Blank dan Belibet",
      img: require("../asset/PublicSpeaking Sertif.png"),
      desc: "SPEAK UP! AcademyHub & Galeria Potensi, 09 April 2026"
    }
    // Jika ada file sertifikat lain, tambahkan di sini sesuai file yang tersedia
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-white flex flex-col items-center py-20 px-4">
      <h1 className="text-4xl font-bold mb-4">Sertifikat</h1>
      <p className="text-lg mb-8 text-center">Daftar sertifikat dan penghargaan yang pernah diraih.</p>
      {/* Tombol Tambah Sertifikat: selalu tampil, forbidden cursor untuk non-admin */}
      <div className="mb-8">
        <div className="relative group inline-block">
          <button
            onClick={isAdmin ? () => navigate('/tambah-sertifikat') : undefined}
            className={`px-6 py-3 rounded-full font-semibold shadow-lg transition-all text-white flex items-center gap-2
              ${isAdmin
                ? 'bg-emerald-600 hover:bg-emerald-700 cursor-pointer'
                : 'bg-slate-600 opacity-70 cursor-not-allowed'
              }`}
          >
            {!isAdmin && <Lock className="w-4 h-4" />}
            Tambah Sertifikat
          </button>
          {!isAdmin && (
            <div className="absolute -top-10 left-1/2 -translate-x-1/2 bg-slate-900 border border-slate-600 text-slate-300 text-xs px-3 py-1.5 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap z-10">
              Hanya admin yang dapat menambahkan sertifikat
            </div>
          )}
        </div>
      </div>
      <div className="w-full max-w-5xl grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {sertifikatList.map((sertif, idx) => (
          <div key={idx} className="bg-slate-800/60 rounded-2xl p-6 shadow border border-slate-700 flex flex-col items-center">
            <div className="text-xl font-semibold text-emerald-400 mb-2 text-center">{sertif.title}</div>
            {sertif.desc && <div className="text-sm text-slate-300 mb-2 text-center">{sertif.desc}</div>}
            <img src={sertif.img} alt={sertif.title} className="rounded-lg w-full object-contain max-h-60 border border-slate-600 bg-white" />
          </div>
        ))}
      </div>
    </div>
  );
}
