import React from 'react';
import { motion } from 'framer-motion';
import { Trash2, CheckCircle, RotateCcw, Box, Activity } from 'lucide-react';

const TaskCard = ({ task, onToggle, onDelete, hideActions }) => {
  // Mapping priority based on string ID hash
  const idHash = task.id.toString().split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
  const priority = task.priority || (idHash % 3 === 0 ? 'High' : idHash % 2 === 0 ? 'Medium' : 'Low');

  const priorityColors = {
    High: '#ef4444',
    Medium: '#f59e0b',
    Low: '#10b981',
  };

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      whileHover={{ y: -4, borderColor: 'rgba(255, 255, 255, 0.2)' }}
      className="task-card"
    >
      <div className="flex justify-between items-start" style={{ marginBottom: '1.5rem' }}>
        <div className="flex items-center gap-3">
          <div style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: priorityColors[priority], boxShadow: `0 0 10px ${priorityColors[priority]}44` }} />
          <span style={{ fontSize: '9px', fontWeight: '900', color: 'var(--text-dim)', textTransform: 'uppercase', letterSpacing: '0.2em' }}>
            {priority}_LVL
          </span>
        </div>
        
        {!hideActions && (
          <div className="flex gap-2 group-actions">
            <button
              onClick={() => onToggle(task.id, task.status)}
              style={{ padding: '0.4rem', background: 'rgba(255, 255, 255, 0.03)', border: '1px solid var(--border-color)', borderRadius: '6px', color: 'var(--primary-color)', cursor: 'pointer', transition: 'all 0.2s' }}
              title={task.status === 'todo' ? 'EXECUTE' : 'REVERT'}
            >
              {task.status === 'todo' ? <CheckCircle size={14} /> : <RotateCcw size={14} />}
            </button>
            <button
              onClick={() => onDelete(task.id)}
              style={{ padding: '0.4rem', background: 'rgba(239, 68, 68, 0.05)', border: '1px solid rgba(239, 68, 68, 0.1)', borderRadius: '6px', color: '#ef4444', cursor: 'pointer', transition: 'all 0.2s' }}
              title="PURGE"
            >
              <Trash2 size={14} />
            </button>
          </div>
        )}
      </div>

      <div className="flex items-center gap-4" style={{ marginBottom: '1.5rem' }}>
        <div className="flex items-center justify-centerGall" style={{ padding: '0.75rem', backgroundColor: 'var(--surface-color)', border: '1px solid var(--border-color)', borderRadius: '10px' }}>
            <Box size={22} style={{ color: 'var(--text-dim)' }} />
        </div>
        <div style={{ flex: 1 }}>
          <h4 className="font-display" style={{ textTransform: 'uppercase', fontSize: '1rem', fontStyle: 'italic', letterSpacing: '0.05em' }}>
            {task.title}
          </h4>
          <p style={{ fontSize: '10px', fontWeight: '600', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Secure Matrix Entry</p>
        </div>
      </div>
      
      <div className="flex items-center justify-between" style={{ paddingTop: '1.25rem', borderTop: '1px solid var(--border-color)', opacity: 0.6 }}>
        <div className="flex items-center gap-2">
            <Activity size={12} style={{ color: 'var(--primary-color)' }} />
            <p style={{ fontSize: '9px', fontWeight: '800', textTransform: 'uppercase', letterSpacing: '0.15em' }}>
              Node: <span style={{ color: 'white' }}>{task.id.toString().slice(-8).toUpperCase()}</span>
            </p>
        </div>
        <span style={{ fontSize: '8px', fontWeight: '900', textTransform: 'uppercase', letterSpacing: '0.3em' }}>
          Sync_OK
        </span>
      </div>
    </motion.div>
  );
};

export default TaskCard;
