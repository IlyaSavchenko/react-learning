---
trigger: always_on
---

# Rule: Prohibit destructive terminal operations

## When
The agent considers executing any terminal command or modifying project files.

## Forbidden
- Any destructive shell patterns (examples):
  - `rm -rf`, `del /s`, `format`, `mkfs`, `shutdown`, `reboot`
- Any command that touches files outside the workspace root
- Any command that wipes dependencies or lockfiles without explicit reason:
  - deleting `node_modules`, `package-lock.json`, `pnpm-lock.yaml`, `yarn.lock`

## Enforcement
- Block forbidden actions.
- If an action is potentially risky (e.g., migrations, bulk file operations), ask for confirmation and propose a safer alternative.