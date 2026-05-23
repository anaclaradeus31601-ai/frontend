// hooks/use-login.ts
import { useCallback, useState } from 'react';
import { useAuth } from '../contexts/auth-context';
import { apiRequest, clearAccessToken, setAccessToken } from '../lib/api';
import type { UserPublicData } from '../types/database';

interface LoginCredentials {
  email: string;
  password: string;
}

interface AuthResponse {
  access_token: string;
  refresh_token: string;
}

export function useLogin() {
  const { user: currentUser, setUser } = useAuth();
  const [isLoading, setIsLoading] = useState(false);

  const login = useCallback(async (credentials: LoginCredentials) => {
    setIsLoading(true);
    
    try {
      const data = await apiRequest<AuthResponse>('/auth/login', {
        method: 'POST',
        body: JSON.stringify(credentials),
      });

      setAccessToken(data.access_token);

      const user = await apiRequest<UserPublicData>('/users/me');
      setUser(user);

      const redirectMap = {
        ADMIN: '/admin',
        REALTOR: '/realtor',
        CLIENT: '/',
      };

      window.location.href = redirectMap[user.role] || '/';
    } catch (error) {
      clearAccessToken();
      console.error('Login failed:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  }, [setUser]);

  const logout = useCallback(async () => {
    try {
      await apiRequest('/auth/logout', { method: 'POST' });
    } catch (error) {
      // Mesmo se falhar, faz logout local
      console.error('Logout error:', error);
    } finally {
      clearAccessToken();
      setUser(null);
      window.location.href = '/login';
    }
  }, [setUser]);

  return { login, logout, currentUser, isLoading };
}
