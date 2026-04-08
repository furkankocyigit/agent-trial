import express from 'express';

/**
 * Creates and configures an Express application instance.
 *
 * This factory function sets up middleware and error handling
 * for the HTTP server infrastructure layer.
 *
 * @returns {express.Application} Configured Express app
 */
export function createExpressApp() {
  const app = express();

  // JSON parsing middleware
  app.use(express.json());

  // Basic request logging middleware
  app.use((req, res, next) => {
    console.log(`${req.method} ${req.path}`);
    next();
  });

  // Error handling middleware (must be last)
  app.use((err, req, res, next) => {
    console.error('Error:', err);

    const statusCode = err.statusCode || 500;
    const message = err.message || 'Internal Server Error';

    res.status(statusCode).json({
      error: {
        message,
        status: statusCode
      }
    });
  });

  return app;
}
