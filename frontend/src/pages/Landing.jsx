import React from 'react';
import { Link } from 'react-router-dom';
import { ShieldAlert, MapPin, Users, Zap } from 'lucide-react';

const Landing = () => {
  return (
    <div className="min-h-screen">
      <nav className="p-6 flex justify-between items-center max-w-7xl mx-auto">
        <div className="flex items-center gap-2 text-2xl font-bold text-amber-600">
          <ShieldAlert size={32} />
          <span>LocalPulse</span>
        </div>
        <div className="space-x-4">
          <Link to="/login" className="text-slate-600 hover:text-slate-900 font-medium">Log in</Link>
          <Link to="/register" className="bg-amber-600 text-white px-5 py-2 rounded-lg font-medium hover:bg-amber-700">Get Started</Link>
        </div>
      </nav>

      <header className="max-w-7xl mx-auto px-6 py-20 text-center">
        <h1 className="text-5xl md:text-6xl font-extrabold text-slate-900 mb-6">
          Travel Smart. <span className="text-amber-600">Stay Safe.</span>
        </h1>
        <p className="text-xl text-slate-600 max-w-2xl mx-auto mb-10">
          Real-time safety alerts and authentic local experiences aggregated into a single dashboard. Tailored for solo adventurers and backpackers.
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <Link to="/register" className="bg-amber-600 text-white px-8 py-4 rounded-xl text-lg font-bold hover:bg-amber-700 shadow-lg">Create Free Account</Link>
          <Link to="/login" className="bg-white border border-slate-200 text-slate-700 px-8 py-4 rounded-xl text-lg font-bold hover:bg-slate-50 shadow-sm">View Live Demo</Link>
        </div>
      </header>

      <section className="bg-white py-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-3 gap-12">
            <div className="p-8 rounded-2xl bg-slate-50 border border-slate-100">
              <div className="w-12 h-12 bg-amber-100 text-amber-600 rounded-lg flex items-center justify-center mb-6">
                <Zap size={24} />
              </div>
              <h3 className="text-xl font-bold mb-4">Real-Time Alerts</h3>
              <p className="text-slate-600">Get push notifications about protests, weather changes, and safety risks based on your current geo-location.</p>
            </div>
            <div className="p-8 rounded-2xl bg-slate-50 border border-slate-100">
              <div className="w-12 h-12 bg-emerald-100 text-emerald-600 rounded-lg flex items-center justify-center mb-6">
                <MapPin size={24} />
              </div>
              <h3 className="text-xl font-bold mb-4">Hidden Gems</h3>
              <p className="text-slate-600">Discover pop-up events and micro-reviews from verified locals that you won't find in any guidebook.</p>
            </div>
            <div className="p-8 rounded-2xl bg-slate-50 border border-slate-100">
              <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-lg flex items-center justify-center mb-6">
                <Users size={24} />
              </div>
              <h3 className="text-xl font-bold mb-4">Verified Community</h3>
              <p className="text-slate-600">Trust the information you receive with our crowd-sourced verification badge system for local contributors.</p>
            </div>
          </div>
        </div>
      </section>

      <footer className="py-10 text-center text-slate-500 border-t border-slate-100">
        <p>© 2024 LocalPulse Alerts. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default Landing;