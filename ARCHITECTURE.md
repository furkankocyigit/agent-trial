# Agent Architecture Explained

## Skills vs Agents

### Skills (`.claude/skills/`)
**What**: User-facing commands  
**Format**: `/pm`, `/architect EPIC-002`, `/dev TASK-005`  
**Job**: Parse arguments and spawn agents

**Example**: When you type `/architect EPIC-002`:
```
1. Skill parses "EPIC-002" from args
2. Skill spawns architect agent
3. Passes "Plan EPIC-002" to agent
```

---

### Agents (`.claude/agents/`)
**What**: The actual workers  
**Have**: 
- Color & icon (visual identity)
- Permissions (what they can do)
- Instructions (how to do it)

**Example**: Architect agent:
```yaml
color: purple
icon: 🏗️
permissions:
  - read: "**/*"
  - write: "tasks.md"
  - agent: "developer"  # Can spawn developer
```

---

## How They Work Together

```
You type: /architect EPIC-002
         ↓
    Skill parses args
         ↓
    Spawns Architect agent
         ↓
   🏗️ Architect (purple) runs
         ↓
   Reads epics.md, finds EPIC-002
         ↓
   Creates tasks (TASK-005, TASK-006, TASK-007)
         ↓
   Spawns Developer agent for TASK-005
         ↓
   💻 Developer (green) runs
         ↓
   Implements code, opens PR #3
         ↓
   Spawns Reviewer agent
         ↓
   🔍 Reviewer (red) runs
         ↓
   Reviews PR #3
```

---

## Dynamic Values

### Sprint 1
```
/pm → creates EPIC-001, EPIC-002
/architect EPIC-001 → creates TASK-001, TASK-002, TASK-003
/architect EPIC-002 → creates TASK-004, TASK-005
```

### Sprint 2 (same repo)
```
/pm → creates EPIC-003, EPIC-004  (continues numbering!)
/architect EPIC-003 → creates TASK-006, TASK-007, TASK-008
```

**Key**: Agents check existing files and continue numbering automatically.

---

## File State Across Sprints

```
epics.md:
  Sprint 1: EPIC-001, EPIC-002
  Sprint 2: EPIC-001, EPIC-002, EPIC-003, EPIC-004  ← Appended!

tasks.md:
  Sprint 1: TASK-001 to TASK-005
  Sprint 2: TASK-001 to TASK-010  ← Keeps growing!
```

---

## Why This Design?

✅ **Skills = Simple** - Just spawn agents  
✅ **Agents = Smart** - Auto-increment numbers, check existing files  
✅ **Colors = Visual** - See which agent is running  
✅ **Permissions = No prompts** - Pre-approved actions  
✅ **Auto-chain = Agentic** - Agents spawn other agents  

---

## Commands Summary

| Command | Agent | Color | Does |
|---------|-------|-------|------|
| `/pm` | PM | 📋 Blue | Ask questions → create epics |
| `/architect EPIC-X` | Architect | 🏗️ Purple | Plan epic → spawn developer |
| `/dev TASK-X` | Developer | 💻 Green | Code task → spawn reviewer |
| `/review N` | Reviewer | 🔍 Red | Review PR #N |

Only `/pm` and `/architect` needed normally - rest auto-chains!
