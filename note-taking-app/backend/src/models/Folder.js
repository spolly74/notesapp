// src/models/Folder.js
const mongoose = require('mongoose');

const folderSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  path: {
    type: String,
    required: true,
    trim: true
  },
  parent: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Folder',
    default: null
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }
}, {
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

// Virtual for getting child folders
folderSchema.virtual('children', {
  ref: 'Folder',
  localField: '_id',
  foreignField: 'parent'
});

// Virtual for getting notes in this folder
folderSchema.virtual('notes', {
  ref: 'Note',
  localField: '_id',
  foreignField: 'folder'
});

// Index for efficient path lookups
folderSchema.index({ path: 1, user: 1 }, { unique: true });

// Middleware to ensure path format
folderSchema.pre('save', function(next) {
  // Ensure path starts with '/'
  if (!this.path.startsWith('/')) {
    this.path = '/' + this.path;
  }
  // Remove trailing slash if exists
  if (this.path !== '/' && this.path.endsWith('/')) {
    this.path = this.path.slice(0, -1);
  }
  next();
});

const Folder = mongoose.model('Folder', folderSchema);

module.exports = Folder;
