require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const rateLimit = require('express-rate-limit');
const logger = require('./config/logger');
const security = require('./config/security');
const { errorHandler } = require('./middleware/errorHandler');

// Import routes
const authRoutes = require('./routes/auth');
const notesRoutes = require('./routes/notes');
const actionsRoutes = require('./routes/actions');
const foldersRoutes = require('./routes/folders');
const tagsRoutes = require('./routes/tags');
const chatRoutes = require('./routes/chat');

// Create Express app
const app = express();

// Basic middleware
app.use(express.json({ limit: '10kb' }));
app.use(express.urlencoded({ extended: true, limit: '10kb' }));

// Security middleware
app.use(security.helmet);
app.use(security.cors);

// Rate limiting
const limiter = rateLimit({
  windowMs: parseInt(process.env.RATE_LIMIT_WINDOW_MS) || 900000,
  max: parseInt(process.env.RATE_LIMIT_MAX_REQUESTS) || 100
});
app.use('/api/', limiter);

// Database connection
mongoose.connect(process.env.MONGODB_URI)
  .then(() => logger.info('Connected to MongoDB'))
  .catch(err => logger.error('MongoDB connection error:', err));

// Apply routes
app.use('/api/auth', authRoutes);
app.use('/api/notes', notesRoutes);
app.use('/api/actions', actionsRoutes);
app.use('/api/folders', foldersRoutes);
app.use('/api/tags', tagsRoutes);
app.use('/api/chat', chatRoutes);

// Health check endpoint
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'ok' });
});

// Error handling middleware (should be last)
app.use(errorHandler);

// Unhandled rejection handling
process.on('unhandledRejection', (err) => {
  logger.error('Unhandled Rejection:', err);
  // Give the server time to finish pending requests before shutting down
  server.close(() => {
    process.exit(1);
  });
});

// Start server
const PORT = process.env.PORT || 3000;
const server = app.listen(PORT, () => {
  logger.info(`Server running on port ${PORT}`);
});

module.exports = app;
