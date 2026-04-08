import http from 'http';

/**
 * Creates an HTTP server instance from an Express app.
 *
 * This separates server creation from the Express app configuration,
 * allowing for better testability and control over the server lifecycle.
 *
 * @param {import('express').Application} app - Express application instance
 * @returns {http.Server} HTTP server instance
 */
export function createServer(app) {
  return http.createServer(app);
}

/**
 * Starts the HTTP server on the specified port.
 *
 * @param {http.Server} server - HTTP server instance to start
 * @param {number} port - Port number to listen on
 * @returns {Promise<http.Server>} Promise that resolves when server is listening
 */
export function startServer(server, port) {
  return new Promise((resolve, reject) => {
    server.listen(port, (err) => {
      if (err) {
        reject(err);
      } else {
        console.log(`Server listening on port ${port}`);
        resolve(server);
      }
    });
  });
}

/**
 * Stops the HTTP server gracefully.
 *
 * @param {http.Server} server - HTTP server instance to stop
 * @returns {Promise<void>} Promise that resolves when server is closed
 */
export function stopServer(server) {
  return new Promise((resolve, reject) => {
    server.close((err) => {
      if (err) {
        reject(err);
      } else {
        console.log('Server stopped');
        resolve();
      }
    });
  });
}
