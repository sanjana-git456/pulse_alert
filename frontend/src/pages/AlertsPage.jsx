import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import api from '../api/api';
import { AlertTriangle, Plus, MapPin, Search } from 'lucide-react';

const AlertsPage = () => {
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({ title: '', description: '', alert_type: 'SAFETY', severity: 'LOW', location_name: '' });
  const queryClient = useQueryClient();

  const { data: alerts, isLoading } = useQuery({
    queryKey: ['alerts'],
    queryFn: () => api.get('/alerts/').then(res => res.data)
  });

  const createMutation = useMutation({
    mutationFn: (newAlert) => api.post('/alerts/', newAlert),
    onSuccess: () => {
      queryClient.invalidateQueries(['alerts']);
      setShowForm(false);
      setFormData({ title: '', description: '', alert_type: 'SAFETY', severity: 'LOW', location_name: '' });
    }
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    createMutation.mutate(formData);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div className="relative w-full max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
          <input 
            type="text" 
            placeholder="Search alerts by city or type..." 
            className="w-full pl-10 pr-4 py-2 rounded-lg border border-slate-200 outline-none focus:ring-2 focus:ring-amber-500"
          />
        </div>
        <button 
          onClick={() => setShowForm(!showForm)}
          className="bg-amber-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-amber-700 transition-colors"
        >
          <Plus size={20} />
          Report Alert
        </button>
      </div>

      {showForm && (
        <form onSubmit={handleSubmit} className="bg-white p-6 rounded-xl border border-amber-200 shadow-sm space-y-4">
          <h3 className="text-lg font-bold text-slate-800">Report New Safety Alert</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input 
              type="text" placeholder="Alert Title" required
              className="p-2 border rounded-lg" 
              value={formData.title} onChange={e => setFormData({...formData, title: e.target.value})}
            />
            <input 
              type="text" placeholder="Location (e.g. Paris, City Center)" required
              className="p-2 border rounded-lg" 
              value={formData.location_name} onChange={e => setFormData({...formData, location_name: e.target.value})}
            />
            <select 
              className="p-2 border rounded-lg"
              value={formData.alert_type} onChange={e => setFormData({...formData, alert_type: e.target.value})}
            >
              <option value="SAFETY">Safety Issue</option>
              <option value="WEATHER">Weather</option>
              <option value="EVENT">Event</option>
              <option value="CROWD">Crowd Density</option>
            </select>
            <select 
              className="p-2 border rounded-lg"
              value={formData.severity} onChange={e => setFormData({...formData, severity: e.target.value})}
            >
              <option value="LOW">Low Severity</option>
              <option value="MEDIUM">Medium</option>
              <option value="HIGH">High</option>
              <option value="CRITICAL">Critical</option>
            </select>
          </div>
          <textarea 
            placeholder="Describe the situation..." required
            className="w-full p-2 border rounded-lg h-24"
            value={formData.description} onChange={e => setFormData({...formData, description: e.target.value})}
          />
          <div className="flex justify-end gap-2">
            <button type="button" onClick={() => setShowForm(false)} className="px-4 py-2 text-slate-500">Cancel</button>
            <button type="submit" className="bg-amber-600 text-white px-6 py-2 rounded-lg font-bold">Submit Report</button>
          </div>
        </form>
      )}

      <div className="space-y-4">
        {isLoading ? <p>Loading alerts...</p> : (alerts ?? []).map(alert => (
          <div key={alert.id} className="bg-white p-5 rounded-xl shadow-sm border border-slate-100 flex gap-4">
            <div className={`w-12 h-12 flex-shrink-0 rounded-full flex items-center justify-center ${
              alert.severity === 'CRITICAL' ? 'bg-red-100 text-red-600' : 'bg-amber-100 text-amber-600'
            }`}>
              <AlertTriangle size={24} />
            </div>
            <div className="flex-1">
              <div className="flex justify-between">
                <h4 className="font-bold text-slate-900">{alert.title}</h4>
                <span className="text-xs text-slate-400">{new Date(alert.created_at).toLocaleDateString()}</span>
              </div>
              <p className="text-slate-600 mt-1">{alert.description}</p>
              <div className="flex items-center gap-4 mt-3">
                <span className="flex items-center gap-1 text-xs text-slate-500 font-medium">
                  <MapPin size={14} /> {alert.location_name}
                </span>
                <span className="text-xs bg-slate-100 text-slate-600 px-2 py-0.5 rounded uppercase font-bold">
                  {alert.alert_type}
                </span>
                {alert.is_verified_user && (
                  <span className="text-[10px] bg-emerald-100 text-emerald-700 px-2 py-0.5 rounded-full font-bold">
                    VERIFIED LOCAL SOURCE
                  </span>
                )}
              </div>
            </div>
          </div>
        ))}
        {!isLoading && alerts?.length === 0 && (
          <div className="text-center py-20 bg-white rounded-xl border border-dashed border-slate-300">
            <AlertTriangle size={48} className="mx-auto text-slate-300 mb-4" />
            <p className="text-slate-500">No alerts reported in this area yet.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default AlertsPage;