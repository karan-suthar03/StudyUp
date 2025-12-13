#!/bin/bash
export DATABASE_URL="postgresql://studyup:studyup@localhost:5432/studyup?schema=public"
cd backend
npx prisma migrate dev --name init
