import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import { register } from '../state/authSlice';
import { Loader2, UserPlus } from 'lucide-react';
import { motion } from 'framer-motion';

const RegisterPage = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error, success } = useSelector((state) => state.auth);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) return;
    dispatch(register({ username, email, password })).then((res) => {
        if (!res.error) {
            setTimeout(() => navigate('/login'), 2000);
        }
    });
  };

  return (
    <div className="app-shell justify-center items-center p-8 bg-bg-color">
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6 }}
        className="glass auth-card"
        style={{ maxWidth: '480px', width: '100%', padding: '3.5rem' }}
      >
        <div className="text-center" style={{ marginBottom: '2.5rem' }}>
          <div className="flex justify-center" style={{ marginBottom: '1.5rem' }}>
            <div className="flex items-center justify-center" style={{ width: '3.5rem', height: '3.5rem', backgroundColor: 'rgba(59, 130, 246, 0.1)', borderRadius: '1rem' }}>
              <UserPlus className="text-primary-color" size={28} />
            </div>
          </div>
          <h1 className="font-display" style={{ fontSize: '1.875rem', marginBottom: '0.5rem' }}>Request ID</h1>
          <p style={{ fontSize: '0.875rem', color: 'var(--text-dim)', fontWeight: '500' }}>Provision new operator identity</p>
        </div>

        {success ? (
          <div style={{ padding: '2rem', backgroundColor: 'rgba(59, 130, 246, 0.05)', border: '1px solid rgba(59, 130, 246, 0.2)', textAlign: 'center', borderRadius: '12px' }}>
            <p style={{ fontSize: '1.125rem', fontWeight: '800', color: 'var(--primary-color)', marginBottom: '0.5rem' }}>ID_CREATED</p>
            <p style={{ fontSize: '0.75rem', color: 'var(--text-dim)', fontWeight: '600', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Initializing login portal...</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit}>
            <div className="input-group">
              <label className="input-label">Operator Handle</label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="input-field"
                placeholder="Unique Name"
                required
              />
            </div>

            <div className="input-group">
              <label className="input-label">Communication Node</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="input-field"
                placeholder="operator@node.com"
                required
              />
            </div>

            <div className="input-group">
              <label className="input-label">Access Passkey</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="input-field"
                placeholder="••••••••"
                required
              />
            </div>

            <div className="input-group">
              <label className="input-label">Verify Passkey</label>
              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="input-field"
                style={{ borderColor: password !== confirmPassword && confirmPassword !== '' ? '#ef4444' : '' }}
                placeholder="••••••••"
                required
              />
            </div>

            {error && (
              <div style={{ padding: '1rem', backgroundColor: 'rgba(239, 68, 68, 0.1)', border: '1px solid rgba(239, 68, 68, 0.2)', color: '#ef4444', fontSize: '0.75rem', fontWeight: '700', borderRadius: '8px', textAlign: 'center', marginBottom: '1.5rem' }}>
                {error}
              </div>
            )}

            <div style={{ marginTop: '2.5rem' }}>
              <button 
                type="submit" 
                disabled={loading || password !== confirmPassword}
                className="btn-primary flex items-center justify-center gap-4 py-4"
              >
                {loading ? <Loader2 className="animate-spin text-white" size={20} /> : 'Finalize Identity'}
              </button>
            </div>
          </form>
        )}

        <div className="text-center" style={{ marginTop: '2.5rem', fontSize: '0.75rem', fontWeight: '600', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
          Identity Linked?{' '}
          <Link to="/login" style={{ color: 'var(--primary-color)', textDecoration: 'none', fontWeight: '800' }}>
            Authorize
          </Link>
        </div>
      </motion.div>
    </div>
  );
};

export default RegisterPage;
