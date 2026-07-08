import React from 'react';

const Footer = () => {
  return (
    <>
      {/* Special Offer Banner (from original HTML) */}
      <div className="offer-banner">
        <h4>⚓ Supernova Special Offer: Get 20% off your first purchase! ⚓</h4>
        <p>Exclusively for rising pirate rookies and student navigators!!</p>
      </div>

      {/* Styled Footer */}
      <footer>
        <p>&copy; {new Date().getFullYear()} <span>Ship Shop</span>. All Rights Reserved.</p>
        <p style={{ fontSize: '0.8rem', color: 'rgba(156, 163, 175, 0.6)', marginTop: '5px' }}>
          Manned by the Straw Hat Grand Fleet &bull; Grand Line, Paradise Sector
        </p>
      </footer>
    </>
  );
};

export default Footer;
