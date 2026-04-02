# Agent Workflow — Standing Instructions

This repo uses a 4-agent pipeline. Read this file before doing anything.

## Project context
This is a trial project to validate the multi-agent workflow.
Current feature under development: **Hello World API**
Stack: Node.js + Express. No framework beyond that for this trial.

## File contracts
| File | Written by | Read by |
|------|-----------|---------|
| `epics.md` | PM Agent | Architect Agent |
| `tasks.md` | Architect Agent | Developer Agent |
| PR diff | Developer Agent | Reviewer Agent |

## Git rules (ALL agents must follow)
- Default branch is `main` — NEVER push directly to it
- Branch naming: `task/TASK-001-short-description`
- Commit message format: `[TASK-001] What was done`
- Always run `git status` before starting to know your current state
- Open PRs with: `gh pr create --title "..." --body "..."`

## Architecture rules (Developer + Reviewer must follow)
This project uses Clean Architecture with these layers:
```
src/
  domain/       ← pure business logic, no framework imports
  application/  ← use cases, orchestrates domain
  infrastructure/ ← Express, DB, external services
  presentation/ ← route handlers, request/response mapping
```
- Domain layer must have ZERO imports from other layers or frameworks
- Use cases live in application/, not in route handlers
- Tests required for domain/ and application/ layers

## Who merges PRs
Only the human (repo owner) merges PRs to main. Agents open PRs and review them — never merge.
