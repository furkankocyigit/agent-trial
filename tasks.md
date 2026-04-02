# Implementation Tasks

---
## TASK-001: Create domain model for greeting
**Epic:** EPIC-001
**Layer:** domain
**Estimate:** S (< 2h)

**What to build:**
Create a pure domain model representing a greeting. This should include the business logic for generating a greeting message with a timestamp, with no framework dependencies.

**Interface / contract:**
```javascript
// src/domain/models/greeting.js
export class Greeting {
  constructor(message, timestamp)
  getMessage()
  getTimestamp()
}

// src/domain/services/greeting-service.js
export class GreetingService {
  createGreeting() // returns Greeting
}
```

**Acceptance criteria:**
- [ ] Greeting model class created in src/domain/models/
- [ ] GreetingService class created in src/domain/services/
- [ ] Zero imports from Express or any framework
- [ ] Unit tests cover greeting creation logic
- [ ] Tests verify message and timestamp properties

**Dependencies:** none

---
## TASK-002: Create use case for hello endpoint
**Epic:** EPIC-001
**Layer:** application
**Estimate:** S (< 2h)

**What to build:**
Create a use case that orchestrates the greeting creation. This encapsulates the application logic for the hello endpoint, using the domain service.

**Interface / contract:**
```javascript
// src/application/use-cases/get-hello-use-case.js
export class GetHelloUseCase {
  constructor(greetingService)
  execute() // returns { message: string, timestamp: string }
}
```

**Acceptance criteria:**
- [ ] GetHelloUseCase class created in src/application/use-cases/
- [ ] Uses GreetingService from domain layer
- [ ] Returns plain object with message and timestamp
- [ ] Unit tests verify use case orchestration
- [ ] No framework imports (Express, etc.)

**Dependencies:** TASK-001

---
## TASK-003: Setup Express server infrastructure
**Epic:** EPIC-001
**Layer:** infrastructure
**Estimate:** M (2-4h)

**What to build:**
Setup the Express server infrastructure including server initialization, configuration, and middleware. This includes package.json setup with ESM configuration and npm scripts.

**Interface / contract:**
```javascript
// src/infrastructure/server/express-app.js
export function createApp() // returns Express app instance

// src/infrastructure/server/server.js
export function startServer(app, port) // starts HTTP server
```

**Acceptance criteria:**
- [ ] package.json configured with "type": "module" for ESM
- [ ] Express dependency added
- [ ] Server setup in src/infrastructure/server/
- [ ] Configurable port with default 3000
- [ ] npm start script to launch server
- [ ] Server starts without errors
- [ ] Basic error handling for port conflicts

**Dependencies:** none

---
## TASK-004: Create presentation layer route handler
**Epic:** EPIC-001
**Layer:** presentation
**Estimate:** S (< 2h)

**What to build:**
Create the route handler that maps the HTTP GET /hello request to the use case and formats the JSON response.

**Interface / contract:**
```javascript
// src/presentation/routes/hello-routes.js
export function registerHelloRoutes(app, getHelloUseCase)

// src/presentation/controllers/hello-controller.js
export class HelloController {
  constructor(getHelloUseCase)
  async handleGetHello(req, res)
}
```

**Acceptance criteria:**
- [ ] HelloController created in src/presentation/controllers/
- [ ] Route registration function in src/presentation/routes/
- [ ] GET /hello endpoint returns JSON with message and timestamp
- [ ] Proper HTTP status code (200)
- [ ] Controller uses GetHelloUseCase
- [ ] Clean separation: no business logic in controller

**Dependencies:** TASK-002, TASK-003

---
## TASK-005: Wire up dependency injection and entry point
**Epic:** EPIC-001
**Layer:** infrastructure
**Estimate:** S (< 2h)

**What to build:**
Create the main entry point that wires together all layers using dependency injection. This composition root assembles domain services, use cases, controllers, and starts the server.

**Interface / contract:**
```javascript
// src/main.js
// Entry point that:
// 1. Creates domain services
// 2. Creates use cases with injected services
// 3. Creates controllers with injected use cases
// 4. Registers routes
// 5. Starts server
```

**Acceptance criteria:**
- [ ] src/main.js entry point created
- [ ] All dependencies manually wired (no DI container needed for this simple case)
- [ ] Server starts and responds to GET /hello
- [ ] Response includes both message and timestamp fields
- [ ] npm start launches the complete application
- [ ] Manual smoke test: curl localhost:3000/hello returns valid JSON

**Dependencies:** TASK-004

---
