# Agent Trial - True Agentic Workflow

🤖 **Real orchestrator with autonomous agent chaining**

## Quick Start

```bash
cd /Users/furkan.kocyigit/Projects/personal/agent-trial
claude
```

Then ONE command:
```
/build "Hello World API with JSON response"
```

That's it! One agent handles everything:
1. Asks what you want to build
2. Spawns 📋 PM → creates epics
3. Spawns 🏗️ Architect → creates tasks  
4. Spawns 💻 Developer → implements code, opens PR
5. Spawns 🔍 Reviewer → reviews PR

You just merge the PR when done.

---

## Architecture

```
🎯 Orchestrator (YOU ONLY TALK TO THIS)
    ↓
    Spawns → 📋 PM (Blue)
    ↓
    Spawns → 🏗️ Architect (Purple)
    ↓
    Spawns → 💻 Developer (Green)
    ↓
    Spawns → 🔍 Reviewer (Red)
```

**Best Practice**: One orchestrator coordinates specialist agents.

---

## Manual Override (Advanced)

If you want control over each step:

| Command | What | When to Use |
|---------|------|-------------|
| `/build` | Full pipeline | ⭐ **99% of the time** |
| `/pm` | Just create epics | Testing/debugging |
| `/architect EPIC-X` | Just plan epic | Already have epics |
| `/dev TASK-X` | Just implement task | Re-run failed task |
| `/review N` | Just review PR | Re-review after changes |

---

## Example Session

```bash
$ claude

> /build
🎯 Orchestrator: What feature do you want to build?

> A hello world API with JSON response

🎯 Orchestrator: Starting PM agent...
📋 PM: Created EPIC-001 ✓

🎯 Orchestrator: Starting Architect for EPIC-001...
🏗️ Architect: Created TASK-001, TASK-002, TASK-003 ✓

🎯 Orchestrator: Starting Developer for TASK-001...
💻 Developer: Implemented code, opened PR #1 ✓

🎯 Orchestrator: Starting Reviewer for PR #1...
🔍 Reviewer: ✅ Approved!

🎯 Orchestrator: ✅ Complete! 
   PR: https://github.com/you/agent-trial/pull/1
   Action: Merge when ready

> exit
```

Go to GitHub, merge PR #1. Done! 🚀

---

## Project Structure

```
.claude/
├── agents/
│   ├── orchestrator/   🎯 Coordinates everything
│   ├── pm/             📋 Creates epics
│   ├── architect/      🏗️ Plans tasks
│   ├── developer/      💻 Writes code
│   └── reviewer/       🔍 Reviews PRs
└── skills/
    ├── build/          → /build (calls orchestrator)
    ├── pm/             → /pm (manual)
    ├── architect/      → /architect (manual)
    ├── dev/            → /dev (manual)
    └── review/         → /review (manual)
```

---

## Why Orchestrator?

### ❌ Before (Wrong)
```
User → PM
User → Architect
User → Developer
User → Reviewer
```
**User is the orchestrator** ← Bad!

### ✅ After (Correct)
```
User → Orchestrator → PM → Architect → Developer → Reviewer
```
**Orchestrator is the orchestrator** ← Good!

This is the **industry best practice** for agentic workflows:
- One coordinator agent
- Multiple specialist agents
- User only talks to coordinator

---

## Try It Now

```bash
claude
```

```
/build
```

Watch the magic! 🎯→📋→🏗️→💻→🔍
