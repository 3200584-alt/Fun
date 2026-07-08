import React, { useState } from 'react';
import { FaShip, FaBoxOpen, FaUser, FaTimes, FaCoins, FaBriefcase, FaGem } from 'react-icons/fa';

const OrderTracker = ({ status }) => {
  const steps = ['Pending', 'Processing', 'Shipped', 'Delivered'];
  const labels = ['Blueprint Order', 'Hull Construction', 'Sailing in Transit', 'Anchored / Delivered'];
  const currentIndex = steps.indexOf(status);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', margin: '25px 0', width: '100%' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', position: 'relative', width: '100%', padding: '0 5px' }}>
        {/* Connecting line */}
        <div style={{
          position: 'absolute',
          top: '12px',
          left: '5%',
          width: '90%',
          height: '2px',
          background: 'rgba(255,255,255,0.1)',
          zIndex: 1
        }} />
        
        {/* Filled active line */}
        <div style={{
          position: 'absolute',
          top: '12px',
          left: '5%',
          width: `${(currentIndex / 3) * 90}%`,
          height: '2px',
          background: 'var(--accent-cyan)',
          transition: 'all 0.5s ease',
          zIndex: 2,
          boxShadow: '0 0 8px var(--accent-cyan)'
        }} />

        {steps.map((step, idx) => {
          const isActive = idx <= currentIndex;
          const isCurrent = idx === currentIndex;
          return (
            <div key={step} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', zIndex: 3, position: 'relative', flex: 1 }}>
              <div style={{
                width: '26px',
                height: '26px',
                borderRadius: '50%',
                background: isCurrent ? 'var(--accent-cyan)' : (isActive ? 'var(--bg-secondary)' : '#1f2937'),
                border: `2px solid ${isActive ? 'var(--accent-cyan)' : 'rgba(255,255,255,0.2)'}`,
                boxShadow: isCurrent ? '0 0 12px var(--accent-cyan)' : 'none',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: isActive ? 'var(--bg-primary)' : 'var(--text-muted)',
                fontWeight: '700',
                fontSize: '0.8rem',
                transition: 'all 0.3s ease'
              }}>
                {idx + 1}
              </div>
              <span style={{ 
                fontSize: '0.72rem', 
                marginTop: '8px', 
                fontWeight: isCurrent ? '700' : '500', 
                color: isCurrent ? 'var(--accent-cyan)' : 'var(--text-muted)', 
                textAlign: 'center',
                lineHeight: '1.2'
              }}>
                {labels[idx]}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

const OrdersPanel = ({ orders, loading, isAdmin, onUpdateStatus }) => {
  const [selectedInvoice, setSelectedInvoice] = useState(null);

  const formatPrice = (value) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 0,
    }).format(value);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Pending':
        return '#fbbf24'; // Gold
      case 'Processing':
        return '#60a5fa'; // Blue
      case 'Shipped':
        return '#64ffda'; // Cyan
      case 'Delivered':
        return '#10b981'; // Green
      default:
        return 'var(--text-muted)';
    }
  };

  const getPaymentIcon = (method) => {
    switch (method) {
      case 'Beli Coins':
        return <FaCoins color="var(--accent-cyan)" />;
      case 'Gold Bars':
        return <FaBriefcase color="var(--accent-gold)" />;
      case 'Devil Fruit':
        return <FaGem color="var(--accent-cyan)" />;
      default:
        return <FaBoxOpen color="var(--accent-gold)" />;
    }
  };

  if (loading) {
    return (
      <div className="spinner-container" style={{ padding: '60px 0' }}>
        <div className="spinner"></div>
        <p style={{ textAlign: 'center', color: 'var(--text-muted)' }}>Retrieving fleet logs...</p>
      </div>
    );
  }

  return (
    <div className="admin-container">
      <div className="admin-header" style={{ marginBottom: '30px', textAlign: 'center', display: 'block' }}>
        <h2 style={{ fontFamily: 'var(--font-title)', letterSpacing: '1px' }}>
          {isAdmin ? '⚓ Grand Master Ship Order Logs' : '⚓ Your Active Ship Commission Log'}
        </h2>
        <p style={{ color: 'var(--text-muted)', marginTop: '5px' }}>
          {isAdmin 
            ? 'Track, fulfill, or update delivery statuses for all vessels across the seas.' 
            : 'Track the delivery, refit, and transit states of your ordered vessels. Click any log card to view its detailed receipt & invoice.'}
        </p>
      </div>

      {orders.length === 0 ? (
        <div className="empty-state">
          <FaBoxOpen size={48} style={{ color: 'var(--border-color)', marginBottom: '15px' }} />
          <h3>No commissions on record</h3>
          <p>{isAdmin ? 'No user has placed any orders yet.' : 'Purchase a ship from the Shop to open your logs!'}</p>
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          {orders.map((order) => (
            <div 
              key={order._id} 
              className="card" 
              onClick={() => setSelectedInvoice(order)}
              style={{ 
                flexDirection: 'column', 
                height: 'auto', 
                padding: '24px',
                borderLeft: `4px solid ${getStatusColor(order.status)}`,
                cursor: 'pointer',
                transition: 'all 0.2s ease'
              }}
            >
              {/* Order Header info */}
              <div style={{ 
                display: 'flex', 
                justifyContent: 'space-between', 
                alignItems: 'flex-start',
                flexWrap: 'wrap',
                gap: '15px',
                borderBottom: '1px solid rgba(100, 255, 218, 0.1)',
                paddingBottom: '15px',
                marginBottom: '15px'
              }}>
                <div>
                  <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                    ORDER ID: <span style={{ color: 'var(--text-main)', fontFamily: 'monospace' }}>{order._id}</span>
                  </div>
                  <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginTop: '3px' }}>
                    Commissioned on: <span style={{ color: 'var(--text-main)' }}>{new Date(order.createdAt).toLocaleDateString()}</span>
                  </div>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }} onClick={(e) => e.stopPropagation()}>
                  {isAdmin && order.user && (
                    <div style={{ 
                      display: 'flex', 
                      alignItems: 'center', 
                      gap: '8px', 
                      fontSize: '0.9rem', 
                      background: 'rgba(100, 255, 218, 0.05)',
                      padding: '4px 10px',
                      borderRadius: '4px',
                      border: '1px solid rgba(100, 255, 218, 0.1)'
                    }}>
                      <FaUser size={12} color="var(--accent-cyan)" />
                      <span style={{ fontWeight: '500' }}>{order.user.name}</span>
                    </div>
                  )}

                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <span style={{ fontSize: '0.9rem', fontWeight: '500', color: 'var(--text-main)' }}>Status:</span>
                    {isAdmin ? (
                      <select
                        className="form-control"
                        style={{ padding: '4px 8px', fontSize: '0.85rem', border: `1px solid ${getStatusColor(order.status)}` }}
                        value={order.status}
                        onChange={(e) => onUpdateStatus(order._id, e.target.value)}
                      >
                        <option value="Pending">Pending</option>
                        <option value="Processing">Processing</option>
                        <option value="Shipped">Shipped</option>
                        <option value="Delivered">Delivered</option>
                      </select>
                    ) : (
                      <span style={{ 
                        color: getStatusColor(order.status),
                        fontWeight: '700',
                        fontSize: '0.9rem',
                        textTransform: 'uppercase',
                        letterSpacing: '0.5px'
                      }}>
                        {order.status}
                      </span>
                    )}
                  </div>
                </div>
              </div>

              {/* Order Items */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {order.orderItems.map((item) => (
                  <div key={item._id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '0.95rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                      <FaShip size={14} color="var(--text-muted)" />
                      <span>{item.title}</span>
                      <span style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>x {item.quantity}</span>
                    </div>
                    <span style={{ fontWeight: '500' }}>{formatPrice(item.price * item.quantity)}</span>
                  </div>
                ))}
              </div>

              {/* Order pricing summary footer */}
              <div style={{ 
                borderTop: '1px solid rgba(100, 255, 218, 0.05)',
                paddingTop: '15px',
                marginTop: '15px',
                display: 'flex',
                justifyContent: 'flex-end',
                alignItems: 'center',
                gap: '40px'
              }}>
                <div style={{ display: 'flex', gap: '20px', fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                  <div>Subtotal: <span style={{ color: 'var(--text-main)' }}>{formatPrice(order.subtotal)}</span></div>
                  {order.discount > 0 && (
                    <div style={{ color: 'var(--accent-cyan)' }}>
                      Discount: <span>-{formatPrice(order.discount)}</span>
                    </div>
                  )}
                </div>
                <div style={{ fontSize: '1.2rem', fontWeight: '700', color: 'var(--accent-gold)' }}>
                  Total: {formatPrice(order.total)}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Invoice detailed overlay modal */}
      {selectedInvoice && (
        <div 
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100vw',
            height: '100vh',
            background: 'rgba(3, 7, 18, 0.85)',
            backdropFilter: 'blur(8px)',
            zIndex: 400,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '20px'
          }}
          onClick={() => setSelectedInvoice(null)}
        >
          <div 
            className="form-card" 
            style={{ 
              maxWidth: '650px', 
              width: '100%', 
              margin: '0', 
              border: '1px solid var(--border-focus)',
              boxShadow: '0 0 35px rgba(100, 255, 218, 0.3)',
              background: 'var(--bg-secondary)',
              padding: '30px',
              maxHeight: '92vh',
              overflowY: 'auto'
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid rgba(100, 255, 218, 0.15)', paddingBottom: '15px', marginBottom: '20px' }}>
              <h2 style={{ fontFamily: 'var(--font-title)', fontSize: '1.4rem', color: 'var(--text-main)', letterSpacing: '0.5px' }}>
                📄 Vessel Commission Invoice
              </h2>
              <button 
                style={{ background: 'transparent', border: 'none', color: 'var(--text-muted)', cursor: 'pointer', fontSize: '1.25rem' }}
                onClick={() => setSelectedInvoice(null)}
              >
                <FaTimes />
              </button>
            </div>

            {/* Tracker progress visualization */}
            <div style={{ marginBottom: '30px' }}>
              <h4 style={{ fontFamily: 'var(--font-title)', color: 'var(--accent-gold)', marginBottom: '10px', fontSize: '0.9rem' }}>
                Transit Cargo Status: <span style={{ color: getStatusColor(selectedInvoice.status), textTransform: 'uppercase' }}>{selectedInvoice.status}</span>
              </h4>
              <OrderTracker status={selectedInvoice.status} />
            </div>

            {/* Address & Payment logistics blocks */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginBottom: '20px', fontSize: '0.85rem' }}>
              <div style={{ border: '1px solid rgba(255,255,255,0.05)', background: 'rgba(255,255,255,0.01)', padding: '15px', borderRadius: '8px' }}>
                <h5 style={{ color: 'var(--accent-cyan)', marginBottom: '8px', fontSize: '0.9rem', fontWeight: '700' }}>🗺️ Dispatch Location</h5>
                <p style={{ color: 'var(--text-main)', marginBottom: '4px' }}><strong>Destination:</strong> {selectedInvoice.shippingAddress}</p>
                <p style={{ color: 'var(--text-muted)' }}><strong>Den Den Mushi:</strong> {selectedInvoice.phone}</p>
              </div>
              <div style={{ border: '1px solid rgba(255,255,255,0.05)', background: 'rgba(255,255,255,0.01)', padding: '15px', borderRadius: '8px' }}>
                <h5 style={{ color: 'var(--accent-cyan)', marginBottom: '8px', fontSize: '0.9rem', fontWeight: '700' }}>📦 Logistical Cargo Info</h5>
                <p style={{ color: 'var(--text-main)', marginBottom: '4px' }}><strong>Transit Line:</strong> {selectedInvoice.deliveryMethod}</p>
                <p style={{ color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '5px' }}>
                  <strong>Tribute Method:</strong> 
                  {getPaymentIcon(selectedInvoice.paymentMethod)}
                  {selectedInvoice.paymentMethod || 'Berry COD'}
                </p>
              </div>
            </div>

            {/* Receipt invoice items listing */}
            <div style={{ border: '1px solid rgba(100, 255, 218, 0.1)', background: 'rgba(10, 25, 47, 0.4)', borderRadius: '8px', padding: '15px', marginBottom: '25px' }}>
              <h5 style={{ fontFamily: 'var(--font-title)', color: 'var(--accent-gold)', marginBottom: '10px', fontSize: '0.9rem' }}>Commissioned Armada</h5>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                {selectedInvoice.orderItems.map((item) => (
                  <div key={item._id} style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem' }}>
                    <span>⚓ {item.title} x {item.quantity}</span>
                    <span style={{ fontWeight: '600' }}>{formatPrice(item.price * item.quantity)}</span>
                  </div>
                ))}
              </div>
              <div style={{ borderTop: '1px solid rgba(100,255,218,0.1)', marginTop: '12px', paddingTop: '10px', display: 'flex', flexDirection: 'column', gap: '5px', fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span>Subtotal Value:</span>
                  <span>{formatPrice(selectedInvoice.subtotal)}</span>
                </div>
                {selectedInvoice.discount > 0 && (
                  <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--accent-cyan)' }}>
                    <span>Supernova Discount (20%):</span>
                    <span>-{formatPrice(selectedInvoice.discount)}</span>
                  </div>
                )}
                <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: '800', fontSize: '1.05rem', color: 'var(--accent-gold)', marginTop: '5px', paddingTop: '5px', borderTop: '1px dashed rgba(100,255,218,0.15)' }}>
                  <span>Total Tribute:</span>
                  <span>{formatPrice(selectedInvoice.total)}</span>
                </div>
              </div>
            </div>

            <div style={{ display: 'flex', gap: '15px' }}>
              <button 
                type="button"
                className="btn-secondary" 
                onClick={() => alert('⚓ Transmitting print signal... Ship blueprint logs print simulated!')}
                style={{ flex: 1, padding: '12px', justifyContent: 'center' }}
              >
                Print Blueprint Invoice
              </button>
              <button 
                type="button"
                className="btn-primary" 
                onClick={() => setSelectedInvoice(null)}
                style={{ flex: 1, padding: '12px', justifyContent: 'center' }}
              >
                Close Logs
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default OrdersPanel;
