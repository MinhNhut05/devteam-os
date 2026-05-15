---
name: zoom-out
description: Explain an unfamiliar area of code at a higher level. Use when the user asks to zoom out, understand how code fits together, map modules/callers, or get architectural context before changing code.
---

# Zoom Out

Use this skill when local code details are not enough.

## Workflow

1. Read the relevant `.context/` docs for project vocabulary and architecture.
2. Map the modules, callers, data flow, and user-facing behavior involved.
3. Explain the area using project terms before file or class names.
4. Call out boundaries, ownership rules, and shared dependencies.
5. Identify the safest place to make the next change, if the user is preparing to edit.

## Output Shape

Keep it practical:

- What this area is responsible for.
- Where the main entry points are.
- How data moves through it.
- Which files are most likely relevant.
- What risks or conventions matter before editing.
