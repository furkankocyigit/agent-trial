# Agent Trial Project

Multi-agent workflow trial. 4 agents, 1 human (you) who merges PRs.

## Prerequisites

```bash
# 1. Claude Code installed
npm install -g @anthropic-ai/claude-code

# 2. GitHub CLI installed and authenticated
brew install gh   # or: https://cli.github.com
gh auth login

# 3. Make scripts executable (one-time setup)
chmod +x scripts/*.sh
```

## First-time repo setup

```bash
# Create repo on GitHub and push this project
git init
git add -A
git commit -m "Initial project setup"
gh repo create agent-trial --public --source=. --push
```

## Running the pipeline (Hello World feature)

### Step 1 — PM Agent
```bash
./scripts/run-pm.sh
```
When it starts, type:
> "I want a Hello World REST API. GET /hello returns a JSON greeting with a message and timestamp."

It will write `epics.md`. Exit the session (Ctrl+C or type "done").

---

### Step 2 — Architect Agent
```bash
./scripts/run-architect.sh
```
It reads `epics.md` automatically and writes `tasks.md`. Exit when done.

---

### Step 3 — Developer Agent
```bash
./scripts/run-developer.sh TASK-001
```
It will:
- Create a branch `task/TASK-001-...`
- Write the code
- Commit and push
- Open a PR on GitHub

Copy the PR number it gives you (e.g. PR #1).

---

### Step 4 — Reviewer Agent
```bash
./scripts/run-reviewer.sh 1
```
It will fetch the PR diff from GitHub and post a review.

- **Approved?** → Go to GitHub and merge the PR yourself
- **Changes requested?** → Run Developer agent again with the feedback

---

### Step 5 — You merge
Go to `github.com/YOUR_USERNAME/agent-trial/pulls`
Open the PR, confirm it's approved, click **Merge pull request**.

---

## Folder structure (after agents run)
```
agent-trial/
├── CLAUDE.md              ← agent standing instructions
├── epics.md               ← written by PM agent
├── tasks.md               ← written by Architect agent
├── agents/                ← system prompts for each agent
│   ├── pm-prompt.md
│   ├── architect-prompt.md
│   ├── developer-prompt.md
│   └── reviewer-prompt.md
├── scripts/               ← run each agent from here
│   ├── run-pm.sh
│   ├── run-architect.sh
│   ├── run-developer.sh
│   └── run-reviewer.sh
└── src/                   ← code written by Developer agent
    ├── domain/
    ├── application/
    ├── infrastructure/
    └── presentation/
```
