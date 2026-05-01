import React from 'react';
import { ShoppingCart, Building2, Briefcase, Palette, ArrowRight } from 'lucide-react';

const Services = ({ services }) => {
  const iconComponents = {
    ShoppingCart: <ShoppingCart className="w-8 h-8" />,
    Building2: <Building2 className="w-8 h-8" />,
    Briefcase: <Briefcase className="w-8 h-8" />,
    Palette: <Palette className="w-8 h-8" />
  };

  return (
    <section id="services" className="py-20 bg-slate-950 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute top-20 left-20 w-72 h-72 bg-teal-500/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-20 right-20 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl"></div>
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold text-white mb-6">
            Layanan <span className="text-emerald-400">Saya</span>
          </h2>
          <p className="text-xl text-slate-400 max-w-3xl mx-auto leading-relaxed">
            Berbagai solusi website dengan design yang menarik dan fungsional 
            untuk kebutuhan bisnis dan personal Anda
          </p>
          <div className="w-20 h-1 bg-gradient-to-r from-emerald-500 to-teal-500 mx-auto mt-6"></div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.map((service, index) => (
            <div 
              key={service.id}
              className="group relative bg-slate-800/30 backdrop-blur-sm rounded-2xl p-8 border border-slate-700/50 hover:border-emerald-500/50 transition-all duration-500 hover:transform hover:scale-105 overflow-hidden"
              style={{ 
                animationDelay: `${index * 0.1}s`,
                animation: 'fadeInUp 0.8s ease-out forwards'
              }}
            >
              {/* Background Gradient on Hover */}
              <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/0 to-teal-500/0 group-hover:from-emerald-500/10 group-hover:to-teal-500/10 transition-all duration-500 rounded-2xl"></div>
              
              <div className="relative z-10">
                {/* Icon */}
                <div className="w-16 h-16 bg-emerald-500/20 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-emerald-500/30 group-hover:scale-110 transition-all duration-300">
                  <div className="text-emerald-400 group-hover:text-emerald-300">
                    {iconComponents[service.icon]}
                  </div>
                </div>

                {/* Content */}
                <h3 className="text-xl font-bold text-white mb-4 group-hover:text-emerald-100 transition-colors">
                  {service.title}
                </h3>
                <p className="text-slate-400 mb-6 leading-relaxed group-hover:text-slate-300 transition-colors">
                  {service.description}
                </p>

                {/* Learn More */}
                <div className="flex items-center text-emerald-400 group-hover:text-emerald-300 transition-colors cursor-pointer">
                  <span className="text-sm font-medium mr-2">Pelajari Lebih</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-2 transition-transform" />
                </div>
              </div>

              {/* Hover Effect Lines */}
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-emerald-500 to-teal-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"></div>
            </div>
          ))}
        </div>

        {/* Call to Action */}
        <div className="text-center mt-16">
          <div className="bg-gradient-to-r from-slate-800/50 to-slate-700/50 backdrop-blur-sm rounded-2xl p-8 border border-slate-600/50">
            <h3 className="text-2xl font-bold text-white mb-4">
              Butuh Solusi Website Custom?
            </h3>
            <p className="text-slate-300 mb-6 max-w-2xl mx-auto">
              Punya kebutuhan spesifik yang tidak ada di daftar? 
              Mari kita diskusikan dan temukan solusi terbaik untuk project Anda.
            </p>
            <button 
              onClick={() => document.getElementById('contact').scrollIntoView({ behavior: 'smooth' })}
              className="bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white px-8 py-4 rounded-full font-medium transition-all duration-300 transform hover:scale-105 hover:shadow-xl hover:shadow-emerald-500/25"
            >
              Konsultasi Gratis
            </button>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </section>
  );
};

export default Services;