#!/bin/bash
# run-pm.sh — Launch the PM agent
# Usage: ./scripts/run-pm.sh

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PROJECT_ROOT="$(dirname "$SCRIPT_DIR")"

echo "🗂  Starting PM Agent..."
echo "Tell it your feature idea. It will write epics.md."
echo "---"

claude \
  --system-prompt "$(cat "$PROJECT_ROOT/agents/pm-prompt.md")" \
  --add-dir "$PROJECT_ROOT"
