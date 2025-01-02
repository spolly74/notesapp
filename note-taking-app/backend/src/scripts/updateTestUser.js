// src/scripts/updateTestUser.js
require('dotenv').config();
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const User = require('../models/User');

async function updateTestUser() {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB');

    // Update password for test user
    const hashedPassword = await bcrypt.hash('Test123!@#', 10);

    const updatedUser = await User.findOneAndUpdate(
      { email: 'test@example.com' },
      {
        $set: {
          password: hashedPassword,
          isVerified: true
        }
      },
      { new: true }
    );

    if (updatedUser) {
      console.log('Test user updated successfully');
      console.log('Email: test@example.com');
      console.log('Password: Test123!@#');
    } else {
      console.log('Test user not found');
    }

  } catch (error) {
    console.error('Error updating test user:', error);
  } finally {
    await mongoose.connection.close();
    console.log('Database connection closed');
  }
}

updateTestUser();
