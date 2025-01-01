// src/routes/tags.js
const express = require('express');
const router = express.Router();
const Tag = require('../models/Tag');
const authMiddleware = require('../middleware/auth');

// Apply auth middleware to all routes
router.use(authMiddleware);

// GET /api/tags - Get all tags for user
router.get('/', async (req, res) => {
  try {
    const tags = await Tag.find({ user: req.user.userId })
      .sort({ name: 1 });
    res.json(tags);
  } catch (error) {
    console.error('Get tags error:', error);
    res.status(500).json({ message: 'Error fetching tags' });
  }
});

// GET /api/tags/:id - Get specific tag with related notes
router.get('/:id', async (req, res) => {
  try {
    const tag = await Tag.findOne({
      _id: req.params.id,
      user: req.user.userId
    }).populate('notes');

    if (!tag) {
      return res.status(404).json({ message: 'Tag not found' });
    }

    res.json(tag);
  } catch (error) {
    console.error('Get tag error:', error);
    res.status(500).json({ message: 'Error fetching tag' });
  }
});

// POST /api/tags - Create new tag
router.post('/', async (req, res) => {
  try {
    const { name, color } = req.body;

    // Check if tag with same name exists for user
    const existingTag = await Tag.findOne({
      name: name.toLowerCase(),
      user: req.user.userId
    });

    if (existingTag) {
      return res.status(400).json({ message: 'Tag already exists' });
    }

    const tag = new Tag({
      name,
      color,
      user: req.user.userId
    });

    await tag.save();
    res.status(201).json(tag);
  } catch (error) {
    console.error('Create tag error:', error);
    res.status(500).json({ message: 'Error creating tag' });
  }
});

// PUT /api/tags/:id - Update tag
router.put('/:id', async (req, res) => {
  try {
    const { name, color } = req.body;

    // Check if new name conflicts with existing tag
    if (name) {
      const existingTag = await Tag.findOne({
        name: name.toLowerCase(),
        user: req.user.userId,
        _id: { $ne: req.params.id }
      });

      if (existingTag) {
        return res.status(400).json({ message: 'Tag name already exists' });
      }
    }

    const tag = await Tag.findOneAndUpdate(
      {
        _id: req.params.id,
        user: req.user.userId
      },
      {
        name,
        color
      },
      { new: true }
    );

    if (!tag) {
      return res.status(404).json({ message: 'Tag not found' });
    }

    res.json(tag);
  } catch (error) {
    console.error('Update tag error:', error);
    res.status(500).json({ message: 'Error updating tag' });
  }
});

// DELETE /api/tags/:id - Delete tag
router.delete('/:id', async (req, res) => {
  try {
    const tag = await Tag.findOneAndDelete({
      _id: req.params.id,
      user: req.user.userId
    });

    if (!tag) {
      return res.status(404).json({ message: 'Tag not found' });
    }

    res.json({ message: 'Tag deleted' });
  } catch (error) {
    console.error('Delete tag error:', error);
    res.status(500).json({ message: 'Error deleting tag' });
  }
});

module.exports = router;
