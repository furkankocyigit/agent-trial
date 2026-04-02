#!/bin/bash
# run-reviewer.sh — Launch the Reviewer agent
# Usage: ./scripts/run-reviewer.sh <PR-NUMBER>
# Example: ./scripts/run-reviewer.sh 3

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PROJECT_ROOT="$(dirname "$SCRIPT_DIR")"

PR_NUMBER=${1:-""}

if [ -z "$PR_NUMBER" ]; then
  echo "❌ Usage: ./scripts/run-reviewer.sh <PR-NUMBER>"
  echo "   Example: ./scripts/run-reviewer.sh 3"
  exit 1
fi

echo "🔍  Starting Reviewer Agent for PR #$PR_NUMBER..."
echo "It will review and either approve or request changes."
echo "---"

claude \
  --system-prompt "$(cat "$PROJECT_ROOT/agents/reviewer-prompt.md")" \
  --add-dir "$PROJECT_ROOT" \
  --message "Please review PR #$PR_NUMBER"
