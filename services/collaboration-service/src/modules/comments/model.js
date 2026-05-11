const { mongoose } = require('@platform/database');

const commentSchema = new mongoose.Schema({
  taskId: {
    type: mongoose.Schema.Types.ObjectId,
    required: [true, 'Comment must belong to a task'],
    index: true,
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    required: [true, 'Comment must have an author'],
  },
  userName: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: [true, 'Comment content cannot be empty'],
    trim: true,
  },
  mentions: [{
    type: String,
  }],
}, {
  timestamps: true,
});

const Comment = mongoose.model('Comment', commentSchema);

module.exports = Comment;
