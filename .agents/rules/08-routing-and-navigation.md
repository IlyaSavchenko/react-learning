---
trigger: always_on
---

# Rule: Keep routing predictable (React Router v6)

## When
Adding pages and navigation.

## Must
- Use React Router v6 routes:
  - /modules
  - /modules/:moduleId
  - /modules/:moduleId/blocks/:blockId
  - /progress
  - /about
- Navigation must show active state and allow returning to module/block list easily.

## Forbidden
- Creating multiple overlapping route systems or custom routers.