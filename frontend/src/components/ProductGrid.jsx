import React, { useState } from 'react';
import ProductCard from './ProductCard';
import { FaSearch, FaShip } from 'react-icons/fa';

const ProductGrid = ({ products, loading, error, onAddToCart, isAdmin, onEdit, onDelete, onViewDetails, cart = [] }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeFilter, setActiveFilter] = useState('All');

  // Filter chips derived from the original HTML nav spans
  const filterOptions = ['All', 'Noah', "Barto Club's Ship", "Beasts Pirates' Fleet", 'Zap Ship', 'Victory Hunter'];

  // Handle Search & Filter logic
  const filteredProducts = products.filter((product) => {
    const matchesSearch = product.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          product.description.toLowerCase().includes(searchTerm.toLowerCase());
    
    if (activeFilter === 'All') {
      return matchesSearch;
    } else {
      return matchesSearch && product.title.toLowerCase().includes(activeFilter.toLowerCase());
    }
  });

  if (loading) {
    return (
      <div className="spinner-container">
        <div className="spinner"></div>
        <p style={{ textAlign: 'center', color: 'var(--text-muted)' }}>Loading shipyard inventory...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="alert-error">
        <h3>⚠️ Logistical Error</h3>
        <p>{error}</p>
      </div>
    );
  }

  return (
    <div className="grid-container">
      {/* Search Input */}
      <div className="search-container">
        <input 
          type="text" 
          className="search-input" 
          placeholder="Search legendary vessels (e.g. Noah, Submarine)..." 
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {/* Navigation Filter Chips (from original template) */}
      <div className="filter-nav">
        {filterOptions.map((filter) => (
          <button 
            key={filter} 
            className={`filter-chip ${activeFilter === filter ? 'active' : ''}`}
            onClick={() => setActiveFilter(filter)}
          >
            {filter}
          </button>
        ))}
      </div>

      {/* Product list header */}
      <div style={{ marginBottom: '25px', textAlign: 'center' }}>
        <h2 style={{ fontFamily: 'var(--font-title)', letterSpacing: '1px', marginBottom: '8px' }}>
          Legendary Pirate Ships
        </h2>
        <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem' }}>
          Acquire the finest vessels of the Grand Line at unbeatable prices!
        </p>
      </div>

      {filteredProducts.length === 0 ? (
        <div className="empty-state">
          <FaShip />
          <h3>No vessels found in this sector</h3>
          <p>Try searching for another ship or adjusting your filter criteria.</p>
        </div>
      ) : (
        <div className="grid">
          {filteredProducts.map((product) => (
            <ProductCard 
              key={product._id} 
              product={product} 
              onAddToCart={onAddToCart}
              isAdmin={isAdmin}
              onEdit={onEdit}
              onDelete={onDelete}
              onViewDetails={onViewDetails}
              isInCart={cart.some((item) => item._id === product._id)}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default ProductGrid;
