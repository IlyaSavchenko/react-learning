---
trigger: always_on
---

# Rule: Stay within agreed scope and keep architecture simple

## When
The agent plans or implements changes.

## Must
- Implement only what is required by the learning app v1:
  - modules/blocks content rendering
  - quiz per block
  - progress tracking in localStorage
  - recommendations based on quiz results
- Keep the solution client-only (no backend).
- Keep dependencies minimal:
  - Do not add new libraries unless strictly necessary.

## Forbidden
- Introducing backend or authentication
- Adding state management frameworks (Redux/MobX/etc.) for v1
- Adding CMS, markdown pipelines, or build-time scrapers unless requested

## Enforcement
- If a new dependency seems useful, the agent must justify it and prefer native React/TS solutions.