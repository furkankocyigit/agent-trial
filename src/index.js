/**
 * Application Entry Point
 * Wires all layers together with dependency injection and starts the server
 */
import { GetGreeting } from './application/use-cases/GetGreeting.js';
import { createExpressApp } from './infrastructure/http/express-app.js';
import { createServer, startServer } from './infrastructure/http/server.js';
import { createHelloRoutes } from './presentation/routes/hello-routes.js';
import { Router } from 'express';

/**
 * Main application bootstrap function
 */
async function main() {
  // 1. Create use case instances (application layer)
  const getGreeting = new GetGreeting();

  // 2. Inject dependencies into routes (presentation layer)
  const helloRoutesSetup = createHelloRoutes({ getGreeting });

  // 3. Create Express app (infrastructure layer)
  const app = createExpressApp();

  // 4. Register routes with the app
  const router = Router();
  helloRoutesSetup(router);
  app.use(router);

  // 5. Create and start server
  const port = process.env.PORT || 3000;
  const server = createServer(app);
  await startServer(server, port);

  // Handle graceful shutdown
  process.on('SIGTERM', () => {
    console.log('SIGTERM received, shutting down gracefully...');
    server.close(() => {
      console.log('Server closed');
      process.exit(0);
    });
  });

  process.on('SIGINT', () => {
    console.log('SIGINT received, shutting down gracefully...');
    server.close(() => {
      console.log('Server closed');
      process.exit(0);
    });
  });
}

// Start the application
main().catch((error) => {
  console.error('Failed to start application:', error);
  process.exit(1);
});
