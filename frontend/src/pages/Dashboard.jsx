import React from 'react';
import { useQuery } from '@tanstack/react-query';
import api from '../api/api';
import { ShieldAlert, MessageSquare, Map, TrendingUp, AlertTriangle, Star } from 'lucide-react';
import { Link } from 'react-router-dom';

const Dashboard = () => {
  const { data: alerts, isLoading: alertsLoading } = useQuery({
    queryKey: ['alerts'],
    queryFn: () => api.get('/alerts/').then(res => res.data)
  });

  const { data: reviews, isLoading: reviewsLoading } = useQuery({
    queryKey: ['reviews'],
    queryFn: () => api.get('/reviews/').then(res => res.data)
  });

  const stats = [
    { label: 'Active Alerts', value: alerts?.length || 0, icon: AlertTriangle, color: 'text-amber-600', bg: 'bg-amber-50' },
    { label: 'Local Tips', value: reviews?.length || 0, icon: Star, color: 'text-emerald-600', bg: 'bg-emerald-50' },
    { label: 'Nearby Users', value: '42', icon: TrendingUp, color: 'text-blue-600', bg: 'bg-blue-50' },
  ];

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {stats.map((stat, i) => (
          <div key={i} className="bg-white p-6 rounded-xl shadow-sm border border-slate-100 flex items-center gap-4">
            <div className={`w-12 h-12 ${stat.bg} ${stat.color} rounded-lg flex items-center justify-center`}>
              <stat.icon size={24} />
            </div>
            <div>
              <p className="text-slate-500 text-sm">{stat.label}</p>
              <p className="text-2xl font-bold text-slate-900">{stat.value}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <section className="bg-white rounded-xl shadow-sm border border-slate-100 overflow-hidden">
          <div className="p-4 border-b border-slate-100 flex justify-between items-center">
            <h3 className="font-bold text-slate-800 flex items-center gap-2">
              <ShieldAlert size={20} className="text-amber-600" />
              Recent Safety Alerts
            </h3>
            <Link to="/alerts" className="text-amber-600 text-sm font-medium hover:underline">View All</Link>
          </div>
          <div className="divide-y divide-slate-50">
            {alertsLoading ? <p className="p-6 text-slate-400">Loading alerts...</p> : 
             (alerts ?? []).slice(0, 5).map(alert => (
              <div key={alert.id} className="p-4 hover:bg-slate-50 transition-colors">
                <div className="flex justify-between items-start mb-1">
                  <h4 className="font-semibold text-slate-900">{alert.title}</h4>
                  <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold ${
                    alert.severity === 'CRITICAL' ? 'bg-red-100 text-red-600' : 'bg-amber-100 text-amber-600'
                  }`}>
                    {alert.severity}
                  </span>
                </div>
                <p className="text-sm text-slate-600 line-clamp-1">{alert.description}</p>
                <p className="text-xs text-slate-400 mt-2">{alert.location_name} • {new Date(alert.created_at).toLocaleTimeString()}</p>
              </div>
            ))}
            {alerts?.length === 0 && <p className="p-6 text-center text-slate-400">No active alerts in your area.</p>}
          </div>
        </section>

        <section className="bg-white rounded-xl shadow-sm border border-slate-100 overflow-hidden">
          <div className="p-4 border-b border-slate-100 flex justify-between items-center">
            <h3 className="font-bold text-slate-800 flex items-center gap-2">
              <Star size={20} className="text-emerald-600" />
              Latest Local Tips
            </h3>
            <Link to="/reviews" className="text-emerald-600 text-sm font-medium hover:underline">View All</Link>
          </div>
          <div className="divide-y divide-slate-50">
            {reviewsLoading ? <p className="p-6 text-slate-400">Loading tips...</p> : 
             (reviews ?? []).slice(0, 5).map(review => (
              <div key={review.id} className="p-4 hover:bg-slate-50 transition-colors">
                <h4 className="font-semibold text-slate-900">{review.title}</h4>
                <p className="text-sm text-slate-600 line-clamp-1">{review.content}</p>
                <div className="flex items-center gap-2 mt-2">
                  <span className="text-xs bg-slate-100 text-slate-600 px-2 py-0.5 rounded">{review.category}</span>
                  <p className="text-xs text-slate-400">{review.location_name} • by {review.user_name}</p>
                </div>
              </div>
            ))}
            {reviews?.length === 0 && <p className="p-6 text-center text-slate-400">No tips shared yet. Be the first!</p>}
          </div>
        </section>
      </div>
    </div>
  );
};

export default Dashboard;