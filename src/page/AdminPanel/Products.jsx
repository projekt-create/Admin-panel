import React, { useState, useEffect } from 'react';
import { getProducts, createProduct, updateProduct, deleteProduct } from '../../api/api';
import Modal from '../../components/Modal';
import { toast } from 'react-toastify';

const EMPTY_FORM = { name: '', price: '', category: '', stock: '', description: '', image: '' };
const categories = ['Electronics', 'Clothing', 'Home', 'Sports', 'Books'];

const AdminProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editItem, setEditItem] = useState(null);
  const [form, setForm] = useState(EMPTY_FORM);
  const [search, setSearch] = useState('');

  const load = () => {
    setLoading(true);
    getProducts().then((res) => setProducts(res.data)).finally(() => setLoading(false));
  };

  useEffect(() => { load(); }, []);

  const openAdd = () => { setEditItem(null); setForm(EMPTY_FORM); setModalOpen(true); };
  const openEdit = (p) => { setEditItem(p); setForm({ name: p.name, price: p.price, category: p.category, stock: p.stock, description: p.description, image: p.image }); setModalOpen(true); };

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSave = async () => {
    const data = { ...form, price: parseFloat(form.price), stock: parseInt(form.stock) };
    try {
      if (editItem) {
        await updateProduct(editItem.id, data);
        toast.success('Product updated!', { theme: 'dark' });
      } else {
        await createProduct(data);
        toast.success('Product created!', { theme: 'dark' });
      }
      setModalOpen(false);
      load();
    } catch {
      toast.error('Failed to save product', { theme: 'dark' });
    }
  };

  const handleDelete = async (id) => {
    if (!confirm('Delete this product?')) return;
    try {
      await deleteProduct(id);
      toast.success('Product deleted', { theme: 'dark' });
      load();
    } catch {
      toast.error('Failed to delete', { theme: 'dark' });
    }
  };

  const filtered = products.filter((p) =>
    p.name.toLowerCase().includes(search.toLowerCase()) ||
    p.category.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="p-6 md:p-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-2xl font-bold text-white">Products</h1>
          <p className="text-gray-400 text-sm mt-1">{products.length} total products</p>
        </div>
        <button onClick={openAdd} className="bg-orange-500 hover:bg-orange-600 text-white px-5 py-2.5 rounded-xl font-medium text-sm transition-colors flex items-center gap-2">
          <span>+</span> Add Product
        </button>
      </div>

      {/* Search */}
      <div className="relative mb-6">
        <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
        <input type="text" placeholder="Search products..." value={search} onChange={(e) => setSearch(e.target.value)}
          className="w-full md:w-80 bg-gray-800 border border-gray-700 rounded-xl pl-10 pr-4 py-2.5 text-white placeholder-gray-500 focus:outline-none focus:border-orange-500 text-sm" />
      </div>

      {/* Table */}
      <div className="bg-gray-800 border border-gray-700 rounded-2xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-gray-700/50">
              <tr>
                {['Product', 'Category', 'Price', 'Stock', 'Actions'].map((h) => (
                  <th key={h} className="px-6 py-3 text-left text-gray-400 font-medium">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-700">
              {loading
                ? [...Array(5)].map((_, i) => (
                    <tr key={i}><td colSpan={5} className="px-6 py-4"><div className="h-10 bg-gray-700 rounded animate-pulse" /></td></tr>
                  ))
                : filtered.map((p) => (
                    <tr key={p.id} className="hover:bg-gray-700/30 transition-colors">
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <img src={p.image} alt={p.name} className="w-10 h-10 rounded-lg object-cover" />
                          <div>
                            <p className="text-white font-medium">{p.name}</p>
                            <p className="text-gray-500 text-xs truncate max-w-[200px]">{p.description}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-gray-300">{p.category}</td>
                      <td className="px-6 py-4 text-orange-400 font-semibold">${p.price.toFixed(2)}</td>
                      <td className="px-6 py-4">
                        <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${p.stock <= 10 ? 'bg-red-500/20 text-red-400' : 'bg-green-500/20 text-green-400'}`}>
                          {p.stock}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex gap-2">
                          <button onClick={() => openEdit(p)} className="text-blue-400 hover:text-blue-300 text-xs px-3 py-1.5 rounded-lg bg-blue-500/10 hover:bg-blue-500/20 transition-colors">Edit</button>
                          <button onClick={() => handleDelete(p.id)} className="text-red-400 hover:text-red-300 text-xs px-3 py-1.5 rounded-lg bg-red-500/10 hover:bg-red-500/20 transition-colors">Delete</button>
                        </div>
                      </td>
                    </tr>
                  ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal */}
      <Modal isOpen={modalOpen} onClose={() => setModalOpen(false)} title={editItem ? 'Edit Product' : 'Add Product'}>
        <div className="space-y-4">
          {[['name','Product Name','text','MacBook Pro'], ['price','Price','number','99.99'], ['stock','Stock','number','50'], ['image','Image URL','text','https://...'], ['description','Description','text','Description...']].map(([name, label, type, placeholder]) => (
            <div key={name}>
              <label className="text-gray-400 text-sm mb-1.5 block">{label}</label>
              {name === 'description'
                ? <textarea name={name} value={form[name]} onChange={handleChange} placeholder={placeholder} rows={3} className="w-full bg-gray-700 border border-gray-600 rounded-xl px-4 py-2.5 text-white text-sm focus:outline-none focus:border-orange-500 resize-none placeholder-gray-500" />
                : <input type={type} name={name} value={form[name]} onChange={handleChange} placeholder={placeholder} className="w-full bg-gray-700 border border-gray-600 rounded-xl px-4 py-2.5 text-white text-sm focus:outline-none focus:border-orange-500 placeholder-gray-500" />
              }
            </div>
          ))}
          <div>
            <label className="text-gray-400 text-sm mb-1.5 block">Category</label>
            <select name="category" value={form.category} onChange={handleChange} className="w-full bg-gray-700 border border-gray-600 rounded-xl px-4 py-2.5 text-white text-sm focus:outline-none focus:border-orange-500">
              <option value="">Select category</option>
              {categories.map((c) => <option key={c} value={c}>{c}</option>)}
            </select>
          </div>
          <div className="flex gap-3 pt-2">
            <button onClick={() => setModalOpen(false)} className="flex-1 border border-gray-600 text-gray-300 hover:text-white py-2.5 rounded-xl text-sm transition-colors">Cancel</button>
            <button onClick={handleSave} className="flex-1 bg-orange-500 hover:bg-orange-600 text-white py-2.5 rounded-xl text-sm font-medium transition-colors">
              {editItem ? 'Update' : 'Create'}
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default AdminProducts;
