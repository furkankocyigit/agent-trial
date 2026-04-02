# Best Practices for Agentic Workflows

## ✅ The Right Way (What You Have Now)

### Architecture Pattern: Orchestrator + Specialists

```
User
  ↓
🎯 Orchestrator (Coordinator)
  ↓
  ├─→ 📋 PM (Specialist)
  ├─→ 🏗️ Architect (Specialist)
  ├─→ 💻 Developer (Specialist)
  └─→ 🔍 Reviewer (Specialist)
```

**Why this is correct:**
- ✅ User talks to ONE agent (orchestrator)
- ✅ Orchestrator manages workflow
- ✅ Specialists focus on their domain
- ✅ Sequential execution (one agent at a time)
- ✅ Orchestrator handles errors and state

---

## ❌ The Wrong Way (What You Had Before)

### Anti-Pattern: User as Orchestrator

```
User
  ├─→ 📋 PM
  ├─→ 🏗️ Architect
  ├─→ 💻 Developer
  └─→ 🔍 Reviewer
```

**Why this is wrong:**
- ❌ User must manually trigger each agent
- ❌ User must track state (EPIC-IDs, TASK-IDs, PR numbers)
- ❌ User must handle errors
- ❌ Not autonomous - requires human intervention
- ❌ Doesn't scale (imagine 10 steps!)

---

## Industry Best Practices

### 1. Single Entry Point
```bash
# Good ✅
/build

# Bad ❌
/pm
/architect EPIC-001
/dev TASK-001
/review 1
```

User should have ONE command that does everything.

---

### 2. Coordinator Pattern
The orchestrator agent should:
- Accept high-level goals from user
- Break down into steps
- Spawn specialist agents sequentially
- Handle inter-agent communication
- Report progress
- Handle errors

---

### 3. Specialist Agents
Each specialist should:
- Do ONE thing well
- Have clear inputs and outputs
- Not know about other agents
- Be reusable in different workflows

Example:
- ✅ PM agent only creates epics (doesn't know about tasks or PRs)
- ✅ Developer only writes code (doesn't know about review criteria)

---

### 4. Sequential vs Parallel

**Sequential** (what you have):
```
PM → Architect → Developer → Reviewer
```
Each waits for previous to complete. Good for dependencies.

**Parallel** (future enhancement):
```
       ┌─→ Developer (TASK-001)
       ├─→ Developer (TASK-002)
       └─→ Developer (TASK-003)
```
Multiple agents run simultaneously. Good for independent tasks.

---

### 5. State Management

Orchestrator tracks:
- Current step in workflow
- IDs (EPIC-XXX, TASK-XXX, PR numbers)
- Outputs from each agent
- Errors and retries

Specialists don't need to track global state.

---

## Real-World Examples

### GitHub Actions (Similar Pattern)
```yaml
workflow:  # Orchestrator
  - job: build    # Specialist
  - job: test     # Specialist
  - job: deploy   # Specialist
```

### Kubernetes Controllers
```
Controller (Orchestrator)
  → Creates Pods (Specialists)
  → Monitors health
  → Scales up/down
```

### Your Project
```
/build (Orchestrator)
  → PM (Create epics)
  → Architect (Plan tasks)
  → Developer (Write code)
  → Reviewer (Review code)
```

---

## How to Extend

### Adding a New Step

Want to add a "Tester" agent that runs tests after Developer?

**Good ✅**: Update Orchestrator
```
Orchestrator flow:
  PM → Architect → Developer → Tester → Reviewer
```

**Bad ❌**: Make Developer spawn Tester
```
Developer → spawn Tester → spawn Reviewer
```
This creates tight coupling.

---

### Adding Parallel Execution

Want to implement multiple tasks in parallel?

**Good ✅**: Orchestrator spawns multiple Developers
```python
tasks = ["TASK-001", "TASK-002", "TASK-003"]
for task in tasks:
    spawn_developer(task)  # Parallel
wait_all()
spawn_reviewer()
```

**Bad ❌**: User spawns multiple terminals
```bash
# Terminal 1
/dev TASK-001

# Terminal 2
/dev TASK-002

# Terminal 3
/dev TASK-003
```

---

## Summary

✅ **DO**:
- Use orchestrator pattern
- One entry point for user
- Specialists do one thing
- Orchestrator manages state and flow

❌ **DON'T**:
- Make user the orchestrator
- Chain agents without coordinator
- Mix concerns in agents
- Require manual intervention

---

Your project now follows industry best practices! 🎯
