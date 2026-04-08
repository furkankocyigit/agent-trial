import { test } from 'node:test';
import assert from 'node:assert';
import { Greeting, createGreeting } from './Greeting.js';

test('Greeting entity', async (t) => {
  await t.test('constructor creates greeting with valid message', () => {
    const greeting = new Greeting('Hello World');
    assert.strictEqual(greeting.getMessage(), 'Hello World');
  });

  await t.test('constructor throws error for empty message', () => {
    assert.throws(
      () => new Greeting(''),
      { message: 'Message must be a non-empty string' }
    );
  });

  await t.test('constructor throws error for null message', () => {
    assert.throws(
      () => new Greeting(null),
      { message: 'Message must be a non-empty string' }
    );
  });

  await t.test('constructor throws error for undefined message', () => {
    assert.throws(
      () => new Greeting(undefined),
      { message: 'Message must be a non-empty string' }
    );
  });

  await t.test('constructor throws error for non-string message', () => {
    assert.throws(
      () => new Greeting(123),
      { message: 'Message must be a non-empty string' }
    );
  });

  await t.test('getMessage returns the greeting message', () => {
    const greeting = new Greeting('Test Message');
    assert.strictEqual(greeting.getMessage(), 'Test Message');
  });

  await t.test('message is immutable', () => {
    const greeting = new Greeting('Original Message');
    const message = greeting.getMessage();
    assert.strictEqual(message, 'Original Message');

    // Attempting to modify the returned message should not affect the entity
    assert.strictEqual(greeting.getMessage(), 'Original Message');
  });
});

test('createGreeting factory function', async (t) => {
  await t.test('creates a Greeting instance', () => {
    const greeting = createGreeting('Factory Test');
    assert.ok(greeting instanceof Greeting);
    assert.strictEqual(greeting.getMessage(), 'Factory Test');
  });

  await t.test('throws error for invalid message', () => {
    assert.throws(
      () => createGreeting(''),
      { message: 'Message must be a non-empty string' }
    );
  });
});
