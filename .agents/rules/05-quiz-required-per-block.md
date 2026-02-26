---
trigger: always_on
---

# Rule: Every block ends with an interactive knowledge check

## When
A learning block is created or modified.

## Must
- Include a quiz at the end of every block.
- 3–7 questions per block.
- Provide explanation for every answer (why correct/incorrect).

## Question types (v1)
- single choice
- multi choice ("select all that apply")
- true/false
- spot-the-bug (choose the issue)

## Coverage requirement
- Questions must map to the block’s objectives / key takeaways.

## Enforcement
- If a block has no quiz, it is incomplete and must not be marked done.