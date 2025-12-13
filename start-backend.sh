#!/bin/bash

echo "🚀 Starting Study Up Backend..."
echo ""

# Check Docker services
echo "📦 Checking Docker services..."
docker ps | grep studyup

echo ""
echo "🗄️  Applying database schema..."
cd backend
npx prisma db push --accept-data-loss

echo ""
echo "✅ Starting backend server..."
npm run dev
