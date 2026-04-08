---
name: review
description: Manually spawn Reviewer agent for a specific PR
args: PR-NUMBER (e.g., 1)
---

When user runs `/review 1`, spawn the custom Reviewer agent.

Parse the PR-NUMBER from args and pass it to the agent.

Use Agent tool:
- subagent_type: "reviewer"
- description: "Review PR #{PR-NUMBER}"
- prompt: "Review PR #{PR-NUMBER}"
