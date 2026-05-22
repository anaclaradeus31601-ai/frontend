import { Outlet } from "react-router-dom";
import RealtorAside from "./RealtorAside";
import TopRealtor from "./TopRealtor";

export default function RealtorLayout() {
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
