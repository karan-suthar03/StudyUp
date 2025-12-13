import { QueryClient } from '@tanstack/react-query';

// Create a query client with default options
export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      // Stale time: 5 minutes
      staleTime: 5 * 60 * 1000,
      // Cache time: 10 minutes
      gcTime: 10 * 60 * 1000,
      // Retry failed requests 3 times
      retry: 3,
      // Retry delay with exponential backoff
      retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
      // Refetch on window focus
      refetchOnWindowFocus: false,
      // Refetch on reconnect
      refetchOnReconnect: true,
    },
    mutations: {
      // Retry failed mutations once
      retry: 1,
    },
  },
});

// Query keys factory for consistent key management
export const queryKeys = {
  // Auth
  auth: {
    user: () => ['auth', 'user'] as const,
  },
  
  // Users and Profiles
  users: {
    all: () => ['users'] as const,
    profile: (userId: string) => ['users', 'profile', userId] as const,
    me: () => ['users', 'me'] as const,
  },
  
  // Recommendations
  recommendations: {
    all: () => ['recommendations'] as const,
    filtered: (filters: any) => ['recommendations', 'filtered', filters] as const,
    score: (userId: string) => ['recommendations', 'score', userId] as const,
  },
  
  // Connections
  connections: {
    all: () => ['connections'] as const,
    pending: () => ['connections', 'pending'] as const,
    accepted: () => ['connections', 'accepted'] as const,
  },
  
  // Messages
  messages: {
    all: () => ['messages'] as const,
    conversation: (userId: string) => ['messages', 'conversation', userId] as const,
    conversations: () => ['messages', 'conversations'] as const,
  },
  
  // Sessions
  sessions: {
    all: () => ['sessions'] as const,
    user: (userId: string) => ['sessions', 'user', userId] as const,
    dateRange: (startDate: string, endDate: string) => 
      ['sessions', 'dateRange', startDate, endDate] as const,
  },
  
  // Resources
  resources: {
    all: () => ['resources'] as const,
    user: (userId: string) => ['resources', 'user', userId] as const,
    shared: () => ['resources', 'shared'] as const,
  },
  
  // Feedback
  feedback: {
    all: () => ['feedback'] as const,
    user: (userId: string) => ['feedback', 'user', userId] as const,
  },
  
  // Dashboard
  dashboard: {
    stats: () => ['dashboard', 'stats'] as const,
    activity: (startDate: string, endDate: string) => 
      ['dashboard', 'activity', startDate, endDate] as const,
  },
  
  // Notifications
  notifications: {
    all: () => ['notifications'] as const,
    unread: () => ['notifications', 'unread'] as const,
  },
} as const;