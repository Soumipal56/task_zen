import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import { login } from '../state/authSlice';
import { Loader2, Shield } from 'lucide-react';
import { motion } from 'framer-motion';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error } = useSelector((state) => state.auth);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(login({ email, password })).then((res) => {
      if (!res.error) navigate('/');
    });
  };

  return (
    <div className="app-shell justify-center items-center p-8 bg-bg-color">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="glass auth-card"
        style={{ maxWidth: '440px', width: '100%', padding: '3.5rem' }}
      >
        <div className="text-center" style={{ marginBottom: '3rem' }}>
          <div className="flex justify-center" style={{ marginBottom: '1.5rem' }}>
            <div className="flex items-center justify-center" style={{ width: '3.5rem', height: '3.5rem', backgroundColor: 'rgba(59, 130, 246, 0.1)', borderRadius: '1rem' }}>
              <Shield className="text-primary-color" size={28} />
            </div>
          </div>
          <h1 className="font-display" style={{ fontSize: '1.875rem', marginBottom: '0.5rem' }}>Access Portal</h1>
          <p style={{ fontSize: '0.875rem', color: 'var(--text-dim)', fontWeight: '500' }}>Enter your operator credentials</p>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <label className="input-label">Email Node</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="input-field"
              placeholder="test@test.com"
              required
            />
          </div>

          <div className="input-group">
            <label className="input-label">Security Key</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="input-field"
              placeholder="••••••••"
              required
            />
          </div>

          {error && (
            <div style={{ padding: '1rem', backgroundColor: 'rgba(239, 68, 68, 0.1)', border: '1px solid rgba(239, 68, 68, 0.2)', color: '#ef4444', fontSize: '0.75rem', fontWeight: '700', borderRadius: '8px', textAlign: 'center', marginBottom: '1.5rem', textTransform: 'uppercase' }}>
              {error}
            </div>
          )}

          <div style={{ marginTop: '2rem' }}>
            <button 
              type="submit" 
              disabled={loading}
              className="btn-primary flex items-center justify-center gap-4"
            >
              {loading ? <Loader2 className="animate-spin text-white" size={20} /> : 'Authorize Access'}
            </button>
          </div>
        </form>

        <div className="text-center" style={{ marginTop: '2.5rem', fontSize: '0.75rem', fontWeight: '600', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
          Unauthenticated?{' '}
          <Link to="/register" style={{ color: 'var(--primary-color)', textDecoration: 'none', fontWeight: '800' }}>
            Request Identity
          </Link>
        </div>
      </motion.div>
    </div>
  );
};

export default LoginPage;
