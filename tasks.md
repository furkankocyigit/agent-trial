# Tasks

---
## TASK-001: Create Greeting domain entity
**Epic:** EPIC-001
**Layer:** domain
**Estimate:** S (< 2h)

**What to build:**
Create a pure domain entity that encapsulates the "Hello World" greeting logic. This should be a simple value object or entity with no external dependencies.

**Interface / contract:**
```javascript
// src/domain/greeting/Greeting.js
export class Greeting {
  constructor(message)
  getMessage()
}

// Factory function
export function createGreeting(message)
```

**Acceptance criteria:**
- [ ] Greeting entity exists in src/domain/greeting/
- [ ] Entity has no imports from other layers or frameworks
- [ ] Unit tests exist for Greeting entity
- [ ] Tests verify greeting message can be created and retrieved

**Dependencies:** none

---
## TASK-002: Create GetGreeting use case
**Epic:** EPIC-001
**Layer:** application
**Estimate:** S (< 2h)

**What to build:**
Create an application use case that orchestrates the domain logic to return a greeting. This encapsulates the business flow for getting a "Hello World" message.

**Interface / contract:**
```javascript
// src/application/use-cases/GetGreeting.js
export class GetGreeting {
  execute()
}
```

**Acceptance criteria:**
- [ ] GetGreeting use case exists in src/application/use-cases/
- [ ] Use case imports only from domain layer
- [ ] Unit tests exist for GetGreeting use case
- [ ] Tests verify use case returns expected greeting

**Dependencies:** TASK-001

---
## TASK-003: Setup Express infrastructure
**Epic:** EPIC-001
**Layer:** infrastructure
**Estimate:** M (2-4h)

**What to build:**
Setup Express server with ESM support, middleware configuration, and error handling. This provides the HTTP server infrastructure.

**Interface / contract:**
```javascript
// src/infrastructure/http/server.js
export function createServer(config)
export function startServer(server, port)

// src/infrastructure/http/express-app.js
export function createExpressApp()
```

**Acceptance criteria:**
- [ ] Express app factory exists in src/infrastructure/http/
- [ ] Server can start and listen on configurable port
- [ ] JSON middleware configured
- [ ] Error handling middleware exists
- [ ] ESM (type: module) properly configured in package.json

**Dependencies:** none

---
## TASK-004: Create /hello route handler
**Epic:** EPIC-001
**Layer:** presentation
**Estimate:** S (< 2h)

**What to build:**
Create the presentation layer route handler for GET /hello that maps HTTP request/response to the use case.

**Interface / contract:**
```javascript
// src/presentation/routes/hello-routes.js
export function createHelloRoutes(dependencies)

// Route handler
GET /hello -> 200 { message: "Hello World" }
```

**Acceptance criteria:**
- [ ] Route handler exists in src/presentation/routes/
- [ ] Handler calls GetGreeting use case
- [ ] Handler returns JSON response with greeting message
- [ ] Integration test verifies GET /hello returns 200 with expected payload

**Dependencies:** TASK-002, TASK-003

---
## TASK-005: Wire up application entry point
**Epic:** EPIC-001
**Layer:** infrastructure
**Estimate:** S (< 2h)

**What to build:**
Create the main application entry point that wires all layers together with dependency injection and starts the server.

**Interface / contract:**
```javascript
// src/index.js
// Main entry point that:
// 1. Creates use case instances
// 2. Injects dependencies into routes
// 3. Registers routes with Express app
// 4. Starts server
```

**Acceptance criteria:**
- [ ] Entry point exists at src/index.js
- [ ] Dependencies properly injected from outer to inner layers
- [ ] Server starts successfully on port 3000 (or env PORT)
- [ ] Manual smoke test: curl localhost:3000/hello returns Hello World
- [ ] All tests pass (npm test)

**Dependencies:** TASK-004

---
