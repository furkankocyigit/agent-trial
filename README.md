# Agent Trial - True Agentic Workflow

🤖 **Real custom agents with auto-chaining, colors, and permissions**

## Project Structure

```
.claude/
├── agents/              ← Custom agent definitions
│   ├── pm/             📋 Blue - Product Manager
│   ├── architect/      🏗️  Purple - Software Architect  
│   ├── developer/      💻 Green - Software Developer
│   └── reviewer/       🔍 Red - Code Reviewer
└── skills/             ← Commands to invoke agents
    ├── pm/            → /pm
    ├── architect/     → /architect EPIC-001
    ├── dev/           → /dev TASK-001
    └── review/        → /review 1
```

Each agent has:
- ✅ Custom color & icon
- ✅ Specific permissions (no constant prompts!)
- ✅ Auto-chaining capability

---

## The Workflow

### Step 1: Create Epics
```bash
claude
```

```
/pm
```

📋 **PM agent** (blue) spawns, asks what you want, creates `epics.md`

---

### Step 2: Plan & Auto-Execute
```
/architect EPIC-001
```

**Auto-chain happens:**
1. 🏗️  **Architect** (purple) creates `tasks.md`
2. 🏗️  Architect spawns 💻 **Developer** (green)
3. 💻 Developer implements TASK-001, opens PR
4. 💻 Developer spawns 🔍 **Reviewer** (red)
5. 🔍 Reviewer reviews PR

You see each agent by color!

---

### Step 3: Merge
```bash
gh pr list
# Go to GitHub and merge
```

---

## Manual Override

```
/dev TASK-002      # Manually run developer
/review 1          # Manually run reviewer
```

---

## Example Session - Sprint 1

```bash
$ claude

> /pm
📋 PM: What feature do you want?
> Hello World API
📋 PM: Created EPIC-001 in epics.md ✓

> /architect EPIC-001
🏗️  Architect: Planning EPIC-001...
🏗️  Architect: Created TASK-001, TASK-002, TASK-003 in tasks.md ✓
🏗️  Architect: Spawning developer for TASK-001...
💻 Developer: Implementing TASK-001...
💻 Developer: Created branch task/TASK-001-greeting-domain
💻 Developer: Pushed + opened PR #1
💻 Developer: Spawning reviewer...
🔍 Reviewer: Reviewing PR #1...
🔍 Reviewer: ✅ Approved!

Done! Merge PR #1, then run /dev TASK-002 for next task.
```

## Example - Sprint 2 (Same Repo)

```bash
$ claude

> /pm
📋 PM: What feature do you want?
> User authentication
📋 PM: Found existing epics, adding EPIC-002 ✓

> /architect EPIC-002
🏗️  Architect: Planning EPIC-002...
🏗️  Architect: Created TASK-004, TASK-005 in tasks.md ✓
🏗️  Architect: Spawning developer for TASK-004...
💻 Developer: Implementing TASK-004...
```

**Key**: Numbers auto-increment across sprints!

---

## Features

✅ **Custom agents** in `.claude/agents/` with permissions  
✅ **No permission prompts** - agents have bash access pre-approved  
✅ **Color-coded** - easy to see which agent is running  
✅ **Auto-chaining** - agents spawn other agents automatically  
✅ **Skills** - simple `/pm`, `/architect` commands  

---

## Try It Now

```bash
cd /Users/furkan.kocyigit/Projects/personal/agent-trial
claude
```

Then:
```
/pm
```

Watch the agentic magic! 🚀
