// src/models/Note.js
const mongoose = require('mongoose');

const noteSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  content: {
    type: String,
    required: true
  },
  folder: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Folder',
    required: true
  },
  tags: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Tag'
  }],
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  actionItems: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'ActionItem'
  }],
  chatThreads: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'ChatThread'
  }]
}, {
  timestamps: true
});

// Index for full-text search
noteSchema.index({
  title: 'text',
  content: 'text'
});

// Pre-save middleware to ensure folder exists
noteSchema.pre('save', async function(next) {
  if (this.isModified('folder')) {
    const folderExists = await mongoose.model('Folder').exists({ _id: this.folder });
    if (!folderExists) {
      next(new Error('Folder does not exist'));
    }
  }
  next();
});

const Note = mongoose.model('Note', noteSchema);

module.exports = Note;
