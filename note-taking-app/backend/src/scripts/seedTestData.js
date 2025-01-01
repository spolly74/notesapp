// src/scripts/seedTestData.js
require('dotenv').config();
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

// Import models
const User = require('../models/User');
const Folder = require('../models/Folder');
const Tag = require('../models/Tag');
const Note = require('../models/Note');
const ActionItem = require('../models/ActionItem');
const ChatThread = require('../models/ChatThread');

async function seedTestData() {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB');

    // Clear existing data
    await Promise.all([
      User.deleteMany({}),
      Folder.deleteMany({}),
      Tag.deleteMany({}),
      Note.deleteMany({}),
      ActionItem.deleteMany({}),
      ChatThread.deleteMany({})
    ]);
    console.log('Cleared existing data');

    // Create test user
    const user = await User.create({
      email: 'test@example.com',
      password: 'password123',
      settings: {
        theme: 'light',
        defaultView: 'list'
      }
    });
    console.log('Created test user');

    // Create folders
    const rootFolder = await Folder.create({
      name: 'Root',
      path: '/',
      user: user._id
    });

    const workFolder = await Folder.create({
      name: 'Work',
      path: '/work',
      parent: rootFolder._id,
      user: user._id
    });

    const projectsFolder = await Folder.create({
      name: 'Projects',
      path: '/work/projects',
      parent: workFolder._id,
      user: user._id
    });
    console.log('Created folders');

    // Create tags
    const tags = await Tag.create([
      {
        name: 'urgent',
        color: '#ff4444',
        user: user._id
      },
      {
        name: 'feature',
        color: '#44ff44',
        user: user._id
      },
      {
        name: 'review',
        color: '#4444ff',
        user: user._id
      }
    ]);
    console.log('Created tags');

    // Create notes
    const note1 = await Note.create({
      title: 'Product Meeting Notes',
      content: '# Meeting Notes\n\nDiscussed new feature requirements...',
      folder: workFolder._id,
      tags: [tags[0]._id, tags[1]._id],
      user: user._id
    });

    const note2 = await Note.create({
      title: 'Documentation Plan',
      content: '# Documentation Plan\n\nOutline for new documentation...',
      folder: projectsFolder._id,
      tags: [tags[2]._id],
      user: user._id
    });
    console.log('Created notes');

    // Create action items
    const actionItem1 = await ActionItem.create({
      title: 'Update API docs',
      description: 'Update the API documentation with new endpoints',
      effortLevel: 'M',
      dueDate: new Date(Date.now() + 86400000), // Tomorrow
      status: 'pending',
      user: user._id,
      sourceNote: note2._id
    });

    const actionItem2 = await ActionItem.create({
      title: 'Review feedback',
      description: 'Review team feedback on new features',
      effortLevel: 'S',
      dueDate: new Date(Date.now() + 432000000), // 5 days from now
      status: 'pending',
      user: user._id,
      sourceNote: note1._id
    });
    console.log('Created action items');

    // Create chat thread
    const chatThread = await ChatThread.create({
      title: 'API Documentation Discussion',
      messages: [
        {
          role: 'user',
          content: 'How should we structure the API documentation?'
        },
        {
          role: 'assistant',
          content: 'I recommend following OpenAPI specification...'
        }
      ],
      context: {
        folders: [projectsFolder._id],
        notes: [note2._id],
        tags: [tags[2]._id]
      },
      user: user._id
    });
    console.log('Created chat thread');

    // Update notes with action items and chat threads
    await Note.updateMany(
      { _id: { $in: [note1._id, note2._id] } },
      {
        $push: {
          actionItems: {
            $each: [actionItem1._id, actionItem2._id]
          },
          chatThreads: chatThread._id
        }
      }
    );
    console.log('Updated note references');

    console.log('Test data seeding completed successfully!');
    console.log('\nTest User Credentials:');
    console.log('Email: test@example.com');
    console.log('Password: password123');

  } catch (error) {
    console.error('Error seeding test data:', error);
  } finally {
    await mongoose.disconnect();
    console.log('Disconnected from MongoDB');
  }
}

// Run the seeding function
seedTestData();
