import React, { useState, useEffect } from 'react';
import { getSupports, deleteSupport } from '../../api/api';
import { toast } from 'react-toastify';

const Supports = () => {
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(true);

  const load = () => {
    setLoading(true);
    getSupports().then((res) => setTickets(res.data)).finally(() => setLoading(false));
  };

  useEffect(() => { load(); }, []);

  const handleDelete = async (id) => {
    if (!confirm('Delete this support ticket?')) return;
    try {
      await deleteSupport(id);
      toast.success('Ticket deleted', { theme: 'dark' });
      load();
    } catch {
      toast.error('Failed to delete', { theme: 'dark' });
    }
  };

  return (
    <div className="p-6 md:p-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-white">Support Tickets</h1>
        <p className="text-gray-400 text-sm mt-1">{tickets.length} open tickets</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        {loading
          ? [...Array(6)].map((_, i) => (
              <div key={i} className="bg-gray-800 rounded-2xl h-36 animate-pulse border border-gray-700" />
            ))
          : tickets.map((t) => (
              <div key={t.id} className="bg-gray-800 border border-gray-700 rounded-2xl p-5 hover:border-orange-500/40 transition-colors">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 bg-orange-500/20 text-orange-400 rounded-lg flex items-center justify-center text-sm font-bold">
                      #{t.id}
                    </div>
                    <div>
                      <p className="text-white text-sm font-medium">User #{t.userId}</p>
                      <p className="text-gray-500 text-xs">{t.date}</p>
                    </div>
                  </div>
                  <button
                    onClick={() => handleDelete(t.id)}
                    className="text-gray-500 hover:text-red-400 transition-colors p-1"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                  </button>
                </div>
                <p className="text-gray-300 text-sm leading-relaxed">{t.message}</p>
                <div className="mt-3 flex gap-2">
                  <button className="text-xs text-blue-400 bg-blue-500/10 hover:bg-blue-500/20 px-3 py-1.5 rounded-lg transition-colors">Reply</button>
                  <button
                    onClick={() => handleDelete(t.id)}
                    className="text-xs text-green-400 bg-green-500/10 hover:bg-green-500/20 px-3 py-1.5 rounded-lg transition-colors"
                  >
                    Resolve
                  </button>
                </div>
              </div>
            ))}
      </div>

      {!loading && tickets.length === 0 && (
        <div className="text-center py-16">
          <p className="text-5xl mb-4">✅</p>
          <p className="text-white font-semibold text-lg">All clear!</p>
          <p className="text-gray-400 text-sm mt-1">No support tickets at the moment.</p>
        </div>
      )}
    </div>
  );
};

export default Supports;
