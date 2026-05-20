import type { RouteObject } from "react-router-dom"
import Login from "../pages/client/Login"
import Register from "../pages/client/Register"

export const AuthRoutes: RouteObject[] = [
    {
        path: "/login",
        element: <Login />,
    },
    {
        path: "/register",
        element: <Register />,
    },
]