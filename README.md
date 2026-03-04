# CLAUDE.md — Computer-Buddy

This file provides context and guidance for AI assistants (Claude and others) working in this repository.

---

## Project Overview

**Computer-Buddy** is a project in its initial stage. Currently the repository contains only a `README.md` placeholder. This document will be updated as the project evolves.

- **Repository**: `vctb12/Computer-Buddy`
- **Primary branch**: `master`
- **Development branches**: prefixed with `claude/` for AI-driven work sessions

---

## Current Repository State

```
Computer-Buddy/
├── README.md      # Minimal project description
└── CLAUDE.md      # This file
```

No source code, dependencies, tests, or configuration files exist yet. The project is ready for initial development.

---

## Git Workflow

### Branching

- **`master`** — stable, production-ready code; never push broken code here
- **`claude/<session-id>`** — AI assistant work branches; one per task session
- Feature branches should be short-lived and merged via pull request

### Commit Messages

Use the imperative mood, present tense:

```
Add user authentication module
Fix null pointer in device scanner
Update README with setup instructions
```

Avoid vague messages like `fix stuff` or `update`.

### Push Rules

- Always push with: `git push -u origin <branch-name>`
- Never force-push to `master`
- Branches must match the pattern `claude/...` for AI session branches

---

## Development Conventions (to be enforced as code is added)

### General

- Keep files focused and single-purpose
- Prefer explicit over implicit
- Delete dead code rather than commenting it out

### Naming

- **Files/directories**: `kebab-case` for web projects, `snake_case` for Python
- **Variables/functions**: `camelCase` for JavaScript/TypeScript, `snake_case` for Python
- **Classes**: `PascalCase` in all languages
- **Constants**: `UPPER_SNAKE_CASE`

### Code Quality

- No unused variables or imports
- No hard-coded secrets — use environment variables
- Secrets must never be committed; use `.env` files (gitignored)
- Add `.env.example` to document required environment variables

---

## Environment Setup (template — fill in as project grows)

```bash
# Clone the repository
git clone <repo-url>
cd Computer-Buddy

# Install dependencies (update this section when a package manager is chosen)
# npm install        # Node.js
# pip install -r requirements.txt  # Python
# bundle install     # Ruby

# Copy environment template
cp .env.example .env
# Edit .env with your values

# Run the project
# npm start / python main.py / etc.
```

---

## Testing (template — fill in as tests are added)

When tests are introduced:

- Run all tests before committing
- New features require corresponding tests
- Aim for meaningful coverage, not 100% coverage for its own sake

```bash
# Run tests (update when test framework is chosen)
# npm test
# pytest
# go test ./...
```

---

## AI Assistant Guidelines

### Before Making Changes

1. Read any relevant existing files before editing them
2. Understand the existing patterns in the codebase before introducing new ones
3. Check `git log` and `git status` to understand the current state

### When Implementing Features

- Make focused, minimal changes — avoid scope creep
- Do not add features, refactors, or "improvements" not explicitly requested
- Do not add docstrings, comments, or type hints to code you didn't change
- Prefer editing existing files over creating new ones

### When in Doubt

- Ask clarifying questions rather than guessing intent
- Flag security concerns before implementing anything that touches auth, data handling, or external services
- Confirm before taking irreversible actions (deleting files, force-pushing, dropping data)

### Commit and Push

- Commit with clear messages describing *what* and *why*
- Push to the designated `claude/` branch for the current session
- Never push to `master` directly without explicit instruction

---

## Security Notes

- Never commit `.env`, credentials, API keys, or tokens
- Validate all user input at system boundaries
- Follow OWASP Top 10 guidelines when building web features
- Use parameterized queries for any database operations

---

## Updating This File

Update `CLAUDE.md` whenever:

- A new technology, framework, or major dependency is added
- Project structure changes significantly
- New conventions or workflows are established
- The setup or test commands change

Keep this file accurate — an outdated CLAUDE.md is worse than none.
