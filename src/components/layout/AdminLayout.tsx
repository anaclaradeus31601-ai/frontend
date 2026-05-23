import AdminHeader from "./AsideAdmin";
import TopAdmin from "../../components/layout/TopAdmin";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { UserRole } from "../../types/database";
import { useAuth } from "../../contexts/auth-context";

export default function AdminLayout() {
  const { user, loading, isAuthenticated } = useAuth();
  const location = useLocation();

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="h-12 w-12 animate-spin rounded-full border-b-2 border-blue-500" />
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (user?.role !== UserRole.ADMIN) {
    return <Navigate to="/unauthorized" replace />;
  }

  return (
    <div className="flex h-screen w-screen">
      <AdminHeader />
      <main className="flex-1 bg-background  overflow-y-auto">
        <TopAdmin />
        <Outlet />
      </main>
    </div>
  )
}
