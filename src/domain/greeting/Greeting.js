/**
 * Greeting Domain Entity
 * Pure business logic with no external dependencies
 */
export class Greeting {
  #message;

  constructor(message) {
    if (!message || typeof message !== 'string') {
      throw new Error('Message must be a non-empty string');
    }
    this.#message = message;
  }

  getMessage() {
    return this.#message;
  }
}

/**
 * Factory function to create a Greeting instance
 * @param {string} message - The greeting message
 * @returns {Greeting} A new Greeting instance
 */
export function createGreeting(message) {
  return new Greeting(message);
}
