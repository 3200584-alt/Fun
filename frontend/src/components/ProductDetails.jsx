import React from 'react';
import { FaArrowLeft, FaShoppingCart, FaAnchor, FaTachometerAlt, FaUsers, FaBoxOpen, FaCheck } from 'react-icons/fa';

const ProductDetails = ({ product, onAddToCart, onBack, cart = [], justPurchased, onGoToOrders }) => {
  if (!product) return null;
  const { title, description, price, imageUrl, category } = product;

  const formatPrice = (value) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 0,
    }).format(value);
  };

  // Generate some fun One Piece style specs based on the category/title
  const getSpecs = () => {
    switch (category) {
      case 'Submarines':
        return { material: 'Seastone Coated Steel', propulsion: 'Electric Turbine', speed: '25 Knots', crew: '15-30 members' };
      case 'Emperor Fleets':
        return { material: 'Reinforced Adam Wood', propulsion: 'Triple Mast sails', speed: '18 Knots', crew: '500+ members' };
      case 'Speedboats':
        return { material: 'Lightweight Alloys', propulsion: 'Coupe de Burst / Dial Engines', speed: '60 Knots', crew: '2-5 members' };
      default:
        return { material: 'Treasure Wood Adam', propulsion: 'Standard Galleon Sails', speed: '20 Knots', crew: '10-50 members' };
    }
  };

  const specs = getSpecs();

  return (
    <div className="admin-container" style={{ maxWidth: '1100px' }}>
      {/* Back button */}
      <button 
        className="btn-secondary" 
        onClick={onBack} 
        style={{ marginBottom: '30px', display: 'flex', alignItems: 'center', gap: '8px' }}
      >
        <FaArrowLeft />
        Back to Shipyard
      </button>

      {/* Instant Purchase Success Banner */}
      {justPurchased && (
        <div 
          className="form-card"
          style={{
            border: '2px solid var(--success)',
            background: 'rgba(16, 185, 129, 0.08)',
            boxShadow: '0 0 25px rgba(16, 185, 129, 0.2)',
            marginBottom: '30px',
            padding: '24px',
            textAlign: 'center',
            borderRadius: '12px'
          }}
        >
          <h2 style={{ color: '#10b981', fontFamily: 'var(--font-title)', marginBottom: '8px', fontSize: '1.6rem', letterSpacing: '1px' }}>
            🎉 Commission Successful!
          </h2>
          <p style={{ color: 'var(--text-main)', fontSize: '0.98rem', marginBottom: '15px' }}>
            The legendary vessel <strong>{title}</strong> has been successfully added to your fleet logs.
          </p>
          
          <div style={{ display: 'flex', justifyContent: 'center', gap: '15px' }}>
            <button 
              className="btn-primary" 
              style={{ padding: '8px 18px', fontSize: '0.85rem' }}
              onClick={onGoToOrders}
            >
              Track Fleet Logs
            </button>
            <button 
              className="btn-secondary" 
              style={{ padding: '8px 18px', fontSize: '0.85rem' }}
              onClick={onBack}
            >
              Continue Browsing
            </button>
          </div>
        </div>
      )}

      {/* Details Container */}
      <div 
        className="card" 
        style={{ 
          display: 'grid', 
          gridTemplateColumns: '1fr 1fr', 
          gap: '40px', 
          padding: '40px',
          height: 'auto',
          alignItems: 'center'
        }}
      >
        {/* Left: Image */}
        <div 
          className="image-container" 
          style={{ 
            height: '400px', 
            width: '100%', 
            margin: '0', 
            background: 'rgba(3, 7, 18, 0.7)',
            borderRadius: '12px',
            border: '1px solid rgba(100, 255, 218, 0.1)'
          }}
        >
          <img 
            src={imageUrl} 
            alt={title} 
            style={{ 
              maxWidth: '90%', 
              maxHeight: '90%', 
              objectFit: 'contain',
              filter: 'drop-shadow(0 10px 25px rgba(0,0,0,0.6))'
            }}
            onError={(e) => {
              e.target.src = 'https://img.icons8.com/color/96/000000/pirate-ship.png';
            }}
          />
        </div>

        {/* Right: Info */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <div>
            <span className="category-tag" style={{ position: 'static', display: 'inline-block', marginBottom: '10px' }}>
              {category}
            </span>
            <h1 style={{ fontFamily: 'var(--font-title)', fontSize: '2.5rem', letterSpacing: '1px', lineHeight: '1.2' }}>
              {title}
            </h1>
          </div>

          <div style={{ fontSize: '1.8rem', fontWeight: '700', color: 'var(--accent-gold)' }}>
            {formatPrice(price)}
          </div>

          <p style={{ color: 'var(--text-muted)', lineHeight: '1.7', fontSize: '1.05rem' }}>
            {description}
          </p>

          {/* Specifications Table */}
          <div 
            style={{ 
              background: 'rgba(10, 25, 47, 0.5)', 
              border: '1px solid var(--border-color)', 
              borderRadius: '8px', 
              padding: '15px' 
            }}
          >
            <h4 style={{ fontFamily: 'var(--font-title)', color: 'var(--accent-cyan)', marginBottom: '10px', fontSize: '1rem' }}>
              Vessel Specifications
            </h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '0.9rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: 'var(--text-muted)' }}>Hull Material:</span>
                <span style={{ fontWeight: '500' }}>{specs.material}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: 'var(--text-muted)' }}>Propulsion:</span>
                <span style={{ fontWeight: '500' }}>{specs.propulsion}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: 'var(--text-muted)' }}>Top Speed:</span>
                <span style={{ fontWeight: '500' }}>{specs.speed}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: 'var(--text-muted)' }}>Capacity:</span>
                <span style={{ fontWeight: '500' }}>{specs.crew}</span>
              </div>
            </div>
          </div>

          {(() => {
            const isInCart = cart.some((item) => item._id === product._id);
            return (
              <button 
                className="btn-primary" 
                style={{ 
                  padding: '14px', 
                  fontSize: '1.1rem', 
                  justifyContent: 'center', 
                  marginTop: '10px',
                  background: isInCart ? 'linear-gradient(135deg, #10b981 0%, #059669 100%)' : '',
                  borderColor: isInCart ? '#059669' : '',
                  boxShadow: isInCart ? '0 0 10px rgba(16, 185, 129, 0.2)' : ''
                }}
                onClick={() => {
                  if (isInCart) {
                    onGoToOrders();
                  } else {
                    console.log('ProductDetails: Purchase clicked for ship:', title);
                    onAddToCart(product);
                  }
                }}
              >
                {isInCart ? <FaCheck style={{ marginRight: '8px' }} /> : <FaShoppingCart style={{ marginRight: '8px' }} />}
                {isInCart ? "Purchase Done" : "Purchase Ship & Add to Fleet"}
              </button>
            );
          })()}
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
