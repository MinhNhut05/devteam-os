# Codex Project Instructions

## Project

DevTeamOS is a Vietnamese-first project progress management web app for freelancers and small startup teams. The codebase uses a NestJS API, React frontend, Prisma, TanStack Query, Zustand, and Tailwind.

## Context Loading

Read only the context needed for the task:

- Always start with `.context/STATE.md` to understand current status.
- Before code changes, read `.context/research/CONVENTIONS.md` and `.context/research/PITFALLS.md`.
- For new features or cross-module changes, read `.context/ARCHITECTURE.md` and the relevant `.context/specs/*.md`.
- For project decisions, use `.context/DECISIONS.md`; keep it append-only.
- For commands and environment details, use `.context/COMMANDS.md`.

## Operating Style

- State assumptions when they matter. If the request has multiple plausible meanings and the choice affects behavior or scope, ask before editing.
- Keep changes surgical. Every changed line should trace back to the user request or to cleanup caused by that change.
- Prefer the simplest implementation that satisfies the goal. Do not add speculative abstraction, configurability, or side features.
- Match existing project patterns even when another style is personally preferable.
- Read real code before writing. Verify imports, DTO names, Prisma models, hooks, stores, and route patterns from the repo.
- For non-trivial work, define a concrete verification target before implementation and loop until it passes or the blocker is explicit.

## Feedback Loops

- For bugs, first create or identify a fast pass/fail loop: failing test, API call, dev-server repro, Playwright check, or a small harness.
- Reproduce before fixing. If reproduction is impossible, say what was tried and ask for logs, payloads, screenshots, or access to the failing environment.
- Prefer tests that verify observable behavior through public interfaces. Avoid tests coupled to private methods or incidental implementation.
- For TDD requests, work in vertical slices: one failing behavior test, minimal implementation, pass, then repeat.

## Documentation Discipline

- Use project vocabulary from `.context/PROJECT.md`, `.context/REQUIREMENTS.md`, and existing source names.
- If a new durable domain term appears, update the appropriate `.context/` file only when it is genuinely useful later.
- Add to `.context/DECISIONS.md` only for hard-to-reverse decisions with real tradeoffs.
- Do not create docs just to document the process; create docs when future agents or developers will need the information.

## Vietnamese Learning Context

The project was built as a learning project. Use Vietnamese for explanations unless the user asks otherwise, keep technical terms in English, and explain important concepts briefly. When the user asks for a guided learning flow, pause at meaningful checkpoints. When the user clearly asks Codex to implement, continue autonomously while keeping progress updates concise.

## Sources Adapted

These instructions adapt the useful parts of:

- `forrestchang/andrej-karpathy-skills`: assumptions, simplicity, surgical edits, and verifiable success criteria.
- `mattpocock/skills`: grilling for alignment, shared language, TDD vertical slices, diagnosis loops, zoom-out explanations, and throwaway prototypes.
