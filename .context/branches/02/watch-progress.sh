#!/bin/bash
# Watch script cho T1 — tự động báo khi tất cả phases xong
# Chạy trong terminal riêng trong khi T2 tabs đang làm việc
#
# Cách dùng:
#   bash .context/branches/02/watch-progress.sh --phase3
#   bash .context/branches/02/watch-progress.sh --phase4
#   bash .context/branches/02/watch-progress.sh --all

PROGRESS_FILE=".context/branches/02/PROGRESS.md"
MODE="${1:-}"

# Colors
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
CYAN='\033[0;36m'
NC='\033[0m' # No Color

check_phase3() {
  local a=$(grep -c "Phase 03a" "$PROGRESS_FILE" 2>/dev/null || echo 0)
  local b=$(grep -c "Phase 03b" "$PROGRESS_FILE" 2>/dev/null || echo 0)
  local c=$(grep -c "Phase 03c" "$PROGRESS_FILE" 2>/dev/null || echo 0)
  echo "$a $b $c"
}

check_phase4() {
  local a=$(grep -c "Phase 04a" "$PROGRESS_FILE" 2>/dev/null || echo 0)
  local b=$(grep -c "Phase 04b" "$PROGRESS_FILE" 2>/dev/null || echo 0)
  echo "$a $b"
}

print_status_phase3() {
  read -r a b c <<< "$(check_phase3)"
  echo ""
  echo "📊 Phase 3 Status:"
  if [ "$a" -gt 0 ]; then
    echo -e "  ${GREEN}✅ 03a ForgotPasswordPage${NC}"
  else
    echo -e "  ${YELLOW}⏳ 03a ForgotPasswordPage (chưa xong)${NC}"
  fi
  if [ "$b" -gt 0 ]; then
    echo -e "  ${GREEN}✅ 03b ResetPasswordPage${NC}"
  else
    echo -e "  ${YELLOW}⏳ 03b ResetPasswordPage (chưa xong)${NC}"
  fi
  if [ "$c" -gt 0 ]; then
    echo -e "  ${GREEN}✅ 03c VerifyEmailPage${NC}"
  else
    echo -e "  ${YELLOW}⏳ 03c VerifyEmailPage (chưa xong)${NC}"
  fi
  echo ""
}

print_status_phase4() {
  read -r a b <<< "$(check_phase4)"
  echo ""
  echo "📊 Phase 4 Status:"
  if [ "$a" -gt 0 ]; then
    echo -e "  ${GREEN}✅ 04a ProfilePage${NC}"
  else
    echo -e "  ${YELLOW}⏳ 04a ProfilePage (chưa xong)${NC}"
  fi
  if [ "$b" -gt 0 ]; then
    echo -e "  ${GREEN}✅ 04b ChangePasswordPage${NC}"
  else
    echo -e "  ${YELLOW}⏳ 04b ChangePasswordPage (chưa xong)${NC}"
  fi
  echo ""
}

watch_phase3() {
  echo -e "${CYAN}🔍 Watching Phase 3 (ForgotPassword + ResetPassword + VerifyEmail)...${NC}"
  echo "   (Ctrl+C để thoát)"
  echo ""

  while true; do
    read -r a b c <<< "$(check_phase3)"

    print_status_phase3

    if [ "$a" -gt 0 ] && [ "$b" -gt 0 ] && [ "$c" -gt 0 ]; then
      echo -e "${GREEN}🎉 Phase 3 XONG! Tất cả 3 tab đã hoàn thành.${NC}"
      echo ""
      echo -e "${CYAN}➡️  Bước tiếp theo — chạy trong terminal mới:${NC}"
      echo ""
      echo '   claude "Dung devteam-arch-checker verify cac file moi trong src/features/auth/pages/ va src/hooks/. Check imports, types match CONTRACTS.md, khong circular deps."'
      echo ""
      break
    fi

    sleep 5
  done
}

watch_phase4() {
  echo -e "${CYAN}🔍 Watching Phase 4 (ProfilePage + ChangePasswordPage)...${NC}"
  echo "   (Ctrl+C để thoát)"
  echo ""

  while true; do
    read -r a b <<< "$(check_phase4)"

    print_status_phase4

    if [ "$a" -gt 0 ] && [ "$b" -gt 0 ]; then
      echo -e "${GREEN}🎉 Phase 4 XONG! Cả 2 tab đã hoàn thành.${NC}"
      echo ""
      echo -e "${CYAN}➡️  Bước tiếp theo — chạy trong terminal mới:${NC}"
      echo ""
      echo '   claude "Doc .context/branches/02/phases/05-verify-review.md roi lam theo."'
      echo ""
      break
    fi

    sleep 5
  done
}

# Main
case "$MODE" in
  --phase3)
    watch_phase3
    ;;
  --phase4)
    watch_phase4
    ;;
  --status)
    print_status_phase3
    print_status_phase4
    ;;
  *)
    echo "Cách dùng:"
    echo "  bash .context/branches/02/watch-progress.sh --phase3   # Watch Phase 3 (3 tabs)"
    echo "  bash .context/branches/02/watch-progress.sh --phase4   # Watch Phase 4 (2 tabs)"
    echo "  bash .context/branches/02/watch-progress.sh --status   # Xem status hiện tại"
    ;;
esac
