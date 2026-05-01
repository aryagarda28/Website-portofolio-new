import React from 'react';
import { portfolioData } from '../mock';
import Header from './Header.jsx';
import Hero from './Hero.jsx';
import About from './About.jsx';
import Services from './Services.jsx';
import PortfolioSection from './PortfolioSection.jsx';
import Testimonials from './Testimonials.jsx';
import Contact from './Contact.jsx';
import Footer from './Footer.jsx';

export default function Portfolio() {
  return (
    <div className="min-h-screen bg-slate-950">
      <Header />
      <Hero data={portfolioData} />
      <About data={portfolioData.profile} />
      <Services services={portfolioData.services} />
      <PortfolioSection portfolio={portfolioData.portfolio} />
      <Testimonials testimonials={portfolioData.testimonials} />
      <Contact contact={portfolioData.contact} collaboration={portfolioData.collaboration} />
      <Footer contact={portfolioData.contact} />
    </div>
  );
}
