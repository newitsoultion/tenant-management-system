# Tenant Management System

A full-stack tenant management system with POS and inventory modules.

## Features

- Tenant management with TIN support
- Rent due reminders and notifications
- POS module with customer name and TIN entry
- 15% VAT toggle on sales
- Inventory tracking and low-stock visibility
- Prisma + SQLite data layer

## Prerequisites

- Node.js 18+
- npm

## Local setup

### Linux/macOS

```bash
bash setup.sh
```

### Windows PowerShell

```powershell
npm install
@'
DATABASE_URL="file:./dev.db"
'@ | Set-Content -Path .env
npx prisma generate
npx prisma db push
npm run dev
```

### Manual

```bash
npm install
printf '%s\n' 'DATABASE_URL="file:./dev.db"' > .env
npx prisma generate
npx prisma db push
npm run dev
```

## Access the app

Open:

```text
http://localhost:3000
```

## Notes

- The app uses SQLite for local development.
- A demo dataset is included through Prisma seed logic.
- If port 3000 is busy, run:

```bash
npm run dev -- --port 3001
```
