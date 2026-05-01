import React from 'react';
import { Download, Mail, Phone, Facebook, Github, Instagram } from 'lucide-react';

export default function Footer({ contact }) {
  const currentYear = new Date().getFullYear();

  const socialLinks = [
    { icon: <Facebook className="w-5 h-5" />, url: contact.facebook, label: "Facebook" },
    { icon: <Github className="w-5 h-5" />, url: contact.github, label: "GitHub" },
    { icon: <Instagram className="w-5 h-5" />, url: contact.instagram, label: "Instagram" },
    { icon: <Mail className="w-5 h-5" />, url: `mailto:${contact.email}`, label: "Email" }
  ];

  const quickLinks = [
    { name: 'About', href: '#about' },
    { name: 'Services', href: '#services' },
    { name: 'Portfolio', href: '#portfolio' },
    { name: 'Contact', href: '#contact' }
  ];

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId.replace('#', ''));
    if (element) element.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <footer className="bg-slate-950 border-t border-slate-800 relative overflow-hidden">
      <div className="absolute top-0 left-0 w-96 h-96 bg-emerald-500/5 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 right-0 w-80 h-80 bg-teal-500/5 rounded-full blur-3xl"></div>

      <div className="container mx-auto px-4 sm:px-6 relative z-10">
        <div className="py-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="lg:col-span-2 space-y-6">
            <div>
              <h3 className="text-2xl font-bold text-white mb-3">Arya Garda Perwira</h3>
              <p className="text-emerald-400 font-medium mb-4">UI/UX Designer</p>
              <p className="text-slate-400 leading-relaxed max-w-md">
                Membuat tampilan web jadi lebih hidup, nyaman dipakai, dan sesuai kebutuhan pengguna. 
                Terbuka untuk project menantang dan kolaborasi menarik. Biasa dipanggil Arya atau Garda.
              </p>
            </div>

            <div className="bg-gradient-to-r from-slate-800/60 to-slate-700/60 backdrop-blur-sm rounded-xl p-4 border border-slate-600/50">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="text-white font-medium mb-1">Download CV</h4>
                  <p className="text-slate-400 text-sm">Lihat pengalaman dan skill saya</p>
                </div>
                <button
                  onClick={() => window.open(contact.cvUrl, '_blank')}
                  className="bg-emerald-500 hover:bg-emerald-600 text-white p-3 rounded-full transition-all duration-300 hover:scale-110 group"
                >
                  <Download className="w-5 h-5 group-hover:animate-bounce" />
                </button>
              </div>
            </div>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-6">Quick Links</h4>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <button 
                    onClick={() => scrollToSection(link.href)}
                    className="text-slate-400 hover:text-emerald-400 transition-colors duration-300"
                  >
                    {link.name}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-6">Get in Touch</h4>
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-emerald-400" />
                <a href={`mailto:${contact.email}`} className="text-slate-400 hover:text-emerald-400 text-sm">
                  {contact.email}
                </a>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-emerald-400" />
                <a
                  href={`https://wa.me/${contact.whatsapp.replace(/\D/g, '')}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-slate-400 hover:text-emerald-400 text-sm"
                >
                  {contact.whatsapp}
                </a>
              </div>
            </div>

            <div className="mt-6">
              <h5 className="text-white font-medium mb-4">Follow Me</h5>
              <div className="flex gap-3">
                {socialLinks.map((social, idx) => (
                  <a
                    key={idx}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 bg-slate-800/50 hover:bg-emerald-500/20 border border-slate-700 hover:border-emerald-500/50 rounded-full flex items-center justify-center text-slate-400 hover:text-emerald-400 transition-all duration-300 transform hover:scale-110"
                    aria-label={social.label}
                  >
                    {social.icon}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="py-6 border-t border-slate-800">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-slate-400 text-sm text-center md:text-left">
              © {currentYear} Arya Garda Perwira. All rights reserved.
            </p>
            <div className="text-slate-400 text-sm text-center md:text-left">
              Made by <span className="font-semibold text-emerald-400">Arya Garda</span> — Aryagarda
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
