/**
 * Hello Routes
 * Presentation layer - maps HTTP request/response to use case
 * Handles GET /hello endpoint
 */

/**
 * Creates hello route handlers with dependency injection
 * @param {Object} dependencies - Injected dependencies
 * @param {Object} dependencies.getGreeting - GetGreeting use case instance
 * @returns {Function} Express router setup function
 */
export function createHelloRoutes(dependencies) {
  const { getGreeting } = dependencies;

  return (router) => {
    /**
     * GET /hello
     * Returns a greeting message from the use case
     */
    router.get('/hello', (req, res) => {
      try {
        const message = getGreeting.execute();
        res.status(200).json({ message });
      } catch (error) {
        res.status(500).json({
          error: {
            message: 'Failed to get greeting',
            status: 500
          }
        });
      }
    });
  };
}
