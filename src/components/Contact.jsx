import React, { useState } from 'react';
import { Mail, Phone, Facebook, Github, Instagram, Send, MapPin, CheckCircle } from 'lucide-react';

const contact = {
  email: 'aryagarda11@gmail.com',
  whatsapp: '+6281234567890',
  facebook: 'https://facebook.com/Aryagarda',
  github: 'https://github.com/aryagarda28',
  instagram: 'https://instagram.com/aryagarda28',
};

const collaboration = {
  title: 'Terbuka untuk Kolaborasi',
  description: 'Saya terbuka untuk berbagai jenis project dan kolaborasi. Jangan ragu untuk menghubungi saya!',
  services: ['Website Development', 'UI/UX Design', 'E-Commerce', 'Konsultasi Project'],
};

const Contact = () => {
  const [formData, setFormData] = useState({ name: '', email: '', project: '', message: '' });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Simulate form submission
    setIsSubmitted(true);
    
    // Reset form after 3 seconds
    setTimeout(() => {
      setIsSubmitted(false);
      setFormData({ name: '', email: '', project: '', message: '' });
    }, 3000);

    // In real implementation, this would send to backend
    console.log('Form submitted:', formData);
  };

  const contactMethods = [
    {
      icon: <Mail className="w-6 h-6" />,
      label: "Email",
      value: contact.email,
      action: () => window.open(`mailto:${contact.email}`)
    },
    {
      icon: <Phone className="w-6 h-6" />,
      label: "WhatsApp",
      value: contact.whatsapp,
      action: () => window.open(`https://wa.me/${contact.whatsapp.replace(/\D/g, '')}`)
    },
    {
      icon: <Facebook className="w-6 h-6" />,
      label: "Facebook",
      value: "@Aryagarda",
      action: () => window.open(contact.facebook)
    },
    {
      icon: <Github className="w-6 h-6" />,
      label: "GitHub",
      value: "@aryagarda28",
      action: () => window.open(contact.github)
    },
    {
      icon: <Instagram className="w-6 h-6" />,
      label: "Instagram",
      value: "@aryagarda28",
      action: () => window.open(contact.instagram)
    }
  ];

  return (
    <section id="contact" className="py-20 bg-slate-900 relative overflow-hidden">
      <div className="absolute top-0 left-0 w-96 h-96 bg-emerald-500/5 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 right-0 w-80 h-80 bg-teal-500/5 rounded-full blur-3xl"></div>

      <div className="container mx-auto px-4 sm:px-6 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold text-white mb-6">
            Hubungi <span className="text-emerald-400">Saya</span>
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-emerald-500 to-teal-500 mx-auto"></div>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          <div className="space-y-8">
            {collaboration && (
              <div className="bg-slate-800/30 backdrop-blur-sm rounded-2xl p-6 border border-slate-700/50">
                <h3 className="text-xl font-bold text-white mb-4">{collaboration.title}</h3>
                <p className="text-slate-300 mb-4">{collaboration.description}</p>
                {collaboration.services && (
                  <ul className="space-y-2">
                    {collaboration.services.map((target, i) => (
                      <li key={i} className="flex items-center gap-2">
                        <span className="w-2 h-2 bg-emerald-400 rounded-full"></span>
                        <span className="text-slate-300">{target}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            )}

            {/* Contact Methods */}
            <div className="space-y-4">
              <h3 className="text-xl font-bold text-white mb-6">Hubungi Saya</h3>
              {contactMethods.map((method, index) => (
                <button
                  key={index}
                  onClick={method.action}
                  className="w-full bg-slate-800/30 backdrop-blur-sm rounded-xl p-4 border border-slate-700/50 hover:border-emerald-500/50 transition-all duration-300 group text-left"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-emerald-500/20 rounded-full flex items-center justify-center group-hover:bg-emerald-500/30 transition-colors">
                      <div className="text-emerald-400 group-hover:text-emerald-300">
                        {method.icon}
                      </div>
                    </div>
                    <div>
                      <div className="text-white font-medium">{method.label}</div>
                      <div className="text-slate-400 text-sm">{method.value}</div>
                    </div>
                  </div>
                </button>
              ))}
            </div>

            {/* Location */}
            <div className="bg-gradient-to-r from-emerald-500/10 to-teal-500/10 rounded-2xl p-6 border border-emerald-500/20">
              <div className="flex items-center gap-3 mb-2">
                <MapPin className="w-5 h-5 text-emerald-400" />
                <span className="text-white font-medium">Lokasi</span>
              </div>
              <p className="text-slate-300">Jakarta, Indonesia</p>
              <p className="text-slate-400 text-sm mt-1">Tersedia untuk project remote & on-site</p>
            </div>
          </div>

          {/* Contact Form */}
          <div className="bg-slate-800/30 backdrop-blur-sm rounded-2xl p-8 border border-slate-700/50">
            <h3 className="text-2xl font-bold text-white mb-6">Kirim Pesan</h3>
            
            {isSubmitted ? (
              <div className="text-center py-8">
                <CheckCircle className="w-16 h-16 text-emerald-400 mx-auto mb-4" />
                <h4 className="text-xl font-bold text-white mb-2">Pesan Terkirim!</h4>
                <p className="text-slate-300">Terima kasih! Saya akan segera membalas pesan Anda.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-slate-300 mb-2">Nama *</label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                      className="w-full bg-slate-700/50 border border-slate-600 rounded-lg px-4 py-3 text-white focus:border-emerald-500 focus:outline-none transition-colors"
                      placeholder="Nama lengkap Anda"
                    />
                  </div>
                  <div>
                    <label className="block text-slate-300 mb-2">Email *</label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      className="w-full bg-slate-700/50 border border-slate-600 rounded-lg px-4 py-3 text-white focus:border-emerald-500 focus:outline-none transition-colors"
                      placeholder="email@domain.com"
                    />
                  </div>
                </div>
                
                <div>
                  <label className="block text-slate-300 mb-2">Jenis Project</label>
                  <select
                    name="project"
                    value={formData.project}
                    onChange={handleInputChange}
                    className="w-full bg-slate-700/50 border border-slate-600 rounded-lg px-4 py-3 text-white focus:border-emerald-500 focus:outline-none transition-colors"
                  >
                    <option value="">Pilih jenis project...</option>
                    <option value="ecommerce">Website E-Commerce</option>
                    <option value="company-profile">Company Profile</option>
                    <option value="portfolio">Website Portfolio</option>
                    <option value="custom">Custom Website</option>
                    <option value="consultation">Konsultasi Design</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-slate-300 mb-2">Pesan *</label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    required
                    rows="5"
                    className="w-full bg-slate-700/50 border border-slate-600 rounded-lg px-4 py-3 text-white focus:border-emerald-500 focus:outline-none transition-colors resize-none"
                    placeholder="Ceritakan tentang project Anda..."
                  ></textarea>
                </div>
                
                <button
                  type="submit"
                  className="w-full bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white py-4 rounded-lg font-medium transition-all duration-300 transform hover:scale-105 flex items-center justify-center gap-2 group"
                >
                  <Send className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  Kirim Pesan
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;