import { Navigate, Outlet, useLocation } from "react-router-dom";
import RealtorAside from "./RealtorAside";
import TopRealtor from "./TopRealtor";
import { useAuth } from "../../contexts/auth-context";
import { UserRole } from "../../types/database";

export default function RealtorLayout() {
  const { user, loading, isAuthenticated } = useAuth();
  const location = useLocation();

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="h-12 w-12 animate-spin rounded-full border-b-2 border-green-500" />
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (user?.role !== UserRole.REALTOR && user?.role !== UserRole.ADMIN) {
    return <Navigate to="/unauthorized" replace />;
  }

  return (
    <div className="flex h-screen w-screen">
      <RealtorAside />
      <main className="flex-1 overflow-y-auto bg-background">
        <TopRealtor />
        <Outlet />
      </main>
    </div>
  );
}
