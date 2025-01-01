// src/models/Tag.js
const mongoose = require('mongoose');

const tagSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  color: {
    type: String,
    default: '#e0e0e0',
    validate: {
      validator: function(v) {
        return /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/.test(v);
      },
      message: props => `${props.value} is not a valid hex color!`
    }
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

// Virtual for getting notes with this tag
tagSchema.virtual('notes', {
  ref: 'Note',
  localField: '_id',
  foreignField: 'tags'
});

// Compound index for user and tag name (unique per user)
tagSchema.index({ name: 1, user: 1 }, { unique: true });

// Pre-save middleware to format tag name
tagSchema.pre('save', function(next) {
  // Remove '#' if user included it in the name
  if (this.name.startsWith('#')) {
    this.name = this.name.substring(1);
  }
  // Convert to lowercase
  this.name = this.name.toLowerCase();
  next();
});

const Tag = mongoose.model('Tag', tagSchema);

module.exports = Tag;
