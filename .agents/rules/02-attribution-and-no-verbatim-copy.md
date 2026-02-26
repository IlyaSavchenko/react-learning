---
trigger: always_on
---

# Rule: Attribution required; avoid verbatim copying from react.dev

## When
The agent writes educational content derived from:
- https://react.dev/learn
- https://ru.react.dev/learn

## Must
- Provide attribution in the app (About/Sources page):
  - reference the source URLs
  - mention the docs license (CC BY 4.0) and include a link to the license
- Include a "Source" link per module or per block pointing to the original docs section.

## Forbidden
- Copying large passages verbatim from react.dev/ru.react.dev.
- Reproducing the structure as a near-duplicate page-by-page mirror.

## Enforcement
- Content must be paraphrased, condensed, and restructured into short learning blocks.
- If uncertain whether text is too close to the source, rewrite to a shorter paraphrase.