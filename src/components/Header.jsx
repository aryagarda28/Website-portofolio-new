import React, { useState, useEffect, useRef } from 'react';
import { Menu, X, ChevronDown, LogOut } from 'lucide-react';
import { useNavigate } from 'react-router-dom';


export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState('');

  useEffect(() => {
    const user = localStorage.getItem('username');
    setIsLoggedIn(!!user);
    setUsername(user || '');
  }, []);

  // Tutup dropdown saat klik di luar
  useEffect(() => {
    function handleClickOutside(e) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setDropdownOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('role');
    localStorage.removeItem('user_id');
    localStorage.removeItem('username');
    setIsLoggedIn(false);
    setUsername('');
    navigate('/login');
  };

  const scrollToSection = (id) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
      setIsMenuOpen(false);
    }
  };

  const goToSertifikat = () => {
    navigate('/sertifikat');
    setIsMenuOpen(false);
  };

  return (
    <header className="fixed top-0 w-full bg-slate-950/90 backdrop-blur-sm z-50 border-b border-slate-800">
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Brand */}
          <div className="text-2xl font-bold text-emerald-400">Arya Garda</div>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center space-x-8">
            <button onClick={() => scrollToSection('home')} className="text-slate-300 hover:text-emerald-400">Home</button>
            <button onClick={() => scrollToSection('about')} className="text-slate-300 hover:text-emerald-400">About</button>
            <button onClick={() => scrollToSection('services')} className="text-slate-300 hover:text-emerald-400">Services</button>
            <button onClick={() => scrollToSection('portfolio')} className="text-slate-300 hover:text-emerald-400">Portfolio</button>
            <button onClick={goToSertifikat} className="text-slate-300 hover:text-emerald-400">Sertifikat</button>
            <button onClick={() => scrollToSection('contact')} className="bg-emerald-500 hover:bg-emerald-600 text-white px-6 py-2 rounded-full">Contact</button>
            {isLoggedIn ? (
              <div className="relative ml-4" ref={dropdownRef}>
                <button
                  onClick={() => setDropdownOpen(v => !v)}
                  className="flex items-center gap-1 text-slate-300 hover:text-emerald-400 font-medium"
                >
                  {username}
                  <ChevronDown size={16} className={`transition-transform ${dropdownOpen ? 'rotate-180' : ''}`} />
                </button>
                {dropdownOpen && (
                  <div className="absolute right-0 mt-2 w-44 bg-slate-800 border border-slate-700 rounded-lg shadow-lg z-50">
                    <button
                      onClick={handleLogout}
                      className="flex items-center gap-2 w-full px-4 py-3 text-sm text-red-400 hover:bg-slate-700 rounded-lg"
                    >
                      <LogOut size={15} />
                      Keluar Akun
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <button onClick={() => navigate('/login')} className="ml-4 bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 rounded-full">Login</button>
            )}
          </nav>

          {/* Mobile button */}
          <button className="md:hidden text-slate-300 hover:text-emerald-400" onClick={() => setIsMenuOpen(v => !v)}>
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile nav */}
        {isMenuOpen && (
          <div className="md:hidden absolute top-full left-0 right-0 bg-slate-900 border-b border-slate-800">
            <nav className="flex flex-col py-4">
              <button onClick={() => scrollToSection('home')} className="text-slate-300 hover:text-emerald-400 py-3 px-6 text-left">Home</button>
              <button onClick={() => scrollToSection('about')} className="text-slate-300 hover:text-emerald-400 py-3 px-6 text-left">About</button>
              <button onClick={() => scrollToSection('services')} className="text-slate-300 hover:text-emerald-400 py-3 px-6 text-left">Services</button>
              <button onClick={() => scrollToSection('portfolio')} className="text-slate-300 hover:text-emerald-400 py-3 px-6 text-left">Portfolio</button>
              <button onClick={goToSertifikat} className="text-slate-300 hover:text-emerald-400 py-3 px-6 text-left">Sertifikat</button>
              <button onClick={() => scrollToSection('contact')} className="text-emerald-400 py-3 px-6 text-left font-medium">Contact</button>
              {isLoggedIn ? (
                <>
                  <span className="px-6 text-slate-400 text-sm">Login sebagai</span>
                  <span className="px-6 text-emerald-400 font-semibold">{username}</span>
                  <button
                    onClick={handleLogout}
                    className="flex items-center gap-2 mx-6 mt-2 bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-full text-sm"
                  >
                    <LogOut size={15} />
                    Keluar Akun
                  </button>
                </>
              ) : (
                <button onClick={() => { setIsMenuOpen(false); navigate('/login'); }} className="ml-4 bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 rounded-full">Login</button>
              )}
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}
