---
trigger: always_on
---

# Rule: Quality gates required (tests + lint)

## When
Finishing a task or preparing completion.

## Must
- Add tests for core logic:
  - scoring
  - storage read/write and corruption handling
  - one integration test for quiz flow updating progress
- Run:
  - unit tests
  - lint (if configured)
  - typecheck (if configured)

## Enforcement
- Do not declare task done if tests fail or lint/typecheck fails.