import { FaAnchor, FaShoppingCart, FaCogs, FaStore, FaListAlt, FaUserCircle, FaSignOutAlt, FaShip } from 'react-icons/fa';

const Header = ({ activeView, setActiveView, cartCount, onCartClick, user, onLogout }) => {
  return (
    <header>
      <div className="header-container">
        <a href="/" className="logo" onClick={(e) => { e.preventDefault(); setActiveView('shop'); }}>
          <FaAnchor />
          <span>SHIP SHOP</span>
        </a>
        
        <div className="nav-links">
          {/* Main Shop link always visible */}
          <button 
            className={`btn-nav ${activeView === 'shop' ? 'active' : ''}`}
            onClick={() => setActiveView('shop')}
          >
            <FaStore style={{ marginRight: '6px', verticalAlign: 'middle' }} />
            Shop
          </button>

          {/* Conditional links based on authentication state */}
          {user ? (
            <>
              {/* Order History */}
              <button 
                className={`btn-nav ${activeView === 'orders' ? 'active' : ''}`}
                onClick={() => setActiveView('orders')}
              >
                <FaListAlt style={{ marginRight: '6px', verticalAlign: 'middle' }} />
                My Orders
              </button>

              {/* Admin Panel (Admin users only) */}
              {user.isAdmin && (
                <button 
                  className={`btn-nav ${activeView === 'admin' ? 'active' : ''}`}
                  onClick={() => setActiveView('admin')}
                >
                  <FaCogs style={{ marginRight: '6px', verticalAlign: 'middle' }} />
                  Admin Panel
                </button>
              )}

              {/* User Identity and Log Out */}
              <div 
                className="btn-nav" 
                style={{ 
                  color: 'var(--accent-gold)', 
                  display: 'flex', 
                  alignItems: 'center', 
                  gap: '6px', 
                  cursor: 'default',
                  background: 'rgba(251, 191, 36, 0.05)',
                  border: '1px solid rgba(251, 191, 36, 0.1)'
                }}
              >
                <FaUserCircle />
                <span style={{ fontSize: '0.9rem', fontWeight: '600' }}>{user.name}</span>
              </div>

              <button className="btn-nav" onClick={onLogout} title="Depart Ship (Logout)">
                <FaSignOutAlt style={{ marginRight: '4px', verticalAlign: 'middle' }} />
                Logout
              </button>
            </>
          ) : (
            /* Logged out: link to Login Page */
            <button 
              className={`btn-nav ${activeView === 'auth' ? 'active' : ''}`}
              onClick={() => setActiveView('auth')}
            >
              <FaUserCircle style={{ marginRight: '6px', verticalAlign: 'middle' }} />
              Login / Sign Up
            </button>
          )}
          
          {/* Fleet Icon trigger */}
          <div className="cart-icon-container" onClick={onCartClick} title="My Fleet">
            <FaShip size={18} color="#f3f4f6" />
            {cartCount > 0 && (
              <span className="cart-badge">{cartCount}</span>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
