import mongoose from 'mongoose';

const taskSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Please add a task title'],
      trim: true
    },
    status: {
      type: String,
      enum: ['todo', 'done'],
      default: 'todo'
    },
    user: {
      type: mongoose.Schema.ObjectId,
      ref: 'User',
      required: true
    }
  },
  {
    timestamps: true
  }
);

// Virtual field to return 'id' instead of '_id' for frontend compatibility if needed,
// but usually just using _id is fine. For now, we'll keep it simple.
// We can use a transform if we want to match the old {id, title, status} structure exactly.

taskSchema.set('toJSON', {
  virtuals: true,
  versionKey: false,
  transform: function (doc, ret) {
    ret.id = ret._id;
    delete ret._id;
  }
});

const Task = mongoose.model('Task', taskSchema);

export default Task;
