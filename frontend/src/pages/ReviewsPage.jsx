import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import api from '../api/api';
import { MessageSquare, Plus, Star, MapPin } from 'lucide-react';

const ReviewsPage = () => {
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({ title: '', content: '', location_name: '', category: 'Hidden Gem' });
  const queryClient = useQueryClient();

  const { data: reviews, isLoading } = useQuery({
    queryKey: ['reviews'],
    queryFn: () => api.get('/reviews/').then(res => res.data)
  });

  const createMutation = useMutation({
    mutationFn: (newReview) => api.post('/reviews/', newReview),
    onSuccess: () => {
      queryClient.invalidateQueries(['reviews']);
      setShowForm(false);
      setFormData({ title: '', content: '', location_name: '', category: 'Hidden Gem' });
    }
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    createMutation.mutate(formData);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-slate-800">Local Insights & Tips</h2>
        <button 
          onClick={() => setShowForm(!showForm)}
          className="bg-emerald-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-emerald-700 transition-colors"
        >
          <Plus size={20} />
          Share a Tip
        </button>
      </div>

      {showForm && (
        <form onSubmit={handleSubmit} className="bg-white p-6 rounded-xl border border-emerald-200 shadow-sm space-y-4">
          <h3 className="text-lg font-bold text-slate-800">Share Local Experience</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input 
              type="text" placeholder="Tip Title (e.g. Best Sunset Spot)" required
              className="p-2 border rounded-lg" 
              value={formData.title} onChange={e => setFormData({...formData, title: e.target.value})}
            />
            <input 
              type="text" placeholder="Location" required
              className="p-2 border rounded-lg" 
              value={formData.location_name} onChange={e => setFormData({...formData, location_name: e.target.value})}
            />
            <select 
              className="p-2 border rounded-lg"
              value={formData.category} onChange={e => setFormData({...formData, category: e.target.value})}
            >
              <option value="Hidden Gem">Hidden Gem</option>
              <option value="Food & Drink">Food & Drink</option>
              <option value="Pop-up Event">Pop-up Event</option>
              <option value="Travel Hack">Travel Hack</option>
            </select>
          </div>
          <textarea 
            placeholder="Tell us more..." required
            className="w-full p-2 border rounded-lg h-24"
            value={formData.content} onChange={e => setFormData({...formData, content: e.target.value})}
          />
          <div className="flex justify-end gap-2">
            <button type="button" onClick={() => setShowForm(false)} className="px-4 py-2 text-slate-500">Cancel</button>
            <button type="submit" className="bg-emerald-600 text-white px-6 py-2 rounded-lg font-bold">Post Tip</button>
          </div>
        </form>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {isLoading ? <p>Loading tips...</p> : (reviews ?? []).map(review => (
          <div key={review.id} className="bg-white p-6 rounded-xl shadow-sm border border-slate-100 hover:shadow-md transition-shadow">
            <div className="flex justify-between items-start mb-4">
              <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-2 py-1 rounded">{review.category}</span>
              <div className="flex items-center gap-1 text-amber-500">
                <Star size={16} fill="currentColor" />
                <span className="text-sm font-bold">{review.upvotes}</span>
              </div>
            </div>
            <h4 className="text-xl font-bold text-slate-900 mb-2">{review.title}</h4>
            <p className="text-slate-600 mb-4">{review.content}</p>
            <div className="flex items-center justify-between pt-4 border-t border-slate-50">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-xs font-bold">
                  {review.user_name[0].toUpperCase()}
                </div>
                <div>
                  <p className="text-xs font-bold">{review.user_name} {review.user_verified && '✅'}</p>
                  <p className="text-[10px] text-slate-400">{new Date(review.created_at).toLocaleDateString()}</p>
                </div>
              </div>
              <span className="flex items-center gap-1 text-xs text-slate-500">
                <MapPin size={12} /> {review.location_name}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ReviewsPage;