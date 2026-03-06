#!/bin/bash
# PreToolUse hook: block cac lenh nguy hiem truoc khi Bash chay
# An toan hon khi chay multi-agent

INPUT=$(cat)
COMMAND=$(echo "$INPUT" | jq -r '.tool_input.command // empty')

if [ -z "$COMMAND" ]; then
  exit 0
fi

# Danh sach patterns nguy hiem
DANGEROUS_PATTERNS=(
  "rm -rf /"
  "rm -rf ~"
  "rm -rf \."
  "git push --force"
  "git push -f "
  "git reset --hard"
  "git clean -fd"
  "git checkout \."
  "git restore \."
  "DROP TABLE"
  "DROP DATABASE"
  "TRUNCATE TABLE"
  "DELETE FROM .* WHERE 1"
  "> /dev/sd"
  "mkfs\."
  ":(){ :|:& };:"
  "dd if=/dev"
)

for PATTERN in "${DANGEROUS_PATTERNS[@]}"; do
  if echo "$COMMAND" | grep -qiE "$PATTERN"; then
    echo "BLOCKED: Lenh nguy hiem bi chan boi pre-bash-guard"
    echo "  Command: $COMMAND"
    echo "  Pattern: $PATTERN"
    echo "  Hay confirm voi user truoc khi chay lenh nay."
    exit 2
  fi
done

exit 0
