# Implementation Tasks

---
## TASK-001: Create Domain Entity and Greeting Logic
**Epic:** EPIC-001
**Layer:** domain
**Estimate:** S (< 2h)

**What to build:**
Implement the core greeting entity and business logic in the domain layer. This includes a pure function that generates a greeting message with timestamp, adhering to Clean Architecture principles with zero framework dependencies.

**Interface / contract:**
```javascript
// src/domain/greeting.js

/**
 * Create a greeting with timestamp
 * @returns {{ message: string, timestamp: string }}
 */
export function createGreeting() {
  // Returns greeting object with message and ISO timestamp
}
```

**Acceptance criteria:**
- [ ] Pure function with no external dependencies
- [ ] Returns object with message and timestamp fields
- [ ] Timestamp in ISO 8601 format
- [ ] Unit tests cover the greeting creation logic
- [ ] No imports from Express or other frameworks

**Dependencies:** none

---
## TASK-002: Create Application Use Case
**Epic:** EPIC-001
**Layer:** application
**Estimate:** S (< 2h)

**What to build:**
Create the use case that orchestrates the greeting domain logic. This layer coordinates domain operations and provides the interface for the presentation layer to invoke.

**Interface / contract:**
```javascript
// src/application/useCases/getGreeting.js

/**
 * Use case: Get greeting
 * @returns {Promise<{ message: string, timestamp: string }>}
 */
export async function getGreeting() {
  // Orchestrates domain logic
}
```

**Acceptance criteria:**
- [ ] Use case function calls domain layer
- [ ] Returns promise with greeting data
- [ ] Unit tests verify use case behavior
- [ ] No HTTP/Express-specific code

**Dependencies:** TASK-001

---
## TASK-003: Setup Express Server Infrastructure
**Epic:** EPIC-001
**Layer:** infrastructure
**Estimate:** M (2-4h)

**What to build:**
Configure Express server with proper ESM setup, including server initialization, port configuration, and npm scripts. This is the infrastructure foundation that the presentation layer will build upon.

**Interface / contract:**
```javascript
// src/infrastructure/server.js

/**
 * Create and configure Express app
 * @returns {Express.Application}
 */
export function createApp() {
  // Returns configured Express app
}

/**
 * Start server on specified port
 * @param {Express.Application} app
 * @param {number} port
 */
export function startServer(app, port = 3000) {
  // Starts server and returns server instance
}
```

**Acceptance criteria:**
- [ ] Express server with ESM imports
- [ ] Configurable port (default 3000)
- [ ] package.json with start script
- [ ] Server starts successfully
- [ ] Basic error handling for server startup

**Dependencies:** none

---
## TASK-004: Create Hello Endpoint Presentation Layer
**Epic:** EPIC-001
**Layer:** presentation
**Estimate:** S (< 2h)

**What to build:**
Implement the /hello route handler that maps HTTP requests to the application use case and transforms the response to JSON format.

**Interface / contract:**
```javascript
// src/presentation/routes/hello.js

/**
 * Register hello routes on Express app
 * @param {Express.Application} app
 */
export function registerHelloRoutes(app) {
  // Registers GET /hello route
}
```

**Acceptance criteria:**
- [ ] GET /hello endpoint registered
- [ ] Route handler calls getGreeting use case
- [ ] Returns JSON with message and timestamp
- [ ] Proper HTTP status codes
- [ ] Route integrated into main server

**Dependencies:** TASK-002, TASK-003

---
## TASK-005: Project Setup and Integration
**Epic:** EPIC-001
**Layer:** infrastructure
**Estimate:** M (2-4h)

**What to build:**
Complete project initialization with package.json, ESM configuration, test framework setup, and integration of all layers. Create main entry point that wires everything together.

**Interface / contract:**
```javascript
// src/index.js
// Main entry point that imports and starts the server
```

**Acceptance criteria:**
- [ ] package.json with dependencies (Express, test framework)
- [ ] ESM configuration in package.json ("type": "module")
- [ ] Test script in package.json
- [ ] All layers integrated in main entry point
- [ ] Server starts with npm start
- [ ] Tests run with npm test
- [ ] README with setup and run instructions

**Dependencies:** TASK-004

---
