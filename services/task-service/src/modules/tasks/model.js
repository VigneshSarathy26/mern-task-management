const { mongoose } = require('@platform/database');

const taskSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Task must have a title'],
    trim: true,
  },
  description: {
    type: String,
    trim: true,
  },
  status: {
    type: String,
    enum: ['todo', 'in-progress', 'done', 'archived'],
    default: 'todo',
  },
  priority: {
    type: String,
    enum: ['low', 'medium', 'high', 'urgent'],
    default: 'medium',
  },
  creator: {
    type: mongoose.Schema.Types.ObjectId,
    required: [true, 'Task must have a creator'],
  },
  assignedTo: {
    type: mongoose.Schema.Types.ObjectId,
  },
  dueDate: {
    type: Date,
  },
  deletedAt: {
    type: Date,
    default: null,
  },
}, {
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

// Compound index for status and priority
taskSchema.index({ status: 1, priority: -1 });

// Index for creator to support user task listing
taskSchema.index({ creator: 1 });

// TTL index for auto-pruning archived tasks after 30 days
// We set expireAfterSeconds: 2592000 (30 days) on a date field
taskSchema.index({ updatedAt: 1 }, { expireAfterSeconds: 2592000, partialFilterExpression: { status: 'archived' } });

const Task = mongoose.model('Task', taskSchema);

module.exports = Task;
