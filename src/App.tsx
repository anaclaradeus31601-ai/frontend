import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/client/Login";
import Home from "./pages/client/Home";
import Register from "./pages/client/Register";
import CreateProperty from "./pages/client/Preview";
import CreateOwner from "./pages/client/Owner";
import ShowProperty from "./pages/client/ShowProperty";
import AdminLayout from "./layouts/AdminLayout";
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
export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/" element={<Home />} />



        {/* criar donos de casas e apartamentos/imoveis */}
        <Route path="/owner" element={<CreateOwner/>} />

        {/* imoveis */}
        <Route path="/preview" element={<CreateProperty/>} />
        <Route path="/show-property" element={<ShowProperty/>} />




        {/* Admin Routes */}
        <Route path="/admin" element={<AdminLayout />}>
          
          <Route index element={<AdminHome />} />

          {/* Configurations */}
          <Route path="settings" element={<ShowSettings/>}/>

          {/* Clients */}
          <Route path="clients" element={<ShowClients/>} />
          <Route path="clients/create" element={<CreateClients/>} />
          <Route path="clients/edit/:id" element={<EditClients/>} />

          {/* Owners */}
          <Route path="owners" element={<IndexOwners/>} />
          <Route path="owners/:id" element={<ShowOwners/>} />
          <Route path="owners/create" element={<CreateOwners/>} />
          <Route path="owners/edit/:id" element={<EditOwners/>} />

          {/* Properties */}
          <Route path="properties" element={<ShowProperties />} />
          <Route path="properties/create" element={<CreateProperties />} />
          <Route path="properties/edit/:id" element={<EditProperties />} />

          {/* Visits */}
          <Route path="visits" element={<ShowVisits/>} />
          <Route path="visits/create" element={<CreateVisits/>} />
          <Route path="visits/edit/:id" element={<EditVisits/>} />

          {/* Realtors */}
          <Route path="realtors" element={<ShowRealtors/>} />
          <Route path="realtors/create" element={<CreateRealtors/>} />
          <Route path="realtors/edit/:id" element={<EditRealtors/>} />

          {/* Payments */}
          <Route path="payments" element={<ShowPayments/>} />
          <Route path="payments/create" element={<CreatePayments/>} />
          <Route path="payments/edit/:id" element={<EditPayments/>} />

          {/* Contracts */}
          <Route path="contracts" element={<IndexContracts/>} />
          <Route path="contracts/:id" element={<ShowContracts/>} />
          <Route path="contracts/create" element={<CreateContracts/>} />
          <Route path="contracts/edit/:id" element={<EditContracts/>} />

          {/* Analytics */}
          <Route path="analytics" element={<Analyitcs />} />

        </Route>

      </Routes>
    </BrowserRouter>
  );
}