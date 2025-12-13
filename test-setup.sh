#!/bin/bash

echo "🧪 Testing Study Up Platform Setup"
echo "=================================="
echo ""

# Check if Docker is running
echo "1️⃣  Checking Docker services..."
if docker ps > /dev/null 2>&1; then
    echo "   ✅ Docker is running"
    
    # Check PostgreSQL
    if docker ps | grep -q studyup-postgres; then
        echo "   ✅ PostgreSQL is running"
    else
        echo "   ❌ PostgreSQL is not running"
        echo "   Run: docker-compose up -d postgres"
    fi
    
    # Check Redis
    if docker ps | grep -q studyup-redis; then
        echo "   ✅ Redis is running"
    else
        echo "   ❌ Redis is not running"
        echo "   Run: docker-compose up -d redis"
    fi
else
    echo "   ❌ Docker is not running"
    echo "   Please start Docker Desktop"
fi

echo ""
echo "2️⃣  Checking backend setup..."
if [ -f "backend/node_modules/.bin/prisma" ]; then
    echo "   ✅ Backend dependencies installed"
else
    echo "   ❌ Backend dependencies not installed"
    echo "   Run: cd backend && npm install"
fi

if [ -f "backend/prisma/schema.prisma" ]; then
    echo "   ✅ Prisma schema exists"
else
    echo "   ❌ Prisma schema missing"
fi

echo ""
echo "3️⃣  Checking frontend setup..."
if [ -d "frontend/node_modules" ]; then
    echo "   ✅ Frontend dependencies installed"
else
    echo "   ❌ Frontend dependencies not installed"
    echo "   Run: cd frontend && npm install"
fi

echo ""
echo "=================================="
echo "📋 Next Steps:"
echo ""
echo "1. Apply database migration:"
echo "   cd backend && npm run db:push"
echo ""
echo "2. Start backend server:"
echo "   cd backend && npm run dev"
echo ""
echo "3. Test health endpoint:"
echo "   curl http://localhost:3000/health"
echo ""
echo "4. (Optional) Start frontend:"
echo "   cd frontend && npm run dev"
echo ""
