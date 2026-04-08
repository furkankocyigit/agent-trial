/**
 * GetGreeting Use Case
 * Application layer - orchestrates domain logic
 * Only imports from domain layer
 */
import { createGreeting } from '../../domain/greeting/Greeting.js';

export class GetGreeting {
  /**
   * Execute the use case to get a greeting message
   * @returns {string} The greeting message
   */
  execute() {
    const greeting = createGreeting('Hello World');
    return greeting.getMessage();
  }
}
