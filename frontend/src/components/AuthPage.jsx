import React, { useState } from 'react';
import { FaUserPlus, FaSignInAlt, FaShip } from 'react-icons/fa';

const AuthPage = ({ onLogin, onRegister }) => {
  const [isLoginView, setIsLoginView] = useState(true);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg('');

    if (!email || !password) {
      setErrorMsg('Please fill in all required credentials.');
      return;
    }

    if (!isLoginView) {
      if (!name) {
        setErrorMsg('Please add your sailor name.');
        return;
      }
      if (password !== confirmPassword) {
        setErrorMsg('Passwords do not match.');
        return;
      }
      // Call register
      const success = await onRegister({ name, email, password });
      if (!success) setErrorMsg('Registration failed. Email may already be in use.');
    } else {
      // Call login
      const success = await onLogin({ email, password });
      if (!success) setErrorMsg('Invalid email or password.');
    }
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center', padding: '60px 20px' }}>
      <div className="form-card" style={{ maxWidth: '450px', width: '100%', margin: '0' }}>
        <div style={{ textAlign: 'center', marginBottom: '25px' }}>
          <FaShip size={40} color="var(--accent-cyan)" style={{ filter: 'drop-shadow(0 0 8px var(--accent-cyan))', marginBottom: '10px' }} />
          <h2 style={{ fontFamily: 'var(--font-title)', letterSpacing: '1px' }}>
            {isLoginView ? 'Welcome Sailor' : 'Sign Articles'}
          </h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginTop: '5px' }}>
            {isLoginView 
              ? 'Enter your credentials to board the Ship Shop.' 
              : 'Join the grand fleet and begin commissioning ships.'}
          </p>
        </div>

        {errorMsg && (
          <div style={{ 
            background: 'rgba(239, 68, 68, 0.1)', 
            border: '1px solid rgba(239, 68, 68, 0.3)', 
            color: '#fca5a5', 
            padding: '10px', 
            borderRadius: '6px', 
            fontSize: '0.85rem', 
            marginBottom: '20px',
            textAlign: 'center'
          }}>
            {errorMsg}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
            
            {!isLoginView && (
              <div className="form-group">
                <label>Sailor Name</label>
                <input 
                  type="text" 
                  className="form-control" 
                  placeholder="e.g. Roronoa Zoro"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </div>
            )}

            <div className="form-group">
              <label>Logbook Email</label>
              <input 
                type="email" 
                className="form-control" 
                placeholder="email@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div className="form-group">
              <label>Password</label>
              <input 
                type="password" 
                className="form-control" 
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            {!isLoginView && (
              <div className="form-group">
                <label>Confirm Password</label>
                <input 
                  type="password" 
                  className="form-control" 
                  placeholder="••••••••"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                />
              </div>
            )}

            <button type="submit" className="btn-primary" style={{ justifyContent: 'center', marginTop: '10px', padding: '12px' }}>
              {isLoginView ? (
                <>
                  <FaSignInAlt style={{ marginRight: '6px' }} />
                  Board Ship
                </>
              ) : (
                <>
                  <FaUserPlus style={{ marginRight: '6px' }} />
                  Sign Articles
                </>
              )}
            </button>
          </div>
        </form>

        <div style={{ textAlign: 'center', marginTop: '20px', fontSize: '0.9rem' }}>
          <span style={{ color: 'var(--text-muted)' }}>
            {isLoginView ? "Don't have an account? " : "Already signed? "}
          </span>
          <button 
            type="button"
            style={{ 
              background: 'transparent', 
              color: 'var(--accent-cyan)', 
              border: 'none', 
              cursor: 'pointer', 
              fontWeight: '600',
              fontFamily: 'var(--font-body)',
              textDecoration: 'underline'
            }}
            onClick={() => {
              setIsLoginView(!isLoginView);
              setErrorMsg('');
            }}
          >
            {isLoginView ? 'Register Here' : 'Login Here'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default AuthPage;
