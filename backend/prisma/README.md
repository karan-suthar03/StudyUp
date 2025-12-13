# Database Setup Instructions

## Prerequisites
- Docker and Docker Compose installed
- PostgreSQL container running (via `docker-compose up postgres`)

## Running Migrations

### Option 1: Using Prisma CLI (Recommended)
```bash
cd backend
npm run migrate
```

This will:
1. Create a new migration based on schema changes
2. Apply the migration to the database
3. Generate the Prisma Client

### Option 2: Push Schema Directly (Development)
```bash
cd backend
npm run db:push
```

This will sync your Prisma schema with the database without creating migration files.

### Option 3: Manual Migration
If you need to apply the migration manually:

```bash
cd backend
npx prisma migrate deploy
```

## Initial Setup

1. Make sure PostgreSQL is running:
```bash
docker-compose up -d postgres
```

2. Apply the initial migration:
```bash
cd backend
npm run migrate
```

3. (Optional) Seed the database:
```bash
cd backend
npm run db:seed
```

## Database Connection

The database connection string is configured in `backend/.env`:
```
DATABASE_URL=postgresql://studyup:studyup@localhost:5432/studyup?schema=public
```

## Schema Overview

The database includes the following tables:
- **User**: User accounts with authentication
- **Profile**: User profiles with subjects, goals, availability
- **Connection**: Study buddy connections between users
- **Message**: Chat messages between connected users
- **StudySession**: Scheduled study sessions
- **Resource**: Shared educational resources
- **Feedback**: Post-session ratings and feedback
- **Notification**: User notifications

All tables include appropriate indexes for performance optimization.
