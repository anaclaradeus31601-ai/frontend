

import { Outlet } from "react-router-dom";
import Header from "../components/layout/Header";
import Footer from "../components/layout/Footer";

export default function DefaultLayout() {
  return (
    <div className="min-h-screen flex flex-col bg-zinc-950 text-white">

      <Header />
      <main className="flex-1 p-2">
        <Outlet />
      </main>

      <Footer />

    </div>
  );
}