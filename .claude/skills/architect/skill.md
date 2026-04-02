---
name: architect
description: Spawn Architect agent to plan epic and auto-chain Developer
args: EPIC-ID (e.g., EPIC-001)
---

When user runs `/architect EPIC-001`, spawn the custom Architect agent.

Parse the EPIC-ID from args and pass it to the agent.

Use Agent tool:
- subagent_type: "architect"
- description: "Plan {EPIC-ID}"
- prompt: "Plan {EPIC-ID} from epics.md into tasks and spawn developer agent"

The architect agent will automatically spawn developer, which spawns reviewer.
