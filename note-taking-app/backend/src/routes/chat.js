// src/routes/chat.js
const express = require('express');
const router = express.Router();
const ChatThread = require('../models/ChatThread');
const authMiddleware = require('../middleware/auth');

// Apply auth middleware to all routes
router.use(authMiddleware);

// GET /api/chat - Get all chat threads for user
router.get('/', async (req, res) => {
  try {
    const threads = await ChatThread.find({ user: req.user.userId })
      .populate(['context.folders', 'context.notes', 'context.tags'])
      .sort({ lastMessageAt: -1 });
    res.json(threads);
  } catch (error) {
    console.error('Get chat threads error:', error);
    res.status(500).json({ message: 'Error fetching chat threads' });
  }
});

// GET /api/chat/:id - Get specific chat thread
router.get('/:id', async (req, res) => {
  try {
    const thread = await ChatThread.findOne({
      _id: req.params.id,
      user: req.user.userId
    }).populate(['context.folders', 'context.notes', 'context.tags']);

    if (!thread) {
      return res.status(404).json({ message: 'Chat thread not found' });
    }

    res.json(thread);
  } catch (error) {
    console.error('Get chat thread error:', error);
    res.status(500).json({ message: 'Error fetching chat thread' });
  }
});

// POST /api/chat - Create new chat thread
router.post('/', async (req, res) => {
  try {
    const { title, context } = req.body;

    const thread = new ChatThread({
      title,
      context,
      user: req.user.userId
    });

    await thread.save();
    await thread.populate(['context.folders', 'context.notes', 'context.tags']);

    res.status(201).json(thread);
  } catch (error) {
    console.error('Create chat thread error:', error);
    res.status(500).json({ message: 'Error creating chat thread' });
  }
});

// POST /api/chat/:id/messages - Add message to thread
router.post('/:id/messages', async (req, res) => {
  try {
    const { role, content } = req.body;

    const thread = await ChatThread.findOne({
      _id: req.params.id,
      user: req.user.userId
    });

    if (!thread) {
      return res.status(404).json({ message: 'Chat thread not found' });
    }

    thread.messages.push({ role, content });
    thread.lastMessageAt = Date.now();

    await thread.save();
    await thread.populate(['context.folders', 'context.notes', 'context.tags']);

    res.json(thread);
  } catch (error) {
    console.error('Add message error:', error);
    res.status(500).json({ message: 'Error adding message' });
  }
});

// PUT /api/chat/:id - Update chat thread
router.put('/:id', async (req, res) => {
  try {
    const { title, context, status } = req.body;

    const thread = await ChatThread.findOneAndUpdate(
      {
        _id: req.params.id,
        user: req.user.userId
      },
      {
        title,
        context,
        status
      },
      { new: true }
    ).populate(['context.folders', 'context.notes', 'context.tags']);

    if (!thread) {
      return res.status(404).json({ message: 'Chat thread not found' });
    }

    res.json(thread);
  } catch (error) {
    console.error('Update chat thread error:', error);
    res.status(500).json({ message: 'Error updating chat thread' });
  }
});

// DELETE /api/chat/:id - Delete chat thread
router.delete('/:id', async (req, res) => {
  try {
    const thread = await ChatThread.findOneAndDelete({
      _id: req.params.id,
      user: req.user.userId
    });

    if (!thread) {
      return res.status(404).json({ message: 'Chat thread not found' });
    }

    res.json({ message: 'Chat thread deleted' });
  } catch (error) {
    console.error('Delete chat thread error:', error);
    res.status(500).json({ message: 'Error deleting chat thread' });
  }
});

module.exports = router;
