// src/routes/actions.js
const express = require('express');
const router = express.Router();
const ActionItem = require('../models/ActionItem');
const authMiddleware = require('../middleware/auth');

// Apply auth middleware to all routes
router.use(authMiddleware);

// GET /api/actions - Get all action items for user
router.get('/', async (req, res) => {
  try {
    const { status, dueDate } = req.query;
    const query = { user: req.user.userId };

    // Add filters if provided
    if (status) query.status = status;
    if (dueDate) {
      const date = new Date(dueDate);
      query.dueDate = { $lte: date };
    }

    const actionItems = await ActionItem.find(query)
      .populate('sourceNote')
      .sort({ dueDate: 1 });
    res.json(actionItems);
  } catch (error) {
    console.error('Get actions error:', error);
    res.status(500).json({ message: 'Error fetching action items' });
  }
});

// GET /api/actions/:id - Get specific action item
router.get('/:id', async (req, res) => {
  try {
    const actionItem = await ActionItem.findOne({
      _id: req.params.id,
      user: req.user.userId
    }).populate('sourceNote');

    if (!actionItem) {
      return res.status(404).json({ message: 'Action item not found' });
    }

    res.json(actionItem);
  } catch (error) {
    console.error('Get action error:', error);
    res.status(500).json({ message: 'Error fetching action item' });
  }
});

// POST /api/actions - Create new action item
router.post('/', async (req, res) => {
  try {
    const { title, description, effortLevel, dueDate, sourceNote } = req.body;

    const actionItem = new ActionItem({
      title,
      description,
      effortLevel,
      dueDate,
      sourceNote,
      user: req.user.userId
    });

    await actionItem.save();
    await actionItem.populate('sourceNote');

    res.status(201).json(actionItem);
  } catch (error) {
    console.error('Create action error:', error);
    res.status(500).json({ message: 'Error creating action item' });
  }
});

// PUT /api/actions/:id - Update action item
router.put('/:id', async (req, res) => {
  try {
    const { title, description, effortLevel, dueDate, status, sourceNote } = req.body;

    const actionItem = await ActionItem.findOneAndUpdate(
      {
        _id: req.params.id,
        user: req.user.userId
      },
      {
        title,
        description,
        effortLevel,
        dueDate,
        status,
        sourceNote
      },
      { new: true }
    ).populate('sourceNote');

    if (!actionItem) {
      return res.status(404).json({ message: 'Action item not found' });
    }

    res.json(actionItem);
  } catch (error) {
    console.error('Update action error:', error);
    res.status(500).json({ message: 'Error updating action item' });
  }
});

// DELETE /api/actions/:id - Delete action item
router.delete('/:id', async (req, res) => {
  try {
    const actionItem = await ActionItem.findOneAndDelete({
      _id: req.params.id,
      user: req.user.userId
    });

    if (!actionItem) {
      return res.status(404).json({ message: 'Action item not found' });
    }

    res.json({ message: 'Action item deleted' });
  } catch (error) {
    console.error('Delete action error:', error);
    res.status(500).json({ message: 'Error deleting action item' });
  }
});

module.exports = router;
