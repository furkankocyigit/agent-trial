/**
 * Unit tests for GetGreeting use case
 */
import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import { GetGreeting } from './GetGreeting.js';

describe('GetGreeting Use Case', () => {
  describe('execute', () => {
    it('should return "Hello World" message', () => {
      const useCase = new GetGreeting();
      const result = useCase.execute();

      assert.strictEqual(result, 'Hello World');
    });

    it('should return a string', () => {
      const useCase = new GetGreeting();
      const result = useCase.execute();

      assert.strictEqual(typeof result, 'string');
    });

    it('should be callable multiple times with consistent results', () => {
      const useCase = new GetGreeting();
      const result1 = useCase.execute();
      const result2 = useCase.execute();

      assert.strictEqual(result1, result2);
    });

    it('should create a new use case instance each time', () => {
      const useCase1 = new GetGreeting();
      const useCase2 = new GetGreeting();

      assert.notStrictEqual(useCase1, useCase2);
      assert.strictEqual(useCase1.execute(), useCase2.execute());
    });
  });
});
