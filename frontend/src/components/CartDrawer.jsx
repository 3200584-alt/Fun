import React from 'react';
import { FaTimes, FaTrash, FaShoppingBag, FaAnchor, FaUserCircle } from 'react-icons/fa';

const CartDrawer = ({ isOpen, onClose, cartItems, onUpdateQty, onRemoveItem, onCheckout, user, onRedirectToAuth }) => {
  const formatPrice = (value) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 0,
    }).format(value);
  };

  // Calculate prices
  const subtotal = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const discountRate = 0.20; // Supernova Special Offer: 20% off
  const discountAmount = subtotal * discountRate;
  const total = subtotal - discountAmount;

  const handleCheckoutClick = () => {
    if (!user) {
      onRedirectToAuth();
    } else {
      onCheckout({ subtotal, discount: discountAmount, total });
    }
  };

  return (
    <>
      {/* Overlay backdrop */}
      <div className={`drawer-overlay ${isOpen ? 'open' : ''}`} onClick={onClose}></div>
      
      {/* Slide-out Panel */}
      <div className={`drawer ${isOpen ? 'open' : ''}`}>
        <div className="drawer-header">
          <h2>Your Fleet</h2>
          <button className="close-btn" onClick={onClose} aria-label="Close cart">
            <FaTimes />
          </button>
        </div>
        
        <div className="drawer-content">
          {cartItems.length === 0 ? (
            <div className="empty-state" style={{ marginTop: '50px' }}>
              <FaShoppingBag />
              <h3>Your shipyard order is empty</h3>
              <p>Explore legendary pirate vessels and add them to your fleet!</p>
            </div>
          ) : (
            cartItems.map((item) => (
              <div key={item._id} className="cart-item">
                <div className="cart-item-img">
                  <img 
                    src={item.imageUrl} 
                    alt={item.title} 
                    onError={(e) => {
                      e.target.src = 'https://img.icons8.com/color/96/000000/pirate-ship.png';
                    }}
                  />
                </div>
                <div className="cart-item-details">
                  <div>
                    <div className="cart-item-title">{item.title}</div>
                    <div className="cart-item-price">{formatPrice(item.price)}</div>
                  </div>
                  
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div className="cart-item-qty">
                      <button 
                        className="qty-btn" 
                        onClick={() => onUpdateQty(item._id, item.quantity - 1)}
                        disabled={item.quantity <= 1}
                      >
                        -
                      </button>
                      <span className="qty-val">{item.quantity}</span>
                      <button 
                        className="qty-btn" 
                        onClick={() => onUpdateQty(item._id, item.quantity + 1)}
                      >
                        +
                      </button>
                    </div>
                    
                    <button className="remove-btn" onClick={() => onRemoveItem(item._id)}>
                      <FaTrash size={14} />
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
        
        {cartItems.length > 0 && (
          <div className="drawer-footer">
            <div className="summary-row">
              <span>Subtotal:</span>
              <span>{formatPrice(subtotal)}</span>
            </div>
            <div className="summary-row discount">
              <span>Supernova Discount (20%):</span>
              <span>-{formatPrice(discountAmount)}</span>
            </div>
            <div className="summary-row total">
              <span>Total Fleet Value:</span>
              <span>{formatPrice(total)}</span>
            </div>
            
            <button className="btn-checkout" onClick={handleCheckoutClick}>
              {user ? (
                <>
                  <FaAnchor />
                  Set Sail (Place Order)
                </>
              ) : (
                <>
                  <FaUserCircle />
                  Log In to Set Sail
                </>
              )}
            </button>
          </div>
        )}
      </div>
    </>
  );
};

export default CartDrawer;
