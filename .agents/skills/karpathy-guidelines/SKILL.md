---
name: karpathy-guidelines
description: Behavioral coding guardrails for Codex. Use when writing, reviewing, refactoring, or debugging code to surface assumptions, keep changes simple and surgical, and define verifiable success criteria.
---

# Karpathy Guidelines

Use this skill to reduce common agent coding failures: silent assumptions, overengineering, drive-by refactors, and unverified fixes.

## Think Before Coding

- State assumptions when they affect behavior, scope, data model, or user experience.
- If the request has multiple plausible interpretations, ask or present the tradeoff before editing.
- Push back when a simpler path would satisfy the goal with less risk.
- Stop when confused; name the missing fact instead of guessing.

## Simplicity First

- Implement the minimum code that solves the actual request.
- Do not add features, extension points, config, or abstractions that were not requested.
- Prefer the repo's existing helpers and patterns over new generic machinery.
- If the solution becomes large, reassess whether the problem can be solved with fewer moving parts.

## Surgical Changes

- Touch only files required for the task.
- Match existing style, naming, file layout, and error handling.
- Do not refactor adjacent code unless it is necessary to complete or verify the change.
- Clean up imports, variables, tests, or docs made stale by your own edits.
- Mention unrelated dead code or risks instead of deleting them.

## Goal-Driven Execution

- Convert the request into concrete success criteria before non-trivial work.
- Prefer test-first or reproduction-first loops for bug fixes and behavioral changes.
- Verify with the narrowest meaningful command first, then broaden when the blast radius requires it.
- If verification cannot run, state the blocker and the residual risk.
