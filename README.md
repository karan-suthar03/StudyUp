# Study Up Platform

An intelligent study buddy platform that connects students through advanced matching algorithms.

## Project Structure

```
study-up-platform/
├── backend/          # Express.js API server
├── frontend/         # React.js application
├── docker-compose.yml
└── package.json      # Root workspace configuration
```

## Prerequisites

- Node.js 20+ and npm
- Docker and Docker Compose (for local development)
- PostgreSQL 16+ (if running without Docker)
- Redis 7+ (if running without Docker)

## Getting Started

### 1. Clone and Install Dependencies

```bash
# Install root dependencies
npm install

# Install backend dependencies
cd backend && npm install

# Install frontend dependencies
cd ../frontend && npm install
```

### 2. Environment Configuration

```bash
# Copy environment files
cp backend/.env.example backend/.env
cp frontend/.env.example frontend/.env

# Edit the .env files with your configuration
```

### 3. Start with Docker Compose (Recommended)

```bash
# Start all services (PostgreSQL, Redis, Backend, Frontend)
docker-compose up -d

# View logs
docker-compose logs -f

# Stop all services
docker-compose down
```

The application will be available at:
- Frontend: http://localhost:5173
- Backend API: http://localhost:3000
- PostgreSQL: localhost:5432
- Redis: localhost:6379

### 4. Start without Docker

```bash
# Terminal 1: Start PostgreSQL and Redis locally

# Terminal 2: Start backend
cd backend
npm run dev

# Terminal 3: Start frontend
cd frontend
npm run dev
```

## Development Commands

### Root Level
```bash
npm run dev          # Start both frontend and backend
npm run build        # Build all workspaces
npm run lint         # Lint all workspaces
npm run format       # Format all files with Prettier
npm run format:check # Check formatting
```

### Backend
```bash
cd backend
npm run dev          # Start development server with hot reload
npm run build        # Build TypeScript to JavaScript
npm run start        # Start production server
npm run lint         # Run ESLint
npm run lint:fix     # Fix ESLint issues
npm run type-check   # Check TypeScript types
```

### Frontend
```bash
cd frontend
npm run dev          # Start Vite dev server
npm run build        # Build for production
npm run preview      # Preview production build
npm run lint         # Run ESLint
npm run lint:fix     # Fix ESLint issues
npm run type-check   # Check TypeScript types
```

## Technology Stack

### Frontend
- React 18 with TypeScript
- Vite for build tooling
- Tailwind CSS for styling
- React Router for routing
- TanStack Query for server state
- Socket.io Client for real-time features
- Zod for validation

### Backend
- Express.js with TypeScript
- Prisma ORM with PostgreSQL
- Socket.io for real-time communication
- Redis for caching and pub/sub
- BullMQ for job queues
- JWT for authentication
- AWS S3 for file storage

### DevOps
- Docker Compose for local development
- ESLint and Prettier for code quality
- TypeScript for type safety

## Project Status

This project is currently in the setup phase. See `.kiro/specs/study-buddy-platform/tasks.md` for the implementation plan.

## License

Private - All rights reserved
