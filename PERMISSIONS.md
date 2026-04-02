# Agent Permissions Setup

## Problem: Agents Asking for Permission

By default, Claude Code asks permission for every bash command. This breaks the agentic flow.

## Solution: Two-Level Permission System

### 1. Agent-Level Permissions
Each agent has `permissionMode: bypassPermissions` in their frontmatter:

```yaml
---
name: developer
permissionMode: bypassPermissions
---
```

This tells Claude Code: "Don't prompt for this agent's actions"

### 2. Project-Level Permissions
`.claude/settings.local.json` pre-approves command patterns:

```json
{
  "permissions": {
    "allow": [
      "Bash(git *)",
      "Bash(gh *)",
      "Bash(npm *)"
    ]
  }
}
```

## Current Setup

All 4 agents now have:
- ✅ `permissionMode: bypassPermissions`
- ✅ Pre-approved git, gh, npm commands

**No more permission prompts!** Agents run fully autonomously.

## Testing

After updating, restart Claude Code:
```bash
# Exit current session (Ctrl+C)
claude
```

Then run:
```
/architect EPIC-001
```

You should see:
- 🏗️ Architect runs without prompts
- 💻 Developer runs git commands without asking
- 🔍 Reviewer runs gh commands without asking

Fully autonomous! 🚀
