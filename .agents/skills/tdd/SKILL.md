---
name: tdd
description: Test-driven development with a red-green-refactor loop. Use when building features or fixing bugs test-first, when the user mentions TDD, red-green-refactor, regression tests, or behavior-first tests.
---

# Test-Driven Development

Use this skill to implement one observable behavior at a time.

## Principles

- Tests verify behavior through public interfaces, not private implementation.
- Prefer integration-style tests that exercise real project paths when practical.
- Keep each test close to a user-visible capability, API contract, or durable domain rule.
- Avoid horizontal slicing. Do not write every test first and then all implementation.
- Never refactor while the test suite is red.

## Workflow

1. Read the relevant `.context/` docs and existing code patterns.
2. Confirm the public interface and the highest-value behaviors to test.
3. Write one failing test for one behavior.
4. Run the narrowest command that proves the failure.
5. Implement the smallest change that makes the test pass.
6. Run the same check again.
7. Repeat for the next behavior.
8. Refactor only after all targeted tests are green, then rerun verification.

## Test Quality Checklist

- The test name describes behavior, not implementation.
- The test would survive a reasonable internal refactor.
- The setup uses existing factories, fixtures, API helpers, or local patterns.
- Mocking is limited to true external boundaries, not internal collaborators.
- The implementation adds no speculative behavior beyond the current test.
