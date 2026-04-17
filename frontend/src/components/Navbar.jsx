import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { logout } from '../state/authSlice';
import { Layout, LogOut, User, LogIn, UserPlus } from 'lucide-react';

const Navbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);

  const handleLogout = () => {
    dispatch(logout());
    navigate('/login');
  };

  return (
    <nav className="glass sticky top-4 z-50 mx-4 px-6 py-4 mb-12 flex justify-between items-center">
      <Link to="/" className="flex items-center gap-2 text-primary hover:opacity-80 transition-opacity">
        <Layout size={24} />
        <span className="font-bold text-xl tracking-tight uppercase">Kanban</span>
      </Link>

      <div className="flex items-center gap-6">
        {user ? (
          <>
            <div className="flex items-center gap-2 px-3 py-1.5 bg-white/5 rounded-full border border-white/10">
              <User size={16} className="text-primary" />
              <span className="text-sm font-medium">{user.username}</span>
            </div>
            <button 
              onClick={handleLogout}
              className="flex items-center gap-2 text-sm font-semibold text-text-muted hover:text-red-400 transition-colors"
            >
              <LogOut size={18} />
              <span>Logout</span>
            </button>
          </>
        ) : (
          <>
            <Link 
              to="/login" 
              className="flex items-center gap-2 text-sm font-semibold text-text-muted hover:text-white transition-colors"
            >
              <LogIn size={18} />
              <span>Login</span>
            </Link>
            <Link 
              to="/register" 
              className="premium-button text-sm px-4 py-2"
            >
              <UserPlus size={18} />
              <span>Register</span>
            </Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
