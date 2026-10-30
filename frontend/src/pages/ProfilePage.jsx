import React from 'react';
import { useAuth } from '../context/AuthContext';
import { User, Shield, Bell, Map, Settings } from 'lucide-react';

const ProfilePage = () => {
  const { user } = useAuth();

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-8 flex items-center gap-8">
        <div className="w-24 h-24 rounded-full bg-amber-100 flex items-center justify-center text-amber-600 text-4xl font-bold">
          {user?.username[0].toUpperCase()}
        </div>
        <div>
          <h2 className="text-3xl font-bold text-slate-900">{user?.username}</h2>
          <p className="text-slate-500">{user?.email}</p>
          <div className="mt-4 flex gap-2">
            <span className={`px-3 py-1 rounded-full text-xs font-bold ${
              user?.is_verified_local ? 'bg-emerald-100 text-emerald-700' : 'bg-blue-100 text-blue-700'
            }`}>
              {user?.is_verified_local ? 'Verified Local Contributor' : 'Standard Traveler Account'}
            </span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6">
          <h3 className="text-lg font-bold mb-6 flex items-center gap-2">
            <Settings size={20} className="text-slate-400" />
            Preferences
          </h3>
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">Risk Tolerance</label>
              <select className="w-full p-2 border rounded-lg bg-slate-50" defaultValue={user?.risk_tolerance}>
                <option value="low">Low (Show all minor alerts)</option>
                <option value="medium">Medium (Balanced)</option>
                <option value="high">High (Only critical alerts)</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">Primary Region</label>
              <input 
                type="text" 
                placeholder="e.g. Southeast Asia" 
                className="w-full p-2 border rounded-lg bg-slate-50"
              />
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-slate-700">Push Notifications</span>
              <div className="w-12 h-6 bg-amber-600 rounded-full relative">
                <div className="absolute right-1 top-1 w-4 h-4 bg-white rounded-full"></div>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6">
          <h3 className="text-lg font-bold mb-6 flex items-center gap-2">
            <Shield size={20} className="text-slate-400" />
            Trust & Verification
          </h3>
          <p className="text-sm text-slate-600 mb-6">
            Verified locals get a badge on their reports and their alerts are prioritized in the feed.
          </p>
          {!user?.is_verified_local ? (
            <button className="w-full py-3 border-2 border-dashed border-amber-300 text-amber-600 rounded-xl font-bold hover:bg-amber-50 transition-colors">
              Apply for Local Verification
            </button>
          ) : (
            <div className="p-4 bg-emerald-50 text-emerald-700 rounded-xl flex items-center gap-3">
              <Shield size={24} />
              <span className="font-bold">You are a verified contributor!</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;