// src/middleware/errorHandler.js

const errorHandler = (err, req, res, next) => {
    console.error(err.stack);

    // Default error
    let statusCode = 500;
    let message = 'Internal Server Error';

    // Handle different types of errors
    if (err.name === 'ValidationError') {
      statusCode = 400;
      message = err.message;
    } else if (err.name === 'UnauthorizedError') {
      statusCode = 401;
      message = 'Unauthorized';
    } else if (err.name === 'ForbiddenError') {
      statusCode = 403;
      message = 'Forbidden';
    } else if (err.name === 'NotFoundError') {
      statusCode = 404;
      message = 'Resource Not Found';
    }

    // Send error response
    res.status(statusCode).json({
      error: {
        message,
        status: statusCode
      }
    });
  };

  module.exports = errorHandler;
