import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { User } from '@/types';

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (email: string, password: string, name: string) => Promise<void>;
  logout: () => void;
  refreshToken: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Check for existing token on mount
  useEffect(() => {
    const token = localStorage.getItem('auth_token');
    if (token) {
      // TODO: Validate token with backend and get user data
      // For now, we'll simulate this with mock data
      validateToken(token);
    } else {
      setIsLoading(false);
    }
  }, []);

  const validateToken = async (token: string) => {
    try {
      // TODO: Replace with actual API call
      // const response = await api.get('/auth/me', {
      //   headers: { Authorization: `Bearer ${token}` }
      // });
      
      // Mock validation - replace with real API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Mock user data - replace with actual user from API
      const mockUser: User = {
        id: 'user-1',
        email: 'user@example.com',
        name: 'John Doe',
        username: 'johndoe',
        avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
        emailVerified: true,
        createdAt: new Date(),
        profile: {
          id: 'profile-1',
          userId: 'user-1',
          subjects: ['Mathematics', 'Physics'],
          goals: [
            { id: '1', title: 'Prepare for SAT' },
            { id: '2', title: 'Improve calculus skills' }
          ],
          availability: {
            monday: ['14:00-16:00', '18:00-20:00'],
            wednesday: ['16:00-18:00'],
            friday: ['14:00-16:00']
          },
          learningStyle: 'visual',
          avgRating: 4.8,
          bio: 'Computer Science student passionate about mathematics and physics.',
          completionPercentage: 85,
          totalSessions: 24,
          createdAt: new Date(),
          updatedAt: new Date(),
        }
      };
      
      setUser(mockUser);
    } catch (error) {
      console.error('Token validation failed:', error);
      localStorage.removeItem('auth_token');
    } finally {
      setIsLoading(false);
    }
  };

  const login = async (email: string, password: string) => {
    setIsLoading(true);
    try {
      // TODO: Replace with actual API call
      // const response = await api.post('/auth/login', { email, password });
      
      // Mock login - replace with real API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      if (email === 'demo@studyup.com' && password === 'Demo123!') {
        const mockToken = 'mock-jwt-token-' + Date.now();
        localStorage.setItem('auth_token', mockToken);
        await validateToken(mockToken);
      } else {
        throw new Error('Invalid credentials');
      }
    } catch (error) {
      setIsLoading(false);
      throw error;
    }
  };

  const register = async (email: string, password: string, name: string) => {
    setIsLoading(true);
    try {
      // TODO: Replace with actual API call
      // const response = await api.post('/auth/register', { email, password, name });
      
      // Mock registration - replace with real API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      const mockToken = 'mock-jwt-token-' + Date.now();
      localStorage.setItem('auth_token', mockToken);
      
      // Create mock user with incomplete profile
      const mockUser: User = {
        id: 'user-new',
        email,
        name,
        username: email.split('@')[0],
        avatar: `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=3b82f6&color=fff`,
        emailVerified: false,
        createdAt: new Date(),
        profile: {
          id: 'profile-new',
          userId: 'user-new',
          subjects: [],
          goals: [],
          availability: {},
          learningStyle: '',
          avgRating: 0,
          bio: '',
          completionPercentage: 20, // Only basic info filled
          totalSessions: 0,
          createdAt: new Date(),
          updatedAt: new Date(),
        }
      };
      
      setUser(mockUser);
    } catch (error) {
      setIsLoading(false);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };



  const logout = () => {
    localStorage.removeItem('auth_token');
    setUser(null);
  };

  const refreshToken = async () => {
    try {
      // TODO: Implement token refresh
      const token = localStorage.getItem('auth_token');
      if (token) {
        await validateToken(token);
      }
    } catch (error) {
      console.error('Token refresh failed:', error);
      logout();
    }
  };

  const value: AuthContextType = {
    user,
    isLoading,
    isAuthenticated: !!user,
    login,
    register,
    logout,
    refreshToken,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}