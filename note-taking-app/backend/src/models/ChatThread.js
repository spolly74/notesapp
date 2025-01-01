// src/models/ChatThread.js
const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema({
  role: {
    type: String,
    enum: ['user', 'assistant'],
    required: true
  },
  content: {
    type: String,
    required: true
  },
  timestamp: {
    type: Date,
    default: Date.now
  }
});

const chatThreadSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  messages: [messageSchema],
  context: {
    folders: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Folder'
    }],
    notes: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Note'
    }],
    tags: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Tag'
    }]
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  status: {
    type: String,
    enum: ['active', 'archived'],
    default: 'active'
  },
  lastMessageAt: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true
});

// Update lastMessageAt when new messages are added
chatThreadSchema.pre('save', function(next) {
  if (this.isModified('messages')) {
    this.lastMessageAt = Date.now();
  }
  next();
});

// Index for efficient querying
chatThreadSchema.index({ user: 1, lastMessageAt: -1 });
chatThreadSchema.index({ user: 1, status: 1 });

// Methods to manage messages
chatThreadSchema.methods.addMessage = function(role, content) {
  this.messages.push({ role, content });
  return this.save();
};

chatThreadSchema.methods.getLastMessage = function() {
  return this.messages[this.messages.length - 1];
};

const ChatThread = mongoose.model('ChatThread', chatThreadSchema);

module.exports = ChatThread;
