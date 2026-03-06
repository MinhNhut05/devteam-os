#!/bin/bash
# PreToolUse hook: warning neu file dang qua dai (> 300 dong)
# Giup giu code ngan gon, de maintain

INPUT=$(cat)
FILE_PATH=$(echo "$INPUT" | jq -r '.tool_input.file_path // empty')

if [ -z "$FILE_PATH" ]; then
  exit 0
fi

# Chi check code files
if ! echo "$FILE_PATH" | grep -qE '\.(ts|tsx|js|jsx)$'; then
  exit 0
fi

# Check neu file da ton tai va qua dai
if [ -f "$FILE_PATH" ]; then
  LINE_COUNT=$(wc -l < "$FILE_PATH")
  if [ "$LINE_COUNT" -gt 300 ]; then
    echo "WARNING: File $FILE_PATH co $LINE_COUNT dong (> 300)."
    echo "  Can nhac chia nho file de de maintain."
  fi
fi

exit 0
