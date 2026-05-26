// hooks/use-login.ts
import { useCallback, useState } from 'react';
import { useAuth } from '../contexts/auth-context';
import { ApiError, apiRequest } from '../lib/api';
import type { UserPublicData, UserRole } from '../types/database';

interface LoginCredentials {
  email: string;
  password: string;
}

interface LoginOptions {
  expectedRole?: UserRole;
}

export function useLogin() {
  const { user: currentUser, setUser } = useAuth();
  const [isLoading, setIsLoading] = useState(false);

  const login = useCallback(async (credentials: LoginCredentials, options?: LoginOptions) => {
    setIsLoading(true);
    
    try {
      await apiRequest('/auth/login', {
        method: 'POST',
        body: JSON.stringify(credentials),
      });

      const user = await apiRequest<UserPublicData>('/users/me');

      if (options?.expectedRole && user.role !== options.expectedRole) {
        await apiRequest('/auth/logout', { method: 'POST' }).catch(() => undefined);
        setUser(null);
        throw new ApiError(403, `Esta área é exclusiva para ${describeRole(options.expectedRole)}.`);
      }

      setUser(user);

      const redirectMap = {
        ADMIN: '/admin',
        REALTOR: '/realtor',
        CLIENT: '/',
      };

      window.location.href = redirectMap[user.role] || '/';
    } catch (error) {
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
      console.error('Logout error:', error);
    } finally {
      setUser(null);
      window.location.href = '/login';
    }
  }, [setUser]);

  return { login, logout, currentUser, isLoading };
}

function describeRole(role: UserRole) {
  switch (role) {
    case "ADMIN":
      return "administradores";
    case "REALTOR":
      return "corretores";
    default:
      return "clientes";
  }
}
