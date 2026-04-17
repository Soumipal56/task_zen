import React, { useState } from 'react';
import { Plus } from 'lucide-react';

const TaskInput = ({ onAdd }) => {
  const [title, setTitle] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (title.trim()) {
      onAdd(title);
      setTitle('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex gap-2 max-w-lg mx-auto mb-12">
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="What needs to be done?"
        className="input-glass flex-1"
      />
      <button type="submit" className="premium-button">
        <Plus size={20} />
        <span>Add Task</span>
      </button>
    </form>
  );
};

export default TaskInput;
