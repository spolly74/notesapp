// src/models/ActionItem.js
const mongoose = require('mongoose');

const actionItemSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    trim: true
  },
  effortLevel: {
    type: String,
    enum: ['S', 'M', 'L'],
    required: true
  },
  dueDate: {
    type: Date,
    required: true
  },
  status: {
    type: String,
    enum: ['pending', 'inProgress', 'completed', 'archived'],
    default: 'pending'
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  sourceNote: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Note'
  },
  chatThread: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'ChatThread'
  }
}, {
  timestamps: true
});

// Index for querying by status and due date
actionItemSchema.index({ status: 1, dueDate: 1 });

// Virtual for checking if overdue
actionItemSchema.virtual('isOverdue').get(function() {
  return this.status !== 'completed' && this.dueDate < new Date();
});

const ActionItem = mongoose.model('ActionItem', actionItemSchema);

module.exports = ActionItem;
