---
name: debug
description: Disciplined bug diagnosis loop. Use when encountering errors, broken behavior, failing tests, performance regressions, or when the user asks to debug or diagnose something.
---

# Debug Helper

Analyze bugs with a reproduction-first loop. For hard bugs, do not jump straight to a fix.

> **Important:** Follow the Learning Mode guidelines in `_templates/learning-mode.md`

## Arguments
- `$ARGUMENTS` - Error message, file path, or description

## Instructions

### Step 1: Build a feedback loop

Find the fastest pass/fail signal that reproduces the bug:

1. Failing unit, integration, or e2e test.
2. API request against a running dev server.
3. CLI or script with fixture input.
4. Playwright/browser check for UI bugs.
5. Small throwaway harness for an isolated service/function.

If the bug is flaky, increase reproduction rate with repeated runs, fixed seeds, narrowed timing, or stress loops.

Do not proceed to root-cause claims until the failure is reproduced or the blocker is explicit.

### Step 2: Reproduce and capture the symptom

Confirm the loop matches the user's bug, not a nearby issue.

Capture:

- Exact error message or wrong output.
- File/endpoint/page involved.
- Expected vs actual behavior.
- Recent relevant changes if known.

### Step 3: Generate hypotheses

Create 3-5 ranked, falsifiable hypotheses.

Format each hypothesis:

```text
If <cause> is true, then <probe/change> should <prediction>.
```

Test one variable at a time. Prefer debugger/REPL inspection, then targeted logs. Tag temporary logs with a unique prefix like `[DEBUG-a4f2]`.

### Step 4: Fix and lock it down

- Turn the minimized repro into a regression test if there is a correct seam.
- Apply the smallest fix that addresses the reproduced cause.
- Re-run the original feedback loop and the regression test.
- Remove temporary `[DEBUG-...]` instrumentation and throwaway harnesses.

### Step 5: Report analysis

```md
## Bug Analysis

### Problem Summary
[1-2 sentence description]

### Feedback Loop
[How the bug was reproduced and verified]

### Root Cause
**What:** [What's wrong]
**Where:** [File:line]
**Why:** [Why it happens]

### Fix
[What changed]

### Verification
[Commands/checks run and result]
```

## Common Bug Patterns

### NestJS
- Missing `@Injectable()` decorator
- Circular dependency
- Wrong module imports
- Missing async/await

### Prisma
- Missing `await` on queries
- Wrong relation in `include`
- Type mismatch

### React
- Missing dependency in useEffect
- Wrong key in lists
- State update on unmounted component

### TypeScript
- Null/undefined not handled
- Type assertion hiding issues

## Debugging Strategies

1. **Feedback Loop First**: failing test, API call, browser script, or harness
2. **Binary Search**: bisect code paths or commits when the regression window is known
3. **Targeted Instrumentation**: log only the boundary that distinguishes hypotheses
4. **Read Error Carefully**: error messages often point to the failing contract
5. **Check Recent Changes**: `git diff`

## Example Usage

```
/debug "Cannot read property 'id' of undefined"
/debug apps/api/src/modules/auth/auth.service.ts
/debug "API returns 401 but user is logged in"
```

## After Completion

Remind user when relevant:

- "Có muốn ghi lại lesson này vào `.context/debug/` hoặc `.context/DECISIONS.md` không?"
- "Regression test đã cover bug này chưa?"
