# Study Up Frontend

This is the frontend application for the Study Up platform, built with React.js 18, TypeScript, and modern web technologies.

## Technology Stack

- **React.js 18** - UI library with hooks and modern patterns
- **TypeScript** - Type safety and enhanced developer experience
- **Vite** - Fast build tool and development server
- **React Router** - Client-side routing
- **Tailwind CSS** - Utility-first CSS framework
- **shadcn/ui** - Accessible component library
- **TanStack Query (React Query)** - Server state management
- **Axios** - HTTP client for API calls
- **Zod** - Runtime validation and type inference
- **Socket.io Client** - Real-time communication
- **React Hook Form** - Form handling and validation

## Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── ui/             # shadcn/ui components
│   └── ProtectedRoute.tsx
├── contexts/           # React contexts
│   └── AuthContext.tsx
├── hooks/              # Custom React hooks
│   └── useAuth.ts
├── lib/                # Utility libraries
│   ├── api.ts          # API client configuration
│   ├── queryClient.ts  # React Query configuration
│   ├── utils.ts        # General utilities
│   ├── validations.ts  # Zod validation schemas
│   └── constants.ts    # Application constants
├── pages/              # Page components
│   ├── HomePage.tsx
│   ├── LoginPage.tsx
│   ├── RegisterPage.tsx
│   └── DashboardPage.tsx
├── types/              # TypeScript type definitions
│   └── api.ts
├── App.tsx             # Main application component
├── main.tsx            # Application entry point
└── index.css           # Global styles with Tailwind
```

## Installation

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Start the development server:**
   ```bash
   npm run dev
   ```

3. **Build for production:**
   ```bash
   npm run build
   ```

## Configuration

### Environment Variables

Create a `.env` file in the frontend directory with the following variables:

```env
VITE_API_BASE_URL=http://localhost:3000/api/v1
VITE_SOCKET_URL=http://localhost:3000
```

### API Configuration

The API client is configured in `src/lib/api.ts` with:
- Automatic JWT token handling
- Request/response interceptors
- Error handling and token refresh
- File upload support

### React Query Setup

React Query is configured in `src/lib/queryClient.ts` with:
- 5-minute stale time
- 10-minute cache time
- Automatic retries with exponential backoff
- Query key factory for consistent caching

### Routing

React Router is set up with:
- Protected routes for authenticated users
- Automatic redirect to login for unauthenticated access
- Route-based code splitting (ready for implementation)

## Key Features Implemented

### 1. Authentication System
- JWT token management
- Login/register forms with validation
- OAuth integration ready
- Protected route wrapper
- Authentication context provider

### 2. API Integration
- Type-safe API client with Axios
- Automatic token handling
- Error interceptors
- File upload utilities
- React Query hooks for data fetching

### 3. UI Components
- shadcn/ui component library setup
- Tailwind CSS configuration with design tokens
- Responsive design utilities
- Dark mode support (configured)

### 4. Form Validation
- Zod schemas for all forms
- Type-safe validation
- Integration with React Hook Form
- Custom validation rules

### 5. Type Safety
- Complete TypeScript setup
- API response types
- Form data types
- Component prop types

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint
- `npm run lint:fix` - Fix ESLint errors
- `npm run format` - Format code with Prettier
- `npm run type-check` - Run TypeScript type checking

## Development Guidelines

### Component Structure
- Use functional components with hooks
- Implement proper TypeScript types
- Follow the component composition pattern
- Use shadcn/ui components as base

### State Management
- Use React Query for server state
- Use React Context for global client state
- Use local state for component-specific data
- Implement optimistic updates where appropriate

### Styling
- Use Tailwind CSS utility classes
- Follow the design system tokens
- Implement responsive design
- Use CSS variables for theming

### API Integration
- Use the provided API client
- Implement proper error handling
- Use React Query for caching and synchronization
- Follow the established query key patterns

## Next Steps

After running `npm install`, you can:

1. **Uncomment the full setup** in `main.tsx` to enable React Router and React Query
2. **Uncomment the routing** in `App.tsx` to enable navigation
3. **Update the page components** to use the shadcn/ui components
4. **Connect to the backend API** by updating the API base URL
5. **Implement the remaining pages** and components as needed

## Integration with Backend

The frontend is configured to work with the Express.js backend:
- API calls are proxied through Vite dev server
- JWT tokens are automatically included in requests
- Socket.io client is ready for real-time features
- File uploads are configured for the backend endpoints

## Performance Considerations

- Code splitting is ready for implementation
- React Query provides efficient caching
- Tailwind CSS is optimized for production builds
- Images and assets are optimized through Vite
- Bundle analysis tools are available

This setup provides a solid foundation for building the complete Study Up frontend application with all the modern development practices and tools needed for a production-ready application.