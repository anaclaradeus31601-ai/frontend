

import { Outlet } from "react-router-dom";
import Header from "../components/layout/Header";
// import Footer from "../components/layout/Footer";

export default function DefaultLayout() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 overflow-y-auto bg-background overflow-x-hidden">
        <Outlet />
      </main>

      {/* <Footer /> */}

    </div>
  );
}