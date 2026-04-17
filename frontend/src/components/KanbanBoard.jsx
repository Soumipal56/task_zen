import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchTasks, updateTask, deleteTask } from '../state/tasksSlice';
import TaskCard from './TaskCard';
import { motion, AnimatePresence } from 'framer-motion';

const KanbanBoard = ({ activeTab }) => {
  const dispatch = useDispatch();
  const { tasks, loading } = useSelector((state) => state.tasks);

  useEffect(() => {
    dispatch(fetchTasks());
  }, [dispatch]);

  const handleToggleTask = (id, currentStatus) => {
    const newStatus = currentStatus === 'todo' ? 'done' : 'todo';
    dispatch(updateTask({ id, status: newStatus }));
  };

  const handleDeleteTask = (id) => {
    dispatch(deleteTask(id));
  };

  if (loading) return (
    <div className="flex flex-col items-center justify-center" style={{ padding: '5rem 0' }}>
      <div style={{ width: '2rem', height: '2rem', border: '3px solid var(--primary-color)', borderTopColor: 'transparent', borderRadius: '50%', animation: 'spin 1s linear infinite', marginBottom: '1.5rem' }} />
      <p style={{ fontSize: '0.65rem', fontWeight: '800', textTransform: 'uppercase', letterSpacing: '0.5em', color: 'var(--primary-color)' }}>Synchronizing Nodes...</p>
      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </div>
  );

  const columns = [
    { id: 'todo', title: 'Open Node Operations', subtitle: 'Awaiting_Activation' },
    { id: 'done', title: 'Compiled Results', subtitle: 'Deployment_Verified' }
  ];

  return (
    <div className="kanban-grid">
      {columns.map((column) => (
        <div key={column.id} className="kanban-column">
          <header className="column-header">
            <div>
              <h3 className="column-title">{column.title}</h3>
              <p style={{ fontSize: '9px', fontWeight: '700', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.1em', marginTop: '4px' }}>{column.subtitle}</p>
            </div>
            <span style={{ fontSize: '10px', fontWeight: '900', color: 'var(--text-dim)', backgroundColor: 'var(--surface-color)', padding: '4px 10px', borderRadius: '4px', border: '1px solid var(--border-color)' }}>
              {tasks.filter(t => t.status === column.id).length}
            </span>
          </header>
          
          <div className="flex flex-col gap-8">
            <AnimatePresence mode="popLayout">
              {tasks
                .filter((task) => task.status === column.id)
                .map((task) => (
                  <TaskCard
                    key={task.id}
                    task={task}
                    onToggle={handleToggleTask}
                    onDelete={handleDeleteTask}
                    activeTab={activeTab}
                  />
                ))}
            </AnimatePresence>
            {tasks.filter(t => t.status === column.id).length === 0 && (
              <div className="center-content" style={{ padding: '4rem 0', border: '2px dashed var(--border-color)', borderRadius: '12px', opacity: 0.3 }}>
                <p style={{ fontSize: '9px', fontWeight: '800', textTransform: 'uppercase', letterSpacing: '0.3em' }}>Matrix_Void</p>
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default KanbanBoard;
