// hooks/use-check-auth.ts
import { useEffect } from 'react';
import { useAuth } from '../contexts/auth-context';
import { apiRequest } from '../lib/api';
import type { UserPublicData } from '../types/database';

export function useCheckAuth() {
  const { setUser } = useAuth();

  useEffect(() => {
    const checkSession = async () => {
      try {
        const data = await apiRequest<UserPublicData>('/users/me');
        setUser(data);
      } catch {
        setUser(null);
      }
    };

    checkSession();
  }, [setUser]);
}
