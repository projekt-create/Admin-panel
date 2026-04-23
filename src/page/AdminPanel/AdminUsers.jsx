import React, { useState, useEffect } from 'react';
import { getAdminUsers, createAdminUser, updateAdminUser, deleteAdminUser } from '../../api/api';
import Modal from '../../components/Modal';
import { toast } from 'react-toastify';

const EMPTY_FORM = { name: '', email: '', password: '', role: 'admin' };
const roles = ['superadmin', 'admin', 'moderator'];

const roleColors = {
  superadmin: 'bg-orange-500/20 text-orange-400',
  admin: 'bg-blue-500/20 text-blue-400',
  moderator: 'bg-green-500/20 text-green-400',
};

const AdminUsersPage = () => {
  const [admins, setAdmins] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editItem, setEditItem] = useState(null);
  const [form, setForm] = useState(EMPTY_FORM);

  const load = () => {
    setLoading(true);
    getAdminUsers().then((res) => setAdmins(res.data)).finally(() => setLoading(false));
  };

  useEffect(() => { load(); }, []);

  const openAdd = () => { setEditItem(null); setForm(EMPTY_FORM); setModalOpen(true); };
  const openEdit = (a) => { setEditItem(a); setForm({ name: a.name, email: a.email, password: a.password, role: a.role }); setModalOpen(true); };
  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSave = async () => {
    try {
      if (editItem) {
        await updateAdminUser(editItem.id, { ...editItem, ...form });
        toast.success('Admin updated!', { theme: 'dark' });
      } else {
        await createAdminUser({
          ...form,
          avatar: `https://i.pravatar.cc/150?img=${Math.floor(Math.random() * 30) + 1}`,
          createdAt: new Date().toISOString().split('T')[0],
          token: `adm_${Date.now()}`,
        });
        toast.success('Admin created!', { theme: 'dark' });
      }
      setModalOpen(false);
      load();
    } catch {
      toast.error('Failed to save', { theme: 'dark' });
    }
  };

  const handleDelete = async (id) => {
    if (!confirm('Delete this admin user?')) return;
    try {
      await deleteAdminUser(id);
      toast.success('Admin deleted', { theme: 'dark' });
      load();
    } catch {
      toast.error('Failed to delete', { theme: 'dark' });
    }
  };

  return (
    <div className="p-6 md:p-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-2xl font-bold text-white">Admin Users</h1>
          <p className="text-gray-400 text-sm mt-1">{admins.length} admin users</p>
        </div>
        <button onClick={openAdd} className="bg-orange-500 hover:bg-orange-600 text-white px-5 py-2.5 rounded-xl font-medium text-sm transition-colors flex items-center gap-2">
          <span>+</span> Add Admin
        </button>
      </div>

      <div className="bg-gray-800 border border-gray-700 rounded-2xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-gray-700/50">
              <tr>
                {['Admin', 'Email', 'Role', 'Joined', 'Actions'].map((h) => (
                  <th key={h} className="px-6 py-3 text-left text-gray-400 font-medium">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-700">
              {loading
                ? [...Array(5)].map((_, i) => (
                    <tr key={i}><td colSpan={5} className="px-6 py-4"><div className="h-10 bg-gray-700 rounded animate-pulse" /></td></tr>
                  ))
                : admins.map((a) => (
                    <tr key={a.id} className="hover:bg-gray-700/30 transition-colors">
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <img src={a.avatar} alt={a.name} className="w-9 h-9 rounded-full border border-gray-600" />
                          <p className="text-white font-medium">{a.name}</p>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-gray-400">{a.email}</td>
                      <td className="px-6 py-4">
                        <span className={`px-3 py-1 rounded-full text-xs font-medium ${roleColors[a.role] || 'bg-gray-600 text-gray-300'}`}>
                          {a.role}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-gray-400">{a.createdAt}</td>
                      <td className="px-6 py-4">
                        <div className="flex gap-2">
                          <button onClick={() => openEdit(a)} className="text-blue-400 text-xs px-3 py-1.5 rounded-lg bg-blue-500/10 hover:bg-blue-500/20 transition-colors">Edit</button>
                          <button onClick={() => handleDelete(a.id)} className="text-red-400 text-xs px-3 py-1.5 rounded-lg bg-red-500/10 hover:bg-red-500/20 transition-colors">Delete</button>
                        </div>
                      </td>
                    </tr>
                  ))}
            </tbody>
          </table>
        </div>
      </div>

      <Modal isOpen={modalOpen} onClose={() => setModalOpen(false)} title={editItem ? 'Edit Admin' : 'Add Admin'}>
        <div className="space-y-4">
          {[['name','Name','text'], ['email','Email','email'], ['password','Password','password']].map(([name, label, type]) => (
            <div key={name}>
              <label className="text-gray-400 text-sm mb-1.5 block">{label}</label>
              <input type={type} name={name} value={form[name]} onChange={handleChange}
                className="w-full bg-gray-700 border border-gray-600 rounded-xl px-4 py-2.5 text-white text-sm focus:outline-none focus:border-orange-500" />
            </div>
          ))}
          <div>
            <label className="text-gray-400 text-sm mb-1.5 block">Role</label>
            <select name="role" value={form.role} onChange={handleChange} className="w-full bg-gray-700 border border-gray-600 rounded-xl px-4 py-2.5 text-white text-sm focus:outline-none focus:border-orange-500">
              {roles.map((r) => <option key={r} value={r}>{r}</option>)}
            </select>
          </div>
          <div className="flex gap-3 pt-2">
            <button onClick={() => setModalOpen(false)} className="flex-1 border border-gray-600 text-gray-300 py-2.5 rounded-xl text-sm transition-colors">Cancel</button>
            <button onClick={handleSave} className="flex-1 bg-orange-500 hover:bg-orange-600 text-white py-2.5 rounded-xl text-sm font-medium transition-colors">
              {editItem ? 'Update' : 'Create'}
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default AdminUsersPage;
