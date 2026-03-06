#!/bin/bash
# PostToolUse hook: chay prisma validate khi sua file .prisma
# Bat loi schema ngay lap tuc

INPUT=$(cat)
FILE_PATH=$(echo "$INPUT" | jq -r '.tool_input.file_path // empty')

if [ -z "$FILE_PATH" ]; then
  exit 0
fi

# Chi check file Prisma
if ! echo "$FILE_PATH" | grep -qE '\.prisma$'; then
  exit 0
fi

cd "$CLAUDE_PROJECT_DIR/apps/api" && npx prisma validate 2>&1 | head -10

exit 0
