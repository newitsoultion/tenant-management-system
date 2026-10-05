#!/usr/bin/env bash
set -e

cd "$(dirname "$0")"

if [ ! -f package.json ]; then
  echo "Run this script from the project root."
  exit 1
fi

if [ ! -d node_modules ]; then
  echo "Installing dependencies..."
  npm install
fi

if [ ! -f .env ]; then
  echo "Creating .env file..."
  printf '%s\n' 'DATABASE_URL="file:./dev.db"' > .env
fi

if [ ! -f prisma/dev.db ]; then
  echo "Setting up Prisma database..."
  npx prisma generate
  npx prisma db push
  npx prisma db seed || true
fi

echo "Starting dev server..."
npm run dev
