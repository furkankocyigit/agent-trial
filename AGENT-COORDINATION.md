# How Agents Work Together in Harmony

## The Problem You Encountered

❌ **Agents can't spawn each other directly**
```
PM agent → tries to spawn Architect agent → FAILS
```

❌ **Skills can't coordinate**
```
/build skill → /pm skill → /architect skill → HANGS
```

---

## The Solution: Orchestrator Pattern with Context Passing

✅ **One orchestrator coordinates multiple specialists**
```
/build skill
  ↓
Orchestrates via Agent tool:
  1. Spawn PM agent → wait → get EPIC-ID
  2. Spawn Architect agent with EPIC-ID → wait → get TASK-IDs
  3. Spawn Developer agent with TASK-ID → wait → get PR number
  4. Spawn Reviewer agent with PR number → wait → done
```

---

## How It Works: Step by Step

### Step 1: User Invokes Orchestrator
```bash
/build "Hello World API"
```

The `/build` skill acts as the orchestrator.

---

### Step 2: Orchestrator Spawns PM Agent
```python
# Orchestrator's code (conceptual)
pm_result = Agent(
    description="PM creates epic",
    prompt="You are PM. Create epic for: Hello World API"
)
# pm_result = "Created EPIC-001"
epic_id = parse(pm_result)  # Extract "EPIC-001"
```

**Key**: Orchestrator **waits** for PM to finish and captures output.

---

### Step 3: Orchestrator Spawns Architect (with context)
```python
architect_result = Agent(
    description="Architect plans epic",
    prompt=f"You are Architect. Plan {epic_id} from epics.md"
)
# architect_result = "Created TASK-001, TASK-002, TASK-003"
task_ids = parse(architect_result)  # Extract ["TASK-001", "TASK-002", "TASK-003"]
first_task = task_ids[0]
```

**Key**: Architect receives `epic_id` from PM's output.

---

### Step 4: Orchestrator Spawns Developer (with context)
```python
dev_result = Agent(
    description="Developer implements task",
    prompt=f"You are Developer. Implement {first_task} from tasks.md"
)
# dev_result = "Opened PR #1"
pr_number = parse(dev_result)  # Extract "1"
```

**Key**: Developer receives `first_task` from Architect's output.

---

### Step 5: Orchestrator Spawns Reviewer (with context)
```python
review_result = Agent(
    description="Reviewer reviews PR",
    prompt=f"You are Reviewer. Review PR #{pr_number}"
)
# review_result = "Approved PR #1"
```

**Key**: Reviewer receives `pr_number` from Developer's output.

---

### Step 6: Orchestrator Reports
```
✅ Complete!
   Epic: EPIC-001
   Tasks: TASK-001, TASK-002, TASK-003
   PR: #1 (Approved)
   Next: Merge on GitHub
```

---

## The Key Principles

### 1. **Sequential Execution**
One agent finishes before next starts. No parallel confusion.

### 2. **Context Passing**
Each agent receives relevant info from previous agent:
```
PM output → Architect input
Architect output → Developer input
Developer output → Reviewer input
```

### 3. **Single Coordinator**
The `/build` skill coordinates everything. Agents don't coordinate with each other.

### 4. **Wait for Completion**
Orchestrator waits for each agent to finish before spawning next.

---

## Why This Works

### ✅ Clear Responsibility
- **Orchestrator**: Manages workflow, passes context
- **PM**: Creates epics only
- **Architect**: Plans tasks only
- **Developer**: Writes code only
- **Reviewer**: Reviews code only

### ✅ No Inter-Agent Dependencies
Agents don't know about each other. They only know:
- Their input (from orchestrator)
- Their job (their specialty)
- Their output (return to orchestrator)

### ✅ Fault Tolerance
If any agent fails, orchestrator handles it:
```python
try:
    pm_result = spawn_pm()
    architect_result = spawn_architect(pm_result)
    # ...
except AgentError as e:
    report_to_user(f"Failed at {e.step}: {e.message}")
```

---

## Real-World Analogy

Think of a restaurant:

❌ **Bad** (Agents spawn each other):
```
Waiter → tells Chef to cook
Chef → tells Waiter to serve
Waiter → tells Manager to close bill
```
Everyone is coordinating with everyone. Chaos!

✅ **Good** (Orchestrator coordinates):
```
Manager (orchestrator):
  1. Tells Waiter: take order
  2. Tells Chef: cook order #123
  3. Tells Waiter: serve order #123
  4. Tells Cashier: close bill #123
```
One manager coordinates specialists. Harmony!

---

## Your Project Structure

```
User
  ↓
/build skill (Orchestrator)
  ↓
  ├─ Agent tool → PM agent
  │   └─ Returns: "EPIC-001"
  │
  ├─ Agent tool → Architect agent (with EPIC-001)
  │   └─ Returns: "TASK-001, TASK-002, TASK-003"
  │
  ├─ Agent tool → Developer agent (with TASK-001)
  │   └─ Returns: "PR #1"
  │
  └─ Agent tool → Reviewer agent (with PR #1)
      └─ Returns: "Approved"
```

---

## Try It Now

Restart Claude Code:
```bash
claude
```

Run:
```
/build "Hello World API with JSON response"
```

Watch agents work in harmony:
1. 📋 PM creates epic
2. 🏗️ Architect plans tasks
3. 💻 Developer writes code
4. 🔍 Reviewer approves

One command, multiple specialists, perfect coordination! 🎯
