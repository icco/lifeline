# AGENTS.md

Guidance for coding agents working on lifeline.

## Project Overview

A Next.js personal lifelog and status web application styled with Tailwind CSS and daisyUI.

## Commands

Use pnpm:
- `pnpm dev` — Run ESLint and start Next.js dev server on port 8080
- `pnpm build` — Build production application
- `pnpm start` — Start production server on `$PORT`
- `pnpm lint` — Run ESLint with auto-fix

## Architecture & Conventions

- Next.js App Router structure under `src/app`, with React components under `src/components`.
- UI components styled with Tailwind CSS and daisyUI (`@icco/react-common`).
- PR titles and commits must follow Conventional Commits with lowercase subjects.
- Ensure `pnpm lint` and `pnpm build` pass before opening PRs.
