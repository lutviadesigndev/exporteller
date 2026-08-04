#!/usr/bin/env bash
# deploy-ftp.sh — build + subida por FTP a mano (alternativa al workflow de Actions).
# Útil para el caso "clon de WP": compila y sube ./dist al hosting existente.
#
# Requiere: lftp  (sudo apt install lftp  /  brew install lftp)
# Uso:
#   FTP_SERVER=ftp.tudominio.com FTP_USER=usuario FTP_PASS=clave \
#   REMOTE_DIR=/public_html ./scripts/deploy-ftp.sh
#
# ⚠️ Sobrescribe archivos en el hosting. Hacé backup del WordPress antes.
set -euo pipefail

: "${FTP_SERVER:?Falta FTP_SERVER}"
: "${FTP_USER:?Falta FTP_USER}"
: "${FTP_PASS:?Falta FTP_PASS}"
REMOTE_DIR="${REMOTE_DIR:-/public_html}"

echo "→ Compilando (npm run build)…"
npm run build

echo "→ Subiendo ./dist a ${FTP_SERVER}:${REMOTE_DIR} …"
lftp -u "${FTP_USER},${FTP_PASS}" "${FTP_SERVER}" <<EOF
set ftp:ssl-allow true
set ssl:verify-certificate no
mirror --reverse --delete --verbose --parallel=4 dist/ ${REMOTE_DIR}/
bye
EOF

echo "✓ Deploy FTP completo."
