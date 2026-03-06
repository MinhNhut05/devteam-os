#!/bin/bash
# PostToolUse hook: chay ESLint --fix sau khi Write/Edit file .ts/.tsx
# Bat loi ma Prettier khong cover: unused vars, no-console, naming...

INPUT=$(cat)
FILE_PATH=$(echo "$INPUT" | jq -r '.tool_input.file_path // empty')

if [ -z "$FILE_PATH" ]; then
  exit 0
fi

# Chi lint TypeScript files
if ! echo "$FILE_PATH" | grep -qE '\.(ts|tsx)$'; then
  exit 0
fi

# Xac dinh app de dung dung eslint config
if echo "$FILE_PATH" | grep -q "apps/api"; then
  cd "$CLAUDE_PROJECT_DIR/apps/api" && npx eslint --fix "$FILE_PATH" 2>/dev/null | head -15
elif echo "$FILE_PATH" | grep -q "apps/web"; then
  cd "$CLAUDE_PROJECT_DIR/apps/web" && npx eslint --fix "$FILE_PATH" 2>/dev/null | head -15
fi

exit 0
