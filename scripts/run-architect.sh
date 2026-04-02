#!/bin/bash
# run-architect.sh — Launch the Architect agent
# Usage: ./scripts/run-architect.sh

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PROJECT_ROOT="$(dirname "$SCRIPT_DIR")"

if [ ! -f "$PROJECT_ROOT/epics.md" ]; then
  echo "❌ epics.md not found. Run the PM agent first."
  exit 1
fi

echo "🏗  Starting Architect Agent..."
echo "It will read epics.md and write tasks.md."
echo "---"

claude \
  --system-prompt "$(cat "$PROJECT_ROOT/agents/architect-prompt.md")" \
  --add-dir "$PROJECT_ROOT"
