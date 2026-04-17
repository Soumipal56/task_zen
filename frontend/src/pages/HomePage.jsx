import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { logout } from '../state/authSlice';
import { createTask } from '../state/tasksSlice';
import KanbanBoard from '../components/KanbanBoard';
import { 
  LogOut, Plus, LayoutGrid, ArrowRightLeft, Trash2, 
  ShieldCheck, Command, Search, Sparkles 
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const HomePage = () => {
  const { user } = useSelector((state) => state.auth);
  const [activeTab, setActiveTab] = useState('view'); // 'view', 'add', 'move', 'delete'
  const [newTaskTitle, setNewTaskTitle] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    navigate('/login');
  };

  const handleAddTask = (e) => {
    e.preventDefault();
    if (!newTaskTitle.trim()) return;
    dispatch(createTask({ title: newTaskTitle }));
    setNewTaskTitle('');
    setActiveTab('view'); 
  };

  const navigation = [
    { id: 'view', label: 'View Tasks', icon: LayoutGrid },
    { id: 'add', label: 'Add Task', icon: Plus },
    { id: 'move', label: 'Move Task', icon: ArrowRightLeft },
    { id: 'delete', label: 'Delete Task', icon: Trash2 },
  ];

  return (
    <div className="app-shell">
      {/* Stealth Sidebar */}
      <aside className="sidebar">
        <div style={{ marginBottom: '4rem' }}>
          <div className="flex items-center gap-4">
            <div className="flex items-center justify-center" style={{ width: '2.5rem', height: '2.5rem', backgroundColor: 'var(--primary-color)', borderRadius: '8px' }}>
              <Command size={20} className="text-black" />
            </div>
            <div>
              <h1 className="font-display" style={{ fontSize: '1.25rem', color: 'white' }}>TASKZEN</h1>
              <p style={{ fontSize: '0.65rem', fontWeight: '800', color: 'var(--text-muted)', letterSpacing: '0.2em', marginTop: '2px' }}>v.1.20_STEALTH</p>
            </div>
          </div>
        </div>

        <nav style={{ flex: 1 }}>
          <p style={{ fontSize: '0.65rem', fontWeight: '800', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.4em', marginBottom: '1.5rem', opacity: 0.5 }}>Operational Deck</p>
          <div className="flex flex-col">
            {navigation.map((item) => (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`nav-btn ${activeTab === item.id ? 'active' : ''}`}
              >
                <item.icon size={18} />
                <span>{item.label}</span>
              </button>
            ))}
          </div>

          <AnimatePresence>
            {activeTab === 'add' && (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="glass"
                style={{ marginTop: '2rem', padding: '1.5rem', borderRadius: '12px' }}
              >
                <p style={{ fontSize: '0.65rem', fontWeight: '800', color: 'var(--primary-color)', letterSpacing: '0.2em', textTransform: 'uppercase', marginBottom: '1rem' }}>New Operation</p>
                <form onSubmit={handleAddTask}>
                  <input 
                    type="text" 
                    autoFocus
                    value={newTaskTitle}
                    onChange={(e) => setNewTaskTitle(e.target.value)}
                    placeholder="DESCRIPTOR..." 
                    className="input-field"
                    style={{ fontSize: '10px', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '0.75rem' }}
                  />
                  <button type="submit" className="btn-primary" style={{ padding: '0.75rem', fontSize: '10px' }}>
                    INITIALIZE
                  </button>
                </form>
              </motion.div>
            )}
          </AnimatePresence>
        </nav>

        <div style={{ marginTop: 'auto', paddingTop: '2rem', borderTop: '1px solid var(--border-color)' }}>
          <div className="flex items-center justify-between" style={{ marginBottom: '1.5rem' }}>
            <div className="flex items-center gap-3">
              <div className="flex items-center justify-center" style={{ width: '2.5rem', height: '2.5rem', backgroundColor: 'var(--surface-color)', border: '1px solid var(--border-color)', borderRadius: '50%', fontWeight: '900', fontSize: '0.75rem' }}>
                {user?.username?.slice(0, 2).toUpperCase()}
              </div>
              <div>
                <p style={{ fontSize: '0.65rem', color: 'var(--text-muted)', fontWeight: '800', textTransform: 'uppercase' }}>Operator</p>
                <p style={{ fontSize: '0.875rem', fontWeight: '900', color: 'white' }}>{user?.username}</p>
              </div>
            </div>
            <button 
              onClick={handleLogout}
              style={{ background: 'transparent', border: 'none', color: 'var(--text-muted)', cursor: 'pointer' }}
              title="Terminate Session"
            >
              <LogOut size={18} />
            </button>
          </div>
          <div className="flex items-center gap-2" style={{ padding: '0.5rem 0.75rem', backgroundColor: 'rgba(59, 130, 246, 0.05)', border: '1px solid rgba(59, 130, 246, 0.2)', borderRadius: '6px' }}>
            <ShieldCheck size={12} style={{ color: 'var(--primary-color)' }} />
            <span style={{ fontSize: '0.65rem', fontWeight: '800', color: 'var(--primary-color)', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Secured</span>
          </div>
        </div>
      </aside>

      {/* Main Workspace */}
      <main className="main-content">
        {/* Subtle Header */}
        <div style={{ width: '100%', maxWidth: '1000px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '4rem', opacity: 0.4 }}>
          <p style={{ fontSize: '0.65rem', fontWeight: '800', textTransform: 'uppercase', letterSpacing: '0.3em' }}>Node_Alpha_Synced</p>
          <div className="flex items-center gap-4">
             <div className="flex items-center gap-2" style={{ borderBottom: '1px solid var(--border-color)', paddingBottom: '0.25rem' }}>
               <Search size={14} />
               <input type="text" placeholder="SCAN..." style={{ background: 'transparent', border: 'none', color: 'white', fontSize: '10px', fontWeight: '800', outline: 'none', width: '80px' }} />
             </div>
          </div>
        </div>

        {/* Hero Banner */}
        <motion.section 
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          className="hero-banner glass"
        >
          <div className="flex items-center justify-center gap-3" style={{ marginBottom: '1.5rem' }}>
            <Sparkles style={{ color: 'var(--primary-color)' }} size={24} />
            <span style={{ fontSize: '0.65rem', fontWeight: '900', color: 'var(--primary-color)', textTransform: 'uppercase', letterSpacing: '0.5em' }}>Matrix_Initialized</span>
          </div>
          <h2 className="font-display">
            Welcome Back, <br />
            <span style={{ color: 'var(--primary-color)', fontStyle: 'italic' }}>{user?.username?.toUpperCase() || 'OPERATOR'}</span>
          </h2>
          <p>
            Your tactical neural board is fully synchronized. Command operations and monitor real-time node executions from this central console.
          </p>
        </motion.section>

        {/* Workspace Display */}
        <section className="w-full h-full" style={{ maxWidth: '1100px', paddingBottom: '5rem' }}>
          <KanbanBoard hideActions={activeTab !== 'view'} />
        </section>
      </main>
    </div>
  );
};

export default HomePage;
