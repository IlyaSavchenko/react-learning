---
trigger: always_on
---

# Rule: SCSS conventions and styling boundaries

## When
Adding or changing styles.

## Must
- Use SCSS and follow existing project structure.
- Prefer component-scoped styles (co-located or feature folder).
- Use consistent naming (BEM or existing convention).
- Keep typography/layout readable for learning content.

## Forbidden
- Introducing a new styling system (Tailwind/MUI/etc.) in v1
- Global CSS overrides that affect unrelated screens