#!/bin/bash
# PostToolUse hook: chay tsc --noEmit sau khi Write/Edit file .ts/.tsx
# Su dung --incremental de tang toc (chi check lai phan thay doi)

INPUT=$(cat)
FILE_PATH=$(echo "$INPUT" | jq -r '.tool_input.file_path // empty')

if [ -z "$FILE_PATH" ]; then
  exit 0
fi

# Chi check TypeScript files
if ! echo "$FILE_PATH" | grep -qE '\.(ts|tsx)$'; then
  exit 0
fi

# Xac dinh app (api hoac web) de chay tsc dung tsconfig
# --incremental: chi recheck files thay doi, nhanh hon nhieu
if echo "$FILE_PATH" | grep -q "apps/api"; then
  cd "$CLAUDE_PROJECT_DIR/apps/api" && npx tsc --noEmit --incremental --tsBuildInfoFile .tsbuildinfo --pretty 2>&1 | head -20
elif echo "$FILE_PATH" | grep -q "apps/web"; then
  cd "$CLAUDE_PROJECT_DIR/apps/web" && npx tsc --noEmit --incremental --tsBuildInfoFile .tsbuildinfo --pretty 2>&1 | head -20
fi

exit 0
