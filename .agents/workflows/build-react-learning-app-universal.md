---
description: 
---

# Workflow: Build React Learning App (Universal Vite + React Router + SCSS)
Source: https://react.dev/learn (prefer https://ru.react.dev/learn where available)
Stack: Vite + React + TypeScript + React Router v6 + SCSS
Persistence: localStorage (no backend)

## Rules
This workflow must obey all `.agents/rules/*.md`.

## Goal
Create a learning app to study React:
- Russian, compressed, clear blocks
- each block ends with interactive knowledge check
- progress tracking + dashboard
- deterministic recommendations based on quiz weaknesses
- attribution + sources

## Deliverables
- Running app with routes:
  - `/modules`
  - `/modules/:moduleId`
  - `/modules/:moduleId/blocks/:blockId`
  - `/progress`
  - `/about`
- Seed content for v1: 1 module, 3–5 blocks, quizzes, concept tags
- Progress persistence in localStorage
- Tests for scoring/storage + 1 integration flow

---

## Step 0 — Detect Project Baseline (read-only)
### Do
- Determine if the repo is already a Vite React TS project:
  - check `package.json`, `vite.config.*`, `src/main.tsx`, `src/App.tsx`
- Detect test runner:
  - `vitest` or `jest`
- Detect lint/typecheck scripts:
  - `npm run lint`, `npm run typecheck`
- Detect existing routing:
  - search for `react-router-dom`, `createBrowserRouter`, `BrowserRouter`, `Routes`

### Output Artifact
- `Baseline Report`:
  - router style (data router vs <Routes>)
  - where nav/layout lives (if any)
  - how SCSS is organized
  - how to run test/lint/typecheck/build

---

## Step 1 — Install / Ensure Dependencies
### Do
- Ensure dependencies exist:
  - `react-router-dom` (v6+)
  - `sass` (for SCSS)
- If a test runner is missing, prefer `vitest` + React Testing Library (only if needed by rules).

### Enforcement
- Keep new dependencies minimal.
- If adding a dependency, document why.

### Acceptance
- `npm install` succeeds
- `npm run dev` starts

---

## Step 2 — Create Feature Module Skeleton
### Do
Create:
- `src/features/learn/`
  - `data/`
  - `pages/`
  - `components/`
  - `utils/`
  - `styles/`

Add placeholder pages:
- `ModulesPage.tsx`
- `ModulePage.tsx`
- `BlockPage.tsx`
- `ProgressPage.tsx`
- `AboutPage.tsx`

Add styles:
- `src/features/learn/styles/learn.scss` (or per-component scss modules if project uses them)

### Acceptance
- Pages render headings and placeholders (no content pipeline yet)
- No runtime errors

---

## Step 3 — Wire Routing (Universal Strategy)
### Do
Support both common patterns:

### Pattern A: <BrowserRouter><Routes>
- If `src/main.tsx` wraps `<App />`:
  - wrap App in `<BrowserRouter>` if not already wrapped
- In `App.tsx` (or `src/router.tsx` if exists):
  - add `<Routes>` and `<Route>` entries

### Pattern B: createBrowserRouter / RouterProvider (data router)
- If repo uses `createBrowserRouter`:
  - add route objects for required paths

Routes:
- `/modules` -> ModulesPage
- `/modules/:moduleId` -> ModulePage
- `/modules/:moduleId/blocks/:blockId` -> BlockPage
- `/progress` -> ProgressPage
- `/about` -> AboutPage
- Optional redirect: `/` -> `/modules`

### Acceptance
- Navigating to each route renders the correct placeholder page

---

## Step 4 — Build Core Data Types (TS)
### Do
Create `src/features/learn/types.ts` with:
- Module, Block, Quiz, Question, ContentNode
- Progress storage types

Create `src/features/learn/data/concepts.ts`:
- `conceptTag` registry
- deterministic recommendation templates per concept

### Acceptance
- Typecheck passes
- No runtime integration yet

---

## Step 5 — Create Data Store (Seed Content Format)
### Do
Create:
- `src/features/learn/data/modules.ts` (module list)
- `src/features/learn/data/blocks.ts` (blocks by id)
- `src/features/learn/data/quizzes.ts` (quiz defs by id)

Rules:
- Russian-first text
- compressed content
- each block references a quiz
- include `sourceUrl` referencing react.dev/ru.react.dev section

### Acceptance
- ModulesPage can list modules from `modules.ts`

---

## Step 6 — Implement Content Rendering
### Do
Implement `ContentRenderer.tsx`:
- Render ContentNode types:
  - heading, paragraph, list, callout, codeSnippet
- Use semantic HTML
- Apply SCSS for readability (max-width, spacing, callouts, takeaways)

Update BlockPage to:
- load `moduleId` + `blockId` from params
- fetch block from data store
- render content + takeaways + mistakes

### Acceptance
- A block renders correctly and looks readable

---

## Step 7 — Implement Quiz Engine + Scoring
### Do
Create `utils/scoring.ts` (pure):
- evaluate answers per question:
  - single: exact match
  - multi: exact set equality
  - true/false: treat as single with two options
  - spotbug: single
- compute scorePct, pass/fail
- derive `weakConceptTags` from wrong answers

Create components:
- `Quiz.tsx` (list of questions, state management, submit)
- `QuizQuestion.tsx` (radio/checkbox inputs)
- `QuizResults.tsx` (score + explanations)

Integrate into BlockPage:
- At the end of block: render Quiz
- On submit: show results + explanations inline

### Acceptance
- Quiz works end-to-end within a block page
- Explanations shown for each question

---

## Step 8 — Implement localStorage Progress
### Do
Create `utils/storage.ts`:
- `readProgress()`, `writeProgress()`
- `updateBlockProgress(blockId, result)`
- Safe parse with fallback reset if corrupted

Update:
- ModulePage: show list of blocks + per-block status
- ModulesPage: show per-module completion %
- ProgressPage: overall progress + modules table

### Acceptance
- After quiz submission:
  - progress updates in UI immediately
  - persists after refresh

---

## Step 9 — Implement Deterministic Recommendations
### Do
Create `components/Recommendations.tsx`:
- Input: weakConceptTags (top 1–3), current block/module context
- Output:
  - "Обратить внимание на" + templated hints from `concepts.ts`
  - "Вернуться и повторить" links:
    - blocks matching those concept tags
  - "Источник" link to original docs page

Rules:
- No free-form LLM advice at runtime.
- Only template + links.

### Acceptance
- If score < passing threshold:
  - recommendations panel appears and is actionable

---

## Step 10 — About / Sources + Attribution
### Do
Implement AboutPage:
- Link to react.dev/learn and ru.react.dev/learn
- State that content is adapted/condensed
- Include CC BY 4.0 notice and link to license
Add per-module and/or per-block "Источник" link.

### Acceptance
- Attribution visible, links correct

---

## Step 11 — Seed v1 Content (1 module, 3–5 blocks)
### Do
Create v1 module using a subset of react.dev/learn:
- Prefer ru.react.dev where available
- For each block:
  - short explanation in Russian
  - takeaways + mistakes
  - quiz with 3–7 questions
  - concept tags + explanations
  - sourceUrl

Recommended initial module (v1):
- "Quick Start" subset OR "Describing the UI" subset

### Acceptance
- User can complete 3–5 blocks and see progress + recommendations

---

## Step 12 — Tests + Quality Gates
### Do
Unit tests:
- `scoring` correctness (single/multi exact match, rounding)
- `storage` safe parse + update

Integration test (RTL):
- render BlockPage
- answer quiz
- submit
- verify progress persisted (mock localStorage)
- verify recommendations appear on low score

Run:
- tests
- lint (if exists)
- typecheck (if exists)
- build

### Completion Criteria
- All quality gates pass
- All rules satisfied:
  - quizzes per block
  - progress visible
  - deterministic recommendations
  - Russian content
  - attribution

---

## Step 13 — Delivery Notes
### Do
Produce a short developer note in repo (README or docs):
- how to add a new module/block/quiz
- how concept tags map to recommendations
- commands to run tests/lint/build