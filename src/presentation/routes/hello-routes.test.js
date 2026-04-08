/**
 * Integration tests for hello routes
 */
import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import express from 'express';
import { createHelloRoutes } from './hello-routes.js';
import { GetGreeting } from '../../application/use-cases/GetGreeting.js';

/**
 * Helper to make requests to a test Express app
 * @param {express.Application} app - Express app instance
 * @param {string} path - Request path
 * @returns {Promise<{status: number, body: Object}>}
 */
async function request(app, path) {
  return new Promise((resolve, reject) => {
    const server = app.listen(0, () => {
      const port = server.address().port;
      const url = `http://localhost:${port}${path}`;

      fetch(url)
        .then(async (res) => {
          const body = await res.json();
          server.close();
          resolve({ status: res.status, body });
        })
        .catch((err) => {
          server.close();
          reject(err);
        });
    });
  });
}

describe('Hello Routes', () => {
  describe('GET /hello', () => {
    it('should return 200 status code', async () => {
      const app = express();
      const router = express.Router();
      const getGreeting = new GetGreeting();

      const setupRoutes = createHelloRoutes({ getGreeting });
      setupRoutes(router);
      app.use(router);

      const response = await request(app, '/hello');
      assert.strictEqual(response.status, 200);
    });

    it('should return JSON with message property', async () => {
      const app = express();
      const router = express.Router();
      const getGreeting = new GetGreeting();

      const setupRoutes = createHelloRoutes({ getGreeting });
      setupRoutes(router);
      app.use(router);

      const response = await request(app, '/hello');
      assert.ok(response.body.message);
      assert.strictEqual(typeof response.body.message, 'string');
    });

    it('should return "Hello World" message from use case', async () => {
      const app = express();
      const router = express.Router();
      const getGreeting = new GetGreeting();

      const setupRoutes = createHelloRoutes({ getGreeting });
      setupRoutes(router);
      app.use(router);

      const response = await request(app, '/hello');
      assert.strictEqual(response.body.message, 'Hello World');
    });

    it('should call the injected GetGreeting use case', async () => {
      const app = express();
      const router = express.Router();

      let executeCalled = false;
      const mockGetGreeting = {
        execute: () => {
          executeCalled = true;
          return 'Test Message';
        }
      };

      const setupRoutes = createHelloRoutes({ getGreeting: mockGetGreeting });
      setupRoutes(router);
      app.use(router);

      const response = await request(app, '/hello');
      assert.strictEqual(executeCalled, true);
      assert.strictEqual(response.body.message, 'Test Message');
    });

    it('should handle errors from use case gracefully', async () => {
      const app = express();
      const router = express.Router();

      const mockGetGreeting = {
        execute: () => {
          throw new Error('Use case error');
        }
      };

      const setupRoutes = createHelloRoutes({ getGreeting: mockGetGreeting });
      setupRoutes(router);
      app.use(router);

      const response = await request(app, '/hello');
      assert.strictEqual(response.status, 500);
      assert.ok(response.body.error);
      assert.strictEqual(response.body.error.message, 'Failed to get greeting');
    });
  });

  describe('createHelloRoutes', () => {
    it('should return a function that accepts a router', () => {
      const getGreeting = new GetGreeting();
      const setupRoutes = createHelloRoutes({ getGreeting });

      assert.strictEqual(typeof setupRoutes, 'function');
    });

    it('should accept dependencies object with getGreeting', () => {
      const getGreeting = new GetGreeting();
      const dependencies = { getGreeting };

      assert.doesNotThrow(() => {
        createHelloRoutes(dependencies);
      });
    });
  });
});
