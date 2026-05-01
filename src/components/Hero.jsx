import React from 'react';
import { ChevronDown, Download } from 'lucide-react';

const Hero = ({ data }) => {
  const scrollToNext = () => {
    const aboutSection = document.getElementById('about');
    if (aboutSection) {
      aboutSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const downloadCV = () => {
    window.open(data.contact.cvUrl, '_blank');
  };

  return (
    <section id="home" className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-20 w-72 h-72 bg-emerald-500/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-teal-500/10 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-r from-emerald-500/5 to-teal-500/5 rounded-full blur-3xl"></div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <div className="space-y-8">
            <div className="space-y-4">
              <p className="text-emerald-400 text-lg font-medium">👋 Halo, saya</p>
              <h1 className="text-5xl lg:text-7xl font-bold text-white leading-tight">
                {data.profile.name}
              </h1>
              <h2 className="text-2xl lg:text-3xl text-slate-300 font-light">
                {data.profile.title}
              </h2>
              <p className="text-xl text-slate-400 leading-relaxed max-w-2xl">
                {data.profile.tagline}
              </p>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <button
                onClick={() => document.getElementById('portfolio').scrollIntoView({ behavior: 'smooth' })}
                className="bg-emerald-500 hover:bg-emerald-600 text-white px-8 py-4 rounded-full text-lg font-medium transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-emerald-500/25"
              >
                Lihat Portfolio
              </button>
              <button
                onClick={downloadCV}
                className="border-2 border-emerald-500 text-emerald-400 hover:bg-emerald-500 hover:text-white px-8 py-4 rounded-full text-lg font-medium transition-all duration-300 flex items-center gap-2 justify-center group"
              >
                <Download size={20} className="group-hover:animate-bounce" />
                Download CV
              </button>
            </div>

            {/* Stats */}
            <div className="flex gap-8 pt-8 flex-wrap">
              <div className="text-center">
                <div className="text-3xl font-bold text-emerald-400">2+</div>
                <div className="text-slate-400">Projects</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-emerald-400">9</div>
                <div className="text-slate-400">Months Experience</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-emerald-400">4.5</div>
                <div className="text-slate-400">Rating</div>
              </div>
            </div>
          </div>

          {/* Profile Image */}
          <div className="relative flex justify-center">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-3xl blur-2xl opacity-30 animate-pulse"></div>
              <img 
                src={data.profile.profileImage} 
                alt={data.profile.name}
                className="relative w-80 h-96 object-cover object-top rounded-3xl border-4 border-emerald-500/30 hover:border-emerald-500/50 transition-all duration-300 transform hover:scale-105"
              />
              {/* Floating Elements */}
              <div className="absolute -top-4 -right-4 w-20 h-20 bg-emerald-500/20 rounded-full flex items-center justify-center backdrop-blur-sm animate-float">
                <span className="text-2xl">🎨</span>
              </div>
              <div className="absolute -bottom-4 -left-4 w-16 h-16 bg-teal-500/20 rounded-full flex items-center justify-center backdrop-blur-sm animate-float-delay">
                <span className="text-xl">💻</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <button 
        onClick={scrollToNext}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-slate-400 hover:text-emerald-400 transition-colors animate-bounce"
      >
        <ChevronDown size={32} />
      </button>

      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-20px); }
        }
        @keyframes float-delay {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-15px); }
        }
        .animate-float {
          animation: float 3s ease-in-out infinite;
        }
        .animate-float-delay {
          animation: float-delay 3s ease-in-out infinite 1.5s;
        }
      `}</style>
    </section>
  );
};

export default Hero;