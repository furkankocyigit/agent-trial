---
name: dev
description: Manually spawn Developer agent for a specific task
args: TASK-ID (e.g., TASK-001)
---

When user runs `/dev TASK-001`, spawn the custom Developer agent.

Parse the TASK-ID from args and pass it to the agent.

Use Agent tool:
- subagent_type: "developer"
- description: "Implement {TASK-ID}"
- prompt: "Implement {TASK-ID} from tasks.md and spawn reviewer"
