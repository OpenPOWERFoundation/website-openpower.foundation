#!/bin/sh
# Run a local formsender in DRY_RUN mode for testing the forms (README:
# "Testing the forms"). Builds from a formsender checkout when FORMSENDER_SRC
# points at one, otherwise uses the published image. Extra arguments go to
# "docker compose up", e.g. -d.
set -eu

# Resolve FORMSENDER_SRC from where it was given, before moving to the repo,
# and stop rather than quietly testing against the published image
if [ -n "${FORMSENDER_SRC:-}" ]; then
  if [ ! -f "$FORMSENDER_SRC/Dockerfile" ] || [ ! -f "$FORMSENDER_SRC/request_handler.py" ]; then
    echo "FORMSENDER_SRC=$FORMSENDER_SRC is not a formsender checkout" >&2
    exit 1
  fi
  FORMSENDER_SRC="$(cd "$FORMSENDER_SRC" && pwd)"
  export FORMSENDER_SRC
fi

cd "$(dirname "$0")/.."

if [ -n "${FORMSENDER_SRC:-}" ]; then
  echo "Building formsender from $FORMSENDER_SRC"
  exec docker compose -f compose.yaml -f compose.formsender-src.yaml up --build "$@"
fi

echo "Using ${FORMSENDER_IMAGE:-ghcr.io/osuosl/formsender:master}"
exec docker compose -f compose.yaml up "$@"
