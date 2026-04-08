---
name: build
description: Orchestrate PM → Architect → Developer → Reviewer agents working in harmony
args: feature description
---

When user runs `/build "feature"`, coordinate multiple specialist agents working together.

## How agents work in harmony:

Use Agent tool to spawn specialists sequentially, passing context between them:

### Step 1: Spawn PM Agent
```
Agent tool:
- description: "PM creates epic"
- prompt: "You are the PM agent. User wants: {feature description}

Create /Users/furkan.kocyigit/Projects/personal/agent-trial/epics.md with:

---
## EPIC-001: {title}
**Goal:** {user value}
**Acceptance criteria:**
- [ ] {criterion}
**Out of scope:** {what not to include}
---

Be concise. After creating epics.md, return: 'Created EPIC-001: {title}'"
```

Wait for PM agent to complete. Parse output to get EPIC-ID.

### Step 2: Spawn Architect Agent (with PM's output)
```
Agent tool:
- description: "Architect plans epic"
- prompt: "You are the Architect agent. PM created EPIC-001.

Read /Users/furkan.kocyigit/Projects/personal/agent-trial/epics.md.

Create /Users/furkan.kocyigit/Projects/personal/agent-trial/tasks.md with 3-5 tasks:

---
## TASK-001: {title}
**Epic:** EPIC-001
**Layer:** domain
**What to build:** {description}
**Interface:**
```javascript
// interface
```
**Acceptance criteria:**
- [ ] {criterion}
**Dependencies:** none
---

Use Clean Architecture layers: domain/application/infrastructure/presentation.

After creating tasks.md, return: 'Created tasks: TASK-001, TASK-002, TASK-003'"
```

Wait for Architect. Parse output to get task IDs.

### Step 3: Spawn Developer Agent (with Architect's output)
```
Agent tool:
- description: "Developer implements task"
- prompt: "You are the Developer agent. Architect created TASK-001 in tasks.md.

Read:
- /Users/furkan.kocyigit/Projects/personal/agent-trial/CLAUDE.md (rules)
- /Users/furkan.kocyigit/Projects/personal/agent-trial/tasks.md (TASK-001 details)

Steps:
1. git add -A && git commit -m 'Add epics/tasks' (if uncommitted files)
2. git checkout -b task/TASK-001-{short-name}
3. Create code in src/{layer}/ (check task's layer)
4. Write tests (.test.js)
5. git commit -am '[TASK-001] {description}'
6. git push -u origin task/TASK-001-{short-name}
7. gh pr create --title '[TASK-001] {desc}' --body 'Implements TASK-001'

Return: 'Opened PR #{number}'"
```

Wait for Developer. Parse PR number from output.

### Step 4: Spawn Reviewer Agent (with Developer's output)
```
Agent tool:
- description: "Reviewer reviews PR"
- prompt: "You are the Reviewer agent. Developer opened PR #{number}.

Read /Users/furkan.kocyigit/Projects/personal/agent-trial/CLAUDE.md for rules.

Steps:
1. gh pr diff {number}
2. Check: Domain layer has zero framework imports?
3. Check: Tests exist for domain/application code?
4. gh pr review {number} --approve (if good) or --request-changes (if issues)

Return: 'Reviewed PR #{number}: {approved/changes-requested}'"
```

Wait for Reviewer to complete.

### Step 5: Report to User
```
Summary:
✅ PM created EPIC-001
✅ Architect created 5 tasks
✅ Developer implemented TASK-001, opened PR #{number}
✅ Reviewer {approved/requested changes}

Next: Go to GitHub and merge PR if approved
```

## Key: Sequential Coordination

Each agent:
1. Receives context from previous agent
2. Does its specialized work
3. Returns output to orchestrator
4. Orchestrator passes output to next agent

This is how agents work in HARMONY - through coordinated handoffs! 🤝
