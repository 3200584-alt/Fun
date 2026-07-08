import React, { useState, useEffect } from 'react';
import ProductGrid from './ProductGrid';
import { FaPlus, FaUndo } from 'react-icons/fa';

const AdminDashboard = ({ 
  products, 
  loading, 
  error, 
  onCreateProduct, 
  onUpdateProduct, 
  onDeleteProduct,
  editingProduct,
  setEditingProduct
}) => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    price: '',
    imageUrl: '',
    category: 'Legendary Ships'
  });

  // Sync form with editing product state
  useEffect(() => {
    if (editingProduct) {
      setFormData({
        title: editingProduct.title || '',
        description: editingProduct.description || '',
        price: editingProduct.price || '',
        imageUrl: editingProduct.imageUrl || '',
        category: editingProduct.category || 'Legendary Ships'
      });
    } else {
      setFormData({
        title: '',
        description: '',
        price: '',
        imageUrl: '',
        category: 'Legendary Ships'
      });
    }
  }, [editingProduct]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.title || !formData.description || !formData.price || !formData.imageUrl) {
      alert('Please fill out all fields!');
      return;
    }

    const payload = {
      ...formData,
      price: parseFloat(formData.price)
    };

    if (editingProduct) {
      onUpdateProduct(editingProduct._id, payload);
    } else {
      onCreateProduct(payload);
    }

    // Reset form
    setFormData({
      title: '',
      description: '',
      price: '',
      imageUrl: '',
      category: 'Legendary Ships'
    });
    setEditingProduct(null);
  };

  const handleCancelEdit = () => {
    setEditingProduct(null);
  };

  return (
    <div className="admin-container">
      <div className="admin-header">
        <h2>Shipyard Commissioning Office</h2>
        <p style={{ color: 'var(--text-muted)' }}>Commission new vessels or dismantle active inventory.</p>
      </div>

      {/* Glassmorphic CRUD Form */}
      <div className="form-card">
        <h3>{editingProduct ? '🔧 Refit Vessel Details' : '🔨 Commission New Vessel'}</h3>
        
        <form onSubmit={handleSubmit}>
          <div className="form-grid">
            <div className="form-group">
              <label htmlFor="title">Vessel Class / Name</label>
              <input 
                type="text" 
                id="title" 
                name="title" 
                className="form-control"
                placeholder="e.g. Thousand Sunny"
                value={formData.title}
                onChange={handleChange}
                required
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="price">Price (USD)</label>
              <input 
                type="number" 
                id="price" 
                name="price" 
                className="form-control"
                placeholder="e.g. 15000000"
                value={formData.price}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="imageUrl">Blueprint Image URL</label>
              <input 
                type="url" 
                id="imageUrl" 
                name="imageUrl" 
                className="form-control"
                placeholder="https://onepiece.fandom.com/wiki/Special:FilePath/..."
                value={formData.imageUrl}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="category">Category / Sea Region</label>
              <select 
                id="category" 
                name="category" 
                className="form-control"
                value={formData.category}
                onChange={handleChange}
              >
                <option value="Legendary Ships">Legendary Ships</option>
                <option value="East Blue">East Blue</option>
                <option value="Submarines">Submarines</option>
                <option value="Worst Generation">Worst Generation</option>
                <option value="Grand Fleet">Grand Fleet</option>
                <option value="Grand Line">Grand Line</option>
                <option value="Emperor Fleets">Emperor Fleets</option>
                <option value="Warlord Ships">Warlord Ships</option>
                <option value="New World">New World</option>
                <option value="Speedboats">Speedboats</option>
              </select>
            </div>

            <div className="form-group full-width">
              <label htmlFor="description">Vessel Logs / History</label>
              <textarea 
                id="description" 
                name="description" 
                className="form-control"
                rows="3"
                placeholder="Document the historical voyages or structural attributes of this vessel..."
                value={formData.description}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div className="form-actions">
            {editingProduct && (
              <button 
                type="button" 
                className="btn-secondary"
                onClick={handleCancelEdit}
              >
                <FaUndo style={{ marginRight: '6px' }} />
                Cancel Refit
              </button>
            )}
            
            <button type="submit" className="btn-primary">
              <FaPlus />
              {editingProduct ? 'Save Vessel Logs' : 'Commission Ship'}
            </button>
          </div>
        </form>
      </div>

      <hr style={{ borderColor: 'rgba(100, 255, 218, 0.1)', margin: '40px 0' }} />

      {/* Admin Grid View */}
      <h3 style={{ fontFamily: 'var(--font-title)', marginBottom: '25px', textAlign: 'center' }}>
        Active Fleet Database
      </h3>
      
      <ProductGrid 
        products={products}
        loading={loading}
        error={error}
        isAdmin={true}
        onEdit={setEditingProduct}
        onDelete={onDeleteProduct}
      />
    </div>
  );
};

export default AdminDashboard;
