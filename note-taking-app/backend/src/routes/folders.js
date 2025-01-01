// src/routes/folders.js
const express = require('express');
const router = express.Router();
const Folder = require('../models/Folder');
const authMiddleware = require('../middleware/auth');

// Apply auth middleware to all routes
router.use(authMiddleware);

// GET /api/folders - Get all folders for user
router.get('/', async (req, res) => {
  try {
    const folders = await Folder.find({ user: req.user.userId })
      .populate('parent')
      .sort({ path: 1 });
    res.json(folders);
  } catch (error) {
    console.error('Get folders error:', error);
    res.status(500).json({ message: 'Error fetching folders' });
  }
});

// GET /api/folders/:id - Get specific folder
router.get('/:id', async (req, res) => {
  try {
    const folder = await Folder.findOne({
      _id: req.params.id,
      user: req.user.userId
    }).populate(['parent', 'children', 'notes']);

    if (!folder) {
      return res.status(404).json({ message: 'Folder not found' });
    }

    res.json(folder);
  } catch (error) {
    console.error('Get folder error:', error);
    res.status(500).json({ message: 'Error fetching folder' });
  }
});

// POST /api/folders - Create new folder
router.post('/', async (req, res) => {
  try {
    const { name, path, parent } = req.body;

    // Check if folder with same path exists
    const existingFolder = await Folder.findOne({
      path,
      user: req.user.userId
    });

    if (existingFolder) {
      return res.status(400).json({ message: 'Folder path already exists' });
    }

    const folder = new Folder({
      name,
      path,
      parent,
      user: req.user.userId
    });

    await folder.save();
    await folder.populate('parent');

    res.status(201).json(folder);
  } catch (error) {
    console.error('Create folder error:', error);
    res.status(500).json({ message: 'Error creating folder' });
  }
});

// PUT /api/folders/:id - Update folder
router.put('/:id', async (req, res) => {
  try {
    const { name, path, parent } = req.body;

    // Check if new path conflicts with existing folder
    if (path) {
      const existingFolder = await Folder.findOne({
        path,
        user: req.user.userId,
        _id: { $ne: req.params.id }
      });

      if (existingFolder) {
        return res.status(400).json({ message: 'Folder path already exists' });
      }
    }

    const folder = await Folder.findOneAndUpdate(
      {
        _id: req.params.id,
        user: req.user.userId
      },
      {
        name,
        path,
        parent
      },
      { new: true }
    ).populate('parent');

    if (!folder) {
      return res.status(404).json({ message: 'Folder not found' });
    }

    res.json(folder);
  } catch (error) {
    console.error('Update folder error:', error);
    res.status(500).json({ message: 'Error updating folder' });
  }
});

// DELETE /api/folders/:id - Delete folder
router.delete('/:id', async (req, res) => {
  try {
    // Check if folder has children
    const hasChildren = await Folder.exists({
      parent: req.params.id,
      user: req.user.userId
    });

    if (hasChildren) {
      return res.status(400).json({ message: 'Cannot delete folder with subfolders' });
    }

    const folder = await Folder.findOneAndDelete({
      _id: req.params.id,
      user: req.user.userId
    });

    if (!folder) {
      return res.status(404).json({ message: 'Folder not found' });
    }

    res.json({ message: 'Folder deleted' });
  } catch (error) {
    console.error('Delete folder error:', error);
    res.status(500).json({ message: 'Error deleting folder' });
  }
});

module.exports = router;
