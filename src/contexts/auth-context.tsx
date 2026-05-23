// contexts/auth-context.tsx
import { 
  createContext, 
  useContext, 
  type ReactNode, 
  useState, 
  useEffect,
  useCallback 
} from "react";
import type { UserRole, UserPublicData } from "../types/database";
import { apiRequest, clearAccessToken, getAccessToken } from "../lib/api";

interface AuthContextType {
  user: UserPublicData | null;
  loading: boolean;
  isAuthenticated: boolean;
  setUser: (user: UserPublicData | null) => void; // 👈 Adicionado
  hasRole: (role: UserRole | UserRole[]) => boolean;
  logout: () => Promise<void>; // 👈 Agora é async
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<UserPublicData | null>(null);
  const [loading, setLoading] = useState(true);

  // Verifica sessão no backend ao carregar
  useEffect(() => {
    const checkSession = async () => {
      const accessToken = getAccessToken();

      if (!accessToken) {
        setUser(null);
        setLoading(false);
        return;
      }

      try {
        const data = await apiRequest<UserPublicData>('/users/me');
        setUser(data);
      } catch {
        clearAccessToken();
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    checkSession();
  }, []);

  const hasRole = useCallback((roles: UserRole | UserRole[]) => {
    if (!user) return false;
    const roleArray = Array.isArray(roles) ? roles : [roles];
    return roleArray.includes(user.role);
  }, [user]);

  const logout = useCallback(async () => {
    try {
      await apiRequest('/auth/logout', { method: 'POST' });
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      clearAccessToken();
      setUser(null);
    }
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        isAuthenticated: !!user,
        setUser, // 👈 Expõe setUser para o useLogin
        hasRole,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth deve ser usado dentro de AuthProvider");
  }
  return context;
}
