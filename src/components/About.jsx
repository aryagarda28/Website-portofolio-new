import React from 'react';
// TODO: Ganti dengan import GraduationCap yang benar jika ada
const GraduationCap = () => <span>🎓</span>;
// TODO: Ganti dengan data dan principles asli jika ada
const data = {
  education: 'S1 Teknik Informatika',
  description: 'Saya adalah seorang developer yang fokus pada pengalaman pengguna dan desain fungsional.',
  profileImage: 'https://via.placeholder.com/256x256.png?text=Profile',
};
const principles = [
  { icon: '💡', title: 'Inovasi', description: 'Selalu mencari solusi kreatif.' },
  { icon: '🤝', title: 'Kolaborasi', description: 'Kerja tim untuk hasil terbaik.' },
  { icon: '🎯', title: 'Fokus', description: 'Prioritas pada tujuan dan hasil.' },
];

const About = () => {
  return (
    <section id="about" className="py-20 bg-slate-900 relative overflow-hidden">
        {/* Background Elements */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-500/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-teal-500/5 rounded-full blur-3xl"></div>

        <div className="container mx-auto px-4 sm:px-6 relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold text-white mb-6">
              Tentang <span className="text-emerald-400">Saya</span>
            </h2>
            <div className="w-20 h-1 bg-gradient-to-r from-emerald-500 to-teal-500 mx-auto"></div>
          </div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <div className="space-y-8">
            {/* Education */}
            <div className="bg-slate-800/60 p-6 rounded-2xl border border-slate-700/50 backdrop-blur-sm">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 bg-emerald-500/20 rounded-full flex items-center justify-center">
                  <GraduationCap className="w-6 h-6 text-emerald-400" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-white">Pendidikan</h3>
                  <p className="text-slate-400">{data.education}</p>
                </div>
              </div>
            </div>

            {/* Description */}
            <div className="space-y-6">
              <p className="text-lg text-slate-300 leading-relaxed">
                {data.description}
              </p>

              <div className="bg-gradient-to-r from-emerald-500/10 to-teal-500/10 p-6 rounded-2xl border border-emerald-500/20">
                <h4 className="text-lg font-semibold text-white mb-4">Filosofi Design Saya</h4>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  {principles.map((p, i) => (
                    <div key={i} className="flex flex-col items-center text-center">
                      <div className="mb-2">{p.icon}</div>
                      <div className="text-white font-semibold">{p.title}</div>
                      <div className="text-slate-400 text-sm">{p.description}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Profile Image */}
          <div className="flex justify-center lg:justify-end">
            <img
              src={data.profileImage}
              alt="Profile"
              className="w-64 h-64 object-cover rounded-2xl border-4 border-emerald-500/30 shadow-lg"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;