import type { RouteObject } from "react-router-dom"
import CreateClients from "../pages/admin/Clients/Create"
import EditClients from "../pages/admin/Clients/Edit"
import ShowClients from "../pages/admin/Clients/Show"
import AdminHome from "../pages/admin/Home"
import CreateOwners from "../pages/admin/Owners/Create"
import ShowOwners from "../pages/admin/Owners/Show"
import ShowProperties from "../pages/admin/Properties/Show"
import CreateProperties from "../pages/admin/Properties/Create"
import EditOwners from "../pages/admin/Owners/Edit"
import EditProperties from "../pages/admin/Properties/Edit"
import ShowVisits from "../pages/admin/Visits/Show"
import CreateVisits from "../pages/admin/Visits/Create"
import EditVisits from "../pages/admin/Visits/Edit"
import ShowPayments from "../pages/admin/Payments/Show"
import CreatePayments from "../pages/admin/Payments/Create"
import EditPayments from "../pages/admin/Payments/Edit"
import ShowContracts from "../pages/admin/Contracts/Show"
import CreateContracts from "../pages/admin/Contracts/Create"
import EditContracts from "../pages/admin/Contracts/Edit"
import ShowRealtors from "../pages/admin/Realtors/Show"
import CreateRealtors from "../pages/admin/Realtors/Create"
import EditRealtors from "../pages/admin/Realtors/Edit"
import ShowSettings from "../pages/admin/Configurations/Show"
import Medias from "../pages/admin/Medias/Media"
import IndexOwners from "../pages/admin/Owners/Index"
import IndexContracts from "../pages/admin/Contracts/Index"
import IndexVisits from "../pages/admin/Visits/Index"
import Analyitcs from "../pages/admin/Analytics/Analytics"
import AdminLayout from "#components/layout/AdminLayout"
import IndexProperties from "../pages/admin/Properties/Index"
import IndexRealtors from "../pages/admin/Realtors/Index"


export const AdminRoutes: RouteObject[] = [
{
  path: "/admin",
  element: <AdminLayout />,
  children: [
    {
      index: true,
      element: <AdminHome />,
    },
    // clients
    {
      path: "clients",
      element: <ShowClients />,
    },
    {
      path: "clients/:id",
      element: <ShowClients />,
    },
    {
      path: "clients/create",
      element: <CreateClients />,
    },
    {
      path: "clients/edit/:id",
      element: <EditClients />,
    },
    // owners
    {
      path: "owners",
      element: <IndexOwners />,
    },
    {
      path: "owners/:id",
      element: <ShowOwners />,
    },
    {
      path: "owners/create",
      element: <CreateOwners />,
    },
    {
      path: "owners/edit/:id",
      element: <EditOwners />,
    },
    // properties
    {
      path: "properties",
      element: <IndexProperties />,
    },
    {
      path: "properties/:id",
      element: <ShowProperties />,
    },
    {
      path: "properties/create",
      element: <CreateProperties />,
    },
    {
      path: "properties/edit/:id",
      element: <EditProperties />,
    },
    // visits
    {
      path: "visits",
      element: <IndexVisits />,
    },{
      path: "visits/:id",
      element: <ShowVisits />,
    },
    {
      path: "visits/create",
      element: <CreateVisits />,
    },
    {
      path: "visits/edit/:id",
      element: <EditVisits />,
    },
    //payments
    {
      path: "payments/:id",
      element: <ShowPayments />,
    },
    {
      path: "payments/create",
      element: <CreatePayments />,
    },
    {
      path: "payments/edit/:id",
      element: <EditPayments />,
    },
    //contracts
    {
      path: "contracts",
      element: <IndexContracts />,
    },
    {           
      path: "contracts/:id",
      element: <ShowContracts />,
    },
    {
      path: "contracts/create",
      element: <CreateContracts />,
    },
    {
      path: "contracts/edit/:id",
      element: <EditContracts />,
    },
    // realtors
    {
      path: "realtors",
      element: <IndexRealtors/>,
    },
    {
      path: "realtors/:id",
      element: <ShowRealtors />,
    },
    {
      path: "realtors/create",
      element: <CreateRealtors />,
    },
    {
      path: "realtors/edit/:id",
      element: <EditRealtors />,    
    },
    // configurations
    {
      path: "settings",
      element: <ShowSettings />,
    },
    {
      path: "analytics",
      element: <Analyitcs />,
    },
    //medias
    {
      path: "medias",
      element: <Medias />,
    },
    
  ]
},]