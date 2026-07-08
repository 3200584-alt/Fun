import React from 'react';
import { FaShoppingCart, FaEdit, FaTrash, FaCheck } from 'react-icons/fa';

const ProductCard = ({ product, onAddToCart, isAdmin, onEdit, onDelete, onViewDetails, isInCart }) => {
  const { _id, title, description, price, imageUrl, category } = product;

  const formatPrice = (value) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 0,
    }).format(value);
  };

  return (
    <div 
      className="card" 
      onClick={() => { if (onViewDetails) onViewDetails(product); }}
      style={{ cursor: onViewDetails ? 'pointer' : 'default' }}
      title={onViewDetails ? "View Details" : ""}
    >
      {category && <span className="category-tag">{category}</span>}
      
      <div className="image-container">
        <img 
          src={imageUrl} 
          alt={title}
          onError={(e) => {
            e.target.src = 'https://img.icons8.com/color/96/000000/pirate-ship.png';
          }}
        />
      </div>
      
      <div style={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
        <h3 className="title">{title}</h3>
        <p className="desc">{description}</p>
      </div>
      
      <div className="card-footer">
        <div className="price">{formatPrice(price)}</div>
        
        {isAdmin ? (
          <div className="admin-card-actions">
            <button 
              className="btn-icon edit" 
              onClick={(e) => {
                e.stopPropagation();
                onEdit(product);
              }}
              title="Edit Ship"
            >
              <FaEdit />
            </button>
            <button 
              className="btn-icon delete" 
              onClick={(e) => {
                e.stopPropagation();
                onDelete(_id);
              }}
              title="Scrap Ship"
            >
              <FaTrash />
            </button>
          </div>
        ) : (
          <button 
            className={isInCart ? "btn-primary" : "btn-primary"} 
            style={{
              background: isInCart ? 'linear-gradient(135deg, #10b981 0%, #059669 100%)' : '',
              borderColor: isInCart ? '#059669' : '',
              boxShadow: isInCart ? '0 0 10px rgba(16, 185, 129, 0.2)' : ''
            }}
            onClick={(e) => {
              e.stopPropagation(); // Prevent opening details view
              console.log('ProductCard: Purchase clicked for ship:', title);
              onAddToCart(product);
            }}
          >
            {isInCart ? <FaCheck /> : <FaShoppingCart />}
            {isInCart ? "Purchase Done" : "Purchase Ship"}
          </button>
        )}
      </div>
    </div>
  );
};

export default ProductCard;
