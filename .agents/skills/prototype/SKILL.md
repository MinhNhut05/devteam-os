---
name: prototype
description: Build a clearly throwaway prototype to answer a design question before committing production code. Use when the user wants to prototype, sanity-check a workflow, try UI variations, explore a state model, or quickly validate an idea.
---

# Prototype

A prototype answers a question. It is not production code.

## Choose The Branch

- Logic or state-model question: build a small runnable harness or terminal flow near the relevant module.
- UI question: build a temporary route or component variants following the existing frontend routing and styling conventions.
- If unclear, state the assumption and choose the branch closest to the surrounding code.

## Rules

- Mark prototype files clearly with `prototype` in the name or path.
- Keep state in memory unless persistence is the actual question.
- Use one command to run it.
- Skip production polish, broad tests, and reusable abstractions.
- Show enough state after each action or variant switch for the user to judge the result.
- Delete the prototype or fold the validated decision into real code when done.

## Capture The Learning

When the question is answered, record the outcome in the most durable existing place: commit message, issue, `.context/DECISIONS.md`, or a short note next to the prototype if the decision is still pending.
