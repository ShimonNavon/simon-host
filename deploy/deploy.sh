#!/usr/bin/env bash
# Pull-based auto-deploy, run every minute by simon-host-deploy.timer on debian01.
# Deploys only when origin/main has moved; a no-op tick touches nothing.
set -euo pipefail

REPO=/srv/simon-host

# All logic lives in main() so that a `git pull` replacing this very file
# mid-run cannot corrupt the executing script.
main() {
  cd "$REPO"

  branch=$(git branch --show-current)
  if [ "$branch" != "main" ]; then
    echo "refusing to deploy: checkout is on '$branch', not main" >&2
    exit 1
  fi

  git fetch origin main --quiet
  local_sha=$(git rev-parse main)
  remote_sha=$(git rev-parse origin/main)
  [ "$local_sha" = "$remote_sha" ] && exit 0

  echo "deploying ${local_sha:0:7} -> ${remote_sha:0:7}"
  git merge --ff-only origin/main --quiet
  docker compose up -d --build
  echo "deployed ${remote_sha:0:7}"
}

main "$@"; exit $?
