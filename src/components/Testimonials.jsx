import React from 'react';
import { Star, Quote } from 'lucide-react';

const Testimonials = ({ testimonials }) => {
  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, index) => (
      <Star 
        key={index}
        className={`w-5 h-5 ${
          index < rating 
            ? 'text-yellow-400 fill-current' 
            : 'text-slate-600'
        }`}
      />
    ));
  };

  return (
    <section id="testimonials" className="py-20 bg-slate-950 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute top-20 right-20 w-72 h-72 bg-emerald-500/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-20 left-20 w-96 h-96 bg-teal-500/10 rounded-full blur-3xl"></div>
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold text-white mb-6">
            Apa Kata <span className="text-emerald-400">Klien</span>
          </h2>
          <p className="text-xl text-slate-400 max-w-3xl mx-auto leading-relaxed">
            Testimonial dari klien dan rekan kerja yang pernah berkolaborasi dalam berbagai project
          </p>
          <div className="w-20 h-1 bg-gradient-to-r from-emerald-500 to-teal-500 mx-auto mt-6"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div
              key={testimonial.id}
              className="group bg-slate-800/50 backdrop-blur-sm rounded-2xl p-8 border border-slate-700/50 hover:border-emerald-500/60 transition-all duration-500 hover:scale-[1.03] relative overflow-hidden shadow-lg"
              style={{
                animationDelay: `${index * 0.1}s`,
                animation: 'fadeInUp 0.8s ease-out forwards'
              }}
            >
              {/* Background Gradient on Hover */}
              <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/0 to-teal-500/0 group-hover:from-emerald-500/10 group-hover:to-teal-500/10 transition-all duration-500 rounded-2xl"></div>

              <div className="relative z-10">
                {/* Quote Icon */}
                <div className="w-12 h-12 bg-emerald-500/20 rounded-full flex items-center justify-center mb-6 group-hover:bg-emerald-500/30 transition-colors">
                  <Quote className="w-6 h-6 text-emerald-400" />
                </div>

                {/* Rating */}
                <div className="flex items-center gap-1 mb-6">
                  {renderStars(testimonial.rating)}
                </div>

                {/* Testimonial Text */}
                <blockquote className="text-slate-300 mb-6 leading-relaxed italic group-hover:text-slate-200 transition-colors">
                  "{testimonial.text}"
                </blockquote>

                {/* Client Info */}
                <div className="border-t border-slate-700/50 pt-6">
                  <div className="text-white font-semibold mb-1 group-hover:text-emerald-100 transition-colors">
                    {testimonial.name}
                  </div>
                  <div className="text-slate-400 text-sm mb-1">
                    {testimonial.role}
                  </div>
                  <div className="text-emerald-400 text-sm font-medium">
                    {testimonial.company}
                  </div>
                </div>
              </div>

              {/* Hover Effect Accent */}
              <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-emerald-500 to-teal-500 transform scale-y-0 group-hover:scale-y-100 transition-transform duration-500 origin-top"></div>
            </div>
          ))}
        </div>

        {/* Overall Rating Summary */}
        <div className="mt-16 text-center">
          <div className="bg-gradient-to-r from-slate-800/50 to-slate-700/50 backdrop-blur-sm rounded-2xl p-8 border border-slate-600/50 max-w-2xl mx-auto">
            <div className="flex items-center justify-center gap-4 mb-4">
              <div className="flex items-center gap-2">
                {renderStars(4.5)}
              </div>
              <div className="text-3xl font-bold text-white">4.3/5.0</div>
            </div>
            <p className="text-slate-300 mb-6">
              Rating rata-rata dari semua project yang telah diselesaikan
            </p>
            <div className="grid grid-cols-2 gap-6 text-center">
              <div>
                <div className="text-2xl font-bold text-emerald-400">100%</div>
                <div className="text-slate-400">Project Selesai Tepat Waktu</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-emerald-400">95%</div>
                <div className="text-slate-400">Client Satisfaction Rate</div>
              </div>
            </div>
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

export default Testimonials;