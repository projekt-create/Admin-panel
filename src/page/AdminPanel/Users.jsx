import React, { useState, useEffect } from 'react';
import { getUsers, updateUser, deleteUser } from '../../api/api';
import Modal from '../../components/Modal';
import { toast } from 'react-toastify';

const AdminUsers = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editItem, setEditItem] = useState(null);
  const [form, setForm] = useState({ name: '', email: '', phone: '' });
  const [search, setSearch] = useState('');

  const load = () => {
    setLoading(true);
    getUsers().then((res) => setUsers(res.data)).finally(() => setLoading(false));
  };

  useEffect(() => { load(); }, []);

  const openEdit = (u) => {
    setEditItem(u);
    setForm({ name: u.name, email: u.email, phone: u.phone });
    setModalOpen(true);
  };

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSave = async () => {
    try {
      await updateUser(editItem.id, { ...editItem, ...form });
      toast.success('User updated!', { theme: 'dark' });
      setModalOpen(false);
      load();
    } catch {
      toast.error('Failed to update', { theme: 'dark' });
    }
  };

  const handleDelete = async (id) => {
    if (!confirm('Delete this user?')) return;
    try {
      await deleteUser(id);
      toast.success('User deleted', { theme: 'dark' });
      load();
    } catch {
      toast.error('Failed to delete', { theme: 'dark' });
    }
  };

  const filtered = users.filter((u) =>
    u.name.toLowerCase().includes(search.toLowerCase()) ||
    u.email.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="p-6 md:p-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-2xl font-bold text-white">Users</h1>
          <p className="text-gray-400 text-sm mt-1">{users.length} registered users</p>
        </div>
      </div>

      <div className="relative mb-6">
        <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
        <input type="text" placeholder="Search users..." value={search} onChange={(e) => setSearch(e.target.value)}
          className="w-full md:w-80 bg-gray-800 border border-gray-700 rounded-xl pl-10 pr-4 py-2.5 text-white placeholder-gray-500 focus:outline-none focus:border-orange-500 text-sm" />
      </div>

      <div className="bg-gray-800 border border-gray-700 rounded-2xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-gray-700/50">
              <tr>
                {['User', 'Email', 'Phone', 'Joined', 'Actions'].map((h) => (
                  <th key={h} className="px-6 py-3 text-left text-gray-400 font-medium">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-700">
              {loading
                ? [...Array(5)].map((_, i) => (
                    <tr key={i}><td colSpan={5} className="px-6 py-4"><div className="h-10 bg-gray-700 rounded animate-pulse" /></td></tr>
                  ))
                : filtered.map((u) => (
                    <tr key={u.id} className="hover:bg-gray-700/30 transition-colors">
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <img src={u.avatar} alt={u.name} className="w-9 h-9 rounded-full border border-gray-600" />
                          <p className="text-white font-medium">{u.name}</p>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-gray-400">{u.email}</td>
                      <td className="px-6 py-4 text-gray-400">{u.phone}</td>
                      <td className="px-6 py-4 text-gray-400">{u.createdAt}</td>
                      <td className="px-6 py-4">
                        <div className="flex gap-2">
                          <button onClick={() => openEdit(u)} className="text-blue-400 hover:text-blue-300 text-xs px-3 py-1.5 rounded-lg bg-blue-500/10 hover:bg-blue-500/20 transition-colors">Edit</button>
                          <button onClick={() => handleDelete(u.id)} className="text-red-400 hover:text-red-300 text-xs px-3 py-1.5 rounded-lg bg-red-500/10 hover:bg-red-500/20 transition-colors">Delete</button>
                        </div>
                      </td>
                    </tr>
                  ))}
            </tbody>
          </table>
        </div>
      </div>

      <Modal isOpen={modalOpen} onClose={() => setModalOpen(false)} title="Edit User">
        <div className="space-y-4">
          {[['name','Name','text'], ['email','Email','email'], ['phone','Phone','tel']].map(([name, label, type]) => (
            <div key={name}>
              <label className="text-gray-400 text-sm mb-1.5 block">{label}</label>
              <input type={type} name={name} value={form[name]} onChange={handleChange}
                className="w-full bg-gray-700 border border-gray-600 rounded-xl px-4 py-2.5 text-white text-sm focus:outline-none focus:border-orange-500" />
            </div>
          ))}
          <div className="flex gap-3 pt-2">
            <button onClick={() => setModalOpen(false)} className="flex-1 border border-gray-600 text-gray-300 py-2.5 rounded-xl text-sm transition-colors">Cancel</button>
            <button onClick={handleSave} className="flex-1 bg-orange-500 hover:bg-orange-600 text-white py-2.5 rounded-xl text-sm font-medium transition-colors">Update</button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default AdminUsers;
