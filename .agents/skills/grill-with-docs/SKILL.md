---
name: grill-with-docs
description: Stress-test a plan against the existing project context and sharpen terminology before implementation. Use when the user wants to discuss, validate, or refine a plan, feature, architecture decision, or product idea before coding.
---

# Grill With Docs

Use this skill to align on a plan before implementation. The goal is shared understanding, not paperwork.

## First Check The Repo

If a question can be answered by reading code or `.context/`, inspect the repo instead of asking the user.

Useful project files:

- `.context/STATE.md` for current project status.
- `.context/PROJECT.md` and `.context/REQUIREMENTS.md` for product terms and requirement IDs.
- `.context/ARCHITECTURE.md` for system structure.
- `.context/specs/*.md` for feature scope.
- `.context/DECISIONS.md` for existing tradeoffs.

## Interview Loop

- Ask one focused question at a time.
- For each question, include a recommended answer and why it is the default.
- Walk dependencies in order: goal, users, data, permissions, edge cases, failure modes, verification.
- Challenge vague terms. Propose one canonical term when the wording is overloaded.
- Cross-check claims against code and existing docs. Surface contradictions directly.

## Documentation

Only update docs when the information will help future work:

- Add durable product or domain terms to the relevant `.context/` file.
- Append to `.context/DECISIONS.md` only for hard-to-reverse decisions with real alternatives.
- Do not create new doc files unless the existing `.context/` structure has no suitable home.

## Done Criteria

Finish with a concise implementation-ready summary:

- Goal
- Non-goals
- Decisions made
- Open risks
- Verification plan
