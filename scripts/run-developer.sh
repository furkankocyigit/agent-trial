#!/bin/bash
# run-developer.sh — Launch the Developer agent
# Usage: ./scripts/run-developer.sh [TASK-ID]
# Example: ./scripts/run-developer.sh TASK-001

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PROJECT_ROOT="$(dirname "$SCRIPT_DIR")"

if [ ! -f "$PROJECT_ROOT/tasks.md" ]; then
  echo "❌ tasks.md not found. Run the Architect agent first."
  exit 1
fi

TASK_ID=${1:-""}
INITIAL_MSG=""
if [ -n "$TASK_ID" ]; then
  INITIAL_MSG="Please implement $TASK_ID from tasks.md"
fi

echo "💻  Starting Developer Agent..."
if [ -n "$TASK_ID" ]; then
  echo "Task: $TASK_ID"
fi
echo "It will implement the task, commit, and open a PR."
echo "---"

if [ -n "$INITIAL_MSG" ]; then
  claude \
    --system-prompt "$(cat "$PROJECT_ROOT/agents/developer-prompt.md")" \
    --add-dir "$PROJECT_ROOT" \
    --message "$INITIAL_MSG"
else
  claude \
    --system-prompt "$(cat "$PROJECT_ROOT/agents/developer-prompt.md")" \
    --add-dir "$PROJECT_ROOT"
fi
