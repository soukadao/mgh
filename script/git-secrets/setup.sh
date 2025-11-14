#!/bin/bash

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PATTERNS_FILE="${SCRIPT_DIR}/patterns.txt"
ALLOWED_FILE="${SCRIPT_DIR}/allowed.txt"

# 既存設定を完全削除
git config --remove-section secrets 2>/dev/null || true

# パターンファイルを読み込み
while IFS= read -r line; do
    [[ "$line" =~ ^[[:space:]]*# ]] || [[ -z "${line// }" ]] && continue
    if [[ "$line" =~ ^-+ ]]; then
        git secrets --add --literal "$line"
    else
        git secrets --add "$line"
    fi
done < "$PATTERNS_FILE"

# 許可パターンファイルを読み込み
if [[ -f "$ALLOWED_FILE" ]]; then
    while IFS= read -r line || [[ -n "$line" ]]; do
        [[ "$line" =~ ^[[:space:]]*# ]] || [[ -z "${line// }" ]] && continue
        if [[ "$line" == -----* ]]; then
            git secrets --add --allowed --literal "$line"
        else
            git secrets --add --allowed "$line"
        fi
    done < "$ALLOWED_FILE"
fi

echo "Setup complete. Current patterns:"
git secrets --list
