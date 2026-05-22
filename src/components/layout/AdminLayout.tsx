import { Outlet } from "react-router-dom";
import AdminHeader from "./AsideAdmin";
import TopAdmin from "../../components/layout/TopAdmin";


export default function AdminLayout() {
    return (
        <div className="flex h-screen w-screen">
            <AdminHeader/>
            <main className="flex-1 bg-background  overflow-y-auto">
                <TopAdmin/>
                <Outlet/>
            </main>
        </div>
    )
}