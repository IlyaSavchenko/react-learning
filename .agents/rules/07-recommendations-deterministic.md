---
trigger: always_on
---

# Rule: Recommendations must be deterministic and concept-based

## When
Quiz results are computed.

## Must
- Generate recommendations based only on:
  - wrong answers’ concept tags
  - predefined templates per concept
  - links to relevant blocks and source docs

## Forbidden
- Generating “free-form” advice with an LLM at runtime (no backend).
- Vague recommendations without actionable pointers.

## Output requirements (after quiz)
- "Pay attention to" (top 1–3 weak concepts)
- "Revisit" links (blocks sharing these tags)
- "Source" link (original docs section)
