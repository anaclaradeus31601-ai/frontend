
import { Outlet, useLocation } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";

export default function DefaultLayout() {
  const { pathname } = useLocation();
  const shouldOverlayHeader = pathname === "/";

  return (
    <div className="flex min-h-screen max-w-full flex-col overflow-x-hidden">
      <Header />
      <main className={shouldOverlayHeader ? "flex-1" : "flex-1 pt-16"}>
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
