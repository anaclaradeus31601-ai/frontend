import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/client/Login";
import Home from "./pages/client/Home";
import Register from "./pages/client/Register";
import CreateProperty from "./pages/client/Preview";
// import CreateOwner from "./pages/client/Owner";
import ShowProperty from "./pages/client/ShowProperty";
import AdminLayout from "./components/layout/AdminLayout";
import ShowClients from "./pages/admin/Clients/Show";
import CreateClients from "./pages/admin/Clients/Create";
import EditClients from "./pages/admin/Clients/Edit";
import EditOwners from "./pages/admin/Owners/Edit";
import CreateOwners from "./pages/admin/Owners/Create";
import EditProperties from "./pages/admin/Properties/Edit";
import ShowProperties from "./pages/admin/Properties/Show";
import ShowVisits from "./pages/admin/Visits/Show";
import CreateVisits from "./pages/admin/Visits/Create";
import EditVisits from "./pages/admin/Visits/Edit";
import CreatePayments from "./pages/admin/Payments/Create";
import EditPayments from "./pages/admin/Payments/Edit";
import ShowPayments from "./pages/admin/Payments/Show";
import CreateContracts from "./pages/admin/Contracts/Create";
import ShowContracts from "./pages/admin/Contracts/Show";
import EditContracts from "./pages/admin/Contracts/Edit";
import ShowRealtors from "./pages/admin/Realtors/Show";
import CreateRealtors from "./pages/admin/Realtors/Create";
import EditRealtors from "./pages/admin/Realtors/Edit";
import CreateProperties from "./pages/admin/Properties/Create";
import Analyitcs from "./pages/admin/Analytics/Analytics";
import ShowOwners from "./pages/admin/Owners/Show";
import AdminHome from "./pages/admin/Home";
import ShowSettings from "./pages/admin/Configurations/Show";
import IndexOwners from "./pages/admin/Owners/Index";
import IndexContracts from "./pages/admin/Contracts/Index";
import IndexVisits from "./pages/admin/Visits/Index";
import DefaultLayout from "./components/layout/DefaultLayout";
import IndexProperties from "./pages/admin/Properties/Index";
import IndexRealtors from "./pages/admin/Realtors/Index";
import IndexPayments from "./pages/admin/Payments/Index";
import RealtorLayout from "./components/layout/RealtorLayout";
import RealtorHome from "./pages/realtor/Home";
import RealtorProperties from "./pages/realtor/Properties";
import RealtorVisits from "./pages/realtor/Visits";
import RealtorContracts from "./pages/realtor/Contracts";
import RealtorProfile from "./pages/realtor/Profile";
import RealtorSettings from "./pages/realtor/Settings";
import { ProtectedRoute } from "./components/protected-route";
import { UserRole } from "./types/database";
import Unauthorized from "./pages/errors/Unauthorized";
import NotFound from "./pages/errors/NotFound";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/unauthorized" element={<Unauthorized />} />

        {/* imoveis */}
        <Route path="/preview" element={<CreateProperty/>} />
        <Route path="/show-property" element={<ShowProperty/>} />

        {/* public */}
        <Route path="/" element={<DefaultLayout/>}>
          <Route index element={<Home />} />
        </Route>

        {/* Admin Routes */}
        <Route path="/admin" element={<ProtectedRoute requiredRoles={UserRole.ADMIN}><AdminLayout /></ProtectedRoute>}>
          <Route index element={<AdminHome />} />
          <Route path="settings" element={<ShowSettings/>}/>
          <Route path="clients" element={<ShowClients/>} />
          <Route path="clients/create" element={<CreateClients/>} />
          <Route path="clients/edit/:id" element={<EditClients/>} />
          <Route path="owners" element={<IndexOwners/>} />
          <Route path="owners/:id" element={<ShowOwners/>} />
          <Route path="owners/create" element={<CreateOwners/>} />
          <Route path="owners/edit/:id" element={<EditOwners/>} />
          <Route path="properties" element={<IndexProperties />} />
          <Route path="properties/:id" element={<ShowProperties />} />
          <Route path="properties/create" element={<CreateProperties />} />
          <Route path="properties/edit/:id" element={<EditProperties />} />
          <Route path="visits" element={<IndexVisits/>} />
          <Route path="visits/:id" element={<ShowVisits/>} />
          <Route path="visits/create" element={<CreateVisits/>} />
          <Route path="visits/edit/:id" element={<EditVisits/>} />
          <Route path="realtors" element={<IndexRealtors/>} />
          <Route path="realtors/:id" element={<ShowRealtors/>} />
          <Route path="realtors/create" element={<CreateRealtors/>} />
          <Route path="realtors/edit/:id" element={<EditRealtors/>} />
          <Route path="payments" element={<IndexPayments/>} />
          <Route path="payments/:id" element={<ShowPayments/>} />
          <Route path="payments/create" element={<CreatePayments/>} />
          <Route path="payments/edit/:id" element={<EditPayments/>} />
          <Route path="contracts" element={<IndexContracts/>} />
          <Route path="contracts/:id" element={<ShowContracts/>} />
          <Route path="contracts/create" element={<CreateContracts/>} />
          <Route path="contracts/edit/:id" element={<EditContracts/>} />
          <Route path="analytics" element={<Analyitcs />} />
        </Route>

        {/* Realtor Routes */}
        <Route path="/realtor" element={<ProtectedRoute requiredRoles={UserRole.REALTOR}><RealtorLayout /></ProtectedRoute>}>
          <Route index element={<RealtorHome />} />
          <Route path="properties" element={<RealtorProperties />} />
          <Route path="visits" element={<RealtorVisits />} />
          <Route path="contracts" element={<RealtorContracts />} />
          <Route path="profile" element={<RealtorProfile />} />
          <Route path="settings" element={<RealtorSettings />} />
          <Route path="notifications" element={<RealtorSettings />} />
        </Route>

        {/* Catch all - 404 */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}
