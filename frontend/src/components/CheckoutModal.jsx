import React, { useState } from 'react';
import { 
  FaTimes, 
  FaAnchor, 
  FaShip, 
  FaPhoneAlt, 
  FaMapMarkerAlt, 
  FaUser, 
  FaLock, 
  FaEnvelope,
  FaCoins,
  FaBriefcase,
  FaGem,
  FaBoxOpen
} from 'react-icons/fa';

const CheckoutModal = ({ 
  isOpen, 
  onClose, 
  checkoutItems, 
  subtotal, 
  discount, 
  total, 
  onConfirmOrder, 
  user,
  onAuthAndCheckout 
}) => {
  const [shippingAddress, setShippingAddress] = useState('');
  const [phone, setPhone] = useState('');
  const [deliveryMethod, setDeliveryMethod] = useState('News Coo Delivery');
  const [paymentMethod, setPaymentMethod] = useState('Berry COD');

  // On-the-fly Auth fields (used if user is logged out)
  const [authMode, setAuthMode] = useState('register'); // 'register' | 'login'
  const [authName, setAuthName] = useState('');
  const [authEmail, setAuthEmail] = useState('');
  const [authPassword, setAuthPassword] = useState('');

  if (!isOpen) return null;

  const formatPrice = (value) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 0,
    }).format(value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!shippingAddress || !phone) {
      alert('Please provide a destination island and communication log (phone number)!');
      return;
    }

    const shippingDetails = {
      shippingAddress,
      phone,
      deliveryMethod,
      paymentMethod
    };

    if (!user) {
      if (!authEmail || !authPassword || (authMode === 'register' && !authName)) {
        alert('Please fill out all account setup fields!');
        return;
      }
      onAuthAndCheckout({
        mode: authMode,
        name: authName,
        email: authEmail,
        password: authPassword,
        shippingDetails
      });
    } else {
      onConfirmOrder(shippingDetails);
    }
  };

  return (
    <div 
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        background: 'rgba(3, 7, 18, 0.85)',
        backdropFilter: 'blur(8px)',
        zIndex: 300,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '20px'
      }}
    >
      <div 
        className="form-card" 
        style={{ 
          maxWidth: '560px', 
          width: '100%', 
          margin: '0', 
          maxHeight: '92vh',
          overflowY: 'auto',
          border: '1px solid var(--border-focus)',
          boxShadow: '0 0 35px rgba(100, 255, 218, 0.25)',
          background: 'var(--bg-secondary)'
        }}
      >
        <div style={{ display: 'flex', justifySelf: 'stretch', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
          <h2 style={{ fontFamily: 'var(--font-title)', letterSpacing: '1px', fontSize: '1.4rem' }}>
            ⚓ Commission Dispatch Form
          </h2>
          <button 
            type="button" 
            style={{ background: 'transparent', border: 'none', color: 'var(--text-muted)', cursor: 'pointer', fontSize: '1.25rem' }}
            onClick={onClose}
          >
            <FaTimes />
          </button>
        </div>

        {/* Order Summary Block */}
        <div 
          style={{ 
            background: 'rgba(10, 25, 47, 0.4)', 
            border: '1px solid rgba(100, 255, 218, 0.1)', 
            borderRadius: '8px', 
            padding: '15px',
            marginBottom: '20px'
          }}
        >
          <h4 style={{ fontFamily: 'var(--font-title)', color: 'var(--accent-gold)', marginBottom: '10px', fontSize: '0.95rem' }}>
            Fleet Order Summary
          </h4>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', maxHeight: '100px', overflowY: 'auto', marginBottom: '10px' }}>
            {checkoutItems.map((item) => (
              <div key={item._id} style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem' }}>
                <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <FaShip size={10} color="var(--text-muted)" />
                  {item.title} x {item.quantity}
                </span>
                <span style={{ fontWeight: '500' }}>{formatPrice(item.price * item.quantity)}</span>
              </div>
            ))}
          </div>

          <div style={{ borderTop: '1px solid rgba(100, 255, 218, 0.05)', paddingTop: '10px', display: 'flex', flexDirection: 'column', gap: '5px', fontSize: '0.85rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span>Subtotal:</span>
              <span>{formatPrice(subtotal)}</span>
            </div>
            {discount > 0 && (
              <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--accent-cyan)' }}>
                <span>Supernova Discount (20%):</span>
                <span>-{formatPrice(discount)}</span>
              </div>
            )}
            <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: '700', fontSize: '1.05rem', color: 'var(--accent-gold)', borderTop: '1px solid rgba(100, 255, 218, 0.1)', paddingTop: '8px', marginTop: '5px' }}>
              <span>Total Fleet Value:</span>
              <span>{formatPrice(total)}</span>
            </div>
          </div>
        </div>

        {/* Shipping Form */}
        <form onSubmit={handleSubmit}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
            
            {/* Account Setup for Logged Out Users */}
            {!user && (
              <div style={{ 
                border: '1px solid rgba(251, 191, 36, 0.25)', 
                background: 'rgba(251, 191, 36, 0.03)', 
                borderRadius: '8px', 
                padding: '15px',
                marginBottom: '5px'
              }}>
                <h4 style={{ fontFamily: 'var(--font-title)', color: 'var(--accent-gold)', marginBottom: '12px', fontSize: '0.9rem', textAlign: 'center' }}>
                  🔐 Boarding Verification Required
                </h4>
                
                {/* Mode Selector */}
                <div style={{ display: 'flex', gap: '10px', marginBottom: '15px' }}>
                  <button 
                    type="button"
                    className={`filter-chip ${authMode === 'register' ? 'active' : ''}`}
                    style={{ flex: 1, borderRadius: '4px', padding: '6px' }}
                    onClick={() => setAuthMode('register')}
                  >
                    New Sailor (Sign Up)
                  </button>
                  <button 
                    type="button"
                    className={`filter-chip ${authMode === 'login' ? 'active' : ''}`}
                    style={{ flex: 1, borderRadius: '4px', padding: '6px' }}
                    onClick={() => setAuthMode('login')}
                  >
                    Active Sailor (Log In)
                  </button>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                  {authMode === 'register' && (
                    <div className="form-group">
                      <label style={{ fontSize: '0.8rem', display: 'flex', alignItems: 'center', gap: '4px' }}>
                        <FaUser size={10} color="var(--accent-cyan)" />
                        Sailor Name
                      </label>
                      <input 
                        type="text" 
                        className="form-control" 
                        style={{ padding: '8px' }}
                        placeholder="e.g. Monkey D. Luffy"
                        value={authName}
                        onChange={(e) => setAuthName(e.target.value)}
                        required={authMode === 'register'}
                      />
                    </div>
                  )}

                  <div className="form-group">
                    <label style={{ fontSize: '0.8rem', display: 'flex', alignItems: 'center', gap: '4px' }}>
                      <FaEnvelope size={10} color="var(--accent-cyan)" />
                      Email Address
                    </label>
                    <input 
                      type="email" 
                      className="form-control" 
                      style={{ padding: '8px' }}
                      placeholder="email@example.com"
                      value={authEmail}
                      onChange={(e) => setAuthEmail(e.target.value)}
                      required
                    />
                  </div>

                  <div className="form-group">
                    <label style={{ fontSize: '0.8rem', display: 'flex', alignItems: 'center', gap: '4px' }}>
                      <FaLock size={10} color="var(--accent-cyan)" />
                      Pass-Key
                    </label>
                    <input 
                      type="password" 
                      className="form-control" 
                      style={{ padding: '8px' }}
                      placeholder="••••••••"
                      value={authPassword}
                      onChange={(e) => setAuthPassword(e.target.value)}
                      required
                    />
                  </div>
                </div>
              </div>
            )}

            <div className="form-group">
              <label style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <FaMapMarkerAlt size={12} color="var(--accent-cyan)" />
                Destination Island / Port Address
              </label>
              <input 
                type="text" 
                className="form-control" 
                placeholder="e.g. Foosha Village, Water 7, Wano Country"
                value={shippingAddress}
                onChange={(e) => setShippingAddress(e.target.value)}
                required
              />
            </div>

            <div className="form-group">
              <label style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <FaPhoneAlt size={12} color="var(--accent-cyan)" />
                Den Den Mushi / Phone Number
              </label>
              <input 
                type="text" 
                className="form-control" 
                placeholder="e.g. 555-MUGIWARA"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                required
              />
            </div>

            <div className="form-group">
              <label>Delivery Cargo Line</label>
              <select 
                className="form-control"
                value={deliveryMethod}
                onChange={(e) => setDeliveryMethod(e.target.value)}
              >
                <option value="News Coo Delivery">News Coo Delivery (Express Courier, Free)</option>
                <option value="Straw Hat Grand Fleet Cargo">Straw Hat Grand Fleet Cargo (Heavy Escort)</option>
                <option value="Flying Fish Riders">Flying Fish Riders (High-speed Transit)</option>
                <option value="Marine Escort">Marine Escort (Protected Convoy)</option>
              </select>
            </div>

            {/* Payment Method selector */}
            <div className="form-group">
              <label style={{ marginBottom: '8px', display: 'block' }}>💳 Payment Method / Tribute</label>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                {[
                  { id: 'Berry COD', label: 'Berry COD', desc: 'Pay at destination port', icon: <FaBoxOpen color="var(--accent-gold)" /> },
                  { id: 'Beli Coins', label: 'Beli Card', desc: 'Secure card transaction', icon: <FaCoins color="var(--accent-cyan)" /> },
                  { id: 'Gold Bars', label: 'Gold Bars', desc: 'Tribute in pure gold', icon: <FaBriefcase color="var(--accent-gold)" /> },
                  { id: 'Devil Fruit', label: 'Devil Fruit', desc: 'Legendary barter trade', icon: <FaGem color="var(--accent-cyan)" /> }
                ].map((pay) => (
                  <div
                    key={pay.id}
                    onClick={() => setPaymentMethod(pay.id)}
                    style={{
                      border: `1px solid ${paymentMethod === pay.id ? 'var(--border-focus)' : 'rgba(100, 255, 218, 0.1)'}`,
                      background: paymentMethod === pay.id ? 'rgba(100, 255, 218, 0.05)' : 'rgba(10, 25, 47, 0.3)',
                      borderRadius: '8px',
                      padding: '12px',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '10px',
                      transition: 'all 0.2s ease',
                      boxShadow: paymentMethod === pay.id ? '0 0 10px rgba(100, 255, 218, 0.15)' : 'none'
                    }}
                  >
                    <div style={{ fontSize: '1.25rem' }}>{pay.icon}</div>
                    <div style={{ display: 'flex', flexDirection: 'column' }}>
                      <span style={{ fontSize: '0.85rem', fontWeight: '700', color: paymentMethod === pay.id ? 'var(--text-main)' : 'var(--text-muted)' }}>{pay.label}</span>
                      <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>{pay.desc}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div style={{ display: 'flex', gap: '15px', marginTop: '15px' }}>
              <button 
                type="button" 
                className="btn-secondary" 
                onClick={onClose} 
                style={{ flex: 1, padding: '12px' }}
              >
                Cancel
              </button>
              <button 
                type="submit" 
                className="btn-primary" 
                style={{ flex: 2, padding: '12px', justifyContent: 'center' }}
              >
                <FaAnchor style={{ marginRight: '6px' }} />
                Set Sail (Confirm Order)
              </button>
            </div>

          </div>
        </form>

      </div>
    </div>
  );
};

export default CheckoutModal;
