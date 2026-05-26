import type { RouteObject } from "react-router-dom"
import Login from "../pages/client/Login"
import AdminLogin from "../pages/client/AdminLogin"
import RealtorLogin from "../pages/client/RealtorLogin"
import Register from "../pages/client/Register"

export const AuthRoutes: RouteObject[] = [
    {
        path: "/login",
        element: <Login />,
    },
    {
        path: "/login/admin",
        element: <AdminLogin />,
    },
    {
        path: "/login/corretor",
        element: <RealtorLogin />,
    },
    {
        path: "/register",
        element: <Register />,
    },
]
