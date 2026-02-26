---
trigger: always_on
---

# Rule: Track progress per block and show progress UI

## When
Implementing learning flows.

## Must
- Persist progress locally (localStorage) per block:
  - attempts, bestScorePct, lastScorePct, passed, lastAttemptAt
  - weakConceptTags derived from wrong answers
- Provide visible progress:
  - module progress (passed blocks / total)
  - overall progress dashboard

## Forbidden
- Storing personally identifiable information (PII)
- Using remote storage/backends in v1